"use client";

import * as React from "react";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import type { EmblaOptionsType, EmblaPluginType } from "embla-carousel";
import { cn } from "@/lib/utils";

type CarouselApi = UseEmblaCarouselType[1];

interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  options?: EmblaOptionsType;
  opts?: EmblaOptionsType;
  plugins?: EmblaPluginType[];
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
}

interface CarouselContextProps {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  scrollTo: (index: number) => void;
  selectedIndex: number;
  scrollSnaps: number[];
  canScrollPrev: boolean;
  canScrollNext: boolean;
}

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

export function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}

export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      options,
      opts,
      plugins,
      orientation = "horizontal",
      setApi,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const emblaOptions = options || opts || {};
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...emblaOptions,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins
    );

    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

    const onSelect = React.useCallback((emblaApi: CarouselApi) => {
      if (!emblaApi) return;
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    }, []);

    const onInit = React.useCallback((emblaApi: CarouselApi) => {
      if (!emblaApi) return;
      setScrollSnaps(emblaApi.scrollSnapList());
    }, []);

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev();
    }, [api]);

    const scrollNext = React.useCallback(() => {
      api?.scrollNext();
    }, [api]);

    const scrollTo = React.useCallback(
      (index: number) => {
        api?.scrollTo(index);
      },
      [api]
    );

    React.useEffect(() => {
      if (!api || !setApi) return;
      setApi(api);
    }, [api, setApi]);

    React.useEffect(() => {
      if (!api) return;
      onInit(api);
      onSelect(api);
      api.on("reInit", onInit);
      api.on("reInit", onSelect);
      api.on("select", onSelect);

      return () => {
        api.off("select", onSelect);
      };
    }, [api, onInit, onSelect]);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api,
          scrollPrev,
          scrollNext,
          scrollTo,
          selectedIndex,
          scrollSnaps,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          className={cn("relative overflow-hidden", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = "Carousel";

export const SliderContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { carouselRef } = useCarousel();

  return (
    <div ref={carouselRef} className="overflow-hidden w-full">
      <div
        ref={ref}
        className={cn("flex touch-pan-y select-none", className)}
        {...props}
      />
    </div>
  );
});
SliderContainer.displayName = "SliderContainer";

export const Slider = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn("min-w-0 shrink-0 grow-0", className)}
      {...props}
    />
  );
});
Slider.displayName = "Slider";

interface SliderDotButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  index: number;
}

export const SliderDotButton = React.forwardRef<
  HTMLButtonElement,
  SliderDotButtonProps
>(({ index, className, ...props }, ref) => {
  const { selectedIndex, scrollTo } = useCarousel();
  const isActive = selectedIndex === index;

  return (
    <button
      ref={ref}
      type="button"
      role="tab"
      aria-selected={isActive}
      onClick={() => scrollTo(index)}
      className={cn(
        "h-2 rounded-full transition-all duration-300",
        isActive ? "w-6 bg-[#187E91]" : "w-2 bg-stone-300 hover:bg-stone-400",
        className
      )}
      {...props}
    />
  );
});
SliderDotButton.displayName = "SliderDotButton";

export default Carousel;
