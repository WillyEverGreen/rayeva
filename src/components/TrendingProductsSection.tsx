import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ShoppingCart,
  Eye,
  Check,
  Star,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Leaf,
  Recycle,
  Sparkles,
} from 'lucide-react';
import { usePageTransition } from '../context/TransitionContext';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import { EcoSealBadge, SectionLeavesAccents } from './BotanicalDecorations';

gsap.registerPlugin(ScrollTrigger);

export interface SustainableProduct {
  id: string;
  name: string;
  category: string;
  filterCategory: 'all' | 'beauty' | 'fashion' | 'food' | 'home';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  tag: string;
  plasticDiverted: string;
  carbonSaved: string;
  origin: string;
  materials: string[];
  description: string;
  specifications: { label: string; value: string }[];
}

// Curated high-resolution editorial photography matching each product accurately
const PRODUCTS: SustainableProduct[] = [
  {
    id: 'prod-acne-gel',
    name: 'Cold-Pressed Neem & Willow Bark Clarifying Gel',
    category: 'Clean Beauty & Care',
    filterCategory: 'beauty',
    price: 868.89,
    originalPrice: 999.00,
    rating: 4.8,
    reviewsCount: 142,
    image: '/images/products/clarifying-gel.jpg',
    tag: 'Verified Clean',
    plasticDiverted: '100% Glass Jar',
    carbonSaved: '0.42 kg CO₂e',
    origin: 'Himachal Pradesh, India',
    materials: ['Cold-Pressed Neem Oil', 'Wild Salicylic Willow Bark', 'Tea Tree Hydrosol', 'Aloe Barbadensis Leaf Juice'],
    description: 'Ultra-light, non-comedogenic botanical clarifying gel formulated with high-altitude wild willow bark and cold-pressed neem for rapid blemish clearing without synthetic fragrances.',
    specifications: [
      { label: 'Formulation', value: '100% Water-based Botanicals' },
      { label: 'Packaging', value: 'Amber UV-Glass + Aluminum Lid' },
      { label: 'Certifications', value: 'Cruelty-Free, Zero Parabens, Non-Toxic' },
      { label: 'Shelf Life', value: '18 Months (Cold Stored)' },
    ],
  },
  {
    id: 'prod-cybele',
    name: 'Cybele Artisanal Apple-Leather Crossbody Bag',
    category: 'Conscious Apparel',
    filterCategory: 'fashion',
    price: 6666.67,
    originalPrice: 7999.00,
    rating: 4.9,
    reviewsCount: 88,
    image: '/images/products/apple-leather-bag.jpg',
    tag: 'Bio-Circular',
    plasticDiverted: '3.2 kg Plastic avoided',
    carbonSaved: '4.8 kg CO₂e',
    origin: 'Kashmir Valley & Bangalore',
    materials: ['Upcycled Apple Peel Bio-Leather (58%)', 'Organic Cotton Canvas Lining', 'Recycled Solid Brass Hardware'],
    description: 'Designer luxury lifestyle bag crafted from apple pomace residue sourced from cider orchards. Handcrafted by master artisans with water-resistant bio-coating and zero toxic solvents.',
    specifications: [
      { label: 'Bio-Base', value: '58% Apple Peels + 42% Waterborne PU' },
      { label: 'Hardware', value: '100% Recycled Solid Brass' },
      { label: 'Lining', value: 'GOTS Certified Organic Canvas' },
      { label: 'Warranty', value: 'Lifetime Repair Guarantee' },
    ],
  },
  {
    id: 'prod-makhana',
    name: 'Himalayan Pink Salt Makhana (Bulk Case of 48)',
    category: 'Food & Wellness',
    filterCategory: 'food',
    price: 12000.00,
    originalPrice: 14400.00,
    rating: 5.0,
    reviewsCount: 64,
    image: '/images/products/makhana-snack.jpg',
    tag: 'Regenerative Farm',
    plasticDiverted: 'Compostable Pouch',
    carbonSaved: '2.1 kg CO₂e',
    origin: 'Mithila Region, Bihar',
    materials: ['Grade-A Giant Water Lily Seeds', 'Pink Himalayan Rock Salt', 'Cold-Pressed Olive Oil'],
    description: 'Direct-trade, slow-roasted lotus seed snacks curated for corporate wellness pantries and conscious homes. Roasted in small batches with zero trans-fats and 100% home-compostable barrier film.',
    specifications: [
      { label: 'Sourcing', value: 'Wetland Farmer Cooperative Direct' },
      { label: 'Nutrients', value: 'High Protein, Zero Trans Fat' },
      { label: 'Packaging', value: 'Zerocircle Seaweed-Coated Bio-Pouch' },
      { label: 'Quantity', value: '48 x 80g Individual Packets' },
    ],
  },
  {
    id: 'prod-bamboo-set',
    name: 'Handcrafted Sabai Grass & Bamboo Table Organizers',
    category: 'Home & Living',
    filterCategory: 'home',
    price: 1850.00,
    originalPrice: 2200.00,
    rating: 4.9,
    reviewsCount: 112,
    image: '/images/products/bamboo-organizer.jpg',
    tag: 'Artisan Crafted',
    plasticDiverted: 'Zero Synthetic Fibers',
    carbonSaved: '1.8 kg CO₂e',
    origin: 'Mayurbhanj, Odisha',
    materials: ['Wild Sabai Grass', 'Seasoned Bamboo', 'Vegetable Dyes'],
    description: 'Woven by women artisans in rural Odisha, these sustainable desktop organizers bring organic warmth to corporate and modern living spaces while supporting indigenous livelihood cooperatives.',
    specifications: [
      { label: 'Craft', value: 'Traditional Hand-Twined Sabai' },
      { label: 'Dyes', value: '100% Botanical Extracts' },
      { label: 'Impact', value: 'Fair-Trade Artisan Livelihood' },
      { label: 'Finish', value: 'Beeswax Natural Seal' },
    ],
  },
  {
    id: 'prod-zerowaste-kit',
    name: 'Closed-Loop Personal Zero-Waste Essentials Kit',
    category: 'Zero-Waste Living',
    filterCategory: 'home',
    price: 2450.00,
    originalPrice: 2999.00,
    rating: 4.9,
    reviewsCount: 194,
    image: '/images/products/zero-waste-kit.jpg',
    tag: 'Closed Loop',
    plasticDiverted: '14.2 kg Annual Plastic',
    carbonSaved: '6.4 kg CO₂e',
    origin: 'Auroville & Pune',
    materials: ['Neem Wood Cutlery', 'Organic Hemp Napkin', 'Copper Hydration Flask', 'Loofah Scrub'],
    description: 'The definitive daily starter package for a completely plastic-free routine. Every single piece is biodegradable or infinitely recyclable, packed inside a reusable unbleached cotton tote.',
    specifications: [
      { label: 'Items Included', value: '5 Daily Reusable Replacements' },
      { label: 'Lifespan', value: 'Multi-Year Durable Construction' },
      { label: 'End of Life', value: '100% Compostable or Recyclable' },
      { label: 'Packaging', value: 'Recycled Cardboard Mailer' },
    ],
  },
  {
    id: 'prod-plant-tote',
    name: 'Piñatex Plant-Leather Everyday Minimalist Tote',
    category: 'Conscious Apparel',
    filterCategory: 'fashion',
    price: 4950.00,
    originalPrice: 5800.00,
    rating: 4.8,
    reviewsCount: 76,
    image: '/images/products/plant-tote-bag.jpg',
    tag: 'Upcycled Biomass',
    plasticDiverted: 'Replaces PVC/Vinyl',
    carbonSaved: '3.9 kg CO₂e',
    origin: 'Coimbatore, Tamil Nadu',
    materials: ['Pineapple Leaf Fiber (Piñatex)', 'Organic Linen Lining', 'Reinforced Cotton Webbing'],
    description: 'Sculptural, lightweight everyday carryall engineered from agricultural pineapple leaf byproduct that would otherwise be burned. Zero animal cruelty, water-repellent, and remarkably durable.',
    specifications: [
      { label: 'Material', value: 'Natural Pineapple Leaf Fiber' },
      { label: 'Capacity', value: 'Holds up to 16-inch Laptop' },
      { label: 'Weight', value: 'Ultra-light 480 grams' },
      { label: 'Closure', value: 'Concealed Magnetic Snap' },
    ],
  },
];

