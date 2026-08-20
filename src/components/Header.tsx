import React, { useState } from 'react';
import { ShoppingBag, Heart, Search, Sparkles, X, Menu, Compass, ShieldCheck } from 'lucide-react';
import { Product } from '../types';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenQuiz: () => void;
  onNavigate: (sectionId: string) => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenQuiz,
  onNavigate,
  products,
  onSelectProduct,
}) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filteredSearchProducts = searchQuery.trim() === '' ? [] : products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.scentNotes.top.some(n => n.toLowerCase().includes(searchQuery.toLowerCase())) ||
    p.scentNotes.heart.some(n => n.toLowerCase().includes(searchQuery.toLowerCase())) ||
    p.scentNotes.base.some(n => n.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#2D2A26]/10 transition-all">
      {/* Announcement Banner */}
      <div className="bg-[#2D2A26] text-[#FAF9F6] px-4 py-2 text-[11px] font-bold tracking-[0.15em] uppercase flex items-center justify-between border-b border-[#2D2A26]/20">
        <div className="hidden sm:flex items-center gap-2 mx-auto">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#B4A68D]"></span>
          <span>Complimentary carbon-neutral shipping on orders over $50 • Hand-poured with 100% Midwestern soy</span>
        </div>
        <div className="sm:hidden text-center w-full">
          <span>Free shipping $50+ • 100% Soy Wax</span>
        </div>
        <button 
          onClick={onOpenQuiz}
          className="hidden md:flex items-center gap-1.5 text-[#B4A68D] hover:text-white transition-colors cursor-pointer text-[10px] font-bold uppercase tracking-widest"
        >
          <Sparkles className="w-3 h-3" />
          <span>Scent Matcher</span>
        </button>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#2D2A26] hover:bg-[#F1EFE9] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-8 text-[11px] font-bold tracking-[0.2em] uppercase text-[#2D2A26]">
            <button
              id="nav-shop-all-btn"
              onClick={() => onNavigate('shop')}
              className="hover:opacity-60 transition-opacity cursor-pointer relative py-1 border-b border-transparent hover:border-[#2D2A26]"
            >
              Shop Candles
            </button>
            <button
              id="nav-bundles-btn"
              onClick={() => onNavigate('bundles')}
              className="hover:opacity-60 transition-opacity cursor-pointer relative py-1 flex items-center gap-1.5"
            >
              <span>Gift Flights</span>
              <span className="text-[9px] bg-[#E8E4DB] text-[#2D2A26] px-1.5 py-0.5 border border-[#2D2A26]/10 font-bold tracking-normal">20% OFF</span>
            </button>
            <button
              id="nav-about-btn"
              onClick={() => onNavigate('about')}
              className="hover:opacity-60 transition-opacity cursor-pointer relative py-1 border-b border-transparent hover:border-[#2D2A26]"
            >
              The Craft
            </button>
            <button
              id="nav-care-btn"
              onClick={() => onNavigate('care')}
              className="hover:opacity-60 transition-opacity cursor-pointer relative py-1 border-b border-transparent hover:border-[#2D2A26]"
            >
              Candle Care
            </button>
          </nav>

          {/* Brand Logo */}
          <div className="flex-1 md:flex-initial text-center md:text-left">
            <button
              id="brand-logo-btn"
              onClick={() => onNavigate('hero')}
              className="inline-flex flex-col items-center group cursor-pointer"
            >
              <span className="text-2xl sm:text-3xl font-serif tracking-tight text-[#2D2A26]">
                AURA<span className="italic font-normal">&amp;BOTANICA</span>
              </span>
              <span className="text-[9px] tracking-[0.3em] uppercase text-[#B4A68D] font-bold mt-0.5">
                Hand-Poured Studio
              </span>
            </button>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            {/* Search Trigger */}
            <div className="relative">
              <button
                id="header-search-btn"
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-[#2D2A26] hover:opacity-60 transition-opacity cursor-pointer"
                title="Search fragrances"
                aria-label="Search fragrances"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Instant Search Popup */}
              {searchOpen && (
                <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-[#FAF9F6] border border-[#2D2A26]/20 shadow-2xl p-5 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex items-center gap-2 border-b border-[#2D2A26]/20 pb-2">
                    <Search className="w-4 h-4 text-[#B4A68D]" />
                    <input
                      id="search-input-field"
                      type="text"
                      placeholder="Search note: fir, sandalwood, amber..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-transparent text-xs tracking-wide focus:outline-none text-[#2D2A26] placeholder:text-[#2D2A26]/40"
                      autoFocus
                    />
                    <button
                      onClick={() => {
                        setSearchOpen(false);
                        setSearchQuery('');
                      }}
                      className="text-[#2D2A26]/60 hover:text-[#2D2A26] text-xs p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Search Results */}
                  <div className="mt-4 max-h-64 overflow-y-auto space-y-2">
                    {searchQuery.trim() === '' ? (
                      <div className="text-xs text-[#2D2A26]/70 py-2">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#B4A68D] mb-2">Popular Fragrance Notes:</p>
                        <div className="flex flex-wrap gap-1.5">
                          {['Smoked Birch', 'Golden Amber', 'Eucalyptus', 'French Lavender', 'Fig Leaf', 'Bourbon Vanilla'].map(tag => (
                            <button
                              key={tag}
                              onClick={() => setSearchQuery(tag)}
                              className="px-2.5 py-1 bg-[#F1EFE9] border border-[#2D2A26]/10 text-[#2D2A26] text-[11px] font-medium hover:border-[#2D2A26] transition-colors"
                            >
                              {tag}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : filteredSearchProducts.length > 0 ? (
                      filteredSearchProducts.map(product => (
                        <div
                          key={product.id}
                          onClick={() => {
                            onSelectProduct(product);
                            setSearchOpen(false);
                            setSearchQuery('');
                          }}
                          className="flex items-center gap-3 p-2 bg-[#F1EFE9]/60 hover:bg-[#F1EFE9] border border-[#2D2A26]/10 cursor-pointer transition-colors"
                        >
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-12 h-12 object-cover border border-[#2D2A26]/10"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-bold text-[#2D2A26] truncate">{product.name}</h4>
                            <p className="text-[10px] text-[#2D2A26]/60 truncate">{product.tagline}</p>
                            <span className="text-xs font-serif text-[#2D2A26]">${product.price}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-[#2D2A26]/60 text-center py-4">No botanical candles matching &quot;{searchQuery}&quot;</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Scent Quiz Button */}
            <button
              id="header-quiz-btn"
              onClick={onOpenQuiz}
              className="hidden lg:flex items-center gap-1.5 px-3.5 py-1.5 border border-[#2D2A26]/20 bg-[#F1EFE9] text-[10px] font-bold uppercase tracking-[0.15em] text-[#2D2A26] hover:bg-[#2D2A26] hover:text-white transition-colors cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-[#B4A68D]" />
              <span>Scent Quiz</span>
            </button>

            {/* Wishlist Button */}
            <button
              id="header-wishlist-btn"
              onClick={onOpenWishlist}
              className="p-2 text-[#2D2A26] hover:opacity-60 transition-opacity relative cursor-pointer"
              title="Saved Favorites"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-[#2D2A26] text-white text-[9px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              id="header-cart-btn"
              onClick={onOpenCart}
              className="flex items-center gap-2 px-4 py-2 bg-[#2D2A26] hover:bg-[#B4A68D] text-white transition-colors cursor-pointer"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#B4A68D]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]">Bag ({cartCount})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF9F6] border-t border-[#2D2A26]/10 px-6 py-5 space-y-4 animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#2D2A26]">
            <button
              onClick={() => { onNavigate('shop'); setMobileMenuOpen(false); }}
              className="text-left py-2 border-b border-[#2D2A26]/10 hover:opacity-60"
            >
              Shop Candles
            </button>
            <button
              onClick={() => { onNavigate('bundles'); setMobileMenuOpen(false); }}
              className="text-left py-2 border-b border-[#2D2A26]/10 hover:opacity-60 flex items-center justify-between"
            >
              <span>Custom Discovery Flights</span>
              <span className="text-[9px] bg-[#E8E4DB] text-[#2D2A26] px-2 py-0.5 border border-[#2D2A26]/10">20% OFF</span>
            </button>
            <button
              onClick={() => { onNavigate('about'); setMobileMenuOpen(false); }}
              className="text-left py-2 border-b border-[#2D2A26]/10 hover:opacity-60"
            >
              The Studio Craft
            </button>
            <button
              onClick={() => { onNavigate('care'); setMobileMenuOpen(false); }}
              className="text-left py-2 border-b border-[#2D2A26]/10 hover:opacity-60"
            >
              Candle Care &amp; Burn Tips
            </button>
            <button
              onClick={() => { onOpenQuiz(); setMobileMenuOpen(false); }}
              className="flex items-center gap-2 py-2 text-[#B4A68D] font-bold"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Scent Quiz</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
