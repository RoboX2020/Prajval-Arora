
import React, { useState, useEffect, useMemo } from 'react';
import { GameCanvas } from './GameCanvas';
import { Radio } from './Radio';
import { Tutorial } from './Tutorial';
import { IntroSequence } from './IntroSequence';
import { generateWelcomeMessage } from '../services/geminiService';
import { audioService } from '../services/audioService';
import { Play, Castle, Coffee, X, ExternalLink, Trophy, RotateCcw, Link as LinkIcon, Home, Gauge, MapPin, Navigation, ChevronRight, Flag, Zap, Volume2, VolumeX } from 'lucide-react';
import { Project, PROJECTS, WORLD_WIDTH } from '../constants';

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
  const [journey, setJourney] = useState({ x: 200, velocity: 0 });
  const [audioMuted, setAudioMuted] = useState(false);

  // Interactive achievement "stops" along the road, in order.
  const stops = useMemo(
    () =>
      PROJECTS
        .filter(p => p.type === 'project' || p.type === 'tea-stall' || p.type === 'link')
        .sort((a, b) => a.xPosition - b.xPosition),
    []
  );

  const progress = Math.max(0, Math.min(1, journey.x / WORLD_WIDTH));
  const passedCount = stops.filter(s => journey.x >= s.xPosition - 60).length;
  const nextStop = stops.find(s => s.xPosition > journey.x + 60) || null;
  const distanceToNext = nextStop ? Math.max(0, Math.round((nextStop.xPosition - journey.x) / 10)) : 0;
  const speedKmh = Math.round(Math.abs(journey.velocity) * 4);
  const speedPct = Math.min(100, (Math.abs(journey.velocity) / 35) * 100);
  const direction: 'left' | 'right' | 'idle' =
    journey.velocity > 0.5 ? 'right' : journey.velocity < -0.5 ? 'left' : 'idle';

  useEffect(() => {
    generateWelcomeMessage().then(msg => setRadioMessage(msg));
    // Restore mute preference (shared across the whole site)
    const m = localStorage.getItem('praj_muted') === '1';
    setAudioMuted(m);
    audioService.toggleMute(m);
  }, []);

  // Start/stop the engine sound with the game
  useEffect(() => {
    if (gameActive) {
      audioService.startAudio();
    } else {
      audioService.stopAudio();
    }
    return () => audioService.stopAudio();
  }, [gameActive]);

  // Soft chime when a new milestone comes into reach
  useEffect(() => {
    if (nearbyProject && gameActive && !activeProject && !isFinished) {
      audioService.playChime();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nearbyProject?.id]);

  const toggleMute = () => {
    setAudioMuted(prev => {
      const next = !prev;
      audioService.toggleMute(next);
      try { localStorage.setItem('praj_muted', next ? '1' : '0'); } catch { /* ignore */ }
      return next;
    });
  };

  const handleProgress = (info: { x: number; velocity: number }) => {
    setJourney(info);
    // Idle the engine while reading a card or at the finish line
    audioService.updateEngineSpeed(activeProject || isFinished ? 0 : info.velocity);
  };

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
    setJourney({ x: 200, velocity: 0 });
    setRadioMessage("Tuning in... FM 104.2");
  };

  const handleFinish = () => {
    setIsFinished(true);
  };

  const restartGame = () => {
    setGameKey(p => p + 1);
    setIsFinished(false);
    setGameActive(true);
    setJourney({ x: 200, velocity: 0 });
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
          onProgress={handleProgress}
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

      {/* Top-left controls: Exit + Mute */}
      <div className="fixed top-6 left-6 z-50 flex gap-2">
        <button
          onClick={onBackToHome}
          title="Back to base"
          aria-label="Back to base"
          className="bg-white/50 backdrop-blur hover:bg-white p-3 rounded-full shadow-lg transition-all hover:rotate-90"
        >
          <Home size={24} className="text-gray-700" />
        </button>
        <button
          onClick={toggleMute}
          title={audioMuted ? 'Unmute' : 'Mute'}
          aria-label={audioMuted ? 'Unmute sound' : 'Mute sound'}
          className="bg-white/50 backdrop-blur hover:bg-white p-3 rounded-full shadow-lg transition-all hover:scale-105"
        >
          {audioMuted
            ? <VolumeX size={24} className="text-gray-500" />
            : <Volume2 size={24} className="text-gray-700" />}
        </button>
      </div>

      {/* Cinematic vignette for depth */}
      {gameActive && !isFinished && (
        <div
          className="fixed inset-0 z-30 pointer-events-none transition-opacity duration-1000"
          style={{ boxShadow: 'inset 0 0 220px 50px rgba(0,0,0,0.45)' }}
        />
      )}

      {/* === JOURNEY HUD === */}
      {gameActive && !isFinished && !showIntro && (
        <>
          {/* Top progress rail with milestone markers */}
          <div className="fixed top-0 left-0 right-0 z-40 pointer-events-none">
            <div className="h-2 w-full bg-black/15 backdrop-blur-sm">
              <div
                className="h-full bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 transition-all duration-200 ease-out shadow-[0_0_12px_rgba(245,158,11,0.7)]"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            <div className="relative h-0">
              {stops.map(s => {
                const passed = journey.x >= s.xPosition - 60;
                const left = (s.xPosition / WORLD_WIDTH) * 100;
                const tint =
                  s.type === 'tea-stall' ? '#f97316' : s.type === 'link' ? '#3b82f6' : '#f59e0b';
                return (
                  <div
                    key={s.id}
                    className="absolute -top-[7px] -translate-x-1/2 pointer-events-auto group"
                    style={{ left: `${left}%` }}
                  >
                    <div
                      className={`w-3 h-3 rounded-full border-2 border-white shadow transition-transform group-hover:scale-150 ${passed ? '' : 'opacity-50'}`}
                      style={{ backgroundColor: passed ? tint : '#9ca3af' }}
                    />
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded-md bg-gray-900 text-white text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                      {s.title}
                    </div>
                  </div>
                );
              })}
              {/* Car marker */}
              <div
                className="absolute -top-[11px] -translate-x-1/2 transition-all duration-200 ease-out z-10"
                style={{ left: `${progress * 100}%` }}
              >
                <div className="w-6 h-6 rounded-full bg-red-600 border-2 border-white shadow-lg flex items-center justify-center text-[11px] leading-none">
                  🚙
                </div>
              </div>
            </div>
          </div>

          {/* Speedometer (desktop) */}
          <div className="hidden md:flex fixed bottom-8 left-8 z-40 flex-col gap-2 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/60 px-5 py-4 w-52">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-600">
                <Gauge size={18} className="text-orange-500" />
                <span className="font-display font-bold text-xs uppercase tracking-widest">Speed</span>
              </div>
              <span className="text-[10px] font-bold text-gray-400">
                {direction === 'right' ? '▶ FWD' : direction === 'left' ? '◀ REV' : '● IDLE'}
              </span>
            </div>
            <div className="flex items-end gap-1">
              <span className="font-display text-3xl font-black text-gray-800 tabular-nums leading-none">{speedKmh}</span>
              <span className="text-xs font-bold text-gray-400 mb-1">km/h</span>
            </div>
            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-400 via-amber-400 to-red-500 transition-all duration-150"
                style={{ width: `${speedPct}%` }}
              />
            </div>
          </div>

          {/* Next-stop navigator + milestone counter (desktop) */}
          <div className="hidden md:flex fixed bottom-8 left-1/2 -translate-x-1/2 z-40 items-stretch gap-3">
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/60 px-5 py-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-full bg-amber-100 text-amber-600">
                <Trophy size={18} />
              </div>
              <div className="leading-tight">
                <div className="font-display text-lg font-black text-gray-800 tabular-nums">
                  {passedCount}<span className="text-gray-400 text-sm"> / {stops.length}</span>
                </div>
                <div className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Stops Explored</div>
              </div>
            </div>

            {nextStop && (
              <div className="flex items-center gap-3 bg-gray-900/90 backdrop-blur-md rounded-2xl shadow-xl px-5 py-3 text-white">
                <Navigation size={18} className="text-amber-400 shrink-0" />
                <div className="leading-tight">
                  <div className="text-[10px] uppercase tracking-widest text-amber-400 font-bold flex items-center gap-1">
                    Next Stop <ChevronRight size={12} /> {distanceToNext}m
                  </div>
                  <div className="font-display font-bold text-sm truncate max-w-[180px]">{nextStop.title}</div>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* Finish Screen Overlay */}
      {isFinished && (
        <div className="absolute inset-0 z-50 bg-gradient-to-b from-black/70 to-black/90 backdrop-blur-md flex flex-col items-center justify-center text-white animate-fade-in px-6">
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-amber-500/20 border-2 border-amber-400 mb-6 animate-bounce">
            <Flag size={40} className="text-amber-400" />
          </div>
          <h2 className="font-display text-5xl md:text-6xl mb-3 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-500 drop-shadow-lg text-center">
            Journey Complete
          </h2>
          <p className="font-nunito text-lg md:text-xl mb-2 max-w-lg text-center text-gray-200">
            You explored <span className="font-bold text-amber-400">{stops.length}</span> milestones across the road of Prajval&apos;s story.
          </p>
          <p className="font-nunito text-sm mb-8 text-gray-400">The road goes on forever — there&apos;s always more being built.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={restartGame}
              className="bg-amber-500 hover:bg-amber-400 text-black font-bold py-4 px-8 rounded-full flex items-center justify-center gap-3 transition-transform hover:scale-105 shadow-xl"
            >
              <RotateCcw size={22} /> Drive Again
            </button>
            <button
              onClick={onBackToHome}
              className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold py-4 px-8 rounded-full flex items-center justify-center gap-3 transition-transform hover:scale-105"
            >
              <Home size={22} /> Back to Base
            </button>
          </div>
        </div>
      )}

      {/* Start Screen Overlay */}
      {!gameActive && !showIntro && !isFinished && (
        <div className="absolute inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-6">
          <div className="bg-white p-8 rounded-3xl shadow-2xl text-center max-w-md animate-fade-in border-4 border-amber-100">
            <div className="text-5xl mb-3">🚙💨</div>
            <h1 className="font-display text-4xl mb-2 text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">My Journey</h1>
            <p className="text-gray-600 mb-6 font-nunito">
              Drive through the life of Prajval Arora — from RC cars to AI robotics.
            </p>

            {/* Quick stats */}
            <div className="flex justify-center gap-3 mb-6">
              <div className="flex-1 bg-amber-50 rounded-xl py-3 border border-amber-100">
                <div className="font-display text-2xl font-black text-amber-600">{stops.length}</div>
                <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Milestones</div>
              </div>
              <div className="flex-1 bg-orange-50 rounded-xl py-3 border border-orange-100">
                <div className="font-display text-2xl font-black text-orange-600 flex items-center justify-center gap-1"><Zap size={18} /> Drive</div>
                <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">to explore</div>
              </div>
            </div>

            {/* Controls hint */}
            <div className="flex items-center justify-center gap-2 mb-6 text-gray-500 text-sm">
              <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded font-mono text-xs">←</kbd>
              <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded font-mono text-xs">→</kbd>
              <span>to drive</span>
              <span className="mx-1">•</span>
              <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded font-mono text-xs">⏎</kbd>
              <span>to enter</span>
            </div>

            <button
              onClick={handleStartClick}
              className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold py-4 px-8 rounded-full flex items-center gap-3 mx-auto transition-transform hover:scale-110 shadow-lg border-b-4 border-orange-700 active:border-b-0 active:translate-y-1"
            >
              <Play fill="currentColor" /> START ENGINE
            </button>
          </div>
        </div>
      )}

      {/* Interact Button */}
      {nearbyProject && !activeProject && gameActive && !isFinished && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-[140px] z-40 flex flex-col items-center gap-2 animate-[fade-in_0.3s_ease-out]">
          {/* Glowing pulse ring */}
          <div className="relative">
            <div
              className={`absolute inset-0 rounded-2xl blur-xl opacity-60 animate-pulse ${nearbyProject.type === 'tea-stall' ? 'bg-orange-500' :
                nearbyProject.type === 'link' ? 'bg-blue-500' : 'bg-amber-400'}`}
            />
            <button
              onClick={handleInteractionClick}
              className={`
                   relative font-bold py-3.5 px-6 rounded-2xl shadow-2xl flex items-center gap-3 border-b-4 transition-all hover:scale-105 active:border-b-0 active:translate-y-1
                   ${nearbyProject.type === 'tea-stall' ? 'bg-orange-600 hover:bg-orange-500 text-white border-orange-800' :
                  nearbyProject.type === 'link' ? 'bg-blue-600 hover:bg-blue-500 text-white border-blue-800' :
                    'bg-yellow-400 hover:bg-yellow-300 text-yellow-900 border-yellow-600'}
                `}
            >
              <span className="flex items-center justify-center w-9 h-9 rounded-full bg-white/25">
                {nearbyProject.type === 'tea-stall' ? <Coffee size={22} /> :
                  nearbyProject.type === 'link' ? <LinkIcon size={22} /> :
                    <Castle size={22} />}
              </span>
              <span className="flex flex-col items-start leading-tight">
                <span className="text-[10px] uppercase tracking-widest opacity-80">
                  {nearbyProject.type === 'link' ? 'External link' : 'Achievement unlocked'}
                </span>
                <span className="text-base">
                  {nearbyProject.type === 'link' ? 'Open Link' : nearbyProject.title}
                </span>
              </span>
              <span className={`text-[11px] font-black px-2.5 py-1.5 rounded-lg ml-1 ${nearbyProject.type === 'tea-stall' ? 'bg-orange-900/70 text-orange-100' :
                nearbyProject.type === 'link' ? 'bg-blue-900/70 text-blue-100' :
                  'bg-yellow-600/90 text-white'
                }`}>
                ENTER ⏎
              </span>
            </button>
          </div>
          {/* Pointer caret */}
          <div className="w-4 h-4 rotate-45 bg-gray-900/80 -mt-3" />
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

        {/* Mobile Controls (Always visible on small screens, or hidden on desktop via CSS if desired, 
            but for now we'll just show them as requested by "make complete site usable through smartphone") */}
        <div className="fixed bottom-4 left-0 right-0 z-50 flex items-end justify-center pointer-events-none md:hidden gap-12">
          {/* Directional Controls */}
          <div className="flex gap-8 pointer-events-auto pb-4">
            <button
              className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full border border-white/40 flex items-center justify-center active:bg-white/40 transition-colors"
              onTouchStart={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }))}
              onTouchEnd={() => window.dispatchEvent(new KeyboardEvent('keyup', { key: 'ArrowLeft' }))}
              onMouseDown={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }))}
              onMouseUp={() => window.dispatchEvent(new KeyboardEvent('keyup', { key: 'ArrowLeft' }))}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5" /><path d="M12 19l-7-7 7-7" /></svg>
            </button>
            <button
              className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full border border-white/40 flex items-center justify-center active:bg-white/40 transition-colors"
              onTouchStart={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }))}
              onTouchEnd={() => window.dispatchEvent(new KeyboardEvent('keyup', { key: 'ArrowRight' }))}
              onMouseDown={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }))}
              onMouseUp={() => window.dispatchEvent(new KeyboardEvent('keyup', { key: 'ArrowRight' }))}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5l7 7-7 7" /></svg>
            </button>
          </div>

          {/* Action Button (Enter) */}
          <div className="pointer-events-auto pb-4 absolute right-6 bottom-4">
            {nearbyProject && (
              <button
                className="w-20 h-20 bg-amber-500/80 backdrop-blur-md rounded-full border-4 border-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.5)] flex items-center justify-center active:scale-95 transition-transform animate-pulse"
                onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))}
              >
                <div className="text-white font-bold text-xs text-center leading-tight">ENTER<br />ZONE</div>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
