import React, { useState, useEffect } from 'react';
import { INITIAL_PRODUCTS } from './data/products';
import { 
  Product, CartItem, ProductVariantSize, ProductVariantWick, 
  FilterOptions, CategoryType 
} from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ValueProps } from './components/ValueProps';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetailPage } from './components/ProductDetailPage';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ScentQuizModal } from './components/ScentQuizModal';
import { BundleBuilder } from './components/BundleBuilder';
import { AboutSection } from './components/AboutSection';
import { CandleCareGuide } from './components/CandleCareGuide';
import { Testimonials } from './components/Testimonials';
import { WishlistModal } from './components/WishlistModal';
import { Footer } from './components/Footer';

export default function App() {
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  
  // Cart state with localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('aura_botanica_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state with localStorage
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('aura_botanica_wishlist');
      return saved ? JSON.parse(saved) : ['nordic-fir-birch'];
    } catch {
      return ['nordic-fir-birch'];
    }
  });

  // Promo code & gift notes
  const [appliedPromo, setAppliedPromo] = useState<string>('');
  const [giftNote, setGiftNote] = useState<string>('');

  // Modals & Navigation state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);

  // Catalog Filter State
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    category: 'all',
    scentFamily: '',
    maxPrice: 100,
    sortBy: 'featured',
    searchQuery: '',
  });

  // Sync Cart to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('aura_botanica_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  // Sync Wishlist to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('aura_botanica_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Cart operations
  const handleAddToCart = (
    product: Product,
    size: ProductVariantSize,
    wick: ProductVariantWick,
    giftWrap: boolean,
    quantity: number
  ) => {
    const existingIndex = cartItems.findIndex(
      item => item.product.id === product.id &&
              item.selectedSize.id === size.id &&
              item.selectedWick.id === wick.id &&
              item.giftWrap === giftWrap
    );

    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += quantity;
      setCartItems(updated);
    } else {
      const newItem: CartItem = {
        id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        product,
        selectedSize: size,
        selectedWick: wick,
        giftWrap,
        quantity,
      };
      setCartItems([...cartItems, newItem]);
    }
    setCartOpen(true);
  };

  const handleQuickAdd = (product: Product) => {
    const defaultSize = product.sizes[0] || {
      id: 'standard', name: 'Standard Jar', weight: '340g', price: product.price, burnTime: product.burnTime
    };
    const defaultWick = product.wickOptions[0] || {
      id: 'wood', name: 'Crackling Wood Wick', description: 'Timber wood wick'
    };
    handleAddToCart(product, defaultSize, defaultWick, false, 1);
  };

  const handleUpdateQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      setCartItems(cartItems.filter(item => item.id !== id));
    } else {
      setCartItems(cartItems.map(item => item.id === id ? { ...item, quantity: newQty } : item));
    }
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleToggleWishlist = (product: Product) => {
    if (wishlist.includes(product.id)) {
      setWishlist(wishlist.filter(id => id !== product.id));
    } else {
      setWishlist([...wishlist, product.id]);
    }
  };

  const handleApplyPromo = (code: string) => {
    if (code === 'BOTANICA15') {
      setAppliedPromo('BOTANICA15');
      return { success: true, message: 'Success! 15% discount applied to your bag.' };
    }
    if (code === 'BOTANICA10') {
      setAppliedPromo('BOTANICA10');
      return { success: true, message: 'Welcome! 10% discount applied to your bag.' };
    }
    if (code === 'FREESHIP') {
      setAppliedPromo('FREESHIP');
      return { success: true, message: 'Free express shipping promo applied!' };
    }
    return { success: false, message: 'Invalid code. Try BOTANICA15 or BOTANICA10' };
  };

  const handleAddBundleToCart = (selectedProducts: Product[], wickTypeName: string, giftBox: boolean) => {
    const bundleProduct: Product = {
      id: `custom-bundle-${Date.now()}`,
      name: `Custom Trio Flight (${selectedProducts.map(p => p.name.split('&')[0].trim()).join(', ')})`,
      tagline: 'Custom curated 3x 8oz Discovery Flight',
      description: `Includes: ${selectedProducts.map(p => p.name).join(' + ')}. Hand-poured with pure soy wax.`,
      story: 'Artisan hand-blended trio gift flight.',
      price: 58,
      originalPrice: 72,
      category: 'bundles',
      images: selectedProducts.map(p => p.images[0]),
      rating: 5.0,
      reviewsCount: 1,
      burnTime: '115+ total hrs',
      waxType: '100% Midwestern Soy Wax',
      vesselMaterial: '3x Ceramic Vessels in Gift Box',
      scentThrow: 4,
      mood: ['Custom Flight', 'Discovery', 'Gift'],
      scentNotes: {
        top: selectedProducts.flatMap(p => p.scentNotes.top.slice(0, 1)),
        heart: selectedProducts.flatMap(p => p.scentNotes.heart.slice(0, 1)),
        base: selectedProducts.flatMap(p => p.scentNotes.base.slice(0, 1))
      },
      sizes: [{ id: '3x8oz', name: '3x 8 oz Flight', weight: '680g', price: 58, burnTime: '115+ hrs' }],
      wickOptions: [{ id: 'bundle-wick', name: wickTypeName, description: 'Selected wick craft' }],
      stockStatus: 'in_stock',
      stockCount: 50,
      handPouredIn: 'Studio Micro-batch',
      batchNumber: 'Custom Box',
      reviews: []
    };

    handleAddToCart(
      bundleProduct,
      bundleProduct.sizes[0],
      bundleProduct.wickOptions[0],
      false,
      1
    );
  };

  const handleSmoothNavigate = (sectionId: string) => {
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (sectionId === 'shop') {
      const el = document.getElementById('shop-catalog-section');
      el?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (sectionId === 'bundles') {
      const el = document.getElementById('bundles-section');
      el?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (sectionId === 'about') {
      const el = document.getElementById('about-craft-section');
      el?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (sectionId === 'care') {
      const el = document.getElementById('candle-care-section');
      el?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#28221D] font-sans antialiased selection:bg-[#E2D5C3]">
      
      {/* Global Header */}
      <Header
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setCartOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
        onOpenQuiz={() => setQuizOpen(true)}
        onNavigate={handleSmoothNavigate}
        products={products}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onShopClick={() => handleSmoothNavigate('shop')}
          onQuizClick={() => setQuizOpen(true)}
          onFeaturedProductClick={(p) => setSelectedProduct(p)}
          featuredProduct={products[0]}
        />

        {/* Value Proposition Highlights */}
        <ValueProps />

        {/* Product Catalog Grid */}
        <ProductGrid
          products={products}
          filterOptions={filterOptions}
          onFilterChange={(newOpts) => setFilterOptions({ ...filterOptions, ...newOpts })}
          onSelectProduct={(p) => setSelectedProduct(p)}
          onQuickAdd={handleQuickAdd}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
        />

        {/* Interactive Custom Bundle / Gift Flight Builder */}
        <BundleBuilder
          products={products}
          onAddBundleToCart={handleAddBundleToCart}
        />

        {/* About Studio Craft & Sourcing */}
        <AboutSection />

        {/* Mindful Candle Care & Burn Rituals */}
        <CandleCareGuide />

        {/* Customer Reviews & Press Accolades */}
        <Testimonials />
      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={handleSmoothNavigate}
        onOpenQuiz={() => setQuizOpen(true)}
      />

      {/* Modals & Drawers */}

      {/* Product Detail Modal (PDP) */}
      {selectedProduct && (
        <ProductDetailPage
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={(p, sz, wk, gw, qty) => {
            handleAddToCart(p, sz, wk, gw, qty);
          }}
          isWishlisted={wishlist.includes(selectedProduct.id)}
          onToggleWishlist={handleToggleWishlist}
          onSelectRelatedProduct={(rel) => setSelectedProduct(rel)}
          allProducts={products}
        />
      )}

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
        appliedPromo={appliedPromo}
        onApplyPromo={handleApplyPromo}
        onRemovePromo={() => setAppliedPromo('')}
        giftNote={giftNote}
        onUpdateGiftNote={setGiftNote}
      />

      {/* Full Checkout Modal */}
      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        cartItems={cartItems}
        onOrderCompleted={() => {
          setCartItems([]);
          setAppliedPromo('');
          setGiftNote('');
        }}
        appliedPromo={appliedPromo}
        giftNote={giftNote}
      />

      {/* Scent Matcher Quiz Modal */}
      <ScentQuizModal
        isOpen={quizOpen}
        onClose={() => setQuizOpen(false)}
        products={products}
        onSelectProduct={(p) => setSelectedProduct(p)}
        onQuickAdd={handleQuickAdd}
      />

      {/* Saved Favorites / Wishlist Modal */}
      <WishlistModal
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        wishlistIds={wishlist}
        products={products}
        onRemoveWishlist={handleToggleWishlist}
        onQuickAdd={handleQuickAdd}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />
    </div>
  );
}
