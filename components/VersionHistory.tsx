import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { History, X } from 'lucide-react';
import { VERSIONS } from '../content';

interface VersionHistoryProps {
  variant?: 'ink' | 'light';
}

export const VersionHistory: React.FC<VersionHistoryProps> = ({ variant = 'ink' }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const ink = variant === 'ink';

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] transition-colors ${
          ink
            ? 'border-white/20 bg-black/40 text-stone-200 hover:border-orange-400/70 hover:text-orange-300'
            : 'border-stone-800/20 bg-white/70 text-stone-800 hover:border-orange-600 hover:text-orange-700'
        }`}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <History size={14} />
        Version history
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[80] overflow-y-auto bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          role="presentation"
        >
          <div className="flex min-h-full items-start justify-center py-20 sm:items-center sm:py-10">
          <div
            role="dialog"
            aria-labelledby="version-title"
            className="w-full max-w-2xl border border-white/10 bg-[#11100c] p-6 text-stone-100 shadow-2xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-orange-400">Archive</p>
                <h2 id="version-title" className="mt-1 font-display text-3xl text-stone-50">
                  Previous selves of this site
                </h2>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-stone-400">
                  The circuit atlas, the road trip, and the garage remain intact. They are how I used to introduce the work. This page is how I introduce the mind.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full border border-white/15 p-2 text-stone-400 hover:text-white"
                aria-label="Close version history"
              >
                <X size={16} />
              </button>
            </div>

            <ul className="space-y-3">
              {VERSIONS.map((v) => (
                <li key={v.version}>
                  <Link
                    to={v.href}
                    className={`block border px-4 py-4 transition-colors ${
                      v.current
                        ? 'border-orange-500/50 bg-orange-500/10'
                        : 'border-white/10 hover:border-orange-400/40 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-orange-300">{v.version}</span>
                      {v.current && (
                        <span className="font-mono text-[10px] uppercase tracking-widest text-stone-500">you are here</span>
                      )}
                    </div>
                    <p className="mt-1 font-display text-xl text-stone-50">{v.title}</p>
                    <p className="mt-1 text-sm text-stone-400">{v.blurb}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          </div>
        </div>
      )}
    </>
  );
};
