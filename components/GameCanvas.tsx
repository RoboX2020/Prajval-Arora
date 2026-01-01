
import React, { useEffect, useRef } from 'react';
import { PROJECTS, HISTORY, WORLD_WIDTH, Project } from '../constants';
import { generateRadioIntro } from '../services/geminiService';

interface GameCanvasProps {
  onMessage: (msg: string) => void;
  onProjectProximity: (project: Project | null) => void;
  onFinish: () => void;
  gameActive: boolean;
  isPaused: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
  color: string;
}

interface Cloud {
  x: number;
  y: number;
  scale: number;
  speed: number;
  opacity: number;
}

export const GameCanvas: React.FC<GameCanvasProps> = ({ onMessage, onProjectProximity, onFinish, gameActive, isPaused }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const finishedRef = useRef(false);
  
  // Game State
  const carState = useRef({
    x: 200,
    y: 0,
    velocity: 0,
    wheelAngle: 0, 
    chassisAngle: 0,
    gasPedal: 0,
  });

  const camera = useRef({ x: 0, y: 0 });
  const keys = useRef({ left: false, right: false });
  const lastProjectAnnounced = useRef<string | null>(null);
  
  // Visual Systems
  const particles = useRef<Particle[]>([]);
  const clouds = useRef<Cloud[]>([]);

  // Initialize Clouds
  useEffect(() => {
    const newClouds: Cloud[] = [];
    for(let i=0; i<25; i++) {
        newClouds.push({
            x: Math.random() * 4000,
            y: 50 + Math.random() * 300,
            scale: 0.5 + Math.random() * 2,
            speed: 0.1 + Math.random() * 0.4,
            opacity: 0.4 + Math.random() * 0.6
        });
    }
    clouds.current = newClouds;
  }, []);

  // Terrain Generation
  const getTerrainHeight = (x: number) => {
    // Flatten terrain near ANY project or tea stall
    for (const p of PROJECTS) {
        if (p.type === 'history') continue; 
        const dist = Math.abs(x - p.xPosition);
        if (dist < 800) { // Wider bridge
            const bridgeHeight = 350; 
            if (dist < 500) return bridgeHeight; 
            const t = (dist - 500) / 300; 
            const noise = getBaseTerrain(x);
            return bridgeHeight * (1 - t) + noise * t;
        }
    }
    return getBaseTerrain(x);
  };

  const getBaseTerrain = (x: number) => {
    const base = 400; 
    const h1 = Math.sin(x * 0.001) * 200;
    const h2 = Math.sin(x * 0.003) * 80;
    const h3 = Math.sin(x * 0.01) * 15;
    const h4 = Math.sin(x * 0.05) * 4;
    return base + h1 + h2 + h3 + h4;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') keys.current.right = true;
      if (e.key === 'ArrowLeft') keys.current.left = true;
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') keys.current.right = false;
      if (e.key === 'ArrowLeft') keys.current.left = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !gameActive) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const render = () => {
      time += 0.05;
      const state = carState.current;
      
      if (!isPaused) {
          // --- PHYSICS ---
          const ACCEL = 0.5; 
          const MAX_SPEED = 35; 
          const FRICTION = 0.98;

          if (keys.current.right) {
            state.velocity += ACCEL;
            state.gasPedal = Math.min(state.gasPedal + 0.1, 1);
          } else if (keys.current.left) {
            state.velocity -= ACCEL;
            state.gasPedal = Math.max(state.gasPedal - 0.1, -1);
          } else {
            state.gasPedal *= 0.9; 
          }

          state.velocity *= FRICTION;
          
          if (state.velocity > MAX_SPEED) state.velocity = MAX_SPEED;
          if (state.velocity < -MAX_SPEED) state.velocity = -MAX_SPEED;

          state.x += state.velocity;
          if (state.x < 100) { state.x = 100; state.velocity = 0; }
          
          // Finish Logic
          if (state.x > WORLD_WIDTH - 200 && !finishedRef.current) {
             finishedRef.current = true;
             onFinish();
          }
          if (state.x > WORLD_WIDTH) { state.x = WORLD_WIDTH; state.velocity = 0; }

          const wheelBase = 70;
          const rearWheelX = state.x - wheelBase/2;
          const frontWheelX = state.x + wheelBase/2;
          const rearY = getTerrainHeight(rearWheelX);
          const frontY = getTerrainHeight(frontWheelX);
          const targetAngle = Math.atan2(frontY - rearY, wheelBase);
          const accelSquat = state.gasPedal * -0.25; 

          state.chassisAngle = state.chassisAngle * 0.8 + (targetAngle + accelSquat) * 0.2;
          const targetY = (rearY + frontY) / 2;
          const bounce = Math.sin(time * 8) * Math.abs(state.velocity) * 0.05; 
          const suspensionOffset = Math.sin(time * 2) * Math.abs(state.velocity) * 0.1; 
          state.y = targetY + bounce + suspensionOffset - 65; // Lifted truck
          state.wheelAngle += state.velocity * 0.15;

          // --- PARTICLES ---
          // Exhaust
          if (Math.abs(state.velocity) > 1) {
              particles.current.push({
                  x: state.x - 65,
                  y: state.y - 15,
                  vx: -state.velocity * 0.5 - 2,
                  vy: -1 + Math.random() * 2,
                  life: 1.0,
                  size: 5 + Math.random() * 5,
                  color: 'rgba(150, 150, 150,'
              });
              // Dust from tires
              if (Math.random() > 0.5) {
                   particles.current.push({
                      x: state.x - 40,
                      y: rearY,
                      vx: -state.velocity * 0.2,
                      vy: -Math.random() * 3,
                      life: 0.6,
                      size: 2 + Math.random() * 4,
                      color: 'rgba(93, 64, 55,' // Brown dust
                  });
              }
          }
      }

      // Update Particles
      for(let i = particles.current.length - 1; i >= 0; i--) {
          const p = particles.current[i];
          p.x += p.vx;
          p.y += p.vy;
          p.life -= 0.02;
          p.size *= 1.02;
          if (p.life <= 0) particles.current.splice(i, 1);
      }

      // Update Clouds
      clouds.current.forEach(c => {
          c.x += c.speed;
          if (c.x > WORLD_WIDTH + 4000) c.x = -500;
      });


      // --- LOGIC ---
      PROJECTS.forEach(p => {
        if (p.type === 'history') return;
        const dist = Math.abs(state.x - p.xPosition);
        if (dist < 800 && lastProjectAnnounced.current !== p.id) {
          lastProjectAnnounced.current = p.id;
          generateRadioIntro(p.title, p.description).then(intro => {
             onMessage(intro);
          });
        }
      });

      let foundProject: Project | null = null;
      for (const p of PROJECTS) {
          // Links and Projects have proximity radius
          if (Math.abs(state.x - p.xPosition) < 300) {
              foundProject = p;
              break;
          }
      }
      onProjectProximity(foundProject);

      // --- CAMERA ---
      const targetCamX = state.x - canvas.width * 0.4;
      const targetCamY = state.y - canvas.height * 0.65;
      camera.current.x += (targetCamX - camera.current.x) * 0.1;
      camera.current.y += (targetCamY - camera.current.y) * 0.05;
      const camX = camera.current.x;
      const camY = camera.current.y;

      // --- DRAWING ---
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // 1. Sky Gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#0288D1'); // Deeper Sky
      gradient.addColorStop(1, '#B3E5FC');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Sun with Glow
      ctx.save();
      ctx.fillStyle = '#FFEB3B';
      ctx.shadowColor = 'rgba(255, 235, 59, 0.5)';
      ctx.shadowBlur = 80;
      ctx.beginPath();
      ctx.arc(canvas.width - 150, 100, 70, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 2. Parallax Background & Clouds
      ctx.save();
      
      const paraX = camX * 0.1; 
      const paraY = camY * 0.1;
      
      // Draw Clouds (Slowest layer)
      ctx.translate(-paraX * 0.5, -paraY * 0.5); 
      clouds.current.forEach(c => {
          // Visually loop clouds based on camera position for infinite feel
          const relativeX = (c.x - paraX * 0.5); 
          // Only draw if roughly on screen (optimization)
          if (relativeX > -500 && relativeX < canvas.width + 500) {
             drawCloud(ctx, c.x, c.y, c.scale, c.opacity);
          } else {
             // Hacky loop for clouds to ensure they appear
             drawCloud(ctx, (c.x % 4000) + Math.floor(paraX/4000)*4000, c.y, c.scale, c.opacity);
          }
      });
      
      // Reset transform for Mountains
      ctx.setTransform(1, 0, 0, 1, 0, 0); 
      ctx.translate(-paraX, -paraY + 150); 
      
      // Distant Mountains
      ctx.fillStyle = '#5C6BC0'; // Purple-ish Blue
      ctx.beginPath();
      ctx.moveTo(paraX - 100, 1000); 
      const paraWidth = canvas.width + 1000;
      const startPara = Math.floor(paraX / 1000) * 1000 - 1000;

      // Draw wider range to prevent popping
      for (let i = startPara; i < startPara + paraWidth + 2000; i += 80) {
        const h = Math.sin(i * 0.005) * 400 - 150 + Math.abs(Math.sin(i*0.015) * 80);
        ctx.lineTo(i, h);
      }
      ctx.lineTo(startPara + paraWidth + 2000, 1000);
      ctx.lineTo(startPara, 1000);
      ctx.fill();

      // Closer Mountains
      ctx.fillStyle = '#42A5F5'; 
      ctx.beginPath();
      ctx.moveTo(startPara, 1000); 
      for (let i = startPara; i < startPara + paraWidth + 2000; i += 40) {
        const h = Math.sin(i * 0.008 + 100) * 200 + 50 + Math.abs(Math.sin(i*0.03) * 30);
        ctx.lineTo(i, h);
      }
      ctx.lineTo(startPara + paraWidth + 2000, 1000);
      ctx.fill();

      // Achievement Posters in Background (The Mega Billboards)
      HISTORY.forEach(h => {
        if (h.isPoster) {
            drawPoster(ctx, h.xPosition, 150, h.title, h.text);
        }
      });

      // Special handling for Link/History projects that need to look like Posters
      PROJECTS.forEach(p => {
          if (p.type === 'link' || p.id === 'h1_poster') {
             // Draw links as posters in background layer
             drawPoster(ctx, p.xPosition, 150, p.title, p.description);
          }
      });

      ctx.restore();

      // 3. Main World
      ctx.save();
      ctx.translate(-camX, -camY);

      // Landscape
      const startDraw = Math.floor(camX / 20) * 20 - 100;
      const endDraw = startDraw + canvas.width + 300;
      
      ctx.beginPath();
      ctx.moveTo(startDraw, 5000);
      for (let x = startDraw; x <= endDraw; x += 20) {
        ctx.lineTo(x, getTerrainHeight(x));
      }
      ctx.lineTo(endDraw, 5000);
      ctx.lineTo(startDraw, 5000);
      
      // Textured Ground
      const groundGrad = ctx.createLinearGradient(0, camY, 0, camY + canvas.height);
      groundGrad.addColorStop(0, '#689F38'); 
      groundGrad.addColorStop(0.3, '#33691E'); 
      groundGrad.addColorStop(1, '#1B5E20');
      ctx.fillStyle = groundGrad;
      ctx.fill();
      
      // Top Edge with "Grass" noise
      ctx.lineWidth = 6;
      ctx.strokeStyle = '#33691E'; 
      ctx.stroke();

      // HOLLYWOOD SIGN (Attached to Grass)
      const signX = 1000;
      const signY = getTerrainHeight(signX);
      drawHollywoodSign(ctx, signX, signY);

      // Environment Objects (Trees & Rocks)
      const pseudoRandom = (input: number) => Math.abs(Math.sin(input * 12.9898) * 43758.5453) % 1;
      for (let x = Math.floor(startDraw / 50) * 50; x < endDraw; x += 50) {
        let onBridge = false;
        for (const p of PROJECTS) {
             if (p.type !== 'history' && p.type !== 'link' && p.id !== 'h1_poster' && Math.abs(x - p.xPosition) < 400) onBridge = true;
        }
        if (!onBridge) {
            const rand = pseudoRandom(x);
            const h = getTerrainHeight(x);
            // Draw grass tufts occasionally
            if (x % 100 === 0) drawGrassTuft(ctx, x, h);
            
            if (rand > 0.6) drawTree(ctx, x, h, 0.6 + pseudoRandom(x + 1) * 1.0); 
            else if (rand < 0.15) drawRock(ctx, x, h, pseudoRandom(x+2));
        }
      }

      // Draw Particles (Behind Car)
      particles.current.forEach(p => {
          ctx.fillStyle = p.color + p.life + ')';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
      });

      // History Markers (Small Billboards)
      HISTORY.forEach(h => {
          if (!h.isPoster) {
              drawBillboard(ctx, h.xPosition, getTerrainHeight(h.xPosition), h.title, h.text, '#5D4037', false);
          }
      });

      // Projects & Tea Stall
      PROJECTS.forEach(p => {
          // If it's a "Link" or special poster type, we already drew it in the background as a Poster.
          // But we can add a small signpost in foreground to indicate interactivity if needed, 
          // or just rely on the UI button. Let's add a small marker.
          if (p.type === 'link' || p.id === 'h1_poster') {
             drawBillboard(ctx, p.xPosition, getTerrainHeight(p.xPosition), "INFO POINT", "Stop & Look Up", p.color, false);
             return;
          }
          if (p.type === 'history') {
             drawBillboard(ctx, p.xPosition, getTerrainHeight(p.xPosition), p.title, p.description, p.color, true);
             return;
          }

          const bridgeH = 350; 

          // Railing
          ctx.strokeStyle = '#5D4037';
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.moveTo(p.xPosition - 400, bridgeH - 40);
          ctx.lineTo(p.xPosition + 400, bridgeH - 40);
          ctx.stroke();
          for(let r = p.xPosition - 400; r <= p.xPosition + 400; r+=50) {
              ctx.beginPath(); ctx.moveTo(r, bridgeH); ctx.lineTo(r, bridgeH - 40); ctx.stroke();
          }

          if (p.type === 'tea-stall') {
              drawTeaStall(ctx, p.xPosition, bridgeH);
          } else {
              drawCastle(ctx, p.xPosition, bridgeH, p.color, p.title);
          }
      });

      // Finish Line 
      drawFinishLine(ctx, WORLD_WIDTH - 800, getTerrainHeight(WORLD_WIDTH - 800));

      // Car (Monster Truck)
      ctx.save();
      ctx.translate(state.x, state.y);
      ctx.rotate(state.chassisAngle);
      drawMonsterTruck(ctx, state.wheelAngle);
      ctx.restore();

      // Foreground Railing
      PROJECTS.forEach(p => {
          if (p.type === 'history' || p.type === 'link' || p.id === 'h1_poster') return;
          if (Math.abs(state.x - p.xPosition) < 600) { 
            const bridgeH = 350;
            ctx.save();
            ctx.strokeStyle = '#8D6E63'; 
            ctx.lineWidth = 6;
            ctx.beginPath();
            ctx.moveTo(p.xPosition - 400, bridgeH + 20); 
            ctx.lineTo(p.xPosition + 400, bridgeH + 20);
            ctx.stroke();
            for(let r = p.xPosition - 400; r <= p.xPosition + 400; r+=60) {
                ctx.beginPath(); ctx.moveTo(r, bridgeH + 50); ctx.lineTo(r, bridgeH + 20); ctx.stroke();
            }
            ctx.restore();
          }
      });

      ctx.restore();
      animationId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationId);
  }, [gameActive, isPaused, onFinish]);

  return <canvas ref={canvasRef} className="block w-full h-full" />;
};

