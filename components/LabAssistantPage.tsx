import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

const label = 'font-mono text-[10px] uppercase tracking-[0.18em] text-[#d4b87a]';
const work = [
  ['01', 'PLC + HMI', 'A wafer-handling training cell', 'I have programmed Allen-Bradley PLCs and developed HMI interfaces for lab projects, including a wafer-handling training system with Dobot robots and conveyors. The work connects the operator interface, control logic, and physical movement in one cell.'],
  ['02', 'Robot + controller', 'UR programming and color sorting', 'I have programmed Universal Robots arms to connect with PLCs and worked on the control logic for a color-sorting system. These projects sit at the boundary between robot programs and the PLC that coordinates the process.'],
  ['03', 'Electrical + pneumatic', 'Work beyond the program', 'My lab work includes pneumatics and electrical circuits, alongside PLCs and robot arms. I work with these systems as physical equipment and as material for hands-on teaching.'],
  ['04', 'Simulation + learning', 'Isaac Sim and robot-dog RL', 'I work with NVIDIA Isaac Sim and reinforcement-learning workflows for a Unitree robot dog. This is ongoing simulation and training work, not a completed sim-to-real deployment.'],
];

export const LabAssistantPage: React.FC = () => {
  useEffect(() => { const old = document.title; document.title = 'Lab assistant · Prajval Arora'; window.scrollTo(0, 0); return () => { document.title = old; }; }, []);
  return <div className="origin-root min-h-screen bg-[#1c1814] text-[#e6d9c4]">
    <header className="border-b border-[#3d3228] bg-[#241c16]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
        <Link to="/" className="font-display text-xl text-[#f0e6d4]">Prajval<span className="text-[#d4b87a]">.</span></Link>
        <Link to="/#now" className={`${label} inline-flex min-h-11 items-center gap-2`}><ArrowLeft size={14} /> Back to portfolio</Link>
      </div>
    </header>
    <main className="mx-auto max-w-6xl px-5 pb-16">
      <section className="grid gap-8 pb-10 pt-12 md:grid-cols-[1.25fr_1fr] md:pt-20">
        <div><p className={label}>Arizona State University · Polytechnic</p><h1 className="mt-5 font-display text-[clamp(3.2rem,10vw,6.5rem)] leading-[0.95] tracking-tight text-[#f0e6d4]">Lab assistant.<br /><span className="italic text-[#d4b87a]">Hands on the cell.</span></h1></div>
        <div className="flex flex-col justify-end"><p className="text-lg leading-relaxed text-[#c4b49a]">PLCs, HMIs, robot arms, conveyors, pneumatics, and circuits. My work at ASU brings these pieces together in lab projects and hands-on instruction.</p><p className="mt-5 text-sm leading-relaxed text-[#b8a894]">Since September 2026, I have worked as a lab assistant and supported Prof. Sangram Redkar's TSMC PLC and automation training cohorts.</p></div>
      </section>
      <dl className="grid gap-6 border-y border-[#3d3228] py-6 sm:grid-cols-3">
        {[['Role', 'Lab Assistant'], ['Based at', 'ASU Polytechnic'], ['Since', 'September 2026']].map(([k,v]) => <div key={k}><dt className={label}>{k}</dt><dd className="mt-2 text-sm text-[#d8cbb6]">{v}</dd></div>)}
      </dl>
      <section className="grid gap-8 py-12 md:grid-cols-[1fr_2fr]"><div><p className={label}>Teaching alongside building</p><h2 className="mt-3 font-display text-3xl text-[#f0e6d4]">A cell is also<br />a classroom.</h2></div><div><p className="text-base leading-relaxed text-[#c4b49a]">For the TSMC training cohorts, I support hands-on instruction in PLCs and automation. The lab work includes HMI development, robot integration, pneumatics, and circuits: the equipment learners need to work with, not just read about.</p><p className="mt-4 text-sm leading-relaxed text-[#b8a894]">This is an ASU lab role supporting a training program for TSMC staff. It is not employment at TSMC.</p></div></section>
      <section className="border-t border-[#3d3228] py-12"><p className={label}>Work areas</p><div className="mt-6 grid gap-5 md:grid-cols-2">{work.map(([n,tag,title,text]) => <article key={n} className="border border-[#3d3228] bg-[#241c16]/60 p-6"><div className="flex items-start justify-between gap-3"><p className={label}>{tag}</p><span className="font-display text-2xl text-[#8a7a68]">{n}</span></div><h3 className="mt-6 font-display text-3xl leading-tight text-[#f0e6d4]">{title}</h3><p className="mt-4 text-sm leading-7 text-[#c4b49a]">{text}</p></article>)}</div></section>
      <section className="grid gap-8 border-t border-[#3d3228] py-12 md:grid-cols-[1fr_2fr]"><div><p className={label}>Related work</p><h2 className="mt-3 font-display text-3xl text-[#f0e6d4]">Documenting<br />the process.</h2></div><div><p className="text-base leading-relaxed text-[#c4b49a]">Alongside the equipment work, I co-authored Isaac Sim lab guides with Tatwik for Prof. Redkar's Robotics Systems I course. The guides are a separate teaching resource from the TSMC training program.</p><Link to="/projects/isaac-sim-lab-3" className={`${label} mt-6 inline-flex min-h-11 items-center gap-2 border border-[#d4b87a] px-4 py-3`}>Read the Isaac Sim lab guide <ArrowUpRight size={14} /></Link><a href="/projects/bittle" className={`${label} mt-4 inline-flex min-h-11 items-center gap-2 border border-[#d4b87a] px-4 py-3`}>Explore the Bittle prototype <ArrowUpRight size={14} /></a></div></section>
      <aside className="border-l-2 border-[#d4b87a] bg-[#241c16] p-6"><p className={label}>Scope of this record</p><p className="mt-3 text-sm leading-relaxed text-[#c4b49a]">These are lab and training projects, not claims of production-fab deployment. The wafer-handling training cell here is separate from my May 2026 Dobot-Opta manufacturing-line team project. Reinforcement-learning work remains in progress.</p></aside>
    </main>
    <footer className="border-t border-[#3d3228] px-5 py-6"><div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-4"><Link to="/" className={`${label} inline-flex min-h-11 items-center`}>Prajval Arora</Link><Link to="/projects" className={`${label} inline-flex min-h-11 items-center`}>Project library ↗</Link></div></footer>
  </div>;
};
