import React from 'react';
import { ArrowUpRight, Mail, Phone, FileText } from 'lucide-react';
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
} from '../content';
import { SiteHeader } from './SiteHeader';
import { JointLattice } from './JointLattice';
import { PixelSprites } from './PixelSprites';
import { PhotoWall } from './PhotoWall';
import { SignalBoard } from './SignalBoard';
import { VersionHistory } from './VersionHistory';

const nav = [
  { href: '#guide', label: 'Guide' },
  { href: '#room', label: 'Room' },
  { href: '#now', label: 'Now' },
  { href: '#collisions', label: 'Work' },
  { href: '#signals', label: 'Traces' },
  { href: '#connect', label: 'Connect' },
];

export const OriginPage: React.FC = () => {
  return (
    <div className="origin-root relative min-h-screen text-[#f3ece3]">
      <JointLattice />
      <PixelSprites />
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-b from-transparent via-[#0c0b09]/55 to-[#0c0b09]" />

      <SiteHeader nav={nav} />

      <main id="top" className="relative z-10">
        <section className="mx-auto grid max-w-6xl gap-12 px-5 pb-24 pt-16 md:grid-cols-12 md:pt-24">
          <div className="md:col-span-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-orange-400">
              Independent thought · interdisciplinary build
            </p>
            <h1 className="mt-5 font-display text-[clamp(3.2rem,8vw,7.2rem)] leading-[0.88] tracking-tight text-stone-50">
              Prajval
              <br />
              Arora
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-stone-300 md:text-xl">
              I am valued for connecting branches that were never supposed to share a table — then making the thing that only exists at that table.
              You do not hire creativity. Creativity arrives with independence of thought.
            </p>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-stone-500">
              Robotics and Autonomous Systems at Arizona State University. A mind that treats a factory cell, a clinic, a classroom, and a guitar as the same kind of problem: invent the missing joint.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#connect"
                className="inline-flex items-center gap-2 bg-orange-500 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-black hover:bg-orange-400"
              >
                Work with me
              </a>
              <a
                href={PERSON.resume}
                className="inline-flex items-center gap-2 border border-white/20 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-stone-200 hover:border-orange-400/70"
              >
                <FileText size={14} /> Resume
              </a>
              <a
                href="#collisions"
                className="inline-flex items-center gap-2 border border-transparent px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-stone-400 hover:text-orange-300"
              >
                See the collisions
              </a>
            </div>
          </div>
          <aside className="md:col-span-4 md:pt-8">
            <figure className="polaroid -rotate-2">
              <img src={HERO_PHOTO.src} alt={HERO_PHOTO.alt} className="aspect-[3/4] w-full object-cover object-top" />
              <figcaption>
                <span className="block font-display text-xl italic text-stone-800">{HERO_PHOTO.latin}</span>
                <span className="mt-1 block text-xs leading-relaxed text-stone-500">{HERO_PHOTO.note}</span>
              </figcaption>
            </figure>
            <div className="mt-8 border border-white/10 bg-black/35 p-5 backdrop-blur-sm">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-stone-500">Currently</p>
              <p className="mt-3 font-display text-2xl leading-tight text-stone-100">{PERSON.role}</p>
              <p className="mt-3 text-sm leading-relaxed text-stone-400">{PERSON.seeking}</p>
              <dl className="mt-6 space-y-3 font-mono text-[11px] uppercase tracking-[0.12em] text-stone-500">
                <div>
                  <dt className="text-stone-600">Education</dt>
                  <dd className="mt-1 normal-case tracking-normal text-stone-300">
                    {PERSON.education.degree}
                    <br />
                    {PERSON.education.when}
                  </dd>
                </div>
                <div>
                  <dt className="text-stone-600">Also</dt>
                  <dd className="mt-1 normal-case tracking-normal text-stone-300">{PERSON.education.extra}</dd>
                </div>
              </dl>
            </div>
          </aside>
        </section>

        <section className="border-y border-white/10 bg-black/30">
          <div className="mx-auto grid max-w-6xl gap-px md:grid-cols-2">
            {LAWS.map((item) => (
              <article key={item.law} className="px-5 py-8 md:px-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-stone-600">Conventional law</p>
                <p className="mt-2 font-display text-2xl text-stone-500 line-through decoration-orange-500/80 decoration-2">
                  {item.law}
                </p>
                <p className="mt-4 max-w-md text-base leading-relaxed text-stone-300">{item.break}</p>
              </article>
            ))}
          </div>
        </section>

        <PhotoWall />

        <section id="guide" className="mx-auto max-w-6xl px-5 py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-orange-400">A guide</p>
          <h2 className="mt-3 max-w-3xl font-display text-4xl leading-tight text-stone-50 md:text-5xl">
            How to read me — whether you employ, collaborate, or already drink tea with me.
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {READERS.map((r) => (
              <article key={r.who} className="border border-white/10 bg-[#14120e]/80 p-6">
                <h3 className="font-display text-2xl text-orange-300">{r.who}</h3>
                <p className="mt-4 text-sm leading-relaxed text-stone-400">{r.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="now" className="mx-auto max-w-6xl px-5 pb-24">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-orange-400">Now</p>
              <h2 className="mt-2 font-display text-4xl text-stone-50">The live experiments</h2>
            </div>
            <p className="hidden max-w-sm text-right text-sm text-stone-500 md:block">
              Simulation, technician training, and a Stellantis cell in the same season — because those are one system if you refuse to split them.
            </p>
          </div>
          <div className="grid gap-4">
            {NOW.map((job) => (
              <article key={job.title} className="grid gap-4 border border-white/10 bg-black/25 p-6 md:grid-cols-12">
                <div className="md:col-span-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-orange-400">{job.when}</p>
                  <h3 className="mt-2 font-display text-2xl text-stone-50">{job.title}</h3>
                  <p className="mt-1 text-sm text-stone-500">{job.place}</p>
                </div>
                <ul className="md:col-span-8 space-y-3 text-sm leading-relaxed text-stone-300">
                  {job.points.map((p) => (
                    <li key={p} className="border-l border-orange-500/40 pl-4">
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="collisions" className="border-t border-white/10 bg-black/20 py-24">
          <div className="mx-auto max-w-6xl px-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-orange-400">Collisions</p>
            <h2 className="mt-3 max-w-3xl font-display text-4xl leading-tight text-stone-50 md:text-5xl">
              Work that only exists because two fields were forced to share a room.
            </h2>
            <div className="mt-14 grid gap-6 md:grid-cols-2">
              {COLLISIONS.map((c) => (
                <article key={c.id} className="flex flex-col border border-white/10 bg-[#12110d] p-6">
                  <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-orange-300/90">
                    <span>{c.fields[0]}</span>
                    <span className="text-stone-600">×</span>
                    <span>{c.fields[1]}</span>
                    {c.stat && <span className="ml-auto text-stone-500">{c.stat}</span>}
                  </div>
                  <h3 className="mt-4 font-display text-3xl text-stone-50">{c.title}</h3>
                  <p className="mt-2 text-base italic text-stone-400">{c.result}</p>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-stone-400">{c.body}</p>
                  {c.photo && (
                    <figure className="polaroid mt-6 rotate-1">
                      <img src={c.photo.src} alt={c.photo.alt} className={`${c.photo.wide ? 'aspect-[5/4]' : 'aspect-[3/4]'} w-full object-cover object-top`} />
                      <figcaption>
                        <span className="block font-display text-lg italic text-stone-800">{c.photo.latin}</span>
                        <span className="mt-1 block text-xs leading-relaxed text-stone-500">{c.photo.note}</span>
                      </figcaption>
                    </figure>
                  )}
                  {c.link && (
                    <a
                      href={c.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.18em] text-orange-400 hover:text-orange-300"
                    >
                      Open the trail <ArrowUpRight size={14} />
                    </a>
                  )}
                </article>
              ))}
            </div>

            <div className="mt-16">
              <h3 className="font-display text-2xl text-stone-200">Other instruments</h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {MORE_WORK.map((w) => (
                  <article key={w.title} className="border-t border-white/15 pt-4">
                    <h4 className="font-medium text-stone-200">{w.title}</h4>
                    <p className="mt-2 text-xs leading-relaxed text-stone-500">{w.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="practice" className="mx-auto max-w-6xl px-5 py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-orange-400">Practice</p>
          <h2 className="mt-2 font-display text-4xl text-stone-50">Where the hands were</h2>
          <div className="mt-10 space-y-8">
            {PRACTICE.map((job) => (
              <article key={job.title} className="grid gap-2 border-b border-white/10 pb-8 md:grid-cols-12">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-stone-500 md:col-span-3">{job.when}</p>
                <div className="md:col-span-9">
                  <h3 className="font-display text-2xl text-stone-50">{job.title}</h3>
                  <p className="text-sm text-orange-300/80">{job.place}</p>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-stone-400">{job.body}</p>
                  {'latin' in job && job.latin && (
                    <p className="mt-4 max-w-xl font-display text-xl italic text-orange-300/90">
                      {job.latin}
                      {'note' in job && job.note ? (
                        <span className="mt-1 block font-sans text-sm not-italic text-stone-500">{job.note}</span>
                      ) : null}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="field" className="border-y border-white/10 bg-black/25 py-24">
          <div className="mx-auto max-w-6xl px-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-orange-400">Field kit</p>
            <h2 className="mt-2 font-display text-4xl text-stone-50">Tools, not a personality</h2>
            <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {SKILL_FIELDS.map((field) => (
                <div key={field.name}>
                  <h3 className="font-display text-xl text-orange-300">{field.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-stone-400">{field.items.join(' · ')}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-orange-400">Proof, not a plea</p>
          <h2 className="mt-2 font-display text-4xl text-stone-50">Recognition as residue</h2>
          <p className="mt-4 max-w-xl text-sm text-stone-500">
            Awards are what happens after independent work becomes visible. They are not the reason to write.
          </p>
          <ul className="mt-10 divide-y divide-white/10 border-y border-white/10">
            {RECOGNITION.map((r) => (
              <li key={r.title} className="grid gap-1 py-5 md:grid-cols-12 md:items-baseline">
                <h3 className="font-display text-xl text-stone-100 md:col-span-5">{r.title}</h3>
                <p className="text-sm text-stone-400 md:col-span-7">{r.detail}</p>
              </li>
            ))}
          </ul>
        </section>

        <SignalBoard />

        <section id="connect" className="border-t border-white/10 bg-gradient-to-b from-orange-950/30 to-transparent py-24">
          <div className="mx-auto max-w-6xl px-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-orange-400">Connect</p>
            <h2 className="mt-3 max-w-3xl font-display text-4xl leading-tight text-stone-50 md:text-6xl">
              Write if you want a mind in the room — not a creative you can procure.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-stone-400">
              Summer 2027 internships, research, industrial cells, education, and strange prototypes. Friends can skip the formality. Collaborators can skip the pitch. I will meet you at the joint between your field and mine.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <a
                href={`mailto:${PERSON.email}`}
                className="flex items-start gap-3 border border-white/15 bg-black/40 p-5 hover:border-orange-400/60"
              >
                <Mail size={18} className="mt-0.5 text-orange-400" />
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-stone-500">Email</span>
                  <span className="text-stone-100">{PERSON.email}</span>
                </span>
              </a>
              <a
                href={PERSON.phoneHref}
                className="flex items-start gap-3 border border-white/15 bg-black/40 p-5 hover:border-orange-400/60"
              >
                <Phone size={18} className="mt-0.5 text-orange-400" />
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-stone-500">Phone</span>
                  <span className="text-stone-100">{PERSON.phone}</span>
                </span>
              </a>
              <a
                href={PERSON.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-3 border border-white/15 bg-black/40 p-5 hover:border-orange-400/60"
              >
                <ArrowUpRight size={18} className="mt-0.5 text-orange-400" />
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-stone-500">LinkedIn</span>
                  <span className="text-stone-100">prajvaldesignsmachines</span>
                </span>
              </a>
              <a
                href={PERSON.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-3 border border-white/15 bg-black/40 p-5 hover:border-orange-400/60"
              >
                <ArrowUpRight size={18} className="mt-0.5 text-orange-400" />
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-stone-500">GitHub</span>
                  <span className="text-stone-100">RoboX2020</span>
                </span>
              </a>
              <a
                href={PERSON.calendly}
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-3 border border-white/15 bg-black/40 p-5 hover:border-orange-400/60"
              >
                <ArrowUpRight size={18} className="mt-0.5 text-orange-400" />
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-stone-500">Time</span>
                  <span className="text-stone-100">Thirty minutes</span>
                </span>
              </a>
              <a
                href={PERSON.tapri}
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-3 border border-white/15 bg-black/40 p-5 hover:border-orange-400/60"
              >
                <ArrowUpRight size={18} className="mt-0.5 text-orange-400" />
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-stone-500">Tapri</span>
                  <span className="text-stone-100">gotapri.com</span>
                </span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/10 px-5 py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-600">
            © {new Date().getFullYear()} {PERSON.name} · Independence of thought
          </p>
          <VersionHistory />
        </div>
      </footer>
    </div>
  );
};
