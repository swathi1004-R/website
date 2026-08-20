import React from 'react';
import { Star, Quote, ShieldCheck } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const press = [
    { outlet: 'ARCHITECTURAL DIGEST', quote: '“The benchmark for non-toxic candle craftsmanship with crackling wooden wicks that sound like a cozy mountain hearth.”' },
    { outlet: 'VOGUE LIVING', quote: '“Aura & Botanica delivers nuanced scent pyramids that elevate interior spaces without artificial headache-inducing perfume.”' },
    { outlet: 'DOMINO MAGAZINE', quote: '“Eco-conscious ceramics and pure soy wax you’ll want displayed prominently on every coffee table.”' },
  ];

  const reviews = [
    {
      author: 'Evelyn St. Claire',
      location: 'San Francisco, CA',
      rating: 5,
      candle: 'Nordic Fir & Smoked Birch',
      text: 'I have migraines triggered by almost every commercial candle. Aura & Botanica is the only brand I can burn all evening in peace. The natural fir and smoked cedar smells like authentic forest rain.',
    },
    {
      author: 'Julian Thorne',
      location: 'Denver, CO',
      rating: 5,
      candle: 'Amber Santal & Cashmere',
      text: 'The crackling wooden wick adds so much peaceful warmth to winter nights. Burns clean and completely flat down to the last millimeter of wax. Worth every single penny.',
    },
    {
      author: 'Maya Chen',
      location: 'Seattle, WA',
      rating: 5,
      candle: 'Artisan Discovery Flight',
      text: 'Sent the Trio Gift Flight to three clients as holiday appreciation gifts. Every recipient reached out to ask where they could order more. Unboxing is pure boutique luxury.',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#FAF9F6] border-b border-[#2D2A26]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Press Quotes Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-16 border-b border-[#2D2A26]/10">
          {press.map((p, idx) => (
            <div key={idx} className="text-center space-y-2.5 px-4">
              <span className="text-[10px] font-bold tracking-[0.25em] text-[#B4A68D] block">{p.outlet}</span>
              <p className="font-serif text-sm italic text-[#2D2A26]/80 leading-relaxed">{p.quote}</p>
            </div>
          ))}
        </div>

        {/* Customer Reviews Section */}
        <div className="pt-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#B4A68D]">From Our Sanctuary To Yours</span>
            <h2 className="text-3xl sm:text-5xl font-serif text-[#2D2A26] mt-1.5">
              Loved by over 14,000 mindful homes
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((r, idx) => (
              <div
                key={idx}
                className="p-6 bg-[#F1EFE9]/60 border border-[#2D2A26]/10 flex flex-col justify-between hover:bg-[#F1EFE9] transition-all hover:shadow-md"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-[#B4A68D]">
                    {[...Array(r.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-[#2D2A26]/80 leading-relaxed italic">
                    &quot;{r.text}&quot;
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#2D2A26]/10 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-[#2D2A26]">{r.author}</h4>
                    <p className="text-[10px] text-[#2D2A26]/60">{r.location}</p>
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-wider bg-[#FAF9F6] text-[#2D2A26] px-2 py-1 border border-[#2D2A26]/10">
                    {r.candle}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