// --- DRAWING FUNCTIONS ---

function drawHollywoodSign(ctx: CanvasRenderingContext2D, x: number, y: number) {
    ctx.save();
    ctx.translate(x, y - 150); // Lift up so bottom of text is above ground

    const text = "THE JOURNEY OF PRAJ";
    ctx.font = "900 100px Fredoka";
    const width = ctx.measureText(text).width;

    // Draw legs/struts first so they are behind
    ctx.strokeStyle = "#DDDDDD";
    ctx.lineWidth = 8;
    ctx.beginPath();
    // Draw a strut every ~50 pixels along the width
    for (let i = 20; i < width; i += 60) {
        ctx.moveTo(i, 20); // Middle of text vertically approx
        ctx.lineTo(i, 150); // Down to ground (relative y=150 is world y)
    }
    ctx.stroke();

    // Text with 3D effect
    // Shadow/Depth
    ctx.fillStyle = "#CCCCCC";
    ctx.fillText(text, 5, 5); // Offset shadow

    // Main Text
    ctx.fillStyle = "#FFFFFF";
    ctx.shadowColor = "rgba(0,0,0,0.2)";
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 5;
    ctx.fillText(text, 0, 0);

    ctx.restore();
}

function drawCloud(ctx: CanvasRenderingContext2D, x: number, y: number, scale: number, opacity: number) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
    ctx.beginPath();
    ctx.arc(0, 0, 30, 0, Math.PI * 2);
    ctx.arc(40, 0, 40, 0, Math.PI * 2);
    ctx.arc(80, 0, 30, 0, Math.PI * 2);
    ctx.arc(40, -30, 40, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
}

