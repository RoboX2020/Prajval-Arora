import { FunctionCallingConfigMode, GoogleGenAI, type Content } from '@google/genai';
import type { SessionState } from './score';
import { TOOL_DECLARATIONS, applyTool, ledgerLine } from './tools';

export const MODEL = 'gemini-2.5-flash';

export const builtInKey = (process.env.API_KEY || process.env.GEMINI_API_KEY || '').trim();

const SYSTEM = `You are Aurelium, an assessment tutor in a spoken conversation.

The learner brought a goal and, usually, a syllabus and a practice paper. Stay with them until they can answer every registered item correctly with no help. That is the only way the score reaches 100. You do not invent the score. The tools compute it. Helped answers are stored as not correct.

Work this way:
1. If no items are registered, call read_source only for text you were not given, then register_items. Items must be specific enough to mark right or wrong, drawn from the goal, syllabus, and exam. Then ask the first question.
2. Ask one question at a time, then wait.
3. After an answer, call record_attempt. Use assistance "none" only when you did not hint or explain. If you helped, use "hint" or "explanation". Those never count, even if the learner then repeats the right idea.
4. If they do not know, explain the smallest useful piece, record the help, and later ask a different question on that same item. Do not mark an item secured in the turn you explained it.
5. Before choosing the next question, call list_open. Leave secured items alone.
6. Call read_source only for original wording you do not already have. Pass a short query.
7. Speak in plain sentences a person can hear. No tables and no long outlines. End the turn with one question, unless the tool result says the score is 100. Then stop questioning and say they scored 100.
8. Never say they know the subject, or would score 100, unless the latest tool result says score is 100.
9. If they ask to stop, stop. If they ask for the answer during a check, give the smallest hint, record it, and do not count the item.
10. Keep going for as many turns as it takes. Do not shrink the item list to raise the score.

A line at the start of the learner's latest message is the live score. Trust that line and the tools, not your memory of the percentage.`;

export type TranscriptTurn = {
  role: 'user' | 'model';
  text: string;
  hidden?: boolean;
};

export type ToolEvent = {
  name: string;
  output: Record<string, unknown>;
};

type RunParams = {
  apiKey: string;
  state: SessionState;
  turns: TranscriptTurn[];
  onTool?: (event: ToolEvent) => void;
};

function modelContents(turns: TranscriptTurn[], state: SessionState): Content[] {
  const visible = turns.filter((turn) => turn.text.trim());
  const first = visible[0];
  const rest = visible.slice(1);
  const tail = rest.slice(-12);
  const omitted = rest.length - tail.length;
  const contents: Content[] = [];

  if (first) contents.push({ role: 'user', parts: [{ text: first.text }] });
  if (omitted > 0) {
    contents.push({
      role: 'user',
      parts: [{ text: `${omitted} earlier turns are omitted. Use the score line and list_open, not memory of old questions.` }],
    });
    contents.push({
      role: 'model',
      parts: [{ text: 'I will use the score line and the open items.' }],
    });
  }

  tail.forEach((turn, index) => {
    const last = index === tail.length - 1 && turn.role === 'user';
    const text = last ? `${ledgerLine(state)}\n\n${turn.text}` : turn.text;
    contents.push({ role: turn.role, parts: [{ text }] });
  });

  if (!contents.length) {
    contents.push({ role: 'user', parts: [{ text: ledgerLine(state) }] });
  }
  return contents;
}

export async function runAssessmentTurn({ apiKey, state, turns, onTool }: RunParams): Promise<{
  state: SessionState;
  text: string;
  tools: string[];
}> {
  const ai = new GoogleGenAI({ apiKey });
  let contents = modelContents(turns, state);
  let next = state;
  const tools: string[] = [];
  let forceRegister = next.items.length === 0;

  for (let step = 0; step < 6; step += 1) {
    const response = await ai.models.generateContent({
      model: MODEL,
      contents,
      config: {
        systemInstruction: SYSTEM,
        temperature: 0.4,
        maxOutputTokens: 900,
        tools: [{ functionDeclarations: TOOL_DECLARATIONS }],
        toolConfig: forceRegister
          ? {
              functionCallingConfig: {
                mode: FunctionCallingConfigMode.ANY,
                allowedFunctionNames: ['register_items', 'read_source'],
              },
            }
          : undefined,
      },
    });
    forceRegister = false;

    const calls = response.functionCalls ?? [];
    if (!calls.length) {
      const text = (response.text || '').trim();
      return { state: next, text: text || 'Say that again in one sentence, and I will ask the next question.', tools };
    }

    const modelContent = response.candidates?.[0]?.content;
    contents = [
      ...contents,
      modelContent?.parts?.length
        ? { role: 'model', parts: modelContent.parts }
        : {
            role: 'model',
            parts: calls.map((call) => ({ functionCall: call })),
          },
    ];

    const parts = calls.map((call) => {
      const effect = applyTool(next, call.name || '', call.args ?? {});
      next = effect.state;
      if (call.name) tools.push(call.name);
      onTool?.({ name: call.name || 'tool', output: effect.output });
      return {
        functionResponse: {
          name: call.name,
          id: call.id,
          response: effect.output,
        },
      };
    });
    contents = [...contents, { role: 'user', parts }];
  }

  return {
    state: next,
    text: 'I have the record. Ask me to continue, and I will ask the next open question.',
    tools,
  };
}

export function openingTurn(state: SessionState): string {
  const syllabus = state.syllabus.trim();
  const exam = state.exam.trim();
  return [
    'Begin the assessment.',
    `Goal:\n${state.goal.trim()}`,
    `Syllabus (${syllabus.length} characters):\n${syllabus ? syllabus.slice(0, 2500) : '(none)'}`,
    `Practice exam or questions (${exam.length} characters):\n${exam ? exam.slice(0, 2500) : '(none)'}`,
    'If a source was cut off, call read_source with a query before you finish registering items. Then ask the first question.',
  ].join('\n\n');
}
