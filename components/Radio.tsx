import React from 'react';
import { Radio as RadioIcon, Music } from 'lucide-react';

interface RadioProps {
  message: string;
}

export const Radio: React.FC<RadioProps> = ({ message }) => {
  return (
    <div className="fixed top-8 right-8 w-80 ui-panel p-4 flex flex-col gap-2 z-50 transition-all duration-500 hover:scale-105">
      <div className="flex justify-between items-center border-b border-gray-200 pb-2">
        <div className="flex items-center gap-2 text-gray-600">
          <RadioIcon size={20} className="animate-pulse text-blue-400" />
          <span className="font-display font-bold text-sm">FM 104.2 - DEV RADIO</span>
        </div>
        <Music size={16} className="text-gray-400" />
      </div>
      
      <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
        <p className="text-gray-700 text-sm italic leading-relaxed">
          "{message}"
        </p>
      </div>

      <div className="flex gap-1 mt-1">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="h-1 flex-1 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-blue-400 animate-[pulse_1s_ease-in-out_infinite]" style={{ animationDelay: `${i * 0.1}s` }} />
          </div>
        ))}
      </div>
    </div>
  );
};