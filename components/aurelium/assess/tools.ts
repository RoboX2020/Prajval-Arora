import type { FunctionDeclaration } from '@google/genai';
import {
  type Attempt,
  type Item,
  type SessionState,
  clip,
  itemStatus,
  normalizeAssistance,
  openItems,
  scoreOf,
} from './score';

export type ToolOutput = Record<string, unknown>;

export type ToolEffect = {
  state: SessionState;
  output: ToolOutput;
};

const MAX_ITEMS = 40;

export const TOOL_DECLARATIONS: FunctionDeclaration[] = [
  {
    name: 'register_items',
    description:
      'Register concrete checkable items from the goal, syllabus, and exam. Call once at the start. Call again only to add missing items. Existing items cannot be deleted. Do not call on later turns if coverage is already complete.',
    parametersJsonSchema: {
      type: 'object',
      properties: {
        items: {
          type: 'array',
          description: 'Specific items a learner can get right or wrong. Cover the paper. Prefer fewer precise items over vague topics, up to 40.',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string', description: 'Short stable id, letters and numbers.' },
              concept: { type: 'string', description: 'The idea being checked.' },
              stem: { type: 'string', description: 'What a correct unaided answer must show.' },
            },
            required: ['id', 'concept', 'stem'],
          },
        },
      },
      required: ['items'],
    },
  },
  {
    name: 'list_open',
    description:
      'List only items that are not yet secured. Call this before choosing the next question. Do not use it to reread the whole paper.',
    parametersJsonSchema: { type: 'object', properties: {} },
  },
  {
    name: 'read_source',
    description:
      'Read a small slice of the original goal, syllabus, or exam. Call only when you need wording you do not already have. Pass a short query so the result stays small.',
    parametersJsonSchema: {
      type: 'object',
      properties: {
        source: { type: 'string', enum: ['goal', 'syllabus', 'exam'] },
        query: { type: 'string', description: 'A short phrase to find. Omit only if you need the opening of the source.' },
      },
      required: ['source'],
    },
  },
  {
    name: 'record_attempt',
    description:
      'Record the learner’s latest answer against one item. assistance "none" is the only way an answer can count. hint and explanation are stored as not correct, even if you pass correct true. Never record an explained answer as unaided.',
    parametersJsonSchema: {
      type: 'object',
      properties: {
        itemId: { type: 'string' },
        correct: { type: 'boolean', description: 'True only when the unaided answer meets the stem.' },
        assistance: { type: 'string', enum: ['none', 'hint', 'explanation'] },
        learnerAnswer: { type: 'string', description: 'What the learner actually said, briefly.' },
        note: { type: 'string', description: 'What you asked, and why this judgment was made.' },
      },
      required: ['itemId', 'correct', 'assistance', 'learnerAnswer', 'note'],
    },
  },
  {
    name: 'note_gap',
    description: 'Remember one misconception on an item. Call when the mistake is specific. Do not call for a correct unaided answer.',
    parametersJsonSchema: {
      type: 'object',
      properties: {
        itemId: { type: 'string' },
        gap: { type: 'string' },
      },
      required: ['itemId', 'gap'],
    },
  },
];

function slug(value: string, fallback: string): string {
  const cleaned = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 32);
  return cleaned || fallback;
}

function ledger(state: SessionState): ToolOutput {
  const score = scoreOf(state.items, state.attempts);
  const open = openItems(state).map((item) => item.id);
  return {
    score: score.percent,
    secured: score.secured,
    total: score.total,
    openIds: open.slice(0, 12),
    hundred: score.percent === 100,
  };
}

export function registerItems(state: SessionState, raw: unknown): ToolEffect {
  const items = Array.isArray((raw as { items?: unknown })?.items) ? (raw as { items: unknown[] }).items : [];
  const existing = new Map(state.items.map((item) => [item.id, item]));
  let added = 0;
  let skipped = 0;

  for (const entry of items) {
    if (existing.size >= MAX_ITEMS) {
      skipped += 1;
      continue;
    }
    const record = entry as { id?: unknown; concept?: unknown; stem?: unknown };
    const concept = typeof record.concept === 'string' ? record.concept.trim() : '';
    const stem = typeof record.stem === 'string' ? record.stem.trim() : '';
    if (!concept || !stem) {
      skipped += 1;
      continue;
    }
    const id = slug(typeof record.id === 'string' ? record.id : concept, `item-${existing.size + 1}`);
    if (existing.has(id)) continue;
    existing.set(id, { id, concept: clip(concept, 140), stem: clip(stem, 400) });
    added += 1;
  }

  const next: SessionState = { ...state, items: [...existing.values()] };
  return {
    state: next,
    output: {
      added,
      skipped,
      keptExisting: state.items.length,
      ...ledger(next),
      rule: 'Items already registered stay on the list. Helped answers never raise the score.',
    },
  };
}

