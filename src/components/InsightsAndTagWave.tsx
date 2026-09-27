import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Sprout,
  HeartHandshake,
  Globe2,
  Scale,
  Wheat,
  HandMetal,
  MapPin,
  Wind,
  Palette,
  Sparkles,
  FlaskConical,
  Apple,
  Search,
  Recycle,
  ShieldCheck,
  Droplets,
  BookOpen,
  ArrowRight,
  Clock,
  ExternalLink,
} from 'lucide-react';
import { usePageTransition } from '../context/TransitionContext';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

gsap.registerPlugin(ScrollTrigger);

interface AttributeTag {
  id: string;
  name: string;
  icon: React.ElementType;
  category: string;
  accent: string;
}

const ATTRIBUTES: AttributeTag[] = [
  { id: 'compostable', name: 'Home Compostable', icon: Sprout, category: 'Packaging', accent: '#244835' },
  { id: 'crueltyfree', name: 'Cruelty-Free Certified', icon: HeartHandshake, category: 'Ethics', accent: '#187E91' },
  { id: 'ecofriendly', name: 'Planetary Friendly', icon: Globe2, category: 'Climate', accent: '#2D6A4F' },
  { id: 'fairtrade', name: 'Fair Living Wages', icon: Scale, category: 'Social', accent: '#C27D56' },
  { id: 'glutenfree', name: 'Purity Tested', icon: Wheat, category: 'Wellness', accent: '#136B7C' },
  { id: 'handmade', name: 'Heritage Artisan Craft', icon: HandMetal, category: 'Craft', accent: '#838e70' },
  { id: 'locallysourced', name: 'Hyper-Local Sourcing', icon: MapPin, category: 'Supply Chain', accent: '#244835' },
  { id: 'lowemission', name: 'Low Carbon Freight', icon: Wind, category: 'Emissions', accent: '#187E91' },
  { id: 'nocolor', name: 'Zero Synthetic Dyes', icon: Palette, category: 'Clean Input', accent: '#2D6A4F' },
  { id: 'nontoxic', name: '100% Non-Toxic Formulations', icon: FlaskConical, category: 'Safety', accent: '#C27D56' },
  { id: 'organic', name: 'Regenerative Organic', icon: Apple, category: 'Agriculture', accent: '#244835' },
  { id: 'transparent', name: 'Open Origin Transparency', icon: Search, category: 'Traceability', accent: '#187E91' },
  { id: 'upcycled', name: 'Upcycled Biomass Waste', icon: Recycle, category: 'Circularity', accent: '#2D6A4F' },
  { id: 'waterless', name: 'Zero-Waste Water Formulations', icon: Droplets, category: 'Conservation', accent: '#136B7C' },
  { id: 'verified', name: 'Independent Lab Audited', icon: ShieldCheck, category: 'Verification', accent: '#838e70' },
  { id: 'circular', name: 'Closed-Loop Lifecycle', icon: Sparkles, category: 'Regeneration', accent: '#244835' },
];

interface InsightArticle {
  id: string;
  category: string;
  title: string;
  summary: string;
  readTime: string;
  date: string;
  author: string;
}

const INSIGHT_ARTICLES: InsightArticle[] = [
  {
    id: 'bioplastics',
    category: 'Material Science',
    title: 'The Truth About Bio-Plastics: Marine Degradability vs. Industrial Composting',
    summary: 'Why common PLA cutlery often fails in standard soil, and how next-generation seaweed alginate biopolymers like Zerocircle are transforming circular packaging in India.',
    readTime: '6 min read',
    date: 'Sep 2026',
    author: 'Dr. Aranya Sen • Material Fellow',
  },
  {
    id: 'brsr',
    category: 'Regulatory ESG',
    title: 'Demystifying SEBI BRSR Core: The Supply Chain Disclosure Playbook for Indian MSMEs',
    summary: 'A step-by-step executive guide on tracking Scope 3 upstream logistics, calculating landfill diversion ratios, and avoiding greenwashing penalties under updated Indian regulations.',
    readTime: '8 min read',
    date: 'Aug 2026',
    author: 'Sucheta Anchaliya • Founder',
  },
  {
    id: 'artisans',
    category: 'Social Impact',
    title: 'From Agricultural Waste to Heirloom Goods: The Women Weavers of Mayurbhanj',
    summary: 'How wild Sabai grass cultivation in rural Odisha is creating self-sustaining micro-economies and displacing synthetic plastic home organizers across metropolitan cities.',
    readTime: '5 min read',
    date: 'Jul 2026',
    author: 'Priyamvada Joshi • Rural Clusters',
  },
];

