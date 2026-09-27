import React from 'react';

interface FlourishProps {
  className?: string;
  size?: number | string;
  color?: string;
  fillColor?: string;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

/**
 * Luxury Botanical Corner Flourish
 */
export const BotanicalCornerFlourish: React.FC<FlourishProps> = ({
  className = '',
  size = 140,
  color = '#244835',
  fillColor = '#E3EFE7',
  position = 'top-left',
}) => {
  let transform = '';
  if (position === 'top-right') transform = 'scaleX(-1)';
  if (position === 'bottom-left') transform = 'scaleY(-1)';
  if (position === 'bottom-right') transform = 'scale(-1, -1)';

  return (
    <div
      className={`inline-block pointer-events-none select-none ${className}`}
      style={{ width: size, height: size, transform }}
    >
      <svg
        viewBox="0 0 200 200"
        width="100%"
        height="100%"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 0 C40 10 90 35 120 75 C145 110 160 155 170 200" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
        <path d="M70 26 C90 15 120 20 145 35" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
        <path d="M110 63 C135 60 165 72 185 95" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
        <path d="M140 115 C165 118 185 138 195 165" stroke={color} strokeWidth="1.6" strokeLinecap="round" />

        {/* Leaves */}
        <path d="M95 20 C108 8 122 10 125 22 C115 28 100 28 95 20 Z" fill={fillColor} stroke={color} strokeWidth="1.4" />
        <path d="M120 23 C134 16 148 20 150 30 C138 38 124 32 120 23 Z" fill={fillColor} stroke={color} strokeWidth="1.4" />
        <path d="M145 35 C156 32 165 38 162 48 C152 48 145 42 145 35 Z" fill={color} stroke={color} strokeWidth="1.4" />
        <path d="M130 61 C144 50 158 52 160 64 C148 70 135 68 130 61 Z" fill={fillColor} stroke={color} strokeWidth="1.4" />
        <path d="M158 68 C172 65 182 72 180 84 C168 88 158 80 158 68 Z" fill={fillColor} stroke={color} strokeWidth="1.4" />
        <path d="M185 95 C194 94 200 102 196 110 C186 108 182 100 185 95 Z" fill={color} stroke={color} strokeWidth="1.4" />
        <path d="M155 117 C170 110 182 116 182 128 C168 132 156 128 155 117 Z" fill={fillColor} stroke={color} strokeWidth="1.4" />
        <path d="M178 134 C190 132 198 142 195 152 C184 152 176 142 178 134 Z" fill={fillColor} stroke={color} strokeWidth="1.4" />
        <path d="M45 12 C52 2 64 4 66 14 C58 20 48 18 45 12 Z" fill={fillColor} stroke={color} strokeWidth="1.4" />
        <path d="M85 45 C78 55 80 66 90 66 C94 56 92 48 85 45 Z" fill={fillColor} stroke={color} strokeWidth="1.4" />
      </svg>
    </div>
  );
};

/**
 * Botanical Horizontal Divider Flourish: Responsive luxury divider with central leaf sprout
 */
export const BotanicalHorizontalDivider: React.FC<{
  className?: string;
  color?: string;
  leafColor?: string;
  leafFill?: string;
  maxWidth?: string | number;
}> = ({
  className = '',
  color = '#244835',
  leafColor = '#244835',
  leafFill = '#E3EFE7',
  maxWidth = '100%',
}) => (
  <div
    className={`w-full flex items-center justify-center gap-3 select-none pointer-events-none my-6 sm:my-8 px-4 ${className}`}
    style={{ maxWidth, marginInline: 'auto' }}
  >
    {/* Left Hairline with soft gradient fade */}
    <div
      className="flex-1 h-[1px]"
      style={{
        background: `linear-gradient(90deg, transparent 0%, ${color} 100%)`,
        opacity: 0.35,
      }}
    />

    {/* Center Botanical Leaf Sprout Emblem */}
    <div className="flex items-center gap-1.5 shrink-0 px-2">
      <svg
        viewBox="0 0 48 24"
        width={48}
        height={24}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="24" cy="12" r="2.5" fill={leafColor} />
        {/* Left arched leaf */}
        <path
          d="M20 12 C10 4 2 10 6 18 C14 18 19 14 20 12 Z"
          fill={leafFill}
          stroke={leafColor}
          strokeWidth="1.2"
        />
        {/* Right arched leaf */}
        <path
          d="M28 12 C38 4 46 10 42 18 C34 18 29 14 28 12 Z"
          fill={leafFill}
          stroke={leafColor}
          strokeWidth="1.2"
        />
      </svg>
    </div>

    {/* Right Hairline with soft gradient fade */}
    <div
      className="flex-1 h-[1px]"
      style={{
        background: `linear-gradient(90deg, ${color} 0%, transparent 100%)`,
        opacity: 0.35,
      }}
    />
  </div>
);
