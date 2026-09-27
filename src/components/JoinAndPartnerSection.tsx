import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Mail,
  Check,
  ArrowRight,
  UserCheck,
  Briefcase,
  Store,
  Sparkles,
  ShieldCheck,
  Building2,
  Users,
  Compass,
} from 'lucide-react';
import { usePageTransition } from '../context/TransitionContext';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { BotanicalCornerSprig, DriftingBotanicals } from './BotanicalDecorations';

gsap.registerPlugin(ScrollTrigger);

interface StakeholderPortal {
  id: string;
  role: string;
  title: string;
  description: string;
  perks: string[];
  ctaText: string;
  icon: React.ElementType;
  accent: string;
}

const PORTALS: StakeholderPortal[] = [
  {
    id: 'consumer',
    role: 'Individual Citizen',
    title: 'Conscious Consumers & Households',
    description: 'Access curated, lab-verified everyday essentials. Track your monthly plastic diversion metrics and learn sustainable daily habit swaps.',
    perks: ['Zero-plastic home delivery', 'Transparent ingredient provenance', 'Personal impact dashboard'],
    ctaText: 'Enter Consumer Portal',
    icon: UserCheck,
    accent: '#244835',
  },
  {
    id: 'brand',
    role: 'Brand Partner',
    title: 'Ethical Brands & Artisan Clusters',
    description: 'Grow your conscious enterprise through our marketplace, benefit from collective reverse logistics, and reach discerning corporate buyers.',
    perks: ['Pre-vetted conscious buyer base', 'Zero greenwashing certification', 'Fair-trade living wage support'],
    ctaText: 'Apply as Brand Supplier',
    icon: Store,
    accent: '#187E91',
  },
  {
    id: 'enterprise',
    role: 'Enterprise & ESG Officers',
    title: 'Corporate Procurement & Facilities',
    description: 'Streamline SEBI BRSR Core Principles 2 & 6 compliance, source verified sustainable gifting and bulk packaging, and schedule industrial recycling.',
    perks: ['Audited Scope 1-3 carbon data', 'Pollution Control Board manifests', 'Bulk corporate volume pricing'],
    ctaText: 'Request Enterprise Demo',
    icon: Building2,
    accent: '#136B7C',
  },
];

