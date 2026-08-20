import React from 'react';
import { Sparkles, Leaf, Flame, Shield, Recycle, Droplet } from 'lucide-react';

export const ValueProps: React.FC = () => {
  const pillars = [
    {
      icon: Leaf,
      title: '100% Midwestern Soy Wax',
      desc: 'Sourced from American family farms. Clean-burning, non-toxic, and free from petroleum paraffin or synthetic stabilizers.'
    },
    {
      icon: Droplet,
      title: 'Fine Botanical Perfumes',
      desc: 'Formulated with pure essential oils and phthalate-free cosmetic fragrances that fill rooms with sophisticated nuance.'
    },
    {
      icon: Flame,
      title: 'FSC Crackling Wood Wicks',
      desc: 'Ethically harvested natural wood wicks produce a subtle, comforting hearth crackle and a wide, steady melt pool.'
    },
    {
      icon: Recycle,
      title: 'Reusable Ceramic Vessels',
      desc: 'Heavyweight matte ceramic and apothecary glass vessels designed to be infinitely repurposed as planters or organizers.'
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#FAF9F6] border-b border-[#2D2A26]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#B4A68D]">The Pure Flame Standard</span>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#2D2A26] mt-2">
            Crafted for pure air and quiet sanctuaries.
          </h2>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 bg-[#F1EFE9]/70 border border-[#2D2A26]/10 hover:bg-[#F1EFE9] transition-all hover:shadow-md group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 bg-[#FAF9F6] border border-[#2D2A26]/15 flex items-center justify-center text-[#2D2A26] mb-5 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B4A68D] mb-1">
                    Pillar 0{idx + 1}
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#2D2A26] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#2D2A26]/70 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
