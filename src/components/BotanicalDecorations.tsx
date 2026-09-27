import React from 'react';

/**
 * BotanicalDecorations
 * Integrates Rayeva's authentic hand-illustrated leaves, branches, dividers,
 * landscapes, and eco-seal assets throughout the application.
 */

// 1. HERO BOTANICAL CORNERS & DRIFTING LEAVES
export function HeroBotanicalFraming() {
  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-10" aria-hidden="true">
      {/* Top-Left Framing Branch */}
      <div className="absolute -top-12 -left-12 sm:-top-16 sm:-left-16 md:-top-20 md:-left-16 lg:-top-24 lg:-left-16 w-28 sm:w-44 md:w-60 lg:w-[360px] transition-transform duration-1000 ease-out animate-sway-slow opacity-75 drop-shadow-md pointer-events-none">
        <img
          src="/leaves/branch-top-left.png"
          alt=""
          className="w-full h-auto object-contain"
          loading="eager"
        />
      </div>

      {/* Bottom-Right Framing Branch */}
      <div className="absolute -bottom-6 -right-6 sm:-bottom-10 sm:-right-10 w-44 sm:w-64 md:w-80 lg:w-[400px] transition-transform duration-1000 ease-out opacity-85 drop-shadow-md">
        <img
          src="/leaves/branch-bottom-right.png"
          alt=""
          className="w-full h-auto object-contain"
          loading="eager"
        />
      </div>

      {/* Drifting Ambient Leaves across Hero Atmosphere */}
      <div className="absolute top-[22%] left-[8%] sm:left-[14%] w-10 sm:w-14 animate-float-slow opacity-75">
        <img src="/leaves/leaf-floating-large.png" alt="" className="w-full h-auto drop-shadow-xs" />
      </div>

      <div className="absolute top-[32%] right-[10%] sm:right-[16%] w-8 sm:w-12 animate-float-delayed opacity-80">
        <img src="/leaves/leaf-floating-golden.png" alt="" className="w-full h-auto drop-shadow-xs" />
      </div>

      <div className="hidden sm:block absolute bottom-[28%] left-[12%] w-9 sm:w-11 animate-float-slow opacity-70">
        <img src="/leaves/leaf-floating-curved.png" alt="" className="w-full h-auto drop-shadow-xs" />
      </div>

      <div className="hidden sm:block absolute bottom-[36%] right-[14%] w-7 sm:w-9 animate-float-delayed opacity-75">
        <img src="/leaves/leaf-floating-flutter.png" alt="" className="w-full h-auto drop-shadow-xs" />
      </div>

      <div className="absolute top-[14%] right-[28%] w-6 sm:w-8 animate-float-slow opacity-60">
        <img src="/leaves/leaf-floating-small.png" alt="" className="w-full h-auto" />
      </div>
    </div>
  );
}

// 2. AUTHENTIC BOTANICAL VINE SECTION DIVIDERS & PAGE ENDERS
export type BotanicalDividerVariant =
  | 'jasmine'
  | 'gold'
  | 'wavy'
  | 'daisy'
  | 'scrollwork'
  | 'sprout'
  | 'minimal'
  | 'center'
  | 'leaves';

export interface BotanicalVineDividerProps {
  className?: string;
  variant?: BotanicalDividerVariant;
  maxWidth?: number;
  opacity?: number;
  animate?: boolean;
}

