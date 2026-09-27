import React from 'react';
import { ExternalLink, Newspaper, Award, Quote, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { BotanicalCornerSprig } from './BotanicalDecorations';

export default function PressBanner() {
  return (
    <section className="w-full bg-[#FAF8F3] py-12 sm:py-16 select-none border-t border-stone-200/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#1C2C24] via-[#16251E] to-[#0E1B15] text-white p-5 sm:p-12 md:p-14 border border-stone-800 shadow-2xl group">
          
          {/* Authentic Hand-Illustrated Botanical Branch Accent */}
          <BotanicalCornerSprig position="top-right" variant="sprig-2" className="opacity-75 scale-125" />

          {/* Ambient inner illumination */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#187E91]/20 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#244835]/30 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 sm:gap-10">

            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2.5 mb-4">
                <Badge variant="forest" className="bg-white/10 text-teal-300 border-white/15 px-3 py-1 text-xs uppercase tracking-wider font-semibold">
                  <Newspaper size={13} className="stroke-[2.2]" />
                  <span>Media Spotlight</span>
                </Badge>
                <span className="text-xs text-stone-400 font-medium">
                  Climatora • Climate Champions Editorial
                </span>
              </div>

              <h2 className="text-xl sm:text-3xl lg:text-4xl font-serif font-normal text-stone-100 leading-tight">
                "Sucheta Anchaliya: The Former Investment Banker Who Rebuilt Sustainable Sourcing From Scratch"
              </h2>

              <p className="mt-4 text-xs sm:text-sm md:text-base text-stone-300 leading-relaxed font-normal">
                After departing equity capital markets, Sucheta discovered the systemic flaws in retail sustainability: unverified claims, opaque suppliers, and zero reverse logistics. Today, Rayeva has onboarded 30+ verified circular brand partners pre-revenue.
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-stone-400">
                <span className="inline-flex items-center gap-1.5 text-teal-200">
                  <Award size={13} />
                  <span>Selected as India Climate Champion Feature</span>
                </span>
                <span className="hidden sm:inline">•</span>
                <span>Published on Climatora Sustainability Network</span>
              </div>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3 w-full sm:w-auto">
              <Button
                variant="default"
                size="lg"
                asChild
                className="gap-2 px-7 bg-[#187E91] hover:bg-[#136B7C] shadow-lg w-full sm:w-auto justify-center"
              >
                <a
                  href="https://climatora.com/climate-champions-details/28/sucheta-anchaliya-ditched-a-paper-bottle-idea-to-fix-four-broken-problems-instead"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Read Full Article</span>
                  <ExternalLink size={15} />
                </a>
              </Button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
