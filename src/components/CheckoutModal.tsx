import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, Check, Lock, ShieldCheck, Truck, CreditCard, 
  ArrowLeft, ArrowRight, Sparkles, Package, MapPin, Phone, Mail, User, Clock 
} from 'lucide-react';
import { CartItem, CheckoutForm } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onOrderCompleted: () => void;
  appliedPromo: string;
  giftNote: string;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onOrderCompleted,
  appliedPromo,
  giftNote,
}) => {
  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmation'>('shipping');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const [formData, setFormData] = useState<CheckoutForm>({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: 'OR',
    zipCode: '',
    country: 'United States',
    phone: '',
    shippingMethod: 'standard',
    paymentMethod: 'card',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    cardName: '',
    saveInfo: true,
  });

  if (!isOpen) return null;

  // Calculation
  const subtotal = cartItems.reduce((sum, item) => {
    const itemUnitPrice = item.selectedSize.price + (item.giftWrap ? 4 : 0);
    return sum + itemUnitPrice * item.quantity;
  }, 0);

  let discountAmount = 0;
  if (appliedPromo === 'BOTANICA15') discountAmount = subtotal * 0.15;
  if (appliedPromo === 'BOTANICA10') discountAmount = subtotal * 0.10;

  const baseShipping = (subtotal >= 50 || appliedPromo === 'FREESHIP') ? 0 : 5.99;
  const shippingCost = formData.shippingMethod === 'express' ? baseShipping + 9.99 : baseShipping;
  const estimatedTax = (subtotal - discountAmount) * 0.08;
  const total = Math.max(0, subtotal - discountAmount + shippingCost + estimatedTax);

  const handleAutofillDemo = () => {
    setFormData({
      email: 'clara.botanicals@example.com',
      firstName: 'Clara',
      lastName: 'Vance',
      address: '742 Evergreen Terrace',
      apartment: 'Apt 4B',
      city: 'Portland',
      state: 'OR',
      zipCode: '97201',
      country: 'United States',
      phone: '(503) 555-0192',
      shippingMethod: 'standard',
      paymentMethod: 'card',
      cardNumber: '4242 •••• •••• 4242',
      cardExpiry: '08/28',
      cardCvc: '842',
      cardName: 'Clara Vance',
      saveInfo: true,
    });
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.firstName || !formData.address) {
      alert('Please fill out all required shipping fields or use the Quick Autofill button.');
      return;
    }
    setStep('payment');
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const generatedOrderNum = `AB-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderNumber(generatedOrderNum);
      setStep('confirmation');
      onOrderCompleted();

      // Trigger Celebration Confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#A86842', '#7E9B76', '#D6B485', '#3E342B']
        });
      } catch (err) {
        // Safe fallback
      }
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#1C1814]/75 backdrop-blur-sm flex justify-center p-2 sm:p-4 lg:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-[#FAF9F6] shadow-2xl border border-[#2D2A26]/15 overflow-hidden my-auto max-h-[94vh] flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#2D2A26]/10 flex items-center justify-between bg-[#FAF9F6] sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <span className="font-serif font-bold text-lg text-[#2D2A26] tracking-[0.2em]">AURA &amp; BOTANICA</span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#2D2A26]/50 hidden sm:inline">&bull; Secure Checkout</span>
          </div>

          <div className="flex items-center gap-4">
            {step !== 'confirmation' && (
              <button
                onClick={handleAutofillDemo}
                className="px-3 py-1.5 bg-[#F1EFE9] border border-[#2D2A26]/10 hover:bg-[#E8E4DB] text-[#2D2A26] text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Populate test shipping & card data"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#B4A68D]" />
                <span>Quick Demo Fill</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-1.5 text-[#2D2A26]/60 hover:text-[#2D2A26] hover:bg-[#F1EFE9] transition-colors cursor-pointer"
              aria-label="Close checkout"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Checkout Body */}
        <div className="overflow-y-auto p-6 sm:p-8 lg:p-10 flex-1">
          {step === 'confirmation' ? (
            /* Confirmation Screen */
            <div className="max-w-2xl mx-auto text-center py-8 space-y-6">
              <div className="w-16 h-16 bg-[#E8EFE5] border border-[#3D6638]/20 text-[#3D6638] flex items-center justify-center mx-auto">
                <Check className="w-8 h-8 stroke-[2.5]" />
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#B4A68D]">Thank You For Your Patronage</span>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2D2A26] mt-1">
                  Your Order Is Confirmed
                </h2>
                <p className="text-xs text-[#2D2A26]/70 mt-2 leading-relaxed">
                  We have dispatched confirmation &amp; batch tracking details to <strong>{formData.email || 'your email'}</strong>.
                </p>
              </div>

              {/* Order Receipt Box */}
              <div className="bg-[#F1EFE9] p-6 border border-[#2D2A26]/10 text-left space-y-4">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-4 border-b border-[#2D2A26]/10 gap-2">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#2D2A26]/60">Order Number:</span>
                    <p className="font-mono text-base font-bold text-[#2D2A26]">{orderNumber}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#2D2A26]/60">Estimated Hand-Pour &amp; Arrival:</span>
                    <p className="text-xs font-semibold text-[#2D2A26]">3-5 Business Days (Carbon-Neutral)</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#2D2A26]/70">Purchased Botanicals ({cartItems.length} items):</span>
                  {cartItems.map(item => (
                    <div key={item.id} className="flex justify-between items-center text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#2D2A26]">{item.quantity}x</span>
                        <span className="text-[#2D2A26]/80">{item.product.name} ({item.selectedSize.name})</span>
                      </div>
                      <span className="font-serif font-bold text-[#2D2A26]">${(item.selectedSize.price + (item.giftWrap ? 4 : 0)) * item.quantity}</span>
                    </div>
                  ))}
                </div>

                {giftNote && (
                  <div className="p-3 bg-[#FAF9F6] border border-[#2D2A26]/10 text-xs">
                    <span className="font-bold text-[#B4A68D] block mb-0.5 text-[10px] uppercase tracking-wider">Handwritten Gift Message:</span>
                    <p className="italic text-[#2D2A26]/80">&quot;{giftNote}&quot;</p>
                  </div>
                )}

                <div className="pt-3 border-t border-[#2D2A26]/10 flex justify-between font-bold text-sm text-[#2D2A26]">
                  <span>Total Amount Paid:</span>
                  <span className="font-serif">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Return to shop */}
              <button
                id="confirmation-back-to-shop-btn"
                onClick={onClose}
                className="px-8 py-3.5 bg-[#2D2A26] text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#B4A68D] transition-colors cursor-pointer"
              >
                Continue Exploring Scents
              </button>
            </div>
          ) : (
            /* Multi-step Form & Order Summary Grid */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              
              {/* Left Column: Form Steps */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Step indicator */}
                <div className="flex items-center gap-3 text-[10px] uppercase font-bold tracking-wider pb-2 border-b border-[#2D2A26]/10">
                  <span className={`px-3 py-1 ${step === 'shipping' ? 'bg-[#2D2A26] text-white' : 'bg-[#F1EFE9] text-[#2D2A26]/60 border border-[#2D2A26]/10'}`}>
                    1. Shipping &amp; Delivery
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#2D2A26]/30" />
                  <span className={`px-3 py-1 ${step === 'payment' ? 'bg-[#2D2A26] text-white' : 'bg-[#F1EFE9] text-[#2D2A26]/60 border border-[#2D2A26]/10'}`}>
                    2. Payment &amp; Review
                  </span>
                </div>

                {step === 'shipping' ? (
                  <form onSubmit={handleProceedToPayment} className="space-y-5 text-xs">
                    {/* Contact info */}
                    <div className="space-y-3">
                      <h3 className="font-serif text-base font-bold text-[#2D2A26]">Contact Information</h3>
                      <div>
                        <label className="block text-[#2D2A26] text-[10px] font-bold uppercase tracking-wider mb-1">Email for order receipt &amp; tracking *</label>
                        <div className="relative">
                          <input
                            type="email"
                            required
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full pl-9 pr-3 py-2.5 border border-[#2D2A26]/20 bg-white focus:outline-none focus:border-[#2D2A26]"
                          />
                          <Mail className="w-4 h-4 text-[#2D2A26]/40 absolute left-3 top-3" />
                        </div>
                      </div>
                    </div>

                    {/* Shipping address */}
                    <div className="space-y-3 pt-2">
                      <h3 className="font-serif text-base font-bold text-[#2D2A26]">Shipping Destination</h3>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[#2D2A26] text-[10px] font-bold uppercase tracking-wider mb-1">First Name *</label>
                          <input
                            type="text"
                            required
                            placeholder="Clara"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            className="w-full px-3 py-2.5 border border-[#2D2A26]/20 bg-white focus:outline-none focus:border-[#2D2A26]"
                          />
                        </div>
                        <div>
                          <label className="block text-[#2D2A26] text-[10px] font-bold uppercase tracking-wider mb-1">Last Name *</label>
                          <input
                            type="text"
                            required
                            placeholder="Vance"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            className="w-full px-3 py-2.5 border border-[#2D2A26]/20 bg-white focus:outline-none focus:border-[#2D2A26]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[#2D2A26] text-[10px] font-bold uppercase tracking-wider mb-1">Street Address *</label>
                        <div className="relative">
                          <input
                            type="text"
                            required
                            placeholder="742 Evergreen Terrace"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            className="w-full pl-9 pr-3 py-2.5 border border-[#2D2A26]/20 bg-white focus:outline-none focus:border-[#2D2A26]"
                          />
                          <MapPin className="w-4 h-4 text-[#2D2A26]/40 absolute left-3 top-3" />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[#2D2A26] text-[10px] font-bold uppercase tracking-wider mb-1">City *</label>
                          <input
                            type="text"
                            required
                            placeholder="Portland"
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            className="w-full px-3 py-2.5 border border-[#2D2A26]/20 bg-white focus:outline-none focus:border-[#2D2A26]"
                          />
                        </div>
                        <div>
                          <label className="block text-[#2D2A26] text-[10px] font-bold uppercase tracking-wider mb-1">State / Province</label>
                          <input
                            type="text"
                            placeholder="OR"
                            value={formData.state}
                            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                            className="w-full px-3 py-2.5 border border-[#2D2A26]/20 bg-white focus:outline-none focus:border-[#2D2A26]"
                          />
                        </div>
                        <div>
                          <label className="block text-[#2D2A26] text-[10px] font-bold uppercase tracking-wider mb-1">Zip Code *</label>
                          <input
                            type="text"
                            required
                            placeholder="97201"
                            value={formData.zipCode}
                            onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                            className="w-full px-3 py-2.5 border border-[#2D2A26]/20 bg-white focus:outline-none focus:border-[#2D2A26]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Shipping Method Choice */}
                    <div className="space-y-2.5 pt-2">
                      <h3 className="font-serif text-base font-bold text-[#2D2A26]">Delivery Tier</h3>
                      <div className="space-y-2">
                        <label 
                          onClick={() => setFormData({ ...formData, shippingMethod: 'standard' })}
                          className={`p-3 border flex items-center justify-between cursor-pointer transition-all ${
                            formData.shippingMethod === 'standard' ? 'border-[#2D2A26] bg-[#F1EFE9]' : 'border-[#2D2A26]/15 bg-[#FAF9F6]'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input 
                              type="radio" 
                              name="shipping" 
                              checked={formData.shippingMethod === 'standard'} 
                              onChange={() => {}} 
                            />
                            <div>
                              <p className="font-bold text-[#2D2A26]">Carbon-Neutral Ground Shipping</p>
                              <p className="text-[#2D2A26]/60 text-[11px]">3-5 Business Days &bull; 100% Offset</p>
                            </div>
                          </div>
                          <span className="font-serif font-bold text-[#2D2A26]">{baseShipping === 0 ? 'FREE' : `$${baseShipping}`}</span>
                        </label>

                        <label 
                          onClick={() => setFormData({ ...formData, shippingMethod: 'express' })}
                          className={`p-3 border flex items-center justify-between cursor-pointer transition-all ${
                            formData.shippingMethod === 'express' ? 'border-[#2D2A26] bg-[#F1EFE9]' : 'border-[#2D2A26]/15 bg-[#FAF9F6]'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input 
                              type="radio" 
                              name="shipping" 
                              checked={formData.shippingMethod === 'express'} 
                              onChange={() => {}} 
                            />
                            <div>
                              <p className="font-bold text-[#2D2A26]">Priority Air Dispatch</p>
                              <p className="text-[#2D2A26]/60 text-[11px]">1-2 Business Days Express</p>
                            </div>
                          </div>
                          <span className="font-serif font-bold text-[#2D2A26]">+${(baseShipping + 9.99).toFixed(2)}</span>
                        </label>
                      </div>
                    </div>

                    <button
                      id="proceed-to-payment-step-btn"
                      type="submit"
                      className="w-full py-4 bg-[#2D2A26] hover:bg-[#B4A68D] text-white font-bold text-[10px] uppercase tracking-[0.2em] shadow-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <span>Continue to Payment</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handlePlaceOrder} className="space-y-5 text-xs">
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif text-lg font-bold text-[#2D2A26]">Select Payment Method</h3>
                      <button
                        type="button"
                        onClick={() => setStep('shipping')}
                        className="text-[10px] uppercase font-bold tracking-wider text-[#2D2A26]/60 hover:text-[#2D2A26] flex items-center gap-1"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Edit Shipping</span>
                      </button>
                    </div>

                    {/* Payment Types */}
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'card', label: 'Credit Card', icon: CreditCard },
                        { id: 'applepay', label: 'Apple Pay', icon: Lock },
                        { id: 'paypal', label: 'PayPal', icon: ShieldCheck },
                      ].map(method => (
                        <button
                          key={method.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, paymentMethod: method.id as any })}
                          className={`p-3 border flex flex-col items-center justify-center gap-1.5 transition-all text-[10px] uppercase font-bold tracking-wider ${
                            formData.paymentMethod === method.id
                              ? 'border-[#2D2A26] bg-[#F1EFE9] text-[#2D2A26]'
                              : 'border-[#2D2A26]/15 bg-[#FAF9F6] text-[#2D2A26]/60'
                          }`}
                        >
                          <method.icon className="w-4 h-4" />
                          <span>{method.label}</span>
                        </button>
                      ))}
                    </div>

                    {/* Card Fields */}
                    {formData.paymentMethod === 'card' && (
                      <div className="p-4 bg-[#F1EFE9] border border-[#2D2A26]/10 space-y-3">
                        <div>
                          <label className="block text-[#2D2A26] text-[10px] font-bold uppercase tracking-wider mb-1">Cardholder Name *</label>
                          <input
                            type="text"
                            required
                            placeholder="Clara Vance"
                            value={formData.cardName}
                            onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                            className="w-full px-3 py-2 border border-[#2D2A26]/20 bg-white focus:outline-none focus:border-[#2D2A26]"
                          />
                        </div>

                        <div>
                          <label className="block text-[#2D2A26] text-[10px] font-bold uppercase tracking-wider mb-1">Card Number *</label>
                          <div className="relative">
                            <input
                              type="text"
                              required
                              placeholder="4242 4242 4242 4242"
                              value={formData.cardNumber}
                              onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                              className="w-full pl-9 pr-3 py-2 border border-[#2D2A26]/20 bg-white focus:outline-none focus:border-[#2D2A26]"
                            />
                            <CreditCard className="w-4 h-4 text-[#2D2A26]/40 absolute left-3 top-2.5" />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[#2D2A26] text-[10px] font-bold uppercase tracking-wider mb-1">Expiration (MM/YY) *</label>
                            <input
                              type="text"
                              required
                              placeholder="08/28"
                              value={formData.cardExpiry}
                              onChange={(e) => setFormData({ ...formData, cardExpiry: e.target.value })}
                              className="w-full px-3 py-2 border border-[#2D2A26]/20 bg-white focus:outline-none focus:border-[#2D2A26]"
                            />
                          </div>
                          <div>
                            <label className="block text-[#2D2A26] text-[10px] font-bold uppercase tracking-wider mb-1">Security CVC *</label>
                            <input
                              type="text"
                              required
                              placeholder="842"
                              value={formData.cardCvc}
                              onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                              className="w-full px-3 py-2 border border-[#2D2A26]/20 bg-white focus:outline-none focus:border-[#2D2A26]"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {formData.paymentMethod !== 'card' && (
                      <div className="p-6 bg-[#F1EFE9] border border-[#2D2A26]/10 text-center space-y-2">
                        <p className="font-bold text-[#2D2A26]">You will authorize payment securely via {formData.paymentMethod === 'applepay' ? 'Apple Pay Touch/Face ID' : 'PayPal'}</p>
                        <p className="text-xs text-[#2D2A26]/60">Your botanical items will ship immediately once authorized.</p>
                      </div>
                    )}

                    {/* Place Order Button */}
                    <button
                      id="place-order-submit-btn"
                      type="submit"
                      disabled={isProcessing}
                      className="w-full py-4 bg-[#2D2A26] hover:bg-[#B4A68D] text-white font-bold text-[10px] uppercase tracking-[0.2em] shadow-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      {isProcessing ? (
                        <div className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white border-t-transparent animate-spin"></span>
                          <span>Securing Handcrafted Order...</span>
                        </div>
                      ) : (
                        <>
                          <Lock className="w-4 h-4 text-[#B4A68D]" />
                          <span>Place Order &bull; ${total.toFixed(2)}</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>

              {/* Right Column: Order Summary Card */}
              <div className="lg:col-span-5 bg-[#F1EFE9] p-6 border border-[#2D2A26]/10 space-y-4">
                <h3 className="font-serif text-lg font-bold text-[#2D2A26]">Order Summary</h3>

                {/* Items preview */}
                <div className="max-h-48 overflow-y-auto space-y-2.5 pr-1">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex items-center gap-3">
                      <img src={item.product.images[0]} alt="" className="w-12 h-12 object-cover border border-[#2D2A26]/10" />
                      <div className="flex-1 min-w-0 text-xs">
                        <h5 className="font-bold text-[#2D2A26] truncate">{item.product.name}</h5>
                        <p className="text-[10px] text-[#2D2A26]/60">{item.selectedSize.name} &bull; Qty {item.quantity}</p>
                      </div>
                      <span className="text-xs font-serif font-bold text-[#2D2A26]">
                        ${(item.selectedSize.price + (item.giftWrap ? 4 : 0)) * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Pricing summary */}
                <div className="space-y-1.5 pt-3 border-t border-[#2D2A26]/10 text-xs text-[#2D2A26]/70">
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
                    <span>Total Due</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Trust callouts */}
                <div className="p-3 bg-[#FAF9F6] border border-[#2D2A26]/10 space-y-1 text-[10px] text-[#2D2A26]/70">
                  <p className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[#2D2A26]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#3D6638]" />
                    30-Day Aroma Guarantee
                  </p>
                  <p className="leading-relaxed">If the fragrance does not elevate your home, return it cleanly for a full refund or exchange.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
