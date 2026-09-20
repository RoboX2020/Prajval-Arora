import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { EMBEDS, PERSON } from '../content';

export const SignalBoard: React.FC = () => {
  return (
    <section id="signals" className="border-y border-white/10 bg-black/25 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-orange-400">Live traces</p>
        <h2 className="mt-3 max-w-3xl font-display text-4xl leading-tight text-stone-50 md:text-5xl">
          Embeddings — the places a person already exists, pulled onto this wall.
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-stone-500">
          GitHub, LinkedIn, and Instagram are the obvious three. The interesting ones are the joints: a contribution graph, a reel of a machine in the air, a calendar, a lab that is also a club.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {EMBEDS.map((e) => (
            <a
              key={e.id}
              href={e.href}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col border border-white/10 bg-[#12110d] p-5 hover:border-orange-400/50"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-orange-400">{e.kind}</span>
              <span className="mt-2 font-display text-2xl text-stone-50 group-hover:text-orange-300">{e.title}</span>
              <span className="mt-2 flex-1 text-sm leading-relaxed text-stone-400">{e.body}</span>
              <span className="mt-4 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.16em] text-stone-500 group-hover:text-orange-400">
                Open <ArrowUpRight size={12} />
              </span>
            </a>
          ))}
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <figure className="border border-white/10 bg-black/40 p-4">
            <figcaption className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-stone-500">
              GitHub · RoboX2020
            </figcaption>
            <img
              src="https://github-readme-stats.vercel.app/api?username=RoboX2020&show_icons=true&theme=dark&bg_color=0c0b09&title_color=e88448&icon_color=40b4aa&text_color=d6cfc4&hide_border=true"
              alt="GitHub stats for RoboX2020"
              className="w-full"
            />
          </figure>
          <figure className="border border-white/10 bg-black/40 p-4">
            <figcaption className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-stone-500">
              GitHub · most used languages
            </figcaption>
            <img
              src="https://github-readme-stats.vercel.app/api/top-langs/?username=RoboX2020&layout=compact&theme=dark&bg_color=0c0b09&title_color=e88448&text_color=d6cfc4&hide_border=true"
              alt="Top languages on GitHub"
              className="w-full"
            />
          </figure>
        </div>

        <div className="mt-6 overflow-hidden border border-white/10 bg-black/40">
          <p className="px-4 pt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-stone-500">Time · thirty minutes</p>
          <iframe
            title="Book time with Prajval"
            src={`${PERSON.calendly}?hide_gdpr_banner=1`}
            className="h-[620px] w-full border-0 bg-[#0c0b09]"
          />
        </div>
      </div>
    </section>
  );
};
