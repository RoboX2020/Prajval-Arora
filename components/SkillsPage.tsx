import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { SKILL_FIELDS } from '../content';

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

// One grounded experience line per skill group, so the page reads as what
// he has done with the tools rather than a bare keyword list.
const FIELD_NOTES: Record<string, string> = {
  'Robotics & physical AI': 'Training a Unitree robot dog in Isaac Sim, and building URSe and Dobot robot cells.',
  'Automation & cells': 'Commissioning industrial cells, and teaching TSMC PLC and automation cohorts hands-on.',
  'Networks & embedding': 'Jetson on-device AI, and the C++ and Python that run through the projects.',
  'Make & see': 'CAD to 3D-printed parts, computer vision, and local AI models running offline.',
  Safety: 'Robot-cell safety practice from the lab and the showcase floor.',
};

export const SkillsPage: React.FC = () => (
  <div className="origin-root min-h-screen bg-[#1c1814] text-[#e6d9c4]">
    <Header />
    <main className="mx-auto site-shell px-5 pb-20">
      <section className="border-b border-[#3d3228] pb-12 pt-16">
        <p className={label}>Field kit, in full</p>
        <h1 className="mt-5 max-w-4xl font-display font-wordy text-[clamp(2.4rem,6vw,4.2rem)] leading-[1.05] tracking-tight text-[#f0e6d4]">
          Everything I can do.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#b8a894] font-wordy">
          The working list, grouped the way the work actually groups. Photos and clips for each of these are on their way.
        </p>
      </section>
      <section className="mt-10 space-y-10">
        {SKILL_FIELDS.map((field) => (
          <article key={field.name} className="grid gap-4 border-b border-[#3d3228] pb-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <h2 className="font-display text-2xl text-[#d4b87a]">{field.name}</h2>
              {FIELD_NOTES[field.name] && (
                <p className="mt-3 text-sm leading-relaxed text-[#b8a894] font-wordy">{FIELD_NOTES[field.name]}</p>
              )}
            </div>
            <ul className="flex flex-wrap content-start gap-2 md:col-span-8">
              {field.items.map((item) => (
                <li key={item} className="border border-[#3d3228] px-3 py-2 font-mono text-xs text-[#c4b49a]">{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>
      <div className="mt-10">
        <Link to="/" className={label}>Back home ↗</Link>
      </div>
    </main>
  </div>
);
