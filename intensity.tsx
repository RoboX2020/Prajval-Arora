import React, { createContext, useContext, useState } from 'react';

export const INTENSITY_MIN = 1;
export const INTENSITY_MAX = 6;
export const DEFAULT_INTENSITY = 3;

export const INTENSITY_NAMES = [
  'baby book',
  'young reader',
  "plain words, like I'd tell a friend",
  'careful and precise',
  'technical',
  'research paper',
] as const;

export const readingLabel = (level: number): string =>
  level === DEFAULT_INTENSITY
    ? `${INTENSITY_NAMES[DEFAULT_INTENSITY - 1]} (default)`
    : INTENSITY_NAMES[level - 1];

interface IntensityCtx {
  level: number;
  setLevel: (n: number) => void;
}

const Ctx = createContext<IntensityCtx>({ level: DEFAULT_INTENSITY, setLevel: () => {} });

export const IntensityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Pick the starting level: a `?words=N` link override wins (handy for
  // sharing a specific reading level), otherwise the visitor's earlier
  // choice this visit, otherwise the plain default.
  const [level, setLevelState] = useState<number>(() => {
    try {
      const fromUrl = new URLSearchParams(window.location.search).get('words');
      const n = fromUrl ? parseInt(fromUrl, 10) : NaN;
      if (n >= INTENSITY_MIN && n <= INTENSITY_MAX) return n;
    } catch (e) { /* ignore */ }
    try {
      const saved = sessionStorage.getItem('word-intensity');
      const n = saved ? parseInt(saved, 10) : NaN;
      if (n >= INTENSITY_MIN && n <= INTENSITY_MAX) return n;
    } catch (e) { /* ignore */ }
    return DEFAULT_INTENSITY;
  });

  const setLevel = (n: number) => {
    const v = Math.min(INTENSITY_MAX, Math.max(INTENSITY_MIN, Math.round(n)));
    setLevelState(v);
    try { sessionStorage.setItem('word-intensity', String(v)); } catch (e) { /* ignore */ }
  };

  return <Ctx.Provider value={{ level, setLevel }}>{children}</Ctx.Provider>;
};

export const useIntensity = () => useContext(Ctx);

export type WordVariants = [string, string, string, string, string, string];

/** Renders the copy variant for the visitor's current word-intensity level. */
export const Words: React.FC<{ v: WordVariants }> = ({ v }) => {
  const { level } = useIntensity();
  return <>{v[level - 1]}</>;
};
