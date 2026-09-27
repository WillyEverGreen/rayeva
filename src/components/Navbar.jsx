import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Menu, X, Calendar, Check, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePageTransition } from '../context/TransitionContext';

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [demoSubmitted, setDemoSubmitted] = useState(false);
  const headerRef = useRef(null);
  const { navigate } = usePageTransition();

  // Scroll detection: activates when scrolled past Hero section
  useEffect(() => {
    const onScroll = () => {
      const heroEl = document.getElementById('hero');
      if (heroEl) {
        const heroBottom = heroEl.getBoundingClientRect().bottom;
        setScrolled(heroBottom <= 72);
      } else {
        setScrolled(window.scrollY > 100);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // GSAP ScrollTrigger synchronization with Lenis
    const trigger = ScrollTrigger.create({
      trigger: '#hero',
      start: 'bottom 72px',
      onEnter: () => setScrolled(true),
      onLeaveBack: () => setScrolled(false),
    });

    onScroll();
    const timer = setTimeout(onScroll, 100);
    return () => {
      window.removeEventListener('scroll', onScroll);
      trigger.kill();
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(headerRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out', delay: 0.25 });
    }
  }, []);

  const handleNav = (target, title) => (e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    navigate(target, { title });
  };

  const handleDemoSubmit = (e) => {
    e.preventDefault();
    setDemoSubmitted(true);
    setTimeout(() => { setShowDemoModal(false); setDemoSubmitted(false); }, 3000);
  };

  const NAV_LINKS = [
    { label: 'Collections', target: '#categories' },
    { label: 'Circularity', target: '#impact' },
    { label: 'AI Calculator', target: '#calculator' },
    { label: 'Standards',   target: '#brand-criteria' },
    { label: 'Impact',      target: '#sustainability-tree' },
    { label: 'About Us',    target: '#about' },
  ];

  const linkClass = [
    'group relative text-[14px] lg:text-[15px] font-semibold transition-all duration-300 py-1',
    'hover:-translate-y-0.5 focus:outline-none select-none cursor-pointer',
    "after:content-[''] after:absolute after:-bottom-0.5 after:left-1/2 after:-translate-x-1/2",
    'after:w-0 after:h-[2px] after:bg-[#187E91] after:rounded-full',
    'hover:after:w-full after:transition-all after:duration-300',
  ].join(' ');

  return (
    <>
      {/* Fixed 72px navbar */}
      <header
        ref={headerRef}
        className={[
          'fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 h-[72px]',
          scrolled
            ? 'bg-[#FAF8F3]/95 backdrop-blur-md border-b border-stone-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.04)]'
            : 'bg-transparent border-transparent border-b-0 shadow-none',
        ].join(' ')}
      >
        <div className="max-w-[1400px] h-full mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-4">
          {/* Left: Brand Logo — completely transparent and bigger */}
          <div className="flex items-center justify-start flex-1 min-w-0">
            <a
              href="/"
              onClick={handleNav('/', 'Rayeva Home')}
              className="flex items-center gap-2.5 sm:gap-3.5 group select-none focus:outline-none cursor-pointer shrink-0 transition-transform duration-300 hover:scale-[1.02]"
            >
              <img
                src="/rayeva_logo.png"
                alt="Rayeva Logo"
                className="h-10 sm:h-11 md:h-12 lg:h-[48px] w-auto object-contain transition-transform duration-300 group-hover:scale-105 shrink-0 drop-shadow-[0_2px_6px_rgba(255,255,255,0.7)]"
              />
              <span className="text-[24px] sm:text-[26px] lg:text-[28px] font-bold tracking-tight font-sans text-slate-950 whitespace-nowrap drop-shadow-[0_2px_5px_rgba(255,255,255,0.9)]">
                Rayeva
              </span>
            </a>
          </div>

          {/* Center: Nav links — always centered, no text wrap */}
          <nav className="hidden lg:flex items-center justify-center gap-6 xl:gap-8 shrink-0 px-2">
            {NAV_LINKS.map(({ label, target, badge }) => (
              <a
                key={label}
                href={target}
                onClick={handleNav(target, label)}
                className={[
                  linkClass,
                  'whitespace-nowrap flex items-center gap-1.5',
                  scrolled
                    ? 'text-stone-700 hover:text-[#187E91]'
                    : 'text-slate-900 hover:text-[#187E91] font-semibold drop-shadow-[0_1px_2px_rgba(255,255,255,0.85)]',
                ].join(' ')}
              >
                <span>{label}</span>
              </a>
            ))}
          </nav>

          {/* Right: CTA & Mobile/Tablet Controls */}
          <div className="flex items-center justify-end flex-1 gap-2.5 sm:gap-3">
            {/* Book Demo: prominent on tablet & desktop */}
            <button
              type="button"
              onClick={() => setShowDemoModal(true)}
              className="hidden sm:inline-flex group items-center gap-2 bg-[#187E91] hover:bg-[#136B7C] text-white font-semibold px-4 lg:px-5 py-2 sm:py-2.5 rounded-xl text-xs lg:text-sm shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] cursor-pointer select-none whitespace-nowrap shrink-0"
            >
              <span>Book Demo</span>
              <ArrowRight size={14} className="stroke-[2.2] transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>

            {/* Mobile / Tablet Menu Trigger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={[
                'lg:hidden p-2.5 rounded-xl transition-all duration-200 focus:outline-none cursor-pointer flex items-center justify-center shrink-0',
                scrolled
                  ? 'bg-white text-slate-900 border border-stone-200/80 shadow-sm hover:bg-stone-50'
                  : 'bg-white/70 hover:bg-white/90 text-slate-900 backdrop-blur-md border border-white/70 shadow-xs'
              ].join(' ')}
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile / Tablet Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-[72px] left-0 right-0 z-50 mx-3 sm:mx-6 mt-1 p-5 sm:p-6 bg-[#FAF8F3]/98 backdrop-blur-2xl rounded-2xl shadow-xl border border-stone-200/80 flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden">
            <img src="/leaves/leaf-01.png" alt="" className="pointer-events-none absolute -bottom-3 -right-3 w-16 opacity-20 select-none -rotate-12" />
            <img src="/leaves/leaf-floating-small.png" alt="" className="pointer-events-none absolute top-2 right-4 w-7 opacity-20 select-none" />
            {NAV_LINKS.map(({ label, target, badge }) => (
              <a
                key={label}
                href={target}
                onClick={handleNav(target, label)}
                className="text-[15px] font-semibold text-slate-800 py-2.5 border-b border-stone-200/50 last:border-b-0 hover:text-[#187E91] transition-colors focus:outline-none flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span>{label}</span>
                </div>
                <ArrowRight size={14} className="text-stone-400" />
              </a>
            ))}
            <button
              type="button"
              onClick={() => { setMobileMenuOpen(false); setShowDemoModal(true); }}
              className="mt-3 w-full inline-flex items-center justify-center gap-2 bg-[#187E91] hover:bg-[#136B7C] text-white font-semibold py-3 rounded-xl text-sm shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.98] focus:outline-none cursor-pointer"
            >
              <span>Book Demo</span>
              <ArrowRight size={14} className="stroke-[2.2]" />
            </button>
          </div>
        )}
      </header>

      {/* Demo Modal */}
      {showDemoModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setShowDemoModal(false)}>
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-stone-200 animate-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowDemoModal(false)} className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-stone-100 transition-colors" aria-label="Close modal">
              <X size={18} />
            </button>
            {demoSubmitted ? (
              <div className="py-8 text-center flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4"><Check size={28} className="stroke-[2.5]" /></div>
                <h3 className="text-2xl font-serif font-bold text-slate-900 mb-2">Demo Scheduled!</h3>
                <p className="text-slate-600 text-sm max-w-sm mb-6 leading-relaxed">Thank you! Our sustainability specialist will email you the calendar invitation and preparation link shortly.</p>
                <button type="button" onClick={() => { setShowDemoModal(false); setDemoSubmitted(false); }} className="px-6 py-2.5 bg-[#187E91] hover:bg-[#136B7C] text-white font-semibold rounded-xl text-sm shadow-sm hover:shadow-md transition-all cursor-pointer">Done</button>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 text-[#187E91] text-xs font-bold uppercase tracking-wider mb-2"><Sparkles size={14} /><span>Rayeva Experience</span></div>
                <h3 className="text-2xl font-serif font-bold text-slate-900 mb-2">Book a 1-on-1 Demo</h3>
                <p className="text-slate-600 text-xs sm:text-sm mb-6 leading-relaxed">Get a personalized 15-minute walkthrough of our verified zero-waste marketplace, enterprise BRSR ESG suite, and circular pickup system.</p>
                <form onSubmit={handleDemoSubmit} className="space-y-3.5">
                  <div><label className="block text-xs font-semibold text-slate-700 mb-1">Your Name</label><input type="text" required placeholder="e.g. Priya Sharma" className="w-full px-4 py-2.5 text-sm rounded-xl border border-stone-300 focus:border-[#187E91] focus:ring-2 focus:ring-[#187E91]/20 outline-none transition-all" /></div>
                  <div><label className="block text-xs font-semibold text-slate-700 mb-1">Work / Preferred Email</label><input type="email" required placeholder="priya@company.com" className="w-full px-4 py-2.5 text-sm rounded-xl border border-stone-300 focus:border-[#187E91] focus:ring-2 focus:ring-[#187E91]/20 outline-none transition-all" /></div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div><label className="block text-xs font-semibold text-slate-700 mb-1">Focus Area</label><select className="w-full px-3 py-2.5 text-sm rounded-xl border border-stone-300 focus:border-[#187E91] focus:ring-2 focus:ring-[#187E91]/20 outline-none transition-all bg-white text-slate-800"><option>Enterprise BRSR &amp; ESG Advisory</option><option>Bulk Sustainable Packaging</option><option>Brand Partner Onboarding</option><option>General Platform Tour</option></select></div>
                    <div><label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Date</label><input type="date" required defaultValue={new Date(Date.now() + 86400000).toISOString().split('T')[0]} className="w-full px-3 py-2.5 text-sm rounded-xl border border-stone-300 focus:border-[#187E91] focus:ring-2 focus:ring-[#187E91]/20 outline-none transition-all bg-white text-slate-800" /></div>
                  </div>
                  <button type="submit" className="w-full mt-2 py-3 bg-[#187E91] hover:bg-[#136B7C] text-white font-semibold rounded-xl text-sm shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"><Calendar size={16} /><span>Confirm Demo Booking</span></button>
                </form>
                <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Want to test our tools first?</span>
                  <button type="button" onClick={() => { setShowDemoModal(false); const el = document.querySelector('#impact-suite'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }} className="text-[#187E91] font-semibold hover:underline inline-flex items-center gap-1 cursor-pointer"><span>View ESG Calculator</span><ArrowRight size={12} /></button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
