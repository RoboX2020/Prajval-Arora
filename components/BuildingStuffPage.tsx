import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Play, Pause, Volume2, VolumeX } from 'lucide-react';

/* A standalone stage for one video. Deliberately different from the rest of
   the site: dark workshop mood, drifting sparks, giant outlined marquee,
   headline that the video overlaps, custom player chrome. */

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

export const BuildingStuffPage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [time, setTime] = useState(0);
  const [dur, setDur] = useState(0);

  useEffect(() => {
    const old = document.title;
    document.title = 'Building stuff · Prajval Arora';
    window.scrollTo(0, 0);
    return () => { document.title = old; };
  }, []);

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

  const progress = dur ? time / dur : 0;

  return <div className="relative min-h-screen overflow-hidden bg-[#100d0a] text-[#efe3cd]" style={{ fontFamily: "'Outfit', sans-serif" }}>
    <style>{`
      @keyframes bs-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      @keyframes bs-glow { 0%,100% { opacity: .55; transform: scale(1); } 50% { opacity: .9; transform: scale(1.12); } }
      @keyframes bs-ring { 0% { transform: scale(1); opacity: .8; } 100% { transform: scale(1.9); opacity: 0; } }
      @keyframes bs-rise { from { opacity: 0; transform: translateY(26px); } to { opacity: 1; transform: translateY(0); } }
      .bs-marquee-track { animation: bs-marquee 36s linear infinite; }
      .bs-outline { color: transparent; -webkit-text-stroke: 1.5px rgba(224,164,88,.28); }
      .bs-rise-1 { animation: bs-rise .7s cubic-bezier(.22,1,.36,1) both; }
      .bs-rise-2 { animation: bs-rise .7s cubic-bezier(.22,1,.36,1) .12s both; }
      .bs-rise-3 { animation: bs-rise .7s cubic-bezier(.22,1,.36,1) .24s both; }
      @media (prefers-reduced-motion: reduce) {
        .bs-marquee-track, .bs-rise-1, .bs-rise-2, .bs-rise-3 { animation: none; }
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

      {/* video overlapping the headline */}
      <div className="bs-rise-2 relative z-30 md:-mt-[3.5vw] rotate-[-1.6deg] transition-transform duration-500 hover:rotate-0">
        <div className="relative overflow-hidden rounded-3xl border border-[#e0a458]/60 bg-black shadow-[0_40px_120px_-20px_rgba(224,138,60,0.45)]" style={{ width: 'min(88vw, 400px, 37.2vh)', aspectRatio: '9 / 16', backgroundImage: 'url(/lab/lab-setup-poster.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <video
            ref={videoRef}
            src="/lab/lab-setup.mp4"
            loop
            muted={muted}
            playsInline
            preload="metadata"
            aria-label="Building stuff"
            onClick={toggle}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
            onLoadedMetadata={(e) => setDur(e.currentTarget.duration)}
            style={{ backgroundImage: 'url(/lab/lab-setup-poster.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
            className="absolute inset-0 h-full w-full cursor-pointer object-cover"
          />

          {/* play overlay */}
          {!playing && (
            <button type="button" onClick={toggle} aria-label="Play video"
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
        </div>
      </div>
    </main>

    <footer className="relative z-10 mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 pb-6">
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#8a7a68]">Prajval Arora</span>
      <Link to="/projects" className="inline-flex min-h-11 items-center font-mono text-[10px] uppercase tracking-[0.18em] text-[#e0a458] transition-colors hover:text-[#f5ead6]">Project library</Link>
    </footer>
  </div>;
};
