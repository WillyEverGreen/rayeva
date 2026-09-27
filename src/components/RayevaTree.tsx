import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ShieldCheck,
  Ban,
  Recycle,
  Sparkles,
  TrendingUp,
  HeartHandshake,
  Footprints,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { usePageTransition } from '../context/TransitionContext';

gsap.registerPlugin(ScrollTrigger);

export interface TreeNode {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  metric: string;
  metricLabel: string;
  icon: React.ElementType;
  accentColor: string;
  cx: number;
  cy: number;
  r: number;
}

// Harmonious botanical palette: lush forest greens + warm artisan terracotta/amber (NO clashing blue/cyan)
const TREE_NODES: TreeNode[] = [
  {
    id: 'verify',
    badge: 'Verification',
    title: 'Products Verified',
    subtitle: 'Audit-Backed Authenticity',
    description: 'We validate sustainability claims so every choice is backed by trust. Multi-point laboratory audits check material purity, chemical safety, and ethical provenance before any product enters our marketplace.',
    metric: '100%',
    metricLabel: 'Lab Audited Brands',
    icon: ShieldCheck,
    accentColor: '#10B981', // Pure Vibrant Emerald
    cx: 500,
    cy: 135,
    r: 45,
  },
  {
    id: 'plastic',
    badge: 'Plastic Free',
    title: 'Plastic-Free Living',
    subtitle: 'Circular Material Alternatives',
    description: 'Championing circular practices to eliminate single-use plastic dependency. From home-compostable mailers to molded bamboo fiber, we ensure zero plastic enters landfills or marine ecosystems.',
    metric: '18.4M+',
    metricLabel: 'Plastic Units Diverted',
    icon: Ban,
    accentColor: '#059669', // Deep Forest Jade
    cx: 245,
    cy: 245,
    r: 43,
  },
  {
    id: 'recycle',
    badge: 'Recycle',
    title: 'Closed-Loop Recycling',
    subtitle: 'Zero-Waste Resource Loop',
    description: 'Transforming post-consumer and industrial materials into fresh resources. We coordinate certified reverse logistics to reclaim packaging, textiles, and glass for secondary manufacturing cycles.',
    metric: '94.2%',
    metricLabel: 'Material Recovery Rate',
    icon: Recycle,
    accentColor: '#16A34A', // Vibrant Leaf Green
    cx: 755,
    cy: 235,
    r: 43,
  },
  {
    id: 'upcycle',
    badge: 'Upcycle',
    title: 'Creative Upcycling',
    subtitle: 'Giving Waste a Second Life',
    description: 'Turning discarded textiles, agricultural remnants, and coconut shells into high-value design goods. We celebrate artisan craftsmanship that turns waste streams into heirloom-quality everyday essentials.',
    metric: '450+',
    metricLabel: 'Upcycled Artisanal SKUs',
    icon: Sparkles,
    accentColor: '#D97706', // Warm Artisan Amber
    cx: 155,
    cy: 420,
    r: 41,
  },
  {
    id: 'carbon',
    badge: 'Carbon Tracking',
    title: 'Transparent Carbon Accounting',
    subtitle: 'Quantified Climate Accountability',
    description: 'Real-time telemetry measuring lifecycle carbon footprint reductions across every product swap. Certified statutory reports aligned with SEBI BRSR Core guidelines for corporate and personal transparency.',
    metric: '0 Greenwash',
    metricLabel: 'SEBI Audited Standard',
    icon: Footprints,
    accentColor: '#047857', // Deep Pine Green
    cx: 845,
    cy: 410,
    r: 41,
  },
  {
    id: 'scaling',
    badge: 'Scaling Practices',
    title: 'Scaling Circular Practices',
    subtitle: 'Expanding National Impact',
    description: 'Accelerating the transition to sustainable models across cities and commercial value chains. Mentoring zero-waste manufacturers, standardizing clean packaging, and building distributed infrastructure.',
    metric: '30+ Cities',
    metricLabel: 'Pan-India Active Hubs',
    icon: TrendingUp,
    accentColor: '#15803D', // Flourishing Meadow Green
    cx: 315,
    cy: 590,
    r: 39,
  },
  {
    id: 'ethical',
    badge: 'Ethical Enterprises',
    title: 'Supporting Ethical Enterprises',
    subtitle: 'Empowering Conscious Producers',
    description: 'Partnering exclusively with businesses committed to fair wages, safe workplaces, and community uplift. Verifying equitable supply chains that preserve traditional artisan lineages across India.',
    metric: '2,400+',
    metricLabel: 'Artisans Supported',
    icon: HeartHandshake,
    accentColor: '#C27D56', // Warm Earth Terracotta
    cx: 670,
    cy: 580,
    r: 39,
  },
];

