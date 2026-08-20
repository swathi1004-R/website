export type CategoryType = 'all' | 'woody' | 'floral' | 'calm' | 'citrus' | 'accessories' | 'bundles';

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  scentPurchased: string;
  helpfulCount: number;
}

export interface ProductVariantSize {
  id: string;
  name: string;
  weight: string;
  price: number;
  burnTime: string;
}

export interface ProductVariantWick {
  id: string;
  name: string;
  description: string;
}

export interface ScentNotes {
  top: string[];
  heart: string[];
  base: string[];
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  story: string;
  price: number;
  originalPrice?: number;
  category: CategoryType;
  images: string[];
  rating: number;
  reviewsCount: number;
  burnTime: string;
  waxType: string;
  vesselMaterial: string;
  scentThrow: 1 | 2 | 3 | 4 | 5; // 1 = Subtle, 5 = Room-Filling
  mood: string[];
  scentNotes: ScentNotes;
  sizes: ProductVariantSize[];
  wickOptions: ProductVariantWick[];
  stockStatus: 'in_stock' | 'low_stock' | 'out_of_stock';
  stockCount: number;
  isBestseller?: boolean;
  isNew?: boolean;
  handPouredIn: string;
  batchNumber: string;
  reviews: Review[];
}

export interface CartItem {
  id: string; // unique item instance id
  product: Product;
  selectedSize: ProductVariantSize;
  selectedWick: ProductVariantWick;
  giftWrap: boolean;
  quantity: number;
}

export interface FilterOptions {
  category: CategoryType;
  scentFamily: string;
  maxPrice: number;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'burnTime';
  searchQuery: string;
}

export interface QuizState {
  room: string;
  mood: string;
  scentFamily: string;
  intensity: string;
}

export interface CheckoutForm {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  shippingMethod: 'standard' | 'express';
  paymentMethod: 'card' | 'applepay' | 'paypal' | 'klarna';
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
  cardName: string;
  saveInfo: boolean;
}
