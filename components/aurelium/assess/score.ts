export type Assistance = 'none' | 'hint' | 'explanation';

export type Item = {
  id: string;
  concept: string;
  stem: string;
};

export type Attempt = {
  itemId: string;
  correct: boolean;
  assistance: Assistance;
  note: string;
  learnerAnswer: string;
  at: number;
};

export type ItemStatus = 'unseen' | 'needs_clean' | 'secured';

export type SessionState = {
  goal: string;
  syllabus: string;
  exam: string;
  items: Item[];
  attempts: Attempt[];
  gaps: Record<string, string>;
};

export function isSecured(attempts: Attempt[], itemId: string): boolean {
  const mine = attempts.filter((attempt) => attempt.itemId === itemId);
  const last = mine[mine.length - 1];
  return Boolean(last && last.correct && last.assistance === 'none');
}

export function itemStatus(attempts: Attempt[], itemId: string): ItemStatus {
  if (isSecured(attempts, itemId)) return 'secured';
  const seen = attempts.some((attempt) => attempt.itemId === itemId);
  return seen ? 'needs_clean' : 'unseen';
}

/** 100 only when every registered item's latest attempt is correct and unaided. */
export function scoreOf(items: Item[], attempts: Attempt[]): { secured: number; total: number; percent: number } {
  const total = items.length;
  const secured = items.filter((item) => isSecured(attempts, item.id)).length;
  if (total === 0) return { secured: 0, total: 0, percent: 0 };
  if (secured === total) return { secured, total, percent: 100 };
  return { secured, total, percent: Math.floor((secured / total) * 100) };
}

export function openItems(state: SessionState): Item[] {
  return state.items.filter((item) => !isSecured(state.attempts, item.id));
}

const ASSISTANCE = new Set<Assistance>(['none', 'hint', 'explanation']);

export function normalizeAssistance(value: unknown): Assistance | null {
  return typeof value === 'string' && ASSISTANCE.has(value as Assistance) ? (value as Assistance) : null;
}

export function clip(text: string, max: number): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1)}…`;
}
