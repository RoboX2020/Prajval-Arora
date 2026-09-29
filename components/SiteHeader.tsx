import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Github, Instagram, Linkedin, Menu, X } from 'lucide-react';
import { PERSON } from '../content';
import { VersionHistory } from './VersionHistory';

export type HeaderNavItem = { href: string; label: string };

interface SiteHeaderProps {
  nav?: HeaderNavItem[];
  archiveLabel?: string;
}

const SOCIALS = [
  { href: PERSON.github, label: 'GitHub', Icon: Github },
  { href: PERSON.linkedin, label: 'LinkedIn', Icon: Linkedin },
  { href: PERSON.instagramProfile, label: 'Instagram', Icon: Instagram },
];

export const SiteHeader: React.FC<SiteHeaderProps> = ({ nav, archiveLabel }) => {
  const location = useLocation();
  const home = location.pathname === '/';
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    setMenu(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!menu) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenu(false);
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [menu]);

  return (
    <header className="origin-root sticky top-0 z-[70] border-b border-[#3d3228] bg-[#241c16] text-[#e6d9c4]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3">
        <Link to="/" className="shrink-0 font-display text-lg tracking-tight text-[#f0e6d4]">
          {PERSON.first}
          <span className="text-[#d4b87a]">.</span>
        </Link>

        {home && nav ? (
          <nav className="hidden items-center gap-6 md:flex" aria-label="Sections">
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
          <nav className="flex items-center gap-1" aria-label="Social">
            {SOCIALS.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="inline-flex h-8 w-8 items-center justify-center text-[#e6d9c4] hover:text-[#d4b87a]"
              >
                <Icon size={16} strokeWidth={1.75} />
              </a>
            ))}
          </nav>
          {!home && (
            <Link
              to="/"
              className="hidden font-mono text-[10px] uppercase tracking-[0.16em] text-[#8a7a68] hover:text-[#d4b87a] md:inline"
            >
              Current site
            </Link>
          )}
          <VersionHistory compact />
          <button
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center text-[#e6d9c4] hover:text-[#d4b87a] md:hidden"
            aria-expanded={menu}
            aria-controls="site-menu"
            onClick={() => setMenu((open) => !open)}
          >
            {menu ? <X size={18} /> : <Menu size={18} />}
            <span className="sr-only">{menu ? 'Close menu' : 'Open menu'}</span>
          </button>
        </div>
      </div>

      <div className={`md:hidden ${menu ? '' : 'pointer-events-none'}`} inert={menu ? undefined : true}>
        <button
          type="button"
          className={`fixed inset-0 z-[75] bg-[#1c1814]/70 transition-opacity ${menu ? 'opacity-100' : 'opacity-0'}`}
          aria-label="Close menu"
          onClick={() => setMenu(false)}
        />
        <nav
          id="site-menu"
          aria-label="Phone"
          className={`fixed bottom-0 right-0 top-0 z-[76] flex w-[min(20rem,86vw)] flex-col border-l border-[#3d3228] bg-[#241c16] px-6 py-6 transition-transform duration-200 ${
            menu ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#d4b87a]">Menu</p>
            <button
              type="button"
              className="inline-flex h-8 w-8 items-center justify-center text-[#e6d9c4] hover:text-[#d4b87a]"
              onClick={() => setMenu(false)}
            >
              <X size={18} />
              <span className="sr-only">Close menu</span>
            </button>
          </div>
          <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.22em] text-[#d4b87a]">
            {home ? 'On this page' : archiveLabel ? `Archived · ${archiveLabel}` : 'Archive'}
          </p>
          <div className="mt-6 flex flex-col gap-1">
            {home && nav
              ? nav.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="border-b border-[#3d3228] py-3 font-display text-2xl text-[#f0e6d4] hover:text-[#d4b87a]"
                    onClick={() => setMenu(false)}
                  >
                    {item.label}
                  </a>
                ))
              : (
                  <Link
                    to="/"
                    className="border-b border-[#3d3228] py-3 font-display text-2xl text-[#f0e6d4] hover:text-[#d4b87a]"
                    onClick={() => setMenu(false)}
                  >
                    Current site
                  </Link>
                )}
          </div>
          <div className="mt-auto space-y-3 pt-10">
            {SOCIALS.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-[#e6d9c4] hover:text-[#d4b87a]"
              >
                <Icon size={18} strokeWidth={1.75} />
                <span className="font-mono text-[11px] uppercase tracking-[0.18em]">{label}</span>
              </a>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
};
