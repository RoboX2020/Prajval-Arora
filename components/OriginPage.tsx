import { Link } from 'react-router-dom';
import { PROJECT_LIBRARY } from '../projectData';
import React from 'react';
import { ArrowUpRight, FileText, Mail } from 'lucide-react';
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
import { Words, WordVariants } from '../intensity';
import { JointLattice } from './JointLattice';
import { PixelSprites } from './PixelSprites';
import { Spread } from './Frame';
import { SignalBoard } from './SignalBoard';
import { VersionHistory } from './VersionHistory';


// Same facts at every level for the "Conventional law" cards. The struck
// law lines stay fixed (they are rhetorical devices, like the captions);
// only the plain-language answer under each one follows the slider.
const LAW_BREAKS: Record<string, WordVariants> = {
  'Stay in one major.': [
    'Robots need metal, code, and people. I work with all three - plus factories that have not been built yet.',
    'Robotics mixes mechanics, code, and people - and factories that do not exist yet.',
    'Robotics here mixes mechanics, code, and people - and the plants (factories) that do not exist yet.',
    'Robotics combines mechanics, code, and people - and the industrial plants that have yet to be built.',
    'The discipline integrates mechanics, computation, and human factors, extending to industrial plants not yet constructed.',
    'The discipline integrates mechanics, computation, and human factors, with application targets including industrial plants not yet constructed.',
  ],
  'Hire creativity.': [
    'I think for myself. That is where new ideas come from.',
    'You work with someone who thinks for himself. New ideas come with that.',
    'When you work with me you get someone who thinks for himself. New ideas follow - creativity is not a job title.',
    'You work with an independent mind; creativity follows from that rather than from a job title.',
    'Engagement is with an independent mind; creativity is an emergent property thereof, not a job title.',
    'Engagement is with an independent mind; creativity is construed as an emergent property thereof rather than a purchasable job function.',
  ],
  'Prototype or ship.': [
    'I do both. School labs, classwork, factory robots, and my clubs all help the next thing get built.',
    'Both. Labs, classes, factory cells, and communities all feed the next build.',
    'Both - labs, coursework, factory cells, and the communities around them all feed the next build.',
    'Both. Labs, curriculum, cells, and communities each make the next thing possible.',
    'Both. Laboratories, curriculum, cells, and communities collectively enable the next iteration.',
    'Both imperatives are satisfied: laboratories, curriculum, cells, and communities collectively furnish the preconditions for the next artifact.',
  ],
  'Keep art away from industry.': [
    'A guitar with no strings. A robot that draws faces. A line that thinks in vision and air.',
    'A guitar with no strings. A robot that draws faces. A line that thinks in vision and air.',
    'A guitar with no strings. A robot that draws faces. A line that thinks in vision and air.',
    'A guitar with no strings. A robot that draws faces. A line that thinks in vision and air.',
    'A guitar with no strings. A robot that draws faces. A line that thinks in vision and air.',
    'A guitar with no strings. A robot that draws faces. A line that thinks in vision and air.',
  ],
};

