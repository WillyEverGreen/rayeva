import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
  Leaf, Cpu, BarChart3, Droplets, Recycle, Zap, ArrowRight,
  Wind, ShoppingBag, TreePine, Package,
} from 'lucide-react';
import { usePageTransition } from '../context/TransitionContext';

gsap.registerPlugin(ScrollTrigger);

interface ProgressBarProps {
  label: string;
  value: number;
  color?: string;
}

function ProgressBar({ label, value, color = '#25A8BE' }: ProgressBarProps) {
  const barRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (barRef.current) {
      gsap.fromTo(
        barRef.current,
        { scaleX: 0 },
        {
          scaleX: value / 100,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: barRef.current, start: 'top bottom' },
        }
      );
    }
  }, [value]);

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between items-center">
        <span className="text-xs font-medium text-slate-700">{label}</span>
        <span className="text-xs font-bold text-slate-900">{value}%</span>
      </div>
      <div className="h-2 bg-stone-200 rounded-full overflow-hidden">
        <div
          ref={barRef}
          className="h-full rounded-full origin-left"
          style={{ backgroundColor: color, transform: 'scaleX(0)' }}
        />
      </div>
    </div>
  );
}

export default function ImpactSuite() {
  const [activeTab, setActiveTab] = useState<'individual' | 'enterprise'>('individual');
  const [transport, setTransport] = useState(60);
  const [diet, setDiet] = useState(50);

  const sectionRef  = useRef<HTMLElement>(null);
  const headerRef   = useRef<HTMLDivElement>(null);
  const tabsRef     = useRef<HTMLDivElement>(null);
  const contentRef  = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const { navigate } = usePageTransition();

  // Derived carbon values from sliders
  const plastic = +(transport * 0.09 + diet * 0.04).toFixed(1);
  const carbon  = +(transport * 0.018 + diet * 0.022).toFixed(1);
  const trees   = Math.round(carbon * 8.5);

  // Animate tab panel on switch
  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.38, ease: 'power3.out' }
      );
    }
  }, [activeTab]);

  // Move indicator pill
  useEffect(() => {
    if (indicatorRef.current) {
      gsap.to(indicatorRef.current, {
        x: activeTab === 'individual' ? 0 : '100%',
        duration: 0.32,
        ease: 'power2.inOut',
      });
    }
  }, [activeTab]);

  // Section entrance
  useGSAP(() => {
    if (!sectionRef.current) return;
    const tl = gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current, start: 'top bottom' },
      defaults: { ease: 'power3.out' },
    });
    tl.fromTo(headerRef.current, { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.6 })
      .fromTo(tabsRef.current, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.45 }, '-=0.25');
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="impact-suite"
      className="w-full bg-[#F3EFE6] pt-20 sm:pt-28 pb-24 sm:pb-32 overflow-hidden select-none"
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">

        {/* Header */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-slate-950 leading-tight">
            Understand Your Footprint,{' '}
            <span className="italic text-[#187E91]">Drive Real Change</span>
          </h2>
          <p className="mt-3.5 text-slate-600 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            Two powerful tools for every stakeholder: individuals who want to live lighter, and enterprises who need to report smarter.
          </p>
        </div>

        {/* Tab Switcher */}
        <div ref={tabsRef} className="flex justify-center mb-8 sm:mb-10">
          <div className="relative flex bg-[#ECE7DF] rounded-full p-1 shadow-inner">
            {/* Sliding indicator */}
            <div
              ref={indicatorRef}
              className="absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] bg-[#187E91] rounded-full shadow-md transition-none"
              aria-hidden
            />
            <button
              onClick={() => setActiveTab('individual')}
              className={`relative z-10 px-5 sm:px-7 py-2 sm:py-2.5 rounded-full text-xs sm:text-[13px] font-semibold whitespace-nowrap transition-colors duration-300 focus:outline-none ${
                activeTab === 'individual' ? 'text-white' : 'text-stone-600 hover:text-stone-800'
              }`}
            >
              For Individuals
            </button>
            <button
              onClick={() => setActiveTab('enterprise')}
              className={`relative z-10 px-5 sm:px-7 py-2 sm:py-2.5 rounded-full text-xs sm:text-[13px] font-semibold whitespace-nowrap transition-colors duration-300 focus:outline-none ${
                activeTab === 'enterprise' ? 'text-white' : 'text-stone-600 hover:text-stone-800'
              }`}
            >
              For Enterprise
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div
          ref={contentRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-start"
        >
          {activeTab === 'individual' ? (
            <>
              {/* Left: Description */}
              <div className="flex flex-col justify-center">
                <h3 className="font-sans font-bold text-2xl sm:text-3xl text-slate-950 mb-3">
                  Calculate Your Personal Carbon Footprint
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 sm:mb-7">
                  Understand your environmental impact in under 60 seconds, from transport habits to diet choices. See how you compare against India's national average and discover your top 3 impact-reduction opportunities.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    { icon: Wind,        label: 'Carbon footprint in tCO₂e vs Indian average (1.9t)' },
                    { icon: Package,     label: 'Plastic waste diverted in kg per year' },
                    { icon: TreePine,    label: 'Trees equivalent saved by your choices' },
                    { icon: ShoppingBag, label: 'Sustainable purchase score out of 100' },
                  ].map(({ icon: Icon, label }) => (
                    <li key={label} className="flex items-start gap-3">
                      <span className="w-8 h-8 rounded-full bg-[#25A8BE]/15 text-[#187E91] flex items-center justify-center shrink-0 mt-0.5">
                        <Icon size={15} className="stroke-[2.2]" />
                      </span>
                      <span className="text-sm sm:text-[15px] text-slate-700 leading-snug">{label}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => navigate('#impact-suite', { title: 'Individual Calculator' })}
                  className="self-start inline-flex items-center gap-2 bg-[#187E91] hover:bg-[#136B7C] text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus:outline-none cursor-pointer"
                >
                  <span>Calculate My Footprint</span>
                  <ArrowRight size={14} className="stroke-[2.2] group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

              {/* Right: Interactive Calculator Preview */}
              <div className="bg-white rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 shadow-xl border border-stone-200/60">
                <h4 className="font-sans font-bold text-lg text-slate-900 mb-1">Quick Footprint Estimator</h4>
                <p className="text-xs text-stone-500 mb-6">Move the sliders to see your live impact</p>

                {/* Transport Slider */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs sm:text-[13px] font-semibold text-slate-700">Daily Transport Distance</label>
                    <span className="text-xs font-bold text-[#187E91]">{transport} km/day</span>
                  </div>
                  <input
                    type="range" min={0} max={200} value={transport}
                    onChange={(e) => setTransport(+e.target.value)}
                    className="w-full h-2 rounded-full cursor-pointer appearance-none bg-stone-200"
                    style={{ accentColor: '#25A8BE' }}
                  />
                  <div className="flex justify-between text-[10px] text-stone-400 mt-1">
                    <span>0 km</span><span>200 km</span>
                  </div>
                </div>

                {/* Diet Slider */}
                <div className="mb-7">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs sm:text-[13px] font-semibold text-slate-700">Diet: Plant-based → Meat-heavy</label>
                    <span className="text-xs font-bold text-[#187E91]">{diet}%</span>
                  </div>
                  <input
                    type="range" min={0} max={100} value={diet}
                    onChange={(e) => setDiet(+e.target.value)}
                    className="w-full h-2 rounded-full cursor-pointer appearance-none bg-stone-200"
                    style={{ accentColor: '#25A8BE' }}
                  />
                  <div className="flex justify-between text-[10px] text-stone-500 font-medium mt-1">
                    <span>Plant-based</span><span>Mixed diet</span>
                  </div>
                </div>

                {/* Live Stats */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Plastic',  value: `${plastic} kg`,  sub: 'diverted/yr', icon: Package,  color: '#187E91' },
                    { label: 'Carbon',   value: `${carbon} tCO₂`, sub: 'per year',     icon: Wind,     color: '#25A8BE' },
                    { label: 'Trees',    value: `${trees}`,        sub: 'equiv. saved', icon: TreePine, color: '#187E91' },
                  ].map(({ label, value, sub, icon: Icon, color }) => (
                    <div key={label} className="bg-[#F3EFE6] rounded-2xl p-3.5 text-center">
                      <Icon size={18} className="mx-auto mb-1.5" style={{ color }} />
                      <div className="font-bold text-base sm:text-lg text-slate-900 leading-none">{value}</div>
                      <div className="text-[10px] text-stone-500 mt-0.5">{sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Left: Enterprise Description */}
              <div className="flex flex-col justify-center">
                <h3 className="font-sans font-bold text-2xl sm:text-3xl text-slate-950 mb-3">
                  Generate Your Corporate ESG & BRSR Report
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 sm:mb-7">
                  Get an instant SEBI-compliant sustainability diagnosis for your enterprise. From Scope 1/2/3 emissions to water stewardship and waste diversion, Rayeva's AI engine generates boardroom-ready reports in minutes, not months.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    { icon: BarChart3, label: 'Scope 1, 2 & 3 GHG emissions in tCO₂e' },
                    { icon: Zap,       label: 'SEBI BRSR Core compliance checklist & scoring' },
                    { icon: Recycle,   label: 'Landfill diversion rate & certified recycling metrics' },
                    { icon: Droplets,  label: 'Water withdrawal vs. recycled volume in kilolitres' },
                  ].map(({ icon: Icon, label }) => (
                    <li key={label} className="flex items-start gap-3">
                      <span className="w-8 h-8 rounded-full bg-[#25A8BE]/15 text-[#187E91] flex items-center justify-center shrink-0 mt-0.5">
                        <Icon size={15} className="stroke-[2.2]" />
                      </span>
                      <span className="text-sm sm:text-[15px] text-slate-700 leading-snug">{label}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => navigate('#impact-suite', { title: 'Corporate ESG Report' })}
                  className="self-start inline-flex items-center gap-2 bg-[#187E91] hover:bg-[#136B7C] text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus:outline-none cursor-pointer"
                >
                  <span>Generate ESG Report</span>
                  <ArrowRight size={14} className="stroke-[2.2]" />
                </button>
              </div>

              {/* Right: ESG Preview Card */}
              <div className="bg-white rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 shadow-xl border border-stone-200/60">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-sans font-bold text-lg text-slate-900">ESG Impact Snapshot</h4>
                  <span className="text-[11px] font-semibold bg-[#25A8BE]/15 text-[#187E91] px-2.5 py-1 rounded-full">BRSR Core</span>
                </div>
                <p className="text-xs text-stone-500 mb-6">Sample enterprise diagnostic: FY 2024-25</p>

                {/* Progress Bars */}
                <div className="space-y-4 mb-7">
                  <ProgressBar label="Scope 1 Emissions Reduction" value={68} color="#187E91" />
                  <ProgressBar label="Scope 2 Renewable Energy %" value={45} color="#25A8BE" />
                  <ProgressBar label="Water Recycling Rate"        value={72} color="#187E91" />
                  <ProgressBar label="Waste Diverted from Landfill" value={61} color="#25A8BE" />
                </div>

                {/* BRSR Score */}
                <div className="bg-gradient-to-r from-[#187E91] to-[#136B7C] rounded-2xl p-5 text-white text-center">
                  <p className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-1">Overall BRSR Score</p>
                  <div className="text-5xl font-serif font-bold leading-none">78</div>
                  <div className="text-sm text-white/80 mt-1">out of 100 · Above Industry Average</div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
