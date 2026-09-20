import React from 'react';
import { PHOTOS } from '../content';

export const PhotoWall: React.FC = () => {
  return (
    <section id="room" className="relative mx-auto max-w-6xl px-5 py-24">
      <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-orange-400">In the room</p>
      <h2 className="mt-3 max-w-2xl font-display text-4xl leading-tight text-stone-50 md:text-5xl">
        A face, not a logo — tacked to the wall like a shop drawing.
      </h2>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-stone-500">
        Photos are how a stranger becomes a person. These are not studio campaigns. They are the frames that already exist in public: a peer-mentor wall at ASU, and the face GitHub already knows.
      </p>

      <div className="mt-12 grid items-end gap-8 md:grid-cols-12">
        <figure className="polaroid md:col-span-5 md:-rotate-2">
          <img src={PHOTOS.asu.src} alt={PHOTOS.asu.alt} className="aspect-[3/4] w-full object-cover" />
          <figcaption>
            <span className="block font-display text-xl text-stone-800">{PHOTOS.asu.caption}</span>
            <span className="mt-1 block text-xs text-stone-500">{PHOTOS.asu.note}</span>
          </figcaption>
        </figure>

        <figure className="polaroid pixel-frame md:col-span-4 md:rotate-3 md:translate-y-6">
          <img src={PHOTOS.asuPixel.src} alt={PHOTOS.asuPixel.alt} className="pixelated aspect-[3/4] w-full object-cover" />
          <figcaption>
            <span className="block font-display text-xl text-stone-800">{PHOTOS.asuPixel.caption}</span>
            <span className="mt-1 block text-xs text-stone-500">{PHOTOS.asuPixel.note}</span>
          </figcaption>
        </figure>

        <div className="md:col-span-3">
          <figure className="polaroid polaroid-sm -rotate-1">
            <img src={PHOTOS.github.src} alt={PHOTOS.github.alt} className="aspect-square w-full object-cover" />
            <figcaption>
              <span className="block font-display text-lg text-stone-800">{PHOTOS.github.caption}</span>
              <span className="mt-1 block text-xs text-stone-500">{PHOTOS.github.note}</span>
            </figcaption>
          </figure>
          <figure className="polaroid polaroid-sm pixel-frame mt-6 rotate-2">
            <img src={PHOTOS.githubPixel.src} alt={PHOTOS.githubPixel.alt} className="pixelated aspect-square w-full object-cover" />
            <figcaption>
              <span className="block font-display text-lg text-stone-800">{PHOTOS.githubPixel.caption}</span>
              <span className="mt-1 block text-xs text-stone-500">{PHOTOS.githubPixel.note}</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
};
