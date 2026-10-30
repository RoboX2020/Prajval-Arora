import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { PERSON } from '../content';

// Shared mono label style used across the origin pages.
const label = 'font-mono text-[10px] uppercase tracking-[0.2em] text-[#d4b87a]';

function Header() {
  return (
    <header className="border-b border-[#3d3228] bg-[#241c16]">
      <div className="mx-auto flex site-shell items-center justify-between px-5 py-4">
        <Link to="/" className="font-display text-lg text-[#f0e6d4]">Prajval<span className="text-[#d4b87a]">.</span></Link>
        <span className="flex items-center gap-3">
          <Link to="/" className={`${label} flex items-center gap-2`}><ArrowLeft size={14} /> Home</Link>
          <ThemeToggle />
        </span>
      </div>
    </header>
  );
}

// One entry per thing that is active and where another person could
// plausibly join in. Facts come from Praj's own records; where joining is
// not his to promise (university and partner teams), the text says to ask
// him rather than offering a seat.
const OPEN_WORK = [
  {
    name: 'Tapri Builder Club',
    kind: 'Club · founded and run by me',
    body: 'The easiest door in. Tapri is the club I founded and run for people who build things - 2,200 members and 40+ ventures launched through it. If you make things and want a room full of people who do too, start here.',
  },
  {
    name: 'FAITH Labs',
    kind: 'Teaching · school robotics labs',
    body: 'The labs I started in Kanpur schools: kits, curriculum, and coaching. 200+ students so far. If teaching robotics to kids sounds like your kind of day, talk to me about mentoring.',
  },
  {
    name: 'Open-source builds',
    kind: 'Public source · hack on them with me',
    body: 'The public repos are the lowest-friction way to build together: the air guitar, PartyPlay, Tagg, the GTM World Model, Kalki, JoinMe, and my Arduino bridge PR to Espressif\'s ESP-Claw. Pick one, open an issue or a PR, or write to me with an idea.',
  },
  {
    name: 'Stellantis demonstrator and lab work',
    kind: 'University team projects',
    body: 'The dual-URSe automation cell for the Stellantis Detroit event and my Isaac Sim work with the Unitree robot dog are ASU team efforts, so a seat is not mine to hand out. If the work itself is what you are after, ask me about it and I will tell you what I can.',
  },
];

export const WorkWithMePage: React.FC = () => (
  <div className="origin-root min-h-screen bg-[#1c1814] text-[#e6d9c4]">
    <Header />
    <main className="mx-auto site-shell px-5 pb-20">
      <section className="border-b border-[#3d3228] pb-12 pt-16">
        <p className={label}>Open doors</p>
        <h1 className="mt-5 max-w-4xl font-display font-wordy text-[clamp(2.4rem,6vw,4.2rem)] leading-[1.05] tracking-tight text-[#f0e6d4]">
          Work with me.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#b8a894] font-wordy">
          These are the things I am actively working on where another person could join in. Details are still being written up - if one of them sounds like you, the fastest move is to write to me.
        </p>
      </section>
      <section className="mt-10 grid gap-6 md:grid-cols-2">
        {OPEN_WORK.map((w) => (
          <article key={w.name} className="border border-[#3d3228] bg-[#241c16]/50 p-6">
            <p className={label}>{w.kind}</p>
            <h2 className="mt-3 font-display text-2xl text-[#f0e6d4]">{w.name}</h2>
            <p className="mt-4 text-sm leading-relaxed text-[#c4b49a] font-wordy">{w.body}</p>
          </article>
        ))}
      </section>
      <section className="mt-12 border-t border-[#3d3228] pt-8">
        <p className="text-sm leading-relaxed text-[#b8a894] font-wordy">
          Statuses are as of October 2026 and this page moves as the work moves. Reach me on
          LinkedIn (<a href={PERSON.linkedin} target="_blank" rel="noreferrer" className="text-[#d4b87a]">prajvaldesignsmachines</a>)
          or GitHub (<a href={PERSON.github} target="_blank" rel="noreferrer" className="text-[#d4b87a]">RoboX2020</a>).
        </p>
        <div className="mt-6">
          <Link to="/" className={label}>Back home ↗</Link>
        </div>
      </section>
    </main>
  </div>
);
