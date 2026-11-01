import React from 'react';

/*
 * BuildIntro - the "15 cursors speed-build the site" loading intro.
 *
 * Plays once per full page load on the home page. A swarm of cursor arrows
 * flies in, terminal cards flash generic web-build commands, and ghost
 * wireframes stamp the page top-to-bottom; each finished band dissolves to
 * reveal the real page underneath. Skippable by click/tap/Escape, disabled
 * for prefers-reduced-motion.
 *
 * Debug (preview only): ?introFreeze=<ms> renders a paused frame at that
 * timestamp for inspection; ?nointro skips; ?introRM=1 forces the
 * reduced-motion branch (no overlay).
 */

const TOTAL = 5600; // ms of choreography
const ARROWS = 15;

// Warm ramp on the site's ember/cream palette.
const COLORS = [
  '#e4570d', '#d4a017', '#a3742a', '#1c1814', '#b58547',
  '#c96f1e', '#54483a', '#e78a3d', '#7a3f10', '#2a2118',
  '#f0a24a', '#6d5f4b', '#ee6a1f', '#8a5a2b', '#d4b87a',
];
const TAGS = [
  'header', 'nav', 'hero', 'portrait', 'words',
  'photos', 'grid', 'cards', 'links', 'type',
  'media', 'pages', 'footer', 'slider', 'polish',
];

// Band windows: each band builds for BUILD ms, then dissolves.
const BUILD = 700;
const bandStart = (k: number) => 1000 + (k - 1) * 760;
const BAND_TOP = [0, 15, 38, 60, 80]; // vh
const BAND_H = [15, 23, 22, 20, 20]; // vh
const COUNT_AT = [5, 11, 16, 21, 24];

const TERMINALS: Array<[string, string]> = [
  ['$ scaffold header', 'nav: 8 links, name mark'],
  ['$ place hero', 'portrait + display type'],
  ['$ wire story', 'reading, now, quest'],
  ['$ mount work', 'cards, photos, links'],
  ['$ final pass', 'palette: ember on cream'],
];

