import React, { useEffect, useRef } from 'react';

const SOURCES = [
  { x: 0.18, y: 0.28, hue: 18, label: 'mechanics' },
  { x: 0.72, y: 0.22, hue: 168, label: 'code' },
  { x: 0.28, y: 0.72, hue: 42, label: 'people' },
  { x: 0.78, y: 0.68, hue: 210, label: 'plants' },
  { x: 0.5, y: 0.48, hue: 8, label: 'law' },
];

export const InterferenceField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0.5, y: 0.5 });
  const raf = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = (e.clientX - rect.left) / rect.width;
      mouse.current.y = (e.clientY - rect.top) / rect.height;
    };
    window.addEventListener('pointermove', onMove);

    const draw = (t: number) => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      const time = t * 0.001;
      const mx = mouse.current.x;
      const my = mouse.current.y;

      SOURCES.forEach((s, i) => {
        const x = s.x * w + Math.sin(time * 0.4 + i) * 18;
        const y = s.y * h + Math.cos(time * 0.35 + i * 1.3) * 14;
        const pullX = x + (mx * w - x) * 0.08;
        const pullY = y + (my * h - y) * 0.08;

        const g = ctx.createRadialGradient(pullX, pullY, 0, pullX, pullY, Math.max(w, h) * 0.42);
        g.addColorStop(0, `hsla(${s.hue}, 72%, 48%, 0.16)`);
        g.addColorStop(0.45, `hsla(${s.hue}, 50%, 40%, 0.05)`);
        g.addColorStop(1, 'hsla(0, 0%, 0%, 0)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);

        ctx.beginPath();
        for (let r = 24; r < 220; r += 28) {
          ctx.arc(pullX, pullY, r + Math.sin(time * 1.4 + i + r * 0.02) * 4, 0, Math.PI * 2);
        }
        ctx.strokeStyle = `hsla(${s.hue}, 80%, 62%, 0.12)`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Interference seam — the "new thing" that appears where fields overlap
      const cx = (0.18 + 0.72 + mx) / 3 * w;
      const cy = (0.28 + 0.48 + my) / 3 * h;
      ctx.beginPath();
      ctx.arc(cx, cy, 6 + Math.sin(time * 3) * 2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 92, 40, 0.55)';
      ctx.fill();

      raf.current = requestAnimationFrame(draw);
    };

    raf.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 h-full w-full"
      aria-hidden
    />
  );
};
