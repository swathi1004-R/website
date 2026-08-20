import React from 'react';
import { Heart, X, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from '../types';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistIds: string[];
  products: Product[];
  onRemoveWishlist: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlistIds,
  products,
  onRemoveWishlist,
  onQuickAdd,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  const wishlistedProducts = products.filter(p => wishlistIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-[#1C1814]/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200" 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] shadow-2xl flex flex-col border-l border-[#E2D6C5] animate-in slide-in-from-right duration-300">
          
          <div className="px-6 py-5 border-b border-[#EAE0D2] flex items-center justify-between bg-[#FAF8F5]">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#A64B2A] fill-[#A64B2A]" />
              <h2 className="font-serif-display text-xl font-bold text-[#2B231C]">Saved Favorites</h2>
              <span className="text-xs bg-[#EFE8DD] text-[#5A4D40] px-2 py-0.5 rounded-full font-bold">
                {wishlistedProducts.length}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-[#7A6D60] hover:text-[#211C18] hover:bg-[#EFE8DD] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlistedProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-16 h-16 rounded-full bg-[#EFE8DD] flex items-center justify-center text-[#8C7D6E]">
                  <Heart className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-serif-display text-xl font-bold text-[#2B231C]">No favorites saved yet</h3>
                  <p className="text-xs text-[#7A6D60] mt-1 max-w-xs">
                    Click the heart icon on any botanical candle to curate your personal scent wishlist.
                  </p>
                </div>
              </div>
            ) : (
              wishlistedProducts.map(product => (
                <div
                  key={product.id}
                  className="p-3.5 bg-[#FAF8F5] rounded-xl border border-[#E8DFC9] flex gap-3.5 hover:border-[#D0C2AE] transition-all"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-20 h-20 rounded-lg object-cover border border-[#E0D5C3] cursor-pointer"
                    onClick={() => {
                      onSelectProduct(product);
                      onClose();
                    }}
                  />

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 
                          onClick={() => {
                            onSelectProduct(product);
                            onClose();
                          }}
                          className="text-xs font-bold text-[#26201B] truncate cursor-pointer hover:text-[#886744]"
                        >
                          {product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveWishlist(product)}
                          className="text-[#96897B] hover:text-[#A64B2A] transition-colors p-1"
                          title="Remove from favorites"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-[11px] text-[#7A6C5E] mt-0.5 line-clamp-1">{product.tagline}</p>
                      <span className="text-xs font-bold text-[#26201B] mt-1 block">${product.price}</span>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => {
                          onQuickAdd(product);
                        }}
                        className="w-full py-1.5 bg-[#2B231C] text-white text-xs font-semibold rounded-lg hover:bg-[#45382D] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add to Bag</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
