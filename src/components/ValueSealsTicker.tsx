import React from 'react';
import {
  Sparkles,
  Leaf,
  Heart,
  ShieldCheck,
  CheckCircle,
  Cpu,
  Recycle,
  Feather,
  Droplet,
  Sun,
  Flame,
  Globe,
} from 'lucide-react';

const ATTRIBUTES = [
  'Compostable',
  'Cruelty Free',
  'Eco Friendly',
  'Ethical Labour',
  'Fairly Traded',
  'Gluten Free',
  'Handmade',
  'Locally Sourced',
  'Low Emission',
  'No Artificial Color',
  'No Artificial Flavor',
  'Non Toxic',
  'Organic',
  'Sugar Free',
  'Transparent',
  'Upcycled',
];

export default function ValueSealsTicker() {
  return (
    <section
      id="insights-ticker"
      className="relative w-full bg-[#FAF8F3] py-16 sm:py-20 overflow-hidden select-none border-t border-stone-200/50"
    >
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-10 text-center mb-10">
        <span className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-[0.22em] text-[#187E91] uppercase mb-2 bg-[#E3EFE7] px-3.5 py-1.5 rounded-full">
          <Sparkles size={13} className="stroke-[2.5]" />
          <span>VERIFIED ETHICAL ATTRIBUTES</span>
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif font-normal tracking-tight text-slate-900">
          Insights & Standards
        </h2>
        <p className="mt-3 text-stone-600 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
          Dive into our sustainability initiatives, inspiring stories, and eco-education content, designed to empower you to live greener.
        </p>
      </div>

      {/* Infinite Scrolling Ribbon */}
      <div className="relative w-full overflow-hidden py-3">
        {/* Soft edge fade overlays */}
        <div className="absolute left-0 inset-y-0 w-24 bg-gradient-to-r from-[#FAF8F3] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 inset-y-0 w-24 bg-gradient-to-l from-[#FAF8F3] to-transparent z-10 pointer-events-none" />

        <div className="flex w-max items-center gap-3 animate-marquee hover:[animation-play-state:paused]">
          {[...ATTRIBUTES, ...ATTRIBUTES].map((attr, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-stone-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.03)] text-xs sm:text-sm font-semibold text-slate-900 transition-transform duration-200 hover:scale-105"
            >
              <span className="w-2 h-2 rounded-full bg-[#187E91]" />
              <span>{attr}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