function drawPoster(ctx: CanvasRenderingContext2D, x: number, y: number, title: string, text: string) {
    ctx.save();
    ctx.translate(x, y - 400); // Higher up
    const scale = 2.0; // MASSIVE BILLBOARDS
    ctx.scale(scale, scale);
    
    // Massive Support Pillars
    ctx.strokeStyle = '#263238'; // Dark metal
    ctx.lineWidth = 14;
    ctx.beginPath();
    ctx.moveTo(-100, 150); ctx.lineTo(-100, 600); 
    ctx.moveTo(100, 150); ctx.lineTo(100, 600);
    ctx.stroke();

    // Cross Bracing X pattern
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(-100, 250); ctx.lineTo(100, 450);
    ctx.moveTo(100, 250); ctx.lineTo(-100, 450);
    ctx.stroke();

    // Outer Frame
    ctx.fillStyle = '#102027'; // Almost black
    ctx.fillRect(-180, -120, 360, 280);

    // Inner Light Box (Bright White for readability)
    ctx.fillStyle = '#FFFFFF';
    ctx.shadowColor = 'rgba(255, 255, 255, 0.4)';
    ctx.shadowBlur = 50;
    ctx.fillRect(-165, -105, 330, 250);
    ctx.shadowBlur = 0;

    // Header Stripe
    ctx.fillStyle = '#0277BD';
    ctx.fillRect(-165, -105, 330, 60);

    // Header Text
    ctx.fillStyle = '#FFF';
    ctx.font = 'bold 24px Nunito'; // Increased font
    ctx.textAlign = 'center';
    ctx.fillText('★ SHOWCASE ★', 0, -68);

    // Spotlight effect from bottom
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.beginPath();
    ctx.moveTo(-140, 145);
    ctx.lineTo(-100, 50);
    ctx.lineTo(100, 50);
    ctx.lineTo(140, 145);
    ctx.fill();

    // Main Content Title
    ctx.fillStyle = '#212121';
    ctx.textAlign = 'center';
    ctx.font = '900 32px Fredoka'; // Big bold font
    wrapText(ctx, title.toUpperCase(), 0, -10, 310, 36);
    
    // Body Text
    ctx.font = '600 20px Nunito';
    ctx.fillStyle = '#424242';
    wrapText(ctx, text, 0, 80, 290, 26);

    ctx.restore();
}

