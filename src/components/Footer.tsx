import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
  ArrowRight,
  Mail,
  MapPin,
  Shield,
  Check,
  Building2,
  Globe2,
  Wind,
  Lock,
  ShieldCheck,
  Leaf,
  Sparkles,
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

gsap.registerPlugin(ScrollTrigger);

const LINKS = {
  Marketplace: [
    { label: 'Trending Sustainable Essentials', href: '#trending-products' },
    { label: 'Make Your Zero-Waste Kit', href: '#starter-kit' },
    { label: 'Curated 9-Sector Catalog', href: '#categories' },
    { label: 'Bio-Circular Packaging', href: '#categories' },
  ],
  'Enterprise ESG': [
    { label: 'SEBI BRSR Core Principles', href: '#impact' },
    { label: 'Scope 1-3 Carbon Analytics', href: '#impact' },
    { label: 'Industrial Waste Manifests', href: '#join-partner' },
    { label: 'Bulk Sustainable Gifting', href: '#join-partner' },
  ],
  Governance: [
    { label: 'Our Mission & Manifesto', href: '#mission' },
    { label: 'Screening Audit Criteria', href: '#brand-criteria' },
    { label: 'Featured in Press', href: '#about' },
    { label: 'Artisan Livelihood Charter', href: '#about' },
  ],
  Partners: [
    { label: 'Certified Brand Suppliers', href: '#starter-kit' },
    { label: 'Apply as Brand Partner', href: '#join-partner' },
    { label: 'Reverse Logistics Program', href: '#impact' },
    { label: 'Institutional Procurement', href: '#join-partner' },
  ],
};

