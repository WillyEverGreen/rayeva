import React, { useState } from 'react';
import {
  Sparkles,
  Star,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Gift,
  Check,
} from 'lucide-react';
import { usePageTransition } from '../context/TransitionContext';

const KIT_ITEMS = [
  'Bamboo Toothbrush',
  'Reusable Water Bottle',
  'Organic Cotton Bag',
  'Bamboo Shaker',
  'Eco-friendly Soap',
  'Bamboo Cutlery Set',
];

export default function StarterKitSection() {
  const [ordered, setOrdered] = useState(false);
  const { navigate } = usePageTransition();

  const handleOrder = () => {
    setOrdered(true);
    setTimeout(() => setOrdered(false), 3000);
  };

  return (
    <section
      id="starter-kit"
      className="relative w-full bg-[#FAF8F3] py-20 sm:py-28 overflow-hidden select-none border-t border-stone-200/50"
    >
      <div className="relative z-10 w-full max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Main Box Container */}
        <div className="bg-gradient-to-br from-[#244835] via-[#1E3D2D] to-[#152D21] rounded-[36px] sm:rounded-[44px] p-8 sm:p-12 lg:p-16 text-white shadow-2xl relative overflow-hidden">
          
          {/* Subtle botanical backdrop ambient */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#187E91]/20 rounded-full blur-[140px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Visual Kit Flat-Lay (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-[28px] overflow-hidden aspect-[4/3] sm:aspect-square bg-white/5 border border-white/15 shadow-xl">
                <img
                  src="/categories/card-3-zerowaste.png"
                  alt="Rayeva Starter Kit"
                  className="w-full h-full object-cover"
                />
                
                {/* Floating Discount Tag */}
                <div className="absolute top-4 left-4 z-10 bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                  <Sparkles size={14} className="fill-slate-950" />
                  <span>Save ₹150.0! (23% OFF)</span>
                </div>
              </div>

              {/* Items Pill Row Below Image */}
              <div className="mt-5 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
                <div className="text-xs font-semibold uppercase tracking-wider text-emerald-300 mb-2">
                  Kit Includes (6 Items):
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-white/90">
                  {KIT_ITEMS.map((item, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <span className="w-3.5 h-3.5 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center shrink-0">
                        <Check size={9} className="stroke-[3]" />
                      </span>
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Copy & Pricing (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#28B6CC] uppercase mb-3">
                <Gift size={14} />
                <span>CURATED ESSENTIALS BUNDLE</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal tracking-tight text-white leading-tight">
                Rayeva: <span className="italic font-serif text-[#28B6CC]">Begin Your Journey</span>
              </h2>

              <p className="mt-4 text-emerald-100/85 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
                Our curated starter kit contains everything you need to begin your sustainable lifestyle transformation. Each product is carefully selected for maximum impact and ease of use.
              </p>

              {/* Rating & Social Proof */}
              <div className="mt-5 flex items-center gap-3">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-amber-400" />
                  ))}
                </div>
                <span className="text-xs sm:text-sm font-semibold text-emerald-100">
                  (4.9/5 from 234 reviews)
                </span>
              </div>

              {/* Price Row */}
              <div className="mt-8 flex items-baseline gap-4">
                <span className="text-4xl sm:text-5xl font-serif font-bold text-white">
                  ₹499.0
                </span>
                <span className="text-xl sm:text-2xl text-emerald-200/50 line-through">
                  ₹650.0
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/25 border border-emerald-400/30 text-emerald-300 font-bold text-xs sm:text-sm">
                  23% OFF
                </span>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 flex flex-wrap items-center gap-2 sm:gap-3">
                {['100% Sustainable', 'Zero Waste', 'Ethically Sourced', 'Planet Friendly'].map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs text-white font-medium"
                  >
                    <CheckCircle2 size={12} className="text-emerald-300" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>

              {/* CTA Button */}
              <div className="mt-8 flex items-center gap-4">
                <button
                  type="button"
                  onClick={handleOrder}
                  className="inline-flex items-center gap-3 bg-[#187E91] hover:bg-[#136B7C] text-white font-semibold px-8 py-3.5 rounded-xl text-sm sm:text-base shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  <span>{ordered ? 'Kit Added to Bag!' : 'Shop the Kit'}</span>
                  <ArrowRight size={17} className="stroke-[2.5]" />
                </button>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
