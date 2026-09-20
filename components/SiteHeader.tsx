import React from 'react';
import { Link, useLocation } from 'react-router-dom';
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

  return (
    <header className="origin-root sticky top-0 z-[70] border-b border-white/10 bg-[#0c0b09]/85 text-[#f3ece3] backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3">
        <Link to="/" className="shrink-0 font-display text-lg tracking-tight text-stone-100">
          {PERSON.first}
          <span className="text-orange-400">.</span>
        </Link>

        {home && nav ? (
          <nav className="hidden items-center gap-6 md:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="font-mono text-[10px] uppercase tracking-[0.22em] text-stone-400 hover:text-orange-300"
              >
                {item.label}
              </a>
            ))}
          </nav>
        ) : (
          <p className="hidden min-w-0 truncate font-mono text-[10px] uppercase tracking-[0.18em] text-orange-400 sm:block">
            {archiveLabel ? `Archived · ${archiveLabel}` : 'Archive'}
          </p>
        )}

        <div className="flex shrink-0 items-center gap-2">
          {!home && (
            <Link
              to="/"
              className="hidden font-mono text-[10px] uppercase tracking-[0.16em] text-stone-500 hover:text-orange-300 sm:inline"
            >
              Current site
            </Link>
          )}
          <VersionHistory />
        </div>
      </div>
    </header>
  );
};
