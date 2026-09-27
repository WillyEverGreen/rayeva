import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AlertTriangle, Recycle, Flame, Trash2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { usePageTransition } from '../context/TransitionContext';

gsap.registerPlugin(ScrollTrigger);

export default function PlasticCrisisSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [counts, setCounts] = useState({ recycled: 0, incinerated: 0, landfills: 0 });
  const [hasTriggered, setHasTriggered] = useState(false);
  const { navigate } = usePageTransition();

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 75%',
        onEnter: () => {
          if (!hasTriggered) {
            setHasTriggered(true);

            // Animate counters with cubic easing
            const target = { r: 9, i: 12, l: 79 };
            const obj = { r: 0, i: 0, l: 0 };

            gsap.to(obj, {
              r: target.r,
              i: target.i,
              l: target.l,
              duration: 2.2,
              ease: 'power2.out',
              onUpdate: () => {
                setCounts({
                  recycled: Math.round(obj.r),
                  incinerated: Math.round(obj.i),
                  landfills: Math.round(obj.l),
                });
              },
            });
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [hasTriggered]);

  return (
    <section
      ref={sectionRef}
      id="plastic-crisis"
      className="relative w-full bg-[#162E22] py-20 sm:py-28 overflow-hidden select-none text-white"
    >
      {/* Ambient background glow & radial gradient */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#187E91]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-[#25A8BE]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Top Header */}
        <div className="max-w-3xl mb-14 sm:mb-20">
          <span className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-[0.22em] text-emerald-300 uppercase mb-3 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15 backdrop-blur-md">
            <AlertTriangle size={13} className="text-amber-400 stroke-[2.5]" />
            <span>GLOBAL MATERIAL REALITIES</span>
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-serif font-normal tracking-tight text-white leading-[1.15]">
            The Plastic Crisis is Real.<br />
            <span className="italic font-serif text-[#28B6CC]">Here is How We Rewire It.</span>
          </h2>
          <p className="mt-4 text-emerald-100/80 text-sm sm:text-base max-w-xl leading-relaxed font-normal">
            Of the billions of tons of plastic produced globally, the vast majority pollutes our soil, rivers, and oceans. Rayeva's ecosystem replaces virgin plastic at the root.
          </p>
        </div>

        {/* 3 Metric Crisis Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-14 sm:mb-20">
          
          {/* Card 1: 9% Recycled */}
          <div className="bg-white/8 backdrop-blur-xl rounded-[28px] p-7 sm:p-9 border border-white/12 flex flex-col justify-between transition-all duration-300 hover:bg-white/12">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-300 flex items-center justify-center border border-teal-400/30">
                  <Recycle size={24} className="stroke-[2.2]" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-teal-300">
                  Global Rate
                </span>
              </div>

              <div className="text-5xl sm:text-6xl font-serif font-bold text-teal-300 leading-none mb-3">
                {counts.recycled}%
              </div>
              <h3 className="font-serif text-xl font-semibold text-white mb-2">
                Actually Recycled
              </h3>
              <p className="text-xs sm:text-[13px] text-emerald-100/75 leading-relaxed">
                Only a tiny fraction of global plastic enters secondary lifecycle systems due to contamination and inadequate sorting infrastructure.
              </p>
            </div>

            {/* Progress indicator */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-teal-400 h-full rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${counts.recycled}%` }}
                />
              </div>
            </div>
          </div>

          {/* Card 2: 12% Incinerated */}
          <div className="bg-white/8 backdrop-blur-xl rounded-[28px] p-7 sm:p-9 border border-white/12 flex flex-col justify-between transition-all duration-300 hover:bg-white/12">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-300 flex items-center justify-center border border-amber-400/30">
                  <Flame size={24} className="stroke-[2.2]" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                  Emissions Hazard
                </span>
              </div>

              <div className="text-5xl sm:text-6xl font-serif font-bold text-amber-300 leading-none mb-3">
                {counts.incinerated}%
              </div>
              <h3 className="font-serif text-xl font-semibold text-white mb-2">
                Burned / Incinerated
              </h3>
              <p className="text-xs sm:text-[13px] text-emerald-100/75 leading-relaxed">
                Incineration generates hazardous emissions, micro-particulates, and greenhouse gases while losing 100% of material value.
              </p>
            </div>

            {/* Progress indicator */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-amber-400 h-full rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${counts.incinerated}%` }}
                />
              </div>
            </div>
          </div>

          {/* Card 3: 79% Landfills / Oceans */}
          <div className="bg-white/8 backdrop-blur-xl rounded-[28px] p-7 sm:p-9 border border-white/12 flex flex-col justify-between transition-all duration-300 hover:bg-white/12">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-300 flex items-center justify-center border border-rose-400/30">
                  <Trash2 size={24} className="stroke-[2.2]" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-rose-300">
                  Environmental Burden
                </span>
              </div>

              <div className="text-5xl sm:text-6xl font-serif font-bold text-rose-300 leading-none mb-3">
                {counts.landfills}%
              </div>
              <h3 className="font-serif text-xl font-semibold text-white mb-2">
                In Landfills or Nature
              </h3>
              <p className="text-xs sm:text-[13px] text-emerald-100/75 leading-relaxed">
                Over three-quarters of all plastics ever produced persist in landfills, soil, and marine environments, fragmenting into toxic microplastics.
              </p>
            </div>

            {/* Progress indicator */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-rose-400 h-full rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${counts.landfills}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Rayeva Solution Banner */}
        <div className="bg-gradient-to-r from-emerald-950/80 via-[#187E91]/40 to-teal-950/80 rounded-[32px] p-8 sm:p-12 border border-emerald-400/30 shadow-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#28B6CC] mb-2">
              <Sparkles size={15} />
              <span>THE RAYEVA REVERSAL ENGINE</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium leading-snug">
              Every verified Rayeva purchase eliminates virgin plastics and guarantees verified material recovery.
            </h3>
            <p className="mt-3 text-emerald-100/80 text-xs sm:text-sm leading-relaxed">
              We audit materials at source, package in 100% home-compostable mailers, and coordinate doorstep pickups to close the recycling loop permanently.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate('#categories', { title: 'Zero Waste Essentials' })}
            className="group shrink-0 inline-flex items-center gap-3 bg-[#187E91] hover:bg-[#136B7C] text-white font-semibold px-7 py-3.5 rounded-xl text-sm sm:text-[15px] shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer whitespace-nowrap"
          >
            <span>Start Your Plastic-Free Journey</span>
            <ArrowRight size={17} className="stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
