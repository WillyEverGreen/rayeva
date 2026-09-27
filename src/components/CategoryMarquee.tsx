import React from 'react';
import {
  Utensils,
  Flower2,
  Recycle,
  Shirt,
  Home,
  Gift,
  Cpu,
  Package,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import { usePageTransition } from '../context/TransitionContext';

interface MarqueeCategory {
  id: string;
  name: string;
  subtext: string;
  icon: React.ElementType;
  accent: string;
  badge: string;
}

const CATEGORIES: MarqueeCategory[] = [
  {
    id: 'food',
    name: 'Food & Wellness',
    subtext: 'Organic & Climate-Resilient',
    icon: Utensils,
    accent: '#244835',
    badge: 'Farm-to-Table',
  },
  {
    id: 'beauty',
    name: 'Clean Beauty & Care',
    subtext: 'Microplastic-Free Formulations',
    icon: Flower2,
    accent: '#187E91',
    badge: '100% Non-Toxic',
  },
  {
    id: 'zerowaste',
    name: 'Zero-Waste Essentials',
    subtext: 'Circular Daily Alternatives',
    icon: Recycle,
    accent: '#2D6A4F',
    badge: 'Plastic Diverted',
  },
  {
    id: 'fashion',
    name: 'Conscious Apparel & Kids',
    subtext: 'Plant-Leather & Khadi Weaves',
    icon: Shirt,
    accent: '#136B7C',
    badge: 'Cruelty-Free',
  },
  {
    id: 'home',
    name: 'Regenerative Living',
    subtext: 'Handcrafted Artisanal Living',
    icon: Home,
    accent: '#244835',
    badge: 'Rural Artisans',
  },
  {
    id: 'gift',
    name: 'Conscious Gifting',
    subtext: 'BRSR-Compliant Hampers',
    icon: Gift,
    accent: '#C27D56',
    badge: 'Bulk & Corporate',
  },
  {
    id: 'tech',
    name: 'Clean Tech Innovations',
    subtext: 'Solar & Resource Optimizers',
    icon: Cpu,
    accent: '#187E91',
    badge: 'Scope 1-2 Offsets',
  },
  {
    id: 'packaging',
    name: 'Bio-Circular Packaging',
    subtext: 'Seaweed & Cassava Mailers',
    icon: Package,
    accent: '#2D6A4F',
    badge: 'Home Compostable',
  },
];

export default function CategoryMarquee() {
  const { navigate } = usePageTransition();

  const handleCategoryClick = (catId: string, catName: string) => {
    navigate('#categories', { title: catName });
  };

  return (
    <section
      aria-label="Rayeva Sustainable Sectors Marquee"
      className="relative w-full py-6 sm:py-8 bg-gradient-to-b from-[#FAF8F3] via-[#FAF8F3] to-[#FAF8F3] select-none border-y border-stone-200/60 overflow-hidden"
    >
      {/* High-end edge gradient fade masks */}
      <div className="absolute left-0 inset-y-0 w-12 sm:w-32 md:w-44 bg-gradient-to-r from-[#FAF8F3] via-[#FAF8F3]/90 to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-12 sm:w-32 md:w-44 bg-gradient-to-l from-[#FAF8F3] via-[#FAF8F3]/90 to-transparent z-20 pointer-events-none" />

      {/* Floating subtle ambient botanical pill marquee */}
      <div className="relative w-full overflow-hidden flex items-center">
        <div className="marquee-track flex gap-4 sm:gap-6 w-max animate-marquee">
          {[...CATEGORIES, ...CATEGORIES, ...CATEGORIES].map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={`${cat.id}-${idx}`}
                onClick={() => handleCategoryClick(cat.id, cat.name)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleCategoryClick(cat.id, cat.name);
                  }
                }}
                className="group relative flex items-center gap-3.5 sm:gap-4 pl-3.5 pr-5 py-3 sm:py-3.5 rounded-2xl sm:rounded-3xl bg-white/90 hover:bg-white border border-stone-200/80 hover:border-[#187E91]/40 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_-8px_rgba(24,126,145,0.12)] transition-all duration-300 hover:-translate-y-1 cursor-pointer whitespace-nowrap backdrop-blur-md"
              >
                {/* Icon badge with soft tint */}
                <div
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:shadow-md"
                  style={{
                    backgroundColor: `${cat.accent}12`,
                    color: cat.accent,
                  }}
                >
                  <Icon size={18} className="stroke-[2.2] transition-transform duration-300 group-hover:rotate-6" />
                </div>

                {/* Text information */}
                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-stone-900 text-xs sm:text-sm tracking-tight group-hover:text-[#187E91] transition-colors">
                      {cat.name}
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200/60 group-hover:bg-[#E3EFE7] group-hover:text-[#244835] group-hover:border-[#244835]/20 transition-colors">
                      {cat.badge}
                    </span>
                  </div>
                  <span className="text-[11px] text-stone-500 font-normal leading-tight mt-0.5">
                    {cat.subtext}
                  </span>
                </div>

                {/* Hover arrow indicator */}
                <div className="w-6 h-6 rounded-full bg-stone-50 group-hover:bg-[#187E91] flex items-center justify-center text-stone-400 group-hover:text-white transition-all duration-300 ml-1 opacity-60 group-hover:opacity-100">
                  <ArrowUpRight size={12} className="stroke-[2.5]" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333333%); }
        }
        .marquee-track {
          animation: marqueeScroll 45s linear infinite;
          will-change: transform;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
            overflow-x: auto;
          }
        }
      `}</style>
    </section>
  );
}
