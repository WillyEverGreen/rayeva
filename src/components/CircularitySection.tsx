import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Leaf, RefreshCw, Award, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    icon:  Leaf,
    color: '#187E91',
    num:   '01',
    title: 'Source',
    sub:   'Verified Zero-Waste Alternatives',
    desc:  'Every product on Rayeva passes a multi-point sustainability audit (packaging, materials, supply chain origin, and carbon footprint) before it reaches you.',
  },
  {
    icon:  RefreshCw,
    color: '#25A8BE',
    num:   '02',
    title: 'Collect & Reverse',
    sub:   'Doorstep Pickup for Recyclables',
    desc:  'We partner with certified collection agents to pick up e-waste, industrial recyclables, and used packaging directly from your home or facility. Free for orders over 100 kg.',
  },
  {
    icon:  Award,
    color: '#187E91',
    num:   '03',
    title: 'Certified Recycling',
    sub:   'Audit-Ready Documentation',
    desc:  'Material recovery certificates, BRSR audit trails, and real-time landfill diversion metrics are generated for every batch, giving enterprises board-level evidence of impact.',
  },
];

export default function CircularitySection() {
  const sectionRef    = useRef<HTMLElement>(null);
  const headerRef     = useRef<HTMLDivElement>(null);
  const stepsWrapRef  = useRef<HTMLDivElement>(null);
  const ctaRef        = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Header entrance
    gsap.fromTo(headerRef.current,
      { opacity: 0, y: 32 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom' }
      }
    );

    // Step cards stagger
    gsap.fromTo('.circularity-step',
      { opacity: 0, y: 44 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.18, ease: 'power3.out',
        scrollTrigger: { trigger: stepsWrapRef.current, start: 'top bottom' }
      }
    );

    // Connectors draw in
    gsap.fromTo('.step-connector',
      { scaleX: 0, transformOrigin: 'left center' },
      { scaleX: 1, duration: 0.75, stagger: 0.2, ease: 'power2.inOut',
        scrollTrigger: { trigger: stepsWrapRef.current, start: 'top bottom' }
      }
    );

    // CTA card
    gsap.fromTo(ctaRef.current,
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out',
        scrollTrigger: { trigger: ctaRef.current, start: 'top bottom' }
      }
    );
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="circularity"
      className="w-full bg-[#FBF9F5] pt-20 sm:pt-28 pb-24 sm:pb-32 overflow-hidden select-none"
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">

        {/* Header */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-14 sm:mb-20">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-slate-950 leading-tight">
            From Purchase to Recovery,{' '}
            <span className="italic text-[#187E91]">We Close the Loop</span>
          </h2>
          <p className="mt-4 text-slate-600 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            Most platforms stop at the sale. Rayeva closes the full material loop, from sourcing certified products to recovering and recycling what's left.
          </p>
        </div>

        {/* 3-Step Process */}
        <div ref={stepsWrapRef} className="relative grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-12 sm:mb-16">

          {STEPS.map((step, i) => (
            <React.Fragment key={step.num}>
              {/* Step Card */}
              <div className="circularity-step relative flex flex-col items-center text-center">
                {/* Step number */}
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-stone-400 mb-4">{step.num}</span>

                {/* Icon circle */}
                <div
                  className="w-16 h-16 sm:w-18 sm:h-18 rounded-full flex items-center justify-center mb-5 shadow-[0_4px_18px_rgba(37,168,190,0.18)]"
                  style={{ backgroundColor: `${step.color}18` }}
                >
                  <step.icon size={28} strokeWidth={1.8} style={{ color: step.color }} />
                </div>

                <h3 className="font-sans font-bold text-xl sm:text-2xl text-slate-950 mb-1">{step.title}</h3>
                <p className="text-xs sm:text-[13px] font-semibold text-[#187E91] mb-3">{step.sub}</p>
                <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed max-w-xs mx-auto">{step.desc}</p>
              </div>

              {/* Connector (between cards, not after last) */}
              {i < STEPS.length - 1 && (
                <div className="step-connector hidden md:block absolute top-[88px] pointer-events-none"
                  style={{ left: `calc(${(i + 1) * 33.33}% - 48px)`, width: '72px', height: '2px', borderTop: '2px dashed rgba(37,168,190,0.35)' }}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Enterprise CTA Banner */}
        <div
          ref={ctaRef}
          className="rounded-[28px] sm:rounded-[32px] bg-gradient-to-r from-[#187E91] to-[#136B7C] px-7 sm:px-12 py-8 sm:py-10 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="text-white text-center sm:text-left">
            <p className="text-xs sm:text-[13px] font-semibold uppercase tracking-[0.2em] text-white/70 mb-1.5">Enterprise Offer</p>
            <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-medium leading-tight">
              Free pickup for bulk e-waste & industrial recyclables
              <span className="block font-normal italic text-white/80"> over 100 kg</span>
            </h3>
          </div>
          <button className="shrink-0 inline-flex items-center gap-2 bg-white text-[#187E91] font-bold text-sm px-7 py-3.5 rounded-xl shadow-[0_4px_16px_rgba(0,0,0,0.08)] hover:bg-stone-50 hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none cursor-pointer whitespace-nowrap">
            <span>Book a Pickup</span>
            <ArrowRight size={15} className="stroke-[2.5]" />
          </button>
        </div>

      </div>
    </section>
  );
}
