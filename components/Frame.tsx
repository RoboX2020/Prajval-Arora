import React, { useState } from 'react';

export type FrameMedia = {
  src: string;
  alt: string;
  latin: string;
  note: string;
  wide?: boolean;
  video?: boolean;
  fallbackHref?: string;
};

export const Frame: React.FC<{ media: FrameMedia; className?: string }> = ({ media, className = '' }) => {
  const [videoFailed, setVideoFailed] = useState(false);
  const ratio = media.wide ? 'aspect-[5/4]' : 'aspect-[4/5]';

  return (
    <figure className={`frame ${className}`}>
      {media.video && !videoFailed ? (
        <video
          src={media.src}
          aria-label={media.alt}
          autoPlay
          muted
          loop
          playsInline
          controls
          className={`block w-full ${ratio} bg-[#2a2219] object-cover`}
          onError={() => setVideoFailed(true)}
        />
      ) : media.video && videoFailed && media.fallbackHref ? (
        <a
          href={media.fallbackHref}
          target="_blank"
          rel="noreferrer"
          className={`${ratio} flex flex-col justify-end border border-[#5a4a32] bg-[#2a2219] p-5`}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#d4b87a]">Play the air experiment</span>
          <span className="mt-2 text-sm text-[#d8cbb6]">{media.alt}</span>
        </a>
      ) : (
        <img
          src={media.src}
          alt={media.alt}
          className={`block w-full ${ratio} object-cover object-center`}
        />
      )}
      <figcaption className="px-1 pt-3">
        <span className="block font-display text-xl italic text-[#d4b87a]">{media.latin}</span>
        <span className="mt-1 block text-xs leading-relaxed text-[#c4b49a]">{media.note}</span>
      </figcaption>
    </figure>
  );
};

export const Spread: React.FC<{
  media: FrameMedia;
  extras?: FrameMedia[];
  reverse?: boolean;
  children: React.ReactNode;
}> = ({ media, extras, reverse, children }) => {
  return (
    <div className="grid items-start gap-8 md:grid-cols-12 md:gap-12">
      <div className={`space-y-8 md:col-span-5 ${reverse ? 'md:order-2' : ''}`}>
        <Frame media={media} />
        {extras?.map((extra) => (
          <Frame key={extra.src} media={extra} />
        ))}
      </div>
      <div className={`md:col-span-7 ${reverse ? 'md:order-1' : ''} md:pt-4`}>{children}</div>
    </div>
  );
};
