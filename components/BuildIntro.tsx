import React from 'react';

/*
 * BuildIntro - the "15 cursors speed-build the site" loading intro.
 *
 * Plays once per full page load on the home page. A swarm of cursor arrows
 * flies in and the whole landing page is built for real, top to bottom:
 * ghost wireframes stamp in exactly where real page elements sit (measured
 * from the live DOM at runtime), crews of arrows dart to each stamp, sweep
 * the blueprint cover off each section slice, and the page autoscrolls to
 * follow the build all the way to the footer, then whips back to the top
 * and hands over. The reveal is the real page - covers hide it and are
 * swept away. Skippable by click/tap/Escape, disabled for
 * prefers-reduced-motion.
 *
 * Debug (preview only): ?introFreeze=<ms> renders a paused frame at that
 * timestamp for inspection; ?nointro skips; ?introRM=1 forces the
 * reduced-motion branch (no overlay).
 */

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

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const easeInOut = (u: number) => (u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2);
const smooth = (u: number) => u * u * (3 - 2 * u);
const pr = (i: number, salt: number) => {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

interface Ghost { x: number; y: number; w: number; h: number; stamp: number }
interface Phase {
  label: string;
  top: number; height: number; left: number; width: number; // document coords
  start: number; dur: number;
  scrollFrom: number; scrollTo: number;
  wipeStart: number; wipeDur: number;
  ghosts: Ghost[];
}
interface Plan {
  phases: Phase[];
  totalGhosts: number;
  holdStart: number;
  backStart: number;
  backDur: number;
  total: number;
  maxScroll: number;
}

const LABELS: Record<string, string> = {
  guide: 'route the guide', now: 'stamp the now board', collisions: 'wire collisions',
  practice: 'stack the practice', field: 'pin field notes', connect: 'ground connect',
};

function measure(): Plan | null {
  const root = document.querySelector<HTMLElement>('.origin-root');
  const header = root?.querySelector<HTMLElement>('header');
  const main = root?.querySelector<HTMLElement>('main');
  const footer = root?.querySelector<HTMLElement>('footer');
  if (!root || !header || !main) return null;
  const rootTop = root.getBoundingClientRect().top + window.scrollY;
  const vh = window.innerHeight;
  const maxScroll = Math.max(0, document.documentElement.scrollHeight - vh);

  // Build units: header, hero, then each main child, then footer. Tall
  // sections are sliced into viewport-ish slabs so the build stays on screen
  // while scrolling through them.
  interface Unit { top: number; height: number; label: string; dur: number; el: HTMLElement }
  const units: Unit[] = [];
  const addSliced = (el: HTMLElement, label: string, dur: number) => {
    const r = el.getBoundingClientRect();
    const top = r.top + window.scrollY - rootTop;
    const h = r.height;
    if (h > vh * 0.95) {
      const n = Math.ceil(h / (vh * 0.85));
      const sliceH = h / n;
      for (let i = 0; i < n; i++) {
        units.push({ top: top + i * sliceH, height: sliceH, label: i === 0 ? label : label + ' (cont.)', dur: 450, el });
      }
    } else {
      units.push({ top, height: h, label, dur, el });
    }
  };

  addSliced(header, 'scaffold header · nav links', 1100);
  Array.from(main.children).forEach((child, ci) => {
    const el = child as HTMLElement;
    if (el.offsetHeight < 40) return;
    const id = el.id || el.querySelector('[id]')?.id || '';
    const fallback = ci === 0 ? 'place hero - portrait + display type' : 'frame section ' + (ci + 1);
    addSliced(el, LABELS[id] || fallback, ci === 0 ? 1500 : ci === 1 ? 800 : Math.max(600, 900 - ci * 40));
  });
  if (footer) addSliced(footer, 'ground the footer', 550);

  const phases: Phase[] = [];
  let clock = 700; // arrows burst in first
  let prevY = 0;
  let totalGhosts = 0;
  const vw = window.innerWidth;

  units.forEach((u, k) => {
    const start = clock;
    clock += u.dur * 0.8; // phases overlap a little - chaos and pace

    // Ghosts: real descendant elements living inside this slice.
    const sliceBottom = u.top + u.height;
    const cand = Array.from(
      u.el.querySelectorAll<HTMLElement>('h1,h2,h3,h4,p,a,button,img,video,li,article,figure,canvas')
    ).filter((c) => {
      const cr = c.getBoundingClientRect();
      const cy = cr.top + window.scrollY - rootTop + cr.height / 2;
      return cr.width >= 34 && cr.height >= 12 && c.offsetParent !== null && cy >= u.top && cy < sliceBottom;
    });
    const inner = cand.filter((c) => !cand.some((o) => o !== c && c.contains(o)));
    inner.sort((a, b) => {
      const ab = a.getBoundingClientRect(); const bb = b.getBoundingClientRect();
      return bb.width * bb.height - ab.width * ab.height;
    });
    const picked = inner.slice(0, 14)
      .map((c, ci) => ({ c, r: pr(ci + k * 31, c.tagName.length + c.className.length) }))
      .sort((a, b) => a.r - b.r)
      .map((o) => o.c);

    const ghosts: Ghost[] = picked.map((c, gi) => {
      const cr = c.getBoundingClientRect();
      const spread = (u.dur * 0.42) / Math.max(1, picked.length - 1);
      return {
        x: cr.left,
        y: cr.top + window.scrollY - rootTop,
        w: cr.width, h: cr.height,
        stamp: start + u.dur * 0.10 + gi * spread + pr(gi, k * 7 + 1) * 90,
      };
    });
    totalGhosts += ghosts.length;

    const scrollTo = k <= 1 ? 0 : clamp(u.top - vh * 0.12, 0, maxScroll);
    phases.push({
      label: u.label, top: u.top, height: u.height, left: 0, width: vw,
      start, dur: u.dur,
      scrollFrom: prevY, scrollTo,
      wipeStart: start + u.dur * 0.52, wipeDur: u.dur * 0.44,
      ghosts,
    });
    prevY = scrollTo;
  });

  const holdStart = Math.max(...phases.map((ph) => ph.start + ph.dur)) + 250;
  const backStart = holdStart + 450;
  const backDur = 900;
  const total = backStart + backDur + 150;
  return { phases, totalGhosts, holdStart, backStart, backDur, total, maxScroll };
}

// Deterministic scroll position at time t.
function scrollAt(plan: Plan, t: number): number {
  if (t >= plan.backStart) {
    const u = clamp01((t - plan.backStart) / plan.backDur);
    const last = plan.phases.length ? plan.phases[plan.phases.length - 1].scrollTo : 0;
    return last + (0 - last) * easeInOut(u);
  }
  for (const ph of plan.phases) {
    if (t < ph.start + ph.dur) {
      const u = clamp01((t - ph.start) / (ph.dur * 0.55));
      return ph.scrollFrom + (ph.scrollTo - ph.scrollFrom) * easeInOut(u);
    }
  }
  return plan.phases.length ? plan.phases[plan.phases.length - 1].scrollTo : 0;
}

interface Key { t: number; x: number; y: number }

// Viewport-space flight path per arrow, derived from the plan.
function flightPath(i: number, plan: Plan): Key[] {
  const keys: Key[] = [];
  const push = (t: number, x: number, y: number) => {
    const last = keys.length ? keys[keys.length - 1] : null;
    keys.push({ t: last ? Math.max(t, last.t + 6) : t, x, y });
  };
  const vw = window.innerWidth; const vh = window.innerHeight;
  const side = i % 4;
  const sx = side === 0 ? -40 : side === 1 ? vw + 40 : pr(i, 1) * vw;
  const sy = side === 2 ? -40 : side === 3 ? vh + 40 : pr(i, 2) * vh;
  push(0, sx, sy);
  push(500, vw * (0.3 + pr(i, 3) * 0.4), vh * (0.3 + pr(i, 4) * 0.4));

  const crewSize = 4;
  plan.phases.forEach((ph, k) => {
    const crew0 = (k * crewSize) % ARROWS;
    const inCrew = ((i - crew0 + ARROWS) % ARROWS) < crewSize;
    if (inCrew) {
      const lane = (i - crew0 + ARROWS) % ARROWS; // 0..3
      ph.ghosts.forEach((g, gi) => {
        if (gi % crewSize !== lane) return;
        const vy = g.y - scrollAt(plan, g.stamp);
        push(g.stamp - 90, g.x + g.w / 2 - 26, clamp(vy - 18, 20, vh - 20));
        push(g.stamp, g.x + g.w / 2, clamp(vy + g.h / 2, 20, vh - 20));
        push(g.stamp + 60, g.x + g.w / 2 + 10, clamp(vy + g.h / 2 + 6, 20, vh - 20));
      });
      // Ride the wipe edge in staggered lanes, kept on screen.
      for (let m = 0; m <= 5; m++) {
        const tm = ph.wipeStart + (ph.wipeDur * m) / 5;
        const edgeX = ph.left + (m / 5) * ph.width;
        const vyTop = ph.top - scrollAt(plan, tm);
        push(tm, edgeX - 8 + lane * 5, clamp(vyTop + ph.height * (0.18 + lane * 0.2), 26, vh - 26));
      }
    } else {
      // Chaos detail: the rest of the swarm roams, scouts ahead, mills around.
      const base = ph.start + pr(i, 20 + k) * 120;
      for (let m = 0; m < 3; m++) {
        const tm = base + m * (ph.dur / 3);
        const near = pr(i, 30 + k * 3 + m) < 0.45;
        const vyTop = ph.top - scrollAt(plan, tm);
        push(
          tm,
          near ? ph.left + pr(i, 40 + m + k) * ph.width : pr(i, 41 + m + k * 5) * vw,
          near ? clamp(vyTop + pr(i, 50 + m) * ph.height, 20, vh - 20) : vh * (0.15 + pr(i, 51 + m + k) * 0.7)
        );
      }
    }
  });
  push(plan.holdStart + 200, vw * (0.35 + pr(i, 60) * 0.3), vh * (0.4 + pr(i, 61) * 0.2));
  push(plan.backStart + plan.backDur * 0.7, vw * (0.2 + pr(i, 62) * 0.6), -60);
  push(plan.total, vw * (0.2 + pr(i, 62) * 0.6), -80);
  return keys;
}

function posAt(keys: Key[], t: number): { x: number; y: number } {
  if (t <= keys[0].t) return { x: keys[0].x, y: keys[0].y };
  for (let k = 0; k < keys.length - 1; k++) {
    const a = keys[k]; const b = keys[k + 1];
    if (t <= b.t) {
      const u = smooth(clamp01((t - a.t) / Math.max(1, b.t - a.t)));
      return { x: a.x + (b.x - a.x) * u, y: a.y + (b.y - a.y) * u };
    }
  }
  const last = keys[keys.length - 1];
  return { x: last.x, y: last.y };
}

interface Props { onDone: () => void; freeze: number | null }

export const BuildIntro: React.FC<Props> = ({ onDone, freeze }) => {
  const [plan, setPlan] = React.useState<Plan | null>(null);
  const [elapsed, setElapsed] = React.useState(0);
  const [leaving, setLeaving] = React.useState(false);
  const pathsRef = React.useRef<Key[][]>([]);
  const doneRef = React.useRef(onDone);
  doneRef.current = onDone;

  const frozen = freeze !== null;
  const t = frozen ? freeze : elapsed;

  // Mount: block user scrolling immediately, measure once layout settles.
  React.useEffect(() => {
    let alive = true;
    const block = (e: Event) => e.preventDefault();
    const skip = () => { setLeaving(true); setTimeout(() => doneRef.current(), 300); };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { skip(); return; }
      if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', ' ', 'Home', 'End'].includes(e.key)) e.preventDefault();
    };
    window.addEventListener('click', skip);
    window.addEventListener('keydown', onKey);
    window.addEventListener('wheel', block, { passive: false });
    window.addEventListener('touchmove', block, { passive: false });
    window.scrollTo(0, 0);

    const go = () => { if (alive) setPlan(measure()); };
    const prepare = async () => {
      try {
        const imgs = Array.from(document.querySelectorAll<HTMLImageElement>('.origin-root img'));
        imgs.forEach((im) => { im.loading = 'eager'; });
        await Promise.race([
          Promise.allSettled(imgs.map((im) => (im.complete ? Promise.resolve() : new Promise((r) => { im.onload = () => r(null); im.onerror = () => r(null); })))),
          new Promise((r) => setTimeout(r, 3500)),
        ]);
        if (document.fonts && document.fonts.ready) await Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 400))]);
      } catch { /* measure anyway */ }
      // Stability check: measure twice; if the page is still growing, wait and retry once.
      const h1 = document.documentElement.scrollHeight;
      await new Promise((r) => setTimeout(r, 350));
      if (Math.abs(document.documentElement.scrollHeight - h1) > 60) {
        await new Promise((r) => setTimeout(r, 600));
      }
      go();
    };
    if (document.readyState === 'complete') {
      setTimeout(prepare, 60);
    } else {
      const onLoad = () => setTimeout(prepare, 80);
      window.addEventListener('load', onLoad);
      const fallback = setTimeout(prepare, 1600);
      // Fail-safe: never trap the page behind the overlay.
      const bail = setTimeout(() => { if (alive) { setLeaving(true); setTimeout(() => doneRef.current(), 300); } }, 12000);
      return () => {
        alive = false;
        window.removeEventListener('load', onLoad);
        clearTimeout(fallback);
        clearTimeout(bail);
        window.removeEventListener('click', skip);
        window.removeEventListener('keydown', onKey);
        window.removeEventListener('wheel', block);
        window.removeEventListener('touchmove', block);
      };
    }
    const bail2 = setTimeout(() => { if (alive) { setLeaving(true); setTimeout(() => doneRef.current(), 300); } }, 12000);
    return () => {
      alive = false;
      clearTimeout(bail2);
      window.removeEventListener('click', skip);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('wheel', block);
      window.removeEventListener('touchmove', block);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (plan) pathsRef.current = Array.from({ length: ARROWS }, (_, i) => flightPath(i, plan));
  }, [plan]);

  // Drive the clock + the autoscroll once the plan exists.
  React.useEffect(() => {
    if (!plan) return;
    if (frozen) {
      window.scrollTo(0, scrollAt(plan, freeze));
      return;
    }
    const started = performance.now();
    let raf = 0;
    const tick = () => {
      const now = performance.now() - started;
      window.scrollTo(0, scrollAt(plan, now));
      setElapsed(now);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    // Fallback driver: rAF can stall under screencast capture or heavy
    // throttling; the interval keeps the clock honest (tick is idempotent).
    const iv = setInterval(tick, 50);
    const fadeT = setTimeout(() => setLeaving(true), plan.total - 150);
    const doneT = setTimeout(() => doneRef.current(), plan.total + 250);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(iv);
      clearTimeout(fadeT);
      clearTimeout(doneT);
      window.scrollTo(0, 0);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plan]);

  const stamped = plan ? plan.phases.reduce((n, ph) => n + ph.ghosts.filter((g) => t >= g.stamp).length, 0) : 0;

  const termLines = plan
    ? plan.phases
        .map((ph) => ({ at: ph.start + 60, text: '$ ' + ph.label }))
        .concat([{ at: plan.holdStart + 60, text: '$ ship prajvalarora.com' }])
        .filter((l) => t >= l.at)
        .slice(-4)
    : [];

  return (
    <>
      {/* Document-space blueprint covers over each real section slice. */}
      <div className="pointer-events-none absolute inset-0 z-[90]" aria-hidden="true">
        {plan && plan.phases.map((ph, k) => {
          const p = clamp01((t - ph.wipeStart) / ph.wipeDur);
          return (
            <div
              key={k}
              className="absolute overflow-hidden"
              style={{
                left: ph.left, top: ph.top - 1, width: ph.width, height: ph.height + 2,
                background: '#1c1814',
                backgroundImage:
                  'repeating-linear-gradient(0deg, rgba(212,184,122,0.05) 0 1px, transparent 1px 34px), repeating-linear-gradient(90deg, rgba(212,184,122,0.05) 0 1px, transparent 1px 34px)',
                clipPath: `inset(0 0 0 ${(p * 100).toFixed(2)}%)`,
                visibility: p >= 1 ? 'hidden' : 'visible',
              }}
            >
              {ph.ghosts.map((g, gi) => {
                const s = clamp01((t - g.stamp) / 150);
                if (s <= 0) return null;
                return (
                  <div
                    key={gi}
                    className="absolute rounded-md border border-[#d4b87a] bg-[#c4a35a]/10"
                    style={{
                      left: g.x - ph.left, top: g.y - ph.top, width: g.w, height: g.h,
                      opacity: s, transform: `scale(${0.55 + 0.45 * s})`,
                      transformOrigin: 'center',
                    }}
                  />
                );
              })}
            </div>
          );
        })}
        {!plan && <div className="fixed inset-0" style={{ background: '#1c1814' }} />}
      </div>

      {/* Viewport-space UI: status, terminal, counter, swarm. */}
      <div
        role="presentation"
        aria-hidden="true"
        className={`fixed inset-0 z-[100] transition-opacity duration-300 ${leaving && !frozen ? 'opacity-0' : 'opacity-100'}`}
      >
        <div className="absolute left-4 top-3 font-mono text-[11px] md:text-xs text-[#9a8a76]">
          <span className="text-[#d4b87a]">$</span> build . --fast
          <span className="inline-block w-2 animate-pulse">_</span>
        </div>
        <div className="absolute right-4 top-3 font-mono text-[11px] md:text-xs text-[#9a8a76]">
          {stamped}{plan ? ` / ${plan.totalGhosts}` : ''} placed
        </div>

        <div
          className="absolute bottom-10 left-4 max-w-[70vw] rounded-md px-3 py-2 font-mono text-[10px] leading-relaxed shadow-lg md:bottom-12 md:text-[11px]"
          style={{ background: '#141009', color: '#ffb454', border: '1px solid #3d2c14' }}
        >
          {(termLines.length ? termLines : [{ at: 0, text: '$ boot 15 agents' }]).map((l, li) => {
            const chars = Math.max(0, Math.min(l.text.length, Math.floor((t - l.at) / 14)));
            return (
              <div key={li} className="whitespace-nowrap" style={{ color: li % 2 === 0 ? '#ffd9a0' : '#9a8a76' }}>
                {l.text.slice(0, chars)}
              </div>
            );
          })}
        </div>

        {plan && pathsRef.current.length === ARROWS && Array.from({ length: ARROWS }, (_, i) => {
          const pos = posAt(pathsRef.current[i], t);
          const jx = 2.5 * Math.sin(t * 0.021 + i * 2.1);
          const jy = 2.5 * Math.cos(t * 0.017 + i * 1.3);
          return (
            <div key={i} className="absolute" style={{ left: 0, top: 0, transform: `translate(${(pos.x + jx).toFixed(1)}px, ${(pos.y + jy).toFixed(1)}px)` }}>
              <svg width="20" height="20" viewBox="0 0 24 24" className="md:w-6 md:h-6 drop-shadow-sm">
                <path d="M4 2 L20 11.5 L12.6 13.4 L9.4 21.5 Z"
                  fill={COLORS[i]} stroke={COLORS[i] === '#d4b87a' ? '#1c1814' : '#f6f0e2'} strokeWidth="1" />
              </svg>
              <span
                className="absolute left-5 top-4 rounded-sm px-1 font-mono text-[8px] leading-3 hidden sm:inline-block"
                style={{ background: COLORS[i], color: ['#1c1814', '#54483a', '#7a3f10', '#2a2118', '#6d5f4b'].includes(COLORS[i]) ? '#f6f0e2' : '#1c1814' }}
              >
                {TAGS[i]}
              </span>
            </div>
          );
        })}

        <div className="absolute bottom-3 right-4 font-mono text-[10px] text-[#9a8a76] opacity-70">
          click to skip
        </div>
      </div>
    </>
  );
};
