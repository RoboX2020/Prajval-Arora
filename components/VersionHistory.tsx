import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { History, X } from 'lucide-react';
import { VERSIONS } from '../content';

function isCurrent(href: string, path: string) {
  if (href === '/') return path === '/';
  if (href === '/v1') return path === '/v1';
  return path === href;
}

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
            ? 'border-[#5a4a32] bg-[#241c16] text-[#e6d9c4] hover:border-[#d4b87a] hover:text-[#d4b87a]'
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
          className="fixed inset-0 z-[80] overflow-y-auto bg-[#1c1814]/92 p-4"
          onClick={() => setOpen(false)}
          role="presentation"
        >
          <div className="flex min-h-full items-start justify-center py-20 sm:items-center sm:py-10">
          <div
            role="dialog"
            aria-labelledby="version-title"
            className="origin-root w-full max-w-2xl border border-[#5a4a32] bg-[#241c16] p-6 text-[#e6d9c4] shadow-2xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#d4b87a]">Archive</p>
                <h2 id="version-title" className="mt-1 font-display text-3xl text-[#f0e6d4]">
                  Previous selves of this site
                </h2>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-[#b8a894]">
                  I keep the circuit atlas, the road trip, and the garage intact. I used them to introduce the work. This page introduces the mind.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full border border-[#5a4a32] p-2 text-[#b8a894] hover:text-[#f0e6d4]"
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
                      isCurrent(v.href, location.pathname)
                        ? 'border-[#c4a35a]/60 bg-[#c4a35a]/10'
                        : 'border-[#3d3228] hover:border-[#c4a35a]/50 hover:bg-[#1c1814]'
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#d4b87a]">{v.version}</span>
                      {isCurrent(v.href, location.pathname) && (
                        <span className="font-mono text-[10px] uppercase tracking-widest text-[#8a7a68]">you are here</span>
                      )}
                    </div>
                    <p className="mt-1 font-display text-xl text-[#f0e6d4]">{v.title}</p>
                    <p className="mt-1 text-sm text-[#b8a894]">{v.blurb}</p>
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
