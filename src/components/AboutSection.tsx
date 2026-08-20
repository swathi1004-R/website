import React from 'react';
import { Leaf, Flame, Heart, Compass, ShieldCheck, Recycle } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about-craft-section" className="py-20 sm:py-28 bg-[#FAF9F6] border-b border-[#2D2A26]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Narrative Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Visual Grid */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4 relative">
            <div className="space-y-4">
              <div className="overflow-hidden border-[8px] border-white shadow-lg bg-[#E8E4DB]">
                <img
                  src="https://images.unsplash.com/photo-1543465077-db45d34b88a5?auto=format&fit=crop&w=800&q=80"
                  alt="Pouring warm organic soy wax into ceramic vessels"
                  className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 bg-[#F1EFE9] border border-[#2D2A26]/10">
                <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#B4A68D]">Batch Discipline</span>
                <p className="font-serif text-2xl font-bold text-[#2D2A26] mt-0.5">48 Vessels</p>
                <p className="text-xs text-[#2D2A26]/70 mt-1">Maximum batch volume for uniform heat curing &amp; scent dispersion</p>
              </div>
            </div>

            <div className="space-y-4 pt-8">
              <div className="p-5 bg-[#2D2A26] text-[#FAF9F6] shadow-lg border border-[#2D2A26]">
                <Leaf className="w-4 h-4 text-[#B4A68D] mb-2" />
                <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#B4A68D] block mb-1">Purity Standard</span>
                <p className="text-xs font-semibold leading-relaxed">100% Midwestern soy bean wax with zero petrochemicals or paraffin fillers.</p>
              </div>
              <div className="overflow-hidden border-[8px] border-white shadow-lg bg-[#E8E4DB]">
                <img
                  src="https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=800&q=80"
                  alt="Aesthetic botanical candle studio"
                  className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          {/* Story Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.25em] uppercase text-[#B4A68D]">
              <Compass className="w-3.5 h-3.5" />
              <span>The Studio Manifesto</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif text-[#2D2A26] leading-tight">
              Rooted in botanicals. <br />
              <span className="italic font-normal text-[#2D2A26]/75">Poured with quiet reverence.</span>
            </h2>

            <p className="text-sm sm:text-base text-[#2D2A26]/75 leading-relaxed">
              Aura &amp; Botanica began with a simple desire: to replace mass-produced paraffin candles filled with synthetic chemicals with pure, slow-burning botanical light that grounds the soul.
            </p>

            <p className="text-sm sm:text-base text-[#2D2A26]/75 leading-relaxed">
              Every candle is hand-poured in micro-batches in our Pacific Northwest studio. We use 100% Midwestern-grown soy wax, lead-free FSC timber wicks, and pure essential extracts. When you light our flame, you bring authentic forest firs, Provencal lavender, and warm amber into your sanctuary.
            </p>

            {/* Core Values Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-[#2D2A26]/10">
              <div className="p-4 bg-[#F1EFE9]/60 border border-[#2D2A26]/10">
                <div className="flex items-center gap-2 mb-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#B4A68D]" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#2D2A26]">Zero-Toxicity</h4>
                </div>
                <p className="text-[11px] text-[#2D2A26]/70 leading-relaxed">Free from phthalates, parabens, reproductive toxins, and synthetic mutagens.</p>
              </div>

              <div className="p-4 bg-[#F1EFE9]/60 border border-[#2D2A26]/10">
                <div className="flex items-center gap-2 mb-1.5">
                  <Recycle className="w-4 h-4 text-[#B4A68D]" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#2D2A26]">Circular Vessel</h4>
                </div>
                <p className="text-[11px] text-[#2D2A26]/70 leading-relaxed">Heavyweight matte ceramics designed to be infinitely repurposed.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
