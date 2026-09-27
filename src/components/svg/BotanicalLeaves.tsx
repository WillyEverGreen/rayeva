import React from 'react';

interface LeafProps {
  className?: string;
  size?: number | string;
  color?: string;
  accentColor?: string;
  strokeWidth?: number;
}

/**
 * Minimalist Ginkgo Biloba Leaf Vector
 */
export const GinkgoLeaf: React.FC<LeafProps> = ({
  className = '',
  size = 48,
  color = '#244835',
  accentColor = '#E3EFE7',
  strokeWidth = 1.8,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M60 108 C60 92 60 76 60 62" stroke={color} strokeWidth={strokeWidth * 1.2} strokeLinecap="round" />
    <path
      d="M60 62 C48 54 28 48 18 36 C10 26 12 14 26 14 C42 14 54 30 58 44 C59 34 61 34 62 44 C66 30 78 14 94 14 C108 14 110 26 102 36 C92 48 72 54 60 62 Z"
      fill={accentColor}
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
    />
    <path d="M60 62 C50 48 38 34 32 24" stroke={color} strokeWidth={strokeWidth * 0.5} strokeOpacity="0.4" strokeLinecap="round" />
    <path d="M60 62 C54 44 48 26 44 18" stroke={color} strokeWidth={strokeWidth * 0.5} strokeOpacity="0.4" strokeLinecap="round" />
    <path d="M60 62 C58 40 56 24 55 16" stroke={color} strokeWidth={strokeWidth * 0.5} strokeOpacity="0.4" strokeLinecap="round" />
    <path d="M60 62 C62 40 64 24 65 16" stroke={color} strokeWidth={strokeWidth * 0.5} strokeOpacity="0.4" strokeLinecap="round" />
    <path d="M60 62 C66 44 72 26 76 18" stroke={color} strokeWidth={strokeWidth * 0.5} strokeOpacity="0.4" strokeLinecap="round" />
    <path d="M60 62 C70 48 82 34 88 24" stroke={color} strokeWidth={strokeWidth * 0.5} strokeOpacity="0.4" strokeLinecap="round" />
  </svg>
);

/**
 * Botanical Fern Frond Vector
 */
export const FernLeaf: React.FC<LeafProps> = ({
  className = '',
  size = 54,
  color = '#244835',
  accentColor = '#E3EFE7',
  strokeWidth = 1.6,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 120 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M60 150 C58 110 52 60 76 14" stroke={color} strokeWidth={strokeWidth * 1.3} strokeLinecap="round" />
    <path d="M59 135 C46 132 36 128 26 132 C38 139 50 138 59 135 Z" fill={accentColor} stroke={color} strokeWidth={strokeWidth} />
    <path d="M59 130 C72 126 84 121 94 124 C82 133 70 132 59 130 Z" fill={accentColor} stroke={color} strokeWidth={strokeWidth} />
    <path d="M58 115 C44 110 32 104 22 108 C35 116 48 116 58 115 Z" fill={accentColor} stroke={color} strokeWidth={strokeWidth} />
    <path d="M58 110 C72 104 86 98 96 100 C83 111 70 110 58 110 Z" fill={accentColor} stroke={color} strokeWidth={strokeWidth} />
    <path d="M57 95 C43 88 32 80 20 84 C34 93 47 94 57 95 Z" fill={accentColor} stroke={color} strokeWidth={strokeWidth} />
    <path d="M57 90 C72 82 85 75 94 77 C81 89 69 88 57 90 Z" fill={accentColor} stroke={color} strokeWidth={strokeWidth} />
    <path d="M56 75 C43 67 34 58 24 61 C37 71 48 72 56 75 Z" fill={accentColor} stroke={color} strokeWidth={strokeWidth} />
    <path d="M57 70 C71 61 82 53 90 55 C78 68 67 67 57 70 Z" fill={accentColor} stroke={color} strokeWidth={strokeWidth} />
    <path d="M57 56 C46 48 38 40 30 42 C42 51 51 52 57 56 Z" fill={accentColor} stroke={color} strokeWidth={strokeWidth} />
    <path d="M59 52 C71 43 80 36 86 37 C75 49 67 48 59 52 Z" fill={accentColor} stroke={color} strokeWidth={strokeWidth} />
    <path d="M62 38 C54 30 48 24 44 26 C53 32 59 34 62 38 Z" fill={accentColor} stroke={color} strokeWidth={strokeWidth} />
    <path d="M64 34 C72 26 78 20 82 22 C74 30 69 31 64 34 Z" fill={accentColor} stroke={color} strokeWidth={strokeWidth} />
    <path d="M76 14 C73 20 68 28 66 30 C71 26 75 20 76 14 Z" fill={color} stroke={color} strokeWidth={strokeWidth} />
  </svg>
);

/**
 * Eucalyptus Sprig Vector
 */
export const EucalyptusSprig: React.FC<LeafProps> = ({
  className = '',
  size = 50,
  color = '#244835',
  accentColor = '#E3EFE7',
  strokeWidth = 1.6,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 120 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M60 155 C58 115 62 65 60 12" stroke={color} strokeWidth={strokeWidth * 1.2} strokeLinecap="round" />
    <ellipse cx="40" cy="130" rx="18" ry="14" transform="rotate(-15 40 130)" fill={accentColor} stroke={color} strokeWidth={strokeWidth} />
    <ellipse cx="80" cy="126" rx="18" ry="14" transform="rotate(15 80 126)" fill={accentColor} stroke={color} strokeWidth={strokeWidth} />
    <ellipse cx="38" cy="98" rx="17" ry="13" transform="rotate(-20 38 98)" fill={accentColor} stroke={color} strokeWidth={strokeWidth} />
    <ellipse cx="82" cy="94" rx="17" ry="13" transform="rotate(20 82 94)" fill={accentColor} stroke={color} strokeWidth={strokeWidth} />
    <ellipse cx="40" cy="68" rx="15" ry="12" transform="rotate(-15 40 68)" fill={accentColor} stroke={color} strokeWidth={strokeWidth} />
    <ellipse cx="80" cy="64" rx="15" ry="12" transform="rotate(15 80 64)" fill={accentColor} stroke={color} strokeWidth={strokeWidth} />
    <ellipse cx="44" cy="40" rx="13" ry="10" transform="rotate(-10 44 40)" fill={accentColor} stroke={color} strokeWidth={strokeWidth} />
    <ellipse cx="76" cy="37" rx="13" ry="10" transform="rotate(10 76 37)" fill={accentColor} stroke={color} strokeWidth={strokeWidth} />
    <ellipse cx="60" cy="18" rx="9" ry="8" fill={color} stroke={color} strokeWidth={strokeWidth * 0.8} />
  </svg>
);

/**
 * Olive Branch with Berries
 */
export const OliveBranch: React.FC<LeafProps> = ({
  className = '',
  size = 50,
  color = '#244835',
  accentColor = '#E3EFE7',
  strokeWidth = 1.6,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 140 140"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M20 120 C45 105 85 75 120 20" stroke={color} strokeWidth={strokeWidth * 1.3} strokeLinecap="round" />
    <path d="M42 105 C30 96 24 80 32 76 C40 78 48 94 42 105 Z" fill={accentColor} stroke={color} strokeWidth={strokeWidth} />
    <path d="M50 100 C62 90 78 84 80 92 C74 100 58 104 50 100 Z" fill={accentColor} stroke={color} strokeWidth={strokeWidth} />
    <path d="M68 82 C55 72 48 56 56 52 C64 54 74 70 68 82 Z" fill={accentColor} stroke={color} strokeWidth={strokeWidth} />
    <path d="M76 76 C88 65 104 58 106 66 C100 74 84 80 76 76 Z" fill={accentColor} stroke={color} strokeWidth={strokeWidth} />
    <path d="M94 54 C82 44 76 28 84 24 C92 26 100 42 94 54 Z" fill={accentColor} stroke={color} strokeWidth={strokeWidth} />
    <path d="M102 48 C114 36 128 28 130 36 C124 44 110 52 102 48 Z" fill={accentColor} stroke={color} strokeWidth={strokeWidth} />
    <path d="M120 20 C125 10 135 5 136 12 C132 18 124 22 120 20 Z" fill={color} stroke={color} strokeWidth={strokeWidth} />
    <ellipse cx="60" cy="94" rx="5" ry="7" transform="rotate(20 60 94)" fill="#187E91" stroke={color} strokeWidth={1} />
    <ellipse cx="88" cy="70" rx="5" ry="7" transform="rotate(-15 88 70)" fill="#187E91" stroke={color} strokeWidth={1} />
  </svg>
);
