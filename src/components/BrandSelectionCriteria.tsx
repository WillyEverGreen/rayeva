import React from 'react';
import {
  ShieldCheck,
  Heart,
  Eye,
  Lightbulb,
  Users,
  Scale,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { usePageTransition } from '../context/TransitionContext';
import { Button } from './ui/button';

const STANDARDS = [
  {
    icon: ShieldCheck,
    title: 'Sustainability',
    desc: 'Eco-friendly packaging, carbon-neutral shipping, and upcycled or compostable ingredients.',
    color: '#10B981',
  },
  {
    icon: Heart,
    title: 'Health & Safety',
    desc: 'Non-toxic, organic, clean-label, and independently certified chemical-free formulas.',
    color: '#06B6D4',
  },
  {
    icon: Eye,
    title: 'Transparency',
    desc: 'Honest ingredient disclosure, zero greenwashing, and fully traceable material origin.',
    color: '#8B5CF6',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    desc: 'Pioneering closed-loop solutions, waterless products, and scalable circular design.',
    color: '#F97316',
  },
  {
    icon: Users,
    title: 'Locally Inclusive',
    desc: 'Empowering regional artisan clusters, rural craftspeople, and women-led cooperatives.',
    color: '#EF4444',
  },
  {
    icon: Scale,
    title: 'Ethical Practice',
    desc: 'Cruelty-free certification, fair living wages, and dignified working conditions for all.',
    color: '#2563EB',
  },
];

export default function BrandSelectionCriteria() {
  const { navigate } = usePageTransition();

  return (
    <section
      id="brand-criteria"
      className="relative w-full bg-[#FAF8F3] py-20 sm:py-28 overflow-hidden select-none border-t border-stone-200/50"
    >
      <div className="relative z-10 w-full max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Main Grid: Left Story + Right Standards Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Narrative (5 cols) */}
          <div className="lg:col-span-5">
            <span className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-[0.22em] text-[#187E91] uppercase mb-3 bg-[#E3EFE7] px-3.5 py-1.5 rounded-full">
              <Sparkles size={13} className="stroke-[2.5]" />
              <span>THE VETTING FRAMEWORK</span>
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal tracking-tight text-slate-900 leading-[1.15]">
              How We Choose a{' '}
              <span className="italic font-serif text-[#187E91]">Brand ?</span>
            </h2>

            <p className="mt-5 text-stone-600 text-sm sm:text-base leading-relaxed font-normal">
              Rayeva is built on values that put <strong className="text-slate-900 font-semibold">Sustainability</strong> and <strong className="text-slate-900 font-semibold">Consumer Consciousness</strong> at the heart of everything we do.
            </p>

            <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed font-normal">
              Our selection process is rigorous, but the outcome is simple: Products you can trust, Values you can believe in, and Choices that feel good. Because with Rayeva, every purchase isn’t just conscious, it’s a little celebration for you and the planet.
            </p>

            {/* CTAs from original site */}
            <div className="mt-8 flex flex-wrap items-center justify-center sm:justify-start gap-3.5">
              <Button
                variant="default"
                size="default"
                onClick={() => navigate('#about', { title: 'About Rayeva Standards' })}
                className="gap-2"
              >
                <span>Learn More</span>
                <ArrowRight size={14} className="stroke-[2.2]" />
              </Button>

              <Button
                variant="outline"
                size="default"
                onClick={() => navigate('#join-partner', { title: 'Become a Partner' })}
              >
                <span>Become a Partner</span>
              </Button>
            </div>
          </div>

          {/* Right Column: 6 Rayeva Standards Cards (7 cols) */}
          <div className="lg:col-span-7">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Rayeva Standards
              </span>
              <span className="text-xs font-semibold text-[#187E91]">
                6 Strict Verification Pillars
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {STANDARDS.map((std, idx) => {
                const Icon = std.icon;
                return (
                  <div
                    key={idx}
                    className="group bg-white rounded-2xl p-5 sm:p-6 border border-stone-200/80 shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex items-center gap-3.5 mb-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-2xs transition-transform duration-300 group-hover:scale-110"
                        style={{ backgroundColor: std.color }}
                      >
                        <Icon size={20} className="stroke-[2.2]" />
                      </div>
                      <h3 className="font-serif text-base sm:text-lg font-semibold text-slate-900 group-hover:text-[#187E91] transition-colors">
                        {std.title}
                      </h3>
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {std.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
