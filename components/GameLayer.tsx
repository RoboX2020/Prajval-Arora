
import React, { useState, useEffect } from 'react';
import { GameCanvas } from './GameCanvas';
import { Radio } from './Radio';
import { Tutorial } from './Tutorial';
import { IntroSequence } from './IntroSequence';
import { generateWelcomeMessage } from '../services/geminiService';
import { Play, Castle, Coffee, X, ExternalLink, Trophy, RotateCcw, Link as LinkIcon, Home } from 'lucide-react';
import { Project } from '../constants';

interface GameLayerProps {
  onBackToHome: () => void;
}

export const GameLayer: React.FC<GameLayerProps> = ({ onBackToHome }) => {
  const [radioMessage, setRadioMessage] = useState("Station Off Air");
  const [gameActive, setGameActive] = useState(false);
  const [showIntro, setShowIntro] = useState(false); 
  const [nearbyProject, setNearbyProject] = useState<Project | null>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [gameKey, setGameKey] = useState(0); // To reset game

  useEffect(() => {
    generateWelcomeMessage().then(msg => setRadioMessage(msg));
  }, []);

  useEffect(() => {
    const handleEnter = (e: KeyboardEvent) => {
        if (e.key === 'Enter' && nearbyProject && !activeProject) {
            if (nearbyProject.type === 'link' && nearbyProject.link) {
               window.open(nearbyProject.link, '_blank');
            } else {
               setActiveProject(nearbyProject);
            }
        }
        if (e.key === 'Escape' && activeProject) {
            setActiveProject(null);
        }
    };
    window.addEventListener('keydown', handleEnter);
    return () => window.removeEventListener('keydown', handleEnter);
  }, [nearbyProject, activeProject]);

  const handleStartClick = () => {
    setShowIntro(true); 
  };

  const handleIntroComplete = () => {
    setShowIntro(false);
    setGameActive(true); 
    setRadioMessage("Tuning in... FM 104.2");
  };

  const handleFinish = () => {
      setIsFinished(true);
  };

  const restartGame = () => {
      setGameKey(p => p + 1);
      setIsFinished(false);
      setGameActive(true);
      setRadioMessage("Restarting Journey...");
  };

  const isTeaStall = activeProject?.type === 'tea-stall';

  const handleInteractionClick = () => {
      if (nearbyProject?.type === 'link' && nearbyProject.link) {
          window.open(nearbyProject.link, '_blank');
      } else {
          setActiveProject(nearbyProject);
      }
  };

  return (
    <div className="w-screen h-screen relative overflow-hidden bg-blue-100">
      
      {/* Intro Overlay */}
      {showIntro && <IntroSequence onComplete={handleIntroComplete} />}

      {/* Game Layer */}
      <div className="absolute inset-0 z-0">
        <GameCanvas 
            key={gameKey}
            onMessage={setRadioMessage} 
            onProjectProximity={setNearbyProject}
            onFinish={handleFinish}
            gameActive={gameActive} 
            isPaused={!!activeProject || isFinished}
        />
      </div>

      {/* Header UI (Centered Top) */}
      <div className="fixed top-0 left-0 right-0 z-40 flex justify-center pt-6 pointer-events-none">
          <div className="bg-white/30 backdrop-blur-md px-8 py-3 rounded-full shadow-lg border border-white/40 flex flex-col items-center">
             <h1 className="font-display text-3xl font-bold text-gray-900 drop-shadow-sm tracking-tight">
                 Prajval Arora
             </h1>
             <p className="text-gray-700 font-nunito font-semibold text-sm tracking-wider uppercase">
                 A Machine Creator
             </p>
          </div>
      </div>
      
      {/* Exit Button */}
      <div className="fixed top-6 left-6 z-50">
          <button onClick={onBackToHome} className="bg-white/50 backdrop-blur hover:bg-white p-3 rounded-full shadow-lg transition-all hover:rotate-90">
             <Home size={24} className="text-gray-700" />
          </button>
      </div>

      {/* Finish Screen Overlay */}
      {isFinished && (
         <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-md flex flex-col items-center justify-center text-white animate-fade-in">
             <h2 className="font-display text-5xl mb-4 text-yellow-400 drop-shadow-lg">Journey Complete</h2>
             <p className="font-nunito text-xl mb-8 max-w-lg text-center">
                 You've seen the path so far. But the road goes on forever.
             </p>
             <button 
                onClick={restartGame}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-full flex items-center gap-3 transition-transform hover:scale-105 shadow-xl"
             >
                 <RotateCcw size={24} /> Review Journey Again
             </button>
         </div>
      )}

      {/* Start Screen Overlay */}
      {!gameActive && !showIntro && !isFinished && (
        <div className="absolute inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-md animate-fade-in ui-panel border-4 border-blue-100">
            <h1 className="font-display text-4xl mb-4 text-blue-600">The Journey</h1>
            <p className="text-gray-600 mb-8 font-nunito">
              The life of Prajval Arora. <br/>From RC Cars to AI Robotics.
            </p>
            <button 
              onClick={handleStartClick}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-full flex items-center gap-3 mx-auto transition-transform hover:scale-110 shadow-lg border-b-4 border-blue-700 active:border-b-0 active:translate-y-1"
            >
              <Play fill="currentColor" /> START ENGINE
            </button>
          </div>
        </div>
      )}

      {/* Interact Button */}
      {nearbyProject && !activeProject && gameActive && !isFinished && (
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 animate-bounce">
              <button 
                onClick={handleInteractionClick}
                className={`
                   font-bold py-3 px-6 rounded-xl shadow-xl flex items-center gap-2 border-b-4 active:border-b-0 active:translate-y-1
                   ${nearbyProject.type === 'tea-stall' ? 'bg-orange-600 hover:bg-orange-500 text-white border-orange-800' : 
                     nearbyProject.type === 'link' ? 'bg-blue-600 hover:bg-blue-500 text-white border-blue-800' :
                     'bg-yellow-400 hover:bg-yellow-300 text-yellow-900 border-yellow-600'}
                `}
              >
                  {nearbyProject.type === 'tea-stall' ? <Coffee size={24} /> : 
                   nearbyProject.type === 'link' ? <LinkIcon size={24} /> : 
                   <Castle size={24} />}
                  
                  <span>
                      {nearbyProject.type === 'link' ? 'OPEN LINK' : `ENTER ${nearbyProject.title.toUpperCase()}`}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded ml-2 ${
                      nearbyProject.type === 'tea-stall' ? 'bg-orange-800 text-orange-200' : 
                      nearbyProject.type === 'link' ? 'bg-blue-800 text-blue-200' :
                      'bg-yellow-600 text-yellow-100'
                  }`}>
                      PRESS ENTER
                  </span>
              </button>
          </div>
      )}

      {/* Modal Overlay */}
      {activeProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
              <div className={`
                 w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[85vh] animate-[scaleIn_0.3s_ease-out]
                 ${isTeaStall ? 'bg-[#FFF3E0]' : 'bg-white'}
              `}>
                  
                  {/* Left: Visual/Color */}
                  <div className="w-full md:w-1/3 p-8 flex flex-col items-center justify-center text-white relative overflow-hidden" style={{ backgroundColor: activeProject.color }}>
                      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent" />
                      
                      {isTeaStall ? <Coffee size={80} className="mb-4 relative z-10" /> : <Castle size={80} className="mb-4 relative z-10" />}
                      
                      <h2 className="font-display text-3xl text-center relative z-10 leading-tight">{activeProject.title}</h2>
                      
                      {activeProject.stats && (
                          <div className="mt-4 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center gap-2">
                             <Trophy size={16} />
                             <span className="font-bold">{activeProject.stats}</span>
                          </div>
                      )}
                  </div>

                  {/* Right: Details */}
                  <div className="flex-1 p-8 overflow-y-auto relative">
                      <button 
                        onClick={() => setActiveProject(null)}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
                      >
                          <X size={32} />
                      </button>

                      <div className="prose max-w-none">
                        <h3 className="text-2xl font-bold text-gray-800 mb-2 font-display">The Story</h3>
                        <p className="text-gray-600 mb-6 leading-relaxed font-nunito text-lg whitespace-pre-line">
                            {activeProject.details || activeProject.description}
                        </p>

                        <h3 className="text-xl font-bold text-gray-800 mb-3 font-display">Key Tech & Skills</h3>
                        <div className="flex flex-wrap gap-2 mb-8">
                            {activeProject.tech.map(t => (
                                <span key={t} className={`px-3 py-1 rounded-full font-bold text-sm border 
                                   ${isTeaStall ? 'bg-orange-100 text-orange-800 border-orange-200' : 'bg-blue-100 text-blue-700 border-blue-200'}
                                `}>
                                    {t}
                                </span>
                            ))}
                        </div>
                      </div>

                      <div className="flex gap-4 mt-auto">
                          <button className="flex-1 bg-gray-900 text-white font-bold py-3 px-6 rounded-xl hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                              <ExternalLink size={20} />
                              {isTeaStall ? 'Visit Community' : 'View Project'}
                          </button>
                          <button 
                            onClick={() => setActiveProject(null)}
                            className="px-6 py-3 rounded-xl border-2 border-gray-300 font-bold text-gray-600 hover:bg-gray-100 transition-colors"
                          >
                              Drive On
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      )}

      {/* UI Layer */}
      <div className={`transition-opacity duration-1000 ${gameActive && !activeProject && !isFinished ? 'opacity-100' : 'opacity-0'}`}>
        <Radio message={radioMessage} />
        <Tutorial />
      </div>
    </div>
  );
};
