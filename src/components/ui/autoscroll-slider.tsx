"use client";

import React, { useState } from "react";
import {
  Carousel,
  Slider,
  SliderContainer,
} from "@/components/ui/autoscroll-slider-utils/carousel";
import type { EmblaOptionsType } from "embla-carousel";
import AutoScroll from "embla-carousel-auto-scroll";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AutoScrollSlideItem {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
  categoryBadge?: string;
  icon?: React.ReactNode;
  scopeTags?: string[];
  certifications?: string[];
  actionLabel?: string;
  onAction?: () => void;
}

export interface AutoScrollSliderProps {
  slides?: AutoScrollSlideItem[];
  speed?: number;
  stopOnMouseEnter?: boolean;
  className?: string;
  itemClassName?: string;
  setApi?: (api: any) => void;
}

// Curated high-resolution editorial Unsplash photography for Rayeva sectors
export const DEFAULT_EDITORIAL_SLIDES: AutoScrollSlideItem[] = [
  {
    id: "home",
    title: "Home & Living",
    description: "Mindful spaces with terracotta pottery, natural linen, and enzyme eco-cleaners.",
    image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1200&q=85",
    categoryBadge: "SECTOR 01 • ESSENTIALS",
    scopeTags: ["Artisanal Décor", "Eco Cleaners", "Neem Wood", "Organic Linen"],
    certifications: ["FSC-Certified", "GOTS Organic", "Zero Toxin"],
  },
  {
    id: "beauty",
    title: "Beauty & Personal Care",
    description: "Cold-pressed botanical facial serums, waterless shampoo bars, and clean hygiene.",
    image: "https://images.unsplash.com/photo-1608248597359-0524458d927a?auto=format&fit=crop&w=1200&q=85",
    categoryBadge: "SECTOR 02 • BOTANICAL",
    scopeTags: ["Botanical Serums", "Solid Bars", "Bamboo Hygiene", "Ayurvedic"],
    certifications: ["Ayush Certified", "100% Cruelty-Free", "Zero Microplastics"],
  },
  {
    id: "zerowaste",
    title: "Zero Waste Everyday",
    description: "Everyday alternatives that eliminate single-use waste: organic mesh and steel bottles.",
    image: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=1200&q=85",
    categoryBadge: "SECTOR 03 • CIRCULAR",
    scopeTags: ["Produce Bags", "Steel Bottles", "Upcycled Bowls", "Bamboo"],
    certifications: ["Zero Landfill Waste", "USDA Bio-Based", "100% Reusable"],
  },
  {
    id: "fashion",
    title: "Fashion & Accessories",
    description: "Thoughtful fashion, vegan plant leather totes, and chemical-free organic cotton apparel.",
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1200&q=85",
    categoryBadge: "SECTOR 04 • APPAREL",
    scopeTags: ["Plant Leather", "Recycled Packs", "Organic Cotton", "Fair Trade"],
    certifications: ["PETA-Approved Vegan", "OEKO-TEX 100", "Fair Trade"],
  },
  {
    id: "food",
    title: "Food and Wellness",
    description: "Indigenous superfood millets, cold-pressed artisanal seed oils, and restorative infusions.",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1200&q=85",
    categoryBadge: "SECTOR 05 • NUTRITION",
    scopeTags: ["Ancient Millets", "Cold-Pressed Oils", "Herbal Teas", "Superfoods"],
    certifications: ["Jaivik Bharat", "100% Pesticide-Free", "Direct Trade"],
  },
  {
    id: "gift",
    title: "Conscious Gifting",
    description: "Handcrafted brass keepsakes, plantable seed-paper stationery, and plastic-free festive hampers.",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=85",
    categoryBadge: "SECTOR 06 • CELEBRATION",
    scopeTags: ["Artisan Hampers", "Seed Stationery", "Brass Crafts", "Zero Plastic"],
    certifications: ["Handcrafted in India", "Plastic-Free", "Carbon-Neutral"],
  },
  {
    id: "tech",
    title: "Clean Tech",
    description: "Sustainable electronics engineered for energy efficiency, modularity, and circular design.",
    image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1200&q=85",
    categoryBadge: "SECTOR 07 • HARDWARE",
    scopeTags: ["Solar Chargers", "Bamboo Peripherals", "Modular Tech", "Low-Energy"],
    certifications: ["RoHS Compliant", "Energy Star", "E-Waste Audited"],
  },
  {
    id: "packaging",
    title: "Sustainable Packaging",
    description: "Circular corrugated cartons, compostable mailers, and water-activated protective tape.",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1200&q=85",
    categoryBadge: "SECTOR 08 • DISPATCH",
    scopeTags: ["Compostable Mailers", "Honeycomb Cushion", "Cartons", "Paper Tape"],
    certifications: ["OK Compost HOME", "ASTM D6400", "100% Recyclable"],
  },
  {
    id: "materials",
    title: "Sustainable Materials & ESG",
    description: "B2B regenerative building blocks, upcycled composite tiles, and mycelium acoustic panels.",
    image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=85",
    categoryBadge: "SECTOR 09 • ENTERPRISE",
    scopeTags: ["Bio-Boards", "Upcycled Tiles", "Mycelium Panels", "Circular ESG"],
    certifications: ["Circular Economy Audited", "EPR Compliant", "Cradle-to-Cradle"],
  },
];

