import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Sparkles,
  Star,
  Check,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Recycle,
  Heart,
  Globe,
  ShoppingBag,
  ArrowRight,
  Leaf,
  Plus,
  Minus,
  ExternalLink,
} from 'lucide-react';
import { usePageTransition } from '../context/TransitionContext';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { DriftingBotanicals } from './BotanicalDecorations';

gsap.registerPlugin(ScrollTrigger);

interface KitItem {
  id: string;
  name: string;
  category: string;
  price: number;
  plasticSaved: string;
  carbonOffset: string;
  includedByDefault: boolean;
}

const KIT_ITEMS: KitItem[] = [
  {
    id: 'flask',
    name: 'Pure Copper Thermal Hydration Flask (750ml)',
    category: 'Daily Hydration',
    price: 850,
    plasticSaved: '160 bottles/yr',
    carbonOffset: '2.4 kg CO₂e',
    includedByDefault: true,
  },
  {
    id: 'brush',
    name: 'Biodegradable Neem & Bamboo Oral Care Brush',
    category: 'Personal Care',
    price: 199,
    plasticSaved: '4 brushes/yr',
    carbonOffset: '0.3 kg CO₂e',
    includedByDefault: true,
  },
  {
    id: 'soap',
    name: 'Cold-Pressed Wild Forest Neem & Charcoal Bar',
    category: 'Clean Formulation',
    price: 280,
    plasticSaved: '3 plastic bottles/yr',
    carbonOffset: '0.8 kg CO₂e',
    includedByDefault: true,
  },
  {
    id: 'cutlery',
    name: 'Artisan Seasoned Bamboo Travel Cutlery Set',
    category: 'Zero Waste',
    price: 340,
    plasticSaved: '220 disposables/yr',
    carbonOffset: '1.2 kg CO₂e',
    includedByDefault: true,
  },
  {
    id: 'tote',
    name: 'GOTS-Certified Organic Unbleached Canvas Tote',
    category: 'Reusable Carry',
    price: 450,
    plasticSaved: '300 polybags/yr',
    carbonOffset: '3.1 kg CO₂e',
    includedByDefault: true,
  },
  {
    id: 'shaker',
    name: 'Double-Walled Insulated Bamboo Fitness Shaker',
    category: 'Active Lifestyle',
    price: 680,
    plasticSaved: '40 plastic shakers/yr',
    carbonOffset: '1.9 kg CO₂e',
    includedByDefault: false,
  },
];

interface PartnerBrand {
  name: string;
  tagline: string;
  category: string;
  highlight: string;
  credentials: string[];
  accent: string;
  linkText: string;
  logo: string;
  logoBg?: string;
}

