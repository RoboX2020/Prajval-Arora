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
    <header className="origin-root sticky top-0 z-[70] border-b border-[#3d3228] bg-[#241c16] text-[#e6d9c4]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3">
        <Link to="/" className="shrink-0 font-display text-lg tracking-tight text-[#f0e6d4]">
          {PERSON.first}
          <span className="text-[#d4b87a]">.</span>
        </Link>

        {home && nav ? (
          <nav className="hidden items-center gap-6 md:flex">
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
        </div>
      </div>
    </header>
  );
};
