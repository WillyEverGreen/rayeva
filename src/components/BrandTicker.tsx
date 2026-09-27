import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const PARTNERS = [
  { name: 'Zerocircle',     logo: '/logos/zerocircle.svg' },
  { name: 'Green Hermitage', logo: '/logos/green-hermitage.png' },
  { name: 'Kadam Haat',     logo: '/logos/kadam-haat.png' },
  { name: 'Kheoni',         logo: '/logos/kheoni.png' },
  { name: 'Impact Water',   logo: '/logos/impact-water.png' },
  { name: 'Bahem',          logo: '/logos/bahem.png' },
  { name: 'Atovio',         logo: '/logos/atovio.png' },
  { name: 'Papaya Pads',    logo: '/logos/papaya.png' },
  { name: 'Natch Snacks',   logo: '/logos/natch.png' },
];

// Fallback text-only items if logo fails to load
function LogoItem({ partner }: { partner: typeof PARTNERS[0] }) {
  return (
    <div className="flex items-center justify-center px-8 sm:px-10 shrink-0">
      <img
        src={partner.logo}
        alt={partner.name}
        className="h-7 sm:h-8 max-w-[100px] sm:max-w-[120px] object-contain opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300 select-none"
        draggable={false}
        onError={(e) => {
          // Fallback: hide broken image, show text
          const target = e.currentTarget as HTMLImageElement;
          target.style.display = 'none';
          const sibling = target.nextElementSibling as HTMLElement;
          if (sibling) sibling.style.display = 'flex';
        }}
      />
      <span
        className="hidden items-center text-xs sm:text-[13px] font-semibold text-stone-400 tracking-tight whitespace-nowrap"
      >
        {partner.name}
      </span>
    </div>
  );
}

export default function BrandTicker() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);
  const tweenRef   = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!trackRef.current) return;
    tweenRef.current = gsap.to(trackRef.current, {
      xPercent: -50,
      duration: 24,
      ease: 'none',
      repeat: -1,
    });

    const wrapper = wrapperRef.current;
    if (wrapper) {
      const pause = () => tweenRef.current?.pause();
      const play  = () => tweenRef.current?.play();
      wrapper.addEventListener('mouseenter', pause);
      wrapper.addEventListener('mouseleave', play);
      return () => {
        wrapper.removeEventListener('mouseenter', pause);
        wrapper.removeEventListener('mouseleave', play);
        tweenRef.current?.kill();
      };
    }
  }, []);

  // Duplicate array for seamless loop
  const doubled = [...PARTNERS, ...PARTNERS];

  return (
    <div className="w-full bg-[#FBF9F5] border-y border-stone-200/80 py-5 sm:py-6 overflow-hidden select-none">

      {/* Scrolling track */}
      <div ref={wrapperRef} className="relative w-full overflow-hidden">
        {/* Fade masks on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-[#FBF9F5] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-[#FBF9F5] to-transparent z-10 pointer-events-none" />

        <div ref={trackRef} className="flex items-center w-max">
          {doubled.map((p, i) => (
            <LogoItem key={`${p.name}-${i}`} partner={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
