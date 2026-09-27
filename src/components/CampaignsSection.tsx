import React from 'react';
import { Waves, Hammer, Trees, Calculator, ArrowRight, Sparkles } from 'lucide-react';
import { usePageTransition } from '../context/TransitionContext';

const CAMPAIGNS = [
  {
    title: 'Ocean Cleanup Initiative',
    subtitle: 'Monthly Coastal Action',
    desc: 'Join our monthly beach cleanup events across Indian coastlines, removing ocean-bound plastics and protecting marine biodiversity.',
    icon: Waves,
    color: '#0284C7',
    tag: 'Community Event',
  },
  {
    title: 'DIY Workshops',
    subtitle: 'Learn & Create',
    desc: 'Hands-on masterclasses to learn how to make your own natural enzymatic home cleaners, beeswax food wraps, and zero-waste body scrubs.',
    icon: Hammer,
    color: '#D97706',
    tag: 'Skill Building',
  },
  {
    title: 'Tree Planting Program',
    subtitle: 'One Purchase - One Tree',
    desc: 'Every verified order on Rayeva directly funds native tree saplings planted through our verified afforestation partners across rural India.',
    icon: Trees,
    color: '#15803D',
    tag: 'Direct Impact',
  },
  {
    title: 'Carbon Calculator',
    subtitle: 'Personal & Enterprise Footprint',
    desc: 'Measure your household and lifestyle emissions in under 2 minutes, get practical reduction tips, and offset remaining CO₂ seamlessly.',
    icon: Calculator,
    color: '#187E91',
    tag: 'Free Audit Tool',
  },
];

export default function CampaignsSection() {
  const { navigate } = usePageTransition();

  return (
    <section
      id="campaigns"
      className="relative w-full bg-[#FAF8F3] py-20 sm:py-28 overflow-hidden select-none border-t border-stone-200/50"
    >
      <div className="relative z-10 w-full max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-[0.22em] text-[#187E91] uppercase mb-3 bg-[#E3EFE7] px-3.5 py-1.5 rounded-full">
            <Sparkles size={13} className="stroke-[2.5]" />
            <span>COMMUNITY IN ACTION</span>
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal tracking-tight text-slate-900 leading-[1.15]">
            Sustainability Campaigns
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed font-normal">
            Collective action creates lasting transformation. Get involved in our nationwide campaigns and citizen-driven movements.
          </p>
        </div>

        {/* 4 Campaign Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CAMPAIGNS.map((camp, idx) => {
            const Icon = camp.icon;
            return (
              <div
                key={idx}
                className="group bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.09)] transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-xs transition-transform duration-300 group-hover:scale-108"
                      style={{ backgroundColor: camp.color }}
                    >
                      <Icon size={24} className="stroke-[2.2]" />
                    </div>
                    <span className="text-[10px] font-semibold text-stone-500 uppercase tracking-wider bg-stone-100 px-2.5 py-1 rounded-full">
                      {camp.tag}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg sm:text-xl font-semibold text-slate-950 group-hover:text-[#187E91] transition-colors leading-snug">
                    {camp.title}
                  </h3>

                  <div className="text-xs font-semibold text-[#187E91] mt-1">
                    {camp.subtitle}
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed mt-3">
                    {camp.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-slate-900 group-hover:text-[#187E91] transition-colors">
                  <span>Get involved</span>
                  <ArrowRight size={13} className="stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
