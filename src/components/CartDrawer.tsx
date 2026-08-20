import React, { useState } from 'react';
import { 
  X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, 
  ShieldCheck, Truck, Sparkles, Tag, Check, Lock, Gift 
} from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
  appliedPromo: string;
  onApplyPromo: (code: string) => { success: boolean; message: string };
  onRemovePromo: () => void;
  giftNote: string;
  onUpdateGiftNote: (note: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  appliedPromo,
  onApplyPromo,
  onRemovePromo,
  giftNote,
  onUpdateGiftNote,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);
  const [showGiftNoteInput, setShowGiftNoteInput] = useState(giftNote.length > 0);

  if (!isOpen) return null;

  // Subtotal calculation
  const subtotal = cartItems.reduce((sum, item) => {
    const itemUnitPrice = item.selectedSize.price + (item.giftWrap ? 4 : 0);
    return sum + itemUnitPrice * item.quantity;
  }, 0);

  const FREE_SHIPPING_THRESHOLD = 50;
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  // Discount calculation
  let discountAmount = 0;
  if (appliedPromo === 'BOTANICA15') {
    discountAmount = subtotal * 0.15;
  } else if (appliedPromo === 'BOTANICA10') {
    discountAmount = subtotal * 0.10;
  } else if (appliedPromo === 'FREESHIP') {
    discountAmount = 0; // free shipping applied
  }

  const shippingCost = (subtotal >= FREE_SHIPPING_THRESHOLD || appliedPromo === 'FREESHIP') ? 0 : 5.99;
  const estimatedTax = (subtotal - discountAmount) * 0.08;
  const total = Math.max(0, subtotal - discountAmount + shippingCost + estimatedTax);

  const handleApplyPromoCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;

    const res = onApplyPromo(promoInput.trim().toUpperCase());
    if (res.success) {
      setPromoMessage({ text: res.message, isError: false });
      setPromoInput('');
    } else {
      setPromoMessage({ text: res.message, isError: true });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-[#1C1814]/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200" 
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF9F6] shadow-2xl flex flex-col border-l border-[#2D2A26]/15 animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#2D2A26]/10 flex items-center justify-between bg-[#FAF9F6]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#2D2A26]" />
              <h2 className="font-serif text-xl font-bold tracking-wider text-[#2D2A26]">Your Botanical Bag</h2>
              <span className="text-[10px] bg-[#2D2A26] text-white px-2 py-0.5 font-bold">
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            </div>

            <button
              id="close-cart-drawer-btn"
              onClick={onClose}
              className="p-2 text-[#2D2A26]/60 hover:text-[#2D2A26] hover:bg-[#F1EFE9] transition-colors cursor-pointer border border-transparent hover:border-[#2D2A26]/10"
              aria-label="Close cart"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-[#F1EFE9] px-6 py-3.5 border-b border-[#2D2A26]/10">
            {amountToFreeShipping === 0 ? (
              <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-wider text-[#3D6638]">
                <Truck className="w-3.5 h-3.5" />
                <span>Unlocked: Complimentary Carbon-Neutral Shipping</span>
              </div>
            ) : (
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] uppercase font-bold tracking-wider text-[#2D2A26]/80">
                  <span>Add <strong className="text-[#2D2A26]">${amountToFreeShipping.toFixed(2)}</strong> for Free Shipping</span>
                  <span>{Math.round(freeShippingProgress)}%</span>
                </div>
                <div className="w-full bg-[#E8E4DB] h-1.5 overflow-hidden">
                  <div 
                    className="bg-[#2D2A26] h-full transition-all duration-300"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-16 h-16 bg-[#F1EFE9] border border-[#2D2A26]/10 flex items-center justify-center text-[#2D2A26]">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#2D2A26]">Your bag is peaceful &amp; empty</h3>
                  <p className="text-xs text-[#2D2A26]/60 mt-1 max-w-xs leading-relaxed">
                    Discover our hand-poured botanical scents crafted with pure Midwestern soy and crackling wicks.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-[#2D2A26] text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#B4A68D] transition-colors cursor-pointer"
                >
                  Explore Fragrances
                </button>
              </div>
            ) : (
              cartItems.map((item) => {
                const itemUnitPrice = item.selectedSize.price + (item.giftWrap ? 4 : 0);
                return (
                  <div 
                    key={item.id}
                    className="p-3.5 bg-[#FAF9F6] border border-[#2D2A26]/10 flex gap-3.5 hover:border-[#2D2A26]/30 transition-all"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover border border-[#2D2A26]/10"
                    />

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="text-xs font-bold text-[#2D2A26] truncate">{item.product.name}</h4>
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="text-[#2D2A26]/40 hover:text-[#A8583B] transition-colors p-1 cursor-pointer"
                            title="Remove from bag"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <p className="text-[10px] text-[#2D2A26]/60 mt-0.5">
                          {item.selectedSize.name} &bull; {item.selectedWick.name}
                        </p>

                        {item.giftWrap && (
                          <span className="inline-flex items-center gap-1 text-[9px] uppercase font-bold tracking-wider text-[#B4A68D] mt-0.5">
                            <Gift className="w-3 h-3" />
                            Gift Box (+ $4)
                          </span>
                        )}
                      </div>

                      {/* Quantity & Unit Subtotal */}
                      <div className="flex items-center justify-between pt-2 mt-1 border-t border-[#2D2A26]/10">
                        <div className="flex items-center border border-[#2D2A26]/20 bg-[#F1EFE9]">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="p-1 text-[#2D2A26] hover:bg-[#E8E4DB] cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-[#2D2A26]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-[#2D2A26] hover:bg-[#E8E4DB] cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-xs font-serif font-bold text-[#2D2A26]">
                          ${itemUnitPrice * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Controls & Order Summary */}
          {cartItems.length > 0 && (
            <div className="p-6 bg-[#F1EFE9] border-t border-[#2D2A26]/10 space-y-4">
              
              {/* Promo Code Engine */}
              <div className="space-y-1.5">
                {appliedPromo ? (
                  <div className="flex items-center justify-between p-2.5 bg-[#E8EFE5] border border-[#3D6638]/20 text-xs">
                    <div className="flex items-center gap-2 text-[#3D6638] font-bold text-[10px] uppercase tracking-wider">
                      <Tag className="w-3.5 h-3.5" />
                      <span>Promo: <strong>{appliedPromo}</strong></span>
                    </div>
                    <button
                      onClick={onRemovePromo}
                      className="text-[10px] uppercase font-bold tracking-wider text-[#A8583B] hover:underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromoCode} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code (e.g. BOTANICA15)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="flex-1 px-3 py-2 text-xs border border-[#2D2A26]/20 bg-[#FAF9F6] uppercase tracking-wider focus:outline-none focus:border-[#2D2A26]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#2D2A26] text-white text-[10px] font-bold uppercase tracking-wider hover:bg-[#B4A68D] transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                )}

                {promoMessage && (
                  <p className={`text-[10px] font-bold uppercase tracking-wider ${promoMessage.isError ? 'text-[#A8583B]' : 'text-[#3D6638]'}`}>
                    {promoMessage.text}
                  </p>
                )}
              </div>

              {/* Gift Message Accordion */}
              <div>
                <button
                  onClick={() => setShowGiftNoteInput(!showGiftNoteInput)}
                  className="text-[10px] font-bold uppercase tracking-wider text-[#2D2A26]/70 hover:text-[#2D2A26] flex items-center gap-1.5 cursor-pointer"
                >
                  <Gift className="w-3.5 h-3.5" />
                  <span>{showGiftNoteInput ? 'Hide Handwritten Gift Note' : '+ Add Handwritten Gift Note (Free)'}</span>
                </button>
                {showGiftNoteInput && (
                  <textarea
                    rows={2}
                    placeholder="Enter your handwritten gift message for the recipient..."
                    value={giftNote}
                    onChange={(e) => onUpdateGiftNote(e.target.value)}
                    className="w-full mt-2 p-2.5 text-xs border border-[#2D2A26]/20 bg-[#FAF9F6] focus:outline-none focus:border-[#2D2A26]"
                  />
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-[#2D2A26]/70 pt-2 border-t border-[#2D2A26]/10">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-serif font-bold text-[#2D2A26]">${subtotal.toFixed(2)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#3D6638]">
                    <span>Promotional Savings</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? <strong className="text-[#3D6638] font-bold uppercase tracking-wider text-[10px]">Complimentary</strong> : `$${shippingCost.toFixed(2)}`}</span>
                </div>

                <div className="flex justify-between">
                  <span>Estimated Tax</span>
                  <span>${estimatedTax.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-base font-serif font-bold text-[#2D2A26] pt-2 border-t border-[#2D2A26]/10">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                id="cart-checkout-btn"
                onClick={onProceedToCheckout}
                className="w-full py-4 bg-[#2D2A26] hover:bg-[#B4A68D] text-white font-bold text-[10px] uppercase tracking-[0.2em] shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer group"
              >
                <Lock className="w-3.5 h-3.5 text-[#B4A68D]" />
                <span>Proceed To Checkout &bull; ${total.toFixed(2)}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Trust Badges */}
              <div className="flex items-center justify-center gap-4 text-[9px] uppercase font-bold tracking-wider text-[#2D2A26]/60">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#B4A68D]" />
                  256-Bit SSL Encrypted
                </span>
                <span>&bull;</span>
                <span>Zero-Paraffin Certified</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
