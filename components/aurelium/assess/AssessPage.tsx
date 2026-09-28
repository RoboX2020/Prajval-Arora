import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { builtInKey, openingTurn, runAssessmentTurn, type TranscriptTurn } from './agent';
import { itemStatus, scoreOf, type ItemStatus, type SessionState } from './score';
import { speakText, speechOutputSupported, stopSpeaking, useSpeechInput } from './voice';

type Bubble = {
  id: string;
  role: 'user' | 'model';
  text: string;
  hidden?: boolean;
  trace?: string[];
};

type Saved = {
  goal: string;
  syllabus: string;
  exam: string;
  started: boolean;
  state: SessionState | null;
  bubbles: Bubble[];
  speak: boolean;
};

const STORAGE = 'aurelium-assessment-v1';
const KEY_STORAGE = 'aurelium-gemini-key';

function loadSaved(): Saved | null {
  try {
    const raw = localStorage.getItem(STORAGE);
    return raw ? (JSON.parse(raw) as Saved) : null;
  } catch {
    return null;
  }
}

function statusLabel(status: ItemStatus): string {
  if (status === 'secured') return 'Secured';
  if (status === 'needs_clean') return 'Needs a clean answer';
  return 'Not asked';
}

function toolLine(name: string, output: Record<string, unknown>): string {
  if (name === 'record_attempt') {
    return `Recorded ${String(output.itemId || 'item')} · ${String(output.status || 'noted')} · score ${String(output.score ?? '')}`;
  }
  if (name === 'register_items') return `Registered the paper · ${String(output.total ?? 0)} items`;
  if (name === 'list_open') return 'Checked what is still open';
  if (name === 'read_source') return `Read the ${String(output.source || 'source')}`;
  if (name === 'note_gap') return `Noted a gap · ${String(output.itemId || '')}`;
  if (output.error) return String(output.error);
  return name;
}

function emptyState(goal: string, syllabus: string, exam: string): SessionState {
  return { goal, syllabus, exam, items: [], attempts: [], gaps: {} };
}

