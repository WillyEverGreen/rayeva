import React from 'react';
import { Handshake, ArrowRight, ExternalLink } from 'lucide-react';
import { usePageTransition } from '../context/TransitionContext';

interface PartnerBrand {
  name: string;
  tagline: string;
  category: string;
  accent: string;
  logo: string;
}

const PARTNERS: PartnerBrand[] = [
  {
    name: 'Kheoni',
    tagline: 'Kheoni - a story of sustainability. We are a wellness brand with products inspired by the wilderness and rooted in natural healing.',
    category: 'Wellness & Healing',
    accent: '#187E91',
    logo: '/logos/kheoni.png',
  },
  {
    name: 'Impact Water',
    tagline: 'Impact Water: drinking water packaged in sustainable, paper-based cartons that are BPA-free and easily recyclable. Better for you and the planet!',
    category: 'Clean Hydration',
    accent: '#136B7C',
    logo: '/logos/impact-water.png',
  },
  {
    name: 'Bahem',
    tagline: 'Bahem is a sustainable clothing brand focused on timeless design and responsible production. Eco-conscious materials, quality, and low carbon footprint.',
    category: 'Conscious Apparel',
    accent: '#3E5C46',
    logo: '/logos/bahem.png',
  },
  {
    name: 'Kadam Haat',
    tagline: 'Kadam Haat is a handcrafted brand supporting Indian artisans. We create eco-friendly products like Sabai grass tote bags and handmade accessories.',
    category: 'Artisanal Crafts',
    accent: '#B45309',
    logo: '/logos/kadam-haat.png',
  },
  {
    name: 'Atovio',
    tagline: "India's most effective portable air purifier. Designed & made in India to fight urban pollution. Practical, stylish, and affordable. Clean air, everywhere.",
    category: 'Clean Air Tech',
    accent: '#0284C7',
    logo: '/logos/atovio.png',
  },
  {
    name: 'Zerocircle',
    tagline: 'Ocean-safe materials made from seaweed. India’s first seaweed-based biodegradable packaging: compostable, plastic-free, and ocean-friendly.',
    category: 'Bio Packaging',
    accent: '#0D9488',
    logo: '/logos/zerocircle.svg',
  },
  {
    name: 'Green Hermitage',
    tagline: 'Premium vegan leather brand crafting timeless handbags and travel accessories from 100% plant-based materials like cactus, apple, banana and coconut.',
    category: 'Plant Leather',
    accent: '#203C2A',
    logo: '/logos/green-hermitage.png',
  },
  {
    name: 'Papaya Pads',
    tagline: 'Sustainable period care products: comfortable, chemical-free, biodegradable eco-conscious pads for the modern woman.',
    category: 'Personal Care',
    accent: '#BE185D',
    logo: '/logos/papaya.png',
  },
  {
    name: 'Natch Snacks',
    tagline: 'Delicious. Naturally. Wholesome gourmet snacks crafted with real, transparent ingredients and no artificial additives.',
    category: 'Clean Pantry',
    accent: '#C2410C',
    logo: '/logos/natch.png',
  },
];

export default function PartnersSection() {
  const { navigate } = usePageTransition();

  return (
    <section
      id="brands"
      className="relative w-full bg-[#FAF8F3] py-20 sm:py-28 overflow-hidden select-none border-t border-stone-200/50"
    >
      <div className="relative z-10 w-full max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-[0.22em] text-[#187E91] uppercase mb-3 bg-[#E3EFE7] px-3.5 py-1.5 rounded-full">
              <Handshake size={13} className="stroke-[2.5]" />
              <span>VERIFIED BRAND ECOSYSTEM</span>
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal tracking-tight text-slate-900 leading-[1.15]">
              Our Partners
            </h2>
            <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed font-normal">
              We collaborate with pioneering sustainable brands to create a greener, more conscious future together.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate('#join-partner', { title: 'Partner With Rayeva' })}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#187E91] hover:text-[#244835] transition-colors"
          >
            <span>Partner With Us</span>
            <ArrowRight size={14} className="stroke-[2.5]" />
          </button>
        </div>

        {/* 10 Brands Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 sm:gap-6">
          {PARTNERS.map((brand, i) => (
            <div
              key={i}
              className="group bg-white rounded-3xl p-6 border border-stone-200/70 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.09)] transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
            >
              <div>
                {/* Brand Logo Showcase - Clean Pure Surface */}
                <div className="relative mb-4 h-20 rounded-2xl bg-[#FCFBF9] border border-stone-200/90 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)] flex items-center justify-center px-4 overflow-hidden transition-all duration-300 group-hover:border-stone-300 group-hover:bg-white group-hover:shadow-[0_6px_16px_-4px_rgba(0,0,0,0.06)]">
                  <img
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    className="relative z-10 max-h-11 max-w-[150px] w-auto object-contain transition-transform duration-300 group-hover:scale-105 select-none"
                    loading="lazy"
                  />
                </div>

                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                    style={{ color: brand.accent, backgroundColor: `${brand.accent}14` }}
                  >
                    {brand.category}
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/70 px-2 py-0.5 rounded-full">
                    Audited
                  </span>
                </div>

                {/* Brand Name */}
                <h3 className="font-serif text-lg font-semibold text-slate-950 group-hover:text-[#187E91] transition-colors">
                  {brand.name}
                </h3>

                {/* Tagline */}
                <p className="text-xs text-stone-600 leading-relaxed mt-2.5 line-clamp-4">
                  {brand.tagline}
                </p>
              </div>

              {/* Bottom Micro Footer */}
              <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] font-semibold text-stone-500 group-hover:text-[#187E91] transition-colors">
                <span>Verified Partner</span>
                <ExternalLink size={12} className="stroke-[2.5]" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
