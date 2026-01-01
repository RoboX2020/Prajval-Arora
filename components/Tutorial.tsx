import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export const Tutorial: React.FC = () => {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 ui-panel px-8 py-4 flex items-center gap-8 pointer-events-none">
       <div className="flex flex-col items-center gap-1">
          <div className="flex gap-2">
            <div className="w-10 h-10 border-2 border-gray-300 rounded flex items-center justify-center text-gray-400">
              <ArrowLeft size={20} />
            </div>
            <div className="w-10 h-10 border-2 border-gray-400 rounded flex items-center justify-center text-gray-600 bg-gray-100 animate-bounce">
              <ArrowRight size={20} />
            </div>
          </div>
          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Controls</span>
       </div>
       <div className="h-8 w-px bg-gray-300"></div>
       <p className="font-display text-gray-600 text-lg">
         Drive to explore
       </p>
    </div>
  );
};