const TRUST_SEALS = [
  { label: 'SEBI BRSR Core', sub: 'Principle 2 & 6 Aligned', icon: Building2, sealSrc: '/extracted/eco_seals/seal_sustainable.png' },
  { label: 'GRI Standards', sub: 'Global Reporting Initiative', icon: Globe2, sealSrc: '/extracted/eco_seals/seal_circular.png' },
  { label: 'GHG Protocol', sub: 'Scope 1-3 Activity Method', icon: Wind, sealSrc: '/extracted/eco_seals/seal_ethical.png' },
  { label: 'India DPDP Act 2023', sub: 'Digital Personal Data Privacy', icon: Lock, sealSrc: '/extracted/eco_seals/seal_plastic_free.png' },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setEmail('');
      }, 3500);
    }
  };

  return (
    <footer
      ref={footerRef}
      className="w-full bg-[#112018] text-white pt-16 sm:pt-20 pb-28 sm:pb-28 select-none border-t border-emerald-950 relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#187E91]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#244835]/15 rounded-full blur-[140px] pointer-events-none" />


      <div className="relative z-10 max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-10">

        {/* ---------------- 1. TRUST SEALS TICKER (NO EMOJIS) ---------------- */}
        <div className="footer-col pb-14 border-b border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {TRUST_SEALS.map((seal) => {
              return (
                <div
                  key={seal.label}
                  className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs hover:bg-white/8 transition-colors group"
                >
                  <img
                    src={seal.sealSrc}
                    alt=""
                    className="w-10 h-10 object-contain shrink-0 filter drop-shadow-xs transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div>
                    <h5 className="text-xs sm:text-sm font-semibold text-white tracking-tight">
                      {seal.label}
                    </h5>
                    <span className="text-[11px] text-stone-400 font-normal block">
                      {seal.sub}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ---------------- 2. MAIN NAVIGATION GRID ---------------- */}
        <div className="py-16 sm:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 border-b border-white/10">

          {/* Col 1: Brand & Headquarters (4 cols) */}
          <div className="footer-col lg:col-span-4 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="/rayeva_logo.png"
                  alt="Rayeva Logo"
                  className="h-9 w-auto brightness-0 invert object-contain"
                />
                <span className="font-serif text-2xl font-normal tracking-tight text-white">
                  Rayeva
                </span>
              </div>

              <p className="text-xs sm:text-sm text-stone-400 leading-relaxed font-normal max-w-sm">
                India’s first end-to-end verified sustainable solutions platform, closing the loop from conscious household consumption to corporate ESG impact reporting and certified recycling.
              </p>
            </div>

            <div className="space-y-2.5 text-xs text-stone-400">
              <div className="flex items-start gap-2.5">
                <MapPin size={15} className="text-teal-300 shrink-0 mt-0.5" />
                <span>1608 Panchratna, Plot 21, Opera House, Mumbai 400004, Maharashtra, India</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={15} className="text-teal-300 shrink-0" />
                <span>governance@rayeva.com • impact@rayeva.com</span>
              </div>
            </div>
          </div>

          {/* Col 2-4: Links Categories (5 cols) */}
          <div className="footer-col lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-teal-300 mb-4">
                Marketplace
              </h5>
              <ul className="space-y-2.5 text-xs">
                {LINKS.Marketplace.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-stone-400 hover:text-white transition-colors">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-teal-300 mb-4">
                Enterprise ESG
              </h5>
              <ul className="space-y-2.5 text-xs">
                {LINKS['Enterprise ESG'].map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-stone-400 hover:text-white transition-colors">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-teal-300 mb-4">
                Governance
              </h5>
              <ul className="space-y-2.5 text-xs">
                {LINKS.Governance.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-stone-400 hover:text-white transition-colors">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Col 5: Quick Newsletter Signup (3 cols) */}
          <div className="footer-col lg:col-span-3 flex flex-col justify-between">
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-teal-300 mb-2">
                Executive Circular Dispatch
              </h5>
              <p className="text-xs text-stone-400 leading-relaxed mb-4">
                Get monthly intelligence on certified circular materials, BRSR reporting deadlines, and artisan drops.
              </p>

              <form onSubmit={handleSubmit} className="space-y-2.5">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter corporate email"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-xs text-white placeholder:text-stone-500 focus:outline-none focus:border-teal-400 transition-colors"
                  />
                </div>

                <Button
                  type="submit"
                  variant="default"
                  size="sm"
                  className="w-full bg-[#187E91] hover:bg-[#136B7C] text-xs rounded-xl"
                >
                  {submitted ? (
                    <span className="flex items-center gap-1.5 text-emerald-200">
                      <Check size={14} className="stroke-[3]" />
                      <span>Subscribed!</span>
                    </span>
                  ) : (
                    <span>Subscribe to Dispatch</span>
                  )}
                </Button>
              </form>
            </div>

            <div className="pt-6 flex items-center gap-2 text-[11px] text-stone-500">
              <ShieldCheck size={14} className="text-teal-400" />
              <span>India DPDP Act 2023 Compliant • Zero Spam</span>
            </div>
          </div>

        </div>

        {/* ---------------- 3. BOTTOM LEGAL & CARBON HOSTING BADGE ---------------- */}
        <div className="footer-col pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 relative z-10 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span>© {new Date().getFullYear()} Rayeva Technologies Private Limited. All rights reserved.</span>
          </div>

          <div className="flex items-center justify-center gap-2 text-stone-400 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 text-center">
            <Leaf size={12} className="text-emerald-400 shrink-0" />
            <span className="text-[11px]">Carbon-Neutral Digital Architecture • Powered by 100% Renewable Cloud</span>
          </div>
        </div>

      </div>

      {/* ----------------- LIVING BOTANICAL WORDMARK TOUCHED TO END OF SITE (NO TEXT OVERLAP) ----------------- */}
      <div className="absolute inset-x-0 bottom-0 flex justify-center items-end pointer-events-none select-none z-0 overflow-hidden">
        <img
          src="/rayeva_logo.png"
          alt=""
          className="w-[180px] sm:w-[260px] md:w-[300px] h-auto object-contain opacity-25 brightness-150 drop-shadow-xl translate-y-1"
          loading="lazy"
        />
      </div>
    </footer>
  );
}
