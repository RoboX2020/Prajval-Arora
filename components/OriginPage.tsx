import React from 'react';
import { ArrowUpRight, FileText } from 'lucide-react';
import {
  PERSON,
  LAWS,
  READERS,
  NOW,
  PRACTICE,
  COLLISIONS,
  MORE_WORK,
  SKILL_FIELDS,
  RECOGNITION,
  HERO_PHOTO,
  FRAMES,
} from '../content';
import { SiteHeader } from './SiteHeader';
import { JointLattice } from './JointLattice';
import { PixelSprites } from './PixelSprites';
import { Spread } from './Frame';
import { SignalBoard } from './SignalBoard';
import { VersionHistory } from './VersionHistory';

const nav = [
  { href: '#guide', label: 'Guide' },
  { href: '#now', label: 'Now' },
  { href: '#collisions', label: 'Work' },
  { href: '#practice', label: 'Practice' },
  { href: '#signals', label: 'Traces' },
  { href: '#connect', label: 'Connect' },
];

export const OriginPage: React.FC = () => {
  const featured = COLLISIONS.filter((c) => c.photo || c.gallery);
  const rest = COLLISIONS.filter((c) => !c.photo && !c.gallery);

  return (
    <div className="origin-root relative min-h-screen bg-[#1c1814] text-[#e6d9c4]">
      <JointLattice />
      <PixelSprites />

      <SiteHeader nav={nav} />

      <main id="top" className="relative z-10" style={{ zIndex: 10 }}>
        <section className="mx-auto max-w-6xl px-5 pb-8 pt-14 md:pt-20">
          <Spread media={HERO_PHOTO} reverse>
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#d4b87a]">
              Independent thought · interdisciplinary build
            </p>
            <h1 className="mt-5 font-display text-[clamp(3.2rem,7vw,6.2rem)] leading-[0.88] tracking-tight text-[#f0e6d4]">
              Prajval
              <br />
              Arora
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-[#d8cbb6] md:text-xl">
              Connecting branches that never shared a table, then making the thing that only lives there. You do not hire creativity. It arrives with independent thought.
            </p>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#b8a894]">
              Robotics and Autonomous Systems at Arizona State University. A factory cell, a clinic, a classroom, and a guitar count as the same problem: invent the missing joint.
            </p>
            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.24em] text-[#d4b87a]">Currently</p>
            <p className="mt-2 font-display text-2xl leading-tight text-[#f0e6d4]">{PERSON.role}</p>
            <p className="mt-2 text-sm leading-relaxed text-[#b8a894]">{PERSON.seeking}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#connect"
                className="inline-flex items-center gap-2 bg-[#c4a35a] px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[#1c1814] hover:bg-[#d4b87a]"
              >
                Work with me
              </a>
              <a
                href={PERSON.resume}
                className="inline-flex items-center gap-2 border border-[#c4a35a]/40 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[#e6d9c4] hover:border-[#d4b87a]"
              >
                <FileText size={14} /> Resume
              </a>
            </div>
          </Spread>
        </section>

        <section className="border-y border-[#3d3228] bg-[#241c16]/80">
          <div className="mx-auto grid max-w-6xl gap-px md:grid-cols-2">
            {LAWS.map((item) => (
              <article key={item.law} className="px-5 py-8 md:px-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#8a7a68]">Conventional law</p>
                <p className="mt-2 font-display text-2xl text-[#9a8a76] line-through decoration-[#c4a35a]/80 decoration-2">
                  {item.law}
                </p>
                <p className="mt-4 max-w-md text-base leading-relaxed text-[#d8cbb6]">{item.break}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl space-y-10 px-5 py-24">
          <Spread media={FRAMES.sky} reverse>
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#d4b87a]">A reading</p>
            <h2 className="mt-3 font-display text-4xl leading-tight text-[#f0e6d4] md:text-5xl">
              How to read me, whether you hire, collaborate, or already drink tea with me.
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-[#b8a894]">
              The photograph looks up. The work does too. Follow the frame that matches why you came.
            </p>
          </Spread>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {READERS.map((r) => (
              <article key={r.who} className="border border-[#3d3228] bg-[#241c16] p-6">
                <h3 className="font-display text-2xl text-[#d4b87a]">{r.who}</h3>
                <p className="mt-4 text-sm leading-relaxed text-[#b8a894]">{r.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="guide" className="mx-auto max-w-6xl px-5 pb-24">
          <Spread media={FRAMES.walk}>
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#d4b87a]">Friends first</p>
            <h2 className="mt-3 font-display text-4xl text-[#f0e6d4]">The walk, not the pitch.</h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#d8cbb6]">
              If you already know me, this is the grocery-bag version. Skip the resume voice. Open Version history for the older sites.
            </p>
          </Spread>
        </section>

        <section id="now" className="mx-auto max-w-6xl px-5 pb-24">
          <Spread media={FRAMES.quest} reverse>
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#d4b87a]">Now</p>
            <h2 className="mt-2 font-display text-4xl text-[#f0e6d4]">The live experiments</h2>
            <p className="mt-4 text-sm text-[#b8a894]">
              Simulation, technician training, and a Stellantis cell in the same season. Side quests that refused to stay side quests.
            </p>
          </Spread>
          <div className="mt-10 space-y-10">
            <Spread media={FRAMES.blimp}>
              <div className="space-y-4">
                {NOW.map((job) => (
                  <article key={job.title}>
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#d4b87a]">{job.when}</p>
                    <h3 className="mt-1 font-display text-2xl text-[#f0e6d4]">{job.title}</h3>
                    <p className="text-sm text-[#8a7a68]">{job.place}</p>
                    <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[#d8cbb6]">
                      {job.points.map((p) => (
                        <li key={p} className="border-l border-[#c4a35a]/50 pl-4">
                          {p}
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </Spread>
          </div>
        </section>

        <section id="collisions" className="border-t border-[#3d3228] bg-[#241c16]/50 py-24">
          <div className="mx-auto max-w-6xl px-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#d4b87a]">Collisions</p>
            <h2 className="mt-3 max-w-3xl font-display text-4xl leading-tight text-[#f0e6d4] md:text-5xl">
              Work that only exists when two fields share a room.
            </h2>

            <div className="mt-16 space-y-10">
              {featured.map((c, i) => (
                <Spread key={c.id} media={c.photo!} reverse={i % 2 === 1}>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#d4b87a]">
                    {c.fields[0]} × {c.fields[1]}
                    {c.stat ? ` · ${c.stat}` : ''}
                  </p>
                  <h3 className="mt-3 font-display text-3xl text-[#f0e6d4] md:text-4xl">{c.title}</h3>
                  <p className="mt-3 text-base italic text-[#c4b49a]">{c.result}</p>
                  <p className="mt-4 text-sm leading-relaxed text-[#d8cbb6]">{c.body}</p>
                  {c.link && (
                    <a
                      href={c.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#d4b87a] hover:text-[#f0e6d4]"
                    >
                      Open the trail <ArrowUpRight size={14} />
                    </a>
                  )}
                </Spread>
              ))}
            </div>

            <div className="mt-16 grid gap-6 md:grid-cols-2">
              {rest.map((c) => (
                <article key={c.id} className="flex flex-col border border-[#3d3228] bg-[#1c1814] p-6">
                  <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[#d4b87a]">
                    <span>{c.fields[0]}</span>
                    <span className="text-[#8a7a68]">×</span>
                    <span>{c.fields[1]}</span>
                    {c.stat && <span className="ml-auto text-[#8a7a68]">{c.stat}</span>}
                  </div>
                  <h3 className="mt-4 font-display text-3xl text-[#f0e6d4]">{c.title}</h3>
                  <p className="mt-2 text-base italic text-[#c4b49a]">{c.result}</p>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-[#b8a894]">{c.body}</p>
                  {c.link && (
                    <a
                      href={c.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#d4b87a]"
                    >
                      Open the trail <ArrowUpRight size={14} />
                    </a>
                  )}
                </article>
              ))}
            </div>

            <div className="mt-16">
              <h3 className="font-display text-2xl text-[#f0e6d4]">Other instruments</h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {MORE_WORK.map((w) => (
                  <article key={w.title} className="border-t border-[#3d3228] pt-4">
                    <h4 className="font-medium text-[#e6d9c4]">{w.title}</h4>
                    <p className="mt-2 text-xs leading-relaxed text-[#8a7a68]">{w.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="practice" className="mx-auto max-w-6xl space-y-24 px-5 py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#d4b87a]">Practice</p>
          <h2 className="font-display text-4xl text-[#f0e6d4]">Hands on the work</h2>

          <Spread media={FRAMES.airport}>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#d4b87a]">{PRACTICE[0].when}</p>
            <h3 className="mt-2 font-display text-3xl text-[#f0e6d4]">{PRACTICE[0].title}</h3>
            <p className="text-sm text-[#d4b87a]">{PRACTICE[0].place}</p>
            <p className="mt-4 text-sm leading-relaxed text-[#d8cbb6]">{PRACTICE[0].body}</p>
          </Spread>

          {PRACTICE.slice(1).map((job) => (
            <article key={job.title} className="grid gap-2 border-b border-[#3d3228] pb-8 md:grid-cols-12">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#8a7a68] md:col-span-3">{job.when}</p>
              <div className="md:col-span-9">
                <h3 className="font-display text-2xl text-[#f0e6d4]">{job.title}</h3>
                <p className="text-sm text-[#d4b87a]">{job.place}</p>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#b8a894]">{job.body}</p>
              </div>
            </article>
          ))}
        </section>

        <section className="mx-auto max-w-6xl px-5 pb-24">
          <Spread media={FRAMES.cinema} reverse>
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#d4b87a]">Offstage</p>
            <h2 className="mt-3 font-display text-4xl text-[#f0e6d4]">Play is not a footnote.</h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#d8cbb6]">
              Bollywood, a wall of live news, arms open. The same person who commissions a cell also likes to act. Independent thought includes joy.
            </p>
          </Spread>
        </section>

        <section id="field" className="border-y border-[#3d3228] bg-[#241c16]/70 py-24">
          <div className="mx-auto max-w-6xl px-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#d4b87a]">Field kit</p>
            <h2 className="mt-2 font-display text-4xl text-[#f0e6d4]">Tools, not a personality</h2>
            <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {SKILL_FIELDS.map((field) => (
                <div key={field.name}>
                  <h3 className="font-display text-xl text-[#d4b87a]">{field.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#b8a894]">{field.items.join(' · ')}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#d4b87a]">Proof, not a plea</p>
          <h2 className="mt-2 font-display text-4xl text-[#f0e6d4]">What remains after the work</h2>
          <ul className="mt-10 divide-y divide-[#3d3228] border-y border-[#3d3228]">
            {RECOGNITION.map((r) => (
              <li key={r.title} className="grid gap-1 py-5 md:grid-cols-12 md:items-baseline">
                <h3 className="font-display text-xl text-[#f0e6d4] md:col-span-5">{r.title}</h3>
                <p className="text-sm text-[#b8a894] md:col-span-7">{r.detail}</p>
              </li>
            ))}
          </ul>
        </section>

        <SignalBoard />

        <section id="connect" className="border-t border-[#3d3228] py-24">
          <div className="mx-auto max-w-6xl space-y-10 px-5">
            <Spread media={FRAMES.blazer}>
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#d4b87a]">Connect</p>
              <h2 className="mt-3 font-display text-4xl leading-tight text-[#f0e6d4] md:text-5xl">
                Write if you want a mind in the room, not a creative you can procure.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-[#b8a894]">
                Summer 2027 internships, research, industrial cells, education, and strange prototypes. Friends, skip the formality.
              </p>
            </Spread>

            <Spread media={FRAMES.walkway} reverse>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#d4b87a]">In transit, still the main character</p>
              <h3 className="mt-2 font-display text-3xl text-[#f0e6d4]">The public trail</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#b8a894]">
                Write on LinkedIn or GitHub. Book thirty minutes on the calendar in Traces.
              </p>
              <div className="mt-6 grid gap-4">
                <a href={PERSON.linkedin} target="_blank" rel="noreferrer" className="border border-[#3d3228] bg-[#1c1814] p-5 hover:border-[#c4a35a]/60">
                  <ArrowUpRight size={18} className="text-[#d4b87a]" />
                  <span className="mt-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-[#8a7a68]">LinkedIn</span>
                  <span>prajvaldesignsmachines</span>
                </a>
                <a href={PERSON.github} target="_blank" rel="noreferrer" className="border border-[#3d3228] bg-[#1c1814] p-5 hover:border-[#c4a35a]/60">
                  <ArrowUpRight size={18} className="text-[#d4b87a]" />
                  <span className="mt-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-[#8a7a68]">GitHub</span>
                  <span>RoboX2020</span>
                </a>
              </div>
            </Spread>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-[#3d3228] px-5 py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8a7a68]">
            © {new Date().getFullYear()} {PERSON.name} · Independence of thought
          </p>
          <VersionHistory />
        </div>
      </footer>
    </div>
  );
};
