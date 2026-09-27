import React from 'react';

interface WaveProps {
  className?: string;
  fill?: string;
  underlayerFill?: string;
  height?: number;
  flip?: boolean;
}

export const OrganicWaveDivider: React.FC<WaveProps> = ({
  className = '',
  fill = '#FAF8F3',
  underlayerFill = '#E3EFE7',
  height = 90,
  flip = false,
}) => (
  <div
    className={`w-full overflow-hidden leading-none pointer-events-none select-none ${className}`}
    style={{
      height,
      transform: flip ? 'scaleY(-1)' : undefined,
    }}
  >
    <svg
      viewBox="0 0 1440 180"
      width="100%"
      height="100%"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Soft Eco Underlayer */}
      {underlayerFill && (
        <path
          d="M0 40 C280 110 520 20 780 80 C1040 140 1260 50 1440 90 L1440 180 L0 180 Z"
          fill={underlayerFill}
          fillOpacity={0.65}
        />
      )}
      {/* Main Front Meadow Layer */}
      <path
        d="M0 80 C320 20 580 130 840 70 C1100 10 1280 100 1440 50 L1440 180 L0 180 Z"
        fill={fill}
      />
    </svg>
  </div>
);
