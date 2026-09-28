import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { blankState, scoreOf, type SessionState } from '../assess/score';
import { speakText, speechOutputSupported, stopSpeaking, useSpeechInput } from '../assess/voice';

type Role = 'user' | 'assistant';

type Message = {
  id: string;
  role: Role;
  text: string;
};

type Chat = {
  id: string;
  title: string;
  messages: Message[];
  state: SessionState;
  updated: number;
};

const STORAGE = 'aurelium-chats-v2';

function loadChats(): Chat[] {
  try {
    const raw = localStorage.getItem(STORAGE);
    const parsed = raw ? (JSON.parse(raw) as Chat[]) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function freshChat(): Chat {
  return {
    id: crypto.randomUUID(),
    title: 'New chat',
    messages: [],
    state: blankState(),
    updated: Date.now(),
  };
}

async function streamReply(
  messages: Message[],
  state: SessionState,
  onText: (chunk: string) => void,
  onState: (next: SessionState) => void,
  signal: AbortSignal,
): Promise<void> {
  const response = await fetch('/api/aurelium', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      state,
      messages: messages.map((message) => ({
        role: message.role === 'assistant' ? 'model' : 'user',
        text: message.text,
      })),
    }),
    signal,
  });
  const contentType = response.headers.get('content-type') || '';
  if (!response.ok || !response.body || !contentType.includes('text/event-stream')) {
    throw new Error('Aurelium could not reach the model.');
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const blocks = buffer.split('\n\n');
    buffer = blocks.pop() || '';
    for (const block of blocks) {
      const line = block.split('\n').find((entry) => entry.startsWith('data: '));
      if (!line) continue;
      let event: { type?: string; text?: string; state?: SessionState; message?: string };
      try {
        event = JSON.parse(line.slice(6)) as { type?: string; text?: string; state?: SessionState; message?: string };
      } catch {
        throw new Error('Aurelium could not reach the model.');
      }
      if (event.type === 'text' && event.text) onText(event.text);
      if (event.type === 'state' && event.state) onState(event.state);
      if (event.type === 'error') throw new Error(event.message || 'The model request failed.');
    }
  }
}

