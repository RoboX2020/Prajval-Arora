
import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface IntroSequenceProps {
  onComplete: () => void;
}

export const IntroSequence: React.FC<IntroSequenceProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Timeline of the intro
    const t1 = setTimeout(() => setStep(1), 800);  // "Wanna dive..."
    const t2 = setTimeout(() => setStep(2), 2800); // "Let's go"
    const t3 = setTimeout(() => setStep(3), 4500); // Transition out

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  useEffect(() => {
    if (step === 3) {
      const t = setTimeout(onComplete, 1000); // Wait for fade out
      return () => clearTimeout(t);
    }
  }, [step, onComplete]);

  if (step === 3) return null; // Unmount visually before callback

  return (
    <div className={`fixed inset-0 z-[60] bg-black flex flex-col items-center justify-center transition-opacity duration-1000 ${step === 3 ? 'opacity-0' : 'opacity-100'}`}>
      
      {/* Background Anime Vibe: Sun/Road Abstract */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-blue-900 to-transparent"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-purple-500/20 to-blue-500/0 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Step 1: The Question */}
      <div className={`relative transition-all duration-1000 transform ${step === 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${step > 1 ? 'opacity-0 -translate-y-10 absolute' : ''}`}>
        <h1 className="text-white font-display text-4xl md:text-6xl font-bold tracking-tight text-center leading-tight">
          Wanna dive into <br/>
          <span className="text-blue-400">my life journey?</span>
        </h1>
      </div>

      {/* Step 2: The Action */}
      <div className={`relative transition-all duration-500 transform ${step === 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'} ${step !== 2 ? 'absolute' : ''}`}>
        <div className="flex items-center gap-4">
            <h1 className="text-white font-display text-8xl md:text-9xl font-bold tracking-tighter italic">
            LET'S GO.
            </h1>
        </div>
        <div className="h-2 w-full bg-blue-500 mt-4 animate-[width_1s_ease-out_forwards]"></div>
      </div>

    </div>
  );
};
