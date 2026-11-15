import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight } from 'lucide-react';

/* A standalone stage for the lab videos. Deliberately different from the rest
   of the site: dark workshop mood, drifting sparks, giant outlined marquee,
   headline above a film-reel scroller - active clip centered, neighbors
   tilted on the reel, arrows / keys / swipe to move between clips. */

const SPARK_COUNT = 70;

const Sparks: React.FC = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let raf = 0;
    let w = 0, h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const sparks = Array.from({ length: SPARK_COUNT }, () => ({
      x: Math.random(), y: Math.random(),
      r: 0.6 + Math.random() * 1.8,
      vy: 0.0004 + Math.random() * 0.0012,
      vx: (Math.random() - 0.5) * 0.0004,
      tw: Math.random() * Math.PI * 2,
      hue: 30 + Math.random() * 18,
    }));
    const resize = () => {
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);
    const tick = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const s of sparks) {
        s.y -= s.vy; s.x += s.vx;
        if (s.y < -0.02) { s.y = 1.02; s.x = Math.random(); }
        if (s.x < -0.02) s.x = 1.02; if (s.x > 1.02) s.x = -0.02;
        const a = 0.25 + 0.35 * (0.5 + 0.5 * Math.sin(t / 700 + s.tw));
        ctx.beginPath();
        ctx.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${s.hue}, 72%, 62%, ${a})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 h-full w-full" />;
};

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

interface Clip {
  id: string;
  src: string;
  poster: string;
  label: string;
  description: string;
  orientation: 'portrait' | 'landscape';
}

const CLIPS: Clip[] = [
  {
    id: 'lab',
    src: '/lab/lab-setup.mp4',
    poster: '/lab/lab-setup-poster.jpg',
    label: 'Building stuff in lab',
    description: 'Unboxing and setting up new benchtop robot arms on the lab bench.',
    orientation: 'portrait',
  },
  {
    id: 'event',
    src: '/lab/event-hosted.mp4',
    poster: '/lab/event-hosted-poster.jpg',
    label: 'Event organised and hosted by me',
    description: 'A quick selfie pass through the room while attendees work at their tables.',
    orientation: 'landscape',
  },
];

