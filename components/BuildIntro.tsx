import React from 'react';

/*
 * BuildIntro - the "cursors hand-build the site" loading intro.
 *
 * Plays once per full page load on the home page. Starts from a black page.
 * A swarm of cursor arrows flies in; working cursors SKETCH each element
 * (wireframe outlines grow under the cursor tip), nudge it into place and
 * resize it, while idle cursors wander. Section covers then wipe off to
 * reveal the real content in flat unpainted cream, and color is painted
 * last, section by section. Two to three terminals stream the build log the
 * whole time (sections, boxes, images, mounts, paint passes). The page
 * autoscrolls to follow the build to the footer, whips back to the top and
 * hands over the real (light) page. Skippable by click/tap/Escape, disabled
 * for prefers-reduced-motion.
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

type GhostKind = 'img' | 'box' | 'text';
interface Ghost { x: number; y: number; w: number; h: number; stamp: number; addAt: number; kind: GhostKind; nx: number; ny: number; tag: string }
interface Phase {
  label: string;
  top: number; height: number; left: number; width: number; // document coords
  start: number; dur: number;
  scrollFrom: number; scrollTo: number;
  baseFadeAt: number; baseFadeDur: number;
  colorStart: number; colorDur: number;
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

const kindOf = (el: HTMLElement): GhostKind => {
  const t = el.tagName.toLowerCase();
  if (t === 'img' || t === 'video' || t === 'canvas' || t === 'figure') return 'img';
  if (t === 'h1' || t === 'h2' || t === 'h3' || t === 'h4' || t === 'p' || t === 'a' || t === 'li') return 'text';
  return 'box';
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
        units.push({ top: top + i * sliceH, height: sliceH, label: i === 0 ? label : label + ' (cont.)', dur: 620, el });
      }
    } else {
      units.push({ top, height: h, label, dur, el });
    }
  };

  addSliced(header, 'scaffold header · nav links', 1300);
  Array.from(main.children).forEach((child, ci) => {
    const el = child as HTMLElement;
    if (el.offsetHeight < 40) return;
    const id = el.id || el.querySelector('[id]')?.id || '';
    const fallback = ci === 0 ? 'place hero - portrait + display type' : 'frame section ' + (ci + 1);
    addSliced(el, LABELS[id] || fallback, ci === 0 ? 1700 : ci === 1 ? 950 : Math.max(700, 1050 - ci * 40));
  });
  if (footer) addSliced(footer, 'ground the footer', 650);

  const phases: Phase[] = [];
  let clock = 900; // arrows burst in first
  let prevY = 0;
  let totalGhosts = 0;
  const vw = window.innerWidth;

  units.forEach((u, k) => {
    const start = clock;
    clock += u.dur * 0.82; // phases overlap a little - chaos and pace

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
      .map((c, ci) => ({ c, ci, r: pr(ci + k * 31, c.tagName.length + c.className.length) }))
      .sort((a, b) => a.r - b.r)
      .map((o) => o);

    const ghosts: Ghost[] = picked.map((o, gi) => {
      const c = o.c;
      const cr = c.getBoundingClientRect();
      const spread = (u.dur * 0.34) / Math.max(1, picked.length - 1);
      const stamp = start + u.dur * 0.06 + gi * spread + pr(gi, k * 7 + 1) * 70;
      return {
        x: cr.left,
        y: cr.top + window.scrollY - rootTop,
        w: cr.width, h: cr.height,
        stamp,
        addAt: stamp + 520, // sketch + settle, then this element's cover unwraps
        kind: kindOf(c),
        nx: (pr(gi, k * 13 + 2) - 0.5) * 22,
        ny: (pr(gi, k * 17 + 5) - 0.5) * 14,
        tag: c.tagName.toLowerCase(),
      };
    });
    totalGhosts += ghosts.length;

    const scrollTo = k <= 1 ? 0 : clamp(u.top - vh * 0.12, 0, maxScroll);
    phases.push({
      label: u.label, top: u.top, height: u.height, left: 0, width: vw,
      start, dur: u.dur,
      scrollFrom: prevY, scrollTo,
      baseFadeAt: start + u.dur * 0.44,
      baseFadeDur: 380,
      colorStart: start + u.dur * 0.66,
      colorDur: u.dur * 0.26 + 160,
      ghosts,
    });
    prevY = scrollTo;
  });

  const holdStart = Math.max(...phases.map((ph) => ph.colorStart + ph.colorDur)) + 300;
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
        const vy = (docY: number) => clamp(docY - scrollAt(plan, g.stamp), 20, vh - 20);
        // Sketch: ride the growing wireframe corner (top edge, then down the right).
        push(g.stamp - 90, g.x - 24, vy(g.y - 16));
        push(g.stamp + 30, g.x, vy(g.y));
        push(g.stamp + 130, g.x + g.w * 0.7, vy(g.y + 2));
        push(g.stamp + 220, g.x + g.w, vy(g.y + g.h * 0.65));
        // Nudge into place, then settle at the center.
        push(g.stamp + 330, g.x + g.w + g.nx, vy(g.y + g.h + g.ny));
        push(g.stamp + 460, g.x + g.w / 2, vy(g.y + g.h / 2));
      });
      // Hover over the lane's elements as each cover unwraps.
      ph.ghosts.forEach((g, gi) => {
        if (gi % crewSize !== lane) return;
        const vyU = clamp(g.y + g.h / 2 - scrollAt(plan, g.addAt), 26, vh - 26);
        push(g.addAt + 120, g.x + g.w / 2 + 8, vyU);
      });
      // Paint pass: sweep the section during its color stage.
      for (let m = 0; m <= 2; m++) {
        const tm = ph.colorStart + (ph.colorDur * m) / 2;
        const vyTop = ph.top - scrollAt(plan, tm);
        push(tm, ph.left + ph.width * (0.2 + 0.3 * m) + lane * 14, clamp(vyTop + ph.height * (0.3 + lane * 0.15), 26, vh - 26));
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

interface TermLine { at: number; text: string }

// Three realistic build streams derived from the plan.
function termStreams(plan: Plan): [TermLine[], TermLine[], TermLine[]] {
  const t0: TermLine[] = [{ at: 60, text: '$ boot 15 agents' }, { at: 320, text: '$ mount /origin --readonly' }];
  const t1: TermLine[] = [{ at: 140, text: 'plan: ' + plan.phases.length + ' sections, ' + plan.totalGhosts + ' elements' }];
  const t2: TermLine[] = [{ at: 200, text: 'vite v5.4.8 dev server ready' }, { at: 460, text: 'tsc --noEmit ... ok' }];
  plan.phases.forEach((ph, k) => {
    t0.push({ at: ph.start + 40, text: '$ add section ' + ph.label.split(' ').slice(-1)[0] + '  # ' + ph.label });
    t0.push({ at: ph.baseFadeAt, text: '$ fill ' + ph.label.split(' ').slice(-1)[0] + '  # elements in' });
    ph.ghosts.forEach((g, gi) => {
      const name = g.kind === 'img' ? 'image' : g.kind === 'text' ? 'text' : 'box';
      t1.push({ at: g.stamp + 30, text: '+ ' + name + ' <' + g.tag + '> ' + Math.round(g.w) + 'x' + Math.round(g.h) });
      if (gi % 3 === 0) t1.push({ at: g.stamp + 330, text: '~ place (' + Math.round(g.x) + ', ' + Math.round(g.y) + ') ok' });
    });
    t2.push({ at: ph.baseFadeAt + 80, text: 'hmr update /origin/' + k + '  ' + (24 + Math.round(pr(k, 5) * 60)) + 'ms' });
    t2.push({ at: ph.colorStart + 40, text: 'paint ' + ph.label.split(' ').slice(-1)[0] + '  #f6f0e2 -> ember' });
    t2.push({ at: ph.colorStart + ph.colorDur, text: 'paint ok  ' + (38 + Math.round(pr(k, 9) * 80)) + 'ms' });
  });
  t0.push({ at: plan.holdStart + 60, text: '$ ship prajvalarora.com' });
  t1.push({ at: plan.holdStart + 20, text: 'all elements placed' });
  t2.push({ at: plan.holdStart + 90, text: 'build complete in ' + (plan.total / 1000).toFixed(1) + 's' });
  const s = (a: TermLine, b: TermLine) => a.at - b.at;
  return [t0.sort(s), t1.sort(s), t2.sort(s)];
}

interface Props { onDone: () => void; freeze: number | null }

export const BuildIntro: React.FC<Props> = ({ onDone, freeze }) => {
  const [plan, setPlan] = React.useState<Plan | null>(null);
  const [elapsed, setElapsed] = React.useState(0);
  const [leaving, setLeaving] = React.useState(false);
  const pathsRef = React.useRef<Key[][]>([]);
  const skippedRef = React.useRef(false);
  const planRef = React.useRef<Plan | null>(null);
  const doneRef = React.useRef(onDone);
  doneRef.current = onDone;

  const frozen = freeze !== null;
  const t = frozen ? freeze : elapsed;

  // Mount: block user scrolling immediately, measure once layout settles.
  React.useEffect(() => {
    let alive = true;
    const block = (e: Event) => e.preventDefault();
    const skip = () => { skippedRef.current = true; window.scrollTo(0, 0); setLeaving(true); setTimeout(() => doneRef.current(), 300); };
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
      const bail = setTimeout(() => { if (alive && !planRef.current) { setLeaving(true); setTimeout(() => doneRef.current(), 300); } }, 8000);
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
    const bail2 = setTimeout(() => { if (alive && !planRef.current) { setLeaving(true); setTimeout(() => doneRef.current(), 300); } }, 8000);
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
    if (plan) {
      planRef.current = plan;
      pathsRef.current = Array.from({ length: ARROWS }, (_, i) => flightPath(i, plan));
      if (freeze !== null) setElapsed(freeze); // frozen debug: re-render so the swarm appears
    }
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
      window.scrollTo(0, skippedRef.current ? 0 : scrollAt(plan, now));
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
  const painted = plan ? plan.phases.filter((ph) => t >= ph.colorStart + ph.colorDur).length : 0;

  // Stage label for the active phase: sketch -> place -> reveal -> paint.
  const stage = plan
    ? (() => {
        const ph = plan.phases.find((p) => t >= p.start && t < p.colorStart + p.colorDur);
        if (!ph) return t >= plan.holdStart ? 'done' : '';
        if (t < ph.start + ph.dur * 0.40) return 'sketching - ' + ph.label;
        if (t < ph.colorStart) return 'adding elements - ' + ph.label;
        return 'painting - ' + ph.label;
      })()
    : 'booting';

  const streams = React.useMemo(() => (plan ? termStreams(plan) : null), [plan]);

  const renderTerm = (lines: TermLine[], maxRows: number, accent: string) => {
    const visible = lines.filter((l) => t >= l.at).slice(-maxRows);
    const rows = visible.length ? visible : [{ at: 0, text: '' }];
    return rows.map((l, li) => {
      const chars = Math.max(0, Math.min(l.text.length, Math.floor((t - l.at) / 11)));
      return (
        <div key={li} className="whitespace-nowrap overflow-hidden" style={{ color: li === rows.length - 1 ? accent : '#9a8a76', textOverflow: 'ellipsis' }}>
          {l.text.slice(0, chars)}
        </div>
      );
    });
  };

  return (
    <>
      {/* Document-space blueprint covers over each real section slice. */}
      <div className="pointer-events-none absolute inset-0 z-[90]" aria-hidden="true">
        {plan && plan.phases.map((ph, k) => {
          const base = clamp01((t - ph.baseFadeAt) / ph.baseFadeDur);
          const paint = clamp01((t - ph.colorStart) / ph.colorDur);
          return (
            <React.Fragment key={k}>
              {/* Primer wash over the real content: color is painted last. */}
              {paint < 1 && base > 0 && (
                <div
                  className="absolute"
                  style={{
                    left: ph.left, top: ph.top - 1, width: ph.width, height: ph.height + 2,
                    background: '#efe7d6',
                    opacity: 0.9 * (1 - paint),
                  }}
                />
              )}
              {/* Base cover: the black page; fades once the elements are sketched. */}
              {base < 1 && (
                <div
                  className="absolute overflow-hidden"
                  style={{
                    left: ph.left, top: ph.top - 1, width: ph.width, height: ph.height + 2,
                    background: '#100d09',
                    backgroundImage:
                      'repeating-linear-gradient(0deg, rgba(212,184,122,0.06) 0 1px, transparent 1px 34px), repeating-linear-gradient(90deg, rgba(212,184,122,0.06) 0 1px, transparent 1px 34px)',
                    opacity: 1 - base,
                  }}
                />
              )}
              {/* Per-element covers: sketched, nudged into place, then each unwraps. */}
              {ph.ghosts.map((g, gi) => {
                const s = clamp01((t - g.stamp) / 240);
                if (s <= 0) return null;
                const open = clamp01((t - g.addAt) / 260);
                if (open >= 1) return null;
                const sx = clamp01(s * 1.6);
                const sy = clamp01(s * 1.6 - 0.6);
                const settle = clamp01((t - g.stamp - 300) / 200);
                const dx = g.nx * (1 - settle);
                const dy = g.ny * (1 - settle);
                const filled = base >= 1;
                return (
                  <div
                    key={gi}
                    className="absolute"
                    style={{
                      left: g.x - ph.left + dx, top: g.y - ph.top + dy,
                      width: Math.max(2, g.w * sx), height: Math.max(2, g.h * sy),
                      border: `1.5px dashed ${g.kind === 'img' ? '#e4570d' : g.kind === 'text' ? '#d4b87a' : '#8a5a2b'}`,
                      borderRadius: 4,
                      background: filled
                        ? (g.kind === 'img' ? 'rgba(228,87,13,0.10)' : 'rgba(30,24,16,0.85)')
                        : (g.kind === 'img' ? 'rgba(228,87,13,0.07)' : 'rgba(196,163,90,0.05)'),
                      opacity: 1 - open,
                      transform: `scale(${1 - open * 0.04})`,
                      transformOrigin: 'center',
                    }}
                  />
                );
              })}
            </React.Fragment>
          );
        })}
        {!plan && <div className="fixed inset-0" style={{ background: '#100d09' }} />}
      </div>

      {/* Viewport-space UI: status, terminals, counter, swarm. */}
      <div
        role="presentation"
        aria-hidden="true"
        className={`fixed inset-0 z-[100] transition-opacity duration-300 ${leaving && !frozen ? 'opacity-0' : 'opacity-100'}`}
      >
        <div className="absolute left-4 top-3 font-mono text-[11px] md:text-xs text-[#9a8a76]">
          <span className="text-[#d4b87a]">$</span> build . --hands-on
          <span className="inline-block w-2 animate-pulse">_</span>
        </div>
        <div className="absolute right-4 top-3 font-mono text-[11px] md:text-xs text-[#9a8a76]">
          {stamped}{plan ? ` / ${plan.totalGhosts}` : ''} placed{painted ? ` · ${painted} painted` : ''}
        </div>
        {stage && (
          <div className="absolute left-4 top-8 font-mono text-[10px] md:text-[11px] text-[#7a6c58]">
            {stage}
          </div>
        )}

        {/* Terminal 1: section assembly commands */}
        <div
          className="absolute bottom-10 left-4 w-[46vw] max-w-[340px] rounded-md shadow-lg"
          style={{ background: 'rgba(20,16,9,0.92)', border: '1px solid #3d2c14' }}
        >
          <div className="flex items-center gap-1.5 px-2.5 pt-1.5 pb-1">
            <span className="h-2 w-2 rounded-full" style={{ background: '#5c2e16' }} />
            <span className="h-2 w-2 rounded-full" style={{ background: '#6b4a1c' }} />
            <span className="h-2 w-2 rounded-full" style={{ background: '#3f5233' }} />
            <span className="ml-2 font-mono text-[9px] text-[#7a6c58]">assemble - zsh</span>
          </div>
          <div className="px-2.5 pb-2 font-mono text-[10px] leading-relaxed md:text-[11px]" style={{ color: '#ffb454' }}>
            {renderTerm(streams ? streams[0] : [], 4, '#ffd9a0')}
          </div>
        </div>

        {/* Terminal 2: element-level placement log */}
        <div
          className="absolute right-4 top-16 hidden w-[300px] rounded-md shadow-lg md:block"
          style={{ background: 'rgba(20,16,9,0.92)', border: '1px solid #3d2c14' }}
        >
          <div className="flex items-center gap-1.5 px-2.5 pt-1.5 pb-1">
            <span className="h-2 w-2 rounded-full" style={{ background: '#5c2e16' }} />
            <span className="h-2 w-2 rounded-full" style={{ background: '#6b4a1c' }} />
            <span className="h-2 w-2 rounded-full" style={{ background: '#3f5233' }} />
            <span className="ml-2 font-mono text-[9px] text-[#7a6c58]">elements - tail -f</span>
          </div>
          <div className="px-2.5 pb-2 font-mono text-[10px] leading-relaxed" style={{ color: '#c9b389' }}>
            {renderTerm(streams ? streams[1] : [], 5, '#ffd9a0')}
          </div>
        </div>

        {/* Terminal 3: build/paint pipeline */}
        <div
          className="absolute bottom-10 right-4 hidden w-[280px] rounded-md shadow-lg md:block"
          style={{ background: 'rgba(20,16,9,0.92)', border: '1px solid #3d2c14' }}
        >
          <div className="flex items-center gap-1.5 px-2.5 pt-1.5 pb-1">
            <span className="h-2 w-2 rounded-full" style={{ background: '#5c2e16' }} />
            <span className="h-2 w-2 rounded-full" style={{ background: '#6b4a1c' }} />
            <span className="h-2 w-2 rounded-full" style={{ background: '#3f5233' }} />
            <span className="ml-2 font-mono text-[9px] text-[#7a6c58]">paint - vite</span>
          </div>
          <div className="px-2.5 pb-2 font-mono text-[10px] leading-relaxed" style={{ color: '#b58547' }}>
            {renderTerm(streams ? streams[2] : [], 4, '#ffd9a0')}
          </div>
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
