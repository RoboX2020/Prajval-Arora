import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { CONTRIBUTIONS, Contribution } from './contributionsData';

const label = 'font-mono text-[10px] uppercase tracking-[0.18em] text-[#d4b87a]';

const Entry: React.FC<{ c: Contribution; i: number }> = ({ c, i }) => (
  <article className="border border-[#3d3228] bg-[#241c16]/60">
    <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-[#3d3228] px-5 py-4">
      <div className="min-w-0">
        <p className={label}>{c.repo}</p>
        <h3 className="mt-2 font-display text-2xl leading-tight text-[#f0e6d4]">
          <a href={c.url} target="_blank" rel="noreferrer" className="hover:text-[#d4b87a]">#{c.pr} {c.title}</a>
        </h3>
      </div>
      <div className="flex shrink-0 items-center gap-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#8a7a68]">Merged {c.merged}</span>
        <span className="font-display text-2xl text-[#8a7a68]">{String(i + 1).padStart(2, '0')}</span>
      </div>
    </div>
    <div className="grid gap-6 p-5 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <a href={c.url} target="_blank" rel="noreferrer" className="block self-start border border-[#3d3228]">
        <img src={`/contributions/${c.shot}`} alt={`Screenshot of ${c.repo} pull request ${c.pr}`} className="block w-full" loading="lazy" />
      </a>
      <div className="min-w-0">
        <p className={label}>The problem</p>
        <p className="mt-2 text-sm leading-7 text-[#c4b49a]">{c.problem}</p>
        <p className={`${label} mt-5`}>The fix</p>
        <p className="mt-2 text-sm leading-7 text-[#c4b49a]">{c.fix}</p>
        <p className={`${label} mt-5`}>Exact changes</p>
        <p className="mt-2 text-sm leading-7 text-[#c4b49a]">{c.changes}</p>
        {c.note && <p className="mt-4 border-l-2 border-[#d4b87a] pl-3 text-sm leading-6 text-[#b8a894]">{c.note}</p>}
        <a href={c.url} target="_blank" rel="noreferrer" className={`${label} mt-5 inline-flex min-h-11 items-center gap-2 border border-[#d4b87a] px-4 py-3`}>
          View the merged PR <ArrowUpRight size={14} />
        </a>
      </div>
    </div>
  </article>
);

export const ContributionsPage: React.FC = () => {
  useEffect(() => { const old = document.title; document.title = 'Open source contributions · Prajval Arora'; window.scrollTo(0, 0); return () => { document.title = old; }; }, []);
  const repos = new Set(CONTRIBUTIONS.map((c) => c.repo)).size;
  return <div className="origin-root min-h-screen bg-[#1c1814] text-[#e6d9c4]">
    <header className="border-b border-[#3d3228] bg-[#241c16]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
        <Link to="/" className="font-display text-xl text-[#f0e6d4]">Prajval<span className="text-[#d4b87a]">.</span></Link>
        <Link to="/#now" className={`${label} inline-flex min-h-11 items-center gap-2`}><ArrowLeft size={14} /> Back to portfolio</Link>
      </div>
    </header>
    <main className="mx-auto max-w-6xl px-5 pb-16">
      <section className="grid gap-8 pb-10 pt-12 md:grid-cols-[1.25fr_1fr] md:pt-20">
        <div>
          <p className={label}>Open source</p>
          <h1 className="mt-5 font-display text-[clamp(3rem,9vw,6rem)] leading-[0.95] tracking-tight text-[#f0e6d4]">Contributions<br /><span className="italic text-[#d4b87a]">merged upstream.</span></h1>
        </div>
        <div className="flex flex-col justify-end">
          <p className="text-lg leading-relaxed text-[#c4b49a]">Since September 2026 I have been sending fixes and tests to open source robotics, simulation and vision libraries. These are the pull requests maintainers reviewed and merged, newest first.</p>
        </div>
      </section>
      <dl className="grid gap-6 border-y border-[#3d3228] py-6 sm:grid-cols-3">
        {[[String(CONTRIBUTIONS.length), 'Merged pull requests'], [String(repos), 'Repositories'], ['Sep 2026', 'First merge in this run']].map(([v, k]) => <div key={k}><dt className={label}>{k}</dt><dd className="mt-2 font-display text-3xl text-[#d8cbb6]">{v}</dd></div>)}
      </dl>
      <section className="mt-10 grid gap-6">
        {CONTRIBUTIONS.map((c, i) => <Entry key={`${c.repo}-${c.pr}`} c={c} i={i} />)}
      </section>
      <aside className="mt-10 border-l-2 border-[#d4b87a] bg-[#241c16] p-6">
        <p className={label}>Scope of this record</p>
        <p className="mt-3 text-sm leading-relaxed text-[#c4b49a]">Every entry links to the public pull request, where the review, the diff and the merge are visible. Open pull requests still in review are not listed here.</p>
      </aside>
    </main>
    <footer className="border-t border-[#3d3228] px-5 py-6"><div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-4"><Link to="/" className={`${label} inline-flex min-h-11 items-center`}>Prajval Arora</Link><Link to="/projects" className={`${label} inline-flex min-h-11 items-center`}>Project library ↗</Link></div></footer>
  </div>;
};
