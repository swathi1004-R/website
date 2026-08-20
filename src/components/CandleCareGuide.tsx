import React, { useState } from 'react';
import { Flame, Scissors, Wind, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';

export const CandleCareGuide: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const tips = [
    {
      icon: Flame,
      title: '01. The First Memory Burn',
      tagline: 'Crucial for preventing wax tunneling',
      detail: 'On your very first lighting, allow the candle to burn for 2 to 3 full hours. The liquid melt pool must reach all outer edges of the vessel before extinguishing. Soy wax has memory—this ensures smooth, flat burning for all future sessions.'
    },
    {
      icon: Scissors,
      title: '02. Trim Wick to 1/4 Inch',
      tagline: 'Before every subsequent lighting',
      detail: 'Always trim your wooden crackle wick or cotton wick to 1/4 inch before relighting. This prevents excessive flame height, stops mushrooming, and eliminates black smoke or soot accumulation.'
    },
    {
      icon: Wind,
      title: '03. Safe Extinguishing Ritual',
      tagline: 'Never blow directly onto melted wax',
      detail: 'Use a bell snuffer or gently dip the wick into the liquid wax pool with a wick dipper to extinguish the flame instantly without smoke or stray sparks. Center the wick before wax solidifies.'
    },
    {
      icon: RefreshCw,
      title: '04. Vessel Upcycling Ritual',
      tagline: 'Give your vessel a second life',
      detail: 'When only 1/2 inch of wax remains, stop burning. Pour boiling water into the vessel to float remaining wax to the top. Once cool, discard wax and wash with warm soapy water for a stunning coffee table planter, pencil holder, or jewelry dish.'
    }
  ];

  return (
    <section id="candle-care-section" className="py-16 sm:py-24 bg-[#F1EFE9] border-b border-[#2D2A26]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#B4A68D]">Rituals &amp; Longevity</span>
          <h2 className="text-3xl sm:text-5xl font-serif text-[#2D2A26] mt-1.5">
            How to maximize your candle&apos;s burn life
          </h2>
          <p className="text-xs sm:text-sm text-[#2D2A26]/70 mt-2 leading-relaxed">
            Simple, mindful practices that ensure a clean, soot-free atmosphere and prolong candle longevity by 30%.
          </p>
        </div>

        {/* Interactive Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tips.map((tip, idx) => {
            const Icon = tip.icon;
            const isSelected = activeStep === idx;
            return (
              <div
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`p-6 border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#2D2A26] bg-[#FAF9F6] shadow-md'
                    : 'border-[#2D2A26]/10 bg-[#FAF9F6]/70 hover:bg-[#FAF9F6]'
                }`}
              >
                <div>
                  <div className="w-10 h-10 bg-[#F1EFE9] border border-[#2D2A26]/10 text-[#2D2A26] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#2D2A26]">{tip.title}</h3>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#B4A68D] mt-1">{tip.tagline}</p>
                  <p className="text-xs text-[#2D2A26]/70 mt-3 leading-relaxed">{tip.detail}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#2D2A26]/10 flex justify-between items-center text-[10px] text-[#2D2A26]/60 uppercase font-bold tracking-wider">
                  <span>Step 0{idx + 1}</span>
                  <span className={isSelected ? 'text-[#2D2A26]' : ''}>{isSelected ? 'Active Focus' : 'Explore'}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
