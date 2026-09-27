import React, { useEffect, useRef } from 'react';

interface SporeCanvasProps {
  className?: string;
  particleCount?: number;
  speed?: number;
  interactive?: boolean;
}

interface Particle {
  x: number;
  y: number;
  radius: number;
  baseRadius: number;
  vx: number;
  vy: number;
  alpha: number;
  baseAlpha: number;
  color: string;
  pulsePhase: number;
}

export default function AmbientSporeCanvas({
  className = '',
  particleCount = 36,
  speed = 0.4,
  interactive = true,
}: SporeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const mouse = { x: -1000, y: -1000, active: false };

    // Pause canvas completely when scrolled out of view to ensure 100% 60fps performance
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          lastTime = performance.now();
          animationFrameId = requestAnimationFrame(render);
        } else {
          cancelAnimationFrame(animationFrameId);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    const colors = [
      'rgba(36, 72, 53, ',   // Deep forest green
      'rgba(24, 126, 145, ',  // Ocean teal
      'rgba(37, 168, 190, ',  // Cyan
      'rgba(180, 215, 190, ', // Mint leaf
      'rgba(217, 119, 6, ',   // Warm golden pollen
    ];

    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      const baseRadius = Math.random() * 2.2 + 0.8;
      const baseAlpha = Math.random() * 0.45 + 0.2;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: baseRadius,
        baseRadius,
        vx: (Math.random() - 0.5) * speed * 0.7,
        vy: -Math.random() * speed * 0.8 - 0.15,
        alpha: baseAlpha,
        baseAlpha,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive || !isVisible) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    canvas.parentElement?.addEventListener('mousemove', handleMouseMove, { passive: true });
    canvas.parentElement?.addEventListener('mouseleave', handleMouseLeave);

    let lastTime = performance.now();

    const render = (time: number) => {
      if (!isVisible) return;

      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.pulsePhase += delta * 1.5;
        p.radius = p.baseRadius + Math.sin(p.pulsePhase) * 0.5;
        p.alpha = p.baseAlpha + Math.sin(p.pulsePhase) * 0.12;

        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 120;

          if (dist < maxDist && dist > 0) {
            const force = (1 - dist / maxDist) * 1.8;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;
          }
        }

        p.x += p.vx * delta * 60;
        p.y += p.vy * delta * 60;

        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.5, p.radius), 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${Math.max(0.05, Math.min(1, p.alpha))})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      canvas.parentElement?.removeEventListener('mousemove', handleMouseMove);
      canvas.parentElement?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [particleCount, speed, interactive]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none select-none ${className}`}
    />
  );
}