const DIVIDER_SRC_MAP: Record<BotanicalDividerVariant, { src: string; alt: string }> = {
  jasmine: {
    src: '/extracted/dividers/vine_divider_center_complete.png',
    alt: 'Botanical Jasmine Blossoms & Leaf Vine Divider',
  },
  gold: {
    src: '/extracted/dividers/vine_divider_leaves_right.png',
    alt: 'Gold Rule with Green Leaves & Brass Accents Divider',
  },
  wavy: {
    src: '/extracted/dividers/vine_divider_leaves_right.png',
    alt: 'Wavy Leaf Vine with White Floral Blossoms Divider',
  },
  daisy: {
    src: '/extracted/dividers/vine_divider_daisy_left.png',
    alt: 'Central Marguerite Daisy with Leaf Sprigs Divider',
  },
  scrollwork: {
    src: '/extracted/dividers/vine_divider_center_complete.png',
    alt: 'Botanical Scrollwork Vine Page Ender',
  },
  sprout: {
    src: '/extracted/dividers/vine_divider_leaves_right.png',
    alt: 'Minimalist Botanical Sprout Divider',
  },
  minimal: {
    src: '/extracted/dividers/vine_divider_leaves_right.png',
    alt: 'Minimalist Botanical Sprout Divider',
  },
  center: {
    src: '/extracted/dividers/vine_divider_center_complete.png',
    alt: 'Botanical Vine Center Divider',
  },
  leaves: {
    src: '/extracted/dividers/vine_divider_leaves_right.png',
    alt: 'Wavy Leaf Vine Divider',
  },
};

