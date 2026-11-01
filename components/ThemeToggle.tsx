import React, { useEffect, useRef, useState } from 'react';
import { Coffee } from 'lucide-react';

const THEME_KEY = 'site-theme';
const COFFEE = '#2a170a'; // the spill: dark roast, close to the dark theme body
const CREASE = '#4a2c14';

/*
 * Coffee theme toggle. Clicking the cup tumbles a mug and spills coffee
 * across the whole page, settling into the coffee-dark theme. Clicking again
 * drains the coffee off the bottom of the screen, back to cream. The theme
 * flip happens while the page is fully covered, so the swap is invisible.
 * Reduced motion: instant toggle, no animation.
 */

type Phase = 'idle' | 'tumble' | 'pour' | 'covered' | 'fade' | 'preDrain' | 'drain' | 'drainFade';

export const ThemeToggle: React.FC = () => {
  const [light, setLight] = useState<boolean>(() =>
    typeof document !== 'undefined' && document.documentElement.classList.contains('light')
  );
  const [phase, setPhase] = useState<Phase>('idle');
  const timers = useRef<number[]>([]);

  useEffect(() => {
    document.documentElement.classList.toggle('light', light);
    try {
      localStorage.setItem(THEME_KEY, light ? 'light' : 'dark');
    } catch {
      /* private mode: theme stays session-only */
    }
  }, [light]);

  useEffect(() => () => { timers.current.forEach(clearTimeout); }, []);

  const later = (fn: () => void, ms: number) => { timers.current.push(window.setTimeout(fn, ms)); };

  const spillToDark = () => {
    setPhase('tumble');
    later(() => setPhase('pour'), 520);       // mug tipped, coffee pours
    later(() => {
      setLight(false);                         // flip while fully covered
      setPhase('covered');
    }, 1350);
    later(() => setPhase('fade'), 1550);       // coffee blends into the dark page
    later(() => setPhase('idle'), 1950);
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
  const forward = phase === 'tumble' || phase === 'pour' || phase === 'covered' || phase === 'fade';
  const mugTipped = phase === 'pour' || phase === 'covered' || phase === 'fade' || phase === 'preDrain';
  const fading = phase === 'fade' || phase === 'drainFade';

  return (
    <>
      <button
        type="button"
        onClick={onClick}
        aria-label={light ? 'Switch to dark mode' : 'Switch to light mode'}
        aria-pressed={!light}
        title={light ? 'Spill the coffee (dark mode)' : 'Mop it up (light mode)'}
        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[#5a4a32] text-[#b8a894] transition-colors hover:border-[#d4b87a] hover:text-[#d4b87a]"
      >
        <Coffee size={16} />
      </button>

      {animating && (
        <div
          className="pointer-events-none fixed inset-0 z-[110]"
          aria-hidden="true"
          style={{ opacity: fading ? 0 : 1, transition: 'opacity 380ms ease' }}
        >
          {/* forward: coffee blooms from the pour point until it covers everything */}
          {forward && (
            <div
              style={{
                position: 'absolute',
                left: '50%', top: '16vh',
                width: '260vmax', height: '260vmax',
                marginLeft: '-130vmax', marginTop: '-130vmax',
                borderRadius: '46% 54% 52% 48% / 51% 47% 53% 49%',
                background: `radial-gradient(circle at 50% 40%, ${CREASE} 0%, ${COFFEE} 42%)`,
                transform: phase === 'tumble' ? 'scale(0)' : 'scale(1)',
                transition: 'transform 780ms cubic-bezier(.55,.06,.35,1)',
              }}
            />
          )}
          {/* forward: satellite splatters that fling out ahead of the main spill */}
          {forward && [
            [-9, 3, 7], [8, 6, 5], [-4, 26, 6], [11, 24, 8], [2, 34, 5],
          ].map(([dx, dy, sz], i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: `calc(50% + ${dx}vw)`, top: `calc(16vh + ${dy}vh)`,
                width: `${sz}vmax`, height: `${sz}vmax`,
                marginLeft: `${-sz / 2}vmax`, marginTop: `${-sz / 2}vmax`,
                borderRadius: '48% 52% 55% 45% / 52% 46% 54% 48%',
                background: COFFEE,
                transform: phase === 'tumble' ? 'scale(0)' : 'scale(1)',
                transition: `transform ${520 + i * 70}ms cubic-bezier(.2,.8,.3,1.15) ${80 + i * 55}ms`,
              }}
            />
          ))}
          {/* reverse: a full coffee sheet that drains off the bottom, revealing cream */}
          {(phase === 'preDrain' || phase === 'drain' || phase === 'drainFade') && (
            <div
              style={{
                position: 'absolute', inset: 0,
                background: `linear-gradient(180deg, ${CREASE} 0%, ${COFFEE} 18%)`,
                clipPath: phase === 'preDrain' ? 'inset(0 0 0 0)' : 'inset(100.5% 0 0 0)',
                transition: 'clip-path 950ms cubic-bezier(.6,.05,.7,.2)',
              }}
            />
          )}
          {/* the tumbling mug */}
          <div
            style={{
              position: 'absolute', left: '50%', top: '10vh',
              transform: `translate(-50%, 0) rotate(${mugTipped ? -115 : 0}deg) translateY(${phase === 'tumble' ? '0' : mugTipped ? '1.5vh' : '0'})`,
              transformOrigin: '50% 90%',
              transition: 'transform 480ms cubic-bezier(.34,1.4,.64,1)',
              opacity: phase === 'fade' || phase === 'drainFade' ? 0 : 1,
            }}
          >
            <svg width="72" height="72" viewBox="0 0 64 64">
              <g>
                <rect x="10" y="18" width="34" height="34" rx="5" fill="#f6f0e2" stroke="#1c1814" strokeWidth="2.5" />
                <path d="M44 24 h6 a7 7 0 0 1 0 16 h-6" fill="none" stroke="#1c1814" strokeWidth="2.5" />
                <rect x="10" y="18" width="34" height="10" rx="5" fill={COFFEE} />
                <path d="M20 6 q3 4 0 8 M28 4 q3 4 0 8 M36 6 q3 4 0 8" fill="none" stroke="#b8a894" strokeWidth="2" strokeLinecap="round" />
              </g>
            </svg>
            {/* the pour stream while tipped */}
            {mugTipped && phase !== 'fade' && phase !== 'drainFade' && (
              <div
                style={{
                  position: 'absolute', left: -6, top: '55%',
                  width: 6, height: '14vh',
                  background: `linear-gradient(180deg, ${CREASE}, ${COFFEE})`,
                  borderRadius: 3,
                  transform: 'rotate(8deg)',
                }}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};