// Deterministic pseudo-random from an index.
const pr = (i: number, salt: number) => {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

interface Pt { x: number; y: number }

// Edge spawn point per arrow (off-canvas).
const spawn = (i: number): Pt => {
  const side = i % 4;
  const t = pr(i, 1);
  if (side === 0) return { x: -6, y: 10 + t * 80 };
  if (side === 1) return { x: 106, y: 10 + t * 80 };
  if (side === 2) return { x: 10 + t * 80, y: -8 };
  return { x: 10 + t * 80, y: 108 };
};

// Build keyframes for one arrow across the whole timeline.
const flyKeyframes = (i: number): string => {
  const crew = i % 5; // which band this arrow works on
  const stops: Array<[number, Pt]> = [];
  const push = (ms: number, p: Pt) => stops.push([Math.min(100, (ms / TOTAL) * 100), p]);

  const home: Pt = { x: 8 + pr(i, 2) * 84, y: 18 + pr(i, 3) * 64 };
  push(0, spawn(i));
  push(900, home);

  for (let k = 1; k <= 5; k++) {
    const s = bandStart(k);
    if (crew === k - 1) {
      // Active: dart into the band and jiggle while stamping.
      const bx = 12 + pr(i, 10 + k) * 70;
      const by = BAND_TOP[k - 1] + 2 + pr(i, 20 + k) * (BAND_H[k - 1] - 6);
      push(s + 60, { x: bx, y: by });
      push(s + 220, { x: bx + 6, y: by + 3 });
      push(s + 380, { x: bx - 5, y: by + 6 });
      push(s + 560, { x: bx + 3, y: by - 2 });
    } else {
      // Idle drift near home.
      push(s + 300, { x: home.x + (pr(i, 30 + k) - 0.5) * 14, y: home.y + (pr(i, 40 + k) - 0.5) * 10 });
    }
  }
  push(4950, { x: 44 + pr(i, 50) * 12, y: 46 + pr(i, 51) * 8 }); // gather
  push(TOTAL, { x: 108 + pr(i, 52) * 8, y: 112 }); // exit bottom-right

  const body = stops.map(([p, pt]) => `${p.toFixed(2)}% { left: ${pt.x.toFixed(1)}vw; top: ${pt.y.toFixed(1)}vh; }`).join('\n');
  return `@keyframes fly-${i} {\n${body}\n}`;
};

// Ghost wireframe rects per band: [left%, top%(of band), width%, height%(of band), delayOffsetMs]
const RECTS: Record<number, Array<[number, number, number, number, number]>> = {
  1: [[2, 18, 10, 60, 0], [16, 30, 7, 36, 90], [26, 30, 7, 36, 150], [36, 30, 9, 36, 210], [48, 30, 8, 36, 270], [59, 30, 9, 36, 330], [71, 30, 7, 36, 390], [82, 30, 8, 36, 450]],
  2: [[4, 8, 30, 84, 0], [40, 14, 34, 22, 120], [40, 44, 24, 14, 240], [40, 64, 28, 12, 360], [78, 20, 16, 50, 300]],
  3: [[4, 10, 44, 80, 0], [54, 10, 42, 36, 150], [54, 54, 42, 36, 300]],
  4: [[4, 14, 28, 70, 0], [36, 14, 28, 70, 130], [68, 14, 28, 70, 260]],
  5: [[4, 20, 60, 56, 0], [70, 32, 24, 30, 200]],
};

interface Props { onDone: () => void; freeze: number | null }

export const BuildIntro: React.FC<Props> = ({ onDone, freeze }) => {
  const [elapsed, setElapsed] = React.useState(0);
  const [leaving, setLeaving] = React.useState(false);

  const frozen = freeze !== null;
  const t = frozen ? freeze : elapsed;

  React.useEffect(() => {
    if (frozen) return;
    const started = performance.now();
    let raf = 0;
    const tick = () => {
      setElapsed(performance.now() - started);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const fadeT = setTimeout(() => setLeaving(true), TOTAL - 250);
    const doneT = setTimeout(onDone, TOTAL + 100);
    const skip = () => { setLeaving(true); setTimeout(onDone, 320); };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') skip(); };
    window.addEventListener('click', skip);
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(fadeT);
      clearTimeout(doneT);
      window.removeEventListener('click', skip);
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const doneBands = COUNT_AT.filter((_, k) => t >= bandStart(k + 1) + BUILD).length;
  const counter = doneBands === 0 ? 0 : COUNT_AT[doneBands - 1];

  const css = `
    ${Array.from({ length: ARROWS }, (_, i) => flyKeyframes(i)).join('\n')}
    @keyframes bi-pop { 0% { opacity: 0; transform: scale(1.08); } 55% { opacity: 1; transform: scale(0.99); } 100% { opacity: 1; transform: scale(1); } }
    @keyframes bi-grow { 0% { transform: scaleX(0); } 100% { transform: scaleX(1); } }
    @keyframes bi-band { 0% { opacity: 1; } 100% { opacity: 0; } }
    @keyframes bi-type { 0% { width: 0; } 100% { width: 100%; } }
    @keyframes bi-blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
    @keyframes bi-term { 0% { opacity: 0; transform: translateY(6px); } 100% { opacity: 1; transform: translateY(0); } }
    .bi-anim { animation-duration: ${TOTAL}ms; animation-timing-function: linear; animation-fill-mode: both; animation-delay: 0ms; }
    .bi-frozen, .bi-frozen * { animation-play-state: paused !important; }
  `;

  return (
    <div
      role="presentation"
      aria-hidden="true"
      className={`fixed inset-0 z-[100] ${frozen ? 'bi-frozen' : ''} transition-opacity duration-300 ${leaving && !frozen ? 'opacity-0' : 'opacity-100'}`}
      style={{ '--freeze': `${frozen ? freeze : 0}ms` } as React.CSSProperties}
    >
      <style>{css}</style>

      {/* Bands tile the viewport; each dissolves when its build finishes. */}
      {[0, 1, 2, 3, 4].map((k) => {
        const s = bandStart(k + 1);
        return (
          <div
            key={k}
            className="absolute left-0 right-0 overflow-hidden bg-[#1c1814]"
            style={{
              top: `${BAND_TOP[k]}vh`,
              height: `${BAND_H[k]}vh`,
              animation: `bi-band 260ms ease-out both`,
              animationDelay: `calc(${s + BUILD}ms - var(--freeze, 0ms))`,
            }}
          >
            {/* ghost wireframes stamp in */}
            {(RECTS[k + 1] || []).map(([l, tp, w, h, off], ri) => (
              <div
                key={ri}
                className="absolute rounded-md border border-[#d4b87a] bg-[#c4a35a]/10"
                style={{
                  left: `${l}%`, top: `${tp}%`, width: `${w}%`, height: `${h}%`,
                  transformOrigin: 'left center',
                  animation: `bi-grow 220ms cubic-bezier(.2,.9,.3,1.2) both`,
                  animationDelay: `calc(${s + 80 + off}ms - var(--freeze, 0ms))`,
                }}
              />
            ))}
            {/* terminal card */}
            <div
              className="absolute rounded-md px-3 py-2 font-mono text-[10px] md:text-[11px] leading-relaxed shadow-lg"
              style={{
                right: k % 2 === 0 ? '4%' : 'auto', left: k % 2 === 0 ? 'auto' : '4%',
                bottom: '8%',
                background: '#141009', color: '#ffb454',
                border: '1px solid #3d2c14',
                animation: `bi-term 180ms ease-out both`,
                animationDelay: `calc(${s + 120}ms - var(--freeze, 0ms))`,
                maxWidth: '62vw',
              }}
            >
              {TERMINALS[k].map((line, li) => (
                <div key={li} className="overflow-hidden whitespace-nowrap"
                  style={{
                    animation: `bi-type 260ms steps(${line.length}) both`,
                    animationDelay: `calc(${s + 200 + li * 300}ms - var(--freeze, 0ms))`,
                    color: li === 0 ? '#ffd9a0' : '#9a8a76',
                  }}>
                  {line}
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* status line + element counter */}
      <div className="absolute left-4 top-3 font-mono text-[11px] md:text-xs text-[#9a8a76]">
        <span className="text-[#d4b87a]">$</span> build . --fast
        <span className="inline-block w-2"
          style={{ animation: 'bi-blink 800ms steps(1) infinite', animationDelay: 'calc(0ms - var(--freeze, 0ms))' }}>_</span>
      </div>
      <div className="absolute right-4 top-3 font-mono text-[11px] md:text-xs text-[#9a8a76]">
        {counter} elements
      </div>

      {/* the swarm */}
      {Array.from({ length: ARROWS }, (_, i) => (
        <div
          key={i}
          className="absolute bi-anim"
          style={{ animationName: `fly-${i}`, animationDelay: 'calc(0ms - var(--freeze, 0ms))', left: '-6vw', top: '-8vh' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" className="md:w-6 md:h-6 drop-shadow-sm">
            <path d="M4 2 L20 11.5 L12.6 13.4 L9.4 21.5 Z"
              fill={COLORS[i]} stroke={COLORS[i] === '#f6f0e2' || COLORS[i] === '#d4b87a' ? '#1c1814' : '#f6f0e2'} strokeWidth="1" />
          </svg>
          <span
            className="absolute left-5 top-4 rounded-sm px-1 font-mono text-[8px] leading-3 hidden sm:inline-block"
            style={{ background: COLORS[i], color: ['#1c1814', '#54483a', '#7a3f10', '#2a2118', '#6d5f4b'].includes(COLORS[i]) ? '#f6f0e2' : '#1c1814' }}
          >
            {TAGS[i]}
          </span>
        </div>
      ))}

      {/* skip hint */}
      <div className="absolute bottom-3 right-4 font-mono text-[10px] text-[#9a8a76] opacity-70">
        click to skip
      </div>
    </div>
  );
};