const PARTNERS: PartnerBrand[] = [
  {
    name: 'Zerocircle',
    category: 'Ocean-Safe Bio Materials',
    tagline: "Pioneering India's first seaweed-based bio-resins that decompose in ambient soil within 90 days. Zero microplastics, ocean-safe.",
    highlight: 'Seaweed-based packaging replaces polyethylene film',
    credentials: ['ASTM D6400 Certified', 'Home Compostable', 'Ocean Safe'],
    accent: '#0D9488',
    linkText: 'View Bio-Packaging',
    logo: '/logos/zerocircle.svg',
    logoBg: '#F0FDFB',
  },
  {
    name: 'Green Hermitage',
    category: 'Plant-Based Luxury Leather',
    tagline: 'Cruelty-free accessories handcrafted from upcycled agricultural waste (apple pomace, cactus, and banana fiber) with timeless Scandinavian aesthetics.',
    highlight: '58% Upcycled Orchard Fruit Biomass',
    credentials: ['PETA-Approved Vegan', 'Zero Toxic Tannins', 'Lifetime Guarantee'],
    accent: '#203C2A',
    linkText: 'Explore Accessories',
    logo: '/logos/green-hermitage.png',
    logoBg: '#F0FAF4',
  },
  {
    name: 'Kadam Haat',
    category: 'Heritage Craft Cooperative',
    tagline: 'Empowering over 1,200 rural artisans across Odisha and West Bengal through handwoven wild Sabai grass and bamboo living artifacts.',
    highlight: '100% Fair Living Wage Direct Profit Share',
    credentials: ['Fair Trade Verified', 'Handcrafted MSME', 'Vegetable Dyes'],
    accent: '#B45309',
    linkText: 'Meet The Artisans',
    logo: '/logos/kadam-haat.png',
    logoBg: '#FFFBF0',
  },
  {
    name: 'Kheoni',
    category: 'Indigenous Wilderness Wellness',
    tagline: 'Regenerative wellness products created from wild-foraged forest botanicals, reinvesting profits into central Indian wildlife corridors.',
    highlight: '100% Carbon Neutral Operations',
    credentials: ['Afforestation Direct', 'Zero Preservatives', 'Solar Powered'],
    accent: '#187E91',
    linkText: 'Discover Wilderness Line',
    logo: '/logos/kheoni.png',
    logoBg: '#F0FAFB',
  },
  {
    name: 'Impact Water',
    category: 'Circular Packaging Hydration',
    tagline: 'Pure mineral hydration packaged in FSC-certified paperboard cartons. 100% recyclable, BPA-free, and eliminating plastic bottles from corporate hotels.',
    highlight: 'Replaces 4.2 Million Plastic Bottles',
    credentials: ['FSC Certified Paper', 'BPA Free', 'Closed-Loop Cartons'],
    accent: '#136B7C',
    linkText: 'Corporate Supply',
    logo: '/logos/impact-water.png',
    logoBg: '#E8F7FF',
  },
  {
    name: 'Bahem',
    category: 'Low-Carbon Conscious Apparel',
    tagline: 'Timeless apparel tailored exclusively from handloom organic rain-fed cotton and regenerative linen. Zero water waste with natural botanical dyes.',
    highlight: '70% Lower Water Footprint vs Conventional Cotton',
    credentials: ['GOTS Certified Organic', 'Zero Chemical Bleach', 'Circular Wardrobe'],
    accent: '#3E5C46',
    linkText: 'View Collection',
    logo: '/logos/bahem.png',
    logoBg: '#F2F9F2',
  },
  {
    name: 'Atovio',
    category: 'Clean Air Technology',
    tagline: "India's most compact portable air purification system. Engineered to neutralize PM2.5 and urban particulate pollution everywhere you breathe.",
    highlight: '99.97% HEPA Filtration with Active Carbon',
    credentials: ['CE Certified', 'Zero Ozone Emission', 'Made In India'],
    accent: '#0284C7',
    linkText: 'Explore Clean Air',
    logo: '/logos/atovio.png',
    logoBg: '#F0F9FF',
  },
  {
    name: 'Papaya Pads',
    category: 'Organic Biodegradable Care',
    tagline: 'Zero-plastic, bamboo and corn-fiber feminine hygiene products engineered for radical comfort and 180-day ambient soil biodegradability.',
    highlight: 'Zero Microplastics & Chemical Bleach',
    credentials: ['Organic Bamboo', '100% Biodegradable', 'Dermatologically Tested'],
    accent: '#BE185D',
    linkText: 'Discover Hygiene Line',
    logo: '/logos/papaya.png',
    logoBg: '#FDF2F8',
  },
  {
    name: 'Natch Snacks',
    category: 'Regenerative Clean Pantry',
    tagline: 'Wholesome gourmet snacks crafted exclusively with non-GMO natural ingredients, artisanal roasting, and completely transparent supply chains.',
    highlight: 'Zero Artificial Additives or Palm Oil',
    credentials: ['Non-GMO Verified', 'Artisanal Batch', 'Gluten Free'],
    accent: '#C2410C',
    linkText: 'Browse Pantry',
    logo: '/logos/natch.png',
    logoBg: '#FFF7ED',
  },
];

