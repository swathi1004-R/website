import React from 'react';
import { ArrowRight, Sparkles, Flame, ShieldCheck, Leaf, Compass } from 'lucide-react';
import { Product } from '../types';

interface HeroProps {
  onShopClick: () => void;
  onQuizClick: () => void;
  onFeaturedProductClick: (product: Product) => void;
  featuredProduct: Product;
}

export const Hero: React.FC<HeroProps> = ({
  onShopClick,
  onQuizClick,
  onFeaturedProductClick,
  featuredProduct,
}) => {
  return (
    <section id="hero-section" className="relative overflow-hidden bg-[#FAF9F6] border-b border-[#2D2A26]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-24 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
          
          {/* Left Column: Geometric Typography & CTAs */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-[#F1EFE9] border border-[#2D2A26]/10">
              <span className="w-1.5 h-1.5 bg-[#2D2A26]"></span>
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#2D2A26]">
                Autumn &bull; Winter Studio Harvest 2025
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif tracking-tight text-[#2D2A26] leading-[1.05]">
              Light that lingers. <br />
              <span className="italic font-normal text-[#2D2A26]/80">Pure to the core.</span>
            </h1>

            <p className="text-sm sm:text-base text-[#2D2A26]/70 max-w-xl leading-relaxed">
              Handcrafted in micro-batches with 100% Midwestern soy wax, non-toxic botanical essential oils, and FSC-certified crackling timber wicks. Made to cultivate quiet sanctuaries.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                id="hero-shop-collection-btn"
                onClick={onShopClick}
                className="px-8 py-4 bg-[#2D2A26] hover:bg-[#B4A68D] text-[#FAF9F6] text-[11px] font-bold uppercase tracking-[0.2em] shadow-lg flex items-center justify-center gap-3 transition-colors cursor-pointer group"
              >
                <span>Shop The Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-quiz-cta-btn"
                onClick={onQuizClick}
                className="px-8 py-4 bg-[#F1EFE9] hover:bg-[#E8E4DB] border border-[#2D2A26]/10 text-[#2D2A26] text-[11px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Compass className="w-4 h-4 text-[#B4A68D]" />
                <span>Find Your Scent Match</span>
              </button>
            </div>

            {/* Trust metrics */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#2D2A26]/10 max-w-lg">
              <div className="text-left">
                <p className="text-2xl font-serif text-[#2D2A26]">100%</p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#2D2A26]/60">Midwest Soy Wax</p>
              </div>
              <div className="text-left border-l border-[#2D2A26]/10 pl-4">
                <p className="text-2xl font-serif text-[#2D2A26]">55+ Hrs</p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#2D2A26]/60">Clean Hearth Burn</p>
              </div>
              <div className="text-left border-l border-[#2D2A26]/10 pl-4">
                <p className="text-2xl font-serif text-[#2D2A26]">0%</p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#2D2A26]/60">Phthalates or Dyes</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual & Framed Matting */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none p-3 sm:p-4 bg-[#F1EFE9] border border-[#2D2A26]/10 shadow-xl">
              
              {/* Main Lifestyle Image */}
              <div className="relative overflow-hidden border-[10px] sm:border-[14px] border-white shadow-md bg-[#E8E4DB]">
                <img
                  src="https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1200&q=85"
                  alt="Hand-poured artisanal soy candle burning softly"
                  className="w-full h-[380px] sm:h-[440px] object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

                {/* Floating Badge */}
                <div className="absolute top-4 left-4 bg-[#2D2A26] text-[#FAF9F6] px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
                  <Flame className="w-3 h-3 text-[#B4A68D]" />
                  <span>Wood Wick &bull; Batch #104</span>
                </div>

                {/* Featured Candle Quick Overlay Card */}
                {featuredProduct && (
                  <div className="absolute bottom-3 left-3 right-3 bg-[#FAF9F6]/95 backdrop-blur-md p-4 border border-[#2D2A26]/10 shadow-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#B4A68D]">Nº 01 &bull; Featured Studio Botanical</span>
                        <h3 className="font-serif text-lg font-bold text-[#2D2A26]">{featuredProduct.name}</h3>
                        <p className="text-[11px] text-[#2D2A26]/70 line-clamp-1">{featuredProduct.tagline}</p>
                      </div>
                      <button
                        id="hero-view-featured-btn"
                        onClick={() => onFeaturedProductClick(featuredProduct)}
                        className="px-4 py-2 bg-[#2D2A26] hover:bg-[#B4A68D] text-white text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer shrink-0 ml-3"
                      >
                        Notes &bull; ${featuredProduct.price}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Ribbon */}
              <div className="mt-3 flex items-center justify-between text-xs text-[#2D2A26] px-1">
                <div className="flex items-center gap-1.5">
                  <Leaf className="w-3.5 h-3.5 text-[#B4A68D]" />
                  <span className="text-[11px] font-bold uppercase tracking-wider">100% Plant-Based Soy</span>
                </div>
                <button
                  onClick={() => onFeaturedProductClick(featuredProduct)}
                  className="text-[10px] font-bold uppercase tracking-[0.2em] underline underline-offset-4 hover:opacity-60 cursor-pointer"
                >
                  Explore Vessel &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
