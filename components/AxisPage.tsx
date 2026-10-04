import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

const demo = 'https://axis.prajvalarora.com/';
const repo = 'https://github.com/RoboX2020/AXIS';
const label = 'font-mono text-[10px] uppercase tracking-[0.2em] text-[#d4b87a]';
const body = 'text-base leading-relaxed text-[#c4b49a]';
const features = [
  ['Shared airspace', 'Two simulated aircraft, projected paths and closest-point-of-approach calculations on a 3D host dashboard and editable tactical map.'],
  ['A cockpit in your pocket', 'Scan the host QR, choose Alpha or Bravo and see the same simulation from that aircraft. Cockpit and tail views, drag-to-look, recentering and optional device orientation.'],
  ['One conflict, two advisories', 'Aircraft-specific climb/descend warnings, map-panel alerts and vibration where supported. The phone is a viewer, not a flight controller.'],
  ['Paths before decisions', "Bhavya Shah's separate 3D trajectory explorer generates candidate paths, checks feasibility, consolidates routes and ranks them against runtime conditions."],
];
export const AxisPage: React.FC = () => {
  useEffect(() => {
    const previous = document.title;
    document.title = 'AXIS · Prajval Arora';
    window.scrollTo(0, 0);
    return () => { document.title = previous; };
  }, []);
  return <div className="origin-root min-h-screen bg-[#1c1814] text-[#e6d9c4]">
    <header className="border-b border-[#3d3228] bg-[#241c16]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link to="/" className="font-display text-lg text-[#f0e6d4]">Prajval<span className="text-[#d4b87a]">.</span></Link>
        <a href="/#collisions" className={`${label} flex items-center gap-2`}><ArrowLeft size={14} /> Back to work</a>
      </div>
    </header>
    <main className="mx-auto max-w-6xl px-5 pb-20">
      <section className="grid gap-8 pb-10 pt-14 md:grid-cols-[1.5fr_1fr] md:pt-20">
        <div><p className={label}>Flight × shared perspective · October 2026</p>
          <h1 className="mt-5 font-display text-[clamp(4rem,12vw,8rem)] leading-none tracking-tight text-[#f0e6d4]">AXIS</h1>
          <p className="mt-5 font-display text-2xl italic text-[#d4b87a] md:text-3xl">Make the conflict visible.<br />Let people step into the cockpit.</p>
        </div>
        <div className="flex flex-col justify-end"><p className={body}>I built AXIS with my hackathon team: a browser-based aviation prototype that visualizes predicted aircraft conflicts and climb/descend advisories. A laptop holds the shared airspace. A QR code takes visitors into a live cockpit view on their phones.</p>
          <div className="mt-6 flex flex-wrap gap-4"><a className={`${label} inline-flex items-center gap-1 border border-[#d4b87a] px-4 py-3`} href={demo} target="_blank" rel="noreferrer">Try the demo <ArrowUpRight size={14} /></a><a className={`${label} inline-flex items-center gap-1 px-1 py-3`} href={repo} target="_blank" rel="noreferrer">Source code <ArrowUpRight size={14} /></a></div>
        </div>
      </section>
      <figure><img src="/axis/host.png" alt="AXIS dashboard with two aircraft, projected paths and a tactical map" className="w-full border border-[#3d3228]" /><figcaption className="mt-3 font-mono text-xs leading-relaxed text-[#8a7a68]">The shared host dashboard. Captured from the live demo on October 4, 2026.</figcaption></figure>
      <div className="mt-10 grid grid-cols-2 gap-5 border-y border-[#3d3228] py-6 md:grid-cols-4">{[
        ['Context', 'Hackathon team prototype'], ['Interface', 'Host dashboard + QR cockpit'], ['Stack', 'React, TypeScript, Three.js'], ['Relay', 'Express + WebSockets'],
      ].map(([k,v])=><div key={k}><p className={label}>{k}</p><p className="mt-2 text-sm text-[#d8cbb6]">{v}</p></div>)}</div>
      <section className="grid gap-8 py-16 md:grid-cols-[1fr_2fr]"><div><p className={label}>The idea</p><h2 className="mt-3 font-display text-3xl text-[#f0e6d4]">A decision,<br />not another dot.</h2></div><div className={body}><p>The team's pitch was coordinated collision advice for small aircraft: use existing ADS-B traffic inputs, predict possible futures and give pilots a clear response. AXIS makes that idea tangible through a simulation people can see from both sides.</p><p className="mt-4">The browser demo is the first expression of that idea. Real traffic ingestion, hardware integration, autopilot intervention and certification are future directions, not shipped capabilities.</p></div></section>
      <section className="border-t border-[#3d3228] py-14"><p className={label}>What we built</p><div className="mt-6 grid gap-8 md:grid-cols-2">{features.map(([title,text])=><article className="border border-[#3d3228] bg-[#241c16]/50 p-6" key={title}><h3 className="font-display text-2xl text-[#f0e6d4]">{title}</h3><p className="mt-3 text-sm leading-relaxed text-[#b8a894]">{text}</p></article>)}</div></section>
      <section className="grid items-start gap-8 pb-16 md:grid-cols-[1fr_1.2fr]"><div><p className={label}>From host to phone</p><h2 className="mt-3 font-display text-3xl text-[#f0e6d4]">Same room.<br />Different perspective.</h2><ol className="mt-6 space-y-4 text-sm leading-relaxed text-[#b8a894]">{['The host runs the simulation and calculates conflict state.', 'Aircraft positions and advisories stream through a room-based WebSocket relay.', 'The QR opens the viewer with its room code. Choose an aircraft and look around.'].map((s,i)=><li key={s}><span className="mr-3 font-mono text-[#d4b87a]">0{i+1}</span>{s}</li>)}</ol><p className="mt-6 text-sm italic leading-relaxed text-[#8a7a68]">Reloading the host creates a new room. Free hosting may need a cold start.</p></div><figure><img src="/axis/cockpit.png" alt="Flight Alpha cockpit viewer with aircraft telemetry and look-around controls" className="w-full border border-[#3d3228]" /><figcaption className="mt-3 font-mono text-xs leading-relaxed text-[#8a7a68]">Cockpit viewer joined to the host. Captured in a desktop browser; physical phone sensors were not tested.</figcaption></figure></section>
      <aside className="border-l-2 border-[#d4b87a] bg-[#241c16] p-6"><p className={label}>Prototype boundary</p><p className="mt-3 text-sm leading-relaxed text-[#c4b49a]">Telemetry is simulated. This is not a certified flight-safety system. The trajectory explorer's AI-labelled stages are seeded, deterministic demonstrations with rule-based pruning and a hand-defined scoring function, not trained models or live LLM inference. That explorer is separate from the two-aircraft simulation.</p></aside>
      <section className="grid gap-8 py-16 md:grid-cols-[1fr_2fr]"><div><p className={label}>The people</p><h2 className="mt-3 font-display text-3xl text-[#f0e6d4]">Built as a team.</h2></div><div className="space-y-5 text-sm leading-relaxed text-[#b8a894]"><p><strong className="text-[#e6d9c4]">Prajval Arora</strong> · Project owner and team builder. The repository records the initial project, UI and QR/phone-demo updates under my account. These are commit credits, not a claim of sole authorship or that I manually wrote every line.</p><p><strong className="text-[#e6d9c4]">Bhavya Shah</strong> · Interactive 3D trajectory pipeline and the fix preserving vertical escape paths, recorded in the repository.</p><p>The presentation lists Riya, Toshan, Prajval, Hetvi and Bhavya. Individual roles for Riya, Toshan and Hetvi are not assigned here without evidence.</p></div></section>
      <section className="border-t border-[#3d3228] pt-12"><p className={label}>Build record · October 3-4, 2026</p><h2 className="mt-3 font-display text-3xl text-[#f0e6d4]">A weekend, made concrete.</h2><p className={`${body} mt-5 max-w-3xl`}>The weekend took AXIS from a shared aircraft simulation to a demo people could join: QR cockpit views, look-around controls, map-panel warnings, airliner models and the trajectory explorer. This page keeps the build and the team effort in view.</p><div className="mt-7 flex flex-wrap gap-6"><a href="https://docs.google.com/presentation/d/1WjElLi4xFiY_13qEzHInluhBHZR8w56ILL8sskMfuTE/edit?usp=sharing" target="_blank" rel="noreferrer" className={label}>Original presentation ↗</a><a href={repo} target="_blank" rel="noreferrer" className={label}>Repository & history ↗</a></div><p className="mt-7 max-w-3xl font-mono text-xs leading-relaxed text-[#8a7a68]">Documented at feature/qr-phone-cockpit · dcbc4f2. At this snapshot, main includes the predictor but not the phone-demo additions. Bhavya's contribution: 78d6181 and 655e6a1.</p></section>
    </main>
    <footer className="border-t border-[#3d3228] px-5 py-6"><div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-4"><Link to="/" className={label}>Prajval Arora</Link><a href={demo} target="_blank" rel="noreferrer" className={label}>Open AXIS ↗</a></div></footer>
  </div>;
};
