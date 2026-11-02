import React, { useEffect, useRef, useState } from 'react';
import { Coffee } from 'lucide-react';

const THEME_KEY = 'site-theme';
const COFFEE = '#2a170a'; // the spill: dark roast, close to the dark theme body
const CREASE = '#4a2c14';
const COLUMNS = 14;

/*
 * Coffee theme toggle. The page background is the vessel and the page's
 * rectangles (cards, images, rounded boxes) are blocks the coffee will not
 * enter: clicking the header cup topples it and coffee pours down the page,
 * flowing AROUND the blocks (they stay visible as islands while the sheet
 * fills the background between them). Once the pour bottoms out, the sheet
 * closes over the blocks, the theme flips to dark underneath, and the whole
 * sheet drains off the bottom revealing the dark page. Clicking again
 * drains a coffee sheet off the bottom, back to cream.
 *
 * Design alternative kept on a switch: FLOW_MODE 'glass' renders the blocks
 * as translucent panes instead of islands - the coffee is seen moving behind
 * the glass of each card rather than only around it.
 *
 * Reduced motion: instant toggle, no animation.
 */

type FlowMode = 'around' | 'glass';
const FLOW_MODE: FlowMode = 'around';

type Phase = 'idle' | 'topple' | 'pour' | 'close' | 'drainOff' | 'preDrain' | 'drain' | 'drainFade';

type Hole = { x: number; y: number; w: number; h: number; r: number };

// Deterministic per-column variance so the liquid front fingers unevenly.
const colRand = (i: number, salt: number) => {
  const x = Math.sin(i * 91.7 + salt * 53.3) * 24634.6345;
  return x - Math.floor(x);
};

// Measure the page's visible blocks (cards, images, rounded boxes) in
// viewport coordinates so the mask can keep the coffee out of them.
const measureBlocks = (): Hole[] => {
  const vw = window.innerWidth, vh = window.innerHeight;
  const seen = new Set<Element>();
  const rects: Hole[] = [];
  const candidates = document.querySelectorAll(
    'main article, main img, main [class*="rounded"], section [class*="rounded"], section article, section img'
  );
  candidates.forEach((el) => {
    if (seen.has(el)) return;
    seen.add(el);
    const r = el.getBoundingClientRect();
    if (r.width < 28 || r.height < 28 || r.width * r.height < 4200) return;
    if (r.bottom < 0 || r.top > vh || r.right < 0 || r.left > vw) return;
    const cs = window.getComputedStyle(el);
    const br = parseFloat(cs.borderTopLeftRadius) || 0;
    const x = Math.max(0, r.left), y = Math.max(0, r.top);
    const w = Math.min(vw, r.right) - x, h = Math.min(vh, r.bottom) - y;
    if (w < 28 || h < 28) return;
    rects.push({ x, y, w, h, r: Math.min(br, 28) });
  });
  // Drop rects fully contained in a larger one (nested cards) to keep the mask light.
  const kept = rects.filter(
    (a) => !rects.some((b) => b !== a && b.x <= a.x && b.y <= a.y && b.x + b.w >= a.x + a.w && b.y + b.h >= a.y + a.h && b.w * b.h > a.w * a.h)
  );
  return kept.slice(0, 40);
};

