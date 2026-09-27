import React, { useState, useMemo } from 'react';
import {
  Car,
  Zap,
  Flame,
  Utensils,
  ShoppingBag,
  TreePine,
  Plane,
  Sun,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Share2,
  Download,
  RotateCcw,
  Sparkles,
  Check,
  AlertTriangle,
  Leaf,
  Layers,
  ChevronRight,
  TrendingDown,
  Info
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { usePageTransition } from '../context/TransitionContext';
import { BotanicalVineDivider } from '../components/BotanicalDecorations';
import AmbientSporeCanvas from '../components/canvas/AmbientSporeCanvas';

// MoEFCC, CEA v19, and Oxford Lifecycle Dietary Benchmarks
const BENCHMARKS = {
  INDIA_AVERAGE: 1900, // kg CO2e / year (1.90 tonnes)
  GLOBAL_AVERAGE: 4700, // kg CO2e / year (4.70 tonnes)
  PARIS_2030_TARGET: 2000, // kg CO2e / year (2.00 tonnes)
  TREE_ABSORPTION_KG_YEAR: 21.77, // EPA / Arbor Day Foundation baseline
};

const EMISSION_FACTORS = {
  MOBILITY: {
    METRO: { name: 'Metro / Electric Train', factor: 0.028, icon: 'train' },
    EV_2W: { name: 'Electric 2-Wheeler', factor: 0.022, icon: 'bike-ev' },
    PETROL_2W: { name: 'Petrol Motorcycle / Scooter', factor: 0.048, icon: 'bike-petrol' },
    AUTO_RICKSHAW: { name: 'Auto-Rickshaw / Cab', factor: 0.075, icon: 'auto' },
    CAR_PETROL: { name: 'Petrol / Diesel Car', factor: 0.178, icon: 'car-petrol' },
    CAR_EV: { name: 'Electric Car (EV)', factor: 0.065, icon: 'car-ev' },
  },
  FLIGHT_DOMESTIC_ROUNDTRIP: 220, // kg CO2e per domestic flight
  GRID_ELECTRICITY_KWH: 0.716, // Central Electricity Authority (CEA) India v19
  INR_PER_KWH_AVG: 7.5, // Indian avg domestic tariff
  LPG_CYLINDER: 42.5, // 14.2 kg LPG cylinder footprint
  DIET: {
    VEGAN: { name: 'Vegan (100% Plant-Based)', factor: 950, desc: 'Zero animal agriculture footprint' },
    LACTO_VEGETARIAN: { name: 'Lacto-Vegetarian', factor: 1250, desc: 'Standard Indian dairy-rich vegetarian' },
    FLEXITARIAN: { name: 'Flexitarian', factor: 1650, desc: 'Conscious meat 1-2 times weekly' },
    HEAVY_MEAT: { name: 'Daily Meat / Poultry', factor: 2450, desc: 'Non-vegetarian omnivorous lifestyle' },
  },
  FOOD_DELIVERY_TRIP: 1.2, // Single-use packaging + 2W dispatch
  PLASTIC: {
    BAG: 0.008,
    PET_BOTTLE: 0.035,
  },
};

// Preset Archetypes for 1-Click Exploration
const PERSONA_PRESETS = [
  {
    id: 'bangalore-pro',
    name: 'Bengaluru Tech Pro',
    tagline: 'Metro commute, apartment dweller, flexitarian',
    values: {
      commuteKmDaily: 18,
      commuteMode: 'METRO',
      annualFlights: 2,
      householdMembers: 2,
      monthlyElectricityBillInr: 2200,
      lpgCylindersYear: 4,
      dietType: 'FLEXITARIAN',
      onlineDeliveriesPerMonth: 8,
      plasticBottlesMonth: 6,
      plasticBagsMonth: 8,
      hasSolarRooftop: false,
    },
  },
  {
    id: 'urban-car',
    name: 'Daily Urban Commuter',
    tagline: 'Car transit, high AC usage, regular dining out',
    values: {
      commuteKmDaily: 28,
      commuteMode: 'CAR_PETROL',
      annualFlights: 4,
      householdMembers: 3,
      monthlyElectricityBillInr: 4500,
      lpgCylindersYear: 8,
      dietType: 'HEAVY_MEAT',
      onlineDeliveriesPerMonth: 16,
      plasticBottlesMonth: 22,
      plasticBagsMonth: 25,
      hasSolarRooftop: false,
    },
  },
  {
    id: 'eco-student',
    name: 'Eco-Conscious Student',
    tagline: 'EV transit, hostel sharing, vegetarian',
    values: {
      commuteKmDaily: 8,
      commuteMode: 'EV_2W',
      annualFlights: 0,
      householdMembers: 4,
      monthlyElectricityBillInr: 1200,
      lpgCylindersYear: 3,
      dietType: 'LACTO_VEGETARIAN',
      onlineDeliveriesPerMonth: 3,
      plasticBottlesMonth: 3,
      plasticBagsMonth: 5,
      hasSolarRooftop: false,
    },
  },
  {
    id: 'zero-waste',
    name: 'Zero-Waste Trailblazer',
    tagline: 'Clean transit, solar powered, 100% plant-based',
    values: {
      commuteKmDaily: 10,
      commuteMode: 'METRO',
      annualFlights: 0,
      householdMembers: 3,
      monthlyElectricityBillInr: 1800,
      lpgCylindersYear: 2,
      dietType: 'VEGAN',
      onlineDeliveriesPerMonth: 1,
      plasticBottlesMonth: 0,
      plasticBagsMonth: 1,
      hasSolarRooftop: true,
    },
  },
];

export default function CalculatorPage() {
  const { navigate } = usePageTransition();

  // State
  const [commuteKmDaily, setCommuteKmDaily] = useState(20);
  const [commuteMode, setCommuteMode] = useState<keyof typeof EMISSION_FACTORS.MOBILITY>('CAR_PETROL');
  const [annualFlights, setAnnualFlights] = useState(2);
  const [householdMembers, setHouseholdMembers] = useState(3);
  const [monthlyElectricityBillInr, setMonthlyElectricityBillInr] = useState(2200);
  const [lpgCylindersYear, setLpgCylindersYear] = useState(6);
  const [dietType, setDietType] = useState<keyof typeof EMISSION_FACTORS.DIET>('FLEXITARIAN');
  const [onlineDeliveriesPerMonth, setOnlineDeliveriesPerMonth] = useState(6);
  const [plasticBottlesMonth, setPlasticBottlesMonth] = useState(12);
  const [plasticBagsMonth, setPlasticBagsMonth] = useState(15);
  const [hasSolarRooftop, setHasSolarRooftop] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);
  const [activeTab, setActiveTab] = useState<'mobility' | 'energy' | 'diet' | 'waste'>('mobility');

  // Load Persona Preset
  const applyPreset = (presetId: string) => {
    const preset = PERSONA_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    const v = preset.values;
    setCommuteKmDaily(v.commuteKmDaily);
    setCommuteMode(v.commuteMode as any);
    setAnnualFlights(v.annualFlights);
    setHouseholdMembers(v.householdMembers);
    setMonthlyElectricityBillInr(v.monthlyElectricityBillInr);
    setLpgCylindersYear(v.lpgCylindersYear);
    setDietType(v.dietType as any);
    setOnlineDeliveriesPerMonth(v.onlineDeliveriesPerMonth);
    setPlasticBottlesMonth(v.plasticBottlesMonth);
    setPlasticBagsMonth(v.plasticBagsMonth);
    setHasSolarRooftop(v.hasSolarRooftop);
  };

  // Reset to Baseline
  const resetToDefault = () => {
    applyPreset('bangalore-pro');
  };

  // Impact Calculations
  const calculations = useMemo(() => {
    const members = Math.max(1, householdMembers);

    // 1. Mobility (300 working days)
    const modeConfig = EMISSION_FACTORS.MOBILITY[commuteMode] || EMISSION_FACTORS.MOBILITY.METRO;
    const commuteEmissions = Math.max(0, commuteKmDaily) * modeConfig.factor * 300;
    const flightEmissions = Math.max(0, annualFlights) * EMISSION_FACTORS.FLIGHT_DOMESTIC_ROUNDTRIP;
    const totalMobility = commuteEmissions + flightEmissions;

    // 2. Household Energy (Per Capita)
    const monthlyKwh = Math.max(0, monthlyElectricityBillInr) / EMISSION_FACTORS.INR_PER_KWH_AVG;
    let annualElectricityEmissions = (monthlyKwh * EMISSION_FACTORS.GRID_ELECTRICITY_KWH * 12) / members;
    if (hasSolarRooftop) {
      annualElectricityEmissions *= 0.25; // 75% clean energy offset
    }
    const lpgEmissions = (Math.max(0, lpgCylindersYear) * EMISSION_FACTORS.LPG_CYLINDER) / members;
    const totalEnergy = annualElectricityEmissions + lpgEmissions;

    // 3. Diet & Deliveries
    const dietBaseline = EMISSION_FACTORS.DIET[dietType]?.factor || 1250;
    const deliveryEmissions = Math.max(0, onlineDeliveriesPerMonth) * EMISSION_FACTORS.FOOD_DELIVERY_TRIP * 12;
    const totalDiet = dietBaseline + deliveryEmissions;

    // 4. Plastic & Single-Use Packaging
    const annualBottles = Math.max(0, plasticBottlesMonth) * 12;
    const annualBags = Math.max(0, plasticBagsMonth) * 12;
    const physicalPlasticKg = annualBottles * 0.02 + annualBags * 0.006;
    const plasticEmissions =
      annualBottles * EMISSION_FACTORS.PLASTIC.PET_BOTTLE + annualBags * EMISSION_FACTORS.PLASTIC.BAG;

    // Totals
    const totalGrossKg = Math.round(totalMobility + totalEnergy + totalDiet + plasticEmissions);
    const totalTonnes = +(totalGrossKg / 1000).toFixed(2);
    const treesNeeded = Math.ceil(totalGrossKg / BENCHMARKS.TREE_ABSORPTION_KG_YEAR);
    const vsIndiaPercent = Math.round(((totalGrossKg - BENCHMARKS.INDIA_AVERAGE) / BENCHMARKS.INDIA_AVERAGE) * 100);

    // Percentage splits
    const mobPct = Math.round((totalMobility / totalGrossKg) * 100) || 0;
    const nrgPct = Math.round((totalEnergy / totalGrossKg) * 100) || 0;
    const dietPct = Math.round((totalDiet / totalGrossKg) * 100) || 0;
    const wastePct = Math.max(1, 100 - (mobPct + nrgPct + dietPct));

    // Climate Tier Status
    let statusTier: 'champion' | 'moderate' | 'high';
    let statusLabel: string;
    let statusColor: string;
    let statusBg: string;

    if (totalGrossKg <= BENCHMARKS.PARIS_2030_TARGET) {
      statusTier = 'champion';
      statusLabel = 'Climate Champion (Paris 2030 Aligned)';
      statusColor = '#10B981';
      statusBg = 'bg-emerald-50 text-emerald-800 border-emerald-300';
    } else if (totalGrossKg <= 3500) {
      statusTier = 'moderate';
      statusLabel = 'Moderate Footprint (Near National Avg)';
      statusColor = '#F59E0B';
      statusBg = 'bg-amber-50 text-amber-800 border-amber-300';
    } else {
      statusTier = 'high';
      statusLabel = 'High Carbon Intensity (Action Recommended)';
      statusColor = '#E5383B';
      statusBg = 'bg-rose-50 text-rose-800 border-rose-300';
    }

    // Dynamic AI Recommendations
    const recs = [];

    if (commuteMode === 'CAR_PETROL') {
      const savings = Math.round((0.178 - 0.028) * commuteKmDaily * 300 * 0.5);
      recs.push({
        id: 'rec-metro',
        category: 'Mobility Habit',
        action: 'Shift 2 commute days weekly from personal car to Metro / Electric Train',
        savingsKg: savings,
        percentReduction: +((savings / totalGrossKg) * 100).toFixed(1),
        context: 'Cuts 50% of peak-traffic exhaust emissions while saving fuel and parking costs.',
        productName: 'Rayeva Bamboo Travel Commute Kit & Insulated Tumbler',
        productPrice: '₹ 1,299',
        productLink: '#starter-kit',
      });
    } else if (commuteMode === 'PETROL_2W' && commuteKmDaily > 12) {
      const savings = Math.round((0.048 - 0.022) * commuteKmDaily * 300);
      recs.push({
        id: 'rec-ev',
        category: 'Clean Transit',
        action: 'Transition daily intra-city transit to an Electric 2-Wheeler (EV)',
        savingsKg: savings,
        percentReduction: +((savings / totalGrossKg) * 100).toFixed(1),
        context: 'Reduces per-km tailpipe emissions by over 54% using localized renewable energy.',
        productName: 'Clean Commute Certified Directory',
        productPrice: 'Free Guide',
        productLink: '#categories',
      });
    }

    if (dietType === 'HEAVY_MEAT') {
      recs.push({
        id: 'rec-diet',
        category: 'Conscious Nutrition',
        action: 'Adopt 2 plant-powered "Green Days" weekly (Flexitarian transition)',
        savingsKg: 800,
        percentReduction: +((800 / totalGrossKg) * 100).toFixed(1),
        context: 'Reduces methane, transport, and feed crop impact by 32% across your annual diet.',
        productName: 'Conscious Pantry Cold-Pressed Oils & Organic Pulses',
        productPrice: '₹ 849',
        productLink: '#trending',
      });
    }

    if (plasticBottlesMonth > 5) {
      const unitsSaved = plasticBottlesMonth * 12;
      const savingsKg = Math.round(unitsSaved * 0.035 + 16);
      recs.push({
        id: 'rec-plastic',
        category: 'Zero-Waste Swap',
        action: 'Replace single-use beverage bottles with copper hydration bottle and solid refills',
        savingsKg: savingsKg,
        percentReduction: +((savingsKg / totalGrossKg) * 100).toFixed(1),
        context: `Diverts ${unitsSaved} single-use plastic bottles from Indian landfills and oceans each year.`,
        productName: 'Rayeva Pure Copper Bottle & Probiotic Solid Shampoo Bar',
        productPrice: '₹ 1,149',
        productLink: '#starter-kit',
      });
    }

    if (!hasSolarRooftop) {
      recs.push({
        id: 'rec-energy',
        category: 'Domestic Efficiency',
        action: 'Calibrate AC to 24°C and switch primary household lighting to BEE 5-Star LEDs',
        savingsKg: 280,
        percentReduction: +((280 / totalGrossKg) * 100).toFixed(1),
        context: 'Every 1°C increase in AC set-point lowers compressor power draw by 6% in Indian climates.',
        productName: 'Rayeva Home Energy Audit Checklist & Smart Plug',
        productPrice: '₹ 999',
        productLink: '#categories',
      });
    }

    return {
      totalGrossKg,
      totalTonnes,
      treesNeeded,
      vsIndiaPercent,
      physicalPlasticKg: +physicalPlasticKg.toFixed(1),
      statusTier,
      statusLabel,
      statusColor,
      statusBg,
      breakdown: {
        mobility: { kg: Math.round(totalMobility), pct: mobPct },
        energy: { kg: Math.round(totalEnergy), pct: nrgPct },
        diet: { kg: Math.round(totalDiet), pct: dietPct },
        waste: { kg: Math.round(plasticEmissions), pct: wastePct },
      },
      recs: recs.slice(0, 3),
    };
  }, [
    commuteKmDaily,
    commuteMode,
    annualFlights,
    householdMembers,
    monthlyElectricityBillInr,
    lpgCylindersYear,
    dietType,
    onlineDeliveriesPerMonth,
    plasticBottlesMonth,
    plasticBagsMonth,
    hasSolarRooftop,
  ]);

  // Copy shareable summary
  const handleCopySummary = () => {
    const text = `🌱 My Rayeva Carbon Footprint Audit:\n• Total Footprint: ${calculations.totalTonnes} tonnes CO2e/year\n• Status: ${calculations.statusLabel}\n• Comparison: ${calculations.vsIndiaPercent >= 0 ? '+' : ''}${calculations.vsIndiaPercent}% vs Indian Average (1.9t)\n• Trees to Offset: ${calculations.treesNeeded} mature trees\n• Plastic Waste: ${calculations.physicalPlasticKg} kg/year\n\nCalculate yours on Rayeva Sustainability Engine: https://rayeva.com/calculator`;
    navigator.clipboard.writeText(text);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 3000);
  };

  // Download personal report
  const handleDownloadReport = () => {
    const content = `RAYEVA INDIVIDUAL CLIMATE AUDIT & ESG REPORT
==================================================
Date: ${new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
Benchmark Standard: MoEFCC & Central Electricity Authority (CEA v19)
Methodology: Oxford Lifecycle Dietary Assessment (Poore & Nemecek)

1. EXECUTIVE FOOTPRINT SUMMARY
--------------------------------------------------
Annual Gross Emissions: ${calculations.totalTonnes} tonnes CO2e / year (${calculations.totalGrossKg.toLocaleString()} kg)
National Benchmark: 1.90 tonnes CO2e (India per capita average)
Paris 2030 Target: < 2.00 tonnes CO2e
Variance vs India Avg: ${calculations.vsIndiaPercent >= 0 ? '+' : ''}${calculations.vsIndiaPercent}%
Climate Status: ${calculations.statusLabel}
Mature Trees Needed: ${calculations.treesNeeded} trees (sequestration baseline: 21.77 kg/yr)
Annual Plastic Mass: ${calculations.physicalPlasticKg} kg single-use polymers

2. EMISSIONS BREAKDOWN BY PILLAR
--------------------------------------------------
* Mobility & Transit: ${calculations.breakdown.mobility.kg} kg CO2e (${calculations.breakdown.mobility.pct}%)
  - Daily commute: ${commuteKmDaily} km via ${EMISSION_FACTORS.MOBILITY[commuteMode].name}
  - Domestic flights: ${annualFlights} flights/year
* Domestic Energy: ${calculations.breakdown.energy.kg} kg CO2e (${calculations.breakdown.energy.pct}%)
  - Monthly bill: INR ${monthlyElectricityBillInr.toLocaleString()} shared among ${householdMembers} members
  - LPG Cylinders: ${lpgCylindersYear} / year
  - Rooftop Solar: ${hasSolarRooftop ? 'Active (75% offset applied)' : 'None'}
* Dietary Patterns: ${calculations.breakdown.diet.kg} kg CO2e (${calculations.breakdown.diet.pct}%)
  - Diet type: ${EMISSION_FACTORS.DIET[dietType].name}
  - Food deliveries: ${onlineDeliveriesPerMonth} orders / month
* Packaging & Waste: ${calculations.breakdown.waste.kg} kg CO2e (${calculations.breakdown.waste.pct}%)
  - Single-use PET bottles: ${plasticBottlesMonth} / month
  - Single-use carry bags: ${plasticBagsMonth} / month

3. AI MICRO-HABIT RECOMMENDATIONS
--------------------------------------------------
${calculations.recs
  .map(
    (r, i) =>
      `${i + 1}. [${r.category}] ${r.action}\n   Annual Savings: -${r.savingsKg} kg CO2e (-${r.percentReduction}% overall drop)\n   Rayeva Solution: ${r.productName}`
  )
  .join('\n\n')}

==================================================
Verified by Rayeva Circular Marketplace Engine
`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Rayeva_Personal_Climate_Audit_${new Date().toISOString().slice(0, 10)}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full min-h-screen bg-[#FAF8F3] text-slate-900 relative selection:bg-[#187E91]/20">
      {/* Dynamic Ambient Spore Canvas */}
      <AmbientSporeCanvas particleCount={28} speed={0.35} />

      {/* Persistent Navbar */}
      <Navbar />

      {/* Main Container */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-20">
        {/* Navigation Breadcrumb & Back Button */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-[#187E91] transition-colors py-1.5 px-3 rounded-xl bg-white/80 border border-stone-200/80 hover:border-[#187E91]/30 shadow-xs cursor-pointer group"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            <span>Back to Rayeva Ecosystem</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <span className="cursor-pointer hover:text-slate-800" onClick={() => navigate('/')}>
              Home
            </span>
            <ChevronRight size={12} />
            <span>Intelligence Engine</span>
            <ChevronRight size={12} />
            <span className="text-[#187E91] font-semibold">Individual Carbon Calculator</span>
          </div>
        </div>

        {/* Page Hero Header */}
        <div className="relative rounded-3xl bg-gradient-to-br from-[#0D1F1A] via-[#122A23] to-[#187E91] text-white p-6 sm:p-10 lg:p-12 shadow-xl overflow-hidden mb-8 border border-emerald-900/30">
          <div className="absolute -right-16 -top-16 w-80 h-80 bg-[#28B6CC]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-12 -bottom-12 w-64 h-64 bg-[#10B981]/15 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold tracking-wide uppercase mb-4 backdrop-blur-md">
              <Sparkles size={14} className="text-emerald-300" />
              <span>Rayeva Intelligence Engine • Module 02</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-white mb-4 leading-tight">
              Individual AI Carbon & Impact Calculator
            </h1>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
              Scientifically calibrated with Central Electricity Authority (CEA v19) grid emission factors, MoEFCC
              benchmarks, and Oxford lifecycle dietary data. Move beyond rough estimations with granular, lifestyle-specific
              intelligence.
            </p>

            {/* Persona Preset Quick Selectors */}
            <div>
              <div className="text-xs font-semibold text-emerald-200/90 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <Layers size={14} />
                <span>Explore Realistic Indian Lifestyles (1-Click Presets):</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {PERSONA_PRESETS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => applyPreset(p.id)}
                    className="p-2.5 sm:p-3 text-left rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 hover:border-emerald-400/50 backdrop-blur-sm transition-all duration-200 group cursor-pointer"
                  >
                    <div className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors flex items-center justify-between">
                      <span>{p.name}</span>
                      <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="text-[11px] text-stone-300 line-clamp-1 mt-0.5">{p.tagline}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Configuration Inputs (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Interactive Pillar Selector Tabs */}
            <div className="flex p-1.5 bg-stone-200/70 rounded-2xl gap-1">
              <button
                type="button"
                onClick={() => setActiveTab('mobility')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'mobility'
                    ? 'bg-white text-[#187E91] shadow-sm font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Car size={16} />
                <span>Mobility</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('energy')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'energy'
                    ? 'bg-white text-amber-700 shadow-sm font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Zap size={16} />
                <span>Energy</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('diet')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'diet'
                    ? 'bg-white text-emerald-700 shadow-sm font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Utensils size={16} />
                <span>Diet</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('waste')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'waste'
                    ? 'bg-white text-rose-700 shadow-sm font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ShoppingBag size={16} />
                <span>Waste</span>
              </button>
            </div>

            {/* TAB CONTENT: Mobility */}
            {activeTab === 'mobility' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6 animate-in fade-in duration-200">
                <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-teal-50 text-[#187E91] flex items-center justify-center">
                      <Car size={20} />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-slate-900">Pillar 1: Daily Mobility & Long Distance</h2>
                      <p className="text-xs text-slate-500">300 work days calibrated per Indian urban traffic profiles</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-teal-50 text-[#187E91] border border-teal-200">
                    {calculations.breakdown.mobility.kg} kg CO2e
                  </span>
                </div>

                {/* Commute Distance */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs sm:text-sm font-semibold text-slate-800">Daily Commute Distance</label>
                    <span className="text-sm font-bold text-[#187E91] bg-teal-50 px-2.5 py-0.5 rounded-lg border border-teal-100">
                      {commuteKmDaily} km / day
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="80"
                    step="1"
                    value={commuteKmDaily}
                    onChange={(e) => setCommuteKmDaily(Number(e.target.value))}
                    className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#187E91]"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>Work from home (0 km)</span>
                    <span>Suburban commute (40 km)</span>
                    <span>High transit (80 km)</span>
                  </div>
                </div>

                {/* Primary Mode Selector */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-slate-800 mb-2.5">
                    Primary Transit Mode (Emissions factor per passenger-km)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {Object.entries(EMISSION_FACTORS.MOBILITY).map(([key, config]) => {
                      const isSelected = commuteMode === key;
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setCommuteMode(key as any)}
                          className={`p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-teal-50/80 border-[#187E91] text-[#136B7C] shadow-xs'
                              : 'bg-stone-50 hover:bg-stone-100/80 border-stone-200 text-slate-700'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold">{config.name}</span>
                            {isSelected && <Check size={14} className="text-[#187E91]" />}
                          </div>
                          <div className="text-[11px] text-slate-500 font-mono">{config.factor} kg CO2e / km</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Annual Flights */}
                <div className="pt-2">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs sm:text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                      <Plane size={15} className="text-slate-500" />
                      <span>Domestic Flights per Year (Roundtrip)</span>
                    </label>
                    <span className="text-sm font-bold text-[#187E91] bg-teal-50 px-2.5 py-0.5 rounded-lg border border-teal-100">
                      {annualFlights} flights ({annualFlights * 220} kg CO2e)
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="15"
                    step="1"
                    value={annualFlights}
                    onChange={(e) => setAnnualFlights(Number(e.target.value))}
                    className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#187E91]"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>No flights</span>
                    <span>Occasional travel (5)</span>
                    <span>Frequent flyer (15)</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: Energy */}
            {activeTab === 'energy' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6 animate-in fade-in duration-200">
                <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
                      <Zap size={20} />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-slate-900">Pillar 2: Domestic Electricity & Cooking</h2>
                      <p className="text-xs text-slate-500">Central Electricity Authority (CEA v19: 0.716 kg CO2e/kWh)</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                    {calculations.breakdown.energy.kg} kg CO2e
                  </span>
                </div>

                {/* Monthly Electricity Bill */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs sm:text-sm font-semibold text-slate-800">
                      Monthly Electricity Bill (Household Total)
                    </label>
                    <span className="text-sm font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-lg border border-amber-100">
                      ₹ {monthlyElectricityBillInr.toLocaleString()} (~{Math.round(monthlyElectricityBillInr / 7.5)} kWh)
                    </span>
                  </div>
                  <input
                    type="range"
                    min="300"
                    max="15000"
                    step="100"
                    value={monthlyElectricityBillInr}
                    onChange={(e) => setMonthlyElectricityBillInr(Number(e.target.value))}
                    className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>₹ 300 (Low consumption)</span>
                    <span>₹ 5,000 (AC Heavy)</span>
                    <span>₹ 15,000 (Villa / High load)</span>
                  </div>
                </div>

                {/* Household Size Sharing Bill */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-slate-800 mb-2">
                    Household Members Sharing Electricity (Per-Capita Allocation)
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setHouseholdMembers(num)}
                        className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          householdMembers === num
                            ? 'bg-amber-100 border-amber-500 text-amber-900'
                            : 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-slate-700'
                        }`}
                      >
                        {num === 5 ? '5+ Persons' : `${num} ${num === 1 ? 'Person' : 'Persons'}`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Cooking LPG Cylinders */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs sm:text-sm font-semibold text-slate-800 flex items-center gap-1.5">
                      <Flame size={15} className="text-amber-600" />
                      <span>Annual 14.2 kg LPG Cylinders</span>
                    </label>
                    <span className="text-sm font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-lg border border-amber-100">
                      {lpgCylindersYear} cylinders / year
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="14"
                    step="1"
                    value={lpgCylindersYear}
                    onChange={(e) => setLpgCylindersYear(Number(e.target.value))}
                    className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                  />
                </div>

                {/* Rooftop Solar Toggle */}
                <div
                  onClick={() => setHasSolarRooftop(!hasSolarRooftop)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    hasSolarRooftop
                      ? 'bg-emerald-50/80 border-emerald-400 text-emerald-950'
                      : 'bg-stone-50 border-stone-200 text-slate-700 hover:bg-stone-100/70'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                        hasSolarRooftop ? 'bg-emerald-200 text-emerald-800' : 'bg-stone-200 text-slate-600'
                      }`}
                    >
                      <Sun size={18} />
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold">Rooftop Solar Installed?</div>
                      <div className="text-[11px] text-slate-500">Applies 75% clean energy offset to your grid power</div>
                    </div>
                  </div>
                  <div
                    className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                      hasSolarRooftop ? 'bg-emerald-600' : 'bg-stone-300'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white transition-transform ${
                        hasSolarRooftop ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: Diet */}
            {activeTab === 'diet' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6 animate-in fade-in duration-200">
                <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                      <Utensils size={20} />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-slate-900">Pillar 3: Dietary Lifecycle & Food Habits</h2>
                      <p className="text-xs text-slate-500">Oxford Study (Poore & Nemecek) + Last-Mile Delivery</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {calculations.breakdown.diet.kg} kg CO2e
                  </span>
                </div>

                {/* Diet Archetype Cards */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-slate-800 mb-2.5">
                    Select Your Typical Dietary Pattern
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {Object.entries(EMISSION_FACTORS.DIET).map(([key, config]) => {
                      const isSelected = dietType === key;
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setDietType(key as any)}
                          className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-emerald-50/80 border-emerald-500 text-emerald-950 shadow-xs ring-1 ring-emerald-500'
                              : 'bg-stone-50 hover:bg-stone-100/80 border-stone-200 text-slate-700'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs sm:text-sm font-bold">{config.name}</span>
                            {isSelected && <Check size={16} className="text-emerald-600" />}
                          </div>
                          <p className="text-[11px] text-slate-500 mb-2 leading-relaxed">{config.desc}</p>
                          <div className="text-[11px] font-mono text-emerald-800 font-semibold bg-white/80 px-2 py-0.5 rounded-md inline-block border border-stone-200">
                            {config.factor} kg CO2e / year
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Online Food Deliveries */}
                <div className="pt-2">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs sm:text-sm font-semibold text-slate-800">
                      Online Food Deliveries (Swiggy / Zomato per Month)
                    </label>
                    <span className="text-sm font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-100">
                      {onlineDeliveriesPerMonth} orders / mo
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="30"
                    step="1"
                    value={onlineDeliveriesPerMonth}
                    onChange={(e) => setOnlineDeliveriesPerMonth(Number(e.target.value))}
                    className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>Cook at home (0)</span>
                    <span>1-2 times weekly (8)</span>
                    <span>Daily takeout (30)</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: Waste */}
            {activeTab === 'waste' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6 animate-in fade-in duration-200">
                <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-700 flex items-center justify-center">
                      <ShoppingBag size={20} />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-slate-900">Pillar 4: Plastic & Single-Use Packaging</h2>
                      <p className="text-xs text-slate-500">Physical mass diversion & polymer emissions</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-50 text-rose-800 border border-rose-200">
                    {calculations.physicalPlasticKg} kg plastic / yr
                  </span>
                </div>

                {/* Single-Use PET Bottles */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs sm:text-sm font-semibold text-slate-800">
                      Single-Use PET Plastic Bottles Purchased per Month
                    </label>
                    <span className="text-sm font-bold text-rose-800 bg-rose-50 px-2.5 py-0.5 rounded-lg border border-rose-100">
                      {plasticBottlesMonth} bottles / mo
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="40"
                    step="1"
                    value={plasticBottlesMonth}
                    onChange={(e) => setPlasticBottlesMonth(Number(e.target.value))}
                    className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>Zero plastic bottles (0)</span>
                    <span>Moderate (12)</span>
                    <span>High usage (40)</span>
                  </div>
                </div>

                {/* Plastic Bags */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs sm:text-sm font-semibold text-slate-800">
                      Single-Use Carry Bags Received per Month
                    </label>
                    <span className="text-sm font-bold text-rose-800 bg-rose-50 px-2.5 py-0.5 rounded-lg border border-rose-100">
                      {plasticBagsMonth} bags / mo
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    step="1"
                    value={plasticBagsMonth}
                    onChange={(e) => setPlasticBagsMonth(Number(e.target.value))}
                    className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
                  />
                </div>

                {/* Rayeva Zero-Waste Tip */}
                <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 flex items-start gap-3">
                  <Leaf size={18} className="text-[#187E91] shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-700 leading-relaxed">
                    <strong className="text-slate-900 font-semibold">Rayeva Closed-Loop Tip:</strong> Replacing single-use
                    liquid toiletry bottles with solid shampoo and body bars eliminates 0.42 kg of virgin plastic and saves
                    1.8 kg CO2e per unit.
                  </div>
                </div>
              </div>
            )}

            {/* Pillar Navigation Shortcuts */}
            <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-stone-200 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Info size={15} className="text-[#187E91]" />
                <span>Adjust all 4 tabs for maximum calibration precision.</span>
              </div>
              <button
                type="button"
                onClick={resetToDefault}
                className="inline-flex items-center gap-1.5 font-semibold text-slate-700 hover:text-slate-950 cursor-pointer"
              >
                <RotateCcw size={13} />
                <span>Reset to Standard</span>
              </button>
            </div>
          </div>

          {/* Right Column: Live Dynamic Impact Intelligence (5 cols) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            {/* Primary Impact Scorecard */}
            <div className="rounded-3xl bg-white p-6 sm:p-8 border border-stone-200 shadow-md relative overflow-hidden">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                Your Annual Carbon Footprint
              </div>

              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-5xl sm:text-6xl font-serif font-extrabold text-slate-950 tracking-tight">
                  {calculations.totalTonnes}
                </span>
                <span className="text-sm sm:text-base font-semibold text-slate-600">tonnes CO2e / yr</span>
              </div>

              {/* Status Badge */}
              <div
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border mb-5 ${calculations.statusBg}`}
              >
                {calculations.statusTier === 'champion' ? (
                  <Check size={14} className="stroke-[3]" />
                ) : (
                  <AlertTriangle size={14} />
                )}
                <span>{calculations.statusLabel}</span>
              </div>

              {/* Tri-Benchmark Comparison Bar */}
              <div className="space-y-2 mb-6 pt-2 border-t border-stone-100">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
                  <span>National Variance</span>
                  <span
                    className={
                      calculations.vsIndiaPercent <= 0
                        ? 'text-emerald-600 font-bold'
                        : calculations.vsIndiaPercent <= 50
                        ? 'text-amber-600 font-bold'
                        : 'text-rose-600 font-bold'
                    }
                  >
                    {calculations.vsIndiaPercent >= 0 ? '+' : ''}
                    {calculations.vsIndiaPercent}% vs Indian Avg (1.9t)
                  </span>
                </div>

                <div className="relative h-3 bg-stone-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: `${Math.min(100, Math.max(8, (calculations.totalTonnes / 5.5) * 100))}%`,
                      backgroundColor: calculations.statusColor,
                    }}
                  />
                </div>

                <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                  <span>0 t</span>
                  <span className="text-emerald-700 font-bold">1.9 t (India Avg)</span>
                  <span className="text-slate-600">2.0 t (Paris 2030)</span>
                  <span>4.7 t (Global Avg)</span>
                </div>
              </div>

              {/* Category Breakdown Segmented Bar */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>Footprint Distribution</span>
                  <span className="text-slate-500 font-normal">By category</span>
                </div>

                <div className="h-3 w-full bg-stone-100 rounded-full overflow-hidden flex">
                  <div
                    className="h-full bg-[#187E91]"
                    style={{ width: `${calculations.breakdown.mobility.pct}%` }}
                    title={`Mobility: ${calculations.breakdown.mobility.kg} kg`}
                  />
                  <div
                    className="h-full bg-amber-500"
                    style={{ width: `${calculations.breakdown.energy.pct}%` }}
                    title={`Energy: ${calculations.breakdown.energy.kg} kg`}
                  />
                  <div
                    className="h-full bg-emerald-500"
                    style={{ width: `${calculations.breakdown.diet.pct}%` }}
                    title={`Diet: ${calculations.breakdown.diet.kg} kg`}
                  />
                  <div
                    className="h-full bg-rose-500"
                    style={{ width: `${calculations.breakdown.waste.pct}%` }}
                    title={`Waste: ${calculations.breakdown.waste.kg} kg`}
                  />
                </div>

                {/* Category Legend */}
                <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#187E91] shrink-0" />
                    <span>Mobility: {calculations.breakdown.mobility.pct}%</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                    <span>Energy: {calculations.breakdown.energy.pct}%</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                    <span>Diet: {calculations.breakdown.diet.pct}%</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0" />
                    <span>Waste: {calculations.breakdown.waste.pct}%</span>
                  </div>
                </div>
              </div>

              {/* Tangible Equivalents Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 text-center">
                  <div className="w-8 h-8 rounded-full bg-emerald-200 text-emerald-800 flex items-center justify-center mx-auto mb-1.5">
                    <TreePine size={18} />
                  </div>
                  <div className="text-2xl font-serif font-bold text-emerald-950">{calculations.treesNeeded}</div>
                  <div className="text-[11px] font-medium text-emerald-800 uppercase tracking-tight">
                    Trees Needed to Offset
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-200/80 text-center">
                  <div className="w-8 h-8 rounded-full bg-rose-200 text-rose-800 flex items-center justify-center mx-auto mb-1.5">
                    <ShoppingBag size={18} />
                  </div>
                  <div className="text-2xl font-serif font-bold text-rose-950">{calculations.physicalPlasticKg} kg</div>
                  <div className="text-[11px] font-medium text-rose-800 uppercase tracking-tight">
                    Annual Plastic Waste
                  </div>
                </div>
              </div>

              {/* Export & Share Controls */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleDownloadReport}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-[0.98]"
                >
                  <Download size={14} />
                  <span>Download ESG Audit</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="py-2.5 px-3.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-slate-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  title="Copy shareable summary"
                >
                  {copiedToast ? <Check size={14} className="text-emerald-600" /> : <Share2 size={14} />}
                  <span>{copiedToast ? 'Copied!' : 'Share'}</span>
                </button>
              </div>
            </div>

            {/* AI Micro-Habit Recommendation Engine */}
            <div className="rounded-3xl bg-white p-6 sm:p-7 border border-stone-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Sparkles size={16} />
                </div>
                <span>Personalized AI Micro-Habit Swaps</span>
              </div>
              <p className="text-xs text-slate-500">
                Prioritized solutions addressing your highest emissions categories:
              </p>

              <div className="space-y-3">
                {calculations.recs.map((rec) => (
                  <div
                    key={rec.id}
                    className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/90 hover:border-emerald-300 hover:bg-emerald-50/30 transition-all duration-200"
                  >
                    <div className="flex justify-between items-start gap-2 mb-1.5">
                      <span className="text-xs font-bold text-slate-900 leading-snug">{rec.action}</span>
                      <span className="shrink-0 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        -{rec.savingsKg} kg CO2e
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-600 leading-relaxed mb-2.5">{rec.context}</p>

                    <div className="flex items-center justify-between pt-2 border-t border-stone-200/60 text-xs">
                      <span className="font-semibold text-[#187E91] text-[11px] truncate max-w-[190px]">
                        {rec.productName}
                      </span>
                      <button
                        type="button"
                        onClick={() => navigate(rec.productLink)}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-[#187E91] hover:underline cursor-pointer"
                      >
                        <span>View</span>
                        <ArrowRight size={11} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Botanical Flourish Divider */}
        <div className="my-14">
          <BotanicalVineDivider variant="jasmine" maxWidth={860} />
        </div>

        {/* Methodology & Scientific Standards Reference Drawer / Card */}
        <div className="rounded-3xl bg-stone-100/80 p-6 sm:p-8 border border-stone-200 max-w-4xl mx-auto">
          <div className="flex items-center gap-2.5 mb-3 text-slate-900 font-bold text-sm sm:text-base">
            <ShieldCheck size={20} className="text-[#187E91]" />
            <span>Audit Calibration & Scientific Provenance</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600 leading-relaxed">
            <div className="p-3 bg-white rounded-xl border border-stone-200">
              <strong className="block text-slate-800 font-semibold mb-1">CEA India v19 Factor</strong>
              Electricity emissions calibrated at 0.716 kg CO2e per kWh as reported by the Central Electricity Authority
              under MoEFCC guidelines.
            </div>
            <div className="p-3 bg-white rounded-xl border border-stone-200">
              <strong className="block text-slate-800 font-semibold mb-1">Oxford Lifecycle Dietary Data</strong>
              Dietary calculations incorporate agricultural land use, animal methane emissions, and transport based on the
              Poore & Nemecek Oxford meta-analysis.
            </div>
            <div className="p-3 bg-white rounded-xl border border-stone-200">
              <strong className="block text-slate-800 font-semibold mb-1">EPA Tree Baseline</strong>
              Sequestration rate calculated at 21.77 kg CO2 per mature tree annually, reflecting 10-year average tropical and
              subtropical growth rates.
            </div>
          </div>
        </div>
      </main>

      {/* Persistent Footer */}
      <Footer />
    </div>
  );
}
