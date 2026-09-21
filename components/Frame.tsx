import React, { useState } from 'react';

export type FrameMedia = {
  src: string;
  alt: string;
  latin: string;
  note: string;
  wide?: boolean;
  square?: boolean;
  video?: boolean;
  fallbackHref?: string;
};

function ratioClass(media: FrameMedia) {
  if (media.square) return 'aspect-square';
  if (media.wide) return 'aspect-[4/3]';
  return 'aspect-[3/4]';
}

export const Frame: React.FC<{ media: FrameMedia; className?: string; fill?: boolean }> = ({
  media,
  className = '',
  fill = false,
}) => {
  const [videoFailed, setVideoFailed] = useState(false);
  const mediaClass = fill
    ? 'absolute inset-0 h-full w-full object-cover object-center'
    : `block w-full ${ratioClass(media)} object-cover object-center`;

  const overlay = (
    <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] bg-gradient-to-t from-[#1c1814] via-[#1c1814]/80 to-transparent px-4 pb-4 pt-20">
      <span className="block font-display text-xl italic text-[#d4b87a]">{media.latin}</span>
      <span className="mt-1 block text-xs leading-relaxed text-[#e6d9c4]/90">{media.note}</span>
    </figcaption>
  );

  return (
    <figure
      className={`frame relative overflow-hidden bg-[#241c16] ${fill ? 'h-full min-h-[22rem]' : ''} ${className}`}
    >
      {media.video && !videoFailed ? (
        <video
          src={media.src}
          aria-label={media.alt}
          autoPlay
          muted
          loop
          playsInline
          controls
          className={`${mediaClass} bg-[#2a2219]`}
          onError={() => setVideoFailed(true)}
        />
      ) : media.video && videoFailed ? (
        <a
          href={media.fallbackHref || media.src}
          target="_blank"
          rel="noreferrer"
          className="absolute inset-0 flex min-h-[22rem] flex-col justify-end p-6"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#d4b87a]">Blimp clip</span>
          <span className="mt-3 font-display text-3xl italic text-[#f0e6d4]">{media.latin}</span>
          <span className="mt-2 max-w-sm text-sm leading-relaxed text-[#d8cbb6]">{media.note}</span>
          <span className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-[#c4a35a]">
            Save the WhatsApp video as public/portraits/blimp.mp4
          </span>
        </a>
      ) : (
        <img src={media.src} alt={media.alt} className={mediaClass} />
      )}
      {!(media.video && videoFailed) && overlay}
    </figure>
  );
};

export const Spread: React.FC<{
  media: FrameMedia;
  reverse?: boolean;
  children: React.ReactNode;
}> = ({ media, reverse, children }) => {
  return (
    <div className="grid overflow-hidden border border-[#3d3228] md:grid-cols-12 md:items-stretch">
      <div className={`md:col-span-5 ${reverse ? 'md:order-2' : ''}`}>
        <Frame media={media} fill />
      </div>
      <div
        className={`flex flex-col justify-center bg-[#241c16] px-6 py-8 md:col-span-7 md:px-10 md:py-12 ${
          reverse ? 'md:order-1' : ''
        }`}
      >
        {children}
      </div>
    </div>
  );
};