export const ChatPage: React.FC = () => {
  const [chats, setChats] = useState<Chat[]>(() => {
    const existing = loadChats();
    return existing.length ? existing : [freshChat()];
  });
  const [activeId, setActiveId] = useState(() => loadChats()[0]?.id || '');
  const [draft, setDraft] = useState('');
  const [busy, setBusy] = useState(false);
  const [speak, setSpeak] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [error, setError] = useState('');
  const scroller = useRef<HTMLDivElement>(null);
  const composer = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const speakRef = useRef(speak);
  const busyRef = useRef(busy);
  const chatsRef = useRef(chats);
  const activeRef = useRef(activeId);
  speakRef.current = speak;
  busyRef.current = busy;
  chatsRef.current = chats;
  activeRef.current = activeId;

  const active = chats.find((chat) => chat.id === activeId) || chats[0];
  const score = scoreOf(active?.state.items ?? [], active?.state.attempts ?? []);

  useEffect(() => {
    if (!activeId && chats[0]) setActiveId(chats[0].id);
  }, [activeId, chats]);

  useEffect(() => {
    localStorage.setItem(STORAGE, JSON.stringify(chats));
  }, [chats]);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight });
  }, [active?.messages, busy]);

  useEffect(() => {
    const field = composer.current;
    if (!field) return;
    field.style.height = 'auto';
    field.style.height = `${Math.min(field.scrollHeight, 160)}px`;
  }, [draft]);

  useEffect(() => {
    const previousTitle = document.title;
    const previousBody = document.body.style.backgroundColor;
    document.title = 'Aurelium';
    document.body.style.backgroundColor = '#ffffff';
    return () => {
      document.title = previousTitle;
      document.body.style.backgroundColor = previousBody;
      stopSpeaking();
      abortRef.current?.abort();
    };
  }, []);

  const speech = useSpeechInput((text) => {
    void send(text);
  });

  function startNew() {
    const current = chatsRef.current.find((item) => item.id === activeRef.current);
    if (current && current.messages.length === 0) {
      setSidebar(false);
      setDraft('');
      return;
    }
    abortRef.current?.abort();
    stopSpeaking();
    const chat = freshChat();
    setChats((list) => [chat, ...list]);
    setActiveId(chat.id);
    setDraft('');
    setError('');
    setSidebar(false);
    setBusy(false);
  }

  async function send(text: string) {
    const clean = text.trim();
    const chat = chatsRef.current.find((item) => item.id === activeRef.current);
    if (!clean || !chat || busyRef.current) return;

    const userMessage: Message = { id: crypto.randomUUID(), role: 'user', text: clean };
    const assistantId = crypto.randomUUID();
    const corpus = `${chat.state.corpus}\n\n${clean}`.trim().slice(-80000);
    const nextState = { ...chat.state, corpus };
    const withUser: Chat = {
      ...chat,
      title: chat.messages.some((message) => message.role === 'user') ? chat.title : clean.slice(0, 42),
      messages: [...chat.messages, userMessage, { id: assistantId, role: 'assistant', text: '' }],
      state: nextState,
      updated: Date.now(),
    };
    setChats((current) => current.map((item) => (item.id === chat.id ? withUser : item)));
    setDraft('');
    setError('');
    setBusy(true);
    stopSpeaking();
    const controller = new AbortController();
    abortRef.current = controller;
    let spoken = '';

    try {
      await streamReply(
        withUser.messages.filter((message) => message.id !== assistantId),
        nextState,
        (chunk) => {
          spoken += chunk;
          setChats((current) =>
            current.map((item) =>
              item.id === chat.id
                ? {
                    ...item,
                    messages: item.messages.map((message) =>
                      message.id === assistantId ? { ...message, text: message.text + chunk } : message,
                    ),
                  }
                : item,
            ),
          );
        },
        (state) => {
          setChats((current) => current.map((item) => (item.id === chat.id ? { ...item, state, updated: Date.now() } : item)));
        },
        controller.signal,
      );
      if (speakRef.current && speechOutputSupported()) speakText(spoken);
    } catch (err) {
      if ((err as { name?: string }).name === 'AbortError') return;
      const message = err instanceof Error ? err.message : 'The model request failed.';
      setError(message);
      setChats((current) =>
        current.map((item) =>
          item.id === chat.id
            ? {
                ...item,
                messages: item.messages.map((entry) =>
                  entry.id === assistantId && !entry.text ? { ...entry, text: message } : entry,
                ),
              }
            : item,
        ),
      );
    } finally {
      setBusy(false);
    }
  }

  function stop() {
    abortRef.current?.abort();
    stopSpeaking();
    setBusy(false);
  }

  const empty = !active?.messages.length;

  return (
    <div className="aurelium-chat flex h-[100dvh] text-[#0d0d0d]">
      {sidebar && <button type="button" className="fixed inset-0 z-30 bg-black/30 md:hidden" aria-label="Close chats" onClick={() => setSidebar(false)} />}
      <aside className={`${sidebar ? 'translate-x-0' : '-translate-x-full'} fixed z-40 flex h-full w-64 flex-col border-r border-black/10 bg-[#f7f7f8] p-3 transition md:static md:translate-x-0`}>
        <button type="button" onClick={startNew} className="rounded-lg border border-black/10 bg-white px-3 py-2 text-left text-sm hover:bg-black/[0.03]">
          New chat
        </button>
        <nav className="mt-3 min-h-0 flex-1 space-y-1 overflow-y-auto" aria-label="Chats">
          {chats.map((chat) => (
            <button
              key={chat.id}
              type="button"
              onClick={() => {
                setActiveId(chat.id);
                setSidebar(false);
              }}
              className={`block w-full truncate rounded-lg px-3 py-2 text-left text-sm ${chat.id === active?.id ? 'bg-black/5' : 'hover:bg-black/[0.03]'}`}
            >
              {chat.title}
            </button>
          ))}
        </nav>
        <div className="space-y-2 border-t border-black/10 pt-3 text-sm">
          {score.total > 0 && (
            <p className="px-2 text-[#4A3022]">
              Score {score.percent} · {score.secured}/{score.total} unaided
            </p>
          )}
          <label className="flex items-center gap-2 px-2 text-[#4A3022]">
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
          <Link to="/aurelium/concept" className="block px-2 text-[#4A3022] hover:text-[#241C15]" onClick={() => setSidebar(false)}>
            The concept
          </Link>
          <Link to="/" className="block px-2 text-[#4A3022] hover:text-[#241C15]">
            Prajval Arora
          </Link>
        </div>
      </aside>

      <section className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center gap-3 px-3 py-3 md:hidden">
          <button type="button" onClick={() => setSidebar(true)} className="rounded-md border border-black/10 px-2 py-1 text-sm">
            Chats
          </button>
          <p className="font-medium">Aurelium</p>
        </header>

        <div ref={scroller} className="min-h-0 flex-1 overflow-y-auto">
          {empty ? (
            <div className="flex h-full flex-col items-center justify-center px-6 pb-28 text-center">
              <h1 className="text-3xl font-medium tracking-tight">Aurelium</h1>
              <p className="mt-3 max-w-md text-[#4A3022]">What do you want to know well enough to score 100?</p>
            </div>
          ) : (
            <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-8">
              {active.messages.map((message) =>
                message.role === 'user' ? (
                  <div key={message.id} className="flex justify-end">
                    <p className="max-w-[85%] whitespace-pre-wrap rounded-3xl bg-[#f4f4f4] px-4 py-2.5 leading-relaxed">{message.text}</p>
                  </div>
                ) : (
                  <p key={message.id} className="whitespace-pre-wrap leading-relaxed">
                    {message.text || (busy ? '…' : '')}
                  </p>
                ),
              )}
            </div>
          )}
        </div>

        <form
          className="px-3 pb-4"
          onSubmit={(event) => {
            event.preventDefault();
            void send(draft);
          }}
        >
          <div className="mx-auto flex w-full max-w-3xl items-end gap-2 rounded-3xl border border-black/10 bg-white px-3 py-2 shadow-sm">
            <label className="min-w-0 flex-1">
              <span className="sr-only">Message</span>
              <textarea
                ref={composer}
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault();
                    void send(draft);
                  }
                }}
                rows={1}
                placeholder="Message Aurelium"
                className="max-h-40 w-full resize-none bg-transparent py-2 text-base outline-none"
              />
            </label>
            {speech.interim && <p className="mb-1 max-w-[10rem] truncate text-xs text-[#4A3022]">{speech.interim}</p>}
            <button
              type="button"
              onClick={() => (speech.listening ? speech.stop() : speech.start())}
              disabled={!speech.supported || busy}
              className="mb-1 rounded-full px-2 py-1 text-sm text-[#4A3022] disabled:opacity-30"
            >
              {speech.listening ? 'Stop mic' : 'Mic'}
            </button>
            {busy ? (
              <button type="button" onClick={stop} className="mb-1 rounded-full bg-[#241C15] px-3 py-1.5 text-sm text-white">
                Stop
              </button>
            ) : (
              <button type="submit" disabled={!draft.trim()} className="mb-1 rounded-full bg-[#241C15] px-3 py-1.5 text-sm text-white disabled:opacity-30">
                Send
              </button>
            )}
          </div>
          {error && <p className="mx-auto mt-2 max-w-3xl text-center text-sm text-[#4A3022]">{error}</p>}
          {speech.error && <p className="mx-auto mt-2 max-w-3xl text-center text-sm text-[#4A3022]">{speech.error}</p>}
        </form>
      </section>
    </div>
  );
};
