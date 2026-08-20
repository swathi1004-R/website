import React, { useState } from 'react';
import { Sparkles, Check, Plus, Gift, ShoppingBag, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface BundleBuilderProps {
  products: Product[];
  onAddBundleToCart: (selectedProducts: Product[], wickType: string, giftBox: boolean) => void;
}

export const BundleBuilder: React.FC<BundleBuilderProps> = ({
  products,
  onAddBundleToCart,
}) => {
  const candleOptions = products.filter(p => p.category !== 'accessories' && p.category !== 'bundles');
  const [selectedCandles, setSelectedCandles] = useState<Product[]>([
    candleOptions[0],
    candleOptions[1],
    candleOptions[4] || candleOptions[2]
  ]);
  const [wickType, setWickType] = useState<'wood' | 'cotton'>('wood');
  const [giftBox, setGiftBox] = useState(true);
  const [added, setAdded] = useState(false);

  // Bundle pricing logic (3x 8oz candles = $72 normal value, bundle price = $58 -> save 20%)
  const regularTotal = 72;
  const bundlePrice = 58;
  const savings = regularTotal - bundlePrice;

  const toggleSelectCandle = (product: Product) => {
    if (selectedCandles.some(p => p.id === product.id)) {
      // Remove
      if (selectedCandles.length > 1) {
        setSelectedCandles(selectedCandles.filter(p => p.id !== product.id));
      }
    } else {
      // Add if under 3
      if (selectedCandles.length < 3) {
        setSelectedCandles([...selectedCandles, product]);
      } else {
        // replace last
        setSelectedCandles([selectedCandles[0], selectedCandles[1], product]);
      }
    }
  };

  const handleAddToCart = () => {
    if (selectedCandles.length !== 3) return;
    onAddBundleToCart(selectedCandles, wickType === 'wood' ? 'Crackling Wood Wicks' : 'Organic Cotton Wicks', giftBox);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <section id="bundles-section" className="py-16 sm:py-24 bg-[#FAF9F6] border-b border-[#2D2A26]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F1EFE9] border border-[#2D2A26]/10 text-[10px] font-bold text-[#2D2A26] uppercase tracking-[0.2em] mb-2">
            <Sparkles className="w-3 h-3 text-[#B4A68D]" />
            <span>Curate Your Flight</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-[#2D2A26]">
            Artisan Trio Discovery Flight
          </h2>
          <p className="text-xs sm:text-sm text-[#2D2A26]/70 mt-2 leading-relaxed">
            Select any 3 hand-poured 8 oz botanicals. Includes handcrafted gift packaging, brass matches, and an automatic 20% bundle discount.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Scent Selector Grid */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-[#2D2A26]">
              <span>Choose 3 Fragrances ({selectedCandles.length}/3 selected):</span>
              <span className="text-[#B4A68D]">Click to select or swap</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {candleOptions.map((candle) => {
                const isSelected = selectedCandles.some(p => p.id === candle.id);
                return (
                  <div
                    key={candle.id}
                    onClick={() => toggleSelectCandle(candle)}
                    className={`p-3.5 border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#2D2A26] bg-[#F1EFE9] shadow-sm'
                        : 'border-[#2D2A26]/10 bg-[#FAF9F6] hover:bg-[#F1EFE9]/50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={candle.images[0]}
                        alt={candle.name}
                        className="w-14 h-14 object-cover border border-[#2D2A26]/10"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-[#2D2A26] truncate">{candle.name}</h4>
                        <p className="text-[10px] text-[#2D2A26]/60 truncate">{candle.scentNotes.top.join(', ')}</p>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#B4A68D]">{candle.category}</span>
                      </div>
                    </div>

                    <div className="mt-3 pt-2 border-t border-[#2D2A26]/10 flex justify-between items-center">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#2D2A26]/60">8 oz Vessel</span>
                      <div className={`w-4 h-4 border flex items-center justify-center ${
                        isSelected ? 'bg-[#2D2A26] border-[#2D2A26] text-white' : 'border-[#2D2A26]/30'
                      }`}>
                        {isSelected && <Check className="w-3 h-3" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bundle Summary & Add Box */}
          <div className="lg:col-span-4 bg-[#F1EFE9] p-6 border border-[#2D2A26]/10 shadow-lg space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-[#2D2A26]/10">
              <Gift className="w-4 h-4 text-[#B4A68D]" />
              <h3 className="font-serif text-xl font-bold text-[#2D2A26]">Your Discovery Box</h3>
            </div>

            {/* Selected Trio Slots */}
            <div className="space-y-2">
              {[0, 1, 2].map((slotIdx) => {
                const candle = selectedCandles[slotIdx];
                return (
                  <div key={slotIdx} className="p-2.5 bg-[#FAF9F6] border border-[#2D2A26]/10 flex items-center gap-3">
                    <span className="w-5 h-5 bg-[#2D2A26] text-[#FAF9F6] text-[10px] font-bold flex items-center justify-center shrink-0">
                      0{slotIdx + 1}
                    </span>
                    {candle ? (
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-[#2D2A26] truncate">{candle.name}</p>
                        <p className="text-[10px] text-[#2D2A26]/60">8 oz Hand-Poured Soy</p>
                      </div>
                    ) : (
                      <p className="text-xs italic text-[#2D2A26]/40">Select a candle above...</p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Wick Preference */}
            <div className="space-y-1.5 pt-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#2D2A26]">Wick Style for all 3:</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setWickType('wood')}
                  className={`py-2 px-3 border text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    wickType === 'wood' ? 'border-[#2D2A26] bg-[#2D2A26] text-white' : 'border-[#2D2A26]/20 bg-[#FAF9F6] text-[#2D2A26]'
                  }`}
                >
                  Wood Crackle
                </button>
                <button
                  type="button"
                  onClick={() => setWickType('cotton')}
                  className={`py-2 px-3 border text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    wickType === 'cotton' ? 'border-[#2D2A26] bg-[#2D2A26] text-white' : 'border-[#2D2A26]/20 bg-[#FAF9F6] text-[#2D2A26]'
                  }`}
                >
                  Organic Cotton
                </button>
              </div>
            </div>

            {/* Price Calculation */}
            <div className="space-y-1.5 pt-3 border-t border-[#2D2A26]/10 text-xs text-[#2D2A26]/70">
              <div className="flex justify-between">
                <span>Individual 3x 8oz Value</span>
                <span className="line-through font-serif text-[#2D2A26]/40">${regularTotal}</span>
              </div>
              <div className="flex justify-between text-[#3D6638] font-semibold">
                <span>Trio Bundle Discount</span>
                <span>-${savings} (20% OFF)</span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#2D2A26] pt-2 border-t border-[#2D2A26]/10">
                <span>Trio Flight Price</span>
                <span className="font-serif">${bundlePrice}</span>
              </div>
            </div>

            {/* Add Bundle Button */}
            <button
              id="add-bundle-to-cart-btn"
              onClick={handleAddToCart}
              disabled={selectedCandles.length !== 3}
              className={`w-full py-4 font-bold text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${
                selectedCandles.length !== 3
                  ? 'bg-[#E8E4DB] text-[#2D2A26]/40 cursor-not-allowed'
                  : added
                  ? 'bg-[#3D6E3F] text-white'
                  : 'bg-[#2D2A26] hover:bg-[#B4A68D] text-white'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Bundle Added to Bag!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5 text-[#B4A68D]" />
                  <span>Add 3-Candle Flight &bull; ${bundlePrice}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
