import React from 'react';
import { Sparkles, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { Product, CategoryType, FilterOptions } from '../types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  filterOptions: FilterOptions;
  onFilterChange: (newOptions: Partial<FilterOptions>) => void;
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
  wishlist: string[];
  onToggleWishlist: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  filterOptions,
  onFilterChange,
  onSelectProduct,
  onQuickAdd,
  wishlist,
  onToggleWishlist,
}) => {
  const categories: { id: CategoryType; label: string }[] = [
    { id: 'all', label: 'All Fragrances' },
    { id: 'woody', label: 'Woody & Smoked' },
    { id: 'calm', label: 'Amber & Calm' },
    { id: 'floral', label: 'Floral & Botanical' },
    { id: 'citrus', label: 'Eucalyptus & Fresh' },
    { id: 'bundles', label: 'Gift Sets' },
    { id: 'accessories', label: 'Candle Care' },
  ];

  // Filtering
  const filteredProducts = products.filter(p => {
    if (filterOptions.category !== 'all' && p.category !== filterOptions.category) {
      return false;
    }
    if (filterOptions.searchQuery) {
      const q = filterOptions.searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchTagline = p.tagline.toLowerCase().includes(q);
      const matchNotes = [...p.scentNotes.top, ...p.scentNotes.heart, ...p.scentNotes.base].some(n => n.toLowerCase().includes(q));
      if (!matchName && !matchTagline && !matchNotes) return false;
    }
    return true;
  });

  // Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (filterOptions.sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'burnTime':
        return b.reviewsCount - a.reviewsCount;
      default:
        return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
    }
  });

  return (
    <section id="shop-catalog-section" className="py-16 sm:py-24 bg-[#FAF9F6] border-b border-[#2D2A26]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#2D2A26]/10">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.25em] uppercase text-[#B4A68D]">
              <Sparkles className="w-3 h-3" />
              <span>Studio Botanical Catalog</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif text-[#2D2A26] mt-1.5">
              Handcrafted In Small Batches
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#2D2A26]/70 max-w-md mt-3 md:mt-0 leading-relaxed">
            Slow-poured using pure botanical oils, zero artificial stabilizers, and 100% Midwestern family-farmed soy wax.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-10">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat.id}
                id={`cat-filter-${cat.id}`}
                onClick={() => onFilterChange({ category: cat.id })}
                className={`px-4 py-2 text-[10px] font-bold tracking-[0.15em] uppercase whitespace-nowrap transition-all cursor-pointer border ${
                  filterOptions.category === cat.id
                    ? 'bg-[#2D2A26] text-white border-[#2D2A26] shadow-sm'
                    : 'bg-[#F1EFE9] text-[#2D2A26] border-[#2D2A26]/10 hover:border-[#2D2A26]/30'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-3 self-end lg:self-auto">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#2D2A26]/60 hidden sm:inline">Sort:</span>
            <div className="relative">
              <select
                id="sort-products-select"
                value={filterOptions.sortBy}
                onChange={(e) => onFilterChange({ sortBy: e.target.value as any })}
                className="appearance-none bg-[#F1EFE9] text-[#2D2A26] text-[11px] font-bold uppercase tracking-wider py-2 pl-3 pr-8 border border-[#2D2A26]/15 focus:outline-none focus:border-[#2D2A26] cursor-pointer"
              >
                <option value="featured">Featured / Bestselling</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="burnTime">Most Popular</option>
              </select>
              <ArrowUpDown className="w-3 h-3 text-[#2D2A26]/60 absolute right-2.5 top-3 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sortedProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={onSelectProduct}
                onQuickAdd={onQuickAdd}
                isWishlisted={wishlist.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#F1EFE9] border border-[#2D2A26]/10">
            <p className="text-xl font-serif text-[#2D2A26]">No candles found</p>
            <p className="text-xs text-[#2D2A26]/70 mt-1">Try clearing your search query or selecting a different fragrance family.</p>
            <button
              onClick={() => onFilterChange({ category: 'all', searchQuery: '' })}
              className="mt-4 px-6 py-2.5 bg-[#2D2A26] text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#B4A68D] cursor-pointer transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