export const BuildingStuffPage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(0);
  const [vw, setVw] = useState(() => window.innerWidth);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [time, setTime] = useState(0);
  const [dur, setDur] = useState(0);
  const dragX = useRef<number | null>(null);

  const clip = CLIPS[active];

  const nav = useCallback((dir: number) => {
    setActive((a) => (a + dir + CLIPS.length) % CLIPS.length);
  }, []);

  useEffect(() => {
    const old = document.title;
    document.title = 'Building stuff · Prajval Arora';
    window.scrollTo(0, 0);
    return () => { document.title = old; };
  }, []);

  /* keep reel geometry in sync with the viewport */
  useEffect(() => {
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  /* reset the player whenever the active clip changes */
  useEffect(() => {
    setPlaying(false);
    setTime(0);
    setDur(0);
  }, [active]);

  /* arrow keys move along the reel */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nav(1);
      else if (e.key === 'ArrowLeft') nav(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [nav]);

  const toggle = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { void v.play(); } else { v.pause(); }
  }, []);

  const seek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v || !dur) return;
    const rect = e.currentTarget.getBoundingClientRect();
    v.currentTime = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1) * dur;
  }, [dur]);

  /* swipe / drag along the reel */
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    dragX.current = e.clientX;
  }, []);
  const onPointerUp = useCallback((e: React.PointerEvent) => {
    if (dragX.current === null) return;
    const dx = e.clientX - dragX.current;
    dragX.current = null;
    if (dx <= -48) nav(1);
    else if (dx >= 48) nav(-1);
  }, [nav]);

  const progress = dur ? time / dur : 0;

  /* reel geometry: card widths in px, neighbors tucked just behind the active card */
  const pw = Math.min(0.76 * vw, 290);
  const lw = Math.min(0.8 * vw, 540);
  const wOf = (c: Clip) => (c.orientation === 'portrait' ? pw : lw);
  const activeW = wOf(clip);
  const reelH = (pw * 16) / 9;

  return <div className="relative min-h-screen overflow-hidden bg-[#100d0a] text-[#efe3cd]" style={{ fontFamily: "'Outfit', sans-serif" }}>
    <style>{`
      @keyframes bs-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      @keyframes bs-glow { 0%,100% { opacity: .55; transform: scale(1); } 50% { opacity: .9; transform: scale(1.12); } }
      @keyframes bs-ring { 0% { transform: scale(1); opacity: .8; } 100% { transform: scale(1.9); opacity: 0; } }
      @keyframes bs-rise { from { opacity: 0; transform: translateY(26px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes bs-fade { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      .bs-marquee-track { animation: bs-marquee 36s linear infinite; }
      .bs-outline { color: transparent; -webkit-text-stroke: 1.5px rgba(224,164,88,.28); }
      .bs-rise-1 { animation: bs-rise .7s cubic-bezier(.22,1,.36,1) both; }
      .bs-rise-2 { animation: bs-rise .7s cubic-bezier(.22,1,.36,1) .12s both; }
      .bs-rise-3 { animation: bs-rise .7s cubic-bezier(.22,1,.36,1) .24s both; }
      .bs-card { transition: transform .65s cubic-bezier(.22,1,.36,1), opacity .65s cubic-bezier(.22,1,.36,1); }
      .bs-label { animation: bs-fade .5s cubic-bezier(.22,1,.36,1) both; }
      @media (prefers-reduced-motion: reduce) {
        .bs-marquee-track, .bs-rise-1, .bs-rise-2, .bs-rise-3, .bs-label { animation: none; }
        .bs-card { transition: none; }
      }
    `}</style>

    {/* ember glow */}
    <div aria-hidden="true" className="absolute left-1/2 top-1/2 z-0 h-[130vmin] w-[130vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{ background: 'radial-gradient(circle, rgba(224,138,60,0.16) 0%, rgba(224,138,60,0.05) 42%, transparent 68%)', animation: 'bs-glow 9s ease-in-out infinite' }} />
    <Sparks />

    {/* marquee behind everything */}
    <div aria-hidden="true" className="absolute inset-x-0 top-1/2 z-0 -translate-y-1/2 overflow-hidden whitespace-nowrap">
      <div className="bs-marquee-track inline-block font-display text-[22vw] font-semibold leading-none tracking-tight">
        <span className="bs-outline">BUILDING STUFF&nbsp;·&nbsp;BUILDING STUFF&nbsp;·&nbsp;</span>
        <span className="bs-outline">BUILDING STUFF&nbsp;·&nbsp;BUILDING STUFF&nbsp;·&nbsp;</span>
      </div>
    </div>

    <header className="relative z-20 mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5">
      <Link to="/" className="font-display text-xl text-[#f5ead6]">Prajval<span className="text-[#e0a458]">.</span></Link>
      <Link to="/" className="inline-flex min-h-11 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#e0a458] transition-colors hover:text-[#f5ead6]"><ArrowLeft size={14} /> Back to portfolio</Link>
    </header>

    <main className="relative z-10 mx-auto flex min-h-[calc(100vh-10rem)] max-w-6xl flex-col items-center justify-center px-5 pb-16 pt-6">
      <h1 className="bs-rise-1 relative z-10 text-center font-display text-[clamp(3.4rem,11vw,8.5rem)] font-semibold leading-[0.92] tracking-tight text-[#f5ead6]">
        Building <span className="italic text-[#e0a458]">stuff.</span>
      </h1>

      {/* the reel */}
      <div className="bs-rise-2 relative z-30 mt-6 w-full md:-mt-[1.5vw]"
        style={{ touchAction: 'pan-y' }}
        onPointerDown={onPointerDown} onPointerUp={onPointerUp}
        onPointerCancel={() => { dragX.current = null; }}>
        <div className="relative mx-auto" style={{ perspective: '1200px', height: `${reelH}px` }}>
          {CLIPS.map((c, i) => {
            const offset = i - active;
            const isActive = offset === 0;
            return (
              <div key={c.id}
                role={isActive ? undefined : 'button'}
                tabIndex={isActive ? undefined : 0}
                aria-label={isActive ? undefined : `Show ${c.label}`}
                onClick={() => { if (!isActive) setActive(i); }}
                onKeyDown={(e) => { if (!isActive && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); setActive(i); } }}
                className={`bs-card absolute left-1/2 top-1/2 ${isActive ? 'z-20' : 'z-10 cursor-pointer'}`}
                style={{
                  width: `${wOf(c)}px`,
                  aspectRatio: c.orientation === 'portrait' ? '9 / 16' : '16 / 9',
                  transform: `translate(-50%, -50%) translateX(${offset === 0 ? 0 : Math.sign(offset) * (activeW / 2 + wOf(c) * 0.33 - 26)}px) rotateY(${offset * -34}deg) scale(${isActive ? 1 : 0.66})`,
                  opacity: isActive ? 1 : 0.5,
                  transformStyle: 'preserve-3d',
                }}>
                <div className="relative h-full w-full overflow-hidden rounded-3xl border bg-black"
                  style={{
                    borderColor: isActive ? 'rgba(224,164,88,0.6)' : 'rgba(224,164,88,0.25)',
                    boxShadow: isActive ? '0 40px 120px -20px rgba(224,138,60,0.45)' : '0 24px 60px -24px rgba(0,0,0,0.8)',
                    backgroundImage: `url(${c.poster})`, backgroundSize: 'cover', backgroundPosition: 'center',
                  }}>
                  {isActive ? (
                    <>
                      <video
                        ref={videoRef}
                        key={c.id}
                        src={c.src}
                        loop
                        muted={muted}
                        playsInline
                        preload="metadata"
                        aria-label={c.label}
                        onClick={toggle}
                        onPlay={() => setPlaying(true)}
                        onPause={() => setPlaying(false)}
                        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
                        onLoadedMetadata={(e) => setDur(e.currentTarget.duration)}
                        style={{ backgroundImage: `url(${c.poster})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                        className="absolute inset-0 h-full w-full cursor-pointer object-cover"
                      />

                      {/* play overlay */}
                      {!playing && (
                        <button type="button" onClick={toggle} aria-label={`Play ${c.label}`}
                          className="group absolute inset-0 flex items-center justify-center transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#e0a458]">
                          <span className="relative flex h-20 w-20 items-center justify-center">
                            <span aria-hidden="true" className="absolute inset-0 rounded-full border border-[#e0a458]/70" style={{ animation: 'bs-ring 2.2s ease-out infinite' }} />
                            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#e0a458] text-[#100d0a] shadow-lg transition-transform group-hover:scale-110">
                              <Play size={26} className="ml-1" fill="currentColor" />
                            </span>
                          </span>
                        </button>
                      )}

                      {/* bottom chrome */}
                      <div className={`absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-black/55 via-black/20 to-transparent px-4 pb-2.5 pt-6 transition-opacity duration-300 ${playing ? 'opacity-0 hover:opacity-100 focus-within:opacity-100' : 'opacity-100'}`}>
                        <button type="button" onClick={toggle} aria-label={playing ? 'Pause' : 'Play'} className="text-[#f5ead6] transition-colors hover:text-[#e0a458]">
                          {playing ? <Pause size={16} /> : <Play size={16} fill="currentColor" />}
                        </button>
                        <div role="slider" aria-label="Seek" aria-valuemin={0} aria-valuemax={Math.round(dur)} aria-valuenow={Math.round(time)}
                          onClick={seek} className="group/bar relative h-4 flex-1 cursor-pointer">
                          <div className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-white/20">
                            <div className="h-full rounded-full bg-[#e0a458]" style={{ width: `${progress * 100}%` }} />
                          </div>
                          <div className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e0a458] opacity-0 transition-opacity group-hover/bar:opacity-100" style={{ left: `${progress * 100}%` }} />
                        </div>
                        <span className="font-mono text-[10px] tracking-wider text-[#f5ead6]/80">{fmt(time)} / {fmt(dur)}</span>
                        <button type="button" onClick={() => setMuted((m) => !m)} aria-label={muted ? 'Unmute' : 'Mute'} className="text-[#f5ead6] transition-colors hover:text-[#e0a458]">
                          {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                        </button>
                      </div>
                    </>
                  ) : (
                    <img src={c.poster} alt="" aria-hidden="true" className="h-full w-full object-cover" draggable={false} />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* label + reel controls */}
        <div className="relative z-30 mt-5 flex flex-col items-center gap-3">
          <div key={clip.id} className="bs-label flex flex-col items-center gap-1.5 text-center">
            <span className="font-display text-xl italic text-[#e0a458]">{clip.label}</span>
            <span className="max-w-md px-4 font-mono text-[10px] uppercase leading-relaxed tracking-[0.18em] text-[#8a7a68]">{clip.description}</span>
          </div>
          <div className="flex items-center gap-5">
            <button type="button" onClick={() => nav(-1)} aria-label="Previous video"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#e0a458]/40 text-[#e0a458] transition-all hover:border-[#e0a458] hover:bg-[#e0a458]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#e0a458]">
              <ChevronLeft size={18} />
            </button>
            <div className="flex items-center gap-2" aria-hidden="true">
              {CLIPS.map((c, i) => (
                <span key={c.id} className="rounded-full transition-all duration-500"
                  style={{ width: i === active ? 22 : 6, height: 6, background: i === active ? '#e0a458' : 'rgba(224,164,88,0.3)' }} />
              ))}
            </div>
            <button type="button" onClick={() => nav(1)} aria-label="Next video"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#e0a458]/40 text-[#e0a458] transition-all hover:border-[#e0a458] hover:bg-[#e0a458]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#e0a458]">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </main>

    <footer className="relative z-10 mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 pb-6">
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#8a7a68]">Prajval Arora</span>
      <Link to="/projects" className="inline-flex min-h-11 items-center font-mono text-[10px] uppercase tracking-[0.18em] text-[#e0a458] transition-colors hover:text-[#f5ead6]">Project library</Link>
    </footer>
  </div>;
};