function drawTeaStall(ctx: CanvasRenderingContext2D, x: number, y: number) {
    ctx.save();
    ctx.translate(x, y);

    // Platform
    ctx.fillStyle = '#8D6E63';
    ctx.fillRect(-100, -10, 200, 10);

    // Wooden Poles
    ctx.fillStyle = '#5D4037';
    ctx.fillRect(-90, -130, 10, 120);
    ctx.fillRect(80, -130, 10, 120);

    // Back Wall
    ctx.fillStyle = '#D7CCC8';
    ctx.fillRect(-90, -130, 180, 120);

    // Items on Shelf
    ctx.fillStyle = '#795548';
    ctx.fillRect(-90, -70, 180, 5); // Shelf
    // Jars
    ctx.fillStyle = '#F44336'; ctx.fillRect(-70, -90, 15, 20);
    ctx.fillStyle = '#FF9800'; ctx.fillRect(-40, -90, 15, 20);

    // Counter
    ctx.fillStyle = '#4E342E';
    ctx.fillRect(-100, -50, 200, 50);

    // Cloth Awning
    ctx.beginPath();
    ctx.moveTo(-110, -130);
    ctx.lineTo(110, -130);
    ctx.lineTo(120, -110);
    ctx.lineTo(-120, -110);
    ctx.fill();
    // Stripes
    for(let i = -120; i < 120; i+=20) {
        ctx.fillStyle = (i/20)%2 === 0 ? '#E65100' : '#FFF3E0';
        ctx.fillRect(i, -130, 20, 20);
    }

    // Kettle
    ctx.fillStyle = '#B0BEC5';
    ctx.beginPath();
    ctx.arc(0, -65, 18, 0, Math.PI*2);
    ctx.fill();
    // Steam
    ctx.strokeStyle = 'rgba(255,255,255,0.7)';
    ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(10, -85); ctx.lineTo(15, -100); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(20, -82); ctx.lineTo(25, -95); ctx.stroke();

    // Signboard
    ctx.save();
    ctx.translate(0, -160);
    ctx.rotate(Math.sin(Date.now() * 0.002) * 0.05); // Swing effect
    ctx.fillStyle = '#3E2723';
    ctx.fillRect(-70, 0, 140, 40);
    ctx.fillStyle = '#FFB74D';
    ctx.font = 'bold 20px Fredoka';
    ctx.textAlign = 'center';
    ctx.fillText("GoTapri Chai", 0, 27);
    // Strings holding sign
    ctx.strokeStyle = '#333'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(-60, 0); ctx.lineTo(-60, 30); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(60, 0); ctx.lineTo(60, 30); ctx.stroke();
    ctx.restore();

    ctx.restore();
}

