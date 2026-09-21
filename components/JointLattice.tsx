import React, { useEffect, useRef } from 'react';

/**
 * Joint lattice — a pixel field that commissions itself around the cursor.
 * Not a photo mosaic: cells snap into joints, traces, and rings where fields meet.
 */
export const JointLattice: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0.55, y: 0.35, down: false });
  const joints = useRef<{ x: number; y: number; life: number }[]>([]);
  const raf = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(canvas.clientWidth * dpr);
      canvas.height = Math.floor(canvas.clientHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e: PointerEvent) => {
      mouse.current.x = e.clientX / window.innerWidth;
      mouse.current.y = e.clientY / window.innerHeight;
    };
    const onDown = (e: PointerEvent) => {
      mouse.current.down = true;
      joints.current.push({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
        life: 1,
      });
      if (joints.current.length > 18) joints.current.shift();
    };
    const onUp = () => {
      mouse.current.down = false;
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);

    const CELL = 14;

    const draw = (t: number) => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.fillStyle = '#1c1814';
      ctx.fillRect(0, 0, w, h);

      const cols = Math.ceil(w / CELL);
      const rows = Math.ceil(h / CELL);
      const mx = mouse.current.x * w;
      const my = mouse.current.y * h;
      const time = t * 0.001;

      joints.current.forEach((j) => {
        j.life *= 0.992;
      });
      joints.current = joints.current.filter((j) => j.life > 0.04);

      for (let gy = 0; gy < rows; gy++) {
        for (let gx = 0; gx < cols; gx++) {
          const cx = gx * CELL + CELL / 2;
          const cy = gy * CELL + CELL / 2;
          const dx = cx - mx;
          const dy = cy - my;
          const dist = Math.hypot(dx, dy);
          const pulse = 0.5 + 0.5 * Math.sin(time * 1.6 + gx * 0.35 + gy * 0.22);

          let heat = Math.max(0, 1 - dist / 220) * (0.35 + pulse * 0.25);
          if (mouse.current.down) heat *= 1.35;

          joints.current.forEach((j) => {
            const jx = j.x * w - cx;
            const jy = j.y * h - cy;
            heat = Math.max(heat, Math.max(0, 1 - Math.hypot(jx, jy) / 90) * j.life);
          });

          const idle = ((gx * 13 + gy * 29) % 17 === 0) ? 0.08 * pulse : 0;
          heat = Math.max(heat, idle);

          if (heat < 0.06) continue;

          const snap = heat > 0.45 ? 0 : 0;
          const px = gx * CELL + snap;
          const py = gy * CELL + snap;
          const size = heat > 0.7 ? CELL - 2 : heat > 0.35 ? CELL - 5 : 3;

          const ring = Math.abs((dist / 18 + time * 2) % 2 - 1);
          const isRing = dist < 160 && ring < 0.18 && heat > 0.2;
          const teal = (gx + gy) % 5 === 0;

          ctx.fillStyle = isRing
            ? `rgba(196, 163, 90, ${0.5 + heat * 0.4})`
            : teal
              ? `rgba(140, 110, 70, ${0.14 + heat * 0.4})`
              : `rgba(196, 140, 72, ${0.12 + heat * 0.45})`;
          ctx.fillRect(px + (CELL - size) / 2, py + (CELL - size) / 2, size, size);
        }
      }

      // Orthogonal traces from cursor — joints, not a photo wall
      ctx.strokeStyle = 'rgba(196, 163, 90, 0.28)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      const gx = Math.round(mx / CELL) * CELL;
      const gy = Math.round(my / CELL) * CELL;
      ctx.moveTo(gx, 0);
      ctx.lineTo(gx, h);
      ctx.moveTo(0, gy);
      ctx.lineTo(w, gy);
      ctx.stroke();

      raf.current = requestAnimationFrame(draw);
    };

    raf.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
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
