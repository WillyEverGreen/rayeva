import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Star,
  Quote,
  ShieldCheck,
  CheckCircle2,
  Users,
  Award,
  Sparkles,
  ExternalLink,
  ArrowRight,
  GraduationCap,
  Building,
  TrendingUp,
} from 'lucide-react';
import { usePageTransition } from '../context/TransitionContext';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { BotanicalHorizontalDivider } from './svg/BotanicalFlourish';

gsap.registerPlugin(ScrollTrigger);

interface Review {
  quote: string;
  author: string;
  role: string;
  organization?: string;
  rating: number;
  impactTag: string;
  verified: boolean;
}

const REVIEWS: Review[] = [
  {
    quote: 'Rayeva has fundamentally transformed our procurement pipeline. Knowing every single packaging supplier has undergone GC-MS chemical screening gives our board absolute confidence against greenwashing claims.',
    author: 'Sara Prasad',
    role: 'Head of Sustainable Procurement',
    organization: 'Apex Logistics India',
    rating: 5,
    impactTag: 'Corporate ESG Partner',
    verified: true,
  },
  {
    quote: 'The zero-waste daily kit is exceptional. In eight months of using the bamboo oral care, neem shampoo bar, and copper flask, our household has eliminated over 14 kilograms of single-use bathroom plastic.',
    author: 'Manveer Raza',
    role: 'Environmental Architect',
    rating: 5,
    impactTag: 'Verified Consumer',
    verified: true,
  },
  {
    quote: 'As an artisanal cooperative leader, finding a marketplace that guarantees fair living wages and prompt settlement was rare. Rayeva respects traditional Sabai weavers as equal partners.',
    author: 'Anjali Singh',
    role: 'Rural Cluster Coordinator',
    organization: 'Mayurbhanj Artisan Guild',
    rating: 5,
    impactTag: 'Fair-Trade Producer',
    verified: true,
  },
  {
    quote: 'Their SEBI BRSR reporting tool simplified what used to take our ESG compliance team three weeks of manual spreadsheet audits into a one-click verified PDF export. Truly visionary.',
    author: 'Dravid Mohan',
    role: 'VP Corporate Governance',
    organization: 'Greenspire Pharma',
    rating: 5,
    impactTag: 'BRSR Compliance User',
    verified: true,
  },
];