// Same facts at every level for the three reader cards. Card titles stay
// fixed (they act like navigation); only the body follows the slider.
const READER_BODIES: Record<string, WordVariants> = {
  'If you build teams': [
    "I'm in my second year of robot college at ASU. I teach robots in a simulator, set up factory robots, teach factory workers about PLCs, and turn computer drawings into real machines. Read Currently, Practice, and Work. Then write to me like a person, not a job ad.",
    'RAS sophomore at ASU. I train robots in Isaac Sim, set up industrial cells, teach PLC technicians, and take hardware from CAD onto a live network. Read Currently, Practice, and Collisions - then write as a peer, not a vacancy.',
    'RAS sophomore at ASU. I train robots in Isaac Sim, commission industrial cells, teach PLC technicians, and take hardware from CAD onto a live network. Read Currently, Practice, and Collisions - then write to me as a peer, not a vacancy.',
    'RAS sophomore at ASU, already training robots in Isaac Sim, commissioning industrial cells, teaching PLC technicians, and taking hardware from CAD onto a live network. Read Currently, Practice, and Collisions, then write as a peer rather than a vacancy.',
    'A second-year RAS undergraduate at ASU, presently training robotic policies in Isaac Sim, commissioning industrial cells, instructing PLC technicians, and carrying hardware from CAD onto a live network. See Currently, Practice, and Collisions; correspondence in a peer register is preferred.',
    'The author is a second-year undergraduate in Robotics and Autonomous Systems at ASU, presently engaged in training robotic policies in Isaac Sim, commissioning industrial cells, instructing PLC technicians, and transitioning hardware from CAD to a live network. The reader is directed to Currently, Practice, and Collisions; correspondence is welcomed in a peer register rather than that of a vacancy announcement.',
  ],
  'If you want to make something': [
    "My projects mix things that don't usually go together: helping people speak with small AI, airplane air systems with manufacturing, signals with wearables, warehouses with helper robots. Start with Work. Then book time or write to me on LinkedIn.",
    'The projects mix fields that usually stay apart: speech therapy with on-device AI, bleed-air physics with manufacturing, signal processing with wearables, warehouses with cobots. Start with Collisions, then book time or write on LinkedIn.',
    'The projects mix fields that usually stay apart: speech therapy with on-device LLMs, bleed-air thermodynamics with manufacturing, DSP with wearables, warehouses with cobots. Start with Collisions - then book time or write on LinkedIn.',
    'Branches that usually refuse each other: speech therapy and on-device LLMs, bleed-air thermodynamics and manufacturing, DSP and wearables, warehouses and cobots. Start with Collisions, then book time or write on LinkedIn.',
    'Domain pairings that typically remain disjoint: speech therapy with on-device LLMs, bleed-air thermodynamics with manufacturing, DSP with wearables, and warehouses with cobots. Begin with Collisions; subsequently book time or correspond via LinkedIn.',
    'The work spans domain pairings that typically remain disjoint: speech therapy with on-device large language models, bleed-air thermodynamics with manufacturing, digital signal processing with wearables, and warehouse logistics with collaborative robots. The reader is directed to begin with Collisions and subsequently to book time or correspond via LinkedIn.',
  ],
  'If you already know me': [
    "This shows what I've done since we last talked. Look at Now, Tapri, FAITH, and Connect. Old websites are in Version history.",
    "A map of what's happened since we last talked. Skip to Now, Tapri, FAITH, and Connect. Older sites live under Version history.",
    "A map of what's happened since the last tea stall conversation. Skip to Now, Tapri, FAITH, and Connect. Older sites live under Version history.",
    'A map of what has happened since the last tea stall conversation. Skip to Now, Tapri, FAITH, and Connect. Older websites live under Version history.',
    'A record of activity since the last tea stall conversation. Proceed to Now, Tapri, FAITH, and Connect; prior site iterations reside under Version history.',
    'A record of activity since the most recent tea stall conversation. The reader is directed to Now, Tapri, FAITH, and Connect; prior iterations of this site reside under Version history.',
  ],
};

const nav = [
  { href: '#guide', label: 'Guide' },
  { href: '#now', label: 'Now' },
  { href: '#collisions', label: 'Work' },
  { href: '/projects', label: 'Projects' },
  { href: '#practice', label: 'Practice' },
  { href: '/playbook', label: 'Playbook' },
  { href: '#signals', label: 'Traces' },
  { href: '#connect', label: 'Connect' },
];

