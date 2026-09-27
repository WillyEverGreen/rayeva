import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Play,
  X,
  Compass,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Trees,
  Recycle,
  ArrowRight,
  Target,
  Workflow,
} from 'lucide-react';
import { usePageTransition } from '../context/TransitionContext';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

gsap.registerPlugin(ScrollTrigger);

export default function OurMissionSection() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const videoCardRef = useRef<HTMLDivElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);
  const { navigate } = usePageTransition();

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top bottom',
            },
          }
        );
      }

      if (videoCardRef.current) {
        gsap.fromTo(
          videoCardRef.current,
          { opacity: 0, x: -35 },
          {
            opacity: 1,
            x: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: videoCardRef.current,
              start: 'top bottom',
            },
          }
        );
      }

      if (textColRef.current) {
        gsap.fromTo(
          textColRef.current,
          { opacity: 0, x: 35 },
          {
            opacity: 1,
            x: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: textColRef.current,
              start: 'top bottom',
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="mission"
      className="relative w-full bg-[#FAF8F3] py-14 sm:py-24 overflow-hidden select-none border-t border-stone-200/60"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-[#187E91]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-[#244835]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-10">

        {/* ---------------- 1. MISSION HEADER ---------------- */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <Badge variant="secondary" className="mb-4 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider border border-[#244835]/15">
            <Compass size={13} className="text-[#187E91]" />
            <span>The Rayeva Mandate</span>
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-stone-900 tracking-tight leading-[1.12]">
            Rebuilding Sustainable Commerce <br />
            <span className="italic text-[#187E91]">From The Ground Up</span>
          </h2>
          <p className="mt-4 text-stone-600 text-base sm:text-lg leading-relaxed font-normal">
            We bridge the chasm between well-meaning consumer intentions and verified ecological outcomes through traceable supply chains and institutional compliance.
          </p>
        </div>

        {/* ---------------- 2. SIDE-BY-SIDE VIDEO SHOWCASE & MISSION NARRATIVE ---------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left: Cinematic Video Card (5 cols) */}
          <div ref={videoCardRef} className="lg:col-span-5 flex justify-center">
            <div
              className="relative w-full rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.12)] group cursor-pointer border border-stone-200/80 bg-stone-900"
              onClick={() => setIsVideoOpen(true)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setIsVideoOpen(true);
              }}
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <img
                  src="/categories/card-1-home.png"
                  alt="Rayeva Mission Documentary"
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out opacity-85"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/30 to-transparent" />

                {/* Animated Pulsing Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-[#187E91] opacity-40 animate-ping" />
                    <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center text-[#187E91] shadow-2xl group-hover:scale-110 group-hover:bg-[#187E91] group-hover:text-white transition-all duration-300 pl-1">
                      <Play size={26} className="fill-current" />
                    </div>
                  </div>
                </div>

                {/* Bottom Card Copy */}
                <div className="absolute bottom-5 inset-x-5 text-white">
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-teal-300">
                    Mini Documentary • 2 Min
                  </span>
                  <h4 className="text-base sm:text-lg font-serif font-normal text-white mt-1 leading-snug">
                    Fixing The Broken Sustainability Chain
                  </h4>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Dual-Pillar Narrative (7 cols) */}
          <div ref={textColRef} className="lg:col-span-7 flex flex-col justify-between space-y-8">
            <div>
              <span className="text-xs font-bold text-[#187E91] uppercase tracking-wider block mb-2">
                Our Strategic Purpose
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-stone-900 leading-tight">
                Why We Build? <br />
                <span className="italic text-[#244835]">What We Measure.</span>
              </h3>

              <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed font-normal">
                Greenwashing has eroded public trust: products marketed as "biodegradable" often sit in landfills for decades, while corporate sustainability claims lack verifiable audit trails.
              </p>
              <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed font-normal">
                Rayeva was founded to replace ambiguity with scientific proof. We connect conscious citizens with certified ethical brands, while empowering Indian enterprises to satisfy mandatory SEBI BRSR Core guidelines with immutable data.
              </p>
            </div>

            {/* 3 Value Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-stone-200/80 shadow-xs">
                <Target size={20} className="text-[#187E91] mb-2 stroke-[2.2]" />
                <h5 className="font-serif text-sm font-semibold text-stone-900">Zero Greenwashing</h5>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                  Every formulation subjected to GC-MS chemical screening.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-stone-200/80 shadow-xs">
                <Recycle size={20} className="text-[#244835] mb-2 stroke-[2.2]" />
                <h5 className="font-serif text-sm font-semibold text-stone-900">Circular Logistics</h5>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                  Direct reverse logistics for packaging reuse and safe recycling.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-stone-200/80 shadow-xs">
                <Trees size={20} className="text-[#C27D56] mb-2 stroke-[2.2]" />
                <h5 className="font-serif text-sm font-semibold text-stone-900">Indigenous Clusters</h5>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                  Living wage security for 2,400+ rural artisans and MSMEs.
                </p>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col items-center sm:flex-row sm:items-center gap-3 sm:gap-4 pt-2">
              <Button
                variant="default"
                size="lg"
                onClick={() => navigate('#about', { title: 'Founder Story & Manifesto' })}
                className="gap-2 w-full sm:w-auto justify-center"
              >
                <span>Read Founder Manifesto</span>
                <ArrowRight size={15} />
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => setIsVideoOpen(true)}
                className="gap-2 w-full sm:w-auto justify-center"
              >
                <Play size={14} className="fill-current" />
                <span>Watch Story</span>
              </Button>
            </div>
          </div>

        </div>

      </div>

      {/* Video Modal using Radix Dialog */}
      <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black border-stone-800 shadow-2xl rounded-3xl">
          <div className="relative aspect-video w-full bg-black">
            <video
              autoPlay
              controls
              playsInline
              className="w-full h-full object-cover"
              src="/hero.mp4"
            />
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
