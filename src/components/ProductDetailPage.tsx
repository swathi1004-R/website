import React, { useState } from 'react';
import { 
  Star, Heart, Flame, ShieldCheck, Truck, RefreshCw, X, 
  Check, Plus, Minus, Sparkles, Droplet, Clock, MessageSquare, ThumbsUp, Gift 
} from 'lucide-react';
import { Product, ProductVariantSize, ProductVariantWick, Review } from '../types';

interface ProductDetailPageProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (
    product: Product, 
    size: ProductVariantSize, 
    wick: ProductVariantWick, 
    giftWrap: boolean, 
    quantity: number
  ) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onSelectRelatedProduct: (product: Product) => void;
  allProducts: Product[];
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
  onSelectRelatedProduct,
  allProducts,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<ProductVariantSize>(product.sizes[0] || {
    id: 'standard', name: 'Standard Jar', weight: '340g', price: product.price, burnTime: product.burnTime
  });
  const [selectedWick, setSelectedWick] = useState<ProductVariantWick>(product.wickOptions[0] || {
    id: 'wood', name: 'Crackling Wood Wick', description: 'FSC-certified timber wick'
  });
  const [giftWrap, setGiftWrap] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'scent' | 'care' | 'reviews'>('details');
  const [addedNotice, setAddedNotice] = useState(false);

  // Write Review State
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [reviewsList, setReviewsList] = useState<Review[]>(product.reviews);

  // Calculate dynamic price based on selected size + optional gift wrapping
  const basePrice = selectedSize ? selectedSize.price : product.price;
  const unitPrice = basePrice + (giftWrap ? 4 : 0);
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, selectedWick, giftWrap, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    const createdReview: Review = {
      id: `rev-${Date.now()}`,
      author: newAuthor,
      rating: newRating,
      date: 'Just now',
      title: newTitle || 'Wonderful botanical candle',
      comment: newComment,
      verified: true,
      scentPurchased: `${selectedSize.name} / ${selectedWick.name}`,
      helpfulCount: 1,
    };

    setReviewsList([createdReview, ...reviewsList]);
    setReviewModalOpen(false);
    setNewAuthor('');
    setNewTitle('');
    setNewComment('');
  };

  const relatedProducts = allProducts.filter(p => p.id !== product.id).slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#1C1814]/70 backdrop-blur-sm flex justify-center p-2 sm:p-4 lg:p-6 animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-5xl bg-[#FAF9F6] shadow-2xl border border-[#2D2A26]/15 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2D2A26]/10 bg-[#FAF9F6] sticky top-0 z-20">
          <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-wider text-[#2D2A26]/70">
            <span className="text-[#2D2A26]">{product.handPouredIn}</span>
            <span>&bull;</span>
            <span>{product.batchNumber}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onToggleWishlist(product)}
              className={`p-2 border transition-all cursor-pointer ${
                isWishlisted
                  ? 'border-[#2D2A26] text-[#FAF9F6] bg-[#2D2A26]'
                  : 'border-[#2D2A26]/20 text-[#2D2A26] hover:bg-[#F1EFE9]'
              }`}
              title="Save to favorites"
            >
              <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
            <button
              id="close-pdp-modal-btn"
              onClick={onClose}
              className="p-2 bg-[#F1EFE9] border border-[#2D2A26]/10 text-[#2D2A26] hover:bg-[#E8E4DB] transition-colors cursor-pointer"
              aria-label="Close product view"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-6 sm:p-8 lg:p-10 space-y-10">
          
          {/* Main PDP Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left: Multi-angle Image Gallery */}
            <div className="lg:col-span-6 space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square overflow-hidden bg-[#E8E4DB] border-[8px] border-white shadow-md">
                <img
                  src={product.images[selectedImageIndex] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />

                {/* Stock Status Badge */}
                <div className="absolute top-3 left-3">
                  {product.stockStatus === 'low_stock' ? (
                    <span className="px-3 py-1 bg-[#A8583B] text-white text-[9px] font-bold uppercase tracking-widest shadow">
                      Only {product.stockCount} Left
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-[#2D2A26] text-white text-[9px] font-bold uppercase tracking-widest shadow flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-[#B4A68D]"></span>
                      In Stock &bull; Ready to Ship
                    </span>
                  )}
                </div>
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative w-20 h-20 overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                        selectedImageIndex === idx
                          ? 'border-[#2D2A26] shadow-sm'
                          : 'border-[#2D2A26]/10 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Scent Throw & Atmosphere Radar Summary */}
              <div className="p-4 bg-[#F1EFE9] border border-[#2D2A26]/10 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#2D2A26]">
                  <span>Scent Throw Strength:</span>
                  <span className="text-[#B4A68D]">
                    {product.scentThrow === 5 ? 'Room-Filling & Rich (5/5)' :
                     product.scentThrow === 4 ? 'Medium-Strong (4/5)' :
                     product.scentThrow === 3 ? 'Gentle & Ambient (3/5)' : 'Subtle Whisper'}
                  </span>
                </div>
                <div className="w-full bg-[#E8E4DB] h-1.5 overflow-hidden">
                  <div 
                    className="bg-[#2D2A26] h-full transition-all duration-500" 
                    style={{ width: `${(product.scentThrow / 5) * 100}%` }}
                  />
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {product.mood.map((m, i) => (
                    <span key={i} className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-[#FAF9F6] text-[#2D2A26] border border-[#2D2A26]/10">
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Product Purchase Controls */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center text-[#B4A68D]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-[#2D2A26]">{product.rating}</span>
                  <span className="text-xs text-[#2D2A26]/60">({reviewsList.length} verified reviews)</span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-serif text-[#2D2A26] leading-tight">
                  {product.name}
                </h1>
                <p className="text-xs font-bold uppercase tracking-widest text-[#B4A68D] mt-1">
                  {product.tagline}
                </p>

                {/* Price Display */}
                <div className="flex items-baseline gap-3 mt-3">
                  <span className="text-3xl font-serif font-bold text-[#2D2A26]">${unitPrice}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-[#2D2A26]/50 line-through font-serif">${product.originalPrice}</span>
                  )}
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#3D6638] bg-[#E8EFE5] px-2 py-0.5 border border-[#3D6638]/20">
                    Complimentary Dispatch Over $50
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#2D2A26]/75 leading-relaxed">
                {product.description}
              </p>

              {/* Variant Selector: Size */}
              {product.sizes.length > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-[#2D2A26]">
                    <span>Select Vessel Size:</span>
                    <span className="text-[#B4A68D]">{selectedSize.burnTime}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2.5">
                    {product.sizes.map((sz) => (
                      <button
                        key={sz.id}
                        id={`size-option-${sz.id}`}
                        onClick={() => setSelectedSize(sz)}
                        className={`p-3 border text-left transition-all cursor-pointer ${
                          selectedSize.id === sz.id
                            ? 'border-[#2D2A26] bg-[#2D2A26] text-white shadow-sm'
                            : 'border-[#2D2A26]/15 bg-[#F1EFE9] text-[#2D2A26] hover:border-[#2D2A26]/40'
                        }`}
                      >
                        <p className="text-xs font-bold">{sz.name}</p>
                        <p className={`text-[10px] ${selectedSize.id === sz.id ? 'text-white/70' : 'text-[#2D2A26]/60'}`}>{sz.weight}</p>
                        <p className="text-xs font-serif font-bold mt-1">${sz.price}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Variant Selector: Wick Type */}
              {product.wickOptions.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#2D2A26]">Choose Wick Craft:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {product.wickOptions.map((wick) => (
                      <button
                        key={wick.id}
                        id={`wick-option-${wick.id}`}
                        onClick={() => setSelectedWick(wick)}
                        className={`p-3 border text-left transition-all cursor-pointer ${
                          selectedWick.id === wick.id
                            ? 'border-[#2D2A26] bg-[#2D2A26] text-white shadow-sm'
                            : 'border-[#2D2A26]/15 bg-[#F1EFE9] text-[#2D2A26] hover:border-[#2D2A26]/40'
                        }`}
                      >
                        <p className="text-xs font-bold flex items-center gap-1.5">
                          <Flame className="w-3.5 h-3.5 text-[#B4A68D]" />
                          <span>{wick.name}</span>
                        </p>
                        <p className={`text-[10px] mt-0.5 line-clamp-1 ${selectedWick.id === wick.id ? 'text-white/70' : 'text-[#2D2A26]/60'}`}>{wick.description}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Gift Wrap Toggle */}
              <div 
                onClick={() => setGiftWrap(!giftWrap)}
                className={`p-3.5 border flex items-center justify-between cursor-pointer transition-all ${
                  giftWrap ? 'border-[#2D2A26] bg-[#F1EFE9]' : 'border-[#2D2A26]/15 bg-[#FAF9F6]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Gift className={`w-4 h-4 ${giftWrap ? 'text-[#B4A68D]' : 'text-[#2D2A26]/60'}`} />
                  <div>
                    <p className="text-xs font-bold text-[#2D2A26]">Artisan Gift Box &amp; Calligraphy Card</p>
                    <p className="text-[10px] text-[#2D2A26]/60">Hand-tied linen twine with customizable botanical card</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#2D2A26]">+$4</span>
                  <div className={`w-4 h-4 border flex items-center justify-center ${
                    giftWrap ? 'bg-[#2D2A26] border-[#2D2A26] text-white' : 'border-[#2D2A26]/30'
                  }`}>
                    {giftWrap && <Check className="w-3 h-3" />}
                  </div>
                </div>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="flex items-center gap-3 pt-2">
                {/* Quantity modifier */}
                <div className="flex items-center border border-[#2D2A26]/20 bg-[#F1EFE9]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 text-[#2D2A26] hover:bg-[#E8E4DB] cursor-pointer transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center text-xs font-bold text-[#2D2A26]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 text-[#2D2A26] hover:bg-[#E8E4DB] cursor-pointer transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Add to Bag Button */}
                <button
                  id="pdp-add-to-cart-btn"
                  onClick={handleAddToCart}
                  disabled={product.stockStatus === 'out_of_stock'}
                  className={`flex-1 py-4 px-6 font-bold text-[10px] tracking-[0.2em] uppercase flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${
                    addedNotice
                      ? 'bg-[#3D6E3F] text-white'
                      : 'bg-[#2D2A26] hover:bg-[#B4A68D] text-white'
                  }`}
                >
                  {addedNotice ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag!</span>
                    </>
                  ) : (
                    <>
                      <span>Add to Bag</span>
                      <span>&bull;</span>
                      <span>${totalPrice}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[#2D2A26]/10 text-[10px] font-bold uppercase tracking-wider text-[#2D2A26]/60">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#B4A68D] shrink-0" />
                  <span>Carbon-neutral</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#B4A68D] shrink-0" />
                  <span>Zero-soot burn</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <RefreshCw className="w-3.5 h-3.5 text-[#B4A68D] shrink-0" />
                  <span>30-day aroma love</span>
                </div>
              </div>
            </div>
          </div>

          {/* Scent Pyramid & Technical Specs Tabs */}
          <div className="pt-8 border-t border-[#2D2A26]/10">
            {/* Tab Navigation */}
            <div className="flex border-b border-[#2D2A26]/10 gap-6 sm:gap-8 overflow-x-auto">
              {[
                { id: 'details', label: 'Artisan Story & Specs' },
                { id: 'scent', label: 'Fragrance Pyramid' },
                { id: 'care', label: 'Burn Guide & Care' },
                { id: 'reviews', label: `Reviews (${reviewsList.length})` },
              ].map((tab) => (
                <button
                  key={tab.id}
                  id={`pdp-tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`pb-3 text-[10px] font-bold uppercase tracking-[0.15em] transition-all relative cursor-pointer whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'text-[#2D2A26] border-b-2 border-[#2D2A26]'
                      : 'text-[#2D2A26]/50 hover:text-[#2D2A26]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="py-6">
              {activeTab === 'details' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[#2D2A26]/75">
                  <div className="space-y-3">
                    <h4 className="font-serif text-lg font-bold text-[#2D2A26]">The Studio Narrative</h4>
                    <p className="leading-relaxed">{product.story}</p>
                  </div>
                  <div className="bg-[#F1EFE9] p-5 border border-[#2D2A26]/10 space-y-2.5">
                    <h4 className="font-serif text-base font-bold text-[#2D2A26]">Technical Specifications</h4>
                    <div className="flex justify-between py-1 border-b border-[#2D2A26]/10 text-xs">
                      <span className="text-[#2D2A26]/60">Wax Formulation:</span>
                      <span className="font-medium text-[#2D2A26]">{product.waxType}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#2D2A26]/10 text-xs">
                      <span className="text-[#2D2A26]/60">Vessel Style:</span>
                      <span className="font-medium text-[#2D2A26]">{product.vesselMaterial}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#2D2A26]/10 text-xs">
                      <span className="text-[#2D2A26]/60">Burn Life:</span>
                      <span className="font-medium text-[#2D2A26]">{product.burnTime}</span>
                    </div>
                    <div className="flex justify-between py-1 text-xs">
                      <span className="text-[#2D2A26]/60">Purity:</span>
                      <span className="font-medium text-[#2D2A26]">Phthalate-Free, Paraben-Free, Cruelty-Free</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'scent' && (
                <div className="space-y-6">
                  <div className="max-w-2xl mx-auto space-y-4">
                    {/* Top notes */}
                    <div className="bg-[#F1EFE9] p-4 border-l-4 border-[#2D2A26] shadow-sm">
                      <div className="flex items-center gap-2 mb-1">
                        <Sparkles className="w-3.5 h-3.5 text-[#B4A68D]" />
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2D2A26]">Top Notes (First 15 Minutes)</h4>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {product.scentNotes.top.map((note, i) => (
                          <span key={i} className="px-3 py-1 bg-[#FAF9F6] text-xs font-semibold text-[#2D2A26] border border-[#2D2A26]/10">
                            {note}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Heart notes */}
                    <div className="bg-[#F1EFE9] p-4 border-l-4 border-[#B4A68D] shadow-sm">
                      <div className="flex items-center gap-2 mb-1">
                        <Droplet className="w-3.5 h-3.5 text-[#B4A68D]" />
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2D2A26]">Heart / Middle Notes (Main Aroma Body)</h4>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {product.scentNotes.heart.map((note, i) => (
                          <span key={i} className="px-3 py-1 bg-[#FAF9F6] text-xs font-semibold text-[#2D2A26] border border-[#2D2A26]/10">
                            {note}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Base notes */}
                    <div className="bg-[#F1EFE9] p-4 border-l-4 border-[#2D2A26]/40 shadow-sm">
                      <div className="flex items-center gap-2 mb-1">
                        <Flame className="w-3.5 h-3.5 text-[#2D2A26]" />
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2D2A26]">Base Notes (Lasting Room Aura)</h4>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {product.scentNotes.base.map((note, i) => (
                          <span key={i} className="px-3 py-1 bg-[#FAF9F6] text-xs font-semibold text-[#2D2A26] border border-[#2D2A26]/10">
                            {note}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'care' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#2D2A26]/75">
                  <div className="bg-[#F1EFE9] p-4 border border-[#2D2A26]/10">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#B4A68D] block mb-1">01. The First Melt Pool</span>
                    <p className="leading-relaxed">Allow the candle to burn for 2-3 hours on first lighting until the melted wax pool reaches all edges of the vessel to prevent tunneling.</p>
                  </div>
                  <div className="bg-[#F1EFE9] p-4 border border-[#2D2A26]/10">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#B4A68D] block mb-1">02. Trim Before Each Burn</span>
                    <p className="leading-relaxed">Trim wood or cotton wicks to 1/4 inch before lighting. This eliminates black carbon soot and extends total burn life by 25%.</p>
                  </div>
                  <div className="bg-[#F1EFE9] p-4 border border-[#2D2A26]/10">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#B4A68D] block mb-1">03. Repurpose The Vessel</span>
                    <p className="leading-relaxed">When 1/2 inch of wax remains, gently melt and wipe clean with warm water and soap. Ideal for succulents or studio desk organizers.</p>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  {/* Reviews summary bar */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-[#F1EFE9] border border-[#2D2A26]/10">
                    <div className="flex items-center gap-4">
                      <div className="text-3xl font-serif font-bold text-[#2D2A26]">{product.rating}</div>
                      <div>
                        <div className="flex items-center text-[#B4A68D]">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                        <p className="text-xs text-[#2D2A26]/60 mt-0.5">Based on {reviewsList.length} customer ratings</p>
                      </div>
                    </div>

                    <button
                      id="open-write-review-modal-btn"
                      onClick={() => setReviewModalOpen(true)}
                      className="px-5 py-2.5 bg-[#2D2A26] text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#B4A68D] transition-colors cursor-pointer"
                    >
                      Write A Review
                    </button>
                  </div>

                  {/* Reviews List */}
                  <div className="space-y-4">
                    {reviewsList.map((rev) => (
                      <div key={rev.id} className="p-4 bg-[#FAF9F6] border border-[#2D2A26]/10 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-[#2D2A26]">{rev.author}</span>
                            {rev.verified && (
                              <span className="text-[9px] bg-[#E8EFE5] text-[#3D6638] px-2 py-0.5 font-bold uppercase tracking-wider">
                                Verified Buyer
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-[#2D2A26]/50">{rev.date}</span>
                        </div>

                        <div className="flex items-center gap-1 text-[#B4A68D]">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>

                        <h5 className="text-xs font-bold text-[#2D2A26]">{rev.title}</h5>
                        <p className="text-xs text-[#2D2A26]/75 leading-relaxed">{rev.comment}</p>

                        <div className="text-[10px] text-[#2D2A26]/60 pt-1 flex items-center justify-between border-t border-[#2D2A26]/5">
                          <span>Purchased: {rev.scentPurchased}</span>
                          <span className="flex items-center gap-1 text-[#2D2A26]">
                            <ThumbsUp className="w-3 h-3" />
                            Helpful ({rev.helpfulCount})
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related / Frequently Paired Products */}
          {relatedProducts.length > 0 && (
            <div className="pt-6 border-t border-[#2D2A26]/10">
              <h3 className="font-serif text-xl font-bold text-[#2D2A26] mb-4">
                Frequently Paired With
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedProducts.map(rel => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectRelatedProduct(rel)}
                    className="p-3 bg-[#F1EFE9] border border-[#2D2A26]/10 hover:border-[#2D2A26]/40 cursor-pointer transition-all flex items-center gap-3 group"
                  >
                    <img src={rel.images[0]} alt={rel.name} className="w-14 h-14 object-cover border border-[#2D2A26]/10" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-[#2D2A26] group-hover:text-[#B4A68D] truncate">{rel.name}</h4>
                      <p className="text-[10px] text-[#2D2A26]/60 truncate">{rel.burnTime}</p>
                      <span className="text-xs font-serif font-bold text-[#2D2A26]">${rel.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Write a Review Modal */}
      {reviewModalOpen && (
        <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF9F6] max-w-md w-full p-6 border border-[#2D2A26]/20 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-[#2D2A26]/10 pb-3">
              <h3 className="font-serif text-xl font-bold text-[#2D2A26]">Write a Review for {product.name}</h3>
              <button onClick={() => setReviewModalOpen(false)} className="text-[#2D2A26]/60 hover:text-black">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddReview} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold uppercase tracking-wider text-[10px] text-[#2D2A26] mb-1">Your Rating:</label>
                <div className="flex gap-2 text-[#B4A68D]">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setNewRating(star)}
                      className="p-1 cursor-pointer"
                    >
                      <Star className={`w-5 h-5 ${star <= newRating ? 'fill-current' : 'text-[#2D2A26]/20'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-[10px] text-[#2D2A26] mb-1">Your Name:</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Sarah M."
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  className="w-full px-3 py-2 border border-[#2D2A26]/20 bg-white focus:outline-none focus:border-[#2D2A26]"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-[10px] text-[#2D2A26] mb-1">Review Headline:</label>
                <input
                  type="text"
                  placeholder="e.g., Divine forest scent and crackle"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-[#2D2A26]/20 bg-white focus:outline-none focus:border-[#2D2A26]"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-[10px] text-[#2D2A26] mb-1">Your Honest Review:</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Tell us about the scent throw, burn quality, and ambiance..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full px-3 py-2 border border-[#2D2A26]/20 bg-white focus:outline-none focus:border-[#2D2A26]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setReviewModalOpen(false)}
                  className="px-4 py-2 border border-[#2D2A26]/20 text-[#2D2A26] text-[10px] font-bold uppercase tracking-wider cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#2D2A26] hover:bg-[#B4A68D] text-white text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
