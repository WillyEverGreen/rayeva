import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { TransitionProvider } from './context/TransitionContext';
import Navbar from './components/Navbar';
import HeroContent from './components/HeroContent';
import CategoriesSection from './components/CategoriesSection.tsx';
import CategoryMarquee from './components/CategoryMarquee.tsx';
import TrendingProductsSection from './components/TrendingProductsSection.tsx';
import ImpactAndCircularitySection from './components/ImpactAndCircularitySection.tsx';
import BrandSelectionRadar from './components/BrandSelectionRadar.tsx';
import IndividualCalculatorSection from './components/IndividualCalculatorSection.tsx';
import StarterKitAndPartners from './components/StarterKitAndPartners.tsx';
import InsightsAndTagWave from './components/InsightsAndTagWave.tsx';
import OurMissionSection from './components/OurMissionSection.tsx';
import JourneyAndCampaigns from './components/JourneyAndCampaigns.tsx';
import TestimonialsAndAboutUs from './components/TestimonialsAndAboutUs.tsx';
import PressBanner from './components/PressBanner.tsx';
import JoinAndPartnerSection from './components/JoinAndPartnerSection.tsx';
import Footer from './components/Footer.tsx';
import AmbientSporeCanvas from './components/canvas/AmbientSporeCanvas.tsx';
import { BotanicalHorizontalDivider } from './components/svg/BotanicalFlourish.tsx';
import {
  BotanicalVineDivider,
  BotanicalLandscapeDivider,
} from './components/BotanicalDecorations';
import SmoothScroll from './components/SmoothScroll';
import RouteTransition from './components/RouteTransition';
import CalculatorPage from './pages/CalculatorPage';
import heroVideo from './assets/hero.mp4';
import heroPoster from './assets/hero-bg.jpg';

function HomePage() {
  return (
    <main className="w-full min-h-screen bg-[#FAF8F3] relative overflow-x-hidden">
      {/* 1. Navbar: transparent with no border on hero, turns glassmorphic on scroll past hero */}
      <Navbar />

      {/* 2. Hero: Our cinematic video hero - 100vh on mobile, 120vh on desktop */}
      <section
        id="hero"
        className="relative w-full h-screen sm:h-[120vh] sm:min-h-[120vh] overflow-hidden flex flex-col items-center justify-start pt-24 sm:pt-36 lg:pt-44"
      >
        <video
          key="hero-video"
          autoPlay
          loop
          muted
          playsInline
          poster={heroPoster}
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
        >
          <source src={heroVideo} type="video/mp4" />
          <source src="/hero.mp4" type="video/mp4" />
        </video>

        {/* Dynamic Botanical Ambient Spores Canvas */}
        <AmbientSporeCanvas particleCount={36} speed={0.4} />

        <HeroContent />

        {/* Gentle meadow-to-page gradient blend */}
        <div className="absolute bottom-0 inset-x-0 h-16 sm:h-24 bg-gradient-to-t from-[#FAF8F3] via-[#FAF8F3]/50 to-transparent pointer-events-none" />
      </section>

      {/* Breathable gap between Hero and Second Page */}
      <div className="w-full h-8 sm:h-12 lg:h-16 bg-[#FAF8F3]" aria-hidden="true" />

      {/* 3. Categories (Our Second Page): Curated Collections & 9-Sector Accordions */}
      <CategoriesSection />

      {/* Minimalist Botanical Sprout Divider */}
      <BotanicalVineDivider variant="sprout" maxWidth={760} className="my-4 sm:my-8" />

      {/* 4. Category Marquee Ticker: Horizontal infinite scrolling ribbon */}
      <CategoryMarquee />

      {/* 5. Trending Sustainable Products: Acne Clarifying Gel, Cybele, Himalayan Makhana */}
      <TrendingProductsSection />

      {/* Hand-Illustrated Daisy & Rule Divider */}
      <BotanicalVineDivider variant="daisy" maxWidth={880} className="my-6 sm:my-10" />

      {/* 6. Our Impact: All-Access Platform + Plastic Crisis & Interactive Tree */}
      <ImpactAndCircularitySection />

      {/* Hand-Illustrated Botanical Scrollwork Divider */}
      <BotanicalVineDivider variant="scrollwork" maxWidth={880} className="my-6 sm:my-10" />

      {/* 7. How We Choose a Brand: Selection Criteria + 6-Node Circular Orbital Radar */}
      <BrandSelectionRadar />

      {/* Minimalist Botanical Sprout Divider */}
      <BotanicalVineDivider variant="sprout" maxWidth={760} className="my-4 sm:my-8" />

      {/* 8. Individual AI Carbon Calculator (Module 02 Integration) */}
      <IndividualCalculatorSection />

      {/* Hand-Illustrated Jasmine Vine Divider */}
      <BotanicalVineDivider variant="jasmine" maxWidth={880} className="my-6 sm:my-10" />

      {/* 9. Starter Kit & Brand Partners: Begin Your Journey Kit + Partners Carousel */}
      <StarterKitAndPartners />

      {/* Minimalist Botanical Sprout Divider */}
      <BotanicalVineDivider variant="sprout" maxWidth={760} className="my-4 sm:my-8" />

      {/* 10. Insights & Attribute Tags Wave: Insights Header + 16 Floating Ethical Badges */}
      <InsightsAndTagWave />

      {/* 11. Our Mission: Video Modal Player + Why We Do? What We Do ? */}
      <OurMissionSection />

      {/* Hand-Illustrated Daisy & Botanical Rule Divider */}
      <BotanicalVineDivider variant="daisy" maxWidth={880} className="my-6 sm:my-10" />

      {/* 12. Rayeva & Beyond: 5 Milestones Vertical Timeline + 4 Campaigns */}
      <JourneyAndCampaigns />

      {/* 13. Testimonials & About Us: What Our Customers Say + Founder Flip Card + Team + Community */}
      <TestimonialsAndAboutUs />

      {/* Minimalist Botanical Sprout Divider */}
      <BotanicalVineDivider variant="sprout" maxWidth={540} className="my-4 sm:my-6" />

      {/* 14. Featured In Press: Climatora Founder Story Feature */}
      <PressBanner />

      {/* Hand-Illustrated Botanical Jasmine Vine Page Ender (Connecting Press Spotlight to Newsletter) */}
      <BotanicalVineDivider variant="jasmine" maxWidth={580} className="my-5 sm:my-7" />

      {/* 15. Get Insights & Join & Partner: Newsletter + 3 Member Portals */}
      <JoinAndPartnerSection />

      {/* Panoramic Botanical Mountain & Meadow Silhouette Transition */}
      <BotanicalLandscapeDivider />

      {/* 16. Footer: Complete Eco Navigation, Trust Seals, Socials & Legal */}
      <Footer />
    </main>
  );
}

export default function App() {
  return (
    <TransitionProvider>
      <SmoothScroll>
        <RouteTransition>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/calculator" element={<CalculatorPage />} />
            <Route path="/impact-calculator" element={<CalculatorPage />} />
          </Routes>
        </RouteTransition>
      </SmoothScroll>
    </TransitionProvider>
  );
}
