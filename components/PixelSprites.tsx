import React from 'react';

const PixelBot: React.FC<{ className?: string; delay?: string }> = ({ className, delay }) => (
  <svg className={className} style={{ animationDelay: delay }} viewBox="0 0 16 16" width="48" height="48" shapeRendering="crispEdges" aria-hidden>
    <rect width="16" height="16" fill="none" />
    <rect x="6" y="2" width="4" height="3" fill="#d4b87a" />
    <rect x="5" y="5" width="6" height="5" fill="#8a6a3c" />
    <rect x="4" y="6" width="2" height="2" fill="#c4a35a" />
    <rect x="10" y="6" width="2" height="2" fill="#c4a35a" />
    <rect x="6" y="10" width="2" height="4" fill="#6a4a28" />
    <rect x="8" y="10" width="2" height="4" fill="#6a4a28" />
    <rect x="3" y="7" width="2" height="1" fill="#e6d9c4" />
    <rect x="11" y="7" width="2" height="1" fill="#e6d9c4" />
  </svg>
);

const PixelCup: React.FC<{ className?: string; delay?: string }> = ({ className, delay }) => (
  <svg className={className} style={{ animationDelay: delay }} viewBox="0 0 16 16" width="40" height="40" shapeRendering="crispEdges" aria-hidden>
    <rect x="3" y="6" width="8" height="7" fill="#8a6a3c" />
    <rect x="4" y="7" width="6" height="5" fill="#4a3824" />
    <rect x="11" y="8" width="2" height="3" fill="#d4b87a" />
    <rect x="6" y="3" width="2" height="3" fill="#c4a35a" />
    <rect x="5" y="2" width="1" height="2" fill="#c4a35a" />
  </svg>
);

const PixelArm: React.FC<{ className?: string; delay?: string }> = ({ className, delay }) => (
  <svg className={className} style={{ animationDelay: delay }} viewBox="0 0 24 16" width="72" height="48" shapeRendering="crispEdges" aria-hidden>
    <rect x="1" y="6" width="5" height="4" fill="#8a7a68" />
    <rect x="6" y="7" width="6" height="3" fill="#8a6a3c" />
    <rect x="12" y="5" width="3" height="7" fill="#d4b87a" />
    <rect x="15" y="2" width="3" height="3" fill="#c4a35a" />
    <rect x="17" y="2" width="5" height="2" fill="#e6d9c4" />
  </svg>
);

export const PixelSprites: React.FC = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-[5] overflow-hidden" aria-hidden>
      <PixelBot className="pixel-walk absolute bottom-[18%] opacity-80" delay="0s" />
      <PixelCup className="pixel-walk-rev absolute bottom-[32%] opacity-70" delay="-8s" />
      <PixelArm className="pixel-walk absolute top-[22%] opacity-75" delay="-4s" />
      <PixelBot className="pixel-walk-slow absolute top-[58%] opacity-50" delay="-12s" />
      <PixelCup className="pixel-bob absolute right-[12%] top-[40%] opacity-60" delay="-2s" />
    </div>
  );
};