export default function StarterKitAndPartners() {
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>(
    KIT_ITEMS.filter((i) => i.includedByDefault).map((i) => i.id)
  );

  const containerRef = useRef<HTMLElement>(null);
  const kitRef = useRef<HTMLDivElement>(null);
  const partnersRef = useRef<HTMLDivElement>(null);
  const sliderScrollContainerRef = useRef<HTMLDivElement>(null);
  const sliderTrackRef = useRef<HTMLDivElement>(null);
  const sliderTweenRef = useRef<gsap.core.Tween | null>(null);
  const { navigate } = usePageTransition();

  const toggleItem = (id: string) => {
    setSelectedItemIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectedItems = KIT_ITEMS.filter((i) => selectedItemIds.includes(i.id));
  const rawTotal = selectedItems.reduce((acc, curr) => acc + curr.price, 0);
  const bundledPrice = Math.round(rawTotal * 0.88); // 12% curated bundle privilege
  const savings = rawTotal - bundledPrice;

  // Infinite slider GSAP animation on desktop, full user touch-drag on mobile
  useEffect(() => {
    const track = sliderTrackRef.current;
    if (!track) return;

    // Check if on mobile / small screen (< 768px)
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    if (isMobile) {
      // Allow pure user drag & touch swipe on mobile without GSAP interference
      return;
    }

    // Smooth linear infinite scroll of duplicated partners list on desktop
    sliderTweenRef.current = gsap.to(track, {
      xPercent: -50,
      duration: 55,
      ease: 'none',
      repeat: -1,
    });

    return () => {
      sliderTweenRef.current?.kill();
    };
  }, []);

  const handleSliderMouseEnter = () => {
    sliderTweenRef.current?.pause();
  };

  const handleSliderMouseLeave = () => {
    sliderTweenRef.current?.play();
  };

  const nudgeSlider = (direction: 'left' | 'right') => {
    // If mobile screen, scroll the container smoothly with user control
    if (sliderScrollContainerRef.current && (typeof window !== 'undefined' && window.innerWidth < 768)) {
      const scrollStep = direction === 'left' ? -310 : 310;
      sliderScrollContainerRef.current.scrollBy({ left: scrollStep, behavior: 'smooth' });
      return;
    }

    if (!sliderTweenRef.current) return;
    const current = sliderTweenRef.current.time();
    const total = sliderTweenRef.current.duration();
    const shift = total / PARTNERS.length; // precisely 1 brand card shift
    let newTime = direction === 'left' ? current - shift : current + shift;
    if (newTime < 0) newTime += total;
    if (newTime >= total) newTime -= total;
    gsap.to(sliderTweenRef.current, {
      time: newTime,
      duration: 0.6,
      ease: 'power2.out',
    });
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      if (kitRef.current) {
        gsap.fromTo(
          kitRef.current,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: kitRef.current,
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
      id="starter-kit"
      className="relative w-full bg-[#FAF8F3] py-14 sm:py-24 overflow-hidden select-none border-t border-stone-200/60"
    >
      {/* Ambient Drifting Botanical Leaves & Petals */}
      <DriftingBotanicals includePetals={true} />

      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-10 space-y-12 sm:space-y-28">

        {/* ---------------- 1. CURATE YOUR STARTER KIT ---------------- */}
        <div ref={kitRef} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left: Dynamic Kit Preview & Impact Dossier (5 cols) */}
          <div className="lg:col-span-5 relative">
            {/* Authentic Botanical Leaf Sprigs Framing the Kit */}
            <img
              src="/extracted/leaves/leaf_mid_sprig_branchlet.png"
              alt=""
              className="pointer-events-none absolute -top-8 -left-6 w-16 sm:w-20 opacity-75 select-none drop-shadow-xs z-10"
            />
            <img
              src="/extracted/leaves/leaf_pair_sprig_right.png"
              alt=""
              className="pointer-events-none absolute -bottom-5 -right-4 w-14 sm:w-18 opacity-70 select-none drop-shadow-xs z-10"
            />

            <div className="relative rounded-3xl overflow-hidden bg-white border border-stone-200/80 shadow-[0_12px_36px_rgba(0,0,0,0.05)] p-4 sm:p-6">
              
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-stone-100">
                <img
                  src="/categories/card-3-zerowaste.png"
                  alt="Rayeva Curated Starter Kit"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent" />

                <div className="absolute top-4 left-4">
                  <Badge variant="forest" className="shadow-md">
                    <Sparkles size={12} className="stroke-[2.5]" />
                    <span>Curate & Save 12%</span>
                  </Badge>
                </div>

                <div className="absolute bottom-4 inset-x-4 text-white">
                  <span className="text-xs uppercase tracking-wider font-semibold text-teal-300">
                    The Habit-Swap Bundle
                  </span>
                  <h4 className="text-lg sm:text-xl font-serif font-normal text-white mt-0.5">
                    Daily Zero-Waste Essentials
                  </h4>
                </div>
              </div>

              {/* Dynamic Live Environmental Benefit Computation */}
              <div className="mt-5 p-4 rounded-2xl bg-[#E3EFE7]/70 border border-[#244835]/15 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#244835] text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Recycle size={18} className="stroke-[2.2]" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-[#244835] uppercase tracking-wider block">
                      Estimated Avoidance
                    </span>
                    <span className="text-xs text-stone-700 font-medium">
                      ~18.4 kg single-use plastic displaced per year
                    </span>
                  </div>
                </div>

                <span className="text-xs font-serif font-bold text-[#244835] px-2.5 py-1 rounded-full bg-white border border-[#244835]/20">
                  {selectedItems.length} Items Selected
                </span>
              </div>
            </div>
          </div>

          {/* Right: Interactive Modular Kit Builder (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <Badge variant="secondary" className="mb-3.5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider border border-[#244835]/15">
                <Leaf size={13} className="text-[#187E91]" />
                <span>Begin Your Journey</span>
              </Badge>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-stone-900 tracking-tight leading-[1.12]">
                Curate Your Zero-Waste <br />
                <span className="italic text-[#187E91]">Everyday Essentials Kit</span>
              </h2>

              <p className="mt-4 text-stone-600 text-sm sm:text-base leading-relaxed font-normal">
                Customize your starter box by selecting the daily habits you want to swap. Every essential is lab-tested, non-toxic, and packaged with zero plastic.
              </p>

              {/* Interactive Item Selector List */}
              <div className="mt-8 space-y-3">
                {KIT_ITEMS.map((item) => {
                  const isSelected = selectedItemIds.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleItem(item.id)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') toggleItem(item.id);
                      }}
                      className={`p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between gap-4 cursor-pointer select-none ${
                        isSelected
                          ? 'bg-white border-[#187E91]/60 shadow-[0_4px_16px_-4px_rgba(24,126,145,0.12)]'
                          : 'bg-white/50 border-stone-200/80 hover:bg-white text-stone-500'
                      }`}
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div
                          className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                            isSelected
                              ? 'bg-[#187E91] text-white shadow-xs'
                              : 'border border-stone-300 text-transparent'
                          }`}
                        >
                          <Check size={14} className="stroke-[3]" />
                        </div>
                        <div className="min-w-0">
                          <h4
                            className={`text-xs sm:text-sm font-semibold truncate ${
                              isSelected ? 'text-stone-900' : 'text-stone-600'
                            }`}
                          >
                            {item.name}
                          </h4>
                          <span className="text-[11px] text-stone-400 block mt-0.5">
                            {item.category} • Prevents {item.plasticSaved}
                          </span>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span
                          className={`text-sm sm:text-base font-serif font-bold ${
                            isSelected ? 'text-stone-900' : 'text-stone-400'
                          }`}
                        >
                          ₹{item.price}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pricing & Checkout Row */}
              <div className="mt-8 pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-serif font-normal text-stone-900">
                      ₹{bundledPrice.toLocaleString('en-IN')}
                    </span>
                    {savings > 0 && (
                      <span className="text-sm text-stone-400 line-through">
                        ₹{rawTotal.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-[#244835] font-semibold mt-0.5 block">
                    You save ₹{savings} with this curated 12% bundle privilege
                  </span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <Button
                    variant="default"
                    size="lg"
                    onClick={() => navigate('#categories', { title: 'Curated Starter Kit Checkout' })}
                    className="w-full sm:w-auto gap-2 px-8"
                  >
                    <ShoppingBag size={16} />
                    <span>Acquire Custom Kit</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ---------------- 2. VERIFIED BRAND PARTNERS SHOWCASE ---------------- */}
        <div ref={partnersRef} className="pt-8 border-t border-stone-200/60">
          {/* Section Header with Clean Carousel Controls */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-4">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E3EFE7] text-[#244835] text-xs font-semibold uppercase tracking-wider mb-2.5">
                <ShieldCheck size={13} className="text-[#187E91]" />
                <span>Verified Ethical Suppliers</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal text-stone-900 tracking-tight">
                Our Certified Brand Partners
              </h3>
              <p className="mt-1.5 text-stone-600 text-xs sm:text-sm max-w-xl leading-relaxed">
                Every enterprise on Rayeva adheres to rigorous laboratory audits, closed-loop packaging mandates, and fair artisan livelihoods.
              </p>
            </div>

            {/* Header Arrow Controls - Accessible, responsive, never overlaps card text */}
            <div className="flex items-center gap-2 self-start sm:self-end shrink-0">
              <button
                type="button"
                onClick={() => nudgeSlider('left')}
                className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white border border-stone-200/90 shadow-xs hover:shadow-md hover:border-[#187E91]/40 text-stone-700 hover:text-[#187E91] flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#187E91]/30"
                aria-label="Previous Partner"
              >
                <ChevronLeft size={18} className="stroke-[2.5]" />
              </button>
              <button
                type="button"
                onClick={() => nudgeSlider('right')}
                className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white border border-stone-200/90 shadow-xs hover:shadow-md hover:border-[#187E91]/40 text-stone-700 hover:text-[#187E91] flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#187E91]/30"
                aria-label="Next Partner"
              >
                <ChevronRight size={18} className="stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Mobile User-Draggable & Desktop Carousel */}
          <div
            ref={sliderScrollContainerRef}
            className="relative w-full overflow-x-auto md:overflow-hidden py-4 -my-4 group/slider no-scrollbar scroll-smooth snap-x snap-mandatory touch-pan-x"
            onMouseEnter={handleSliderMouseEnter}
            onMouseLeave={handleSliderMouseLeave}
            onTouchStart={handleSliderMouseEnter}
            onTouchEnd={handleSliderMouseLeave}
          >
            {/* Left & Right Soft Fade Masks (hidden on mobile so cards are never cut off) */}
            <div className="hidden md:block absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-[#FAF8F3] via-[#FAF8F3]/90 to-transparent z-20 pointer-events-none" />
            <div className="hidden md:block absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-[#FAF8F3] via-[#FAF8F3]/90 to-transparent z-20 pointer-events-none" />

            {/* Seamless Infinite / Draggable Track */}
            <div
              ref={sliderTrackRef}
              className="flex gap-4 sm:gap-6 w-max select-none will-change-transform px-4 sm:px-6 md:px-1"
            >
              {[...PARTNERS, ...PARTNERS].map((brand, idx) => (
                <div
                  key={`${brand.name}-${idx}`}
                  className="w-[84vw] max-w-[320px] sm:w-[350px] md:w-[380px] shrink-0 snap-center bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-stone-200/80 shadow-[0_6px_24px_-6px_rgba(0,0,0,0.04)] hover:shadow-[0_24px_48px_-12px_rgba(24,126,145,0.14)] transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between group cursor-default"
                >
                  <div>
                    {/* Standout Brand Logo Showcase Header - Clean Pure Surface */}
                    <div className="relative mb-3.5 sm:mb-5 h-20 sm:h-24 rounded-xl sm:rounded-2xl bg-[#FCFBF9] border border-stone-200/90 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)] flex items-center justify-center px-4 sm:px-6 overflow-hidden transition-all duration-300 group-hover:border-stone-300 group-hover:bg-white group-hover:shadow-[0_6px_20px_-6px_rgba(0,0,0,0.06)]">
                      {/* Brand Logo Graphic - Tightly Cropped, High-Res, Transparent */}
                      <img
                        src={brand.logo}
                        alt={`${brand.name} logo`}
                        className="relative z-10 max-h-10 sm:max-h-12 max-w-[170px] sm:max-w-[210px] w-auto object-contain transition-transform duration-300 group-hover:scale-105 select-none"
                        loading="lazy"
                        draggable={false}
                        onError={(e) => {
                          // Fallback to stylized logo text badge if file fails
                          const target = e.currentTarget as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />

                      {/* Fallback stylized brand badge */}
                      <div
                        className="hidden relative z-10 items-center justify-center font-serif text-lg sm:text-xl font-bold tracking-tight"
                        style={{ color: brand.accent }}
                      >
                        {brand.name}
                      </div>
                    </div>

                    {/* Category & Audited Badge */}
                    <div className="flex items-center justify-between gap-2 mb-2 sm:mb-2.5">
                      <span
                        className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-2 sm:px-2.5 py-0.5 rounded-full truncate"
                        style={{ color: brand.accent, backgroundColor: `${brand.accent}14` }}
                      >
                        {brand.category}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[9.5px] sm:text-[10px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/70 px-2 py-0.5 rounded-full shrink-0">
                        <Check size={10} className="stroke-[3] text-emerald-600" />
                        <span>Audited</span>
                      </span>
                    </div>

                    {/* Brand Name */}
                    <h4 className="font-serif text-xl sm:text-2xl font-normal text-stone-900 group-hover:text-[#187E91] transition-colors leading-tight">
                      {brand.name}
                    </h4>

                    {/* Tagline - Fully readable on all devices without truncation */}
                    <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed mt-2 sm:mt-2.5 font-normal">
                      {brand.tagline}
                    </p>

                    {/* Core Highlight */}
                    <div className="mt-3.5 sm:mt-4 p-2.5 sm:p-3 rounded-xl bg-stone-50/90 border border-stone-200/70 text-[11px] sm:text-xs font-medium text-stone-800 flex items-start gap-2 sm:gap-2.5">
                      <span
                        className="w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                        style={{ backgroundColor: `${brand.accent}20`, color: brand.accent }}
                      >
                        <Check size={11} className="stroke-[3]" />
                      </span>
                      <span className="leading-snug">{brand.highlight}</span>
                    </div>

                    {/* Credentials Micro-Badges */}
                    <div className="mt-3 sm:mt-3.5 flex flex-wrap gap-1 sm:gap-1.5">
                      {brand.credentials.map((cred, cIdx) => (
                        <span
                          key={cIdx}
                          className="text-[9.5px] sm:text-[10px] font-medium px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-[#FAF8F3] text-stone-600 border border-stone-200/60"
                        >
                          {cred}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer Action */}
                  <div className="mt-5 sm:mt-6 pt-3.5 sm:pt-4 border-t border-stone-100 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => navigate('#categories', { title: brand.name })}
                      className="text-xs font-semibold text-[#187E91] hover:text-[#244835] inline-flex items-center gap-1.5 transition-colors cursor-pointer group-hover:translate-x-0.5 duration-200"
                    >
                      <span>{brand.linkText}</span>
                      <ArrowRight size={13} className="stroke-[2.5]" />
                    </button>
                    <span className="text-[11px] text-stone-400 font-mono font-medium">
                      0{(idx % PARTNERS.length) + 1}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
