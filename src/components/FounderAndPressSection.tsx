import React, { useState } from 'react';
import {
  Sparkles,
  ExternalLink,
  Users,
  Compass,
  ArrowRight,
  RotateCw,
  Award,
} from 'lucide-react';
import { usePageTransition } from '../context/TransitionContext';

export default function FounderAndPressSection() {
  const [isFlipped, setIsFlipped] = useState(false);
  const { navigate } = usePageTransition();

  return (
    <section
      id="about"
      className="relative w-full bg-[#FAF8F3] py-20 sm:py-28 overflow-hidden select-none border-t border-stone-200/50"
    >
      <div className="relative z-10 w-full max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-20">
          <span className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-[0.22em] text-[#187E91] uppercase mb-3 bg-[#E3EFE7] px-3.5 py-1.5 rounded-full">
            <Compass size={13} className="stroke-[2.5]" />
            <span>WHO WE ARE</span>
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal tracking-tight text-slate-900 leading-[1.15]">
            About Us
          </h2>
          <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed font-normal">
            Driven by passion, guided by vision, connected by community.
          </p>
        </div>

        {/* Founder & Team Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 mb-16 sm:mb-20 items-stretch">
          
          {/* Left: Founder Interactive Flip Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3 flex items-center justify-between">
              <span>Our Founder</span>
              <button
                type="button"
                onClick={() => setIsFlipped(!isFlipped)}
                className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#187E91] hover:text-[#244835] cursor-pointer"
              >
                <RotateCw size={12} />
                <span>{isFlipped ? 'Click to see front' : 'Click to see back'}</span>
              </button>
            </div>

            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className="group relative bg-white rounded-3xl p-7 sm:p-9 border border-stone-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.04)] cursor-pointer flex-1 flex flex-col justify-between transition-all duration-300 hover:shadow-xl"
            >
              {!isFlipped ? (
                // Front Side
                <div>
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#244835] to-[#187E91] text-white flex items-center justify-center font-serif text-3xl font-bold shadow-md mb-6">
                    SA
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-slate-950">
                    Sucheta Anchaliya
                  </h3>
                  <div className="text-sm font-semibold text-[#187E91] mt-1">
                    Founder & CEO | Rayeva
                  </div>

                  <p className="text-stone-600 text-sm leading-relaxed mt-4">
                    Founder of Rayeva, an end-to-end sustainable solutions platform integrating marketplace infrastructure, ESG advisory, and impact tracking.
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-[#E3EFE7] px-3.5 py-1.5 rounded-full w-max">
                    <Award size={13} />
                    <span>LSE Economics & Chartered Accountant</span>
                  </div>
                </div>
              ) : (
                // Back Side
                <div className="animate-in fade-in duration-200">
                  <div className="text-xs font-bold uppercase tracking-widest text-[#187E91] mb-3">
                    Background & Credentials
                  </div>
                  <h4 className="font-serif text-xl font-bold text-slate-950 mb-3">
                    Leadership Pedigree
                  </h4>
                  <ul className="space-y-3 text-stone-700 text-xs sm:text-sm leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#187E91] mt-2 shrink-0" />
                      <span>Chartered Accountant with academic grounding in International Economics from the London School of Economics (LSE).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#187E91] mt-2 shrink-0" />
                      <span>Former Equity Capital Markets Investment Banker and ex-CNBC Moneycontrol Anchor & Research Analyst.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#187E91] mt-2 shrink-0" />
                      <span>Spearheading India's first end-to-end verified closed-loop circular economy infrastructure.</span>
                    </li>
                  </ul>
                </div>
              )}

              <div className="mt-8 pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-stone-500">
                <span>{isFlipped ? '← View Profile' : 'Click to see back →'}</span>
                <span className="text-[#187E91]">Rayeva Leadership</span>
              </div>
            </div>
          </div>

          {/* Right: Team & Community (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Our Team Card */}
            <div className="bg-white rounded-3xl p-7 border border-stone-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#E3EFE7] text-[#244835] flex items-center justify-center mb-5">
                  <Users size={24} className="stroke-[2.2]" />
                </div>

                <h3 className="font-serif text-xl font-semibold text-slate-950 mb-2">
                  Our Team
                </h3>

                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                  A group of diverse thinkers, creators, and innovators. We bring together expertise across technology, design, and strategy to achieve a shared purpose.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => navigate('#about', { title: 'Rayeva Services' })}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#187E91] hover:text-[#244835]"
                >
                  <span>Our Services</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>

            {/* Our Community Card */}
            <div className="bg-white rounded-3xl p-7 border border-stone-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-[#187E91] flex items-center justify-center mb-5">
                  <Compass size={24} className="stroke-[2.2]" />
                </div>

                <h3 className="font-serif text-xl font-semibold text-slate-950 mb-2">
                  Our Community
                </h3>

                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                  Our strength lies in our community. Together, we learn, grow, and support each other while shaping a better, more sustainable future.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => navigate('#about', { title: 'Our Mission' })}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#187E91] hover:text-[#244835]"
                >
                  <span>Our Mission</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Featured In Press Banner */}
        <div className="bg-gradient-to-r from-[#244835] via-[#1E3D2D] to-[#187E91] rounded-[32px] p-8 sm:p-12 text-white shadow-xl relative overflow-hidden flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#28B6CC] mb-3">
              <Sparkles size={14} />
              <span>FEATURED IN PRESS</span>
            </span>

            <h3 className="font-serif text-2xl sm:text-3xl text-white font-medium leading-snug">
              Sucheta Anchaliya: The Founder Who Rebuilt Sustainable Sourcing From Scratch
            </h3>

            <p className="mt-3 text-emerald-100/85 text-xs sm:text-sm leading-relaxed">
              Sucheta Anchaliya left investment banking to fix a broken sustainability supply chain. Now RAYEVA has onboarded 30+ verified brands, pre-revenue. Read her story on Climatora.
            </p>

            <div className="mt-3 text-[11px] font-semibold text-emerald-300">
              Published on Climatora • Climate Champions Story
            </div>
          </div>

          <a
            href="https://climatora.com/climate-champions-details/28/sucheta-anchaliya-ditched-a-paper-bottle-idea-to-fix-four-broken-problems-instead"
            target="_blank"
            rel="noopener noreferrer"
            className="group shrink-0 inline-flex items-center gap-2.5 bg-white text-slate-900 font-semibold px-6 sm:px-8 py-3.5 rounded-full text-xs sm:text-sm shadow-md hover:bg-stone-100 transition-all duration-300 hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            <span>Read Full Article</span>
            <ExternalLink size={14} className="stroke-[2.5] text-[#187E91]" />
          </a>
        </div>

      </div>
    </section>
  );
}
