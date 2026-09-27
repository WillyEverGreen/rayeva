import React, { useEffect, useRef } from 'react';

interface WaveCanvasProps {
  className?: string;
  height?: number;
  colorA?: string;
  colorB?: string;
  speed?: number;
}

export default function OrganicWaveCanvas({
  className = '',
  height = 160,
  colorA = 'rgba(24, 126, 145, 0.25)',
  colorB = 'rgba(36, 72, 53, 0.15)',
  speed = 0.8,
}: WaveCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = height);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      h = canvas.height = height;
    };
    window.addEventListener('resize', handleResize);

    let step = 0;

    const render = () => {
      step += 0.015 * speed;
      ctx.clearRect(0, 0, width, h);

      // Layer 1: Underwave
      ctx.beginPath();
      ctx.moveTo(0, h);
      for (let x = 0; x <= width; x += 10) {
        const y = Math.sin(x * 0.003 + step) * 25 + Math.cos(x * 0.006 - step * 0.7) * 15 + h * 0.55;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, h);
      ctx.closePath();
      ctx.fillStyle = colorA;
      ctx.fill();

      // Layer 2: Overwave
      ctx.beginPath();
      ctx.moveTo(0, h);
      for (let x = 0; x <= width; x += 10) {
        const y = Math.sin(x * 0.004 - step * 1.2) * 20 + Math.sin(x * 0.008 + step) * 12 + h * 0.65;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, h);
      ctx.closePath();
      ctx.fillStyle = colorB;
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [height, colorA, colorB, speed]);

  return (
    <div className={`w-full overflow-hidden leading-none pointer-events-none select-none ${className}`} style={{ height }}>
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
