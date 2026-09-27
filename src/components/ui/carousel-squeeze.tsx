"use client";

import React, {
    forwardRef,
    useCallback,
    useEffect,
    useId,
    useImperativeHandle,
    useLayoutEffect,
    useRef,
    useState,
    type ComponentProps,
    type CSSProperties,
    type KeyboardEvent,
    type ReactNode,
} from "react";

import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*                                   slides                                   */
/* -------------------------------------------------------------------------- */

export type SqueezeSlide = {
    /** Stable key. Falls back to the position in the array. */
    id?: string | number;
    /** The dark opening line under the panels. */
    title: string;
    /** The grey sentence that runs on from the title. */
    description?: string;
    /** Picture for the panel. It crops from the middle as the panel narrows. */
    image?: string;
    /** Alt text for that picture. Leave it out and the picture reads as decoration. */
    imageAlt?: string;
    /** Any CSS background: a gradient, a colour, layers. Used when there is no picture. */
    background?: string;
    /** Sits in the corner of the open panel: a wordmark, a logo, a caption. */
    overlay?: ReactNode;
    /** Text on the button. No text, no button. */
    action?: string;
    /** Where the button goes. */
    href?: string;
    /** Opens the link in a new tab. */
    target?: string;
    /** Runs instead of following `href`. */
    onAction?: () => void;
    /** Lucide or custom icon node for the sector badge. */
    icon?: ReactNode;
    /** Category index / badge (e.g. "SECTOR 01 • VERIFIED"). */
    categoryBadge?: string;
    /** Sub-ranges or scope tags for rich hover tooltip and panel view. */
    scopeTags?: string[];
    /** Eco-certifications associated with this sector. */
    certifications?: string[];
    /** Custom hover info component if desired. */
    hoverInfo?: ReactNode;
};

/* -------------------------------------------------------------------------- */
/*                                  geometry                                  */
/* -------------------------------------------------------------------------- */

type Size = number | string;

const size = (value: Size) => (typeof value === "number" ? `${value}px` : value);

const clamp = (value: number, low: number, high: number) =>
    Math.max(low, Math.min(high, value));

const SHARES = [-0.06, 0.61, 0.3, 0.15];
const STRETCHED = [0, 0.71, 0.4, 0.25];
const SQUEEZED = [-0.12, 0.59, 0.28, 0.13];

type Card = { key: number; slide: number };

export interface SqueezeCarouselRef {
    go: (index: number) => void;
    step: (by: number) => void;
}

/* -------------------------------------------------------------------------- */
/*                                    hooks                                   */
/* -------------------------------------------------------------------------- */

function useReducedMotion(): boolean {
    const [reduced, setReduced] = useState(false);

    useEffect(() => {
        const query = window.matchMedia("(prefers-reduced-motion: reduce)");
        const read = () => setReduced(query.matches);
        read();
        query.addEventListener("change", read);
        return () => query.removeEventListener("change", read);
    }, []);

    return reduced;
}

/* -------------------------------------------------------------------------- */
/*                                 component                                  */
/* -------------------------------------------------------------------------- */

export type SqueezeCarouselProps = {
    /** The panels, in the order they are read. */
    slides: SqueezeSlide[];
    /** Which panel starts open. Default `0`. */
    defaultIndex?: number;
    /** Called with the panel that just opened. */
    onIndexChange?: (index: number) => void;
    /** Height of the row. Default `clamp(260px, 36cqi, 420px)`. */
    height?: Size;
    /** Width of a slat in the tail. Default `10`. */
    slatWidth?: Size;
    /** Space between slats. Default `8`. */
    slatGap?: Size;
    /** Space between the four columns. Default `16`. */
    gap?: Size;
    /** Corner rounding on a panel. Default `20`. */
    radius?: Size;
    /** Milliseconds the slide takes. Default `750`. */
    duration?: number;
    /** Widen the panel under the pointer. Default `true`. */
    hoverGrow?: boolean;
    /** Step on by itself. Default `false`. */
    autoplay?: boolean;
    /** Milliseconds a panel stays open under autoplay. Default `6000`. */
    interval?: number;
    /** Show the two arrow buttons. Default `true`. */
    controls?: boolean;
    /** Fill behind the button, the arrows and the focus ring. */
    accent?: string;
    /** What sits on top of that fill: the label and the arrow heads. */
    accentForeground?: string;
    /** What a screen reader calls the carousel. Default `"Featured"`. */
    label?: string;
    /** Extra classes for a single panel. */
    panelClassName?: string;
} & Omit<ComponentProps<"div">, "onSelect">;

