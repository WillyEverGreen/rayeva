import React, { useState, useMemo } from 'react';
import {
  Car,
  Zap,
  Utensils,
  ShoppingBag,
  TreePine,
  ArrowRight,
  Sparkles,
  Maximize2,
  Check,
  Leaf,
  ShieldCheck,
} from 'lucide-react';
import { usePageTransition } from '../context/TransitionContext';

export default function IndividualCalculatorSection() {
  const { navigate } = usePageTransition();

  // Quick interactive state
  const [commuteKm, setCommuteKm] = useState(20);
  const [transitMode, setTransitMode] = useState<'METRO' | 'CAR_PETROL' | 'EV_2W'>('CAR_PETROL');
  const [elecBill, setElecBill] = useState(2500);
  const [diet, setDiet] = useState<'VEGAN' | 'LACTO_VEGETARIAN' | 'FLEXITARIAN' | 'HEAVY_MEAT'>('FLEXITARIAN');
  const [plasticBottles, setPlasticBottles] = useState(12);

  // Factors
  const calculations = useMemo(() => {
    const modeFactors = { METRO: 0.028, EV_2W: 0.022, CAR_PETROL: 0.178 };
    const dietFactors = { VEGAN: 950, LACTO_VEGETARIAN: 1250, FLEXITARIAN: 1650, HEAVY_MEAT: 2450 };

    const mobility = commuteKm * modeFactors[transitMode] * 300 + 440; // 300 days + 2 flights avg
    const energy = ((elecBill / 7.5) * 0.716 * 12) / 3 + 85; // 3 persons sharing
    const dietKg = dietFactors[diet];
    const plastic = plasticBottles * 12 * 0.035;

    const totalKg = Math.round(mobility + energy + dietKg + plastic);
    const tonnes = +(totalKg / 1000).toFixed(2);
    const trees = Math.ceil(totalKg / 21.77);
    const vsIndia = Math.round(((totalKg - 1900) / 1900) * 100);

    return { totalKg, tonnes, trees, vsIndia };
  }, [commuteKm, transitMode, elecBill, diet, plasticBottles]);

  return (
    <section
      id="calculator"
      className="relative w-full py-12 sm:py-16 lg:py-24 bg-[#FAF8F3] overflow-hidden scroll-mt-20 border-t border-stone-200/60"
    >
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-emerald-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-[0.22em] text-[#187E91] uppercase mb-3 bg-[#E3EFE7] px-3.5 py-1.5 rounded-full">
            <Sparkles size={13} className="stroke-[2.5]" />
            <span>Carbon Footprint Calculator</span>
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal tracking-tight text-slate-900 leading-[1.12] mb-4">
            Your Personal{' '}
            <span className="italic font-serif text-[#187E91]">Climate Impact</span>
          </h2>

          <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-normal">
            Calibrated with MoEFCC and Central Electricity Authority factors. Adjust your daily habits below for an instant climate calibration.
          </p>
        </div>

        {/* Embedded Interactive Card */}
        <div className="rounded-2xl sm:rounded-3xl bg-white/90 backdrop-blur-xl border border-stone-200/90 shadow-xl overflow-hidden p-4 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            {/* Quick Interactive Inputs (7 cols) */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6">
              {/* Daily Commute */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs sm:text-sm font-semibold text-slate-800 flex items-center gap-2">
                    <Car size={16} className="text-[#187E91]" />
                    <span>Daily Commute & Primary Mode</span>
                  </label>
                  <span className="text-xs font-bold text-[#187E91] bg-teal-50 px-2.5 py-0.5 rounded-lg border border-teal-100">
                    {commuteKm} km / day
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="60"
                  value={commuteKm}
                  onChange={(e) => setCommuteKm(Number(e.target.value))}
                  className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#187E91]"
                />
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2 mt-2.5">
                  {[
                    { id: 'METRO', label: 'Metro / Train' },
                    { id: 'EV_2W', label: 'Electric 2W' },
                    { id: 'CAR_PETROL', label: 'Petrol Car' },
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setTransitMode(m.id as any)}
                      className={`py-1.5 px-1 sm:px-2 rounded-xl text-[11px] sm:text-xs font-semibold border transition-all cursor-pointer text-center truncate ${
                        transitMode === m.id
                          ? 'bg-teal-50 border-[#187E91] text-[#187E91] shadow-xs'
                          : 'bg-stone-50 border-stone-200 text-slate-600 hover:bg-stone-100'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Monthly Electricity */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs sm:text-sm font-semibold text-slate-800 flex items-center gap-2">
                    <Zap size={16} className="text-amber-600" />
                    <span>Monthly Electricity Bill</span>
                  </label>
                  <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-lg border border-amber-100">
                    ₹ {elecBill.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="400"
                  max="8000"
                  step="100"
                  value={elecBill}
                  onChange={(e) => setElecBill(Number(e.target.value))}
                  className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                />
              </div>

              {/* Diet Selection */}
              <div>
                <label className="text-xs sm:text-sm font-semibold text-slate-800 flex items-center gap-2 mb-2">
                  <Utensils size={16} className="text-emerald-600" />
                  <span>Dietary Pattern</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'VEGAN', label: 'Vegan' },
                    { id: 'LACTO_VEGETARIAN', label: 'Lacto-Veg' },
                    { id: 'FLEXITARIAN', label: 'Flexitarian' },
                    { id: 'HEAVY_MEAT', label: 'Daily Meat' },
                  ].map((d) => (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => setDiet(d.id as any)}
                      className={`py-2 px-2 text-center rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                        diet === d.id
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold ring-1 ring-emerald-500'
                          : 'bg-stone-50 border-stone-200 text-slate-600 hover:bg-stone-100'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Plastic Bottles */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs sm:text-sm font-semibold text-slate-800 flex items-center gap-2">
                    <ShoppingBag size={16} className="text-rose-600" />
                    <span>Single-Use PET Bottles / Month</span>
                  </label>
                  <span className="text-xs font-bold text-rose-800 bg-rose-50 px-2.5 py-0.5 rounded-lg border border-rose-100">
                    {plasticBottles} bottles
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="30"
                  value={plasticBottles}
                  onChange={(e) => setPlasticBottles(Number(e.target.value))}
                  className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
                />
              </div>
            </div>

            {/* Live Result Scorecard (5 cols) */}
            <div className="lg:col-span-5 relative text-white rounded-3xl p-6 sm:p-8 shadow-xl overflow-hidden bg-[#1e3a2e]">

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldCheck size={14} className="text-emerald-300" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-300">
                    Your Estimated Annual Footprint
                  </span>
                </div>

                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-6xl font-serif font-extrabold text-white tracking-tight">{calculations.tonnes}</span>
                  <span className="text-sm font-semibold text-emerald-100/80">t CO₂e / yr</span>
                </div>

                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold mb-6 border ${
                  calculations.vsIndia > 0
                    ? 'bg-rose-500/20 border-rose-400/30 text-rose-200'
                    : 'bg-emerald-400/20 border-emerald-400/30 text-emerald-200'
                }`}>
                  <span>
                    {calculations.vsIndia >= 0 ? '↑ ' : '↓ '}
                    {Math.abs(calculations.vsIndia)}% {calculations.vsIndia >= 0 ? 'above' : 'below'} India avg (1.9t)
                  </span>
                </div>

                {/* Mini equivalents */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="p-3.5 rounded-2xl bg-white/10 border border-white/10 text-center backdrop-blur-xs">
                    <TreePine size={20} className="text-emerald-300 mx-auto mb-1.5" />
                    <div className="text-2xl font-bold font-serif">{calculations.trees}</div>
                    <div className="text-[10px] text-emerald-100/70 uppercase tracking-wider mt-0.5">Trees to Offset</div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/10 border border-white/10 text-center backdrop-blur-xs">
                    <Leaf size={20} className="text-teal-200 mx-auto mb-1.5" />
                    <div className="text-2xl font-bold font-serif">
                      {+(plasticBottles * 12 * 0.02).toFixed(1)} kg
                    </div>
                    <div className="text-[10px] text-emerald-100/70 uppercase tracking-wider mt-0.5">Plastic Waste</div>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-white/10 mb-5" />

                {/* Launch Full Studio CTA */}
                <button
                  type="button"
                  onClick={() => navigate('#calculator')}
                  className="w-full py-3 px-4 rounded-xl bg-white text-[#1a3d2e] hover:bg-emerald-50 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg cursor-pointer active:scale-[0.98]"
                >
                  <span>Launch Full Intelligence Studio</span>
                  <Maximize2 size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