function drawCastle(ctx: CanvasRenderingContext2D, x: number, y: number, color: string, title: string) {
    ctx.save();
    ctx.translate(x, y);

    // Shadows
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.fillRect(-140, 0, 280, 20);

    // Base
    ctx.fillStyle = '#CFD8DC';
    ctx.fillRect(-80, -200, 160, 200);
    
    // Towers with Gradients
    const towerGrad = ctx.createLinearGradient(-150, 0, -80, 0);
    towerGrad.addColorStop(0, '#90A4AE'); towerGrad.addColorStop(1, '#B0BEC5');
    ctx.fillStyle = towerGrad;
    ctx.fillRect(-150, -150, 70, 150);
    
    const towerGrad2 = ctx.createLinearGradient(80, 0, 150, 0);
    towerGrad2.addColorStop(0, '#B0BEC5'); towerGrad2.addColorStop(1, '#90A4AE');
    ctx.fillStyle = towerGrad2;
    ctx.fillRect(80, -150, 70, 150);

    // Roofs
    ctx.fillStyle = color;
    ctx.beginPath(); ctx.moveTo(-155, -150); ctx.lineTo(-115, -200); ctx.lineTo(-75, -150); ctx.fill();
    ctx.beginPath(); ctx.moveTo(75, -150); ctx.lineTo(115, -200); ctx.lineTo(155, -150); ctx.fill();

    // Door
    ctx.fillStyle = '#3E2723';
    ctx.beginPath();
    ctx.arc(0, 0, 40, Math.PI, 0); 
    ctx.fill();
    ctx.strokeStyle = '#5D4037'; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(0, -40); ctx.stroke(); // Door split

    // Banner
    ctx.fillStyle = color;
    ctx.fillRect(-20, -260, 40, 60);
    ctx.beginPath(); ctx.moveTo(-20, -200); ctx.lineTo(0, -180); ctx.lineTo(20, -200); ctx.fill();
    ctx.strokeStyle = '#333'; ctx.lineWidth=2;
    ctx.beginPath(); ctx.moveTo(0, -260); ctx.lineTo(0, -220); ctx.stroke();

    // Text
    ctx.font = 'bold 20px Fredoka';
    ctx.fillStyle = '#263238';
    ctx.textAlign = 'center';
    ctx.fillText(title.split(' ')[0], 0, -280);

    ctx.restore();
}

