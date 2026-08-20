import React, { useState } from 'react';
import { Star, Heart, Flame, Eye, Plus, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onQuickAdd,
  isWishlisted,
  onToggleWishlist,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleQuickAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickAdd(product);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWishlist(product);
  };

  return (
    <div
      id={`product-card-${product.id}`}
      onClick={() => onSelect(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col bg-[#F1EFE9]/50 border border-[#2D2A26]/10 overflow-hidden hover:border-[#2D2A26]/40 hover:bg-[#F1EFE9] transition-all duration-300 cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#E8E4DB]">
        <img
          src={isHovered && product.images.length > 1 ? product.images[1] : product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-all duration-500 group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isBestseller && (
            <span className="px-2.5 py-1 bg-[#2D2A26] text-[#FAF9F6] text-[9px] font-bold tracking-[0.2em] uppercase shadow-sm">
              Bestseller
            </span>
          )}
          {product.isNew && (
            <span className="px-2.5 py-1 bg-[#4A5D4E] text-[#FAF9F6] text-[9px] font-bold tracking-[0.2em] uppercase shadow-sm">
              New Harvest
            </span>
          )}
          {product.stockStatus === 'low_stock' && (
            <span className="px-2.5 py-1 bg-[#A8583B] text-[#FAF9F6] text-[9px] font-bold tracking-[0.2em] uppercase shadow-sm">
              Only {product.stockCount} Left
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          className={`absolute top-3 right-3 p-2 backdrop-blur-md transition-all z-10 ${
            isWishlisted
              ? 'bg-[#2D2A26] text-white shadow-md'
              : 'bg-[#FAF9F6]/90 text-[#2D2A26] hover:bg-[#2D2A26] hover:text-white'
          }`}
          aria-label={isWishlisted ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Overlay on Hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(product);
            }}
            className="flex-1 py-2.5 bg-[#FAF9F6]/95 hover:bg-[#FAF9F6] text-[#2D2A26] text-[10px] font-bold tracking-wider uppercase backdrop-blur-md shadow-md flex items-center justify-center gap-1.5 transition-colors border border-[#2D2A26]/10"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
          
          <button
            onClick={handleQuickAddClick}
            disabled={product.stockStatus === 'out_of_stock'}
            className={`px-4 py-2.5 text-[10px] font-bold tracking-wider uppercase shadow-md flex items-center justify-center gap-1 transition-all ${
              addedAnimation
                ? 'bg-[#3D6E3F] text-white'
                : 'bg-[#2D2A26] hover:bg-[#B4A68D] text-white'
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-1.5">
            <div className="flex items-center text-[#B4A68D]">
              <Star className="w-3 h-3 fill-current" />
            </div>
            <span className="text-[11px] font-bold text-[#2D2A26]">{product.rating}</span>
            <span className="text-[11px] text-[#2D2A26]/60">({product.reviewsCount})</span>
            <span className="text-[11px] text-[#2D2A26]/40">•</span>
            <span className="text-[11px] text-[#2D2A26]/60">{product.burnTime}</span>
          </div>

          {/* Title & Tagline */}
          <h3 className="font-serif text-lg font-bold text-[#2D2A26] group-hover:text-[#B4A68D] transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs text-[#2D2A26]/70 line-clamp-2 mt-1 leading-relaxed">
            {product.tagline}
          </p>

          {/* Scent Notes Badges */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {product.scentNotes.top.slice(0, 2).map((note, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 bg-[#FAF9F6] border border-[#2D2A26]/10 text-[#2D2A26] text-[10px] font-medium"
              >
                {note}
              </span>
            ))}
            {product.scentNotes.heart.slice(0, 1).map((note, idx) => (
              <span
                key={`heart-${idx}`}
                className="px-2 py-0.5 bg-[#FAF9F6] border border-[#2D2A26]/10 text-[#2D2A26] text-[10px] font-medium"
              >
                {note}
              </span>
            ))}
          </div>
        </div>

        {/* Pricing & Stock Footer */}
        <div className="pt-4 mt-3 border-t border-[#2D2A26]/10 flex items-center justify-between">
          <div>
            <span className="text-base font-serif font-bold text-[#2D2A26]">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#2D2A26]/50 line-through ml-2 font-serif">
                ${product.originalPrice}
              </span>
            )}
          </div>

          <span className="text-[10px] font-bold uppercase tracking-wider text-[#2D2A26]/60">
            {product.sizes[0]?.name || 'Standard'}
          </span>
        </div>
      </div>
    </div>
  );
};
