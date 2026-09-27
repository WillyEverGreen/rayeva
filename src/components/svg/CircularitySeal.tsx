import React from 'react';
import { Leaf } from 'lucide-react';

interface CircularitySealProps {
  className?: string;
  size?: number;
  spinning?: boolean;
  text?: string;
  badgeLabel?: string;
  color?: string;
  bgColor?: string;
}

export default function CircularitySeal({
  className = '',
  size = 130,
  spinning = true,
  text = 'VERIFIED SUSTAINABLE • 100% ETHICAL • RAYEVA STANDARD •',
  badgeLabel = '100% CIRCULAR',
  color = '#244835',
  bgColor = '#E3EFE7',
}: CircularitySealProps) {
  const pathId = `seal-circle-${Math.random().toString(36).substring(2, 9)}`;

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 160 160"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-full ${spinning ? 'animate-spin-slow' : ''}`}
      >
        <defs>
          <path id={pathId} d="M80,80 m-58,0 a58,58 0 1,1 116,0 a58,58 0 1,1 -116,0" />
        </defs>

        {/* Outer Fine Dashed Boundary */}
        <circle cx="80" cy="80" r="74" stroke={color} strokeWidth="1.4" strokeDasharray="3 3" opacity="0.45" />
        <circle cx="80" cy="80" r="69" stroke={color} strokeWidth="0.8" opacity="0.3" />

        {/* Circular Curved Text */}
        <text
          fontFamily="Cinzel, 'Playfair Display', serif, sans-serif"
          fontSize="8.5"
          fontWeight="700"
          fill={color}
          letterSpacing="2.8"
        >
          <textPath href={`#${pathId}`} startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>

      {/* Static Non-Rotating Center Core */}
      <div
        className="absolute inset-0 m-auto flex flex-col items-center justify-center rounded-full shadow-sm pointer-events-none"
        style={{
          width: size * 0.52,
          height: size * 0.52,
          backgroundColor: bgColor,
          border: `1.5px solid ${color}`,
        }}
      >
        <span
          className="text-[9px] sm:text-[10px] font-black uppercase text-center tracking-wider leading-tight"
          style={{ color }}
        >
          {badgeLabel}
        </span>
        <Leaf size={11} style={{ color }} className="mt-0.5" />
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 24s linear infinite;
        }
        .animate-spin-slow:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