interface RayevaTreeProps {
  selectedNodeId?: string;
  onSelectNode?: (nodeId: string) => void;
}

export default function RayevaTree({ selectedNodeId, onSelectNode }: RayevaTreeProps) {
  const [activeNode, setActiveNode] = useState<TreeNode>(TREE_NODES[0]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const { navigate } = usePageTransition();

  // Sync external selection from platform cards
  useEffect(() => {
    if (selectedNodeId) {
      const match = TREE_NODES.find((n) => n.id === selectedNodeId);
      if (match && match.id !== activeNode.id) {
        setActiveNode(match);
      }
    }
  }, [selectedNodeId, activeNode.id]);

  const handleSelectNode = (node: TreeNode) => {
    setActiveNode(node);
    if (onSelectNode) {
      onSelectNode(node.id);
    }
  };

  // Smooth card transition
  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 12, scale: 0.99 },
        { opacity: 1, y: 0, scale: 1, duration: 0.32, ease: 'power2.out' }
      );
    }
  }, [activeNode]);

  const ActiveIcon = activeNode.icon;

  return (
    <div
      ref={sectionRef}
      id="sustainability-tree"
      className="relative w-full select-none pt-4 sm:pt-6"
    >
      {/* Section Header */}
      <div className="mb-8 sm:mb-10 max-w-2xl">
        <span className="text-xs font-bold text-[#187E91] uppercase tracking-wider block">
          Interactive Regenerative Ecosystem
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-stone-900 mt-1">
          The Living Sustainability Tree
        </h3>
        <p className="mt-2 text-stone-600 text-xs sm:text-sm">
          Rayeva closes the loop of conscious consumption. Click on any branch or node to explore how each verified step drives measurable circular transformation.
        </p>
      </div>

      {/* ================= UNIFIED BENTO CONTAINER ================= */}
      <div className="relative w-full bg-[#FFFDF9] rounded-[32px] sm:rounded-[36px] border border-stone-200/90 overflow-hidden">
        
        {/* Subtle decorative leaf in corner of the unified box */}
        <img
          src="/leaves/leaf-01.png"
          alt=""
          className="absolute -top-7 -right-7 w-24 sm:w-28 opacity-70 select-none pointer-events-none -rotate-12"
        />
        <img
          src="/leaves/leaf-02.png"
          alt=""
          className="absolute -bottom-10 -left-10 w-32 opacity-[0.06] select-none pointer-events-none rotate-45"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          
          {/* ================= LEFT (7 COLS): SCULPTED BOTANICAL LIVING TREE ================= */}
          <div className="lg:col-span-7 p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center relative">
            
            {/* Ambient Radial Canopy Glow */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-emerald-400/10 rounded-full blur-[110px] pointer-events-none" />

            {/* SVG Canvas (Harmonious Botanical Green, No Dislocation) */}
            <div className="relative w-full aspect-[1/0.84] max-w-[760px] mx-auto">
              <svg
                viewBox="0 0 1000 840"
                className="w-full h-full select-none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Sculpted Woodgrain Gradient */}
                  <linearGradient id="barkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3E2718" />
                    <stop offset="45%" stopColor="#5C3B24" />
                    <stop offset="75%" stopColor="#4A2E1C" />
                    <stop offset="100%" stopColor="#2A180E" />
                  </linearGradient>

                  {/* Highlight Timber Grain */}
                  <linearGradient id="barkHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#8A5A36" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#6E4426" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#3E2718" stopOpacity="0.1" />
                  </linearGradient>

                  {/* LUSH BOTANICAL FOLIAGE GRADIENTS */}
                  <radialGradient id="foliageGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#4ADE80" stopOpacity="0.35" />
                    <stop offset="60%" stopColor="#22C55E" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#15803D" stopOpacity="0" />
                  </radialGradient>

                  <radialGradient id="foliageDeep" cx="40%" cy="35%" r="65%">
                    <stop offset="0%" stopColor="#16A34A" />
                    <stop offset="50%" stopColor="#15803D" />
                    <stop offset="85%" stopColor="#166534" />
                    <stop offset="100%" stopColor="#14532D" />
                  </radialGradient>

                  <radialGradient id="foliageEmerald" cx="45%" cy="30%" r="60%">
                    <stop offset="0%" stopColor="#86EFAC" stopOpacity="0.8" />
                    <stop offset="40%" stopColor="#4ADE80" />
                    <stop offset="75%" stopColor="#22C55E" />
                    <stop offset="100%" stopColor="#16A34A" />
                  </radialGradient>

                  {/* Soft Drop Shadows for Foliage */}
                  <filter id="softCanopyShadow" x="-15%" y="-15%" width="130%" height="130%">
                    <feDropShadow dx="0" dy="10" stdDeviation="14" floodColor="#14532D" floodOpacity="0.16" />
                  </filter>
                </defs>

                {/* ---------------- 1. BOTANICAL CANOPY BACKGROUND CLUSTERS ---------------- */}
                <g className="canopy-back-layer" filter="url(#softCanopyShadow)">
                  {/* Central Upper Dome */}
                  <ellipse cx="500" cy="175" rx="205" ry="130" fill="url(#foliageDeep)" opacity="0.96" />
                  <ellipse cx="500" cy="165" rx="175" ry="105" fill="url(#foliageEmerald)" opacity="0.5" />

                  {/* Left Canopy Lobes */}
                  <circle cx="270" cy="265" r="150" fill="url(#foliageDeep)" opacity="0.94" />
                  <circle cx="250" cy="245" r="120" fill="url(#foliageEmerald)" opacity="0.55" />
                  <circle cx="160" cy="420" r="125" fill="url(#foliageDeep)" opacity="0.92" />
                  <circle cx="150" cy="410" r="95" fill="url(#foliageEmerald)" opacity="0.45" />

                  {/* Right Canopy Lobes */}
                  <circle cx="730" cy="255" r="150" fill="url(#foliageDeep)" opacity="0.94" />
                  <circle cx="750" cy="235" r="120" fill="url(#foliageEmerald)" opacity="0.55" />
                  <circle cx="840" cy="410" r="125" fill="url(#foliageDeep)" opacity="0.92" />
                  <circle cx="850" cy="400" r="95" fill="url(#foliageEmerald)" opacity="0.45" />

                  {/* Lower Tier Canopy Nodes */}
                  <circle cx="320" cy="590" r="105" fill="url(#foliageDeep)" opacity="0.9" />
                  <circle cx="320" cy="580" r="80" fill="url(#foliageEmerald)" opacity="0.4" />
                  <circle cx="670" cy="580" r="105" fill="url(#foliageDeep)" opacity="0.9" />
                  <circle cx="670" cy="570" r="80" fill="url(#foliageEmerald)" opacity="0.4" />
                </g>

                {/* ---------------- 2. AMBIENT FOLIAGE RADIANT HALOS ---------------- */}
                <g className="canopy-glow-layer">
                  <circle cx="500" cy="135" r="120" fill="url(#foliageGlow)" />
                  <circle cx="245" cy="245" r="100" fill="url(#foliageGlow)" />
                  <circle cx="755" cy="235" r="100" fill="url(#foliageGlow)" />
                  <circle cx="155" cy="420" r="90" fill="url(#foliageGlow)" />
                  <circle cx="845" cy="410" r="90" fill="url(#foliageGlow)" />
                  <circle cx="315" cy="590" r="80" fill="url(#foliageGlow)" />
                  <circle cx="670" cy="580" r="80" fill="url(#foliageGlow)" />
                </g>

                {/* ---------------- 3. SCULPTED TIMBER TRUNK & BRANCH SYSTEM ---------------- */}
                <g className="sculpted-timber-trunk">
                  {/* Flared Organic Root Base */}
                  <path
                    d="M340,785 C420,775 440,730 450,680 L550,680 C560,730 580,775 660,785 C580,795 420,795 340,785 Z"
                    fill="url(#barkGradient)"
                  />

                  {/* Main Central Trunk */}
                  <path
                    d="M445,680 C440,560 455,440 478,300 L522,300 C545,440 560,560 555,680 Z"
                    fill="url(#barkGradient)"
                  />

                  {/* Branch 1: Top Central Vertical Leader */}
                  <path
                    d="M478,320 C484,250 490,190 494,140 L506,140 C510,190 516,250 522,320 Z"
                    fill="url(#barkGradient)"
                  />

                  {/* Branch 2: Upper Left Branch */}
                  <path
                    d="M472,440 C425,380 335,320 250,250 L240,240 C340,300 445,380 482,420 Z"
                    fill="url(#barkGradient)"
                  />

                  {/* Branch 3: Upper Right Branch */}
                  <path
                    d="M528,440 C575,380 665,320 750,240 L760,250 C660,300 555,380 518,420 Z"
                    fill="url(#barkGradient)"
                  />

                  {/* Branch 4: Mid Left Horizontal Branch */}
                  <path
                    d="M462,520 C375,490 270,460 160,425 L150,415 C270,430 385,470 458,500 Z"
                    fill="url(#barkGradient)"
                  />

                  {/* Branch 5: Mid Right Horizontal Branch */}
                  <path
                    d="M538,520 C625,490 730,460 840,415 L850,425 C730,430 615,470 542,500 Z"
                    fill="url(#barkGradient)"
                  />

                  {/* Branch 6: Lower Left Limb */}
                  <path
                    d="M452,595 C400,595 360,590 320,590 L310,585 C360,580 400,580 452,580 Z"
                    fill="url(#barkGradient)"
                    stroke="#3E2718"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />

                  {/* Branch 7: Lower Right Limb */}
                  <path
                    d="M548,595 C600,595 640,590 665,585 L675,590 C640,580 600,580 548,580 Z"
                    fill="url(#barkGradient)"
                    stroke="#3E2718"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />

                  {/* Wood Grain Texture Grooves */}
                  <path
                    d="M490,740 C480,660 485,580 495,500"
                    stroke="url(#barkHighlight)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    opacity="0.7"
                    fill="none"
                  />
                  <path
                    d="M510,740 C518,660 512,580 505,500"
                    stroke="url(#barkHighlight)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    opacity="0.7"
                    fill="none"
                  />
                  <path
                    d="M485,730 C475,650 472,570 485,500"
                    stroke="#744A29"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    opacity="0.65"
                    fill="none"
                  />
                  <path
                    d="M515,730 C522,650 520,570 512,500"
                    stroke="#744A29"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    opacity="0.65"
                    fill="none"
                  />
                </g>

                {/* ---------------- 4. INTERACTIVE NODES (NO DISLOCATIONS, HARMONIOUS BOTANICAL COLORS) ---------------- */}
                <g className="interactive-nodes">
                  {TREE_NODES.map((node) => {
                    const Icon = node.icon;
                    const isActive = activeNode.id === node.id;

                    return (
                      <g
                        key={node.id}
                        onClick={() => handleSelectNode(node)}
                        className="cursor-pointer group"
                      >
                        {/* Stable Outer Collar */}
                        <circle
                          cx={node.cx}
                          cy={node.cy}
                          r={node.r + 3}
                          fill="#081C14"
                          stroke={isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.4)'}
                          strokeWidth={isActive ? '2.5' : '1.5'}
                          className="transition-colors duration-200"
                        />

                        {/* Inner Node Core in Harmonious Botanical / Earth Accent */}
                        <circle
                          cx={node.cx}
                          cy={node.cy}
                          r={node.r}
                          fill={node.accentColor}
                          className="transition-all duration-200 group-hover:brightness-110"
                        />

                        {/* Big Readable White Icon inside Node Core */}
                        <foreignObject
                          x={node.cx - 23}
                          y={node.cy - 23}
                          width="46"
                          height="46"
                          className="pointer-events-none"
                        >
                          <div className="w-full h-full flex items-center justify-center text-white">
                            <Icon size={26} className="stroke-[2.5]" />
                          </div>
                        </foreignObject>

                        {/* Big Readable Text Badge */}
                        <g
                          transform={`translate(${node.cx}, ${
                            node.cy + (node.cy > 520 ? -node.r - 28 : node.r + 32)
                          })`}
                        >
                          <rect
                            x="-82"
                            y="-19"
                            width="164"
                            height="38"
                            rx="19"
                            fill="rgba(8, 28, 20, 0.96)"
                            stroke={isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.35)'}
                            strokeWidth={isActive ? '2' : '1'}
                            className="drop-shadow-md transition-colors duration-200 group-hover:stroke-white"
                          />
                          <text
                            x="0"
                            y="6"
                            textAnchor="middle"
                            fontSize="14.5"
                            fontWeight="800"
                            fontFamily="sans-serif"
                            fill="#FFFFFF"
                            className="pointer-events-none select-none tracking-tight"
                          >
                            {node.badge}
                          </text>
                        </g>
                      </g>
                    );
                  })}
                </g>
              </svg>
            </div>
          </div>

          {/* ================= RIGHT (5 COLS): ACTIVE LOOP INSPECTION PANEL ================= */}
          <div className="lg:col-span-5 p-5 sm:p-10 lg:p-11 flex flex-col justify-center bg-[#FAF8F3]/50 lg:bg-transparent">
            <div ref={cardRef} className="space-y-6">
              
              {/* Top Badge & Metric */}
              <div className="flex items-center justify-between gap-4">
                <span
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase"
                  style={{
                    backgroundColor: `${activeNode.accentColor}18`,
                    color: activeNode.accentColor,
                  }}
                >
                  <CheckCircle2 size={14} className="stroke-[2.5]" />
                  <span>{activeNode.badge}</span>
                </span>

                <div className="text-right">
                  <div className="text-3xl sm:text-4xl font-serif font-extrabold text-stone-900 leading-none">
                    {activeNode.metric}
                  </div>
                  <div className="text-[11px] font-bold tracking-wider uppercase text-stone-500 mt-1">
                    {activeNode.metricLabel}
                  </div>
                </div>
              </div>

              {/* Icon + Title Header */}
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-xs transition-transform duration-300"
                  style={{ backgroundColor: activeNode.accentColor }}
                >
                  <ActiveIcon size={28} className="stroke-[2.2]" />
                </div>

                <div>
                  <h4 className="font-serif text-2xl sm:text-3xl font-semibold text-stone-900 leading-tight">
                    {activeNode.title}
                  </h4>
                  <p className="text-xs sm:text-sm font-medium mt-0.5" style={{ color: activeNode.accentColor }}>
                    {activeNode.subtitle}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed font-normal">
                {activeNode.description}
              </p>

              {/* Dual Verified Pillars */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-stone-100">
                <div className="p-3.5 rounded-xl bg-white/90 border border-stone-200/70">
                  <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block mb-1">
                    Provenance
                  </span>
                  <span className="text-xs font-bold text-stone-800">
                    Third-Party Certified
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/90 border border-stone-200/70">
                  <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block mb-1">
                    Reverse Logistics
                  </span>
                  <span className="text-xs font-bold text-stone-800">
                    Doorstep Reclaim
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={() => navigate('#categories', { title: activeNode.title })}
                className="w-full py-3.5 px-6 rounded-2xl text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-300 hover:opacity-95 cursor-pointer shadow-xs active:scale-[0.99]"
                style={{ backgroundColor: activeNode.accentColor }}
              >
                <span>Explore verified products in this loop</span>
                <ArrowRight size={15} className="stroke-[2.5]" />
              </button>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