export default function InsightsAndTagWave() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cloudRef = useRef<HTMLDivElement>(null);
  const { navigate } = usePageTransition();

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
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
      id="insights"
      className="relative w-full bg-[#FAF8F3] py-14 sm:py-24 overflow-hidden select-none border-t border-stone-200/60"
    >
      {/* Background ambient blurs & botanical flora */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#187E91]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[500px] h-[500px] bg-[#244835]/5 rounded-full blur-[140px] pointer-events-none" />
      
      {/* Authentic Hand-Drawn Floral & Leaf Accents */}
      <img
        src="/extracted/florals/meadow_wildflowers_bouquet.png"
        alt=""
        className="pointer-events-none absolute top-12 left-6 w-20 sm:w-28 opacity-65 select-none hidden lg:block drop-shadow-xs"
        loading="lazy"
      />
      <img
        src="/extracted/leaves/leaf_top_sky_drifting_1.png"
        alt=""
        className="pointer-events-none absolute top-20 right-10 w-9 sm:w-12 opacity-60 animate-float-slow select-none hidden md:block drop-shadow-xs"
        loading="lazy"
      />
      <img
        src="/extracted/leaves/leaf_top_sky_drifting_2.png"
        alt=""
        className="pointer-events-none absolute bottom-16 left-8 w-10 sm:w-14 opacity-55 animate-float-delayed select-none hidden md:block drop-shadow-xs"
        loading="lazy"
      />

      <div className="relative z-10 max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-10">

        {/* ---------------- 1. SECTION HEADER ---------------- */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <Badge variant="secondary" className="mb-4 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider border border-[#244835]/15">
            <BookOpen size={13} className="text-[#187E91]" />
            <span>Sustainability Intelligence & Verification</span>
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-stone-900 tracking-tight leading-[1.12]">
            Evidence-Based Insights & <br />
            <span className="italic text-[#187E91]">Ethical Standards Taxonomy</span>
          </h2>
          <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed font-normal">
            Every product on our platform must satisfy rigorous verifiable criteria. Explore our 16 core sustainability seals and deep-dive technical research below.
          </p>
        </div>

        {/* ---------------- 2. ELEGANT FLOATING ATTRIBUTE CLOUD (NO EMOJIS) ---------------- */}
        <div className="mb-12 sm:mb-20">
          {/* Header row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#244835]/10 border border-[#244835]/20">
                <ShieldCheck size={18} className="text-[#244835]" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-stone-400 uppercase tracking-[0.2em]">Rayeva Verified Taxonomy</p>
                <p className="text-sm font-bold text-stone-800">16 Certified Standards <span className="text-[#187E91]">•</span> Click any tag to filter catalog</p>
              </div>
            </div>
            {selectedTag && (
              <button
                type="button"
                onClick={() => setSelectedTag(null)}
                className="self-start sm:self-auto text-xs font-semibold text-[#187E91] hover:underline cursor-pointer shrink-0 px-3 py-1.5 rounded-full bg-[#187E91]/10 border border-[#187E91]/20 transition-colors hover:bg-[#187E91]/15"
              >
                Clear Selection ✕
              </button>
            )}
          </div>

          <div
            ref={cloudRef}
            className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 p-6 sm:p-10 rounded-3xl bg-white/80 border border-stone-200/80 shadow-[0_8px_40px_-8px_rgba(0,0,0,0.06)] backdrop-blur-md"
          >
            {ATTRIBUTES.map((attr) => {
              const Icon = attr.icon;
              const isSelected = selectedTag === attr.id;

              return (
                <button
                  key={attr.id}
                  type="button"
                  onClick={() => {
                    setSelectedTag(isSelected ? null : attr.id);
                    navigate('#categories', { title: attr.name });
                  }}
                  style={isSelected ? { backgroundColor: attr.accent, borderColor: attr.accent } : {}}
                  className={`group relative flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl text-[12px] sm:text-[13px] font-semibold transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'text-white shadow-lg scale-105'
                      : 'bg-white text-stone-700 hover:text-stone-950 border border-stone-200 hover:border-stone-300 hover:shadow-md hover:-translate-y-0.5'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      isSelected
                        ? 'bg-white/20'
                        : 'bg-stone-100 group-hover:bg-stone-200'
                    }`}
                    style={isSelected ? {} : {}}
                  >
                    <Icon size={13} className={isSelected ? 'text-white' : 'text-stone-500'} style={!isSelected ? { color: attr.accent } : {}} />
                  </div>
                  <span>{attr.name}</span>
                  {!isSelected && (
                    <span className="hidden sm:inline-block ml-0.5 text-[9px] font-bold uppercase tracking-widest text-stone-400 group-hover:text-stone-500">
                      {attr.category}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Stats row below cloud */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {[{label: 'Packaging & Circularity', count: 4}, {label: 'Ethics & Social', count: 3}, {label: 'Climate & Emissions', count: 3}, {label: 'Safety & Wellness', count: 3}, {label: 'Supply Chain', count: 3}].map(s => (
              <div key={s.label} className="flex items-center gap-1.5 text-[11px] text-stone-500">
                <div className="w-1.5 h-1.5 rounded-full bg-[#187E91]/60" />
                <span className="font-medium">{s.label}</span>
                <span className="text-stone-400">({s.count})</span>
              </div>
            ))}
          </div>
        </div>

        {/* ---------------- 3. CURATED EDITORIAL INSIGHT ARTICLES ---------------- */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold text-[#187E91] uppercase tracking-wider block">
                Research & Thought Leadership
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-stone-900 mt-1">
                Featured Knowledge Publications
              </h3>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('#about', { title: 'Publications' })}
              className="gap-2"
            >
              <span>View All Research Papers</span>
              <ArrowRight size={14} />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {INSIGHT_ARTICLES.map((art) => (
              <div
                key={art.id}
                className="group bg-white rounded-3xl p-7 border border-stone-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_-10px_rgba(24,126,145,0.12)] transition-all duration-400 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[11px] font-bold text-[#187E91] uppercase tracking-wider">
                      {art.category}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] text-stone-400 font-medium">
                      <Clock size={12} />
                      <span>{art.readTime}</span>
                    </div>
                  </div>

                  <h4 className="font-serif text-xl font-normal text-stone-900 group-hover:text-[#187E91] transition-colors leading-snug">
                    {art.title}
                  </h4>

                  <p className="mt-3 text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                    {art.summary}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-[11px] text-stone-500 font-medium truncate max-w-[200px]">
                    {art.author}
                  </span>
                  <button
                    type="button"
                    onClick={() => navigate('#about', { title: art.title })}
                    className="w-8 h-8 rounded-full bg-stone-100 group-hover:bg-[#187E91] group-hover:text-white text-stone-600 flex items-center justify-center transition-colors cursor-pointer"
                    aria-label={`Read article: ${art.title}`}
                  >
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
