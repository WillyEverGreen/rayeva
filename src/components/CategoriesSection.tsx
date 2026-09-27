import React, { useRef, useEffect, useMemo, useCallback } from 'react';
import gsap from 'gsap';
import {
  Home,
  Flower2,
  Sparkles,
  Recycle,
  Shirt,
  Gift,
  Package,
  Leaf,
  ShieldCheck,
  Globe,
  Cpu,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import { BotanicalHorizontalDivider } from './svg/BotanicalFlourish';
import { DriftingBotanicals } from './BotanicalDecorations';
import { AutoScrollSlider, type AutoScrollSlideItem } from './ui/autoscroll-slider';

export default function CategoriesSection() {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);

  const handleExploreSector = useCallback((sectorName: string) => {
    const productsEl = document.getElementById('trending-products') || document.getElementById('products');
    if (productsEl) {
      productsEl.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Entrance animations using GSAP
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top bottom',
          },
        }
      );

      gsap.fromTo(
        bannerRef.current,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: bannerRef.current,
            start: 'top bottom',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // 9 Rayeva Sectors with high-contrast, premium editorial photography & rich hover details
  const slides: AutoScrollSlideItem[] = useMemo(
    () => [
      {
        id: 'home',
        title: 'Home & Living',
        description:
          'Create mindful spaces with sustainable decor, enzyme-based botanical cleaners, neem wood kitchenware, and organic linen bedding.',
        image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1200&q=85',
        imageAlt: 'Home & Living artisanal ceramics and minimalist natural interior',
        categoryBadge: 'SECTOR 01 • MINDFUL SPACES',
        icon: <Home size={19} className="text-[#244835]" />,
        scopeTags: ['Artisanal Décor', 'Botanical Eco Cleaners', 'Bamboo Kitchenware', 'Organic Linen'],
        certifications: ['FSC-Certified Wood', 'GOTS Organic Linen', 'Zero Toxin Runoff'],
        actionLabel: 'Explore Home & Living',
        onAction: () => handleExploreSector('Home & Living'),
      },
      {
        id: 'beauty',
        title: 'Beauty & Personal Care',
        description:
          'Clean, plant-based products for mindful wellness, featuring cold-pressed botanical serums, waterless solid shampoo bars, and biodegradable organic hygiene.',
        image: 'https://images.unsplash.com/photo-1608248597359-0524458d927a?auto=format&fit=crop&w=1200&q=85',
        imageAlt: 'Beauty & Personal Care botanical amber glass serums and clean skincare',
        categoryBadge: 'SECTOR 02 • BOTANICAL WELLNESS',
        icon: <Flower2 size={19} className="text-[#187E91]" />,
        scopeTags: ['Botanical Serums', 'Solid Shampoo Bars', 'Bamboo Hygiene Pads', 'Ayurvedic Care'],
        certifications: ['Ayush Certified', '100% Cruelty-Free', 'Zero Microplastics'],
        actionLabel: 'Explore Beauty & Personal Care',
        onAction: () => handleExploreSector('Beauty & Personal Care'),
      },
      {
        id: 'zerowaste',
        title: 'Zero Waste Everyday Essentials',
        description:
          'Everyday alternatives that eliminate single-use waste: reusable organic produce bags, stainless steel insulated bottles, and upcycled coconut shell bowls.',
        image: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=1200&q=85',
        imageAlt: 'Zero Waste reusable organic market bags and circular essentials',
        categoryBadge: 'SECTOR 03 • ZERO WASTE',
        icon: <Recycle size={19} className="text-emerald-700" />,
        scopeTags: ['Reusable Produce Bags', 'Steel Insulated Bottles', 'Upcycled Coconut Bowls', 'Compostable Goods'],
        certifications: ['Zero Landfill Waste', 'USDA Bio-Based', '100% Circular'],
        actionLabel: 'Explore Zero Waste',
        onAction: () => handleExploreSector('Zero Waste Essentials'),
      },
      {
        id: 'fashion',
        title: 'Fashion, Accessories & Kids',
        description:
          'Thoughtful fashion for a kinder tomorrow, including durable plant leather totes, upcycled ocean-plastic fanny packs, and chemical-free organic kids apparel.',
        image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1200&q=85',
        imageAlt: 'Conscious Fashion ethical organic textiles and natural earth tones',
        categoryBadge: 'SECTOR 04 • CIRCULAR APPAREL',
        icon: <Shirt size={19} className="text-amber-700" />,
        scopeTags: ['Plant Leather Totes', 'Recycled Fanny Packs', 'Organic Kids Apparel', 'Cruelty-Free Craft'],
        certifications: ['PETA-Approved Vegan', 'Fair Trade Certified', 'OEKO-TEX 100'],
        actionLabel: 'Explore Conscious Fashion',
        onAction: () => handleExploreSector('Fashion & Accessories'),
      },
      {
        id: 'food',
        title: 'Food and Wellness',
        description:
          'Organic groceries, ancient grain millets, cold-pressed indigenous cooking oils, and artisanal restorative superfoods direct from verified ethical growers.',
        image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&q=85',
        imageAlt: 'Food & Wellness wholesome organic superfoods and indigenous grains',
        categoryBadge: 'SECTOR 05 • REGENERATIVE FOOD',
        icon: <Sparkles size={19} className="text-teal-700" />,
        scopeTags: ['Ancient Grain Millets', 'Cold-Pressed Oils', 'Plant-Based Snacks', 'Herbal Infusions'],
        certifications: ['Jaivik Bharat', '100% Pesticide-Free', 'Direct Trade'],
        actionLabel: 'Explore Food & Wellness',
        onAction: () => handleExploreSector('Food & Wellness'),
      },
      {
        id: 'gift',
        title: 'Conscious Gifting',
        description:
          'Meaningful celebration hampers and artisan packages, featuring handcrafted brass keepsakes, plantable seed-paper stationery, and zero-plastic festive boxes.',
        image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=85',
        imageAlt: 'Conscious Gifting artisanal celebration parcel with natural twine and botanicals',
        categoryBadge: 'SECTOR 06 • ARTISANAL CELEBRATION',
        icon: <Gift size={19} className="text-rose-700" />,
        scopeTags: ['Curated Hampers', 'Artisanal Crafts', 'Seed-Paper Stationery', 'Zero-Plastic Packaging'],
        certifications: ['Handcrafted in India', 'Plastic-Free Guaranteed', 'Carbon-Neutral Delivery'],
        actionLabel: 'Explore Conscious Gifting',
        onAction: () => handleExploreSector('Conscious Gifting'),
      },
      {
        id: 'tech',
        title: 'Clean Tech',
        description:
          'Sustainable electronics engineered for energy efficiency and longevity, including portable solar micro-chargers, bamboo tech accessories, and modular air purifiers.',
        image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1200&q=85',
        imageAlt: 'Clean Tech energy-efficient workspace and modular eco-hardware',
        categoryBadge: 'SECTOR 07 • CIRCULAR HARDWARE',
        icon: <Cpu size={19} className="text-cyan-700" />,
        scopeTags: ['Solar Micro-Chargers', 'Bamboo Tech Peripherals', 'Modular Electronics', 'Low-E Star Devices'],
        certifications: ['RoHS Compliant', 'Low-Energy Star', 'E-Waste Circularity Audited'],
        actionLabel: 'Explore Clean Tech',
        onAction: () => handleExploreSector('Clean Tech'),
      },
      {
        id: 'packaging',
        title: 'Sustainable Packaging',
        description:
          'Eco-friendly protective mailers, circular corrugated cartons, compostable cornstarch bags, and water-activated paper tape engineered to protect goods and soil.',
        image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1200&q=85',
        imageAlt: 'Sustainable Packaging recycled corrugated cartons and protective kraft paper',
        categoryBadge: 'SECTOR 08 • CIRCULAR DISPATCH',
        icon: <Package size={19} className="text-stone-700" />,
        scopeTags: ['Compostable Mailers', 'Honeycomb Cushioning', 'Corrugated Cartons', 'Water-Activated Tape'],
        certifications: ['OK Compost HOME', 'ASTM D6400 Certified', '100% Recyclable'],
        actionLabel: 'Explore Sustainable Packaging',
        onAction: () => handleExploreSector('Sustainable Packaging'),
      },
      {
        id: 'materials',
        title: 'Sustainable Materials and Impact Solutions',
        description:
          'B2B regenerative building blocks: upcycled industrial composite tiles, agricultural stubble bio-boards, and mycelium acoustic insulation for circular enterprises.',
        image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=85',
        imageAlt: 'Sustainable Materials circular raw boards and textured architectural samples',
        categoryBadge: 'SECTOR 09 • ENTERPRISE ESG',
        icon: <Layers size={19} className="text-indigo-700" />,
        scopeTags: ['Agricultural Bio-Boards', 'Upcycled Composite Tiles', 'Mycelium Insulation', 'Circular Raw Materials'],
        certifications: ['Circular Economy Audited', 'EPR Compliant', 'Cradle-to-Cradle Certified'],
        actionLabel: 'Explore Enterprise Materials',
        onAction: () => handleExploreSector('Sustainable Materials & Impact Solutions'),
      },
    ],
    [handleExploreSector]
  );

  return (
    <section
      ref={containerRef}
      id="categories"
      className="relative w-full bg-[#FAF8F3] py-14 sm:py-20 lg:py-24 overflow-hidden border-t border-stone-200/50"
    >
      {/* ----------------- BOTANICAL LEAF ACCENTS & DRIFTING FOLIAGE ----------------- */}
      <DriftingBotanicals includePetals={true} />
      <div className="absolute -top-6 -right-6 sm:-top-8 sm:-right-8 w-28 sm:w-60 md:w-80 pointer-events-none select-none z-0 opacity-40 sm:opacity-85 filter drop-shadow-md">
        <img
          src="/leaves/branch-top-left.png"
          alt=""
          className="w-full h-auto -scale-x-100 object-contain object-top-right"
        />
      </div>

      <div className="hidden sm:block absolute top-28 right-44 sm:right-56 w-9 sm:w-12 pointer-events-none select-none z-0 opacity-60">
        <img src="/leaves/leaf-04.png" alt="" className="w-full h-auto -rotate-40 animate-float-slow" />
      </div>

      <div className="absolute top-4 left-4 sm:top-6 sm:left-8 w-14 sm:w-20 pointer-events-none select-none z-0 opacity-65 filter drop-shadow-xs">
        <img src="/leaves/leaf-03.png" alt="" className="w-full h-auto -rotate-15 -scale-x-100 animate-float-delayed" />
      </div>

      <div className="hidden md:block absolute top-1/3 -left-2 w-16 sm:w-24 pointer-events-none select-none z-0 opacity-60">
        <img src="/extracted/branches/branch_drooping_left.png" alt="" className="w-full h-auto object-contain" />
      </div>

      <div className="hidden md:block absolute top-1/2 -right-1 w-12 sm:w-16 pointer-events-none select-none z-0 opacity-55">
        <img src="/leaves/leaf-05.png" alt="" className="w-full h-auto -rotate-25 animate-float-slow" />
      </div>

      <div className="hidden lg:block absolute bottom-8 left-10 w-10 sm:w-14 pointer-events-none select-none z-0 opacity-60">
        <img src="/extracted/leaves/leaf_top_meadow_floating.png" alt="" className="w-full h-auto rotate-12 animate-float-delayed" />
      </div>

      {/* ----------------- 1. COMBINED EDITORIAL HEADER ----------------- */}
      <div
        ref={headerRef}
        className="relative z-10 max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-10 mb-10 sm:mb-12"
      >
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-[0.22em] text-[#187E91] uppercase mb-3 bg-[#E3EFE7] px-3.5 py-1.5 rounded-full">
              <Sparkles size={12} className="stroke-[2.5]" />
              <span>RAYEVA SECTORS DIRECTORY</span>
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-serif font-normal tracking-tight text-slate-900 leading-[1.12]">
              Sustainable Choices<br />
              for a <span className="italic font-serif text-[#187E91]">Better Tomorrow</span>
            </h2>
            <p className="mt-4 text-stone-600 text-sm sm:text-[15px] max-w-xl leading-relaxed font-normal">
              Explore Rayeva's 9 curated sectors, thoughtfully designed for you, your home, and a cleaner planet. Hover any card to pause auto-scroll and inspect full product scope and audited eco-certifications.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-xs text-stone-600 font-semibold bg-white/90 px-4 py-2 rounded-full border border-stone-200/80 shadow-2xs flex items-center gap-2">
              <CheckCircle2 size={14} className="text-emerald-600" />
              <span>9 Sectors • 100% Verified Sustainability</span>
            </div>
          </div>
        </div>
      </div>

      {/* ----------------- 2. BUTTERY AUTOSCROLL SLIDER (Editorial 4K Images & Rich Hover Scope) ----------------- */}
      <div className="relative z-10 w-full max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-10">
        <AutoScrollSlider
          slides={slides}
          speed={1.2}
          stopOnMouseEnter={true}
          className="w-full"
        />
      </div>

      {/* ----------------- 3. BOTTOM VALUE PROPS BANNER ----------------- */}
      <div
        ref={bannerRef}
        className="relative z-10 w-full max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-10 mt-16 sm:mt-20"
      >
        <BotanicalHorizontalDivider className="mb-10 opacity-70" color="#187E91" />

        <div className="bg-[#F5F2EA]/95 backdrop-blur-xl rounded-[28px] sm:rounded-[36px] p-6 sm:p-8 lg:p-10 border border-stone-200/70 shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-10">
          <div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-medium text-slate-900 tracking-tight leading-tight">
              Small Choices.<br />
              <span className="italic font-serif text-[#187E91]">A Greener Tomorrow.</span>
            </h3>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-6 sm:gap-8 lg:gap-10">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-[#E3EFE7] text-[#244835] flex items-center justify-center shrink-0 shadow-xs">
                <Leaf size={20} className="stroke-[2.2]" />
              </div>
              <div>
                <div className="font-semibold text-slate-900 text-xs sm:text-sm">Curated</div>
                <div className="text-[11px] sm:text-xs text-stone-500 font-medium">Sustainable Products</div>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-[#E3EFE7] text-[#244835] flex items-center justify-center shrink-0 shadow-xs">
                <ShieldCheck size={20} className="stroke-[2.2]" />
              </div>
              <div>
                <div className="font-semibold text-slate-900 text-xs sm:text-sm">Verified</div>
                <div className="text-[11px] sm:text-xs text-stone-500 font-medium">Conscious Brands</div>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-[#E3EFE7] text-[#244835] flex items-center justify-center shrink-0 shadow-xs">
                <Globe size={20} className="stroke-[2.2]" />
              </div>
              <div>
                <div className="font-semibold text-slate-900 text-xs sm:text-sm">Positive Impact</div>
                <div className="text-[11px] sm:text-xs text-stone-500 font-medium">On The Planet</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