export default function TestimonialsAndAboutUs() {
  const containerRef = useRef<HTMLElement>(null);
  const testimonialHeaderRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const founderRef = useRef<HTMLDivElement>(null);
  const { navigate } = usePageTransition();

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      if (testimonialHeaderRef.current) {
        gsap.fromTo(
          testimonialHeaderRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: testimonialHeaderRef.current,
              start: 'top bottom',
            },
          }
        );
      }

      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.testimonial-card');
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
              trigger: cardsRef.current,
              start: 'top bottom',
            },
          }
        );
      }

      if (founderRef.current) {
        gsap.fromTo(
          founderRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: founderRef.current,
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
      id="about"
      className="relative w-full bg-[#FAF8F3] py-14 sm:py-24 overflow-hidden select-none border-t border-stone-200/60"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#187E91]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[500px] h-[500px] bg-[#244835]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-10 space-y-16 sm:space-y-28">

        {/* ---------------- 1. TESTIMONIALS & TRUST EXPERIENCES ---------------- */}
        <div>
          <div ref={testimonialHeaderRef} className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <Badge variant="secondary" className="mb-4 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider border border-[#244835]/15">
              <ShieldCheck size={13} className="text-[#187E91]" />
              <span>Verified Community Feedback</span>
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-stone-900 tracking-tight leading-[1.12]">
              What Our Community <br />
              <span className="italic text-[#187E91]">& Partners Experience</span>
            </h2>
            <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed font-normal">
              From conscious households eliminating kitchen plastics to enterprise executives fulfilling mandatory ESG audits, hear from those leading the transition.
            </p>
          </div>

          {/* Testimonial Cards Grid */}
          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
            {REVIEWS.map((rev, idx) => (
              <div
                key={idx}
                className="testimonial-card bg-white rounded-3xl p-7 border border-stone-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_-10px_rgba(24,126,145,0.12)] transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <Badge variant="outlineTeal" className="text-[10px] py-0.5 font-semibold">
                      {rev.impactTag}
                    </Badge>
                    <div className="flex items-center gap-0.5 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={13} className="fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>

                  <Quote size={24} className="text-[#187E91]/25 mb-2.5" />

                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-normal italic">
                    "{rev.quote}"
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <h4 className="font-serif text-sm font-semibold text-stone-900">
                      {rev.author}
                    </h4>
                    <p className="text-[11px] text-stone-500 font-medium">
                      {rev.organization ? `${rev.role}, ${rev.organization}` : rev.role}
                    </p>
                  </div>
                  {rev.verified && (
                    <div className="w-5 h-5 rounded-full bg-[#E3EFE7] text-[#244835] flex items-center justify-center shrink-0" title="Verified Credential">
                      <CheckCircle2 size={12} className="stroke-[3]" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Botanical Flourish Divider */}
        <BotanicalHorizontalDivider maxWidth={900} className="opacity-70 my-10" color="#187E91" />

        {/* ---------------- 2. ABOUT US & FOUNDER LEADERSHIP ---------------- */}
        <div ref={founderRef}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left: Founder Executive Dossier Card (6 cols) */}
            <div className="lg:col-span-6 bg-gradient-to-br from-[#1C2C24] via-[#16251E] to-[#0E1B15] text-white rounded-3xl p-8 sm:p-12 border border-stone-800 shadow-2xl relative overflow-hidden flex flex-col justify-between">
              {/* Inner ambient glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#187E91]/15 rounded-full blur-3xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <span className="text-xs uppercase tracking-widest font-bold text-teal-300">
                    Founder & Leadership
                  </span>
                  <Badge variant="forest" className="bg-white/10 text-stone-200 border-white/15 text-[11px]">
                    Climatora Feature
                  </Badge>
                </div>

                <h3 className="font-serif text-3xl sm:text-4xl font-normal text-stone-100 leading-tight">
                  Sucheta Anchaliya
                </h3>
                <p className="text-xs sm:text-sm text-teal-200 font-medium mt-1">
                  Founder & CEO | Rayeva • Mumbai, India
                </p>

                <p className="mt-5 text-stone-300 text-xs sm:text-sm leading-relaxed font-normal">
                  "I left equity capital markets investment banking after realizing how much money was being spent on cosmetic ESG reports while our oceans and soil filled with unrecyclable plastic. Rayeva exists to fix the four broken problems of sustainability: verification, logistics, artisan livelihoods, and institutional compliance."
                </p>

                {/* Founder Credentials List */}
                <div className="mt-8 space-y-3 border-t border-white/10 pt-6">
                  <div className="flex items-center gap-3 text-xs text-stone-300">
                    <GraduationCap size={16} className="text-teal-300 shrink-0" />
                    <span>Chartered Accountant • London School of Economics (Economics & Finance)</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-stone-300">
                    <Building size={16} className="text-teal-300 shrink-0" />
                    <span>Former Equity Capital Markets Investment Banker</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-stone-300">
                    <TrendingUp size={16} className="text-teal-300 shrink-0" />
                    <span>Ex-CNBC Moneycontrol Research Analyst & Television Anchor</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-stone-400 font-mono">1608 Panchratna, Opera House, Mumbai</span>
                <a
                  href="https://climatora.com/climate-champions-details/28/sucheta-anchaliya-ditched-a-paper-bottle-idea-to-fix-four-broken-problems-instead"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-300 hover:text-white transition-colors"
                >
                  <span>Climatora Story</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>

            {/* Right: Institutional Pillars & Advisory Strength (6 cols) */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div>
                <Badge variant="secondary" className="mb-3 px-3 py-1 text-xs font-semibold uppercase tracking-wider border border-[#244835]/15">
                  <Award size={13} className="text-[#187E91]" />
                  <span>The Institutional Foundation</span>
                </Badge>

                <h3 className="font-serif text-3xl sm:text-4xl font-normal text-stone-900 tracking-tight leading-tight">
                  Guided By Science, <br />
                  <span className="italic text-[#187E91]">Anchored in Community</span>
                </h3>

                <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed font-normal">
                  Rayeva is built on a multidisciplinary governance structure uniting chemical analysts, material scientists, and rural craft preservationists.
                </p>
              </div>

              {/* 3 Governance Pillars */}
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-xs flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#E3EFE7] text-[#244835] flex items-center justify-center shrink-0">
                    <ShieldCheck size={20} className="stroke-[2.2]" />
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-normal text-stone-900">Independent Laboratory Audits</h4>
                    <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                      Every consumer SKU undergoes gas chromatography testing to ensure freedom from undisclosed synthetic fragrances and petrochemicals.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-xs flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#FAF8F3] border border-[#187E91]/20 text-[#187E91] flex items-center justify-center shrink-0">
                    <Building size={20} className="stroke-[2.2]" />
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-normal text-stone-900">SEBI BRSR Core Compliance</h4>
                    <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                      Aligning enterprise disclosures with National Guidelines for Responsible Business Conduct (NGRBC) across Principles 2, 6, and 8.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-xs flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center shrink-0">
                    <Users size={20} className="stroke-[2.2]" />
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-normal text-stone-900">2,400+ Rural Artisan Livelihoods</h4>
                    <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                      Direct-to-cooperative purchasing eliminating middlemen margins and preserving centuries-old natural weaving techniques.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-2 flex items-center justify-center sm:justify-start gap-4">
                <Button
                  variant="default"
                  size="lg"
                  onClick={() => navigate('#join-partner', { title: 'Join Rayeva Ecosystem' })}
                  className="gap-2"
                >
                  <span>Connect With Our Team</span>
                  <ArrowRight size={14} />
                </Button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
