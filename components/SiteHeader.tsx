import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { PERSON } from '../content';
import { VersionHistory } from './VersionHistory';

export type HeaderNavItem = { href: string; label: string };

interface SiteHeaderProps {
  nav?: HeaderNavItem[];
  archiveLabel?: string;
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({ nav, archiveLabel }) => {
  const location = useLocation();
  const home = location.pathname === '/';
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  return (
    <header className="origin-root sticky top-0 z-[70] border-b border-[#3d3228] bg-[#241c16] text-[#e6d9c4]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3">
        <Link to="/" className="shrink-0 font-display text-lg tracking-tight text-[#f0e6d4]">
          {PERSON.first}
          <span className="text-[#d4b87a]">.</span>
        </Link>

        {home && nav ? (
          <nav className="hidden items-center gap-6 lg:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#b8a894] hover:text-[#d4b87a]"
              >
                {item.label}
              </a>
            ))}
          </nav>
        ) : (
          <p className="hidden min-w-0 truncate font-mono text-[10px] uppercase tracking-[0.18em] text-[#d4b87a] sm:block">
            {archiveLabel ? `Archived · ${archiveLabel}` : 'Archive'}
          </p>
        )}

        <div className="flex shrink-0 items-center gap-2">
          {!home && (
            <Link
              to="/"
              className="hidden font-mono text-[10px] uppercase tracking-[0.16em] text-[#8a7a68] hover:text-[#d4b87a] sm:inline"
            >
              Current site
            </Link>
          )}
          <VersionHistory />
          {home && nav && (
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="inline-flex items-center justify-center rounded-full border border-[#5a4a32] bg-[#241c16] p-2 text-[#e6d9c4] transition-colors hover:border-[#d4b87a] hover:text-[#d4b87a] lg:hidden"
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <Menu size={16} />
            </button>
          )}
        </div>
      </div>

      {menuOpen && home && nav && (
        <div
          className="fixed inset-0 z-[90] bg-[#1c1814] p-4"
          role="presentation"
          onClick={() => setMenuOpen(false)}
        >
          <div
            role="dialog"
            aria-label="Site menu"
            className="mx-auto flex h-full w-full max-w-6xl flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#3d3228] py-3">
              <span className="font-display text-lg tracking-tight text-[#f0e6d4]">
                {PERSON.first}
                <span className="text-[#d4b87a]">.</span>
              </span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="rounded-full border border-[#5a4a32] p-2 text-[#b8a894] hover:text-[#f0e6d4]"
                aria-label="Close menu"
              >
                <X size={16} />
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center gap-1 overflow-y-auto py-6">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-[#3d3228]/70 py-4 font-display text-3xl text-[#f0e6d4] transition-colors hover:text-[#d4b87a]"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <p className="pb-6 font-mono text-[10px] uppercase tracking-[0.22em] text-[#8a7a68]">
              Independent thought · interdisciplinary build
            </p>
          </div>
        </div>
      )}
    </header>
  );
};
