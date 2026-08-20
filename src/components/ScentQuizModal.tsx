import React, { useState } from 'react';
import { Sparkles, X, ArrowRight, ArrowLeft, Check, Compass, Flame, Leaf, Heart } from 'lucide-react';
import { Product } from '../types';

interface ScentQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onQuickAdd: (product: Product) => void;
}

export const ScentQuizModal: React.FC<ScentQuizModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
  onQuickAdd,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    room: '',
    mood: '',
    family: '',
    wick: 'wood',
  });
  const [recommendation, setRecommendation] = useState<Product | null>(null);

  if (!isOpen) return null;

  const questions = [
    {
      title: 'Where will your candle live?',
      subtitle: 'Different room sizes and environments benefit from specific fragrance profiles.',
      key: 'room',
      options: [
        { id: 'living', label: 'Living Room & Hearth', desc: 'Warm, welcoming gathering spaces with higher airflow' },
        { id: 'bedroom', label: 'Bedroom & Sanctuary', desc: 'Restful, calming environment for restorative sleep' },
        { id: 'bath', label: 'Bath & Spa Oasis', desc: 'Cleansing steam, eucalyptus and uplifting botanical herbal notes' },
        { id: 'office', label: 'Creative Studio / Office', desc: 'Focused, crisp botanicals to inspire clarity and concentration' },
      ],
    },
    {
      title: 'What mood are you cultivating?',
      subtitle: 'Aromatherapy affects heart rate, mood, and mental focus.',
      key: 'mood',
      options: [
        { id: 'grounded', label: 'Grounded & Fireside', desc: 'Smoky cedar, Nordic fir needles, and ancient amber' },
        { id: 'calm', label: 'Deep Tranquility & Rest', desc: 'French lavender, white tea buds, and creamy cashmere' },
        { id: 'vitality', label: 'Fresh Clarity & Energy', desc: 'Crisp wild mint, crushed eucalyptus, and Italian bergamot' },
        { id: 'sensual', label: 'Intimate Warmth & Allure', desc: 'Virginia tobacco leaves, bourbon cardamom, and warm vanilla' },
      ],
    },
    {
      title: 'Which scent family resonates most?',
      subtitle: 'Select the primary aromatic olfactory pyramid you love.',
      key: 'family',
      options: [
        { id: 'woody', label: 'Earthy Evergreen & Charred Wood', category: 'woody' },
        { id: 'calm', label: 'Golden Amber, Tonka & Sandalwood', category: 'calm' },
        { id: 'citrus', label: 'Herbal Eucalyptus & Wild Citrus', category: 'citrus' },
        { id: 'floral', label: 'Botanical Lavender & Green Fig Leaf', category: 'floral' },
      ],
    },
  ];

  const handleSelectOption = (key: string, value: string) => {
    const updated = { ...answers, [key]: value };
    setAnswers(updated);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Find match
      const matched = products.find(p => p.category === updated.family) || products[0];
      setRecommendation(matched);
      setCurrentStep(questions.length);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({ room: '', mood: '', family: '', wick: 'wood' });
    setRecommendation(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#1C1814]/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#FAF9F6] shadow-2xl border border-[#2D2A26]/15 overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#2D2A26]/10 flex items-center justify-between bg-[#FAF9F6]">
          <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-[#B4A68D]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Scent Sommelier</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#2D2A26]/60 hover:text-[#2D2A26] hover:bg-[#F1EFE9] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quiz Content */}
        <div className="p-6 sm:p-8">
          {recommendation ? (
            /* Result Screen */
            <div className="text-center space-y-6 animate-in zoom-in-95 duration-200">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F1EFE9] text-[10px] font-bold text-[#2D2A26] uppercase tracking-[0.2em] border border-[#2D2A26]/10">
                <Sparkles className="w-3.5 h-3.5 text-[#B4A68D]" />
                <span>Your Personalized Botanical Match</span>
              </div>

              <div className="max-w-md mx-auto bg-[#F1EFE9] p-6 border border-[#2D2A26]/10 shadow-sm flex flex-col sm:flex-row items-center gap-6 text-left">
                <img
                  src={recommendation.images[0]}
                  alt={recommendation.name}
                  className="w-32 h-32 object-cover border border-[#2D2A26]/10 shrink-0"
                />
                <div className="space-y-1.5 flex-1">
                  <span className="text-[9px] uppercase font-bold text-[#B4A68D] tracking-[0.2em]">{recommendation.category} collection</span>
                  <h3 className="font-serif text-xl font-bold text-[#2D2A26]">{recommendation.name}</h3>
                  <p className="text-xs text-[#2D2A26]/70 line-clamp-2 leading-relaxed">{recommendation.tagline}</p>
                  
                  <div className="pt-2 flex items-center justify-between border-t border-[#2D2A26]/10 mt-2">
                    <span className="text-sm font-serif font-bold text-[#2D2A26]">${recommendation.price}</span>
                    <span className="text-[10px] text-[#2D2A26]/60">{recommendation.burnTime}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    onSelectProduct(recommendation);
                    onClose();
                  }}
                  className="px-6 py-3 bg-[#FAF9F6] border border-[#2D2A26] text-[#2D2A26] font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-[#F1EFE9] transition-colors cursor-pointer"
                >
                  View Scent Details
                </button>
                <button
                  onClick={() => {
                    onQuickAdd(recommendation);
                    onClose();
                  }}
                  className="px-6 py-3 bg-[#2D2A26] hover:bg-[#B4A68D] text-white font-bold text-[10px] uppercase tracking-[0.2em] shadow-lg transition-colors cursor-pointer"
                >
                  Add Match to Bag &bull; ${recommendation.price}
                </button>
              </div>

              <button
                onClick={handleReset}
                className="text-[10px] font-bold uppercase tracking-wider text-[#2D2A26]/60 hover:text-[#2D2A26] underline cursor-pointer"
              >
                Retake Scent Quiz
              </button>
            </div>
          ) : (
            /* Question Steps */
            <div className="space-y-6">
              {/* Progress bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] uppercase font-bold tracking-wider text-[#2D2A26]/60">
                  <span>Question {currentStep + 1} of {questions.length}</span>
                  <span>{Math.round(((currentStep + 1) / questions.length) * 100)}%</span>
                </div>
                <div className="w-full bg-[#E8E4DB] h-1.5 overflow-hidden">
                  <div 
                    className="bg-[#2D2A26] h-full transition-all duration-300"
                    style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Title */}
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#2D2A26]">
                  {questions[currentStep].title}
                </h3>
                <p className="text-xs text-[#2D2A26]/60 mt-1">
                  {questions[currentStep].subtitle}
                </p>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {questions[currentStep].options.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(questions[currentStep].key, opt.id)}
                    className="p-4 border border-[#2D2A26]/15 bg-[#FAF9F6] hover:bg-[#F1EFE9] hover:border-[#2D2A26] text-left transition-all group cursor-pointer"
                  >
                    <div className="flex justify-between items-start">
                      <p className="text-xs font-bold text-[#2D2A26] group-hover:text-[#B4A68D]">
                        {opt.label}
                      </p>
                      <ArrowRight className="w-3.5 h-3.5 text-[#2D2A26]/40 group-hover:translate-x-1 transition-transform" />
                    </div>
                    {'desc' in opt && (
                      <p className="text-[11px] text-[#2D2A26]/60 mt-1">
                        {opt.desc}
                      </p>
                    )}
                  </button>
                ))}
              </div>

              {/* Back navigation */}
              {currentStep > 0 && (
                <div className="pt-2">
                  <button
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="text-[10px] uppercase font-bold tracking-wider text-[#2D2A26]/60 hover:text-[#2D2A26] flex items-center gap-1 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Previous Question</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
