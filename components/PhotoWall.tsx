import React from 'react';
import { WALL_PHOTOS, PHOTOS } from '../content';

export const PhotoWall: React.FC = () => {
  return (
    <section id="room" className="relative mx-auto max-w-6xl px-5 py-24">
      <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-orange-400">In the room</p>
      <h2 className="mt-3 max-w-3xl font-display text-4xl leading-tight text-stone-50 md:text-5xl">
        Frames tacked to the wall — a person, not a brand kit.
      </h2>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-stone-500">
        Latin where the moment deserves a motto. English where a friend would just laugh.
      </p>

      <div className="mt-12 grid items-start gap-8 md:grid-cols-12">
        {WALL_PHOTOS.map((p) => (
          <figure
            key={p.id}
            className={`polaroid ${p.pixel ? 'pixel-frame' : ''} ${p.span}`}
            style={{ transform: `rotate(${p.rotate})` }}
          >
            <img
              src={p.src}
              alt={p.alt}
              className={`${p.pixel ? 'pixelated' : ''} w-full object-cover ${p.id === '1125' || p.id === '5764' ? 'aspect-[4/5]' : 'aspect-[3/4]'}`}
            />
            <figcaption>
              <span className="block font-display text-xl italic text-stone-800">{p.latin}</span>
              <span className="mt-1 block text-xs leading-relaxed text-stone-500">{p.note}</span>
            </figcaption>
          </figure>
        ))}

        <figure className="polaroid pixel-frame md:col-span-4" style={{ transform: 'rotate(-1.5deg)' }}>
          <img src={PHOTOS.stagePixel.src} alt={PHOTOS.stagePixel.alt} className="pixelated aspect-[3/4] w-full object-cover" />
          <figcaption>
            <span className="block font-display text-xl italic text-stone-800">{PHOTOS.stagePixel.latin}</span>
            <span className="mt-1 block text-xs leading-relaxed text-stone-500">{PHOTOS.stagePixel.note}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
};
