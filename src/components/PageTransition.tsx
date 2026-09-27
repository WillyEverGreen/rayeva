import React, { forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// Register gsap with @gsap/react
gsap.registerPlugin(useGSAP);

export interface PageTransitionProps {
  barCount?: number;
  colors?: string[];
  duration?: number;
  stagger?: number;
  title?: string | null;
}

export interface PageTransitionHandle {
  triggerCover: (onCovered: () => void, onComplete: () => void) => void;
}

const PageTransition = forwardRef<PageTransitionHandle, PageTransitionProps>(
  (
    {
      barCount: defaultBarCount = 7,
      colors = ['#25A8BE', '#187E91', '#28B6CC', '#136B7C'],
      duration = 0.58,
      stagger = 0.055,
      title = null,
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const barsRef = useRef<(HTMLDivElement | null)[]>([]);
    const logoRef = useRef<HTMLDivElement>(null);
    const fadeOverlayRef = useRef<HTMLDivElement>(null);

    // Responsive bar count (5 on mobile, default on desktop)
    const [barCount, setBarCount] = useState(defaultBarCount);
    const [isMounted, setIsMounted] = useState(false);
    const [isBusy, setIsBusy] = useState(false);

    useEffect(() => {
      setIsMounted(true);
      const updateCount = () => {
        if (window.innerWidth < 768) {
          setBarCount(Math.min(5, defaultBarCount));
        } else {
          setBarCount(defaultBarCount);
        }
      };

      updateCount();
      window.addEventListener('resize', updateCount);
      return () => window.removeEventListener('resize', updateCount);
    }, [defaultBarCount]);

    // Imperative trigger method for TransitionProvider
    useImperativeHandle(ref, () => ({
      triggerCover: (onCovered: () => void, onComplete: () => void) => {
        if (!containerRef.current) {
          onCovered();
          onComplete();
          return;
        }

        // Check prefers-reduced-motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        setIsBusy(true);

        if (prefersReducedMotion) {
          // Fallback: Elegant 200ms opacity cross-fade
          const fadeEl = fadeOverlayRef.current;
          if (!fadeEl) {
            onCovered();
            onComplete();
            setIsBusy(false);
            return;
          }

          const tl = gsap.timeline({
            onComplete: () => {
              setIsBusy(false);
              onComplete();
            },
          });

          tl.set(containerRef.current, { pointerEvents: 'all' })
            .to(fadeEl, { opacity: 1, duration: 0.15, ease: 'power1.inOut' })
            .call(onCovered)
            .to(fadeEl, { opacity: 0, duration: 0.15, ease: 'power1.inOut' })
            .set(containerRef.current, { pointerEvents: 'none' });

          return;
        }

        const validBars = barsRef.current.filter((b): b is HTMLDivElement => b !== null);
        const logoEl = logoRef.current;

        // Reset and lock pointer-events
        gsap.set(containerRef.current, { pointerEvents: 'all' });
        gsap.set(validBars, {
          transformOrigin: 'bottom center',
          scaleY: 0,
        });
        if (logoEl) {
          gsap.set(logoEl, { opacity: 0, scale: 0.92 });
        }

        // Master Timeline: Cover -> Swap & Scroll -> Reveal
        const masterTl = gsap.timeline({
          onComplete: () => {
            gsap.set(containerRef.current, { pointerEvents: 'none' });
            setIsBusy(false);
            onComplete();
          },
        });

        // 1. Cover Phase: Bars scale up from bottom (scaleY: 0 -> 1)
        masterTl.to(validBars, {
          scaleY: 1,
          duration: duration,
          stagger: {
            each: stagger,
            from: 'start',
          },
          ease: 'power4.inOut',
        });

        // Logo subtle entrance while covered
        if (logoEl) {
          masterTl.to(
            logoEl,
            {
              opacity: 1,
              scale: 1,
              duration: 0.22,
              ease: 'power2.out',
            },
            `-=${duration * 0.4}`
          );
        }

        // 2. Center Pivot: Execute onCovered (route swap, scroll to top)
        masterTl.call(() => {
          onCovered();
        });

        // Logo exit before reveal
        if (logoEl) {
          masterTl.to(logoEl, {
            opacity: 0,
            scale: 1.05,
            duration: 0.18,
            ease: 'power2.in',
          });
        }

        // 3. Reveal Phase: Switch transform-origin to top, scale down (scaleY: 1 -> 0)
        masterTl
          .set(validBars, {
            transformOrigin: 'top center',
          })
          .to(validBars, {
            scaleY: 0,
            duration: duration,
            stagger: {
              each: stagger,
              from: 'start',
            },
            ease: 'power4.inOut',
          });
      },
    }));

    if (!isMounted) return null;

    // Render directly into document.body via Portal to prevent any ancestor distortion
    return createPortal(
      <div
        ref={containerRef}
        aria-hidden={!isBusy}
        className="fixed inset-0 z-[99999] pointer-events-none select-none flex w-screen h-[100dvh] overflow-hidden"
        style={{
          // 100dvh prevents mobile browser URL bar resizing jumps
          height: '100dvh',
        }}
      >
        {/* Reduced motion fade overlay */}
        <div
          ref={fadeOverlayRef}
          className="absolute inset-0 bg-[#25A8BE] opacity-0 pointer-events-none z-10"
        />

        {/* Center Brand Badge during cover */}
        <div
          ref={logoRef}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none opacity-0"
        >
          <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/15 backdrop-blur-md border border-white/25 shadow-2xl">
            <img
              src="/rayeva_logo.png"
              alt="Rayeva Logo"
              className="h-8 w-auto object-contain brightness-0 invert"
            />
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-white font-sans">
              Rayeva
            </span>
          </div>
          {title && (
            <p className="mt-3 text-xs sm:text-sm font-semibold tracking-widest uppercase text-cyan-100">
              {title}
            </p>
          )}
        </div>

        {/* Vertical Staggered Curtain Bars (Overlapped by 2px to guarantee zero hairline gaps) */}
        {Array.from({ length: barCount }).map((_, i) => {
          const barColor = colors[i % colors.length];
          return (
            <div
              key={i}
              ref={(el) => {
                barsRef.current[i] = el;
              }}
              className="h-full shrink-0 origin-bottom will-change-transform"
              style={{
                backgroundColor: barColor,
                width: `calc(100% / ${barCount} + 2px)`,
                marginLeft: i === 0 ? '0px' : '-1px',
                transform: 'scaleY(0)',
              }}
            />
          );
        })}
      </div>,
      document.body
    );
  }
);

PageTransition.displayName = 'PageTransition';

export default PageTransition;
