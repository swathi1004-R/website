import React, { useState } from 'react';
import { Sparkles, Mail, Check, Leaf, Shield, Heart, ArrowRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenQuiz: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenQuiz }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
  };

  return (
    <footer className="bg-[#2D2A26] text-[#FAF9F6] pt-16 pb-12 border-t border-[#2D2A26]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Newsletter Callout */}
        <div className="p-8 sm:p-10 bg-[#25221F] border border-[#FAF9F6]/10 mb-16 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-2 text-left">
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#B4A68D] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Botanical Gazette</span>
              </span>
              <h3 className="text-2xl sm:text-4xl font-serif text-white leading-tight">
                Join our circle for 10% off your first sanctuary harvest.
              </h3>
              <p className="text-xs sm:text-sm text-[#FAF9F6]/60 leading-relaxed">
                Receive private batch invitations, seasonal scent release notifications, and holistic home rituals.
              </p>
            </div>

            <div className="lg:col-span-6">
              {subscribed ? (
                <div className="p-4 bg-[#384835] border border-[#4C6448] text-center space-y-1">
                  <div className="flex items-center justify-center gap-1.5 text-white font-bold text-xs uppercase tracking-wider">
                    <Check className="w-4 h-4 text-[#A1D799]" />
                    <span>Welcome to Aura &amp; Botanica</span>
                  </div>
                  <p className="text-xs text-[#CFE4CB]">
                    Use discount code <strong className="font-mono text-white bg-black/30 px-2 py-0.5">BOTANICA10</strong> at checkout.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <input
                      type="email"
                      required
                      placeholder="Enter your email address..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3.5 pl-10 bg-[#1F1C19] border border-[#FAF9F6]/20 text-white text-xs placeholder:text-[#FAF9F6]/40 focus:outline-none focus:border-[#B4A68D]"
                    />
                    <Mail className="w-4 h-4 text-[#FAF9F6]/40 absolute left-3.5 top-4" />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3.5 bg-[#B4A68D] hover:bg-[#FAF9F6] text-[#2D2A26] text-[10px] font-bold uppercase tracking-[0.2em] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-[#FAF9F6]/10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-serif text-2xl font-bold tracking-[0.15em] text-white">
              AURA &amp; BOTANICA
            </h4>
            <p className="text-xs text-[#FAF9F6]/60 leading-relaxed max-w-sm">
              Artisan hand-poured 100% Midwestern soy wax candles with pure botanical extracts, crackling timber wicks, and circular ceramic vessels. Formulated for mindful living.
            </p>
            <div className="flex items-center gap-4 text-xs text-[#FAF9F6]/60 pt-2">
              <span className="flex items-center gap-1">
                <Leaf className="w-3.5 h-3.5 text-[#B4A68D]" />
                100% Vegan
              </span>
              <span>&bull;</span>
              <span>Cruelty-Free</span>
              <span>&bull;</span>
              <span>Pacific Northwest</span>
            </div>
          </div>

          {/* Col 1: Shop */}
          <div className="space-y-3">
            <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B4A68D]">Collections</h5>
            <ul className="space-y-2 text-xs text-[#FAF9F6]/70">
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-white transition-colors cursor-pointer">
                  Woody &amp; Hearth
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-white transition-colors cursor-pointer">
                  Amber &amp; Tranquility
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop')} className="hover:text-white transition-colors cursor-pointer">
                  Eucalyptus &amp; Fresh Herb
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('bundles')} className="hover:text-white transition-colors cursor-pointer">
                  Trio Discovery Flights
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: Studio */}
          <div className="space-y-3">
            <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B4A68D]">The Studio</h5>
            <ul className="space-y-2 text-xs text-[#FAF9F6]/70">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors cursor-pointer">
                  Our Hand-Pouring Craft
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('care')} className="hover:text-white transition-colors cursor-pointer">
                  Candle Care &amp; Burn Guide
                </button>
              </li>
              <li>
                <button onClick={onOpenQuiz} className="hover:text-white transition-colors cursor-pointer">
                  Scent Matcher Quiz
                </button>
              </li>
              <li>
                <span className="hover:text-white transition-colors">Sustainable Sourcing</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Assistance */}
          <div className="space-y-3">
            <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B4A68D]">Client Sanctuary</h5>
            <ul className="space-y-2 text-xs text-[#FAF9F6]/70">
              <li><span>Carbon-Neutral Dispatch</span></li>
              <li><span>30-Day Clean Burn Promise</span></li>
              <li><span>Wholesale &amp; Studio Gifting</span></li>
              <li><span>concierge@aurabotanica.com</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & payment icons */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#FAF9F6]/50 gap-4">
          <p>&copy; {new Date().getFullYear()} Aura &amp; Botanica Studio LLC. All rights reserved.</p>
          <div className="flex items-center gap-4 text-[10px] uppercase font-bold tracking-wider">
            <span>Secure 256-Bit SSL</span>
            <span>&bull;</span>
            <span>Visa, Mastercard, Amex, Apple Pay, PayPal</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
