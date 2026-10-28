import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const THEME_KEY = 'site-theme';

export const ThemeToggle: React.FC = () => {
  const [light, setLight] = useState<boolean>(() =>
    typeof document !== 'undefined' && document.documentElement.classList.contains('light')
  );

  useEffect(() => {
    document.documentElement.classList.toggle('light', light);
    try {
      localStorage.setItem(THEME_KEY, light ? 'light' : 'dark');
    } catch {
      /* private mode: theme stays session-only */
    }
  }, [light]);

  return (
    <button
      type="button"
      onClick={() => setLight((v) => !v)}
      aria-label={light ? 'Switch to dark mode' : 'Switch to light mode'}
      aria-pressed={light}
      title={light ? 'Switch to dark mode' : 'Switch to light mode'}
      className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[#5a4a32] text-[#b8a894] transition-colors hover:border-[#d4b87a] hover:text-[#d4b87a]"
    >
      {light ? <Moon size={16} /> : <Sun size={16} />}
    </button>
  );
};
