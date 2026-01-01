
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { PROJECTS, HISTORY, Project, HistoryMarker } from '../constants';
import { Power, ZoomIn, ZoomOut, Cpu, X, ExternalLink, Trophy, Zap, Radio, Coffee, ArrowUpRight, PlayCircle, ArrowLeft, ArrowRight, StopCircle } from 'lucide-react';

interface HomePageProps {
  onStart: () => void;
}

interface CanvasNode {
  id: string;
  x: number;
  y: number;
  data: Project | HistoryMarker;
  type: 'project' | 'history' | 'link' | 'tea-stall';
  pinStart: { x: number; y: number; side: 'top' | 'bottom' | 'left' | 'right' };
}

interface DecorItem {
  id: string;
  x: number;
  y: number;
  type: 'capacitor' | 'resistor' | 'chip' | 'vent';
  rotation: number;
  scale: number;
}

export const HomePage: React.FC<HomePageProps> = ({ onStart }) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 }); 
  const [zoom, setZoom] = useState(0.8);
  const [isDragging, setIsDragging] = useState(false);
  const [activeItem, setActiveItem] = useState<Project | HistoryMarker | null>(null);
  
  // Animation States
  const [showAutopilotBtn, setShowAutopilotBtn] = useState(false);
  const [isBooting, setIsBooting] = useState(false);

  // Walkthrough State
  const [walkthroughMode, setWalkthroughMode] = useState(false);
  const [walkthroughIndex, setWalkthroughIndex] = useState(0);

  const lastMouse = useRef({ x: 0, y: 0 });
  const [nodes, setNodes] = useState<CanvasNode[]>([]);
  const [decor, setDecor] = useState<DecorItem[]>([]);

  // CPU Dimensions for Pin Calculation
  const CPU_SIZE = 360; 
  const HALF_CPU = CPU_SIZE / 2;

  // Filter nodes for the walkthrough
  const walkthroughNodes = useMemo(() => {
    return nodes.filter(n => n.type === 'project' || n.type === 'tea-stall' || n.type === 'link');
  }, [nodes]);

  useEffect(() => {
    // Initial Center
    setOffset({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

    // Reveal Autopilot button after a delay
    const t = setTimeout(() => setShowAutopilotBtn(true), 1000);

    // 1. Generate Content Nodes (Spiral Layout)
    const generatedNodes: CanvasNode[] = [];
    const allItems = [...PROJECTS, ...HISTORY];
    
    let angle = 0;
    let radius = 550; // Increased starting radius to clear the big CPU
    
    allItems.forEach((item, index) => {
       const x = Math.cos(angle) * radius;
       const y = Math.sin(angle) * radius;
       
       // Calculate Pin Position on CPU
       let pinX = 0, pinY = 0;
       let side: CanvasNode['pinStart']['side'] = 'right';
       
       const deg = (angle * 180 / Math.PI) % 360;
       const normalizedDeg = deg < 0 ? deg + 360 : deg;

       // Basic logic to attach wire to closest face
       if (normalizedDeg >= 315 || normalizedDeg < 45) { // Right
           side = 'right';
           pinX = HALF_CPU;
           pinY = (Math.tan(angle) * HALF_CPU); 
       } else if (normalizedDeg >= 45 && normalizedDeg < 135) { // Bottom
           side = 'bottom';
           pinY = HALF_CPU;
           pinX = (1 / Math.tan(angle)) * HALF_CPU;
       } else if (normalizedDeg >= 135 && normalizedDeg < 225) { // Left
           side = 'left';
           pinX = -HALF_CPU;
           pinY = -(Math.tan(angle) * HALF_CPU);
       } else { // Top
           side = 'top';
           pinY = -HALF_CPU;
           pinX = -(1 / Math.tan(angle)) * HALF_CPU;
       }

       // Clamp pins to not exceed corners
       pinX = Math.max(-HALF_CPU + 20, Math.min(HALF_CPU - 20, pinX));
       pinY = Math.max(-HALF_CPU + 20, Math.min(HALF_CPU - 20, pinY));

       let type: CanvasNode['type'] = 'history';
       if ('type' in item) type = item.type as any;
       else if ('isPoster' in item && item.isPoster) type = 'history'; 

       generatedNodes.push({
         id: item.id,
         x,
         y,
         data: item,
         type,
         pinStart: { x: pinX, y: pinY, side }
       });

       angle += 0.6; // Wider spiral spacing
       radius += 40 + (index * 2);
    });
    setNodes(generatedNodes);

    // 2. Generate Random Decor (Components)
    const newDecor: DecorItem[] = [];
    for(let i=0; i<40; i++) {
        const dist = 500 + Math.random() * 1500;
        const theta = Math.random() * Math.PI * 2;
        newDecor.push({
            id: `dec-${i}`,
            x: Math.cos(theta) * dist,
            y: Math.sin(theta) * dist,
            type: Math.random() > 0.7 ? 'chip' : Math.random() > 0.4 ? 'capacitor' : 'resistor',
            rotation: Math.floor(Math.random() * 4) * 90,
            scale: 0.5 + Math.random()
        });
    }
    setDecor(newDecor);

    return () => clearTimeout(t);
  }, []);

  // --- Walkthrough Logic ---
  const focusNode = (index: number) => {
      const node = walkthroughNodes[index];
      if (!node) return;

      const targetZoom = 1.3;
      const screenW = window.innerWidth;
      const screenH = window.innerHeight;

      const newX = (screenW / 2) - (node.x * targetZoom);
      const newY = (screenH / 2) - (node.y * targetZoom);

      setZoom(targetZoom);
      setOffset({ x: newX, y: newY });
  };

  const startWalkthrough = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (walkthroughNodes.length === 0) return;
      setWalkthroughMode(true);
      setWalkthroughIndex(0);
      focusNode(0);
  };

  const nextStep = () => {
      const next = (walkthroughIndex + 1) % walkthroughNodes.length;
      setWalkthroughIndex(next);
      focusNode(next);
  };

  const prevStep = () => {
      const prev = (walkthroughIndex - 1 + walkthroughNodes.length) % walkthroughNodes.length;
      setWalkthroughIndex(prev);
      focusNode(prev);
  };

  const exitWalkthrough = () => {
      setWalkthroughMode(false);
      // Smoothly fly back to center
      setOffset({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
      setZoom(0.8);
  };

  const handleBootSequence = (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsBooting(true);
      // Zoom aggressively into the center (CPU)
      setOffset({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
      setZoom(15); 
      
      // Navigate after animation
      setTimeout(() => {
          onStart();
      }, 1200);
  };

  // --- Controls ---
  const handleWheel = (e: React.WheelEvent) => {
    if (walkthroughMode || isBooting) return; 
    const scaleAmount = -e.deltaY * 0.001;
    setZoom(z => Math.min(Math.max(z + scaleAmount, 0.3), 2.5));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (walkthroughMode || isBooting) return;
    setIsDragging(true);
    lastMouse.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - lastMouse.current.x;
    const dy = e.clientY - lastMouse.current.y;
    setOffset(prev => ({ x: prev.x + dx, y: prev.y + dy }));
    lastMouse.current = { x: e.clientX, y: e.clientY };
  };

  return (
    <div 
      className="w-full h-screen bg-[#101214] relative overflow-hidden text-white font-nunito selection:bg-amber-500/30"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onWheel={handleWheel}
      style={{ cursor: isDragging ? 'grabbing' : 'default' }}
    >
      {/* Boot Overlay (Flash to White) */}
      <div 
        className={`fixed inset-0 bg-white pointer-events-none z-[100] transition-opacity duration-1000 ease-in ${isBooting ? 'opacity-100' : 'opacity-0'}`}
      ></div>

      {/* 1. PCB Base Texture */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
            backgroundImage: 'radial-gradient(#333 1px, transparent 1px)',
            backgroundSize: `${40 * zoom}px ${40 * zoom}px`, 
            backgroundPosition: `${offset.x}px ${offset.y}px`
        }}
      ></div>

      {/* Infinite Canvas */}
      <div 
        // Transition enabled when NOT dragging for smooth resets/walkthroughs
        className={`absolute inset-0 origin-top-left will-change-transform ${!isDragging ? 'transition-transform duration-1000 cubic-bezier(0.25, 1, 0.5, 1)' : ''}`}
        style={{ transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})` }}
      >
        
        {/* DECOR: Random Electronic Components in Background */}
        {decor.map(d => (
            <div 
                key={d.id}
                className="absolute opacity-40 pointer-events-none"
                style={{
                    left: d.x, top: d.y,
                    transform: `translate(-50%, -50%) rotate(${d.rotation}deg) scale(${d.scale})`
                }}
            >
                {d.type === 'chip' && (
                    <div className="w-24 h-16 bg-[#1a1a1a] border border-gray-700 rounded flex items-center justify-center">
                        <div className="w-full h-[1px] bg-gray-600 absolute top-2"></div>
                        <div className="w-full h-[1px] bg-gray-600 absolute bottom-2"></div>
                        <span className="text-[10px] text-gray-600 font-mono rotate-90">IC-{d.id.slice(4)}</span>
                    </div>
                )}
                {d.type === 'capacitor' && (
                    <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-[#263238] border-2 border-gray-600"></div>
                        <div className="text-[8px] text-gray-600 mt-1">100µF</div>
                    </div>
                )}
                {d.type === 'resistor' && (
                    <div className="w-16 h-4 bg-[#3E2723] rounded-full border border-gray-800 flex justify-around items-center px-2">
                         <div className="w-1 h-full bg-yellow-600"></div>
                         <div className="w-1 h-full bg-purple-600"></div>
                         <div className="w-1 h-full bg-black"></div>
                         <div className="w-1 h-full bg-yellow-600"></div>
                    </div>
                )}
            </div>
        ))}

        {/* WIRES: Traces on the PCB */}
        <svg className="absolute overflow-visible -top-[5000px] -left-[5000px] w-[10000px] h-[10000px]" style={{ pointerEvents: 'none' }}>
           <g transform="translate(5000, 5000)">
           {nodes.map((node) => {
               // Orthogonal Routing: Start from Pin, Go Outwards, Turn to Node
               const startX = node.pinStart.x;
               const startY = node.pinStart.y;
               const endX = node.x;
               const endY = node.y;

               // Trace color based on type
               const strokeColor = node.type === 'history' ? '#444' : '#F59E0B'; // Amber for active, Dark for history
               const opacity = node.type === 'history' ? 0.3 : 0.6;
               const width = node.type === 'history' ? 1 : 2;

               // Simple Manhattan Path
               let d = `M ${startX} ${startY} `;
               const offsetOut = 50; 

               if (node.pinStart.side === 'right') {
                   d += `L ${startX + offsetOut} ${startY} L ${startX + offsetOut} ${endY} L ${endX} ${endY}`;
               } else if (node.pinStart.side === 'left') {
                   d += `L ${startX - offsetOut} ${startY} L ${startX - offsetOut} ${endY} L ${endX} ${endY}`;
               } else if (node.pinStart.side === 'bottom') {
                   d += `L ${startX} ${startY + offsetOut} L ${endX} ${startY + offsetOut} L ${endX} ${endY}`;
               } else { // top
                   d += `L ${startX} ${startY - offsetOut} L ${endX} ${startY - offsetOut} L ${endX} ${endY}`;
               }

               return (
                   <path 
                     key={`wire-${node.id}`} 
                     d={d}
                     stroke={strokeColor} 
                     strokeWidth={width}
                     fill="none" 
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     opacity={opacity}
                   />
               );
           })}
           </g>
        </svg>

        {/* CENTRAL PROCESSOR (Clickable Start) */}
        <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-20">
             {/* Heatspreader */}
             <div className="w-[360px] h-[360px] bg-gradient-to-br from-[#e0e0e0] to-[#b0b0b0] rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-[#999] relative flex flex-col items-center justify-center">
                  
                  {/* Metallic Texture Overlay */}
                  <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')] rounded-xl pointer-events-none"></div>
                  
                  {/* Gold Pins Frame */}
                  <div className="absolute -inset-2 border-4 border-dashed border-amber-600/40 rounded-xl pointer-events-none"></div>

                  {/* Mounting Screws */}
                  <div className="absolute top-3 left-3 w-4 h-4 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 shadow-inner flex items-center justify-center"><div className="w-2 h-0.5 bg-gray-600 rotate-45"></div></div>
                  <div className="absolute top-3 right-3 w-4 h-4 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 shadow-inner flex items-center justify-center"><div className="w-2 h-0.5 bg-gray-600 rotate-45"></div></div>
                  <div className="absolute bottom-3 left-3 w-4 h-4 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 shadow-inner flex items-center justify-center"><div className="w-2 h-0.5 bg-gray-600 rotate-45"></div></div>
                  <div className="absolute bottom-3 right-3 w-4 h-4 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 shadow-inner flex items-center justify-center"><div className="w-2 h-0.5 bg-gray-600 rotate-45"></div></div>

                  {/* Logo / Text Area */}
                  <div className="w-3/4 h-3/4 border border-gray-400/50 rounded flex flex-col items-center justify-center p-6 relative">
                      <div className="absolute top-4 right-4 flex gap-1">
                          <div className="w-1 h-1 bg-black rounded-full"></div>
                          <div className="w-1 h-1 bg-black rounded-full"></div>
                          <div className="w-1 h-1 bg-black rounded-full"></div>
                      </div>
                      
                      <h1 className="font-display text-4xl font-black text-gray-800 tracking-tighter mb-1 text-center leading-none">
                          PRAJVAL<br/>ARORA
                      </h1>
                      <div className="w-full h-px bg-gray-400 my-2"></div>
                      <p className="font-mono text-[10px] text-gray-600 tracking-widest uppercase mb-6">
                          Architecture: CREATIVE_CHAOS
                      </p>

                      <div className="flex flex-col gap-3 w-full">
                          <button 
                            onClick={handleBootSequence}
                            className="group relative w-full px-4 py-3 bg-black text-amber-500 font-bold font-mono rounded overflow-hidden shadow-lg transition-all hover:scale-105 hover:shadow-amber-500/20 active:scale-95 border border-amber-900/30"
                          >
                              <div className="absolute inset-0 bg-amber-500/10 translate-y-full group-hover:translate-y-0 transition-transform"></div>
                              <div className="relative flex items-center justify-center gap-2">
                                  <Power size={18} />
                                  <span>BOOT_SEQUENCE</span>
                              </div>
                          </button>

                          <div className={`transition-all duration-700 cubic-bezier(0.34, 1.56, 0.64, 1) ${showAutopilotBtn ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-50'}`}>
                              <button 
                                onClick={startWalkthrough}
                                className="group relative w-full px-4 py-2 bg-gray-200 text-gray-800 font-bold font-mono rounded overflow-hidden shadow transition-all hover:bg-white hover:scale-105 active:scale-95 text-xs flex items-center justify-center gap-2"
                              >
                                  <PlayCircle size={16} className="text-blue-600" />
                                  <span>AUTO_PILOT</span>
                              </button>
                          </div>
                      </div>

                  </div>
             </div>
        </div>

        {/* NODES: Detailed Info Boxes */}
        {nodes.map(node => (
            <div 
                key={node.id}
                className="absolute"
                style={{ 
                    left: node.x, top: node.y,
                    transform: 'translate(-50%, -50%)',
                    zIndex: 10 
                }}
            >
                {/* Soldering Pad / Joint */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-amber-500 rounded-full border-2 border-black z-0 shadow-[0_0_10px_#F59E0B]"></div>
                
                {/* Render Logic */}
                {renderNode(node, () => setActiveItem(node.data))}
            </div>
        ))}
        
      </div>

      {/* --- HUD --- */}
      {!walkthroughMode && (
          <div className="fixed top-6 left-6 z-50 pointer-events-none">
             <div className="bg-black/90 backdrop-blur border-l-4 border-amber-500 p-4 rounded-r-lg shadow-2xl pointer-events-auto">
                 <div className="flex items-center gap-2 text-amber-500 font-mono text-xs mb-1">
                     <Cpu size={14} />
                     <span>SYSTEM_MONITOR</span>
                 </div>
                 <p className="text-gray-400 text-xs font-mono leading-relaxed">
                     &gt; CPU: ONLINE <br/>
                     &gt; MEMORY: 100% CREATIVITY <br/>
                     &gt; ZOOM_LEVEL: {Math.round(zoom * 100)}%
                 </p>
             </div>
          </div>
      )}

      {/* --- WALKTHROUGH CONTROLS --- */}
      {walkthroughMode && walkthroughNodes.length > 0 && (
          <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-2 bg-black/80 backdrop-blur border border-amber-500/50 p-2 rounded-full shadow-2xl animate-fade-in-up">
              <button 
                onClick={prevStep}
                className="p-3 bg-gray-800 hover:bg-gray-700 text-white rounded-full transition-colors border border-gray-600"
              >
                  <ArrowLeft size={20} />
              </button>

              <div className="flex flex-col items-center justify-center px-6 min-w-[200px]">
                   <span className="text-[10px] text-gray-400 font-mono uppercase tracking-widest mb-1">
                       Tour Step {walkthroughIndex + 1} / {walkthroughNodes.length}
                   </span>
                   <span className="text-sm font-bold text-amber-500 whitespace-nowrap">
                       {walkthroughNodes[walkthroughIndex].data.title}
                   </span>
              </div>

              <button 
                onClick={nextStep}
                className="p-3 bg-gray-800 hover:bg-gray-700 text-white rounded-full transition-colors border border-gray-600"
              >
                  <ArrowRight size={20} />
              </button>

              <div className="h-8 w-px bg-gray-700 mx-2"></div>

              <button 
                onClick={exitWalkthrough}
                className="p-3 bg-red-900/80 hover:bg-red-800 text-white rounded-full transition-colors border border-red-700 flex items-center gap-2 px-4"
              >
                  <StopCircle size={18} />
                  <span className="text-xs font-bold">EXIT</span>
              </button>
          </div>
      )}

      {!walkthroughMode && (
          <div className="fixed bottom-8 right-8 z-50 flex gap-2 pointer-events-auto">
              <button onClick={() => setZoom(z => Math.max(z - 0.2, 0.3))} className="p-3 bg-gray-900 text-gray-300 hover:text-white rounded-lg border border-gray-700 shadow-lg"><ZoomOut size={20} /></button>
              <button onClick={() => { setOffset({x: window.innerWidth/2, y: window.innerHeight/2}); setZoom(0.8); }} className="px-4 bg-amber-900/20 text-amber-500 border border-amber-900/50 hover:bg-amber-900/40 rounded-lg font-mono text-xs font-bold tracking-wider">RESET</button>
              <button onClick={() => setZoom(z => Math.min(z + 0.2, 2.5))} className="p-3 bg-gray-900 text-gray-300 hover:text-white rounded-lg border border-gray-700 shadow-lg"><ZoomIn size={20} /></button>
          </div>
      )}

      {/* --- DETAIL MODAL --- */}
      {activeItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in" onClick={() => setActiveItem(null)}>
              <div 
                className="bg-[#1a1a1a] w-full max-w-3xl rounded-xl border border-gray-700 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[90vh]"
                onClick={e => e.stopPropagation()}
              >
                  {/* Modal Header */}
                  <div className="p-6 border-b border-gray-800 flex justify-between items-start" style={{ backgroundColor: 'color' in activeItem ? activeItem.color + '20' : '#333' }}>
                      <div>
                          <span className="text-xs font-mono text-gray-400 px-2 py-1 rounded border border-gray-600 mb-2 inline-block">
                             ID: {activeItem.id.toUpperCase()}
                          </span>
                          <h2 className="text-3xl font-display font-bold text-white leading-tight">
                              {activeItem.title}
                          </h2>
                      </div>
                      <button onClick={() => setActiveItem(null)} className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors">
                          <X size={24} />
                      </button>
                  </div>
                  
                  {/* Modal Body */}
                  <div className="p-8 overflow-y-auto">
                      <p className="text-lg text-gray-300 leading-relaxed font-nunito mb-6">
                           {'details' in activeItem ? activeItem.details : 'text' in activeItem ? activeItem.text : activeItem.description}
                      </p>

                      {'tech' in activeItem && activeItem.tech && (
                          <div className="mb-8">
                              <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3">Technologies</h4>
                              <div className="flex flex-wrap gap-2">
                                  {activeItem.tech.map((t: string) => (
                                      <span key={t} className="px-3 py-1 bg-black border border-gray-700 rounded text-sm text-gray-300 font-mono">
                                          {t}
                                      </span>
                                  ))}
                              </div>
                          </div>
                      )}
                      
                      {/* Action Bar */}
                      <div className="flex gap-4 pt-4 border-t border-gray-800">
                          {'link' in activeItem && activeItem.link && (
                              <a 
                                href={activeItem.link} 
                                target="_blank" 
                                rel="noreferrer"
                                className="flex-1 bg-amber-600 hover:bg-amber-500 text-white font-bold py-3 rounded text-center flex items-center justify-center gap-2 transition-colors"
                              >
                                  <ExternalLink size={18} /> Visit External Link
                              </a>
                          )}
                           <button 
                                onClick={() => setActiveItem(null)} 
                                className="px-6 py-3 border border-gray-600 text-gray-400 hover:text-white hover:border-gray-400 rounded transition-colors"
                           >
                               Close Data Stream
                           </button>
                      </div>
                  </div>
              </div>
          </div>
      )}

    </div>
  );
};

// --- RENDER HELPERS ---

function renderNode(node: CanvasNode, onClick: () => void) {
    const isHistory = node.type === 'history';
    const isTea = node.type === 'tea-stall';
    // Use data color or default
    const color = 'color' in node.data ? node.data.color : '#607D8B';

    if (isHistory) {
        return (
            <div 
                onClick={onClick}
                className="group cursor-pointer relative ml-8"
            >
                {/* Connector Trace */}
                <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-8 h-[2px] bg-gray-700 group-hover:bg-gray-500 transition-colors"></div>
                
                {/* Chip Body */}
                <div className="bg-[#263238] border border-gray-600 w-48 p-3 rounded-sm shadow-xl transition-transform hover:scale-105 hover:border-gray-400">
                    <div className="flex items-center gap-2 mb-2">
                         <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                         <span className="text-[9px] font-mono text-gray-400">LOG_MEMORY</span>
                    </div>
                    <h3 className="text-sm font-bold text-gray-200 leading-tight">{node.data.title}</h3>
                </div>
            </div>
        );
    }

    // Projects / Main Items
    return (
        <div 
            onClick={onClick}
            className="group cursor-pointer relative ml-12"
        >
             {/* Connector Trace */}
             <div className="absolute -left-12 top-1/2 -translate-y-1/2 w-12 h-[2px] bg-amber-700 group-hover:bg-amber-500 transition-colors"></div>

             {/* Chip Visual */}
             <div className="relative bg-[#0d0d0d] w-80 rounded-md border-l-4 shadow-2xl transition-all duration-300 group-hover:shadow-[0_0_30px_rgba(245,158,11,0.2)] group-hover:-translate-y-1" style={{ borderColor: color }}>
                  
                  {/* Top Label Bar */}
                  <div className="bg-[#1a1a1a] px-4 py-2 flex justify-between items-center border-b border-gray-800">
                      <div className="flex items-center gap-2">
                          {isTea ? <Coffee size={14} className="text-orange-400" /> : 
                           node.type === 'link' ? <ExternalLink size={14} className="text-blue-400" /> : 
                           <Zap size={14} className="text-yellow-400" />}
                          <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">{node.type}</span>
                      </div>
                      <ArrowUpRight size={14} className="text-gray-600 group-hover:text-white transition-colors" />
                  </div>

                  {/* Main Content */}
                  <div className="p-5">
                      <h3 className="text-xl font-display font-bold text-white mb-2 leading-none group-hover:text-amber-500 transition-colors">
                          {node.data.title}
                      </h3>
                      <p className="text-xs text-gray-400 leading-relaxed line-clamp-2 mb-4 font-nunito">
                          {'description' in node.data ? node.data.description : ''}
                      </p>
                      
                      {/* Tech Chips */}
                      {'tech' in node.data && node.data.tech && (
                          <div className="flex flex-wrap gap-1.5">
                              {node.data.tech.slice(0, 3).map((t: string) => (
                                  <span key={t} className="text-[9px] px-1.5 py-0.5 bg-[#222] text-gray-500 border border-gray-800 rounded font-mono group-hover:border-gray-600 group-hover:text-gray-300 transition-colors">
                                      {t}
                                  </span>
                              ))}
                              {node.data.tech.length > 3 && (
                                  <span className="text-[9px] px-1.5 py-0.5 text-gray-600 font-mono">+{node.data.tech.length - 3}</span>
                              )}
                          </div>
                      )}
                  </div>

                  {/* Decorative Pins on Right Side */}
                  <div className="absolute right-0 top-4 bottom-4 w-1 flex flex-col justify-around">
                      {[1,2,3,4].map(i => <div key={i} className="h-2 w-1 bg-gray-700 rounded-l-sm"></div>)}
                  </div>
             </div>
        </div>
    );
}