const FILTER_TABS = [
  { id: 'all', label: 'All Essentials' },
  { id: 'beauty', label: 'Clean Beauty' },
  { id: 'fashion', label: 'Conscious Apparel' },
  { id: 'food', label: 'Food & Wellness' },
  { id: 'home', label: 'Home & Living' },
];

export default function TrendingProductsSection() {
  const [activeTab, setActiveTab] = useState<'all' | 'beauty' | 'fashion' | 'food' | 'home'>('all');
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});
  const [, setCartCount] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<SustainableProduct | null>(null);
  const [activeModalTab, setActiveModalTab] = useState<'overview' | 'materials' | 'specs'>('overview');

  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const { navigate } = usePageTransition();

  const filteredProducts = activeTab === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.filterCategory === activeTab);

  // Scroll track horizontally smoothly
  const scrollLine = (direction: 'left' | 'right') => {
    if (trackRef.current) {
      const scrollAmount = 390;
      trackRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // Staggered entrance animation
  useEffect(() => {
    if (!trackRef.current) return;

    const cards = trackRef.current.querySelectorAll('.product-card-anim');
    if (cards.length === 0) return;

    gsap.fromTo(
      cards,
      { opacity: 0, y: 25 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: trackRef.current,
          start: 'top bottom',
        },
      }
    );
  }, [activeTab]);

  const handleAddToCart = (product: SustainableProduct) => {
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setCartCount((c) => c + 1);
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 2200);
  };

  return (
    <section
      id="trending-products"
      ref={containerRef}
      className="relative w-full bg-[#FAF8F3] py-20 sm:py-28 overflow-hidden select-none border-t border-stone-200/60"
    >
      {/* Subtle organic ambient glow & botanical foliage */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 rounded-full bg-[#187E91]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-40 w-96 h-96 rounded-full bg-[#244835]/5 blur-3xl pointer-events-none" />
      <SectionLeavesAccents side="both" top="top-20" />

      <div className="relative z-10 w-full max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-10">

        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 sm:mb-10 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E3EFE7] border border-[#244835]/15 text-[#244835] text-xs font-semibold tracking-wider uppercase mb-3">
              <Sparkles size={13} className="text-[#187E91]" />
              <span>Lab-Audited Curated Catalog</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-stone-900 tracking-tight leading-[1.12]">
              Trending Sustainable Products
            </h2>
            <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed font-normal max-w-xl">
              Every item independently verified for zero-plastic packaging, clean non-toxic formulation, and ethical artisan provenance.
            </p>
          </div>

          {/* Right Action: Category Filter Tabs & Horizontal Scroll Arrows */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            {/* Filter tabs — scrollable on mobile */}
            <div className="overflow-x-auto no-scrollbar">
              <div className="flex items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 rounded-full bg-white/90 border border-stone-200/80 backdrop-blur-md shadow-xs w-max">
                {FILTER_TABS.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setActiveTab(tab.id as typeof activeTab);
                      if (trackRef.current) {
                        trackRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                      }
                    }}
                    className={`px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-[13px] font-semibold whitespace-nowrap shrink-0 transition-all duration-300 cursor-pointer ${
                      activeTab === tab.id
                        ? 'bg-[#187E91] text-white shadow-xs'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100/80'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Scroll Arrow Buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                aria-label="Scroll products left"
                onClick={() => scrollLine('left')}
                className="w-10 h-10 rounded-full bg-white hover:bg-[#187E91] text-stone-800 hover:text-white border border-stone-200 shadow-2xs flex items-center justify-center transition-colors active:scale-95 cursor-pointer shrink-0"
              >
                <ArrowLeft size={16} />
              </button>
              <button
                type="button"
                aria-label="Scroll products right"
                onClick={() => scrollLine('right')}
                className="w-10 h-10 rounded-full bg-white hover:bg-[#187E91] text-stone-800 hover:text-white border border-stone-200 shadow-2xs flex items-center justify-center transition-colors active:scale-95 cursor-pointer shrink-0"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* ---------------- PRODUCTS IN ONE SINGLE HORIZONTAL LINE ---------------- */}
        <div className="relative w-full">
          <div
            ref={trackRef}
            className="flex items-stretch gap-4 sm:gap-6 sm:gap-7 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory touch-pan-x pb-6 pt-2 px-4 sm:px-1"
          >
            {filteredProducts.map((prod) => {
              const isAdded = !!addedIds[prod.id];
              return (
                <div
                  key={prod.id}
                  className="product-card-anim shrink-0 snap-center w-[84vw] max-w-[320px] sm:w-[350px] md:w-[380px] bg-white rounded-3xl overflow-hidden border border-stone-200/80 shadow-[0_6px_24px_-6px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_45px_-10px_rgba(24,126,145,0.18)] transition-all duration-400 hover:-translate-y-1.5 flex flex-col justify-between"
                >
                  {/* Photo with high contrast & accurate product image */}
                  <div className="relative aspect-[16/11] overflow-hidden bg-stone-100">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-106"
                    />

                    {/* Gradient shade for bottom readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                    {/* Top Left: Verification Tag Badge */}
                    <div className="absolute top-3.5 left-3.5 z-10">
                      <Badge variant="forest" className="shadow-md font-semibold text-[11px] py-1 px-3">
                        <ShieldCheck size={12} className="stroke-[2.5]" />
                        <span>{prod.tag}</span>
                      </Badge>
                    </div>

                    {/* Top Right: Rating Pill */}
                    <div className="absolute top-3.5 right-3.5 z-10 inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-md text-stone-900 text-xs font-semibold px-3 py-1 rounded-full shadow-md border border-stone-200/50">
                      <Star size={12} className="text-amber-500 fill-amber-500" />
                      <span>{prod.rating.toFixed(1)}</span>
                      <span className="text-[10px] text-stone-400">({prod.reviewsCount})</span>
                    </div>

                    {/* Bottom Strip: Environmental Impact Metrics */}
                    <div className="absolute bottom-3 inset-x-3 z-10 flex items-center justify-between px-3 py-1.5 rounded-xl bg-black/55 backdrop-blur-md border border-white/20 text-white text-[11px] font-medium">
                      <div className="flex items-center gap-1.5">
                        <Recycle size={13} className="text-emerald-300 stroke-[2.2]" />
                        <span>{prod.plasticDiverted}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Leaf size={13} className="text-teal-300 stroke-[2.2]" />
                        <span>{prod.carbonSaved}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[11px] font-bold text-[#187E91] tracking-wider uppercase">
                          {prod.category}
                        </span>
                        <span className="text-[11px] text-stone-400 font-medium">
                          {prod.origin}
                        </span>
                      </div>

                      <h3 className="font-serif text-lg sm:text-[19px] font-normal text-stone-900 line-clamp-1 leading-snug hover:text-[#187E91] transition-colors">
                        {prod.name}
                      </h3>

                      <p className="text-stone-600 text-xs leading-relaxed mt-2 line-clamp-2">
                        {prod.description}
                      </p>
                    </div>

                    {/* Price Row & Quick Actions */}
                    <div className="mt-5 pt-4 border-t border-stone-100">
                      <div className="flex items-center justify-between mb-3.5">
                        <div>
                          <div className="text-2xl font-serif font-normal text-stone-900 tracking-tight">
                            ₹{prod.price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </div>
                          {prod.originalPrice && (
                            <div className="text-xs text-stone-400 line-through mt-0.5">
                              ₹{prod.originalPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                            </div>
                          )}
                        </div>

                        <Button
                          variant="outlineTeal"
                          size="sm"
                          onClick={() => setSelectedProduct(prod)}
                          className="gap-1.5 text-xs rounded-xl"
                        >
                          <Eye size={13} />
                          <span>Dossier</span>
                        </Button>
                      </div>

                      {/* Action Buttons */}
                      <div className="grid grid-cols-2 gap-2.5">
                        <Button
                          variant={isAdded ? "secondary" : "outline"}
                          size="sm"
                          onClick={() => handleAddToCart(prod)}
                          className="w-full text-xs gap-1.5"
                        >
                          {isAdded ? (
                            <>
                              <Check size={14} className="stroke-[3] text-emerald-700" />
                              <span className="text-emerald-800">In Cart</span>
                            </>
                          ) : (
                            <>
                              <ShoppingCart size={14} />
                              <span>Add to Bag</span>
                            </>
                          )}
                        </Button>

                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => navigate('#categories', { title: prod.name })}
                          className="w-full text-xs gap-1.5"
                        >
                          <span>Acquire</span>
                          <ArrowRight size={13} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Catalog Link Banner */}
        <div className="mt-12 text-center">
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={() => navigate('#categories', { title: 'All Curated Categories' })}
            className="rounded-xl px-8 shadow-xs hover:shadow-md transition-all duration-300 gap-3 text-stone-800 hover:text-[#187E91]"
          >
            <span>Explore All 30+ Verified Ethical Brands</span>
            <ArrowRight size={16} className="text-[#187E91]" />
          </Button>
        </div>

      </div>

      {/* ----------------- RADIX DOSSIER MODAL ----------------- */}
      <Dialog open={!!selectedProduct} onOpenChange={(open) => !open && setSelectedProduct(null)}>
        <DialogContent className="max-w-2xl bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-2xl">
          {selectedProduct && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="forest">{selectedProduct.tag}</Badge>
                  <span className="text-xs text-stone-400 font-medium">{selectedProduct.origin}</span>
                </div>
                <DialogTitle className="text-2xl font-serif font-normal text-stone-900 leading-snug">
                  {selectedProduct.name}
                </DialogTitle>
                <DialogDescription className="text-xs text-stone-500 mt-1">
                  Product Verification ID: {selectedProduct.id} • Lab Audited Sustainability Scope
                </DialogDescription>
              </DialogHeader>

              {/* Modal Tabs */}
              <div className="flex items-center gap-2 border-b border-stone-200/80 mt-4 pb-2">
                {(['overview', 'materials', 'specs'] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveModalTab(tab)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                      activeModalTab === tab
                        ? 'bg-[#187E91] text-white'
                        : 'text-stone-500 hover:text-stone-900'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Contents */}
              <div className="py-4 text-xs sm:text-sm text-stone-700 leading-relaxed min-h-[160px]">
                {activeModalTab === 'overview' && (
                  <div className="space-y-4">
                    <p>{selectedProduct.description}</p>

                    {/* Verified Eco Seals Emblems */}
                    <div className="p-3.5 rounded-2xl bg-white border border-stone-200/80 shadow-2xs">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-2">
                        Audited Environmental Verification Seals
                      </div>
                      <div className="flex items-center gap-4">
                        <EcoSealBadge type="plastic_free" size="md" />
                        <EcoSealBadge type="organic" size="md" />
                        <EcoSealBadge type="sustainable" size="md" />
                        <EcoSealBadge type="circular" size="md" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="p-3.5 rounded-2xl bg-[#E3EFE7]/60 border border-[#244835]/10">
                        <div className="text-[11px] text-[#244835] font-semibold">Plastic Diverted</div>
                        <div className="text-sm font-serif font-semibold text-stone-900 mt-0.5">
                          {selectedProduct.plasticDiverted}
                        </div>
                      </div>
                      <div className="p-3.5 rounded-2xl bg-[#187E91]/10 border border-[#187E91]/20">
                        <div className="text-[11px] text-[#187E91] font-semibold">Carbon Avoided</div>
                        <div className="text-sm font-serif font-semibold text-stone-900 mt-0.5">
                          {selectedProduct.carbonSaved}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeModalTab === 'materials' && (
                  <div className="space-y-3">
                    <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                      Verified Ethical Composition
                    </div>
                    <ul className="space-y-2">
                      {selectedProduct.materials.map((mat, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check size={14} className="text-[#187E91] stroke-[2.5]" />
                          <span>{mat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeModalTab === 'specs' && (
                  <div className="grid grid-cols-2 gap-3">
                    {selectedProduct.specifications.map((spec, i) => (
                      <div key={i} className="p-3 rounded-xl bg-stone-50 border border-stone-200/60">
                        <div className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">
                          {spec.label}
                        </div>
                        <div className="text-xs font-semibold text-stone-900 mt-0.5">
                          {spec.value}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-stone-200">
                <div className="text-2xl font-serif font-normal text-stone-900">
                  ₹{selectedProduct.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </div>
                <Button
                  variant="default"
                  onClick={() => {
                    handleAddToCart(selectedProduct);
                    setSelectedProduct(null);
                  }}
                  className="gap-2"
                >
                  <ShoppingCart size={15} />
                  <span>Add to Bag</span>
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