export function listOpen(state: SessionState): ToolEffect {
  const open = openItems(state).slice(0, 8).map((item) => ({
    id: item.id,
    concept: item.concept,
    stem: clip(item.stem, 220),
    status: itemStatus(state.attempts, item.id),
    gap: state.gaps[item.id] || '',
  }));
  return {
    state,
    output: {
      ...ledger(state),
      open,
      note: open.length ? 'Ask one unaided question on an open item.' : 'Every item is secured.',
    },
  };
}

export function readSource(state: SessionState, raw: unknown): ToolEffect {
  const source = (raw as { source?: unknown })?.source;
  const query = typeof (raw as { query?: unknown })?.query === 'string' ? (raw as { query: string }).query.trim() : '';
  const text = source === 'goal' ? state.goal : source === 'syllabus' ? state.syllabus : source === 'exam' ? state.exam : '';
  if (source !== 'goal' && source !== 'syllabus' && source !== 'exam') {
    return { state, output: { error: 'source must be goal, syllabus, or exam' } };
  }
  if (!text.trim()) return { state, output: { source, excerpt: '', totalChars: 0 } };

  if (!query) {
    return {
      state,
      output: {
        source,
        excerpt: text.slice(0, 1600),
        totalChars: text.length,
        truncated: text.length > 1600,
      },
    };
  }

  const at = text.toLowerCase().indexOf(query.toLowerCase());
  if (at < 0) {
    return { state, output: { source, excerpt: '', totalChars: text.length, query, matched: false } };
  }
  const start = Math.max(0, at - 180);
  return {
    state,
    output: {
      source,
      excerpt: text.slice(start, start + 1400),
      totalChars: text.length,
      query,
      matched: true,
    },
  };
}

export function recordAttempt(state: SessionState, raw: unknown, now = Date.now()): ToolEffect {
  const record = raw as {
    itemId?: unknown;
    correct?: unknown;
    assistance?: unknown;
    learnerAnswer?: unknown;
    note?: unknown;
  };
  const itemId = typeof record.itemId === 'string' ? slug(record.itemId, '') : '';
  const item = state.items.find((entry) => entry.id === itemId);
  if (!item) return { state, output: { error: `Unknown item ${itemId}`, ...ledger(state) } };

  const assistance = normalizeAssistance(record.assistance);
  if (!assistance) return { state, output: { error: 'assistance must be none, hint, or explanation' } };

  const learnerAnswer = typeof record.learnerAnswer === 'string' ? record.learnerAnswer.trim() : '';
  const note = typeof record.note === 'string' ? record.note.trim() : '';
  if (assistance === 'none' && !learnerAnswer) {
    return { state, output: { error: 'An unaided attempt needs the learner’s answer.' } };
  }

  const claimedCorrect = record.correct === true;
  const counts = assistance === 'none' && claimedCorrect;
  const attempt: Attempt = {
    itemId,
    correct: counts,
    assistance,
    note: clip(note, 280),
    learnerAnswer: clip(learnerAnswer, 280),
    at: now,
  };
  const next: SessionState = { ...state, attempts: [...state.attempts, attempt] };
  const status = itemStatus(next.attempts, itemId);
  return {
    state: next,
    output: {
      itemId,
      status,
      counted: counts,
      forcedNotCorrect: claimedCorrect && !counts,
      ...ledger(next),
      rule: counts
        ? 'Unaided correct answer recorded.'
        : 'This attempt does not raise the score. Ask a fresh question later, with no help.',
    },
  };
}

export function noteGap(state: SessionState, raw: unknown): ToolEffect {
  const record = raw as { itemId?: unknown; gap?: unknown };
  const itemId = typeof record.itemId === 'string' ? slug(record.itemId, '') : '';
  const gap = typeof record.gap === 'string' ? clip(record.gap, 240) : '';
  if (!state.items.some((item) => item.id === itemId) || !gap) {
    return { state, output: { error: 'Need a known itemId and a gap.' } };
  }
  return {
    state: { ...state, gaps: { ...state.gaps, [itemId]: gap } },
    output: { itemId, gap, ...ledger(state) },
  };
}

export function applyTool(state: SessionState, name: string, args: unknown): ToolEffect {
  if (name === 'register_items') return registerItems(state, args);
  if (name === 'list_open') return listOpen(state);
  if (name === 'read_source') return readSource(state, args);
  if (name === 'record_attempt') return recordAttempt(state, args);
  if (name === 'note_gap') return noteGap(state, args);
  return { state, output: { error: `Unknown tool ${name}` } };
}

export function ledgerLine(state: SessionState): string {
  const score = scoreOf(state.items, state.attempts);
  if (score.total === 0) return 'Score 0. No items registered yet. Call register_items before teaching.';
  const open = openItems(state).map((item) => item.id);
  const shown = open.slice(0, 10).join(', ');
  const more = open.length > 10 ? ` +${open.length - 10}` : '';
  return `Score ${score.percent}. Secured ${score.secured} of ${score.total}. Open: ${shown || 'none'}${more}. 100 only when every item is secured by an unaided correct answer.`;
}
