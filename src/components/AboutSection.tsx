import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 500, suffix: '+', label: 'Verified Products' },
  { value: 12,  suffix: '+', label: 'Partner Brands' },
  { value: 100, suffix: 'kg', label: 'Plastic Saved' },
  { value: 78,  suffix: '',  label: 'BRSR Score' },
];

export default function AboutSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const textColRef  = useRef<HTMLDivElement>(null);
  const imageColRef = useRef<HTMLDivElement>(null);
  const statsRef    = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const st = { trigger: sectionRef.current, start: 'top 68%' };

    // Left text
    gsap.fromTo(textColRef.current,
      { opacity: 0, x: -36 },
      { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out', scrollTrigger: st }
    );

    // Right images stagger
    gsap.fromTo('.about-img',
      { opacity: 0, x: 36, rotation: 2 },
      { opacity: 1, x: 0, rotation: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: st }
    );

    // Stat counters
    STATS.forEach((s, i) => {
      const el = document.getElementById(`stat-${i}`);
      if (!el) return;
      gsap.from(el, {
        textContent: 0,
        duration: 2,
        snap: { textContent: 1 },
        ease: 'power2.out',
        scrollTrigger: { trigger: statsRef.current, start: 'top 78%' },
        onUpdate() {
          const n = Math.round(+el.textContent!);
          el.textContent = `${n}${s.suffix}`;
        },
      });
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="about"
      className="w-full bg-[#F3EFE6] pt-20 sm:pt-28 pb-24 sm:pb-32 overflow-hidden select-none"
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10">

        {/* 2-col grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          {/* Left: Story Text */}
          <div ref={textColRef} className="flex flex-col">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-slate-950 leading-tight mb-5 sm:mb-6">
              India's First End-to-End{' '}
              <span className="italic text-[#187E91]">Sustainable Solutions Platform</span>
            </h2>
            <p className="text-slate-700 text-sm sm:text-[15px] leading-relaxed mb-4 sm:mb-5">
              Rayeva was born from a simple frustration: buying sustainably in India was too hard, too fragmented, and too confusing. We built the platform we wished existed: one that rigorously vets every brand, transparently tracks every material, and closes the loop on what happens after you buy.
            </p>
            <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed mb-8 sm:mb-10">
              From Mumbai's Opera House, we work with a growing network of circular brands, BRSR-aligned enterprises, and conscious consumers to prove that sustainable commerce can be beautiful, easy, and commercially serious.
            </p>

            {/* Stat strip */}
            <div ref={statsRef} className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-5 py-7 border-t border-stone-300/50 mb-8">
              {STATS.map((s, i) => (
                <div key={s.label} className="flex flex-col gap-0.5">
                  <span
                    id={`stat-${i}`}
                    className="font-serif font-bold text-3xl sm:text-4xl text-[#187E91] leading-none"
                  >
                    {s.value}{s.suffix}
                  </span>
                  <span className="text-xs sm:text-[13px] text-stone-500 font-medium">{s.label}</span>
                </div>
              ))}
            </div>

            <button className="self-start inline-flex items-center gap-2 border border-[#187E91]/60 text-[#187E91] hover:bg-[#187E91] hover:text-white font-semibold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-xs hover:shadow-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus:outline-none cursor-pointer">
              <span>Our Full Story</span>
              <ArrowRight size={14} className="stroke-[2.2]" />
            </button>
          </div>

          {/* Right: Image Collage */}
          <div className="relative h-[420px] sm:h-[500px] lg:h-[560px]">
            {/* Main large image */}
            <div className="about-img absolute top-0 left-0 right-[15%] h-[65%] rounded-[24px] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.14)]">
              <img
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=75"
                alt="Sustainable sourcing in India"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Bottom-left image */}
            <div className="about-img absolute bottom-0 left-0 w-[46%] h-[38%] rounded-[20px] overflow-hidden shadow-[0_6px_24px_rgba(0,0,0,0.12)] ring-4 ring-[#F3EFE6]" style={{ transform: 'rotate(-2deg)' }}>
              <img
                src="https://images.unsplash.com/photo-1472396961693-142e6e269027?w=600&q=75"
                alt="Artisan craftsman"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Bottom-right image */}
            <div className="about-img absolute bottom-0 right-0 w-[46%] h-[38%] rounded-[20px] overflow-hidden shadow-[0_6px_24px_rgba(0,0,0,0.12)] ring-4 ring-[#F3EFE6]" style={{ transform: 'rotate(1.5deg)' }}>
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=75"
                alt="Corporate sustainability session"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
