import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { VersionHistory } from './VersionHistory';

interface ArchiveChromeProps {
  label: string;
}

export const ArchiveChrome: React.FC<ArchiveChromeProps> = ({ label }) => {
  return (
    <div className="pointer-events-none fixed left-0 right-0 top-0 z-[70] flex justify-center p-3">
      <div className="pointer-events-auto flex max-w-full items-center gap-3 rounded-full border border-amber-500/40 bg-black/85 px-4 py-2 text-white shadow-xl backdrop-blur">
        <Link
          to="/"
          className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-stone-300 hover:text-amber-400"
        >
          <ArrowLeft size={14} />
          Current site
        </Link>
        <span className="hidden h-4 w-px bg-white/20 sm:block" />
        <span className="hidden font-mono text-[10px] uppercase tracking-[0.16em] text-amber-500 sm:inline">
          Archived · {label}
        </span>
        <VersionHistory variant="ink" />
      </div>
    </div>
  );
};
