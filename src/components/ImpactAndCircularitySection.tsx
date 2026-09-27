import React, { useState, useRef } from 'react';
import {
  ShoppingBag,
  Recycle,
  Package,
  Sparkles,
  Cpu,
  ShieldCheck,
} from 'lucide-react';
import { Badge } from './ui/badge';
import RayevaTree from './RayevaTree';
import PlasticCrisisAndRecycling from './PlasticCrisisAndRecycling';
import { SectionLeavesAccents, BotanicalVineDivider } from './BotanicalDecorations';

const PLATFORM_SOLUTIONS = [
  {
    id: 'verify',
    name: 'Verified Everyday Essentials',
    description: '30+ lab-audited brands with zero microplastics, organic fibers, and verified ethical wages.',
    icon: ShoppingBag,
    accent: '#244835',
    metric: '100% Non-Toxic',
    badgeImg: '/extracted/circularity/circularity_01_choose_badge_only.png',
  },
  {
    id: 'recycle',
    name: 'Closed-Loop Take-Back',
    description: 'Reverse logistics system coordinating collection and secondary material repurposing.',
    icon: Recycle,
    accent: '#187E91',
    metric: '94.2% Recovery',
    badgeImg: '/extracted/circularity/circularity_03_reuse_badge_only.png',
  },
  {
    id: 'plastic',
    name: 'Bio-Circular Packaging',
    description: 'Home-compostable seaweed and agricultural biomass replacing all single-use bubble wraps.',
    icon: Package,
    accent: '#2D6A4F',
    metric: 'Zero Plastic Mailers',
    badgeImg: '/extracted/circularity/circularity_04_return_badge_only.png',
  },
  {
    id: 'upcycle',
    name: 'Artisan Upcycling',
    description: 'Discarded textiles and agricultural residues transformed into heirloom lifestyle artifacts.',
    icon: Sparkles,
    accent: '#C27D56',
    metric: '2,400+ Artisans',
    badgeImg: '/extracted/circularity/circularity_05_regenerate_badge_only.png',
  },
  {
    id: 'scale',
    name: 'Enterprise BRSR Suite',
    description: 'Audited Scope 1-3 emissions data and certified industrial waste collection manifests.',
    icon: Cpu,
    accent: '#136B7C',
    metric: 'SEBI Aligned',
    badgeImg: '/extracted/circularity/circularity_06_greater_impact_badge_only.png',
  },
];

export default function ImpactAndCircularitySection() {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('verify');
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      id="impact"
      className="relative w-full bg-[#FAF8F3] py-14 sm:py-20 px-4 sm:px-6 lg:px-12 select-none overflow-hidden border-t border-stone-200/60"
    >
      {/* Background radial gradients & botanical leaves */}
      <div className="absolute top-1/4 left-0 w-[550px] h-[550px] bg-[#187E91]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-[#244835]/5 rounded-full blur-[140px] pointer-events-none" />
      <SectionLeavesAccents side="both" top="top-24" />

      <div className="max-w-[1520px] mx-auto space-y-14 sm:space-y-18">

        {/* ---------------- 1. EXECUTIVE IMPACT HEADER ---------------- */}
        <div ref={headerRef} className="text-center max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-4 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest border border-[#244835]/15">
            <ShieldCheck size={13} className="text-[#187E91]" />
            <span>Verifiable Ecological Accounting</span>
          </Badge>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-stone-900 leading-[1.12]">
            Closing the Loop From Consumption <br className="hidden sm:inline" />
            <span className="italic text-[#187E91]">To Quantifiable Regeneration</span>
          </h2>
          <p className="mt-5 text-stone-600 text-base sm:text-lg leading-relaxed font-normal max-w-2xl mx-auto">
            Rayeva eliminates the guesswork in conscious living. We measure, audit, and divert tons of plastic waste while providing institutional ESG compliance data for modern India.
          </p>
        </div>

        {/* ---------------- 2. FIVE PLATFORM SOLUTIONS ---------------- */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold text-[#187E91] uppercase tracking-wider block">
                The Ecosystem
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-stone-900 mt-1">
                Integrated Circularity Architecture
              </h3>
            </div>
            <span className="text-xs text-stone-500 font-medium">
              5 Connected Pillars • 0 Waste to Landfill Policy
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {PLATFORM_SOLUTIONS.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = selectedNodeId === item.id;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedNodeId(item.id)}
                  className={`group relative bg-white/95 rounded-3xl p-6 border transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between cursor-pointer ${
                    isSelected
                      ? 'border-[#187E91] shadow-[0_12px_32px_-6px_rgba(24,126,145,0.18)] ring-1 ring-[#187E91]/30'
                      : 'border-stone-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_-8px_rgba(24,126,145,0.12)]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shadow-xs shrink-0"
                        style={{ backgroundColor: `${item.accent}14`, color: item.accent }}
                      >
                        <Icon size={26} className="stroke-[2.2]" />
                      </div>

                      <img
                        src={item.badgeImg}
                        alt={`${item.name} emblem`}
                        className="w-12 h-12 sm:w-14 sm:h-14 object-contain opacity-95 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 drop-shadow-sm select-none shrink-0"
                        loading="lazy"
                      />
                    </div>

                    <h4 className="font-serif text-lg font-normal text-stone-900 leading-snug group-hover:text-[#187E91] transition-colors">
                      {item.name}
                    </h4>

                    <p className="mt-2 text-stone-600 text-xs leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-3.5 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-stone-700 uppercase tracking-wider">
                      {item.metric}
                    </span>
                    <span className="text-[10px] text-stone-400 font-mono">0{idx + 1}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Hand-Illustrated Daisy & Botanical Rule Divider */}
        <BotanicalVineDivider variant="daisy" maxWidth={880} className="my-10 sm:my-14" />

        {/* ---------------- 3. THE PLASTIC CRISIS (EXACT RED NUMBERS) & RECYCLING RESPONSE ---------------- */}
        <div className="pt-2">
          <PlasticCrisisAndRecycling />
        </div>

        {/* Minimalist Sprout Divider between Crisis and Rayeva Tree */}
        <BotanicalVineDivider variant="sprout" maxWidth={760} className="my-8 sm:my-12" />

        {/* ---------------- 4. THE INTERACTIVE BOTANICAL RAYEVA TREE (SCULPTED LIVING CANOPY) ---------------- */}
        <div className="pt-4">
          <RayevaTree
            selectedNodeId={selectedNodeId}
            onSelectNode={(id) => setSelectedNodeId(id)}
          />
        </div>

      </div>
    </section>
  );
}
