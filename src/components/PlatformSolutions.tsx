import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ShoppingBag,
  Recycle,
  Package,
  Sparkles,
  Cpu,
  ArrowRight,
  Check,
  Globe2,
} from 'lucide-react';
import { usePageTransition } from '../context/TransitionContext';

gsap.registerPlugin(ScrollTrigger);

interface SolutionPillar {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  icon: React.ElementType;
  accent: string;
  categoryFilter: string;
}

const SOLUTIONS: SolutionPillar[] = [
  {
    id: 'essentials',
    num: '01',
    title: 'Everyday Essentials',
    subtitle: 'Zero-Waste Daily Living',
    description: 'Swap disposable plastics with high-utility, reusable home and personal care staples built from natural neem wood, organic cotton, and bamboo.',
    highlights: ['BPA-free daily pantry', 'Organic unbleached linen', 'Compostable oral hygiene'],
    icon: ShoppingBag,
    accent: '#244835',
    categoryFilter: 'home',
  },
  {
    id: 'circular',
    num: '02',
    title: 'Recycling & Upcycling',
    subtitle: 'Full-Loop Material Recovery',
    description: 'We orchestrate verified door-to-door reverse logistics for recyclables and partner with artisan studios that transform post-industrial waste into art.',
    highlights: ['Doorstep pickup service', 'Upcycled coconut & textile goods', 'Certified recycling audit trails'],
    icon: Recycle,
    accent: '#187E91',
    categoryFilter: 'zerowaste',
  },
  {
    id: 'packaging',
    num: '03',
    title: 'Plastic-Free Packaging',
    subtitle: 'Compostable Shipping Solutions',
    description: 'Replace plastic bubble wrap and synthetic tape with 100% home-compostable corn-starch mailers, honeycomb kraft, and soy-ink cartons.',
    highlights: ['Home-compostable mailers', 'Water-activated kraft tape', 'Moulded sugarcane bagasse'],
    icon: Package,
    accent: '#25A8BE',
    categoryFilter: 'packaging',
  },
  {
    id: 'nontoxic',
    num: '04',
    title: 'Non-Toxic Formulations',
    subtitle: 'Clean, Plant-Based Purity',
    description: 'Pure, chemical-free personal care and home hygiene. Every ingredient is disclosed with zero synthetic sulfates, parabens, or artificial dyes.',
    highlights: ['Cold-pressed botanical elixirs', 'Waterless solid bars', 'Bio-enzyme floor & dish cleaners'],
    icon: Sparkles,
    accent: '#059669',
    categoryFilter: 'beauty',
  },
  {
    id: 'cleantech',
    num: '05',
    title: 'Clean Tech Innovations',
    subtitle: 'Smart Energy & Water Devices',
    description: 'Modern low-emission technologies designed for conscious households and green offices, from portable solar arrays to zero-electricity gravity filters.',
    highlights: ['Monocrystalline solar banks', 'Zero-electricity water purifiers', 'Ergonomic bamboo tech peripherals'],
    icon: Cpu,
    accent: '#0284C7',
    categoryFilter: 'tech',
  },
];

export default function PlatformSolutions() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const { navigate } = usePageTransition();

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 82%',
            },
          }
        );
      }

      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="platform-solutions"
      className="relative w-full bg-[#FAF8F3] py-20 sm:py-28 overflow-hidden select-none border-t border-stone-200/50"
    >
      <div className="relative z-10 w-full max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Header */}
        <div ref={headerRef} className="max-w-3xl mb-14 sm:mb-18">
          <span className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-[0.22em] text-[#187E91] uppercase mb-3 bg-[#E3EFE7] px-3.5 py-1.5 rounded-full">
            <Globe2 size={13} className="stroke-[2.5]" />
            <span>ALL-ACCESS SUSTAINABILITY PLATFORM</span>
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal tracking-tight text-slate-900 leading-[1.15]">
            Everything You Need for<br />
            <span className="italic font-serif text-[#187E91]">True Sustainable Living</span>
          </h2>
          <p className="mt-4 text-stone-600 text-sm sm:text-base max-w-xl leading-relaxed font-normal">
            Rayeva brings together vetted green solutions across every touchpoint of your day, eliminating compromise, confusion, and greenwashing.
          </p>
        </div>

        {/* 5-Column Responsive Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 sm:gap-6"
        >
          {SOLUTIONS.map((sol) => {
            const Icon = sol.icon;
            return (
              <div
                key={sol.id}
                onClick={() => navigate('#categories', { title: sol.title })}
                className="group relative bg-white/95 rounded-[28px] p-6 sm:p-7 border border-stone-200/70 shadow-[0_8px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_44px_rgba(0,0,0,0.12)] transition-all duration-400 hover:-translate-y-1.5 flex flex-col justify-between cursor-pointer"
              >
                {/* Top Row: Icon + Number */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-sm transition-transform duration-300 group-hover:scale-108"
                      style={{ backgroundColor: sol.accent }}
                    >
                      <Icon size={22} className="stroke-[2.2]" />
                    </div>
                    <span className="font-serif text-2xl font-bold text-stone-300 group-hover:text-stone-400 transition-colors">
                      {sol.num}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-serif text-lg sm:text-xl font-semibold text-slate-950 tracking-tight leading-snug group-hover:text-[#187E91] transition-colors">
                    {sol.title}
                  </h3>
                  <div className="text-xs font-semibold text-[#187E91] mt-1">
                    {sol.subtitle}
                  </div>

                  {/* Description */}
                  <p className="text-stone-600 text-xs sm:text-[13px] leading-relaxed font-normal mt-3">
                    {sol.description}
                  </p>

                  {/* Checklist Highlights */}
                  <ul className="mt-5 space-y-2 border-t border-stone-100 pt-4">
                    {sol.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-[11px] sm:text-xs text-stone-700 font-medium">
                        <span className="w-3.5 h-3.5 rounded-full bg-[#E3EFE7] text-[#244835] flex items-center justify-center shrink-0 mt-0.5">
                          <Check size={9} className="stroke-[3]" />
                        </span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Action Arrow */}
                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-slate-900 group-hover:text-[#187E91] transition-colors">
                  <span>Explore items</span>
                  <div className="w-7 h-7 rounded-full bg-stone-100 group-hover:bg-[#187E91] text-stone-900 group-hover:text-white flex items-center justify-center transition-all duration-300 group-hover:translate-x-0.5 shadow-2xs">
                    <ArrowRight size={13} className="stroke-[2.5]" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