export const SqueezeCarousel = forwardRef<SqueezeCarouselRef, SqueezeCarouselProps>(
    function SqueezeCarousel(
        {
            slides,
            defaultIndex = 0,
            onIndexChange,
            height = "clamp(260px, 36cqi, 420px)",
            slatWidth = 10,
            slatGap = 8,
            gap = 16,
            radius = 20,
            duration = 750,
            hoverGrow = true,
            autoplay = false,
            interval = 6000,
            controls = true,
            accent = "#187E91",
            accentForeground = "#ffffff",
            label = "Explore Sectors",
            panelClassName,
            className,
            style,
            ...props
        },
        ref
    ) {
        const count = slides.length;
        const wrap = useCallback((i: number) => ((i % count) + count) % count, [count]);

        const slats = clamp(count - 4, 1, 4);
        const visible = 4 + slats;

        const reduced = useReducedMotion();
        const ms = reduced ? 0 : duration;

        const ids = useId();
        const seed = useRef(0);
        const strip = useRef<HTMLDivElement>(null);
        const isAnimatingRef = useRef(false);

        /* --- the strip -------------------------------------------------------- */

        const window0 = useCallback(
            () =>
                Array.from({ length: visible }, (_, p) => ({
                    key: seed.current++,
                    slide: wrap(defaultIndex + p),
                })),
            [defaultIndex, visible, wrap]
        );

        const [cards, setCards] = useState<Card[]>(window0);
        const [column, setColumn] = useState(0);
        const columnRef = useRef(0);
        const forward = useRef(true);
        const [slid, setSlid] = useState(0);
        const [still, setStill] = useState(false);
        const [hover, setHover] = useState(-1);

        const open = cards[-column]?.slide ?? defaultIndex;
        const timers = useRef<number[]>([]);

        useEffect(() => () => timers.current.forEach(clearTimeout), []);

        const settle = useCallback(() => {
            setCards((stripCards) => {
                const sliceCount = Math.min(stripCards.length, visible);
                return forward.current
                    ? stripCards.slice(-sliceCount)
                    : stripCards.slice(0, sliceCount);
            });
            columnRef.current = 0;
            setColumn(0);
            setSlid(0);
            setStill(true);
            isAnimatingRef.current = false;
        }, [visible]);

        useLayoutEffect(() => {
            if (!still) return;
            const id = requestAnimationFrame(() => setStill(false));
            return () => cancelAnimationFrame(id);
        }, [still]);

        const step = useCallback(
            (by: number) => {
                if (count < 2 || by === 0) return;

                timers.current.forEach(clearTimeout);
                timers.current = [];

                if (isAnimatingRef.current) {
                    settle();
                }
                isAnimatingRef.current = true;
                forward.current = by > 0;

                const stepAmount = Math.abs(by);

                if (by > 0) {
                    setCards((stripCards) => {
                        const lastSlide = stripCards[stripCards.length - 1]?.slide ?? 0;
                        const newCards = Array.from({ length: stepAmount }, (_, k) => ({
                            key: seed.current++,
                            slide: wrap(lastSlide + 1 + k),
                        }));
                        return [...stripCards, ...newCards];
                    });
                    columnRef.current -= by;
                    setColumn(columnRef.current);
                    setSlid((s) => s - by);
                } else {
                    setCards((stripCards) => {
                        const firstSlide = stripCards[0]?.slide ?? 0;
                        const newCards = Array.from({ length: stepAmount }, (_, k) => ({
                            key: seed.current++,
                            slide: wrap(firstSlide - (stepAmount - k)),
                        }));
                        return [...newCards, ...stripCards];
                    });
                    setSlid((s) => s + by);
                    setStill(true);
                    timers.current.push(window.setTimeout(() => setSlid(0), 16));
                }

                timers.current.push(window.setTimeout(settle, ms + 25));
            },
            [count, ms, settle, wrap]
        );

        const go = useCallback(
            (to: number) => {
                const here = open;
                if (to === here) return;
                const forwardDelta = wrap(to - here);
                step(forwardDelta <= count / 2 ? forwardDelta : forwardDelta - count);
            },
            [open, count, step, wrap]
        );

        useImperativeHandle(
            ref,
            () => ({
                go,
                step,
            }),
            [go, step]
        );

        useEffect(() => {
            onIndexChange?.(open);
        }, [open, onIndexChange]);

        /* --- autoplay --------------------------------------------------------- */

        const [paused, setPaused] = useState(false);

        useEffect(() => {
            if (!autoplay || paused || reduced || count < 2) return;
            const timer = window.setTimeout(() => step(1), interval);
            return () => clearTimeout(timer);
        }, [autoplay, paused, reduced, count, open, interval, step]);

        /* --- keyboard --------------------------------------------------------- */

        const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
            const moves: Record<string, number | undefined> = { ArrowRight: 1, ArrowLeft: -1 };
            const by = moves[event.key];
            if (by === undefined) return;
            event.preventDefault();
            step(by);
        };

        if (!count) return null;

        /* --- render sizing ---------------------------------------------------- */

        const slat = size(slatWidth);
        const shares = hoverGrow && hover >= 0 && hover <= 3 && !reduced ? null : SHARES;

        const shareOf = (col: number) => {
            if (shares) return SHARES[col];
            return hover === col ? STRETCHED[col] : SQUEEZED[col];
        };

        const widthOf = (col: number) => {
            if (col < 0 || col > 3) return slat;
            if (col === 0) return `calc(var(--sq-hero) + var(--sq-room) * ${shareOf(0)})`;
            return `calc(var(--sq-room) * ${shareOf(col)})`;
        };

        // Buttery smooth cubic-bezier curve (Apple spring-like easeOutCubic)
        const vars = {
            "--sq-h": size(height),
            "--sq-gap": size(gap),
            "--sq-slat-gap": size(slatGap),
            "--sq-radius": size(radius),
            "--sq-ms": `${ms}ms`,
            "--sq-ease": "cubic-bezier(0.22, 1, 0.36, 1)",
            "--sq-fill": accent,
            "--sq-on-fill": accentForeground,
            "--sq-hero": "calc(var(--sq-h) * 16 / 10)",
            "--sq-room": `calc(100cqi - var(--sq-hero) - ${
                slats
            } * var(--sq-slat-gap) - 3 * var(--sq-gap) - ${slats} * ${slat})`,
        } as CSSProperties;

        const move = `translate3d(calc(${slid} * (${slat} + var(--sq-gap))), 0, 0)`;

        return (
            <div
                className={cn("flex w-full flex-col select-none", className)}
                style={{
                    containerType: "inline-size",
                    ...vars,
                    ...style,
                }}
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => {
                    setPaused(false);
                    setHover(-1);
                }}
                onFocusCapture={() => setPaused(true)}
                onBlurCapture={() => setPaused(false)}
                {...props}
            >
                {/* Header Controls */}
                {controls && count > 1 && (
                    <div className="mb-4 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-stone-500">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#187E91] animate-pulse" />
                            <span>Sector {String(open + 1).padStart(2, "0")} of {String(count).padStart(2, "0")}</span>
                            <span className="hidden sm:inline text-stone-400 font-normal">• Hover panels to preview scope</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Arrow back label="Previous Sector" onClick={() => step(-1)} />
                            <Arrow label="Next Sector" onClick={() => step(1)} />
                        </div>
                    </div>
                )}

                {/* Squeeze Carousel Strip */}
                <div
                    className="w-full overflow-hidden rounded-[24px] sm:rounded-[28px] border border-stone-200/80 shadow-sm bg-stone-900/5 p-1.5"
                    style={{ height: "calc(var(--sq-h) + 12px)" }}
                >
                    <div
                        ref={strip}
                        role="tablist"
                        aria-label={label}
                        aria-orientation="horizontal"
                        onKeyDown={onKeyDown}
                        className="flex h-full w-max items-center will-change-transform"
                        style={{
                            transform: move,
                            transition: still ? "none" : `transform var(--sq-ms) var(--sq-ease)`,
                        }}
                    >
                        {cards.map((card, place) => {
                            const col = place + column;
                            const slide = slides[card.slide];
                            if (!slide) return null;
                            const front = col === 0;
                            const isHovered = hover === col;

                            return (
                                <button
                                    key={card.key}
                                    type="button"
                                    role="tab"
                                    id={`${ids}-tab-${card.key}`}
                                    aria-selected={front}
                                    aria-controls={`${ids}-panel`}
                                    aria-label={slide.title}
                                    tabIndex={front ? 0 : -1}
                                    onMouseEnter={() => {
                                        if (hoverGrow && hover !== col) {
                                            setHover(col);
                                        }
                                    }}
                                    onClick={() => col > 0 && step(col)}
                                    className={cn(
                                        "relative isolate h-full shrink-0 cursor-pointer overflow-hidden bg-stone-900 p-0 text-left group",
                                        "outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                                        "focus-visible:ring-[#187E91] focus-visible:ring-offset-background will-change-[width,margin-left]",
                                        panelClassName
                                    )}
                                    style={{
                                        width: widthOf(col),
                                        marginLeft:
                                            place === 0
                                                ? 0
                                                : col < 4
                                                ? "var(--sq-gap)"
                                                : "var(--sq-slat-gap)",
                                        borderRadius: `min(var(--sq-radius), calc(${widthOf(col)} / 2))`,
                                        transform: "translate3d(0, 0, 0)",
                                        backfaceVisibility: "hidden",
                                        WebkitBackfaceVisibility: "hidden",
                                        transitionProperty: "width, margin-left",
                                        transitionDuration: still ? "0s" : hover >= 0 ? "420ms" : "var(--sq-ms)",
                                        transitionTimingFunction: "var(--sq-ease)",
                                    }}
                                >
                                    <Picture slide={slide} />

                                    {/* Smooth dark vignette */}
                                    <div
                                        className={cn(
                                            "pointer-events-none absolute inset-0 transition-opacity duration-400 ease-out",
                                            front
                                                ? "bg-gradient-to-t from-black/90 via-black/35 to-black/10 opacity-100"
                                                : isHovered
                                                ? "bg-gradient-to-t from-black/85 via-black/40 to-transparent opacity-95"
                                                : "bg-black/25 opacity-70 group-hover:opacity-40"
                                        )}
                                    />

                                    {/* Top-Left Sector Icon Badge */}
                                    {slide.icon && (
                                        <div
                                            className={cn(
                                                "pointer-events-none absolute top-3.5 left-3.5 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 backdrop-blur-md text-slate-900 flex items-center justify-center shadow-md transition-all duration-350 ease-out",
                                                front || (isHovered && col < 4)
                                                    ? "opacity-100 scale-100 translate-y-0"
                                                    : "opacity-0 scale-75 -translate-y-1"
                                            )}
                                        >
                                            {slide.icon}
                                        </div>
                                    )}

                                    {/* Top-Right Category Badge */}
                                    {slide.categoryBadge && (
                                        <div
                                            className={cn(
                                                "pointer-events-none absolute top-3.5 right-3.5 z-20 px-3 py-1 rounded-full bg-black/65 backdrop-blur-md text-white/95 text-[11px] font-semibold tracking-wider transition-all duration-350 ease-out border border-white/10 shadow-xs",
                                                front || (isHovered && col < 4)
                                                    ? "opacity-100 translate-y-0 scale-100"
                                                    : "opacity-0 -translate-y-1 scale-95"
                                            )}
                                        >
                                            {slide.categoryBadge}
                                        </div>
                                    )}

                                    {/* Front Hero Card Overlay */}
                                    {front && (
                                        <div
                                            className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6 lg:p-7 flex flex-col justify-end"
                                            style={{
                                                transition: `opacity 400ms var(--sq-ease)`,
                                            }}
                                        >
                                            {slide.overlay ? (
                                                slide.overlay
                                            ) : (
                                                <div className="flex items-end justify-between gap-4">
                                                    <div className="min-w-0 flex-1">
                                                        <span className="inline-block text-[11px] font-bold tracking-widest text-emerald-300 uppercase mb-1 drop-shadow-xs">
                                                            Curated Sector Showcase
                                                        </span>
                                                        <h3 className="font-serif text-xl sm:text-2xl lg:text-[28px] font-medium text-white tracking-tight leading-snug drop-shadow-sm">
                                                            {slide.title}
                                                        </h3>
                                                        {slide.description && (
                                                            <p className="text-xs sm:text-sm text-stone-200/95 leading-relaxed mt-1.5 font-normal line-clamp-2 max-w-xl drop-shadow-xs">
                                                                {slide.description}
                                                            </p>
                                                        )}

                                                        {slide.scopeTags && slide.scopeTags.length > 0 && (
                                                            <div className="hidden sm:flex flex-wrap gap-1.5 mt-3">
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
                                                    </div>

                                                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white text-stone-900 group-hover:bg-[#187E91] group-hover:text-white flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-105 active:scale-95 shrink-0">
                                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                                                            <path d="M6.4 2.6l4.5 4.5H1.8v1.8h9.1l-4.5 4.5 1.2 1.2 6-6 .6-.6-.6-.6-6-6-1.2 1.2Z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Hover Info Card on Squeezed Columns (col 1, 2, 3) */}
                                    {!front && col < 4 && (
                                        <div
                                            className={cn(
                                                "pointer-events-none absolute inset-x-2.5 bottom-3.5 z-20 p-3.5 rounded-xl bg-black/85 backdrop-blur-md border border-white/20 text-white shadow-2xl transition-all duration-300 ease-out flex flex-col gap-1.5",
                                                isHovered
                                                    ? "opacity-100 translate-y-0 scale-100"
                                                    : "opacity-0 translate-y-2.5 scale-95"
                                            )}
                                        >
                                            <div className="flex items-center justify-between gap-1 text-[10px] uppercase font-bold tracking-wider text-emerald-400">
                                                <span>Click to Expand</span>
                                                <span>→</span>
                                            </div>
                                            <div className="font-serif text-sm font-semibold text-white leading-tight line-clamp-1">
                                                {slide.title}
                                            </div>
                                            {slide.description && (
                                                <div className="text-[11px] text-stone-300 line-clamp-2 leading-snug font-normal">
                                                    {slide.description}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Bottom Sector Details Panel */}
                <div id={`${ids}-panel`} role="tabpanel" aria-live="polite" className="mt-6 grid sm:mt-7">
                    {slides.map((slide, i) => {
                        const shown = i === open;

                        return (
                            <div
                                key={slide.id ?? i}
                                aria-hidden={!shown}
                                className={cn(
                                    "col-start-1 row-start-1 flex flex-col gap-5 lg:gap-8",
                                    "lg:flex-row lg:items-start lg:justify-between"
                                )}
                                style={{
                                    opacity: shown ? 1 : 0,
                                    visibility: shown ? "visible" : "hidden",
                                    pointerEvents: shown ? "auto" : "none",
                                    transition: `opacity 450ms var(--sq-ease), visibility 450ms`,
                                }}
                            >
                                <div className="flex-1 max-w-3xl">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-[11px] font-bold tracking-widest text-[#187E91] uppercase bg-[#E3EFE7] px-3 py-1 rounded-full">
                                            Verified Sector Scope
                                        </span>
                                        {slide.categoryBadge && (
                                            <span className="text-xs text-stone-500 font-medium">
                                                {slide.categoryBadge}
                                            </span>
                                        )}
                                    </div>

                                    <h4 className="text-xl sm:text-2xl font-serif font-normal text-slate-900 tracking-tight">
                                        {slide.title}
                                    </h4>

                                    <p className="mt-2 text-sm sm:text-[15px] text-stone-600 leading-relaxed font-normal">
                                        {slide.description}
                                    </p>

                                    {slide.scopeTags && slide.scopeTags.length > 0 && (
                                        <div className="mt-4 flex flex-wrap items-center gap-2">
                                            <span className="text-xs font-semibold text-stone-500 mr-1">Product Scope:</span>
                                            {slide.scopeTags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-3 py-1 rounded-full bg-white text-stone-800 text-xs font-medium border border-stone-200/90 shadow-2xs"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {slide.certifications && slide.certifications.length > 0 && (
                                        <div className="mt-3 flex flex-wrap items-center gap-2">
                                            <span className="text-xs font-semibold text-emerald-800 mr-1 flex items-center gap-1">
                                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                                                    <path d="m9 12 2 2 4-4" />
                                                </svg>
                                                Audited Standards:
                                            </span>
                                            {slide.certifications.map((cert) => (
                                                <span
                                                    key={cert}
                                                    className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-900 text-[11px] font-semibold border border-emerald-200/70"
                                                >
                                                    {cert}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-3 shrink-0 pt-1">
                                    {slide.action && <Action slide={slide} shown={shown} />}
                                    <span className="text-[11px] text-stone-500 font-medium">
                                        100% Verified Sustainability • Rayeva Certified
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
);

/* -------------------------------------------------------------------------- */
/*                                   pieces                                   */
/* -------------------------------------------------------------------------- */

function Picture({ slide }: { slide: SqueezeSlide }) {
    const box = {
        width: "var(--sq-hero)",
        minWidth: "100%",
    } as const;

    if (slide.image) {
        return (
            <img
                src={slide.image}
                alt={slide.imageAlt ?? slide.title}
                draggable={false}
                className="absolute inset-y-0 left-1/2 h-full max-w-none object-cover object-center pointer-events-none select-none will-change-transform"
                style={{
                    ...box,
                    transform: "translate3d(-50%, 0, 0)",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                }}
            />
        );
    }

    return (
        <span
            aria-hidden="true"
            className="absolute inset-y-0 left-1/2 will-change-transform"
            style={{
                background: slide.background ?? "#1b2e25",
                ...box,
                transform: "translate3d(-50%, 0, 0)",
            }}
        />
    );
}

function Arrow({
    back = false,
    label,
    onClick,
}: {
    back?: boolean;
    label: string;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            aria-label={label}
            onClick={onClick}
            className={cn(
                "grid size-9 sm:size-10 cursor-pointer place-items-center rounded-full",
                "bg-white text-stone-800 border border-stone-200 shadow-2xs",
                "transition-all duration-200 hover:bg-[#187E91] hover:text-white hover:border-[#187E91] outline-none",
                "focus-visible:ring-2 focus-visible:ring-[#187E91]",
                "focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-95"
            )}
        >
            <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path
                    d={
                        back
                            ? "M9.6 2.6 5.1 7.1h9.1v1.8H5.1l4.5 4.5-1.2 1.2-6-6L1.8 8l.6-.6 6-6 1.2 1.2Z"
                            : "M6.4 2.6l4.5 4.5H1.8v1.8h9.1l-4.5 4.5 1.2 1.2 6-6 .6-.6-.6-.6-6-6-1.2 1.2Z"
                    }
                />
            </svg>
        </button>
    );
}

function Action({ slide, shown }: { slide: SqueezeSlide; shown: boolean }) {
    const inside = (
        <>
            <span>{slide.action}</span>
            <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
                className="transition-transform duration-200 group-hover/sq-action:translate-x-1"
            >
                <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </>
    );

    const dress = cn(
        "group/sq-action inline-flex shrink-0 cursor-pointer items-center gap-2.5 rounded-xl",
        "bg-[#187E91] hover:bg-[#136B7C] px-6 py-3 text-sm font-semibold text-white",
        "shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 outline-none",
        "focus-visible:ring-2 focus-visible:ring-[#187E91]",
        "focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-95"
    );

    if (slide.href) {
        return (
            <a
                href={slide.href}
                target={slide.target}
                rel={slide.target === "_blank" ? "noreferrer" : undefined}
                tabIndex={shown ? 0 : -1}
                onClick={slide.onAction}
                className={dress}
            >
                {inside}
            </a>
        );
    }

    return (
        <button type="button" tabIndex={shown ? 0 : -1} onClick={slide.onAction} className={dress}>
            {inside}
        </button>
    );
}

export default SqueezeCarousel;
