import React, { useState } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { usePageTransition } from '../context/TransitionContext';

export default function HeroContent() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { registerHeroContent } = usePageTransition();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setTimeout(() => { setSubmitted(false); setEmail(''); }, 3500);
    }
  };

  return (
    <div
      ref={registerHeroContent}
      className="relative z-20 w-full max-w-3xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center"
    >

      {/* Social Proof Badge */}
      <div className="hero-anim-item inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/45 backdrop-blur-md border border-white/60 shadow-[0_2px_8px_rgba(0,0,0,0.04)] mb-4 sm:mb-6 transition-all duration-300 hover:bg-white/60 cursor-default select-none">
        <div className="flex -space-x-1.5 items-center">
          <img src="/avatars/avatar1.jpg" alt="User 1" className="w-5 h-5 rounded-full object-cover ring-1 ring-white/90" />
          <img src="/avatars/avatar2.jpg" alt="User 2" className="w-5 h-5 rounded-full object-cover ring-1 ring-white/90" />
          <img src="/avatars/avatar3.jpg" alt="User 3" className="w-5 h-5 rounded-full object-cover ring-1 ring-white/90" />
        </div>
        <span className="w-4 h-4 rounded-full bg-white flex items-center justify-center text-slate-900 shadow-xs">
          <ArrowUpRight size={10} className="stroke-[2.5]" />
        </span>
        <span className="text-[11px] sm:text-xs font-semibold text-slate-900 tracking-tight pr-0.5">
          Over 1,000 conscious shoppers
        </span>
      </div>

      {/* H1 Headline */}
      <h1 className="hero-anim-item font-serif font-medium tracking-tight text-slate-950 leading-[1.1] flex flex-col items-center gap-1 sm:gap-1.5 mb-3.5 sm:mb-5 select-none text-3xl xs:text-4xl sm:text-5xl md:text-[58px] lg:text-[64px]">
        <span className="drop-shadow-[0_2px_4px_rgba(255,255,255,0.5)]">Breathe In Peace,</span>
        <span className="italic text-[#187E91] drop-shadow-[0_2px_4px_rgba(255,255,255,0.4)] whitespace-normal sm:whitespace-nowrap">
          Breathe Out The World
        </span>
      </h1>

      {/* Subtitle */}
      <p className="hero-anim-item text-slate-800 text-xs sm:text-[15px] max-w-xs sm:max-w-lg mx-auto leading-relaxed mb-5 sm:mb-7 font-normal select-none drop-shadow-[0_1px_2px_rgba(255,255,255,0.5)]">
        India's curated sustainable living platform, connecting mindful consumers and businesses with verified zero-waste solutions.
      </p>

      {/* Email CTA */}
      <form
        onSubmit={handleSubmit}
        className="hero-anim-item w-full max-w-[340px] xs:max-w-[420px] sm:max-w-[460px] mx-auto bg-white/50 backdrop-blur-xl border border-white/75 shadow-[0_6px_28px_rgba(0,0,0,0.07)] rounded-full p-1 pl-3.5 sm:pl-5 flex items-center justify-between transition-all duration-300 focus-within:bg-white/75 focus-within:shadow-[0_10px_36px_rgba(0,0,0,0.12)] focus-within:border-white"
      >
        {submitted ? (
          <div className="w-full py-2 flex items-center justify-center gap-2 text-emerald-800 font-semibold text-xs sm:text-sm animate-in fade-in duration-300">
            <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center">
              <Check size={12} className="stroke-[3]" />
            </span>
            <span>You're on the list! Welcome aboard.</span>
          </div>
        ) : (
          <>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full bg-transparent border-none outline-none text-slate-900 placeholder:text-slate-500 font-medium text-xs sm:text-sm focus:outline-none focus:ring-0 pr-2"
            />
            <button
              type="submit"
              className="group shrink-0 bg-[#187E91] hover:bg-[#136B7C] text-white font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-[13px] shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 focus:outline-none whitespace-nowrap cursor-pointer"
            >
              Join Rayeva
            </button>
          </>
        )}
      </form>
    </div>
  );
}
