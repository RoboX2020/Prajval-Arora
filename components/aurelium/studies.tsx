import React, { useRef, useState } from 'react';
import {
  ASSESSMENT_RULE,
  EXAMPLE_GOAL,
  EXAMPLE_TURNS,
  LOOP,
  MASTERY_STATES,
  MODES,
  PHASES,
} from './data';

function useSelection(count: number, initial = 0) {
  const [index, setIndex] = useState(initial);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  function onKeyDown(event: React.KeyboardEvent) {
    let next = index;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index + 1) % count;
    else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (index - 1 + count) % count;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = count - 1;
    else return;
    event.preventDefault();
    setIndex(next);
    refs.current[next]?.focus();
  }

  return { index, setIndex, refs, onKeyDown };
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="au-kicker">{label}</p>
      <p className="mt-2 text-base leading-relaxed text-[#241C15]">{children}</p>
    </div>
  );
}

export function LearningLoop() {
  const { index, setIndex, refs, onKeyDown } = useSelection(LOOP.length);
  const stage = LOOP[index];

  return (
    <div className="grid gap-8 lg:grid-cols-[16rem_minmax(0,1fr)]">
      <div
        role="tablist"
        aria-label="Learning loop stages"
        aria-orientation="vertical"
        className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible"
        onKeyDown={onKeyDown}
      >
        {LOOP.map((item, i) => {
          const selected = i === index;
          return (
            <button
              key={item.stage}
              ref={(node) => {
                refs.current[i] = node;
              }}
              id={`loop-tab-${i}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls="loop-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => setIndex(i)}
              className={`whitespace-nowrap border px-3 py-2 text-left text-sm lg:whitespace-normal ${
                selected
                  ? 'border-[#A87920] bg-[#F4E9CE] text-[#241C15]'
                  : 'border-[#4A3022]/15 bg-transparent text-[#4A3022] hover:border-[#4A3022]/40'
              }`}
            >
              <span className="au-kicker mr-2">{String(i + 1).padStart(2, '0')}</span>
              {item.stage}
            </button>
          );
        })}
      </div>
      <div
        id="loop-panel"
        role="tabpanel"
        aria-labelledby={`loop-tab-${index}`}
        className="border border-[#4A3022]/15 bg-[#F4E9CE]/50 p-6 md:p-8"
      >
        <h3 className="au-display text-3xl text-[#241C15]">{stage.stage}</h3>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <Field label="AI behavior">{stage.ai}</Field>
          <Field label="Learner output">{stage.learner}</Field>
          <Field label="Evidence created">{stage.evidence}</Field>
        </div>
      </div>
    </div>
  );
}

const CAPTION: Record<(typeof EXAMPLE_TURNS)[number]['focus'], string> = {
  components: 'The canvas asks for velocity components before any calculation.',
  misconception: 'Landing is marked where the learner first put vertical velocity at zero.',
  apex: 'The only instant of zero vertical velocity is the top of the path.',
  descent: 'One second after the apex, the ball is moving downward.',
  transfer: 'The new case lands fifteen metres below launch. The sign is still an open question.',
  record: 'Apex condition is recorded as developing, not mastered.',
};

export function WorkspaceStudy() {
  const { index, setIndex, refs, onKeyDown } = useSelection(EXAMPLE_TURNS.length);
  const turn = EXAMPLE_TURNS[index];

  function go(next: number) {
    const wrapped = (next + EXAMPLE_TURNS.length) % EXAMPLE_TURNS.length;
    setIndex(wrapped);
    refs.current[wrapped]?.focus();
  }

  return (
    <figure className="border border-[#4A3022]/15">
      <figcaption className="flex flex-wrap items-end justify-between gap-3 border-b border-[#4A3022]/15 px-4 py-4 md:px-6">
        <div>
          <p className="au-kicker">Example interaction</p>
          <p className="au-display mt-1 text-2xl text-[#241C15]">Projectile motion</p>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-[#4A3022]">
          A rendering of the described workspace, using the blueprint’s worked example. Not a product screenshot.
        </p>
      </figcaption>

      <div className="grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="border-b border-[#4A3022]/15 lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between gap-3 px-4 py-3 md:px-5">
            <p className="au-kicker">Conversation</p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => go(index - 1)}
                className="border border-[#4A3022]/20 px-2 py-1 text-sm text-[#4A3022] hover:border-[#4A3022]"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => go(index + 1)}
                className="border border-[#4A3022]/20 px-2 py-1 text-sm text-[#4A3022] hover:border-[#4A3022]"
              >
                Next
              </button>
            </div>
          </div>
          <div
            role="tablist"
            aria-label="Example conversation"
            aria-orientation="vertical"
            onKeyDown={onKeyDown}
          >
            {EXAMPLE_TURNS.map((item, i) => {
              const selected = i === index;
              return (
                <button
                  key={item.text}
                  ref={(node) => {
                    refs.current[i] = node;
                  }}
                  id={`turn-tab-${i}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls="turn-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setIndex(i)}
                  className={`block w-full border-t border-[#4A3022]/10 px-4 py-3 text-left md:px-5 ${
                    selected ? 'bg-[#F4E9CE]' : 'hover:bg-[#F4E9CE]/40'
                  }`}
                >
                  <span className="au-kicker">
                    {String(i + 1).padStart(2, '0')} · {item.speaker}
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-[#241C15]">{item.text}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div id="turn-panel" role="tabpanel" aria-labelledby={`turn-tab-${index}`} className="flex flex-col">
          <Trajectory focus={turn.focus} />
          <div className="grid gap-5 border-t border-[#4A3022]/15 p-4 md:grid-cols-2 md:p-5">
            <Field label="What the system learns">{turn.learns}</Field>
            <Field label="On the canvas">{CAPTION[turn.focus]}</Field>
          </div>
          <div className="mt-auto border-t border-[#4A3022]/15 bg-[#F4E9CE]/60 p-4 md:p-5" aria-live="polite">
            <p className="au-kicker">Mastery map · this example only</p>
            {turn.focus === 'record' ? (
              <>
                <p className="au-display mt-2 text-2xl text-[#241C15]">Apex condition · Developing</p>
                <p className="mt-2 text-sm leading-relaxed text-[#241C15]">
                  Not mastered. Schedule an independent mixed problem later.
                </p>
              </>
            ) : turn.focus === 'transfer' ? (
              <>
                <p className="au-display mt-2 text-2xl text-[#241C15]">Sign convention · open</p>
                <p className="mt-2 text-sm leading-relaxed text-[#241C15]">
                  The example asks for the sign of vertical displacement. It does not record an answer or a mastery state.
                </p>
              </>
            ) : (
              <>
                <p className="au-display mt-2 text-2xl text-[#241C15]">No judgment yet</p>
                <p className="mt-2 text-sm leading-relaxed text-[#241C15]">
                  This turn creates a note, not a mastery claim. Assistance and uncertainty stay attached to the work.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
      <p className="border-t border-[#4A3022]/15 px-4 py-3 text-sm leading-relaxed text-[#4A3022] md:px-6">
        Goal: {EXAMPLE_GOAL}
      </p>
    </figure>
  );
}

function Trajectory({ focus }: { focus: (typeof EXAMPLE_TURNS)[number]['focus'] }) {
  const show = (name: (typeof EXAMPLE_TURNS)[number]['focus']) => (focus === name ? 1 : 0);
  return (
    <div className="bg-[#F4E9CE]/35 px-2 pt-4">
      <svg viewBox="0 0 720 400" className="h-auto w-full" aria-hidden="true">
        <line x1="40" y1="168" x2="220" y2="168" stroke="#4A3022" strokeOpacity="0.28" strokeDasharray="4 6" />
        <path
          d="M 72 168 C 170 168 230 78 340 74 C 470 70 520 180 600 300"
          fill="none"
          stroke="#241C15"
          strokeWidth="2.5"
        />
        <circle cx="72" cy="168" r="5" fill="#241C15" />
        <circle cx="340" cy="74" r="4" fill="#241C15" />
        <circle cx="600" cy="300" r="5" fill="#241C15" />
        <text x="48" y="192" fill="#4A3022" fontSize="15" fontFamily="Source Sans 3, sans-serif">
          Launch
        </text>
        <text x="548" y="328" fill="#4A3022" fontSize="15" fontFamily="Source Sans 3, sans-serif">
          Landing
        </text>
        <g opacity={show('components')}>
          <Arrow x={118} y={148} dx={62} dy={0} />
          <Arrow x={118} y={148} dx={0} dy={-52} />
          <text x="136" y="118" fill="#241C15" fontSize="16" fontFamily="Source Sans 3, sans-serif">
            velocity components
          </text>
        </g>
        <g opacity={show('apex')}>
          <circle cx="340" cy="74" r="8" fill="#A87920" />
          <text x="356" y="58" fill="#241C15" fontSize="16" fontFamily="Source Sans 3, sans-serif">
            the one instant vy = 0
          </text>
        </g>
        <g opacity={show('descent')}>
          <circle cx="488" cy="148" r="6" fill="#241C15" />
          <Arrow x={488} y={156} dx={0} dy={46} />
          <text x="430" y="132" fill="#241C15" fontSize="16" fontFamily="Source Sans 3, sans-serif">
            one second later, moving downward
          </text>
        </g>
        <g opacity={show('misconception')}>
          <circle cx="600" cy="300" r="9" fill="none" stroke="#A87920" strokeWidth="2" />
          <text x="300" y="360" fill="#241C15" fontSize="16" fontFamily="Source Sans 3, sans-serif">
            first claim: vertical velocity is zero on landing
          </text>
        </g>
        <g opacity={show('transfer')}>
          <line x1="600" y1="168" x2="600" y2="300" stroke="#A87920" strokeWidth="2" />
          <text x="392" y="236" fill="#241C15" fontSize="16" fontFamily="Source Sans 3, sans-serif">
            fifteen metres below launch
          </text>
        </g>
        <g opacity={show('record')}>
          <rect x="186" y="24" width="292" height="34" fill="#4A3022" />
          <text x="202" y="46" fill="#FBF8F1" fontSize="16" fontFamily="Source Sans 3, sans-serif">
            Apex condition · Developing
          </text>
        </g>
      </svg>
    </div>
  );
}

function Arrow({ x, y, dx, dy }: { x: number; y: number; dx: number; dy: number }) {
  const endX = x + dx;
  const endY = y + dy;
  const angle = Math.atan2(dy, dx);
  const size = 7;
  const a1 = angle + Math.PI * 0.82;
  const a2 = angle - Math.PI * 0.82;
  const p1 = `${endX + Math.cos(a1) * size},${endY + Math.sin(a1) * size}`;
  const p2 = `${endX + Math.cos(a2) * size},${endY + Math.sin(a2) * size}`;
  return (
    <g stroke="#241C15" fill="#241C15" strokeWidth="1.6">
      <line x1={x} y1={y} x2={endX} y2={endY} />
      <polygon points={`${endX},${endY} ${p1} ${p2}`} stroke="none" />
    </g>
  );
}

export function StateMachine() {
  const forward = ['Orient', 'Diagnose', 'Plan', 'Teach', 'Practice', 'Probe', 'Verify'];
  const back = ['Evaluate', 'Transfer', 'Reflect'];

  return (
    <div className="border border-[#4A3022]/15 p-5 md:p-8">
      <ol className="flex flex-wrap items-center gap-2">
        {forward.map((name, i) => (
          <li key={name} className="flex items-center gap-2">
            <span className="border border-[#4A3022]/20 bg-[#F4E9CE]/50 px-3 py-2 text-sm text-[#241C15]">{name}</span>
            {i < forward.length - 1 && <span aria-hidden="true" className="text-[#4A3022]">→</span>}
          </li>
        ))}
      </ol>
      <p className="mt-4 text-sm leading-relaxed text-[#4A3022]">
        Rendered from the blueprint’s session flow. Diagnose, plan, teach, practice, probe, and verify can enter evaluation.
      </p>
      <ol className="mt-4 flex flex-wrap items-center gap-2">
        {back.map((name, i) => (
          <li key={name} className="flex items-center gap-2">
            <span className="border border-[#4A3022]/20 px-3 py-2 text-sm text-[#241C15]">{name}</span>
            {i < back.length - 1 && <span aria-hidden="true" className="text-[#4A3022]">→</span>}
          </li>
        ))}
        <li className="text-sm text-[#4A3022]">returns to Orient</li>
      </ol>
      <p className="mt-4 text-sm text-[#241C15]">Schedule retention follows reflection.</p>
      <p className="mt-6 max-w-2xl border-t border-[#4A3022]/15 pt-4 text-base leading-relaxed text-[#241C15]">
        {ASSESSMENT_RULE}
      </p>
    </div>
  );
}

export function MasteryLedger() {
  const { index, setIndex, refs, onKeyDown } = useSelection(MASTERY_STATES.length, 2);
  const item = MASTERY_STATES[index];

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div role="tablist" aria-label="Mastery states" aria-orientation="vertical" onKeyDown={onKeyDown}>
        {MASTERY_STATES.map((state, i) => {
          const selected = i === index;
          return (
            <button
              key={state.state}
              ref={(node) => {
                refs.current[i] = node;
              }}
              id={`state-tab-${i}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls="state-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => setIndex(i)}
              className={`flex w-full items-center justify-between border-b border-[#4A3022]/15 px-1 py-3 text-left ${
                selected ? 'text-[#241C15]' : 'text-[#4A3022]/80 hover:text-[#241C15]'
              }`}
            >
              <span className="au-display text-2xl">{state.state}</span>
              {selected && <span aria-hidden="true" className="h-2 w-2 bg-[#A87920]" />}
            </button>
          );
        })}
      </div>
      <div id="state-panel" role="tabpanel" aria-labelledby={`state-tab-${index}`} className="bg-[#F4E9CE]/60 p-6 md:p-8">
        <Field label="Meaning">{item.meaning}</Field>
        <div className="mt-6">
          <Field label="Promotion condition">{item.promotion}</Field>
        </div>
      </div>
    </div>
  );
}

export function ModeBoard() {
  const { index, setIndex, refs, onKeyDown } = useSelection(MODES.length, 1);
  const mode = MODES[index];

  return (
    <div>
      <div
        role="tablist"
        aria-label="Runtime modes"
        className="flex gap-2 overflow-x-auto"
        onKeyDown={onKeyDown}
      >
        {MODES.map((item, i) => {
          const selected = i === index;
          return (
            <button
              key={item.mode}
              ref={(node) => {
                refs.current[i] = node;
              }}
              id={`mode-tab-${i}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls="mode-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => setIndex(i)}
              className={`whitespace-nowrap border px-3 py-2 text-sm ${
                selected
                  ? 'border-[#4A3022] bg-[#4A3022] text-[#FBF8F1]'
                  : 'border-[#4A3022]/20 text-[#4A3022] hover:border-[#4A3022]'
              }`}
            >
              {item.mode}
            </button>
          );
        })}
      </div>
      <div id="mode-panel" role="tabpanel" aria-labelledby={`mode-tab-${index}`} className="mt-4 grid gap-6 border border-[#4A3022]/15 p-6 md:grid-cols-2">
        <Field label="Permitted behavior">{mode.permitted}</Field>
        <Field label="Prohibited behavior">{mode.prohibited}</Field>
      </div>
    </div>
  );
}

export function PhaseBoard() {
  const { index, setIndex, refs, onKeyDown } = useSelection(PHASES.length);
  const phase = PHASES[index];

  return (
    <div className="grid gap-8 lg:grid-cols-[16rem_minmax(0,1fr)]">
      <div role="tablist" aria-label="Roadmap phases" aria-orientation="vertical" onKeyDown={onKeyDown} className="flex gap-2 overflow-x-auto lg:flex-col">
        {PHASES.map((item, i) => {
          const selected = i === index;
          return (
            <button
              key={item.phase}
              ref={(node) => {
                refs.current[i] = node;
              }}
              id={`phase-tab-${i}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls="phase-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => setIndex(i)}
              className={`whitespace-nowrap px-1 py-2 text-left text-sm lg:border-l-2 lg:pl-3 ${
                selected
                  ? 'border-[#A87920] text-[#241C15]'
                  : 'border-transparent text-[#4A3022]/75 hover:text-[#241C15]'
              }`}
            >
              {item.phase}
            </button>
          );
        })}
      </div>
      <div id="phase-panel" role="tabpanel" aria-labelledby={`phase-tab-${index}`}>
        <p className="au-kicker">Decision gate</p>
        <p className="au-display mt-3 text-3xl leading-tight text-[#241C15] md:text-4xl">{phase.gate}</p>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-[#241C15]">
          <span className="au-kicker mr-2">Product capability</span>
          {phase.capability}
        </p>
      </div>
    </div>
  );
}
