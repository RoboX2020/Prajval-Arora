import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SiteHeader } from './SiteHeader';

export const NotFoundPage: React.FC = () => {
  useEffect(() => {
    document.title = '404 — Prajval Arora';
    return () => {
      document.title = 'Prajval Arora — Independent thought, interdisciplinary build';
    };
  }, []);

  return (
    <div className="origin-root relative min-h-screen bg-[#1c1814] text-[#e6d9c4]">
      <SiteHeader />
      <main className="mx-auto flex max-w-3xl flex-col px-5 py-24">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#d4b87a]">Error 404</p>
        <h1 className="mt-4 font-display text-5xl leading-tight text-[#f0e6d4] md:text-7xl">This joint does not exist.</h1>
        <p className="mt-6 max-w-lg text-base leading-relaxed text-[#b8a894]">
          That address is not on this map. The current site, the circuit atlas, and the garage still are.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            to="/"
            className="inline-flex items-center bg-[#c4a35a] px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[#1c1814] hover:bg-[#d4b87a]"
          >
            Current site
          </Link>
          <Link
            to="/v1"
            className="inline-flex items-center border border-[#c4a35a]/40 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[#e6d9c4] hover:border-[#d4b87a]"
          >
            Version history
          </Link>
        </div>
      </main>
    </div>
  );
};
