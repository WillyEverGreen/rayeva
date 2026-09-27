import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  AlertCircle,
  Recycle,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { usePageTransition } from '../context/TransitionContext';

gsap.registerPlugin(ScrollTrigger);

export default function PlasticCrisisAndRecycling() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [counts, setCounts] = useState({ recycled: 9, incinerated: 12, landfills: 79, recovery: 94.2 });
  const [hasTriggered, setHasTriggered] = useState(false);
  const { navigate } = usePageTransition();

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 78%',
        onEnter: () => {
          if (!hasTriggered) {
            setHasTriggered(true);
            const target = { r: 9, i: 12, l: 79, rec: 94.2 };
            const obj = { r: 0, i: 0, l: 0, rec: 0 };

            gsap.to(obj, {
              r: target.r,
              i: target.i,
              l: target.l,
              rec: target.rec,
              duration: 2.2,
              ease: 'power2.out',
              onUpdate: () => {
                setCounts({
                  recycled: Math.round(obj.r),
                  incinerated: Math.round(obj.i),
                  landfills: Math.round(obj.l),
                  recovery: Number(obj.rec.toFixed(1)),
                });
              },
            });
          }
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [hasTriggered]);

  return (
    <div ref={containerRef} id="plastic-crisis-bento" className="w-full pt-6 pb-12 sm:pt-8 sm:pb-16 scroll-mt-24 relative">
      {/* Botanical leaves accents framing the section */}
      <div className="hidden lg:block absolute -top-4 -left-6 w-14 select-none pointer-events-none opacity-70">
        <img src="/leaves/leaf-03.png" alt="" className="w-full h-auto rotate-12" loading="lazy" />
      </div>
      <div className="hidden lg:block absolute -bottom-6 -right-6 w-16 select-none pointer-events-none opacity-75">
        <img src="/leaves/leaf-02.png" alt="" className="w-full h-auto -rotate-12" loading="lazy" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* ================= LEFT CARD: THE PLASTIC CRISIS (ORGANIC BOTANICAL EDITORIAL) ================= */}
        <div className="lg:col-span-6 relative bg-[#FFFDF9] rounded-2xl sm:rounded-[32px] p-5 xs:p-6 sm:p-11 border-2 border-rose-200/90 flex flex-col justify-between overflow-hidden">
          
          {/* Botanical leaf watermark & accents */}
          <img
            src="/leaves/leaf-08.png"
            alt=""
            className="absolute -bottom-8 -right-8 w-44 opacity-[0.06] select-none pointer-events-none rotate-45"
          />
          <img
            src="/leaves/leaf-floating-curved.png"
            alt=""
            className="absolute top-4 right-5 w-7 opacity-35 select-none pointer-events-none rotate-12"
          />

          <div className="relative z-10">
            {/* Top Red Badge */}
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-[#BA181B] bg-rose-50 border border-rose-200/80">
                <AlertCircle size={14} className="stroke-[2.5]" />
                <span>The Reality</span>
              </span>
              <span className="text-[10px] xs:text-[11px] font-semibold text-stone-400 uppercase tracking-widest">
                Global EPA Baseline
              </span>
            </div>

            {/* Crimson Title */}
            <h3 className="text-2xl sm:text-4xl font-serif font-bold text-[#A4161A] tracking-tight leading-tight">
              The Plastic Crisis
            </h3>

            {/* Segmented Global Plastic Ratio Bar */}
            <div className="mt-4 sm:mt-5 mb-6 sm:mb-8">
              <div className="flex items-center justify-between text-[11px] font-bold text-stone-500 mb-2">
                <span>Fate of all plastic produced in history</span>
                <span className="text-[#A4161A] font-mono">100% Volume</span>
              </div>
              <div className="w-full h-3 rounded-full overflow-hidden flex bg-stone-100 p-0.5 border border-stone-200">
                <div style={{ width: `${counts.recycled}%` }} className="h-full bg-emerald-600 rounded-l-full transition-all duration-300" title="9% Recycled" />
                <div style={{ width: `${counts.incinerated}%` }} className="h-full bg-amber-500 transition-all duration-300" title="12% Incinerated" />
                <div style={{ width: `${counts.landfills}%` }} className="h-full bg-[#BA181B] rounded-r-full transition-all duration-300" title="79% In Landfills or Nature" />
              </div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2 text-[10px] font-semibold text-stone-500">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-600" /> 9% Recycled</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" /> 12% Burned</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#BA181B]" /> 79% Landfills</span>
              </div>
            </div>

            {/* Three Big Red Numbers Grid */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center py-4 border-y border-rose-100 mb-6">
              <div className="flex flex-col items-center">
                <div className="text-2xl xs:text-3xl sm:text-5xl font-serif font-extrabold text-[#BA181B] leading-none">
                  {counts.recycled}%
                </div>
                <div className="text-[11px] sm:text-sm font-bold text-[#A4161A] mt-2">
                  Recycled
                </div>
              </div>

              <div className="flex flex-col items-center border-x border-rose-100 px-1">
                <div className="text-2xl xs:text-3xl sm:text-5xl font-serif font-extrabold text-[#BA181B] leading-none">
                  {counts.incinerated}%
                </div>
                <div className="text-[11px] sm:text-sm font-bold text-[#A4161A] mt-2">
                  Incinerated
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="text-2xl xs:text-3xl sm:text-5xl font-serif font-extrabold text-[#A4161A] leading-none">
                  {counts.landfills}%
                </div>
                <div className="text-[11px] sm:text-sm font-bold text-[#A4161A] mt-2">
                  In landfills
                </div>
              </div>
            </div>

            {/* Exact original narrative quote */}
            <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed font-normal text-center max-w-lg mx-auto">
              Only 9% of all plastic ever made has been recycled and 12% incinerated. The remaining 79% has accumulated in landfills or the natural environment. Plastic leaching pollutes both land and air.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-rose-100/80 flex items-center justify-between text-xs font-semibold text-rose-800 relative z-10">
            <span>Root Cause: Unchecked Linear Consumption</span>
            <span className="text-[11px] text-stone-400 font-mono">Global Challenge</span>
          </div>
        </div>

        {/* ================= RIGHT CARD: RAYEVA CLOSED-LOOP RECYCLING (THE SOLUTION) ================= */}
        <div className="lg:col-span-6 relative bg-[#FFFDF9] rounded-2xl sm:rounded-[32px] p-5 xs:p-6 sm:p-11 border-2 border-teal-200/90 flex flex-col justify-between overflow-hidden">
          
          {/* Botanical Leaf Sprigs draped on corner and watermark in card background */}
          <img
            src="/leaves/leaf-01.png"
            alt=""
            className="absolute -top-5 -right-5 w-24 sm:w-28 opacity-80 select-none pointer-events-none -rotate-12 transition-transform duration-700 hover:rotate-0"
          />
          <img
            src="/leaves/leaf-02.png"
            alt=""
            className="absolute -bottom-10 -left-10 w-36 opacity-[0.06] select-none pointer-events-none rotate-45"
          />
          <img
            src="/leaves/leaf-single-sprout-05.png"
            alt=""
            className="absolute bottom-6 right-8 w-7 opacity-40 select-none pointer-events-none rotate-12"
          />

          <div className="relative z-10">
            {/* Top Teal Badge */}
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-[#187E91] bg-teal-50 border border-teal-200/80">
                <ShieldCheck size={14} className="stroke-[2.5]" />
                <span>The Rayeva Intervention</span>
              </span>
              <span className="text-[10px] xs:text-[11px] font-semibold text-emerald-800 font-mono bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/80">
                100% Certified Recovery
              </span>
            </div>

            {/* Header with Circular Teal Recycling Icon matching original */}
            <div className="flex items-center gap-3 sm:gap-4 mb-4">
              <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-[#187E91] text-white flex items-center justify-center shrink-0 transition-transform duration-500 hover:rotate-180 cursor-pointer">
                <Recycle size={24} className="sm:w-[30px] sm:h-[30px] stroke-[2.2]" />
              </div>
              <div>
                <h3 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight leading-tight">
                  Closed-Loop Recycling
                </h3>
                <span className="text-xs sm:text-sm font-medium text-[#187E91]">
                  Transforming Post-Consumer Waste Into Fresh Resources
                </span>
              </div>
            </div>

            {/* Recovery Progress Bar */}
            <div className="mt-4 sm:mt-5 mb-6 sm:mb-8">
              <div className="flex items-center justify-between text-[11px] font-bold text-stone-600 mb-2">
                <span>Rayeva Certified Material Diversion Rate</span>
                <span className="text-[#187E91] font-mono text-xs">{counts.recovery}% Diverted</span>
              </div>
              <div className="w-full h-3 rounded-full overflow-hidden bg-stone-100 p-0.5 border border-stone-200">
                <div style={{ width: `${counts.recovery}%` }} className="h-full bg-gradient-to-r from-[#187E91] to-[#25A8BE] rounded-full transition-all duration-300" />
              </div>
              <div className="flex items-center justify-between mt-2 text-[10px] font-semibold text-stone-500">
                <span>Doorstep Collection Network</span>
                <span className="text-emerald-700 font-medium">Zero Plastic To Landfill Policy</span>
              </div>
            </div>

            {/* Three Big Green Numbers Grid */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center py-4 border-y border-teal-100 mb-6">
              <div className="flex flex-col items-center">
                <div className="text-2xl xs:text-3xl sm:text-5xl font-serif font-extrabold text-[#187E91] leading-none">
                  94.2%
                </div>
                <div className="text-[11px] sm:text-sm font-bold text-stone-800 mt-2">
                  Recovery Rate
                </div>
              </div>

              <div className="flex flex-col items-center border-x border-teal-100 px-1">
                <div className="text-2xl xs:text-3xl sm:text-5xl font-serif font-extrabold text-[#244835] leading-none">
                  18.4M+
                </div>
                <div className="text-[11px] sm:text-sm font-bold text-stone-800 mt-2">
                  Units Diverted
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="text-2xl xs:text-3xl sm:text-5xl font-serif font-extrabold text-[#136B7C] leading-none">
                  0 Waste
                </div>
                <div className="text-[11px] sm:text-sm font-bold text-stone-800 mt-2">
                  To Landfill
                </div>
              </div>
            </div>

            {/* Narrative */}
            <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed font-normal text-center max-w-lg mx-auto">
              Rayeva orchestrates verified reverse logistics to intercept that 79% waste stream. We reclaim packaging, agricultural residues, and post-consumer plastics, turning them into certified circular home and office staples.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-teal-100/80 flex items-center justify-between relative z-10">
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('sustainability-tree');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 text-xs font-bold text-[#187E91] hover:text-[#244835] transition-colors cursor-pointer"
            >
              <span>Explore Interactive Circular Loops</span>
              <ArrowRight size={14} className="stroke-[2.5]" />
            </button>
            <span className="text-[11px] text-stone-400 font-mono">Rayeva Protocol</span>
          </div>

        </div>

      </div>
    </div>
  );
}
