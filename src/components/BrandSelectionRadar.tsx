import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  FileCheck2,
  Sparkles,
  ArrowRight,
  X,
} from 'lucide-react';
import { usePageTransition } from '../context/TransitionContext';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

gsap.registerPlugin(ScrollTrigger);

interface VerificationStandard {
  id: number;
  title: string;
  baseAngle: number;
  color: string;
  headline: string;
  description: string;
  auditMethod: string;
  energy: string;
}

const STANDARDS: VerificationStandard[] = [
  {
    id: 1,
    title: 'Sustainability',
    baseAngle: 270, // Top
    color: '#187E91', // Rayeva Primary Teal
    headline: '100% Circular & Zero-Landfill Packaging',
    description: 'Every product must utilize home-compostable mailers, infinitely recyclable glass, or upcycled post-consumer materials. Zero virgin petrochemical plastics permitted.',
    auditMethod: 'TÜV & ASTM D6400 Biodegradability Testing',
    energy: '100% Non-Toxic',
  },
  {
    id: 2,
    title: 'Health & Safety',
    baseAngle: 330, // Top-Right
    color: '#244835', // Rayeva Forest Green
    headline: 'Non-Toxic & Endocrine Disruptor-Free',
    description: 'Multi-stage laboratory screening verifies freedom from synthetic phthalates, parabens, sulphates, microplastics, and heavy metals via GC-MS chromatography.',
    auditMethod: 'GC-MS Purity Chromatography Audit',
    energy: '96% Clean Bio-Index',
  },
  {
    id: 3,
    title: 'Transparency',
    baseAngle: 30, // Bottom-Right
    color: '#25A8BE', // Rayeva Cyan
    headline: 'Farm-to-Shelf Chain of Custody',
    description: 'We require complete disclosure of agricultural origins, harvest cooperatives, supplier batch certificates, and audited carbon intensity manifests.',
    auditMethod: 'Digital Batch Manifest Verification',
    energy: '100% Traceable',
  },
  {
    id: 4,
    title: 'Innovation',
    baseAngle: 90, // Bottom
    color: '#C27D56', // Rayeva Terracotta / Copper
    headline: 'Bio-Mimicry & Waterless Formulations',
    description: 'Championing pioneering innovators replacing resource-heavy manufacturing with bio-fermentation, solar drying, and waste-stream valorization.',
    auditMethod: 'Life Cycle Assessment (LCA) Protocol',
    energy: '88% Carbon Reduction',
  },
  {
    id: 5,
    title: 'Locally Inclusive',
    baseAngle: 150, // Bottom-Left
    color: '#136B7C', // Rayeva Ocean Teal
    headline: 'Fair Living Wages for Rural Artisans',
    description: 'Prioritizing women-led self-help groups, heritage master weavers, and rural MSMEs with direct profit-sharing and audited living wages.',
    auditMethod: 'Fair-Trade Verified Living Wage Audit',
    energy: '2,400+ Artisans',
  },
  {
    id: 6,
    title: 'Ethical Practice',
    baseAngle: 210, // Top-Left
    color: '#2D6A4F', // Rayeva Emerald
    headline: 'Zero Animal Testing & Vegan Inputs',
    description: 'Strict ethical commitments ensuring zero animal testing at any phase of raw ingredient sourcing or formulation, backed by Leaping Bunny or PETA certification.',
    auditMethod: 'Cruelty-Free International Certification',
    energy: '100% Cruelty-Free',
  },
];

