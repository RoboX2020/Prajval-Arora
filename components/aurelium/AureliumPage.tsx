import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { PERSON } from '../../content';
import {
  AGENT_INTRO,
  AGENT_PARTS,
  BUILD_PLAN,
  CANVAS_INTRO,
  DATA_MODEL,
  DEFINITION,
  DOING,
  EDITION,
  EVIDENCE_INTRO,
  FACTS,
  JOURNEY,
  METRICS,
  MILESTONE,
  MVP_INTRO,
  MVP_STEPS,
  NAME_NOTE,
  NAV,
  PRINCIPLES,
  PROMPT_INTRO,
  PROMPT_RULES,
  PROMISE,
  RISKS,
  STACK,
  STATE_UPDATE,
  SURFACES,
  TOOL_INTRO,
  TOOLS,
  TRUST,
  VOICE,
  VOICE_MODES,
  VOICE_PHRASES,
  WORKSPACE_INTRO,
} from './data';
import { LearningLoop, MasteryLedger, ModeBoard, PhaseBoard, StateMachine, WorkspaceStudy } from './studies';

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? '');

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: '-20% 0px -55% 0px', threshold: [0.15, 0.4, 0.7] },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

function Section({
  id,
  index,
  title,
  intro,
  children,
}: {
  id: string;
  index: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-36 border-t border-[#4A3022]/10 py-16 md:py-24">
      <p className="au-kicker">{index}</p>
      <h2 className="au-display mt-3 max-w-3xl text-4xl leading-[1.08] text-[#241C15] md:text-5xl">{title}</h2>
      {intro ? <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#241C15]">{intro}</p> : null}
      <div className="mt-10">{children}</div>
    </section>
  );
}

function SectionNav({ active }: { active: string }) {
  return (
    <nav aria-label="On this page" className="flex w-max gap-x-5 gap-y-2 md:w-auto md:flex-wrap">
      {NAV.map((item) => {
        const key = item.href.slice(1);
        const current = active === key;
        return (
          <a
            key={item.href}
            href={item.href}
            aria-current={current ? 'true' : undefined}
            className={`whitespace-nowrap border-b-2 pb-1 text-sm ${
              current
                ? 'border-[#A87920] text-[#241C15]'
                : 'border-transparent text-[#4A3022]/80 hover:text-[#241C15]'
            }`}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}

export const AureliumPage: React.FC = () => {
  const ids = useMemo(() => NAV.map((item) => item.href.slice(1)), []);
  const active = useActiveSection(ids);

  useEffect(() => {
    const previousTitle = document.title;
    const meta = document.querySelector('meta[name="description"]');
    const previousDescription = meta?.getAttribute('content');
    const previousBody = document.body.style.backgroundColor;
    const previousColor = document.body.style.color;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const previousScroll = document.documentElement.style.scrollBehavior;

    document.title = 'Aurelium — Learn Anything';
    meta?.setAttribute(
      'content',
      'Aurelium is a concept for a personal learning environment: name a capability, walk a path to demonstrated mastery, and keep the evidence.',
    );
    document.body.style.backgroundColor = '#FBF8F1';
    document.body.style.color = '#241C15';
    if (motion.matches) document.documentElement.style.scrollBehavior = 'auto';

    return () => {
      document.title = previousTitle;
      if (previousDescription) meta?.setAttribute('content', previousDescription);
      document.body.style.backgroundColor = previousBody;
      document.body.style.color = previousColor;
      document.documentElement.style.scrollBehavior = previousScroll;
    };
  }, []);

  return (
    <div className="aurelium relative min-h-screen">
      <a
        href="#promise"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[80] focus:bg-[#FBF8F1] focus:px-3 focus:py-2 focus:text-[#241C15]"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-40 border-b border-[#4A3022]/10 bg-[#FBF8F1]/92 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 md:px-8">
          <a href="#promise" className="au-display text-[1.7rem] leading-none tracking-tight text-[#241C15]">
            Aurelium
          </a>
          <p className="hidden text-sm text-[#4A3022] md:block">Learn Anything</p>
          <Link to="/" className="shrink-0 text-sm text-[#4A3022] hover:text-[#241C15]">
            <span className="sm:hidden">Home</span>
            <span className="hidden sm:inline">{PERSON.name}</span>
          </Link>
        </div>
        <div className="mx-auto max-w-6xl overflow-x-auto px-5 pb-3 md:px-8">
          <SectionNav active={active} />
        </div>
      </header>

      <div>
        <main>
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <section id="promise" className="scroll-mt-36 relative pb-16 pt-14 md:pb-24 md:pt-20">
              <svg
                className="pointer-events-none absolute right-0 top-10 hidden h-56 w-56 lg:block"
                viewBox="0 0 200 200"
                aria-hidden="true"
              >
                <path
                  className="au-trace"
                  d="M30 70 L90 36 L160 78 L132 146 L48 132 Z"
                  fill="none"
                  stroke="#4A3022"
                  strokeWidth="1"
                  opacity="0.55"
                />
                {[
                  [30, 70],
                  [90, 36],
                  [160, 78],
                  [132, 146],
                  [48, 132],
                ].map(([cx, cy]) => (
                  <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3" fill="#A87920" />
                ))}
              </svg>

              <p className="au-kicker">{EDITION}</p>
              <h1 className="au-display mt-4 text-[clamp(4.6rem,13vw,8.75rem)] leading-[0.8] tracking-[-0.035em] text-[#241C15]">
                Aurelium
              </h1>
              <p className="au-display mt-5 text-[clamp(2.2rem,5vw,3.6rem)] italic leading-none text-[#4A3022]">
                Learn Anything
              </p>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-[#4A3022]">{NAME_NOTE}</p>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[#241C15]">{PROMISE}</p>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#4A3022]">
                This page is the concept. Aurelium is not a live learning system.
              </p>

              <div className="mt-12 grid gap-10 lg:grid-cols-12">
                <div className="space-y-5 lg:col-span-7">
                  {DEFINITION.map((paragraph) => (
                    <p key={paragraph.slice(0, 24)} className="text-lg leading-relaxed text-[#241C15]">
                      {paragraph}
                    </p>
                  ))}
                </div>
                <aside className="border border-[#4A3022]/15 bg-[#F4E9CE]/45 p-6 lg:col-span-5">
                  <p className="au-kicker">Example goal</p>
                  <p className="au-display mt-3 text-2xl leading-snug text-[#241C15]">
                    I want to understand projectile motion well enough to solve unequal height problems without memorizing cases.
                  </p>
                  <dl className="mt-6 space-y-4">
                    {FACTS.map((fact) => (
                      <div key={fact.label}>
                        <dt className="au-kicker">{fact.label}</dt>
                        <dd className="mt-1 text-sm leading-relaxed text-[#241C15]">{fact.value}</dd>
                      </div>
                    ))}
                  </dl>
                </aside>
              </div>
            </section>
          </div>

          <blockquote className="bg-[#4A3022] px-5 py-14 text-[#FBF8F1] md:px-8 md:py-20">
            <p className="mx-auto max-w-6xl au-display text-[clamp(2rem,4.4vw,3.6rem)] italic leading-[1.15]">
              It should never feel like an answer vending machine.
            </p>
          </blockquote>

          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <Section id="principles" index="01" title="Design principles">
              <ol className="border-t border-[#4A3022]/15">
                {PRINCIPLES.map((item, i) => (
                  <li key={item.title} className="grid gap-2 border-b border-[#4A3022]/15 py-6 md:grid-cols-12 md:gap-6 md:py-7">
                    <p className="au-display text-2xl text-[#4A3022] md:col-span-1">{String(i + 1).padStart(2, '0')}</p>
                    <h3 className="au-display text-2xl leading-tight text-[#241C15] md:col-span-4">{item.title}</h3>
                    <p className="text-base leading-relaxed text-[#241C15] md:col-span-7">{item.body}</p>
                  </li>
                ))}
              </ol>
            </Section>

            <Section id="journey" index="02" title="The learner journey">
              <ol className="max-w-3xl space-y-0">
                {JOURNEY.map((step, i) => (
                  <li key={step.slice(0, 32)} className="grid grid-cols-[auto_minmax(0,1fr)] gap-4 border-t border-[#4A3022]/15 py-5">
                    <span className="au-display text-xl text-[#4A3022]">{String(i + 1).padStart(2, '0')}</span>
                    <p className="text-base leading-relaxed text-[#241C15] md:text-lg">{step}</p>
                  </li>
                ))}
              </ol>
            </Section>

            <Section id="loop" index="03" title="The core learning loop">
              <LearningLoop />
            </Section>

            <Section id="workspace" index="04" title="Interface and experience" intro={WORKSPACE_INTRO}>
              <ul className="grid gap-px bg-[#4A3022]/15 sm:grid-cols-2">
                {SURFACES.map((surface) => (
                  <li key={surface.name} className="bg-[#FBF8F1] p-5 md:p-6">
                    <h3 className="au-display text-2xl text-[#241C15]">{surface.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#4A3022]">{surface.purpose}</p>
                    <p className="mt-3 text-base leading-relaxed text-[#241C15]">{surface.behavior}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <WorkspaceStudy />
              </div>
            </Section>

            <Section id="practice" index="05" title="Voice, canvas, and work">
              <div className="grid gap-12 lg:grid-cols-2">
                <div>
                  <h3 className="au-display text-3xl text-[#241C15]">Voice learning</h3>
                  <div className="mt-4 space-y-4">
                    {VOICE.map((paragraph) => (
                      <p key={paragraph.slice(0, 28)} className="text-base leading-relaxed text-[#241C15]">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  <p className="au-kicker mt-8">Modes</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {VOICE_MODES.map((mode) => (
                      <li key={mode} className="border border-[#4A3022]/20 px-3 py-1.5 text-sm text-[#241C15]">
                        {mode}
                      </li>
                    ))}
                  </ul>
                  <p className="au-kicker mt-8">The learner can say</p>
                  <ul className="mt-3 space-y-1">
                    {VOICE_PHRASES.map((phrase) => (
                      <li key={phrase} className="au-display text-xl italic text-[#241C15]">
                        {phrase}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="au-display text-3xl text-[#241C15]">Canvas and learn by doing</h3>
                  <p className="mt-4 text-base leading-relaxed text-[#241C15]">{CANVAS_INTRO}</p>
                </div>
              </div>
              <ul className="mt-12 border-t border-[#4A3022]/15">
                {DOING.map((item) => (
                  <li key={item.goal} className="grid gap-2 border-b border-[#4A3022]/15 py-5 md:grid-cols-12 md:gap-6">
                    <h3 className="au-display text-2xl text-[#241C15] md:col-span-3">{item.goal}</h3>
                    <p className="text-sm leading-relaxed text-[#4A3022] md:col-span-4">{item.environment}</p>
                    <p className="text-base leading-relaxed text-[#241C15] md:col-span-5">{item.task}</p>
                  </li>
                ))}
              </ul>
            </Section>

            <Section id="agent" index="06" title="AI agent architecture" intro={AGENT_INTRO}>
              <ul className="grid gap-px bg-[#4A3022]/15 sm:grid-cols-2">
                {AGENT_PARTS.map((part) => (
                  <li key={part.name} className="bg-[#FBF8F1] p-5">
                    <h3 className="au-display text-2xl text-[#241C15]">{part.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#241C15]">{part.responsibility}</p>
                    <p className="au-kicker mt-4">Output · {part.output}</p>
                  </li>
                ))}
              </ul>

              <h3 className="au-display mt-16 text-3xl text-[#241C15]">Tool and capability layer</h3>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#241C15]">{TOOL_INTRO}</p>
              <ul className="mt-8 border-t border-[#4A3022]/15">
                {TOOLS.map((tool) => (
                  <li key={tool.name} className="grid gap-2 border-b border-[#4A3022]/15 py-5 md:grid-cols-12 md:gap-6">
                    <h4 className="text-base font-semibold text-[#241C15] md:col-span-3">{tool.name}</h4>
                    <p className="text-sm leading-relaxed text-[#241C15] md:col-span-4">{tool.use}</p>
                    <p className="text-sm leading-relaxed text-[#4A3022] md:col-span-5">{tool.control}</p>
                  </li>
                ))}
              </ul>

              <h3 className="au-display mt-16 text-3xl text-[#241C15]">Agent state machine</h3>
              <div className="mt-6">
                <StateMachine />
              </div>

              <h3 className="au-display mt-16 text-3xl text-[#241C15]">Behavioral core</h3>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#241C15]">{PROMPT_INTRO}</p>
              <ol className="mt-8 grid gap-x-10 gap-y-4 md:grid-cols-2">
                {PROMPT_RULES.map((rule, i) => (
                  <li key={rule.slice(0, 40)} className="grid grid-cols-[auto_minmax(0,1fr)] gap-3 text-sm leading-relaxed text-[#241C15]">
                    <span className="au-kicker pt-0.5">{String(i + 1).padStart(2, '0')}</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-8 border border-[#4A3022]/15 bg-[#F4E9CE]/40 p-5">
                <p className="au-kicker">At the end of each meaningful interaction</p>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {STATE_UPDATE.map((item) => (
                    <li key={item} className="text-sm text-[#241C15]">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Section>

            <Section id="evidence" index="07" title="Structured evidence model" intro={EVIDENCE_INTRO}>
              <MasteryLedger />
              <h3 className="au-display mt-16 text-3xl text-[#241C15]">Runtime instructions by mode</h3>
              <div className="mt-6">
                <ModeBoard />
              </div>
              <h3 className="au-display mt-16 text-3xl text-[#241C15]">Data model</h3>
              <ul className="mt-6 border-t border-[#4A3022]/15">
                {DATA_MODEL.map((row) => (
                  <li key={row.entity} className="grid gap-1 border-b border-[#4A3022]/15 py-4 md:grid-cols-12 md:gap-6">
                    <h4 className="font-semibold text-[#241C15] md:col-span-3">{row.entity}</h4>
                    <p className="text-sm leading-relaxed text-[#241C15] md:col-span-9">{row.fields}</p>
                  </li>
                ))}
              </ul>
            </Section>

            <Section id="trust" index="08" title="Safety, privacy, and trust">
              <ul className="max-w-3xl space-y-4">
                {TRUST.map((item) => (
                  <li key={item.slice(0, 36)} className="border-l-2 border-[#A87920] pl-4 text-base leading-relaxed text-[#241C15]">
                    {item}
                  </li>
                ))}
              </ul>
              <h3 className="au-display mt-16 text-3xl text-[#241C15]">Risks and mitigations</h3>
              <ul className="mt-6 border-t border-[#4A3022]/15">
                {RISKS.map((item) => (
                  <li key={item.risk} className="grid gap-2 border-b border-[#4A3022]/15 py-5 md:grid-cols-12 md:gap-6">
                    <h4 className="au-display text-2xl text-[#241C15] md:col-span-3">{item.risk}</h4>
                    <p className="text-sm leading-relaxed text-[#4A3022] md:col-span-4">{item.failure}</p>
                    <p className="text-sm leading-relaxed text-[#241C15] md:col-span-5">{item.mitigation}</p>
                  </li>
                ))}
              </ul>
            </Section>

            <Section id="first" index="09" title="The first testable product" intro={MVP_INTRO}>
              <ol className="max-w-3xl border-t border-[#4A3022]/15">
                {MVP_STEPS.map((step, i) => (
                  <li key={step.slice(0, 28)} className="grid grid-cols-[auto_minmax(0,1fr)] gap-4 border-b border-[#4A3022]/15 py-4">
                    <span className="au-kicker pt-1">{String(i + 1).padStart(2, '0')}</span>
                    <p className="text-base leading-relaxed text-[#241C15]">{step}</p>
                  </li>
                ))}
              </ol>

              <h3 className="au-display mt-16 text-3xl text-[#241C15]">Roadmap</h3>
              <div className="mt-6">
                <PhaseBoard />
              </div>

              <h3 className="au-display mt-16 text-3xl text-[#241C15]">Pilot metrics</h3>
              <ul className="mt-6 border-t border-[#4A3022]/15">
                {METRICS.map((item) => (
                  <li key={item.metric} className="grid gap-2 border-b border-[#4A3022]/15 py-5 md:grid-cols-12 md:gap-6">
                    <h4 className="font-semibold text-[#241C15] md:col-span-3">{item.metric}</h4>
                    <p className="text-sm leading-relaxed text-[#241C15] md:col-span-5">{item.measure}</p>
                    <p className="text-sm leading-relaxed text-[#4A3022] md:col-span-4">{item.why}</p>
                  </li>
                ))}
              </ul>

              <h3 className="au-display mt-16 text-3xl text-[#241C15]">Immediate build plan</h3>
              <ol className="mt-6 max-w-3xl space-y-4">
                {BUILD_PLAN.map((step, i) => (
                  <li key={step.slice(0, 32)} className="grid grid-cols-[auto_minmax(0,1fr)] gap-4">
                    <span className="au-kicker pt-1">{String(i + 1).padStart(2, '0')}</span>
                    <p className="text-base leading-relaxed text-[#241C15]">{step}</p>
                  </li>
                ))}
              </ol>

              <h3 className="au-display mt-16 text-3xl text-[#241C15]">Suggested technology</h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#4A3022]">
                Initial choices from the concept. Not a commitment that these are already built.
              </p>
              <ul className="mt-6 border-t border-[#4A3022]/15">
                {STACK.map((row) => (
                  <li key={row.layer} className="grid gap-1 border-b border-[#4A3022]/15 py-4 md:grid-cols-12 md:gap-6">
                    <h4 className="font-semibold text-[#241C15] md:col-span-3">{row.layer}</h4>
                    <p className="text-sm leading-relaxed text-[#241C15] md:col-span-4">{row.choice}</p>
                    <p className="text-sm leading-relaxed text-[#4A3022] md:col-span-5">{row.reason}</p>
                  </li>
                ))}
              </ul>
            </Section>

            <section className="border-t border-[#4A3022]/10 py-20 md:py-28">
              <p className="au-kicker">First milestone</p>
              <p className="au-display mt-4 max-w-4xl text-[clamp(1.8rem,3.6vw,3rem)] leading-[1.2] text-[#241C15]">
                {MILESTONE}
              </p>
            </section>
          </div>
        </main>
      </div>

      <footer className="border-t border-[#4A3022]/10 px-5 py-10 md:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="au-display text-2xl text-[#241C15]">Aurelium</p>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-[#4A3022]">
              {EDITION}. Learn Anything. A concept for how a future education system could teach, test, and keep evidence. Hosted by {PERSON.name}.
            </p>
          </div>
          <Link to="/" className="text-sm text-[#4A3022] hover:text-[#241C15]">
            Back to the current site
          </Link>
        </div>
      </footer>
    </div>
  );
};
