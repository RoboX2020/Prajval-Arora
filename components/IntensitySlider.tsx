import React from 'react';
import {
  useIntensity,
  readingLabel,
  INTENSITY_MIN,
  INTENSITY_MAX,
} from '../intensity';

/**
 * Word-intensity control: six stops from baby-book simple to research-paper
 * jargon. Opens at the plain default and remembers the visitor's choice for
 * their visit only (session storage).
 */
export const IntensitySlider: React.FC = () => {
  const { level, setLevel } = useIntensity();

  return (
    <div className="border-b border-[#3d3228] bg-[#1c1814]">
      <div className="mx-auto flex site-shell flex-wrap items-center gap-x-4 gap-y-1 px-5 py-2">
        <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-[#8a7a68]">
          Word intensity
        </span>
        <span className="flex items-center gap-2">
          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#b8a894]">Simple</span>
          <input
            type="range"
            min={INTENSITY_MIN}
            max={INTENSITY_MAX}
            step={1}
            value={level}
            onChange={(e) => setLevel(Number(e.target.value))}
            aria-label="Word intensity"
            className="word-intensity-range"
          />
          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#b8a894]">Research paper</span>
        </span>
        <span className="text-[13px] leading-snug text-[#d8cbb6]">
          Now reading: <span className="font-wordy text-[#e4570d]">{readingLabel(level)}</span>
        </span>
      </div>
    </div>
  );
};
