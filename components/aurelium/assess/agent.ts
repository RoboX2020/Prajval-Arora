import { GoogleGenAI, type Content, type FunctionCall } from '@google/genai';
import { blankState, type SessionState } from './score';
import { TOOL_DECLARATIONS, applyTool, ledgerLine } from './tools';

export const MODEL = 'gemini-2.5-flash';

const SYSTEM = `You are Aurelium, in an ordinary chat.

The person wants to know a subject well enough to score 100. They will say the goal in the conversation. They may paste a syllabus, a practice paper, or a list of questions. That text is the course.

Talk like a person, not a worksheet. Short turns. One question at a time. If they do not know, explain the missing idea in a few sentences, then ask a different question later. Do not dump outlines.

The score is computed by tools. You do not invent it.
- When you know what they must be able to do, call register_items. Skip this on a greeting. Add items later if a paste was incomplete. Never delete items.
- After they answer a registered item, call record_attempt. Use assistance "none" only when you did not hint or explain. hint and explanation never count, even if they then repeat the right idea.
- Do not record an item as correct in the same turn you explained it.
- Once items exist, call list_open before you pick the next question. Leave secured items alone.
- Call read_source with a short query only when you need wording from something they pasted earlier.
- Never say they know the subject, or would score 100, unless the latest tool result says the score is 100.
- If they ask to stop, stop. If they ask for the answer during a check, give the smallest hint, record the hint, and do not count the item.
- Keep going for as many turns as it takes.

A line at the start of their latest message is the live score. Trust that line and the tools.`;

export type ChatIn = {
  role: 'user' | 'model';
  text: string;
};

export type AureliumEvent =
  | { type: 'text'; text: string }
  | { type: 'tool'; name: string }
  | { type: 'state'; state: SessionState }
  | { type: 'error'; message: string };

export function normalizeState(value: unknown): SessionState {
  const raw = (value && typeof value === 'object' ? value : {}) as Partial<SessionState>;
  const base = blankState();
  return {
    ...base,
    goal: typeof raw.goal === 'string' ? raw.goal.slice(0, 4000) : '',
    syllabus: typeof raw.syllabus === 'string' ? raw.syllabus.slice(0, 40000) : '',
    exam: typeof raw.exam === 'string' ? raw.exam.slice(0, 40000) : '',
    corpus: typeof raw.corpus === 'string' ? raw.corpus.slice(-80000) : '',
    items: Array.isArray(raw.items)
      ? raw.items
          .filter((item): item is SessionState['items'][number] => Boolean(item) && typeof item === 'object')
          .slice(0, 40)
          .map((item) => ({
            id: typeof item.id === 'string' ? item.id.slice(0, 40) : '',
            concept: typeof item.concept === 'string' ? item.concept.slice(0, 200) : '',
            stem: typeof item.stem === 'string' ? item.stem.slice(0, 500) : '',
          }))
          .filter((item) => item.id && item.concept && item.stem)
      : [],
    attempts: Array.isArray(raw.attempts) ? raw.attempts.filter((attempt) => attempt && typeof attempt === 'object').slice(-400) : [],
    gaps: raw.gaps && typeof raw.gaps === 'object' ? raw.gaps : {},
  };
}

function modelContents(messages: ChatIn[], state: SessionState): Content[] {
  const turns = messages.filter((turn) => turn.text.trim()).slice(-16);
  return turns.map((turn, index) => {
    const last = index === turns.length - 1 && turn.role === 'user';
    const text = last ? `${ledgerLine(state)}\n\n${turn.text}` : turn.text;
    return { role: turn.role, parts: [{ text }] };
  });
}

export async function* runAurelium(params: {
  apiKey: string;
  state: SessionState;
  messages: ChatIn[];
}): AsyncGenerator<AureliumEvent> {
  const apiKey = params.apiKey.trim();
  if (!apiKey) {
    yield { type: 'error', message: 'Aurelium has no model key on the server yet.' };
    return;
  }

  const ai = new GoogleGenAI({ apiKey });
  let state = normalizeState(params.state);
  let contents = modelContents(params.messages, state);
  if (!contents.length) {
    yield { type: 'error', message: 'Say something to begin.' };
    return;
  }

  for (let step = 0; step < 5; step += 1) {
    const stream = await ai.models.generateContentStream({
      model: MODEL,
      contents,
      config: {
        systemInstruction: SYSTEM,
        temperature: 0.6,
        maxOutputTokens: 800,
        tools: [{ functionDeclarations: TOOL_DECLARATIONS }],
      },
    });

    const calls = new Map<string, FunctionCall>();
    let fullText = '';
    for await (const chunk of stream) {
      const text = chunk.text || '';
      if (text) {
        fullText += text;
        yield { type: 'text', text };
      }
      for (const call of chunk.functionCalls ?? []) {
        const key = call.id || `${call.name}:${JSON.stringify(call.args ?? {})}`;
        calls.set(key, call);
      }
    }

    const list = [...calls.values()];
    if (!list.length) {
      if (!fullText) yield { type: 'text', text: 'Say that again, and I will ask the next question.' };
      yield { type: 'state', state };
      return;
    }

    contents = [
      ...contents,
      {
        role: 'model',
        parts: [
          ...(fullText ? [{ text: fullText }] : []),
          ...list.map((call) => ({ functionCall: call })),
        ],
      },
    ];

    const parts = list.map((call) => {
      const effect = applyTool(state, call.name || '', call.args ?? {});
      state = effect.state;
      return {
        functionResponse: {
          name: call.name,
          id: call.id,
          response: effect.output,
        },
      };
    });
    for (const call of list) {
      if (call.name) yield { type: 'tool', name: call.name };
    }
    contents = [...contents, { role: 'user', parts }];
  }

  yield { type: 'text', text: 'Ask me to continue.' };
  yield { type: 'state', state };
}