export function AutoScrollSlider({
  slides = DEFAULT_EDITORIAL_SLIDES,
  speed = 1.25,
  stopOnMouseEnter = true,
  className,
  itemClassName,
  setApi,
}: AutoScrollSliderProps) {
  const OPTIONS: EmblaOptionsType = {
    loop: true,
    dragFree: true,
    containScroll: "trimSnaps",
  };

  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <Carousel
      options={OPTIONS}
      setApi={setApi}
      plugins={[
        AutoScroll({
          speed,
          stopOnInteraction: true,
          stopOnMouseEnter,
          startDelay: 120,
        }),
      ]}
      className={cn("w-full mx-auto select-none", className)}
    >
      <SliderContainer className="gap-4 sm:gap-6 py-4 px-2 sm:px-0">
        {slides.map((slide, idx) => {
          const isHovered = hoveredId === slide.id;

          return (
            <Slider
              key={slide.id || idx}
              onMouseEnter={() => setHoveredId(slide.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={cn(
                "group relative shrink-0 w-[84vw] max-w-[320px] sm:max-w-none sm:w-[380px] md:w-[420px] lg:w-[450px] h-[430px] sm:h-[480px]",
                "rounded-[28px] overflow-hidden bg-stone-900 border border-stone-200/70 shadow-md",
                "transition-all duration-400 ease-out hover:shadow-2xl hover:-translate-y-1.5 cursor-pointer will-change-transform",
                itemClassName
              )}
              style={{
                transform: "translate3d(0,0,0)",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
              onClick={slide.onAction}
            >
              {/* High-Resolution Editorial Photography */}
              <img
                src={slide.image}
                alt={slide.imageAlt ?? slide.title}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none transition-transform duration-700 ease-out group-hover:scale-106 will-change-transform"
                style={{
                  transform: "translate3d(0,0,0)",
                  backfaceVisibility: "hidden",
                }}
              />

              {/* Seamless Dark Gradient Mask for Crisp High-Contrast Legibility */}
              <div
                className={cn(
                  "pointer-events-none absolute inset-0 transition-opacity duration-300",
                  isHovered
                    ? "bg-gradient-to-t from-black/95 via-black/65 to-black/30 opacity-100"
                    : "bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-95 group-hover:opacity-100"
                )}
              />

              {/* Top-Left Frosted Glass Category Icon Badge */}
              {slide.icon && (
                <div className="absolute top-4 left-4 z-20 w-10 h-10 rounded-full bg-white/95 backdrop-blur-md text-stone-900 flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-110">
                  {slide.icon}
                </div>
              )}

              {/* Top-Right Category Badge */}
              {slide.categoryBadge && (
                <div className="absolute top-4 right-4 z-20 px-3.5 py-1 rounded-full bg-black/65 backdrop-blur-md text-white/95 text-[11px] font-semibold tracking-wider border border-white/15 shadow-xs">
                  {slide.categoryBadge}
                </div>
              )}

              {/* Bottom Editorial Content Tray */}
              <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6 flex flex-col justify-end">
                {/* Sector Category Eyebrow */}
                <div className="flex items-center gap-1.5 text-[11px] uppercase font-bold tracking-widest text-emerald-400 mb-1">
                  <Sparkles size={12} className="stroke-[2.5]" />
                  <span>Rayeva Verified Sector</span>
                </div>

                {/* Main Heading */}
                <h3 className="font-serif text-2xl sm:text-[26px] font-medium text-white tracking-tight leading-snug drop-shadow-sm">
                  {slide.title}
                </h3>

                {/* Tagline / Subtitle */}
                <p className="text-xs sm:text-[13px] text-stone-200/95 leading-relaxed mt-1.5 font-normal line-clamp-2 drop-shadow-xs">
                  {slide.description}
                </p>

                {/* Curated Scope Chips */}
                {slide.scopeTags && slide.scopeTags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {slide.scopeTags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-medium border border-white/15"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Hover Details Expansion (Audited Certifications & Action Link) */}
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-350 ease-out",
                    isHovered
                      ? "max-h-28 opacity-100 mt-3 pt-3 border-t border-white/20"
                      : "max-h-0 opacity-0 mt-0 pt-0 border-t-0"
                  )}
                >
                  {slide.certifications && slide.certifications.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 mb-2">
                      <span className="text-[10px] font-semibold text-emerald-400 flex items-center gap-1">
                        <ShieldCheck size={12} className="stroke-[2.2]" />
                        Audited:
                      </span>
                      {slide.certifications.map((cert) => (
                        <span
                          key={cert}
                          className="px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 text-[10px] font-semibold border border-emerald-500/30"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-white/90">
                      {slide.actionLabel ?? "Explore Sector Scope"}
                    </span>
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-300 group-hover:translate-x-1 transition-transform">
                      <span>View Products</span>
                      <ArrowRight size={14} className="stroke-[2.5]" />
                    </div>
                  </div>
                </div>
              </div>
            </Slider>
          );
        })}
      </SliderContainer>
    </Carousel>
  );
}

export default AutoScrollSlider;