export const AssessPage: React.FC = () => {
  const saved = useMemo(loadSaved, []);
  const [goal, setGoal] = useState(saved?.goal ?? '');
  const [syllabus, setSyllabus] = useState(saved?.syllabus ?? '');
  const [exam, setExam] = useState(saved?.exam ?? '');
  const [apiKey, setApiKey] = useState(() => sessionStorage.getItem(KEY_STORAGE) || '');
  const [started, setStarted] = useState(saved?.started ?? false);
  const [state, setState] = useState<SessionState | null>(saved?.state ?? null);
  const [bubbles, setBubbles] = useState<Bubble[]>(saved?.bubbles ?? []);
  const [draft, setDraft] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [speak, setSpeak] = useState(saved?.speak ?? true);
  const logRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef(state);
  const bubblesRef = useRef(bubbles);
  const busyRef = useRef(busy);
  const speakRef = useRef(speak);

  stateRef.current = state;
  bubblesRef.current = bubbles;
  busyRef.current = busy;
  speakRef.current = speak;

  const score = scoreOf(state?.items ?? [], state?.attempts ?? []);

  useEffect(() => {
    const previousTitle = document.title;
    const previousBody = document.body.style.backgroundColor;
    const previousColor = document.body.style.color;
    document.title = 'Aurelium — Assessment';
    document.body.style.backgroundColor = '#FBF8F1';
    document.body.style.color = '#241C15';
    return () => {
      document.title = previousTitle;
      document.body.style.backgroundColor = previousBody;
      document.body.style.color = previousColor;
      stopSpeaking();
    };
  }, []);

  useEffect(() => {
    const payload: Saved = { goal, syllabus, exam, started, state, bubbles, speak };
    try {
      localStorage.setItem(STORAGE, JSON.stringify(payload));
    } catch {
      setError('This browser could not store the session. It will last only while the tab stays open.');
    }
  }, [goal, syllabus, exam, started, state, bubbles, speak]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: 'smooth' });
  }, [bubbles, busy]);

  const speech = useSpeechInput((text) => {
    if (busyRef.current) setDraft(text);
    else void submit(text);
  });

  async function submit(text: string) {
    const clean = text.trim();
    const current = stateRef.current;
    if (!clean || !current || busyRef.current) return;
    const key = (apiKey || builtInKey).trim();
    if (!key) {
      setError('Add a Gemini API key to run the assessment.');
      return;
    }

    const userBubble: Bubble = { id: crypto.randomUUID(), role: 'user', text: clean };
    const history = [...bubblesRef.current, userBubble];
    setBubbles(history);
    setDraft('');
    setBusy(true);
    setError('');
    stopSpeaking();
    const trace: string[] = [];

    try {
      const result = await runAssessmentTurn({
        apiKey: key,
        state: current,
        turns: history
          .filter((bubble) => bubble.role === 'user' || bubble.role === 'model')
          .map(
            (bubble): TranscriptTurn => ({
              role: bubble.role,
              text: bubble.text,
              hidden: bubble.hidden,
            }),
          ),
        onTool: (event) => trace.push(toolLine(event.name, event.output)),
      });
      setState(result.state);
      setBubbles((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: 'model', text: result.text, trace },
      ]);
      if (speakRef.current && speechOutputSupported()) speakText(result.text);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'The assessment could not reach the model.';
      setError(message);
    } finally {
      setBusy(false);
    }
  }

  async function retryOpening() {
    const current = stateRef.current;
    const opening = bubblesRef.current.find((bubble) => bubble.hidden);
    const key = (apiKey || builtInKey).trim();
    if (!current || !opening || !key || busyRef.current) return;
    setBusy(true);
    setError('');
    const trace: string[] = [];
    try {
      const result = await runAssessmentTurn({
        apiKey: key,
        state: current,
        turns: [{ role: 'user', text: opening.text, hidden: true }],
        onTool: (event) => trace.push(toolLine(event.name, event.output)),
      });
      setState(result.state);
      setBubbles([opening, { id: crypto.randomUUID(), role: 'model', text: result.text, trace }]);
      if (speakRef.current && speechOutputSupported()) speakText(result.text);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'The assessment could not reach the model.');
    } finally {
      setBusy(false);
    }
  }

  async function begin(event: React.FormEvent) {
    event.preventDefault();
    const key = (apiKey || builtInKey).trim();
    const material = `${goal} ${syllabus} ${exam}`.trim();
    if (goal.trim().length < 8) {
      setError('Write the end goal in a sentence.');
      return;
    }
    if (material.length < 40) {
      setError('Add the goal plus a syllabus or a practice paper, so there is something to be strict about.');
      return;
    }
    if (!key) {
      setError('Add a Gemini API key. It stays in this browser tab.');
      return;
    }
    sessionStorage.setItem(KEY_STORAGE, apiKey.trim());
    const next = emptyState(goal.trim(), syllabus.trim(), exam.trim());
    const opening: Bubble = {
      id: crypto.randomUUID(),
      role: 'user',
      text: openingTurn(next),
      hidden: true,
    };
    setState(next);
    setBubbles([opening]);
    setStarted(true);
    setError('');
    setBusy(true);
    const trace: string[] = [];
    try {
      const result = await runAssessmentTurn({
        apiKey: key,
        state: next,
        turns: [{ role: 'user', text: opening.text, hidden: true }],
        onTool: (event) => trace.push(toolLine(event.name, event.output)),
      });
      setState(result.state);
      setBubbles([opening, { id: crypto.randomUUID(), role: 'model', text: result.text, trace }]);
      if (speak && speechOutputSupported()) speakText(result.text);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'The assessment could not reach the model.';
      setError(message);
    } finally {
      setBusy(false);
    }
  }

  function reset() {
    const ok = window.confirm('Clear this assessment and start another?');
    if (!ok) return;
    stopSpeaking();
    setStarted(false);
    setState(null);
    setBubbles([]);
    setDraft('');
    setError('');
    setGoal('');
    setSyllabus('');
    setExam('');
  }

  const visible = bubbles.filter((bubble) => !bubble.hidden);

  return (
    <div className="aurelium flex h-[100dvh] flex-col">
      <header className="flex shrink-0 items-center justify-between gap-4 border-b border-[#4A3022]/10 px-4 py-3 md:px-6">
        <div className="min-w-0">
          <Link to="/aurelium" className="au-display text-2xl leading-none text-[#241C15]">
            Aurelium
          </Link>
          <p className="mt-1 text-sm text-[#4A3022]">Assessment</p>
        </div>
        {started && (
          <div className="text-right">
            <p className="au-display text-4xl leading-none text-[#241C15]">{score.percent}</p>
            <p className="text-xs text-[#4A3022]">
              {score.secured} of {score.total || 0} secured
            </p>
          </div>
        )}
      </header>

      {!started ? (
        <main className="mx-auto w-full max-w-2xl flex-1 overflow-y-auto px-4 py-10 md:px-6">
          <p className="au-kicker">First working session</p>
          <h1 className="au-display mt-3 text-4xl leading-tight text-[#241C15] md:text-5xl">
            Bring the paper. Leave when you can score 100.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-[#241C15]">
            Tell Aurelium the end goal, the syllabus, and a practice exam or question list. It will ask, explain when you do not know, and keep going. An answer that needed a hint does not count. The score reaches 100 only when every item has been answered without help.
          </p>
          <form onSubmit={begin} className="mt-8 space-y-5">
            <label className="block">
              <span className="au-kicker">End goal</span>
              <textarea
                value={goal}
                onChange={(event) => setGoal(event.target.value)}
                required
                rows={3}
                placeholder="What you need to be able to do when this is finished."
                className="mt-2 w-full border border-[#4A3022]/20 bg-white px-3 py-2 text-base text-[#241C15]"
              />
            </label>
            <label className="block">
              <span className="au-kicker">Syllabus</span>
              <textarea
                value={syllabus}
                onChange={(event) => setSyllabus(event.target.value)}
                rows={6}
                placeholder="Topics, outcomes, or the chapter you have to know."
                className="mt-2 w-full border border-[#4A3022]/20 bg-white px-3 py-2 text-base text-[#241C15]"
              />
            </label>
            <label className="block">
              <span className="au-kicker">Practice exam or questions</span>
              <textarea
                value={exam}
                onChange={(event) => setExam(event.target.value)}
                rows={6}
                placeholder="Paste a paper, a question bank, or the problems you must be able to solve."
                className="mt-2 w-full border border-[#4A3022]/20 bg-white px-3 py-2 text-base text-[#241C15]"
              />
            </label>
            {!builtInKey && (
              <label className="block">
                <span className="au-kicker">Gemini API key</span>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(event) => setApiKey(event.target.value)}
                  autoComplete="off"
                  placeholder="Stays in this browser tab"
                  className="mt-2 w-full border border-[#4A3022]/20 bg-white px-3 py-2 text-base text-[#241C15]"
                />
                <a href="https://aistudio.google.com/apikey" target="_blank" rel="noreferrer" className="mt-2 inline-block text-sm text-[#4A3022] underline">
                  Get a Gemini API key
                </a>
              </label>
            )}
            {error && (
              <p role="alert" className="text-sm text-[#4A3022]">
                {error}
              </p>
            )}
            <button type="submit" className="bg-[#4A3022] px-5 py-3 text-sm text-[#FBF8F1] hover:bg-[#241C15]">
              Begin
            </button>
          </form>
        </main>
      ) : (
        <div className="grid min-h-0 flex-1 lg:grid-cols-[18rem_minmax(0,1fr)]">
          <aside className="hidden min-h-0 flex-col border-[#4A3022]/10 lg:flex lg:border-r">
            <ItemList state={state} />
          </aside>
          <section className="flex min-h-0 flex-col">
            <details className="border-b border-[#4A3022]/10 lg:hidden">
              <summary className="cursor-pointer px-4 py-3 text-sm text-[#4A3022]">
                {score.secured} of {score.total || 0} secured
              </summary>
              <ItemList state={state} />
            </details>
            <div ref={logRef} className="min-h-0 flex-1 space-y-5 overflow-y-auto px-4 py-6 md:px-6" aria-live="polite">
              {visible.length === 0 && busy && <p className="text-sm text-[#4A3022]">Reading what you brought.</p>}
              {visible.map((bubble) => (
                <article key={bubble.id} className={bubble.role === 'user' ? 'ml-8' : 'mr-8'}>
                  <p className="au-kicker">{bubble.role === 'user' ? 'You' : 'Aurelium'}</p>
                  <p className="mt-1 whitespace-pre-wrap text-base leading-relaxed text-[#241C15]">{bubble.text}</p>
                  {bubble.trace && bubble.trace.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {bubble.trace.map((line) => (
                        <li key={line} className="text-xs text-[#4A3022]">
                          {line}
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
              {busy && visible.length > 0 && <p className="text-sm text-[#4A3022]">Working from the record.</p>}
              {!busy && visible.length === 0 && error && (
                <button type="button" onClick={() => void retryOpening()} className="border border-[#4A3022]/30 px-3 py-2 text-sm text-[#241C15]">
                  Try the opening again
                </button>
              )}
            </div>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                void submit(draft);
              }}
              className="border-t border-[#4A3022]/10 px-4 py-3 md:px-6"
            >
              {error && (
                <p role="alert" className="mb-2 text-sm text-[#4A3022]">
                  {error}
                </p>
              )}
              <p className="mb-2 text-xs leading-relaxed text-[#4A3022]">
                An explanation does not count. The next answer on that item has to stand on its own.
              </p>
              {speech.interim && <p className="mb-1 text-sm text-[#4A3022]">{speech.interim}</p>}
              <div className="flex items-end gap-2">
                <label className="min-w-0 flex-1">
                  <span className="sr-only">Your answer</span>
                  <textarea
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' && !event.shiftKey) {
                        event.preventDefault();
                        void submit(draft);
                      }
                    }}
                    rows={2}
                    disabled={busy}
                    placeholder={speech.listening ? 'Listening' : 'Answer, or ask for the idea another way'}
                    className="w-full resize-none border border-[#4A3022]/20 bg-white px-3 py-2 text-base text-[#241C15]"
                  />
                </label>
                <button
                  type="button"
                  onClick={() => (speech.listening ? speech.stop() : speech.start())}
                  disabled={!speech.supported || busy}
                  className="border border-[#4A3022]/30 px-3 py-2 text-sm text-[#241C15] disabled:opacity-40"
                >
                  {speech.listening ? 'Stop' : 'Speak'}
                </button>
                <button type="submit" disabled={busy || !draft.trim()} className="bg-[#4A3022] px-4 py-2 text-sm text-[#FBF8F1] disabled:opacity-40">
                  Send
                </button>
              </div>
              <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                <label className="flex items-center gap-2 text-sm text-[#4A3022]">
                  <input
                    type="checkbox"
                    checked={speak}
                    onChange={(event) => {
                      setSpeak(event.target.checked);
                      if (!event.target.checked) stopSpeaking();
                    }}
                  />
                  Speak replies
                </label>
                <button type="button" onClick={reset} className="text-sm text-[#4A3022] underline-offset-2 hover:underline">
                  New assessment
                </button>
              </div>
              {speech.error && <p className="mt-2 text-sm text-[#4A3022]">{speech.error}</p>}
              {!speech.supported && <p className="mt-2 text-sm text-[#4A3022]">Voice input needs a browser with speech recognition. You can still type.</p>}
            </form>
          </section>
        </div>
      )}
    </div>
  );
};

function ItemList({ state }: { state: SessionState | null }) {
  const items = state?.items ?? [];
  return (
    <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
      <p className="au-kicker">The paper</p>
      <p className="mt-2 text-sm leading-relaxed text-[#4A3022]">
        Secured means the latest answer was correct and unaided.
      </p>
      {items.length === 0 ? (
        <p className="mt-4 text-sm text-[#241C15]">Items appear after the first pass over your materials.</p>
      ) : (
        <ol className="mt-4 space-y-3">
          {items.map((item) => {
            const status = itemStatus(state?.attempts ?? [], item.id);
            return (
              <li key={item.id} className="border-b border-[#4A3022]/10 pb-3">
                <div className="flex items-baseline justify-between gap-3">
                  <h2 className="text-sm font-semibold text-[#241C15]">{item.concept}</h2>
                  <span className={`shrink-0 text-xs ${status === 'secured' ? 'text-[#241C15]' : 'text-[#4A3022]'}`}>
                    {status === 'secured' ? '● ' : ''}
                    {statusLabel(status)}
                  </span>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-[#4A3022]">{item.stem}</p>
                {state?.gaps[item.id] && <p className="mt-1 text-xs text-[#4A3022]">Gap: {state.gaps[item.id]}</p>}
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}