export function BotanicalVineDivider({
  className = '',
  variant = 'jasmine',
  maxWidth = 920,
  opacity = 95,
  animate = true,
}: BotanicalVineDividerProps) {
  const item = DIVIDER_SRC_MAP[variant] || DIVIDER_SRC_MAP.jasmine;

  return (
    <div
      className={`w-full flex items-center justify-center my-8 sm:my-12 md:my-16 px-4 select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <div
        className="relative flex items-center justify-center w-full transition-transform duration-700 ease-out"
        style={{ maxWidth: `${maxWidth}px` }}
      >
        <img
          src={item.src}
          alt={item.alt}
          className={`w-full h-auto object-contain transition-opacity duration-500 filter drop-shadow-2xs ${
            animate ? 'hover:scale-[1.01]' : ''
          }`}
          style={{ opacity: opacity / 100 }}
          loading="lazy"
        />
      </div>
    </div>
  );
}

// Semantic helper page ender components
export function JasmineVineDivider(props: Omit<BotanicalVineDividerProps, 'variant'>) {
  return <BotanicalVineDivider variant="jasmine" {...props} />;
}

export function GoldLeavesDivider(props: Omit<BotanicalVineDividerProps, 'variant'>) {
  return <BotanicalVineDivider variant="gold" {...props} />;
}

export function WavyVineDivider(props: Omit<BotanicalVineDividerProps, 'variant'>) {
  return <BotanicalVineDivider variant="wavy" {...props} />;
}

export function DaisyRuleDivider(props: Omit<BotanicalVineDividerProps, 'variant'>) {
  return <BotanicalVineDivider variant="daisy" {...props} />;
}

export function ScrollworkDivider(props: Omit<BotanicalVineDividerProps, 'variant'>) {
  return <BotanicalVineDivider variant="scrollwork" {...props} />;
}

export function SproutDivider(props: Omit<BotanicalVineDividerProps, 'variant'>) {
  return <BotanicalVineDivider variant="sprout" {...props} />;
}

export function BotanicalPageEnder(props: Omit<BotanicalVineDividerProps, 'variant'>) {
  return <BotanicalVineDivider variant="scrollwork" {...props} />;
}

// Corner Sprig Framing Accent for Cards and Bento Boxes
export function BotanicalCornerSprig({
  position = 'top-right',
  variant = 'sprig-1',
  className = '',
}: {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  variant?: 'sprig-1' | 'sprig-2' | 'sprig-3' | 'blossom';
  className?: string;
}) {
  const SPRIG_SRCS = {
    'sprig-1': '/extracted/leaves/leaf_mid_sprig_branchlet.png',
    'sprig-2': '/extracted/leaves/leaf_pair_sprig_right.png',
    'sprig-3': '/extracted/leaves/leaf_sprig_pair.png',
    'blossom': '/extracted/florals/single_daisy_blossom.png',
  };
  const POS_CLASSES = {
    'top-left': '-top-5 -left-5 rotate-[-15deg]',
    'top-right': '-top-5 -right-5 rotate-[15deg]',
    'bottom-left': '-bottom-5 -left-5 rotate-[195deg]',
    'bottom-right': '-bottom-5 -right-5 rotate-[15deg]',
  };
  return (
    <div className={`absolute pointer-events-none select-none z-10 ${POS_CLASSES[position]} ${className}`} aria-hidden="true">
      <img
        src={SPRIG_SRCS[variant] || SPRIG_SRCS['sprig-1']}
        alt=""
        className="w-12 sm:w-16 h-auto object-contain opacity-90 drop-shadow-xs"
        loading="lazy"
      />
    </div>
  );
}

// Drifting Floating Petals & Foliage across Section Backgrounds
export function DriftingBotanicals({
  className = '',
  includePetals = true,
}: {
  className?: string;
  includePetals?: boolean;
}) {
  return (
    <div className={`absolute inset-0 pointer-events-none select-none overflow-hidden z-0 ${className}`} aria-hidden="true">
      {/* Delicate floating leaves */}
      <div className="absolute top-[16%] left-[5%] w-7 sm:w-9 animate-float-slow opacity-60">
        <img src="/leaves/leaf-03.png" alt="" className="w-full h-auto rotate-12 drop-shadow-xs" loading="lazy" />
      </div>
      <div className="absolute top-[42%] right-[6%] w-6 sm:w-8 animate-float-delayed opacity-65">
        <img src="/leaves/leaf-08.png" alt="" className="w-full h-auto -rotate-45 drop-shadow-xs" loading="lazy" />
      </div>
      <div className="hidden sm:block absolute bottom-[20%] left-[8%] w-8 sm:w-10 animate-float-slow opacity-55">
        <img src="/leaves/leaf-12.png" alt="" className="w-full h-auto rotate-25 drop-shadow-xs" loading="lazy" />
      </div>

      {includePetals && (
        <>
          {/* Subtle floating cherry / lotus petals */}
          <div className="absolute top-[26%] right-[12%] w-5 sm:w-7 animate-float-delayed opacity-75">
            <img src="/leaves/leaf-02.png" alt="" className="w-full h-auto rotate-12 drop-shadow-xs" loading="lazy" />
          </div>
          <div className="hidden md:block absolute bottom-[32%] right-[15%] w-5 sm:w-6 animate-float-slow opacity-65">
            <img src="/leaves/leaf-06.png" alt="" className="w-full h-auto -rotate-15 drop-shadow-xs" loading="lazy" />
          </div>
          <div className="absolute top-[62%] left-[6%] w-4 sm:w-6 animate-float-delayed opacity-70">
            <img src="/leaves/leaf-10.png" alt="" className="w-full h-auto rotate-30 drop-shadow-xs" loading="lazy" />
          </div>
        </>
      )}
    </div>
  );
}

// 3. PANORAMIC BOTANICAL MOUNTAIN & MEADOW SILHOUETTE DIVIDER
export function BotanicalLandscapeDivider({ className = '' }: { className?: string }) {
  return (
    <div
      className={`w-full relative overflow-hidden select-none pointer-events-none my-6 sm:my-10 ${className}`}
      aria-hidden="true"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 opacity-45 hover:opacity-60 transition-opacity duration-700">
        <img
          src="/extracted/landscapes/landscape_meadow_mountains.png"
          alt=""
          className="w-full h-16 sm:h-24 md:h-28 object-cover object-bottom"
          loading="lazy"
        />
      </div>
    </div>
  );
}

// 4. FLOATING LEAVES GUTTERS LAYER (ALONG SIDES OF SECTIONS)
export function SectionLeavesAccents({
  side = 'both',
  top = 'top-10',
}: {
  side?: 'left' | 'right' | 'both';
  top?: string;
}) {
  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0" aria-hidden="true">
      {(side === 'left' || side === 'both') && (
        <>
          <div className={`hidden sm:block absolute ${top} -left-3 sm:left-2 md:left-6 w-12 sm:w-16 animate-float-slow opacity-65 drop-shadow-xs`}>
            <img src="/leaves/leaf-01.png" alt="" className="w-full h-auto rotate-12" loading="lazy" />
          </div>
          <div className="hidden lg:block absolute top-1/2 left-4 w-9 sm:w-12 animate-float-delayed opacity-50">
            <img src="/leaves/leaf-03.png" alt="" className="w-full h-auto -rotate-45" loading="lazy" />
          </div>
          <div className="hidden md:block absolute bottom-12 left-3 w-10 sm:w-14 animate-float-slow opacity-60">
            <img src="/extracted/leaves/leaf_mid_curved_large.png" alt="" className="w-full h-auto rotate-20" loading="lazy" />
          </div>
        </>
      )}

      {(side === 'right' || side === 'both') && (
        <>
          <div className={`hidden sm:block absolute ${top} -right-3 sm:right-2 md:right-6 w-12 sm:w-16 animate-float-delayed opacity-65 drop-shadow-xs`}>
            <img src="/leaves/leaf-02.png" alt="" className="w-full h-auto -rotate-12" loading="lazy" />
          </div>
          <div className="hidden lg:block absolute top-2/3 right-5 w-8 sm:w-11 animate-float-slow opacity-55">
            <img src="/leaves/leaf-06.png" alt="" className="w-full h-auto rotate-30" loading="lazy" />
          </div>
          <div className="hidden md:block absolute bottom-16 right-3 w-10 sm:w-14 animate-float-delayed opacity-60">
            <img src="/extracted/leaves/leaf_top_meadow_floating.png" alt="" className="w-full h-auto -rotate-15" loading="lazy" />
          </div>
        </>
      )}
    </div>
  );
}

// 5. AUTHENTIC EXTRACTED ECO SEAL EMBLEM
export type EcoSealType =
  | 'sustainable'
  | 'plastic_free'
  | 'organic'
  | 'circular'
  | 'ethical'
  | 'cruelty_free'
  | 'vegan'
  | 'handmade'
  | 'locally_made'
  | 'recycled'
  | 'biodegradable'
  | 'low_waste';

interface EcoSealBadgeProps {
  type: EcoSealType;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SEAL_MAP: Record<EcoSealType, { src: string; label: string }> = {
  sustainable:   { src: '/extracted/eco_seals/seal_sustainable.png',   label: 'Verified Sustainable' },
  plastic_free:  { src: '/extracted/eco_seals/seal_plastic_free.png',  label: '100% Plastic Free' },
  organic:       { src: '/extracted/eco_seals/seal_organic.png',       label: 'Certified Organic' },
  circular:      { src: '/extracted/eco_seals/seal_circular.png',      label: 'Closed-Loop Circular' },
  ethical:       { src: '/extracted/eco_seals/seal_ethical.png',       label: 'Ethically Sourced' },
  cruelty_free:  { src: '/extracted/eco_seals/seal_cruelty_free.png',  label: 'Cruelty-Free Audited' },
  vegan:         { src: '/extracted/eco_seals/seal_vegan.png',         label: '100% Vegan Inputs' },
  handmade:      { src: '/extracted/eco_seals/seal_handmade.png',      label: 'Artisan Handmade' },
  locally_made:  { src: '/extracted/eco_seals/seal_locally_made.png',  label: 'Locally Made in India' },
  recycled:      { src: '/extracted/eco_seals/seal_recycled.png',      label: 'Post-Consumer Recycled' },
  biodegradable: { src: '/extracted/eco_seals/seal_biodegradable.png', label: '100% Biodegradable' },
  low_waste:     { src: '/extracted/eco_seals/seal_low_waste.png',     label: 'Zero-Waste Packaging' },
};

export function EcoSealBadge({ type, size = 'md', className = '' }: EcoSealBadgeProps) {
  const seal = SEAL_MAP[type] || SEAL_MAP.sustainable;
  const sizeClasses = {
    sm: 'w-7 h-7 sm:w-8 sm:h-8',
    md: 'w-10 h-10 sm:w-12 sm:h-12',
    lg: 'w-14 h-14 sm:w-16 sm:h-16',
  }[size];

  return (
    <div
      className={`inline-flex items-center justify-center shrink-0 transition-transform duration-300 hover:scale-110 select-none ${className}`}
      title={seal.label}
    >
      <img
        src={seal.src}
        alt={seal.label}
        className={`${sizeClasses} object-contain filter drop-shadow-xs`}
        loading="lazy"
      />
    </div>
  );
}