function drawBillboard(ctx: CanvasRenderingContext2D, x: number, y: number, title: string, sub: string, color: string, isBig: boolean) {
    const postH = isBig ? 180 : 120;
    ctx.fillStyle = '#4E342E';
    ctx.fillRect(x - 6, y - postH, 12, postH);
    const boardW = isBig ? 240 : 160;
    const boardH = isBig ? 150 : 90;
    const boardX = isBig ? x - 120 : x - 80;
    const boardY = y - postH - boardH + 20;

    // Wood Texture Board
    ctx.fillStyle = '#8D6E63';
    ctx.fillRect(boardX, boardY, boardW, boardH);
    ctx.strokeStyle = '#5D4037'; ctx.lineWidth = 4;
    ctx.strokeRect(boardX, boardY, boardW, boardH);

    // Inner Paper
    ctx.fillStyle = '#FFF3E0';
    ctx.fillRect(boardX + 10, boardY + 10, boardW - 20, boardH - 20);

    // Pins
    ctx.fillStyle = '#B71C1C';
    ctx.beginPath(); ctx.arc(boardX + 10, boardY + 10, 4, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(boardX + boardW - 10, boardY + 10, 4, 0, Math.PI*2); ctx.fill();

    ctx.textAlign = 'center';
    if (isBig) {
        ctx.fillStyle = color;
        ctx.font = 'bold 22px Fredoka'; ctx.fillText(title, x, boardY + 45);
        ctx.fillStyle = '#5D4037'; ctx.font = '14px Nunito'; wrapText(ctx, sub, x, boardY + 75, 200, 18);
    } else {
        ctx.fillStyle = '#5D4037'; ctx.font = 'bold 16px Fredoka'; ctx.fillText(title, x, boardY + 40);
        ctx.font = '12px Nunito'; wrapText(ctx, sub, x, boardY + 60, 130, 14);
    }
}

function drawFinishLine(ctx: CanvasRenderingContext2D, x: number, y: number) {
    ctx.fillStyle = '#FFF';
    ctx.fillRect(x, y - 300, 10, 300);
    // Checkered flag pattern
    ctx.fillStyle = '#000';
    for(let i=0; i<300; i+=20) if ((i/20)%2===0) ctx.fillRect(x, y - 300 + i, 10, 10);
    
    // Flag
    ctx.fillStyle = '#D32F2F';
    ctx.beginPath(); ctx.moveTo(x, y - 300); ctx.lineTo(x + 250, y - 300); ctx.lineTo(x + 250, y - 250); ctx.lineTo(x, y - 250); ctx.fill();
    
    ctx.fillStyle = '#FFF'; ctx.font = 'bold 24px Fredoka'; ctx.textAlign = 'left'; ctx.fillText("FUTURE: ROBOTICS CO.", x + 10, y - 265);
    ctx.fillStyle = '#263238'; ctx.font = 'bold 32px Fredoka'; ctx.textAlign = 'center'; ctx.fillText("Building the Future.", x + 125, y - 180); ctx.font = '20px Nunito'; ctx.fillText("Prajval Arora - 2025", x + 125, y - 140);
}

function drawMonsterTruck(ctx: CanvasRenderingContext2D, wheelAngle: number) {
      // Suspension Springs (ZigZag)
      ctx.strokeStyle = '#37474F';
      ctx.lineWidth = 3;
      const drawSpring = (x: number, y1: number, y2: number) => {
          ctx.beginPath();
          ctx.moveTo(x, y1);
          for(let i=0; i<=1; i+=0.2) {
             ctx.lineTo(x + (i%0.4 > 0.1 ? 5 : -5), y1 + (y2-y1)*i);
          }
          ctx.lineTo(x, y2);
          ctx.stroke();
      }
      drawSpring(-45, 0, 30);
      drawSpring(45, 0, 30);

      // Main Chassis
      const jeepColor = '#C62828'; // Darker Red
      ctx.fillStyle = jeepColor;
      ctx.strokeStyle = '#212121';
      ctx.lineWidth = 2;
      
      // Boxier, tougher shape
      ctx.beginPath();
      ctx.moveTo(-60, 0); 
      ctx.lineTo(65, 0); 
      ctx.lineTo(70, -25); 
      ctx.lineTo(65, -45); 
      ctx.lineTo(25, -50); 
      ctx.lineTo(5, -80); 
      ctx.lineTo(-55, -80); 
      ctx.lineTo(-65, -40); 
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Roll Cage/Rack on top
      ctx.fillStyle = '#263238';
      ctx.fillRect(-50, -85, 50, 5);
      ctx.fillRect(-50, -95, 5, 10);
      ctx.fillRect(-5, -95, 5, 10);

      // Decals (Stripes)
      ctx.fillStyle = '#FFC107';
      ctx.beginPath(); ctx.moveTo(-30, -20); ctx.lineTo(40, -20); ctx.lineTo(30, -40); ctx.lineTo(-40, -40); ctx.fill();

      // Window Glass (Tinted)
      ctx.fillStyle = '#455A64';
      ctx.beginPath();
      ctx.moveTo(-45, -45); ctx.lineTo(-45, -72); ctx.lineTo(0, -72); ctx.lineTo(20, -50);
      ctx.fill();

      // Driver Silhouette
      ctx.fillStyle = '#000'; 
      ctx.beginPath(); ctx.arc(-20, -55, 8, 0, Math.PI*2); ctx.fill();

      // Spare Tire on back
      ctx.fillStyle = '#212121';
      ctx.fillRect(-70, -30, 10, 40);

      // Headlight
      ctx.fillStyle = '#FFF59D';
      ctx.beginPath(); ctx.arc(68, -30, 8, 0, Math.PI*2); ctx.fill();
      ctx.shadowColor = '#FFF59D'; ctx.shadowBlur = 20; ctx.fill(); ctx.shadowBlur = 0;

      // Draw Monster Wheels
      const drawWheel = (offsetX: number) => {
        ctx.save();
        ctx.translate(offsetX, 35);
        ctx.rotate(wheelAngle);
        // Tire
        ctx.fillStyle = '#212121';
        ctx.beginPath(); ctx.arc(0, 0, 32, 0, Math.PI*2); ctx.fill();
        
        // Deep Treads
        ctx.fillStyle = '#000';
        for(let i=0; i<8; i++) {
           ctx.rotate(Math.PI/4);
           ctx.fillRect(28, -5, 6, 10);
        }
        
        // Hubcap
        ctx.fillStyle = '#546E7A';
        ctx.beginPath(); ctx.arc(0, 0, 16, 0, Math.PI*2); ctx.fill();
        ctx.fillStyle = '#B0BEC5';
        ctx.beginPath(); ctx.arc(0, 0, 8, 0, Math.PI*2); ctx.fill();
        
        // Bolts
        ctx.fillStyle = '#37474F';
        for(let i=0; i<5; i++) {
            ctx.beginPath();
            ctx.arc(Math.cos(i*1.25)*11, Math.sin(i*1.25)*11, 2, 0, Math.PI*2);
            ctx.fill();
        }
        ctx.restore();
      };
      drawWheel(-45); // Rear
      drawWheel(45);  // Front
}

function drawTree(ctx: CanvasRenderingContext2D, x: number, y: number, scale: number) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.fillStyle = '#4E342E';
    ctx.fillRect(-6, -25, 12, 25);
    // More detailed foliage
    ctx.fillStyle = '#2E7D32';
    ctx.beginPath(); ctx.arc(0, -30, 15, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(-10, -25, 12, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(10, -25, 12, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#388E3C'; // Highlight
    ctx.beginPath(); ctx.arc(0, -35, 10, 0, Math.PI*2); ctx.fill();
    ctx.restore();
}

function drawGrassTuft(ctx: CanvasRenderingContext2D, x: number, y: number) {
    ctx.strokeStyle = '#1B5E20';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, y); ctx.lineTo(x-3, y-8);
    ctx.moveTo(x, y); ctx.lineTo(x, y-10);
    ctx.moveTo(x, y); ctx.lineTo(x+3, y-8);
    ctx.stroke();
}

function drawRock(ctx: CanvasRenderingContext2D, x: number, y: number, variant: number) {
    ctx.fillStyle = '#78909C';
    ctx.beginPath();
    if (variant > 0.5) ctx.arc(x, y + 5, 10, Math.PI, 0);
    else { ctx.moveTo(x, y); ctx.lineTo(x + 10, y); ctx.lineTo(x + 15, y - 8); ctx.lineTo(x + 5, y - 12); ctx.lineTo(x - 5, y - 5); }
    ctx.fill();
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
  const words = text.split(' ');
  let line = '';
  for(let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
}
