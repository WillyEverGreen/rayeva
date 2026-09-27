import React, { useState } from 'react';
import { Compass, Calendar, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

const MILESTONES = [
  {
    num: '1',
    date: 'Sept 2025',
    title: 'Foundation',
    desc: 'Establishing our core vision, securing initial partnerships, and building the conceptual framework for a sustainable marketplace.',
    accent: '#244835',
  },
  {
    num: '2',
    date: 'Nov 2025',
    title: 'Platform Development',
    desc: 'Developing our proprietary digital architecture, focusing on a seamless user experience and strict sustainability standards.',
    accent: '#187E91',
  },
  {
    num: '3',
    date: 'Feb 2026',
    title: 'Curation & Expansion',
    desc: 'Actively onboarding eco-conscious brand partners and curating a premium catalog of verified sustainable products.',
    accent: '#25A8BE',
  },
  {
    num: '4',
    date: 'April 2026',
    title: 'Launch Planning',
    desc: 'Finalizing operational logistics, conducting rigorous beta testing, and preparing our marketing strategy for public debut.',
    accent: '#059669',
  },
  {
    num: '5',
    date: 'May 2026',
    title: 'Official Launch',
    desc: 'Anticipating our upcoming official debut to the world, ready to empower consumers to make impactful and sustainable choices.',
    accent: '#0284C7',
  },
];

export default function MissionAndJourneySection() {
  const [activeTab, setActiveTab] = useState<'why' | 'what'>('what');

  return (
    <section
      id="mission-journey"
      className="relative w-full bg-[#FAF8F3] py-20 sm:py-28 overflow-hidden select-none border-t border-stone-200/50"
    >
      <div className="relative z-10 w-full max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Part 1: Our Mission */}
        <div className="bg-white rounded-[36px] p-8 sm:p-12 lg:p-16 border border-stone-200/80 shadow-[0_8px_32px_rgba(0,0,0,0.04)] mb-20 sm:mb-28">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-[0.22em] text-[#187E91] uppercase mb-3 bg-[#E3EFE7] px-3.5 py-1.5 rounded-full">
              <Compass size={13} className="stroke-[2.5]" />
              <span>GUIDING PURPOSE</span>
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal tracking-tight text-slate-900 leading-[1.15]">
              Our Mission
            </h2>
            <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
              Inspiring change, empowering communities, and building a cleaner, greener future for all.
            </p>

            {/* Toggle Tabs: Why We Do? / What We Do ? */}
            <div className="mt-8 inline-flex items-center p-1 rounded-full bg-stone-100 border border-stone-200">
              <button
                type="button"
                onClick={() => setActiveTab('why')}
                className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'why'
                    ? 'bg-[#244835] text-white shadow-xs'
                    : 'text-stone-700 hover:text-stone-950'
                }`}
              >
                Why We Do?
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('what')}
                className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'what'
                    ? 'bg-[#244835] text-white shadow-xs'
                    : 'text-stone-700 hover:text-stone-950'
                }`}
              >
                What We Do ?
              </button>
            </div>

            {/* Tab Description Body */}
            <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-[#FAF8F3] border border-stone-200/70 text-slate-800 text-sm sm:text-base leading-relaxed">
              {activeTab === 'why' ? (
                <p>
                  Buying sustainably in India has historically been fragmented, expensive, and filled with greenwashing. We exist to restore integrity to sustainable living, ensuring that choosing the planet never requires compromising on design, quality, or convenience.
                </p>
              ) : (
                <p>
                  At Rayeva, our mission is to drive impactful change for a cleaner, greener planet. We believe in empowering communities, supporting sustainable innovation, and inspiring everyone to take action for the environment. Through our campaigns, partnerships, and educational initiatives, we strive to make sustainability accessible and achievable for all.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Part 2: Rayeva & Beyond / Our Journey */}
        <div>
          <div className="max-w-3xl mb-12 sm:mb-16">
            <span className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-[0.22em] text-[#187E91] uppercase mb-3 bg-[#E3EFE7] px-3.5 py-1.5 rounded-full">
              <Calendar size={13} className="stroke-[2.5]" />
              <span>RAYEVA & BEYOND</span>
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal tracking-tight text-slate-900 leading-[1.15]">
              Our Journey
            </h2>
            <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
              Building a sustainable future through innovation and community engagement.
            </p>
          </div>

          {/* 5 Milestone Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 sm:gap-6">
            {MILESTONES.map((m, idx) => (
              <div
                key={idx}
                className="group relative bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/70 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.09)] transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span
                      className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold text-sm shadow-xs"
                      style={{ backgroundColor: m.accent }}
                    >
                      {m.num}
                    </span>
                    <span className="text-[11px] font-semibold text-[#187E91] uppercase tracking-wider bg-[#E3EFE7] px-2.5 py-1 rounded-full">
                      {m.date}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-semibold text-slate-950 mb-2 group-hover:text-[#187E91] transition-colors">
                    {m.title}
                  </h3>

                  <p className="text-xs text-stone-600 leading-relaxed font-normal">
                    {m.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-stone-100 flex items-center gap-1.5 text-[11px] font-semibold text-[#244835]">
                  <CheckCircle2 size={13} className="text-emerald-600" />
                  <span>Verified Phase</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
