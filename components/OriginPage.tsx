import React from 'react';
import { ArrowUpRight, FileText } from 'lucide-react';
import {
  PERSON,
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
  { href: '#now', label: 'Now' },
  { href: '#collisions', label: 'Work' },
  { href: '#practice', label: 'Practice' },
  { href: '/playbook', label: 'Playbook' },
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
              Connecting branches that never shared a table, then making the thing that only lives there.
            </p>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#b8a894]">
              Robotics and Autonomous Systems at Arizona State University. Factory cells, clinics, classrooms, and instruments.
            </p>
            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.24em] text-[#d4b87a]">Currently</p>
            <p className="mt-2 font-display text-2xl leading-tight text-[#f0e6d4]">{PERSON.role}</p>
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

        <section className="mx-auto max-w-6xl px-5 pb-24 pt-16">
          <Spread media={FRAMES.walk}>
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#d4b87a]">Archive</p>
            <h2 className="mt-3 font-display text-4xl text-[#f0e6d4]">Older sites stay up.</h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#d8cbb6]">
              Circuit atlas, road trip, and garage live in Version history.
            </p>
          </Spread>
        </section>

        <section id="now" className="mx-auto max-w-6xl px-5 pb-24">
          <Spread media={FRAMES.sky} reverse>
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#d4b87a]">Now</p>
            <h2 className="mt-2 font-display text-4xl text-[#f0e6d4]">Live work</h2>
            <p className="mt-4 text-sm text-[#b8a894]">
              Simulation, technician training, and a Stellantis cell.
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
          <h2 className="font-display text-4xl text-[#f0e6d4]">Roles</h2>

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

        <section className="mx-auto max-w-6xl space-y-16 px-5 pb-24">
          <Spread media={FRAMES.cinema} reverse>
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#d4b87a]">Offstage</p>
            <h2 className="mt-3 font-display text-4xl text-[#f0e6d4]">Bollywood.</h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#d8cbb6]">
              A wall of live news. Arms open. Acting because it is fun.
            </p>
          </Spread>
          <Spread media={FRAMES.hack}>
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#d4b87a]">Hall</p>
            <h2 className="mt-3 font-display text-4xl text-[#f0e6d4]">Honeywell season.</h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#d8cbb6]">
              The lecture hall after the 2025 and 2026 builds.
            </p>
          </Spread>
          <Spread media={FRAMES.quest} reverse>
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#d4b87a]">Night</p>
            <h2 className="mt-3 font-display text-4xl text-[#f0e6d4]">Tempe.</h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#d8cbb6]">
              The city after hours.
            </p>
          </Spread>
        </section>

        <section id="field" className="border-y border-[#3d3228] bg-[#241c16]/70 py-24">
          <div className="mx-auto max-w-6xl px-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#d4b87a]">Tools</p>
            <h2 className="mt-2 font-display text-4xl text-[#f0e6d4]">Field kit</h2>
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
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#d4b87a]">Recognition</p>
          <h2 className="mt-2 font-display text-4xl text-[#f0e6d4]">Awards and grants</h2>
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
                Write.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-[#b8a894]">
                Research, industrial cells, education, and prototypes.
              </p>
            </Spread>

            <Spread media={FRAMES.walkway} reverse>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#d4b87a]">In transit</p>
              <h3 className="mt-2 font-display text-3xl text-[#f0e6d4]">LinkedIn and GitHub</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#b8a894]">
                Calendar sits in Traces.
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
            © {new Date().getFullYear()} {PERSON.name}
          </p>
          <VersionHistory />
        </div>
      </footer>
    </div>
  );
};