export const OriginPage: React.FC = () => {
  React.useEffect(() => {
    if (window.location.hash === '#collisions') {
      document.getElementById('collisions')?.scrollIntoView({ block: 'start' });
    }
  }, []);
  const featured = COLLISIONS.filter((c) => c.photo || c.gallery);
  const rest = COLLISIONS.filter((c) => !c.photo && !c.gallery);

  return (
    <div className="origin-root relative min-h-screen bg-[#1c1814] text-[#e6d9c4]">
      <JointLattice />
      <PixelSprites />

      <SiteHeader nav={nav} />

      <main id="top" className="relative z-10" style={{ zIndex: 10 }}>
        <section className="mx-auto site-shell hero-section px-5 pb-8 pt-14 md:pt-20">
          <Spread media={HERO_PHOTO} reverse>
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#d4b87a]">
              Independent thought · interdisciplinary build
            </p>
            <h1 className="mt-5 font-display font-wordy text-[clamp(3.2rem,7vw,6.2rem)] leading-[0.88] tracking-tight text-[#f0e6d4]">
              Prajval
              <br />
              Arora
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-[#d8cbb6] md:text-xl font-wordy">
              <Words v={[
                "Hi, I'm Prajval. I make robots. A robot dog. A robot arm for a factory. A car that drives itself inside a computer. This site shows them.",
                "I build robots - a robot dog, a factory arm, and a car that drives itself in a simulator. Most of my projects mix two fields that don't usually meet.",
                "I build robots and the systems around them - a robot dog, an industrial factory cell, a driving simulator. Most of my projects start where two fields meet that usually don't.",
                'I build robotic systems and the work around them: a robot dog, a commissioned industrial cell, a driving simulator. Most projects begin where two fields that rarely meet overlap.',
                'I develop robotic systems and their supporting infrastructure: a quadruped platform, an industrial automation cell, and a simulation environment for autonomous driving. Most projects sit at the intersection of two fields that rarely interact.',
                "The author's work concerns robotic systems and their adjacent infrastructure - a quadruped platform, a commissioned industrial automation cell, and a simulation environment for autonomous driving - with projects characteristically situated at the intersection of domains that infrequently interact.",
              ]} />
            </p>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#b8a894] font-wordy">
              <Words v={[
                'I go to college at Arizona State University. I learn how robots work. After class, I build my own.',
                "I study robotics at Arizona State University. After class I build my own projects - that's most of this site.",
                "I study Robotics and Autonomous Systems at Arizona State University, class of 2029. When I'm not in class I'm usually building one of the projects below.",
                'I study Robotics and Autonomous Systems at Arizona State University, expecting to graduate in 2029. Outside coursework I build the projects shown below.',
                'I am an undergraduate in Robotics and Autonomous Systems at Arizona State University (expected 2029); independent projects constitute the majority of this site.',
                'The author is an undergraduate student of Robotics and Autonomous Systems at Arizona State University (anticipated conferral 2029); the independent projects documented herein constitute the majority of this site.',
              ]} />
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
              <a
                href="mailto:prajval.2029@gmail.com"
                className="inline-flex items-center gap-2 border border-[#c4a35a]/40 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[#e6d9c4] hover:border-[#d4b87a]"
              >
                <Mail size={14} /> Contact me
              </a>
            </div>
          </Spread>
        </section>

        <section className="border-y border-[#3d3228] bg-[#241c16]/80">
          <div className="mx-auto grid site-shell gap-px md:grid-cols-2">
            {LAWS.map((item) => (
              <article key={item.law} className="px-5 py-8 md:px-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#8a7a68]">Conventional law</p>
                <p className="mt-2 font-display text-2xl text-[#9a8a76] line-through decoration-[#c4a35a]/80 decoration-2">
                  {item.law}
                </p>
                <p className="mt-4 max-w-md text-base leading-relaxed text-[#d8cbb6] font-wordy"><Words v={LAW_BREAKS[item.law]} /></p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto site-shell space-y-10 px-5 py-24">
          <Spread media={FRAMES.sky} reverse>
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#d4b87a]">A reading</p>
            <h2 className="mt-3 font-display font-wordy text-4xl leading-tight text-[#f0e6d4] md:text-5xl">
              <Words v={[
                'Who are you? Pick one: you give people jobs, you want to build something together, or you already know me.',
                'This site works three ways: if you hire people, if you want to build together, or if you already know me.',
                'Three ways to read this site - hiring me, building with me, or you already know me.',
                'This site reads three ways, depending on whether you are hiring, collaborating, or already know me.',
                'This site supports three reading paths, indexed by visitor intent: hiring, collaboration, or prior acquaintance.',
                'This site admits three reading paths, indexed by visitor intent: prospective employment, prospective collaboration, or prior acquaintance.',
              ]} />
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-[#b8a894] font-wordy">
              <Words v={[
                'Tap the card that sounds like you.',
                'Pick the card below that sounds like you.',
                'Pick the card below that fits why you came.',
                'Select the card below that matches your reason for visiting.',
                'Select the entry card corresponding to your intent.',
                'The reader is directed to the entry card corresponding to their intent.',
              ]} />
            </p>
          </Spread>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {READERS.map((r) => (
              <article key={r.who} className="border border-[#3d3228] bg-[#241c16] p-6">
                <h3 className="font-display font-wordy text-2xl text-[#d4b87a]">{r.who}</h3>
                <p className="mt-4 text-sm leading-relaxed text-[#b8a894] font-wordy"><Words v={READER_BODIES[r.who]} /></p>
              </article>
            ))}
          </div>
        </section>

        <section id="guide" className="mx-auto site-shell px-5 pb-24">
          <Spread media={FRAMES.walk}>
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#d4b87a]">Friends first</p>
            <h2 className="mt-3 font-display font-wordy text-4xl text-[#f0e6d4]">The walk, not the pitch.</h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#d8cbb6] font-wordy">
              <Words v={[
                'Know me already? This is the short version. Old websites are in Version history.',
                'If you already know me, this is the short version - no resume talk. Older sites live under Version history.',
                'Already know me? This section is the short version, no resume talk. Older versions of this site are under Version history.',
                'If we already know each other, what follows is the informal short version; earlier iterations of this site remain under Version history.',
                'For prior acquaintances: an informal summary follows. Previous iterations of this site are archived under Version history.',
                'For prior acquaintances, the ensuing summary adopts an informal register; antecedent iterations of this site remain accessible under Version history.',
              ]} />
            </p>
          </Spread>
        </section>

        <section id="now" className="mx-auto site-shell px-5 pb-24">
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
                    {job.title === 'Lab Assistant' && <a href="/lab-assistant" className="mt-4 inline-flex min-h-11 items-center border border-[#d4b87a] px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[#d4b87a]">Explore my lab work ↗</a>}
                  </article>
                ))}
              </div>
            </Spread>
          </div>
        </section>

        <section id="collisions" className="border-t border-[#3d3228] bg-[#241c16]/50 py-24">
          <div className="mx-auto site-shell px-5">
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

            <Link to="/projects" className="mt-12 inline-flex items-center gap-2 border border-[#d4b87a] px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[#d4b87a]">Explore the project library <ArrowUpRight size={14} /></Link>
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
                  {c.id === 'axis' && (
                    <a href="https://axis.prajvalarora.com/" target="_blank" rel="noreferrer"
                      className="mt-3 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[#d4b87a]">
                      Try the live demo <ArrowUpRight size={14} />
                    </a>
                  )}
                </article>
              ))}
            </div>

            <div className="mt-16">
              <h3 className="font-display text-2xl text-[#f0e6d4]">From the public workbench</h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {PROJECT_LIBRARY.filter(p => ['partyplay','aether','esp32-ai-robot','life','skydrift'].includes(p.slug)).map(p => (
                  <Link key={p.slug} to={'/projects/' + p.slug} className="border border-[#3d3228] bg-[#1c1814] p-5">
                    <p className="font-mono text-[10px] uppercase tracking-wider text-[#d4b87a]">{p.category}</p>
                    <h4 className="mt-3 font-display text-2xl text-[#f0e6d4]">{p.title}</h4>
                    <p className="mt-3 text-xs leading-relaxed text-[#b8a894]">{p.summary}</p>
                    <p className="mt-4 font-mono text-[10px] uppercase tracking-wider text-[#d4b87a]">Read the build ↗</p>
                  </Link>
                ))}
              </div>
            </div>
            <div className="mt-16">
              <h3 className="font-display text-2xl text-[#f0e6d4]">Other instruments</h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {MORE_WORK.map((w) => (
                  <article key={w.title} className="border-t border-[#3d3228] pt-4">
                    <h4 className="font-medium text-[#e6d9c4]"><Link to={w.link}>{w.title} ↗</Link></h4>
                    <p className="mt-2 text-xs leading-relaxed text-[#8a7a68]">{w.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="practice" className="mx-auto site-shell space-y-24 px-5 py-24">
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

        <section className="mx-auto site-shell px-5 pb-24">
          <Spread media={FRAMES.cinema} reverse>
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#d4b87a]">Offstage</p>
            <h2 className="mt-3 font-display text-4xl text-[#f0e6d4]">Play is not a footnote.</h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#d8cbb6]">
              Bollywood, a wall of live news, arms open. The same person who commissions a cell also likes to act. Independent thought includes joy.
            </p>
          </Spread>
        </section>

        <section id="field" className="border-y border-[#3d3228] bg-[#241c16]/70 py-24">
          <div className="mx-auto site-shell px-5">
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

        <section className="mx-auto site-shell px-5 py-24">
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
          <div className="mx-auto site-shell space-y-10 px-5">
            <Spread media={FRAMES.blazer}>
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#d4b87a]">Connect</p>
              <h2 className="mt-3 font-display text-4xl leading-tight text-[#f0e6d4] md:text-5xl">
                Write if you want a mind in the room, not a creative you can procure.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-[#b8a894]">
                Research, industrial cells, education, and strange prototypes. Friends, skip the formality.
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
        <div className="mx-auto flex site-shell flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#8a7a68]">
            © {new Date().getFullYear()} {PERSON.name} · Independence of thought
          </p>
          <VersionHistory />
        </div>
      </footer>
    </div>
  );
};
