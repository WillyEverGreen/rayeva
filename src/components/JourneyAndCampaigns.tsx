import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Waves,
  Hammer,
  Trees,
  Calculator,
  Compass,
  CheckCircle2,
  Calendar,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Target,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { usePageTransition } from '../context/TransitionContext';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

gsap.registerPlugin(ScrollTrigger);

interface Milestone {
  phase: string;
  year: string;
  title: string;
  status: 'Completed' | 'Operational' | 'Active Rollout' | 'Upcoming';
  statusColor: 'forest' | 'secondary' | 'outline' | 'default';
  description: string;
  highlights: string[];
}

const MILESTONES: Milestone[] = [
  {
    phase: 'Phase 01',
    year: 'Sept 2025',
    title: 'Architectural Foundation & ESG Framework',
    status: 'Completed',
    statusColor: 'forest',
    description: 'Conceived by investment banking veteran Sucheta Anchaliya to dismantle fragmented supply chains and establish India’s first end-to-end verified sustainable platform.',
    highlights: ['Multi-point laboratory audit protocol defined', 'Core circularity mechanics patented'],
  },
  {
    phase: 'Phase 02',
    year: 'Nov 2025',
    title: 'Platform Development & Reverse Logistics',
    status: 'Completed',
    statusColor: 'forest',
    description: 'Engineered high-performance digital commerce platform integrated with verified reverse logistics for certified packaging return and material re-manufacturing.',
    highlights: ['Cloud ESG carbon calculation engine built', 'Zero-plastic packaging supply chain secured'],
  },
  {
    phase: 'Phase 03',
    year: 'Feb 2026',
    title: 'Artisan Curation & 30+ Verified Partners',
    status: 'Operational',
    statusColor: 'secondary',
    description: 'Onboarded 30+ audited sustainable brand innovators pre-revenue, including Zerocircle (seaweed packaging), Green Hermitage (plant-leather), and Kadam Haat (handwoven craft).',
    highlights: ['2,400+ rural artisans connected', 'GC-MS chemical purity screenings passed'],
  },
  {
    phase: 'Phase 04',
    year: 'April 2026',
    title: 'SEBI BRSR Enterprise Gateway Beta',
    status: 'Active Rollout',
    statusColor: 'default',
    description: 'Finalizing enterprise bulk procurement gateway and automated BRSR Core Principles 2 & 6 ESG compliance audit report generator for corporate facilities.',
    highlights: ['Closed beta with 12 corporate facilities', 'Automated Scope 3 emissions reporting'],
  },
  {
    phase: 'Phase 05',
    year: 'May 2026',
    title: 'Public Ecosystem Launch & Impact Expansion',
    status: 'Upcoming',
    statusColor: 'outline',
    description: 'Nationwide public debut connecting conscious citizens, enterprise procurement managers, and certified recycling hubs across India.',
    highlights: ['Target: 100,000kg single-use plastic diverted in Year 1', 'Pan-India take-back network'],
  },
];

interface Campaign {
  title: string;
  category: string;
  description: string;
  metric: string;
  metricLabel: string;
  progress: number;
  icon: React.ElementType;
  accent: string;
}

const CAMPAIGNS: Campaign[] = [
  {
    title: 'Coastal Plastic Interception',
    category: 'Marine Ecosystems',
    description: 'Partnering with coastal recovery hubs to intercept discarded fishing nets and virgin PET bottles before they fragment into marine food chains.',
    metric: '42,800 kg',
    metricLabel: 'Plastic Recovered to Date',
    progress: 85,
    icon: Waves,
    accent: '#187E91',
  },
  {
    title: 'Artisan Repair & Upcycling Cafés',
    category: 'Circular Society',
    description: 'Regional community workshops teaching natural fabric restoration, knife sharpening, and furniture revamping to extend household product lifespans.',
    metric: '1,240+',
    metricLabel: 'Household Items Restored',
    progress: 68,
    icon: Hammer,
    accent: '#244835',
  },
  {
    title: 'Himalayan Indigenous Afforestation',
    category: 'Bio-Diversity',
    description: 'One purchase equals one indigenous broadleaf sapling planted in fragile Himalayan biodiversity zones with geotagged lifetime monitoring.',
    metric: '18,500+',
    metricLabel: 'Geotagged Native Trees',
    progress: 92,
    icon: Trees,
    accent: '#2D6A4F',
  },
  {
    title: 'Scope 1-3 Carbon Footprint Engine',
    category: 'Climate Technology',
    description: 'Empowering individuals and institutional enterprises to model annual greenhouse gas emissions with instant actionable offsetting pathways.',
    metric: '3,800 t',
    metricLabel: 'Verified CO₂e Displaced',
    progress: 74,
    icon: Calculator,
    accent: '#C27D56',
  },
];

