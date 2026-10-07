import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

const repo = 'https://github.com/RoboX2020/get-it-done';
const zip = 'https://github.com/RoboX2020/get-it-done/archive/refs/heads/main.zip';
const raw = "https://raw.githubusercontent.com/RoboX2020/get-it-done/main/";
const label = 'font-mono text-[10px] uppercase tracking-[0.2em] text-[#d4b87a]';
const body = 'text-base leading-relaxed text-[#c4b49a]';
const features = [
  ['One picture per question', 'Paste one image link per line, as many as you have questions. When you finish a question and move on, the next picture flashes in the panel.'],
  ['Rewards that are earned', 'A picture unlocks only after the homework page records the question as done, such as a Correct mark after Check Answer. Clicking around in the extension does nothing.'],
  ['A panel you control', 'Drag the top bar to move it, drag the gold corner to resize it, dock it left or right, and show or hide it with Ctrl+Shift+. (Cmd+Shift+. on Mac).'],
  ['Works where homework lives', 'Canvas, Pearson MyLab and MathXL, Edfinity, Blackboard, Moodle, Brightspace, WebAssign, ALEKS, Gradescope, Khan Academy and more. On other sites it looks for counters like "Question 3 of 10".'],
];
const steps = [
  ['Get the code', 'Download the ZIP (or git clone the repo) and unzip it. No Node.js needed for the extension itself.'],
  ['Open your extensions page', 'In Chrome go to chrome://extensions, in Edge go to edge://extensions. Turn on Developer mode, top right.'],
  ['Load unpacked', 'Click Load unpacked and choose the extension folder inside the repo, the one that contains manifest.json. Pin Get Done to the toolbar.'],
  ['Add your pictures', 'Click the Get Done icon, paste one direct image link per line, then click Save pictures.'],
  ['Do your homework', 'Open your assignment. The panel opens on the right. Finish a question, go to the next one, and the next picture flashes.'],
];
export const GetItDonePage: React.FC = () => {
  useEffect(() => {
    const previous = document.title;
    document.title = 'Get Done · Prajval Arora';
    window.scrollTo(0, 0);
    return () => { document.title = previous; };
  }, []);
  return <div className="origin-root min-h-screen bg-[#1c1814] text-[#e6d9c4]">
    <header className="border-b border-[#3d3228] bg-[#241c16]">
      <div className="mx-auto flex site-shell items-center justify-between px-5 py-4">
        <Link to="/" className="font-display text-lg text-[#f0e6d4]">Prajval<span className="text-[#d4b87a]">.</span></Link>
        <Link to="/projects" className={`${label} flex items-center gap-2`}><ArrowLeft size={14} /> All projects</Link>
      </div>
    </header>
    <main className="mx-auto site-shell px-5 pb-20">
      <section className="grid gap-8 pb-10 pt-14 md:grid-cols-[1.5fr_1fr] md:pt-20">
        <div><p className={label}>Browser extension · October 2026</p>
          <h1 className="mt-5 font-display text-[clamp(3.5rem,10vw,7rem)] leading-none tracking-tight text-[#f0e6d4]">Get Done</h1>
          <p className="mt-5 font-display text-2xl italic text-[#d4b87a] md:text-3xl">Finish a question.<br />Get a picture.</p>
        </div>
        <div className="flex flex-col justify-end"><p className={body}>A Chrome and Edge extension that turns homework into a small reward loop. Paste a list of image links, one per question, and a side panel flashes the next one each time you finish a problem.</p>
          <div className="mt-6 flex flex-wrap gap-4"><a className={`${label} inline-flex items-center gap-1 border border-[#d4b87a] px-4 py-3`} href={zip}>Download ZIP <ArrowUpRight size={14} /></a><a className={`${label} inline-flex items-center gap-1 px-1 py-3`} href={repo} target="_blank" rel="noreferrer">Source on GitHub <ArrowUpRight size={14} /></a></div>
        </div>
      </section>
      <div className="mt-10 grid grid-cols-2 gap-5 border-y border-[#3d3228] py-6 md:grid-cols-4">{[
        ['Type', 'Chrome / Edge extension'], ['Works on', 'Canvas, Pearson, Edfinity and more'], ['Install', 'Load unpacked, no store'], ['Privacy', 'Stays in your browser'],
      ].map(([k,v])=><div key={k}><p className={label}>{k}</p><p className="mt-2 text-sm text-[#d8cbb6]">{v}</p></div>)}</div>
      <section className="border-t border-[#3d3228] py-14"><p className={label}>What it does</p><div className="mt-6 grid gap-8 md:grid-cols-2">{features.map(([title,text])=><article className="border border-[#3d3228] bg-[#241c16]/50 p-6" key={title}><h3 className="font-display text-2xl text-[#f0e6d4]">{title}</h3><p className="mt-3 text-sm leading-relaxed text-[#b8a894]">{text}</p></article>)}</div></section>
      <section className="border-t border-[#3d3228] py-14"><p className={label}>The rewards</p><div className="mt-6 flex items-center gap-5"><img src={raw+"extension/icons/icon128.png"} alt="Get Done icon" className="h-16 w-16" /><p className="max-w-md text-sm leading-relaxed text-[#b8a894]">Your own pictures show up in the side panel, one per finished question. A few examples:</p></div><div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">{[1,2,3,4,5,6,7,8].map(n=><img key={n} src={raw+"demo/public/rewards/0"+n+".jpg"} alt={"Example reward "+n} loading="lazy" className="h-auto w-full border border-[#3d3228]" />)}</div></section>
      <section className="grid items-start gap-8 pb-16 md:grid-cols-[1fr_2fr]"><div><p className={label}>Install</p><h2 className="mt-3 font-display text-3xl text-[#f0e6d4]">Five steps,<br />no account.</h2></div><ol className="space-y-5 text-sm leading-relaxed text-[#b8a894]">{steps.map(([t,s],i)=><li key={t}><span className="mr-3 font-mono text-[#d4b87a]">0{i+1}</span><span className="text-[#f0e6d4]">{t}.</span> {s}</li>)}</ol></section>
      <aside className="border-l-2 border-[#d4b87a] bg-[#241c16] p-6"><p className={label}>Good to know</p><p className="mt-3 text-sm leading-relaxed text-[#c4b49a]">Your picture links and progress are saved in your browser only, and nothing is uploaded. To update, run git pull (or download the ZIP again), click Reload on Get Done in your extensions page, and refresh your homework tab.</p></aside>
      <section className="border-t border-[#3d3228] mt-16 pt-12"><p className={label}>Get it</p><h2 className="mt-3 font-display text-3xl text-[#f0e6d4]">Free and open source.</h2><div className="mt-7 flex flex-wrap gap-6"><a href={zip} className={label}>Download ZIP ↗</a><a href={repo} target="_blank" rel="noreferrer" className={label}>Repository and full instructions ↗</a></div></section>
    </main>
    <footer className="border-t border-[#3d3228] px-5 py-6"><div className="mx-auto flex site-shell flex-wrap justify-between gap-4"><Link to="/" className={label}>Prajval Arora</Link><a href={repo} target="_blank" rel="noreferrer" className={label}>Open on GitHub ↗</a></div></footer>
  </div>;
};