const buildMask = (holes: Hole[], vw: number, vh: number): string => {
  const fill = FLOW_MODE === 'around' ? 'black' : 'rgb(84,84,84)';
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${vw}" height="${vh}">` +
    `<rect width="${vw}" height="${vh}" fill="white"/>` +
    holes.map((h) => `<rect x="${h.x.toFixed(1)}" y="${h.y.toFixed(1)}" width="${h.w.toFixed(1)}" height="${h.h.toFixed(1)}" rx="${h.r}" fill="${fill}"/>`).join('') +
    `</svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
};

export const ThemeToggle: React.FC = () => {
  const [light, setLight] = useState<boolean>(() =>
    typeof document !== 'undefined' && document.documentElement.classList.contains('light')
  );
  const [phase, setPhase] = useState<Phase>('idle');
  const [pourX, setPourX] = useState(0); // button center, where the stream leaves the cup
  const [mask, setMask] = useState<string | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const timers = useRef<number[]>([]);
  const scrollLocked = useRef(false);

  useEffect(() => {
    document.documentElement.classList.toggle('light', light);
    try {
      localStorage.setItem(THEME_KEY, light ? 'light' : 'dark');
    } catch {
      /* private mode: theme stays session-only */
    }
  }, [light]);

  const unlockScroll = () => {
    if (scrollLocked.current) {
      document.documentElement.style.overflow = '';
      scrollLocked.current = false;
    }
  };

  useEffect(() => () => { timers.current.forEach(clearTimeout); unlockScroll(); }, []);

  const later = (fn: () => void, ms: number) => { timers.current.push(window.setTimeout(fn, ms)); };

  const spillToDark = () => {
    const r = btnRef.current?.getBoundingClientRect();
    setPourX(r ? r.left + r.width / 2 : window.innerWidth - 44);
    // Blocks are measured in viewport coordinates; hold the page still while
    // the sheet is masked so the holes stay aligned with the cards.
    document.documentElement.style.overflow = 'hidden';
    scrollLocked.current = true;
    setMask(buildMask(measureBlocks(), window.innerWidth, window.innerHeight));
    setPhase('topple');
    later(() => setPhase('pour'), 430);        // cup tipped, stream + rivulets fall around the blocks
    later(() => setPhase('close'), 2150);      // pour bottomed out: sheet closes over the blocks
    later(() => setLight(false), 2500);        // flip while fully covered
    later(() => setPhase('drainOff'), 2780);   // the whole sheet slides off the bottom
    later(() => { setPhase('idle'); setMask(null); unlockScroll(); }, 3640);
  };

  const drainToLight = () => {
    setPhase('preDrain');                      // coffee sheet matches the dark page
    later(() => {
      setLight(true);                          // flip underneath the coffee
      setPhase('drain');                       // coffee drains off the bottom
    }, 140);
    later(() => setPhase('drainFade'), 1150);
    later(() => setPhase('idle'), 1550);
  };

  const onClick = () => {
    if (phase !== 'idle') return;
    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) { setLight((v) => !v); return; }
    if (light) spillToDark(); else drainToLight();
  };

  const animating = phase !== 'idle';
  const forward = phase === 'topple' || phase === 'pour' || phase === 'close' || phase === 'drainOff';
  const reverse = phase === 'preDrain' || phase === 'drain' || phase === 'drainFade';
  const tipped = phase === 'pour' || phase === 'close' || phase === 'drainOff';

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        onClick={onClick}
        aria-label={light ? 'Switch to dark mode' : 'Switch to light mode'}
        aria-pressed={!light}
        title={light ? 'Spill the coffee (dark mode)' : 'Mop it up (light mode)'}
        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[#5a4a32] text-[#b8a894] transition-colors hover:border-[#d4b87a] hover:text-[#d4b87a]"
      >
        <span
          style={{
            display: 'inline-flex',
            transform: `rotate(${tipped ? -104 : 0}deg)`,
            transformOrigin: '62% 80%',
            transition: 'transform 460ms cubic-bezier(.34,1.5,.64,1)',
          }}
        >
          <Coffee size={16} />
        </span>
      </button>

      {animating && (
        <div className="pointer-events-none fixed inset-0 z-[110]" aria-hidden="true">
          {forward && (
            <div
              style={{
                position: 'absolute', inset: 0,
                transform: phase === 'drainOff' ? 'translateY(116vh)' : 'translateY(0)',
                transition: phase === 'drainOff' ? 'transform 820ms cubic-bezier(.55,.08,.72,.3)' : 'none',
              }}
            >
              {/* masked layer: stream + rivulets stay out of the blocks (or show through them in glass mode) */}
              <div
                style={{
                  position: 'absolute', inset: 0,
                  WebkitMaskImage: mask ?? undefined,
                  maskImage: mask ?? undefined,
                  WebkitMaskSize: '100% 100%',
                  maskSize: '100% 100%',
                  WebkitMaskRepeat: 'no-repeat',
                  maskRepeat: 'no-repeat',
                }}
              >
                {/* the stream leaving the tipped cup */}
                <div
                  style={{
                    position: 'absolute',
                    left: pourX - 4, top: 44,
                    width: 8,
                    height: phase === 'topple' ? 0 : 90,
                    background: `linear-gradient(180deg, ${CREASE}, ${COFFEE})`,
                    borderRadius: 4,
                    transition: 'height 240ms ease-in',
                  }}
                />
                {/* viscous rivulets descending from the top at uneven speeds */}
                {Array.from({ length: COLUMNS }, (_, i) => {
                  const dur = 950 + colRand(i, 1) * 750;          // honey: slow, uneven
                  const delay = 60 + colRand(i, 2) * 300;
                  const w = 100 / COLUMNS;
                  const shade = colRand(i, 3);
                  return (
                    <div
                      key={i}
                      style={{
                        position: 'absolute',
                        left: `${i * w - 0.35}%`,
                        top: -40,
                        width: `calc(${w}% + 2px)`,
                        height: 'calc(100vh + 46px)',
                        background: `linear-gradient(180deg, ${shade > 0.5 ? CREASE : COFFEE} 0%, ${COFFEE} 34%)`,
                        borderRadius: '0 0 50% 50% / 0 0 34px 34px',
                        transform: phase === 'topple' ? 'translateY(calc(-100vh - 90px))' : 'translateY(0)',
                        transition: `transform ${dur}ms cubic-bezier(.58,.06,.84,.46) ${delay}ms`,
                      }}
                    />
                  );
                })}
              </div>

              {/* close: once the pour bottoms out the sheet seals over the blocks before the flip */}
              <div
                style={{
                  position: 'absolute', inset: 0,
                  background: COFFEE,
                  opacity: phase === 'close' || phase === 'drainOff' ? 1 : 0,
                  transition: 'opacity 320ms ease-in',
                }}
              />
            </div>
          )}

          {/* reverse: a full coffee sheet that drains off the bottom, revealing cream */}
          {reverse && (
            <div
              style={{
                position: 'absolute', inset: 0,
                background: `linear-gradient(180deg, ${CREASE} 0%, ${COFFEE} 18%)`,
                clipPath: phase === 'preDrain' ? 'inset(0 0 0 0)' : 'inset(100.5% 0 0 0)',
                transition: 'clip-path 950ms cubic-bezier(.6,.05,.7,.2)',
                opacity: phase === 'drainFade' ? 0 : 1,
              }}
            />
          )}
        </div>
      )}
    </>
  );
};