export default function JourneyAndCampaigns() {
  const [activeMilestoneIdx, setActiveMilestoneIdx] = useState(2);
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const campaignsRef = useRef<HTMLDivElement>(null);
  const { navigate } = usePageTransition();

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top bottom',
            },
          }
        );
      }

      if (campaignsRef.current) {
        const cards = campaignsRef.current.querySelectorAll('.campaign-card');
        gsap.fromTo(
          cards,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: campaignsRef.current,
              start: 'top bottom',
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="journey"
      className="relative w-full bg-[#FAF8F3] py-14 sm:py-24 overflow-hidden select-none border-t border-stone-200/60"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#187E91]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-[#244835]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-10 space-y-14 sm:space-y-24">

        {/* ---------------- 1. JOURNEY HEADER ---------------- */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto">
          <Badge variant="secondary" className="mb-4 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider border border-[#244835]/15">
            <Compass size={13} className="text-[#187E91]" />
            <span>Evolution & Impact Trajectory</span>
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-stone-900 tracking-tight leading-[1.12]">
            Rayeva & Beyond: <br />
            <span className="italic text-[#187E91]">Our Journey & Living Campaigns</span>
          </h2>
          <p className="mt-4 text-stone-600 text-base sm:text-lg leading-relaxed font-normal">
            From an investment banking departure to 30+ verified brand partnerships, trace our operational roadmap and community impact initiatives.
          </p>
        </div>

        {/* ---------------- 2. INTERACTIVE TIMELINE ROADMAP ---------------- */}
        <div ref={timelineRef}>
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-stone-200/80">
            <div>
              <span className="text-xs font-bold text-[#187E91] uppercase tracking-wider block">
                Milestone Roadmap
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-stone-900 mt-1">
                Strategic Execution Timeline
              </h3>
            </div>
            <span className="text-xs text-stone-500 font-medium hidden sm:inline">
              Click any phase to review operational outcomes
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
            {MILESTONES.map((item, idx) => {
              const isSelected = activeMilestoneIdx === idx;
              return (
                <div
                  key={item.year}
                  onClick={() => setActiveMilestoneIdx(idx)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') setActiveMilestoneIdx(idx);
                  }}
                  className={`p-6 rounded-3xl border transition-all duration-300 cursor-pointer flex flex-col justify-between text-left ${
                    isSelected
                      ? 'bg-white border-[#187E91]/60 shadow-[0_12px_32px_rgba(24,126,145,0.12)] -translate-y-1.5 ring-2 ring-[#187E91]/20'
                      : 'bg-white/60 border-stone-200/80 hover:bg-white hover:border-stone-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-bold font-mono text-[#187E91]">
                        {item.phase}
                      </span>
                      <Badge variant={item.statusColor} className="text-[10px] py-0.5">
                        {item.status}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-stone-400 font-medium mb-1">
                      <Calendar size={12} />
                      <span>{item.year}</span>
                    </div>

                    <h4 className="font-serif text-base font-normal text-stone-900 leading-snug">
                      {item.title}
                    </h4>

                    <p className="mt-3 text-xs text-stone-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-3.5 border-t border-stone-100 space-y-1.5">
                    {item.highlights.map((hl, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-1.5 text-[11px] text-stone-500 font-medium leading-tight">
                        <CheckCircle2 size={12} className="text-[#187E91] shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ---------------- 3. LIVING IMPACT CAMPAIGNS ---------------- */}
        <div ref={campaignsRef}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-bold text-[#187E91] uppercase tracking-wider block">
                Active Ground Initiatives
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-stone-900 mt-1">
                Community & Conservation Campaigns
              </h3>
            </div>
            <Button
              variant="default"
              size="sm"
              onClick={() => navigate('#join-partner', { title: 'Partner with Campaigns' })}
              className="gap-2"
            >
              <span>Join an Initiative</span>
              <ArrowRight size={14} />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {CAMPAIGNS.map((camp) => {
              const Icon = camp.icon;
              return (
                <div
                  key={camp.title}
                  className="campaign-card bg-white rounded-3xl p-7 border border-stone-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_-10px_rgba(24,126,145,0.12)] transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
                >
                  <div>
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 shadow-xs"
                      style={{ backgroundColor: `${camp.accent}14`, color: camp.accent }}
                    >
                      <Icon size={22} className="stroke-[2.2]" />
                    </div>

                    <span className="text-[11px] font-bold text-[#187E91] uppercase tracking-wider block mb-1">
                      {camp.category}
                    </span>

                    <h4 className="font-serif text-lg font-normal text-stone-900 leading-snug">
                      {camp.title}
                    </h4>

                    <p className="mt-2.5 text-xs text-stone-600 leading-relaxed font-normal">
                      {camp.description}
                    </p>
                  </div>

                  {/* Impact Progress Metric */}
                  <div className="mt-6 pt-4 border-t border-stone-100">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-stone-900">
                        {camp.metric}
                      </span>
                      <span className="text-[10px] text-stone-400 font-mono">
                        {camp.progress}% Goal
                      </span>
                    </div>

                    <div className="w-full h-2 rounded-full bg-stone-100 overflow-hidden mb-2">
                      <div
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: `${camp.progress}%`,
                          backgroundColor: camp.accent,
                        }}
                      />
                    </div>

                    <span className="text-[10px] text-stone-400 font-medium block">
                      {camp.metricLabel}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
