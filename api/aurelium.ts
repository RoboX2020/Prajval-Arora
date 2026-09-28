import { runAurelium, normalizeState, type ChatIn } from '../components/aurelium/assess/agent';

type NodeRes = {
  statusCode: number;
  setHeader: (name: string, value: string) => void;
  write: (chunk: string) => void;
  end: (chunk?: string) => void;
};

type NodeReq = {
  method?: string;
  body?: unknown;
};

function readBody(req: NodeReq): { messages: ChatIn[]; state: unknown } {
  const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  const record = (body && typeof body === 'object' ? body : {}) as { messages?: unknown; state?: unknown };
  const messages = Array.isArray(record.messages)
    ? record.messages
        .filter((item) => item && typeof item === 'object')
        .map((item) => {
          const turn = item as { role?: unknown; text?: unknown };
          const role = turn.role === 'model' || turn.role === 'assistant' ? 'model' : 'user';
          return { role, text: typeof turn.text === 'string' ? turn.text.slice(0, 12000) : '' } as ChatIn;
        })
        .filter((turn) => turn.text.trim())
        .slice(-20)
    : [];
  return { messages, state: record.state };
}

export const config = { maxDuration: 60 };

export default async function handler(req: NodeReq, res: NodeRes): Promise<void> {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.end('POST only');
    return;
  }

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');

  try {
    const { messages, state } = readBody(req);
    const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY || '';
    for await (const event of runAurelium({ apiKey, state: normalizeState(state), messages })) {
      res.write(`data: ${JSON.stringify(event)}\n\n`);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'The model request failed.';
    res.write(`data: ${JSON.stringify({ type: 'error', message })}\n\n`);
  }
  res.end();
}