export default function BrandSelectionRadar() {
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const [radius, setRadius] = useState<number>(205);

  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const radarRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { navigate } = usePageTransition();

  // Responsive radius calculation
  useEffect(() => {
    const updateRadius = () => {
      if (typeof window === 'undefined') return;
      if (window.innerWidth < 440) {
        setRadius(110);
      } else if (window.innerWidth < 640) {
        setRadius(130);
      } else if (window.innerWidth < 1024) {
        setRadius(175);
      } else {
        setRadius(205);
      }
    };
    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  // Spinning pauses when any card is open
  const isSpinning = autoRotate && activeNodeId === null;

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isSpinning) {
      timer = setInterval(() => {
        setRotationAngle((prev) => (prev + 0.15) % 360);
      }, 50);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isSpinning]);

  // Entrance animations
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: textRef.current,
              start: 'top bottom',
            },
          }
        );
      }
      if (radarRef.current) {
        gsap.fromTo(
          radarRef.current,
          { opacity: 0, scale: 0.94 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: radarRef.current,
              start: 'top bottom',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Handlers for hovering away to close card and resume spinning
  const handleNodeClick = (id: number) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setActiveNodeId((prev) => (prev === id ? null : id));
  };

  const handleMouseEnterCardOrNode = (id: number) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    // If a standard is currently active and user hovers over a different node, close active card
    if (activeNodeId !== null && activeNodeId !== id) {
      setActiveNodeId(null);
    }
  };

  const handleMouseLeaveCardOrNode = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveNodeId(null);
    }, 240);
  };

  const handleBackgroundHover = () => {
    if (activeNodeId !== null) {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = setTimeout(() => {
        setActiveNodeId(null);
      }, 120);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="brand-criteria"
      className="relative w-full bg-[#FAF8F3] py-14 sm:py-20 lg:py-28 overflow-hidden select-none border-t border-stone-200/60"
    >
      {/* Background ambient radial gradients */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-[#187E91]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#244835]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* ---------------- LEFT COLUMN: NARRATIVE (Signature Site Typography) ---------------- */}
          <div ref={textRef} className="lg:col-span-5 flex flex-col justify-center">
            {/* Section Badge matching site style */}
            <Badge
              variant="secondary"
              className="mb-4 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider border border-[#244835]/15 w-fit"
            >
              <Sparkles size={13} className="text-[#187E91]" />
              <span>The 6-Pillar Screening Gate</span>
            </Badge>

            {/* Headline matching site serif & italic style */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-stone-900 tracking-tight leading-[1.14]">
              How We Choose a <br />
              <span className="italic font-serif text-[#187E91]">Brand ?</span>
            </h2>

            {/* Paragraphs matching Image 1 with bold colored accents (no em-dashes) */}
            <div className="mt-6 space-y-4 text-stone-600 text-sm sm:text-base leading-relaxed font-normal">
              <p>
                Rayeva is built on values that put{' '}
                <strong className="text-[#187E91] font-semibold">Sustainability</strong> and{' '}
                <strong className="text-[#187E91] font-semibold">Consumer Consciousness</strong> at the heart of everything we do.
              </p>
              <p>
                Our selection process is rigorous, but the outcome is simple:{' '}
                <strong className="text-[#187E91] font-semibold">Products</strong> you can trust,{' '}
                <strong className="text-[#187E91] font-semibold">Values</strong> you can believe in, and{' '}
                <strong className="text-[#187E91] font-semibold">Choices</strong> that feel good. Because with Rayeva, every purchase isn't just conscious, it's a little celebration for you and the planet.
              </p>
            </div>

            {/* Action Buttons matching site aesthetic */}
            <div className="mt-8 flex flex-wrap items-center justify-center sm:justify-start gap-3.5">
              <Button
                variant="default"
                size="default"
                onClick={() => navigate('#categories', { title: 'Verified Brands Catalog' })}
                className="group h-11 px-6 rounded-xl text-xs sm:text-sm font-semibold gap-2 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <span>Learn More</span>
                <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </Button>

              <Button
                variant="outline"
                size="default"
                onClick={() => navigate('#join-partner', { title: 'Partner Onboarding Portal' })}
                className="h-11 px-6 rounded-xl text-xs sm:text-sm font-medium border-stone-300/80 bg-white text-stone-800 hover:bg-stone-50 hover:border-stone-400 hover:-translate-y-0.5 shadow-xs transition-all duration-300"
              >
                <span>Become a Partner</span>
              </Button>
            </div>
          </div>

          {/* ---------------- RIGHT COLUMN: ORBITAL WHEEL (Unobstructed & Clean) ---------------- */}
          <div
            ref={radarRef}
            className="lg:col-span-7 flex flex-col items-center justify-center relative min-h-[480px] sm:min-h-[580px]"
            onMouseEnter={handleBackgroundHover}
          >
            <div className="relative w-full max-w-[560px] aspect-square flex items-center justify-center">

              {/* Botanical Leaf Accents Framing the Orbit */}
              <img
                src="/extracted/leaves/leaf_top_meadow_floating.png"
                alt=""
                className="pointer-events-none absolute -top-5 left-4 w-11 sm:w-14 opacity-55 animate-float-slow select-none z-0"
              />
              <img
                src="/extracted/leaves/leaf_mid_curved_large.png"
                alt=""
                className="pointer-events-none absolute -bottom-6 right-4 w-12 sm:w-16 opacity-55 animate-float-delayed select-none z-0"
              />
              <img
                src="/leaves/leaf-single-tip-01.png"
                alt=""
                className="pointer-events-none absolute top-12 -right-4 w-8 sm:w-11 opacity-50 animate-float-slow select-none z-0"
              />

              {/* Central Core: "Rayeva Standards" matching site font */}
              <div className="absolute z-10 flex flex-col items-center justify-center text-center pointer-events-none select-none">
                <img
                  src="/extracted/florals/single_daisy_blossom.png"
                  alt=""
                  className="w-6 h-6 sm:w-8 sm:h-8 mb-1.5 opacity-85 object-contain"
                />
                <span className="text-3xl xs:text-4xl sm:text-5xl font-serif font-normal tracking-tight text-slate-900">
                  Rayeva
                </span>
                <span className="text-xl xs:text-2xl sm:text-3xl font-serif italic text-[#187E91] font-normal tracking-wide mt-0.5">
                  Standards
                </span>
              </div>

              {/* Orbit Ring & Connecting Radial Dashed Spokes */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none select-none"
                viewBox="0 0 560 560"
              >
                {/* Thin Orbit Ring Circle matching Image 1 */}
                <circle
                  cx="280"
                  cy="280"
                  r={radius}
                  fill="none"
                  stroke="#E2E8F0"
                  strokeWidth="1.8"
                />

                {/* Subtle Inner Glow Ring */}
                <circle
                  cx="280"
                  cy="280"
                  r={radius * 0.45}
                  fill="none"
                  stroke="#187E91"
                  strokeWidth="1"
                  strokeDasharray="4 6"
                  opacity="0.2"
                />

                {/* Radial Dashed Spokes connecting Center to each Node */}
                {STANDARDS.map((std) => {
                  const currentAngle = (std.baseAngle + rotationAngle) % 360;
                  const rad = (currentAngle * Math.PI) / 180;
                  const x = 280 + radius * Math.cos(rad);
                  const y = 280 + radius * Math.sin(rad);

                  return (
                    <line
                      key={std.id}
                      x1="280"
                      y1="280"
                      x2={x}
                      y2={y}
                      stroke="#CBD5E1"
                      strokeWidth="1.2"
                      strokeDasharray="3 4"
                      opacity="0.75"
                    />
                  );
                })}
              </svg>

              {/* 6 Circular White Node Cards orbiting the ring */}
              {STANDARDS.map((std) => {
                const currentAngle = (std.baseAngle + rotationAngle) % 360;
                const rad = (currentAngle * Math.PI) / 180;
                const x = radius * Math.cos(rad);
                const y = radius * Math.sin(rad);

                const isActive = activeNodeId === std.id;

                return (
                  <div
                    key={std.id}
                    style={{
                      transform: `translate(${x}px, ${y}px)`,
                    }}
                    className={`absolute z-20 cursor-pointer ${
                      isActive ? 'z-50' : 'hover:z-30'
                    }`}
                    onMouseEnter={() => handleMouseEnterCardOrNode(std.id)}
                    onMouseLeave={handleMouseLeaveCardOrNode}
                  >
                    {/* Circular Node Button */}
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNodeClick(std.id);
                      }}
                      className={`w-20 h-20 xs:w-24 xs:h-24 sm:w-28 sm:h-28 rounded-full bg-white flex flex-col items-center justify-center text-center p-2 xs:p-2.5 transition-all duration-300 ${
                        isActive
                          ? 'shadow-[0_16px_36px_rgba(24,126,145,0.25)] ring-4 ring-[#187E91]/30 border-2 border-[#187E91] scale-110'
                          : 'shadow-[0_8px_24px_rgba(0,0,0,0.06)] border border-stone-200/80 hover:shadow-lg hover:scale-105'
                      }`}
                    >
                      {/* Colored Indicator Dot in Rayeva Palette */}
                      <span
                        className="w-2.5 h-2.5 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 rounded-full mb-1 xs:mb-1.5 shadow-xs transition-transform duration-300"
                        style={{ backgroundColor: std.color }}
                      />

                      {/* Standard Title */}
                      <span className="text-[10px] xs:text-[11px] sm:text-xs font-semibold text-stone-800 leading-tight px-1 font-sans">
                        {std.title}
                      </span>
                    </div>

                    {/* Anchored Interactive Card Appearing on Click */}
                    {isActive && (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        onMouseEnter={() => handleMouseEnterCardOrNode(std.id)}
                        onMouseLeave={handleMouseLeaveCardOrNode}
                        className={`fixed bottom-5 inset-x-4 max-w-sm mx-auto sm:max-w-none sm:w-80 sm:mx-0 sm:bottom-auto sm:inset-x-auto sm:absolute bg-white/98 backdrop-blur-xl rounded-2xl p-5 border border-stone-200 shadow-[0_20px_50px_rgba(0,0,0,0.18)] transition-all duration-300 animate-in fade-in zoom-in-95 cursor-default z-50 sm:before:absolute sm:before:inset-[-14px] sm:before:content-[''] sm:before:-z-10 ${
                          y < -30
                            ? 'sm:top-full sm:mt-3 sm:left-1/2 sm:-translate-x-1/2'
                            : y > 30
                            ? 'sm:bottom-full sm:mb-3 sm:left-1/2 sm:-translate-x-1/2'
                            : x > 0
                            ? 'sm:right-full sm:mr-3 sm:top-1/2 sm:-translate-y-1/2'
                            : 'sm:left-full sm:ml-3 sm:top-1/2 sm:-translate-y-1/2'
                        }`}
                      >
                        {/* Header */}
                        <div className="flex items-start justify-between gap-2 mb-2 pb-2 border-b border-stone-100">
                          <div className="flex items-center gap-2">
                            <span
                              className="w-3.5 h-3.5 rounded-full shrink-0"
                              style={{ backgroundColor: std.color }}
                            />
                            <h4 className="font-serif text-lg font-normal text-stone-900 leading-snug">
                              {std.title}
                            </h4>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-[#E3EFE7] text-[#244835] font-sans">
                              {std.energy}
                            </span>
                            <button
                              type="button"
                              onClick={() => setActiveNodeId(null)}
                              className="text-stone-400 hover:text-stone-700 p-0.5 rounded-full hover:bg-stone-100 transition-colors"
                            >
                              <X size={15} />
                            </button>
                          </div>
                        </div>

                        {/* Headline */}
                        <p className="text-xs font-semibold text-stone-800 font-sans mb-1 leading-snug">
                          {std.headline}
                        </p>

                        {/* Description */}
                        <p className="text-xs text-stone-600 font-sans leading-relaxed mb-3">
                          {std.description}
                        </p>

                        {/* Audit Footnote */}
                        <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500 font-sans">
                          <span className="flex items-center gap-1.5 text-[#187E91] font-medium truncate max-w-[210px]">
                            <FileCheck2 size={13} className="shrink-0" />
                            <span className="truncate">Audit: {std.auditMethod}</span>
                          </span>
                          <span className="font-mono text-stone-400 text-[10px]">0{std.id}/06</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