export default function JoinAndPartnerSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const newsletterRef = useRef<HTMLDivElement>(null);
  const portalsRef = useRef<HTMLDivElement>(null);
  const { navigate } = usePageTransition();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 4000);
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      if (newsletterRef.current) {
        gsap.fromTo(
          newsletterRef.current,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: newsletterRef.current,
              start: 'top bottom',
            },
          }
        );
      }

      if (portalsRef.current) {
        const cards = portalsRef.current.querySelectorAll('.portal-card');
        gsap.fromTo(
          cards,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: portalsRef.current,
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
      id="join-partner"
      className="relative w-full bg-[#FAF8F3] py-14 sm:py-24 overflow-hidden select-none border-t border-stone-200/60"
    >
      {/* Background ambient lighting & drifting botanicals */}
      <DriftingBotanicals includePetals={true} />
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#187E91]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-[#244835]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-10 space-y-10 sm:space-y-20">

        {/* ---------------- 1. GET INSIGHTS / NEWSLETTER CARD ---------------- */}
        <div
          ref={newsletterRef}
          className="relative bg-gradient-to-br from-white via-white to-[#E3EFE7]/60 rounded-3xl p-8 sm:p-14 border border-stone-200/80 shadow-[0_12px_40px_rgba(0,0,0,0.04)] flex flex-col lg:flex-row items-center justify-between gap-10 overflow-hidden"
        >
          {/* Authentic Hand-Illustrated Botanical Corner Sprig */}
          <BotanicalCornerSprig position="top-right" variant="sprig-1" className="opacity-80 scale-110" />

          <div className="max-w-xl">
            <Badge variant="secondary" className="mb-4 px-4 py-1.5 text-xs sm:text-[13px] font-bold uppercase tracking-wider border border-[#244835]/20 shadow-xs inline-flex items-center gap-2.5">
              <Sparkles size={18} className="text-[#187E91] stroke-[2.5]" />
              <span>Rayeva Intelligence Dispatch</span>
            </Badge>

            <h2 className="text-3xl sm:text-4xl font-serif font-normal text-stone-900 tracking-tight leading-tight">
              Stay At The Forefront Of <br />
              <span className="italic text-[#187E91]">Sustainable Living & Policy</span>
            </h2>

            <p className="mt-3.5 text-stone-600 text-xs sm:text-sm leading-relaxed font-normal">
              Receive bi-weekly material science breakdowns, regulatory ESG compliance updates, and verified circular habit swaps.
            </p>

            <div className="mt-4 inline-flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#244835] bg-[#E3EFE7] px-4 py-1.5 rounded-full border border-[#244835]/15">
              <ShieldCheck size={16} className="text-[#187E91]" />
              <span>Complimentary 10% welcome privilege applied on your first verified order.</span>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubscribe}
            className="w-full max-w-md bg-white rounded-2xl p-2 pl-4 border border-stone-300/80 shadow-md flex flex-wrap sm:flex-nowrap items-center justify-between gap-2"
          >
            {subscribed ? (
              <div className="w-full py-2.5 flex items-center justify-center gap-2 text-[#244835] font-semibold text-xs sm:text-sm">
                <span className="w-6 h-6 rounded-full bg-[#244835] text-white flex items-center justify-center">
                  <Check size={14} className="stroke-[3]" />
                </span>
                <span>Welcome! Check your inbox for your access dossier.</span>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <Mail size={16} className="text-stone-400 shrink-0" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full bg-transparent text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none"
                  />
                </div>
                <Button
                  type="submit"
                  variant="default"
                  size="sm"
                  className="rounded-xl px-5"
                >
                  <span>Subscribe</span>
                </Button>
              </>
            )}
          </form>
        </div>

        {/* ---------------- 2. THREE STAKEHOLDER PORTALS ---------------- */}
        <div ref={portalsRef}>
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
            <Badge variant="secondary" className="mb-4 px-4 py-1.5 text-xs sm:text-[13px] font-bold uppercase tracking-wider border border-[#244835]/20 shadow-xs inline-flex items-center gap-2.5">
              <Users size={18} className="text-[#187E91] stroke-[2.5]" />
              <span>Ecosystem Access Portals</span>
            </Badge>
            <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-stone-900 tracking-tight leading-tight">
              Join India's Verified Circular Network
            </h3>
            <p className="mt-3.5 text-stone-600 text-sm sm:text-base">
              Choose your pathway into our verified marketplace and enterprise compliance platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PORTALS.map((portal) => {
              const Icon = portal.icon;
              return (
                <div
                  key={portal.id}
                  className="portal-card bg-white rounded-3xl p-8 border border-stone-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_-10px_rgba(24,126,145,0.12)] transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
                >
                  <div>
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 shadow-xs"
                      style={{ backgroundColor: `${portal.accent}14`, color: portal.accent }}
                    >
                      <Icon size={26} className="stroke-[2.2]" />
                    </div>

                    <span className="text-[11px] font-bold text-[#187E91] uppercase tracking-wider block mb-1">
                      {portal.role}
                    </span>

                    <h4 className="font-serif text-xl font-normal text-stone-900 leading-snug">
                      {portal.title}
                    </h4>

                    <p className="mt-3 text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                      {portal.description}
                    </p>

                    <div className="mt-6 pt-4 border-t border-stone-100 space-y-2">
                      {portal.perks.map((perk, pIdx) => (
                        <div key={pIdx} className="flex items-center gap-2 text-xs text-stone-700">
                          <Check size={14} className="text-[#187E91] stroke-[2.5] shrink-0" />
                          <span>{perk}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-4">
                    <Button
                      variant={portal.id === 'enterprise' ? 'forest' : 'default'}
                      size="default"
                      onClick={() => navigate('#categories', { title: portal.title })}
                      className="w-full gap-2 rounded-xl text-xs sm:text-sm"
                    >
                      <span>{portal.ctaText}</span>
                      <ArrowRight size={14} />
                    </Button>
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
