import React, { useState } from 'react';
import { Compass, Sparkles, ArrowRight, RotateCcw, Check, ShoppingBag, Coffee, Heart } from 'lucide-react';
import { COFFEE_QUIZ_QUESTIONS, MENU_ITEMS } from '../data/coffeeData';
import { MenuItem } from '../types';

interface CoffeeFinderQuizProps {
  onSelectRecommended: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
}

export const CoffeeFinderQuiz: React.FC<CoffeeFinderQuizProps> = ({
  onSelectRecommended,
  onQuickAdd,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [stepId: string]: string }>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const currentStep = COFFEE_QUIZ_QUESTIONS[currentStepIndex];

  const handleSelectOption = (stepId: string, flavorKey: string) => {
    const updated = { ...answers, [stepId]: flavorKey };
    setAnswers(updated);

    if (currentStepIndex < COFFEE_QUIZ_QUESTIONS.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentStepIndex(0);
    setIsCompleted(false);
  };

  // Determine recommendation based on answers
  const recommendedItem: MenuItem = (() => {
    const flavor = answers['flavor'] || 'chocolate';
    const temp = answers['temperature'] || 'hot';
    const intensity = answers['intensity'] || 'milk';

    if (temp === 'beans') {
      if (flavor === 'floral') {
        return MENU_ITEMS.find((i) => i.id === 'ethiopia-heirloom-beans') || MENU_ITEMS[0];
      } else if (flavor === 'earthy') {
        return MENU_ITEMS.find((i) => i.id === 'sumatra-mandheling-dark-beans') || MENU_ITEMS[0];
      } else {
        return MENU_ITEMS.find((i) => i.id === 'amber-reserve-espresso-beans') || MENU_ITEMS[0];
      }
    }

    if (intensity === 'tea') {
      if (flavor === 'floral') {
        return MENU_ITEMS.find((i) => i.id === 'cascara-sparkling-spritz') || MENU_ITEMS[0];
      }
      return MENU_ITEMS.find((i) => i.id === 'matcha-blossom-cloud') || MENU_ITEMS[0];
    }

    if (temp === 'cold') {
      if (flavor === 'floral') {
        return MENU_ITEMS.find((i) => i.id === 'cardamom-tonic-espresso') || MENU_ITEMS[0];
      }
      return MENU_ITEMS.find((i) => i.id === 'nitro-cascade-cold-brew') || MENU_ITEMS[0];
    }

    // Hot
    if (flavor === 'floral') {
      return MENU_ITEMS.find((i) => i.id === 'ethiopia-yirgacheffe-pour-over') || MENU_ITEMS[0];
    } else if (flavor === 'spice') {
      return MENU_ITEMS.find((i) => i.id === 'honey-cinnamon-cortado') || MENU_ITEMS[0];
    } else if (intensity === 'black') {
      return MENU_ITEMS.find((i) => i.id === 'espresso-romano') || MENU_ITEMS[0];
    }

    return MENU_ITEMS.find((i) => i.id === 'velvet-flat-white') || MENU_ITEMS[0];
  })();

  return (
    <section id="quiz" className="py-20 bg-[#FAF7F2] scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAE2D5] border border-[#DDD3C2] text-xs font-bold text-[#8C5E3C] uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5 text-[#8C5E3C]" />
            <span>Interactive Palate Matcher</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#231A14] tracking-tight mb-3">
            Find Your Ideal Coffee Match
          </h2>
          <p className="text-xs sm:text-sm text-[#6B5C51]">
            Answer 3 quick sensory questions to discover the roast, brew method, or specialty drink crafted for your exact taste.
          </p>
        </div>

        {/* Quiz Container Card */}
        <div className="bg-[#F4EFE6] rounded-3xl border border-[#E0D7C9] p-6 sm:p-10 shadow-lg text-left">
          
          {!isCompleted ? (
            <div>
              {/* Progress Tracker */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E0D7C9]">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#8C5E3C]">
                    Question {currentStepIndex + 1} of {COFFEE_QUIZ_QUESTIONS.length}
                  </span>
                  <span className="text-xs text-[#8C7D72]">•</span>
                  <span className="text-xs font-medium text-[#4A3E37]">
                    {currentStep.title}
                  </span>
                </div>
                <div className="flex gap-1.5">
                  {COFFEE_QUIZ_QUESTIONS.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-2 rounded-full transition-all ${
                        idx === currentStepIndex
                          ? 'w-8 bg-[#3D2619]'
                          : idx < currentStepIndex
                          ? 'w-4 bg-[#8C5E3C]'
                          : 'w-4 bg-[#DDD3C2]'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Step Question */}
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#231A14] mb-6">
                {currentStep.question}
              </h3>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {currentStep.options.map((opt) => {
                  const isSelected = answers[currentStep.id] === opt.flavorKey;
                  return (
                    <button
                      key={opt.flavorKey}
                      onClick={() => handleSelectOption(currentStep.id, opt.flavorKey)}
                      className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between group ${
                        isSelected
                          ? 'border-[#3D2619] bg-[#3D2619] text-[#FAF7F2] shadow-md'
                          : 'border-[#E0D7C9] bg-[#FAF7F2] text-[#2C241E] hover:border-[#8C5E3C] hover:bg-[#FAF7F2]'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-serif text-lg font-bold">
                            {opt.label}
                          </span>
                          <span className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                            isSelected
                              ? 'border-[#D4A373] bg-[#D4A373] text-[#2C241E]'
                              : 'border-[#C4B3A3] text-transparent'
                          }`}>
                            <Check className="w-3.5 h-3.5" />
                          </span>
                        </div>
                        <p className={`text-xs leading-relaxed ${isSelected ? 'text-[#D4A373]' : 'text-[#6B5C51]'}`}>
                          {opt.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Navigation Back button */}
              {currentStepIndex > 0 && (
                <button
                  onClick={() => setCurrentStepIndex(currentStepIndex - 1)}
                  className="text-xs font-semibold text-[#8C5E3C] hover:text-[#3D2619] transition-colors flex items-center gap-1 cursor-pointer"
                >
                  ← Back to Previous Question
                </button>
              )}
            </div>
          ) : (
            /* Result recommendation card */
            <div className="space-y-6">
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#E0D7C9]">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#8C5E3C] flex items-center gap-1 mb-1">
                    <Sparkles className="w-3.5 h-3.5" /> Your Personalized Selection
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#231A14]">
                    We Think You Will Fall In Love With This:
                  </h3>
                </div>

                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#FAF7F2] border border-[#DDD3C2] text-[#54463D] hover:bg-[#EAE2D5] transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#8C5E3C]" />
                  <span>Retake Quiz</span>
                </button>
              </div>

              {/* Recommendation Card */}
              <div className="bg-[#FAF7F2] rounded-2xl border border-[#E0D7C9] p-6 sm:p-8 flex flex-col md:flex-row gap-6 items-center shadow-md">
                <div className="w-full md:w-56 h-48 sm:h-56 rounded-xl overflow-hidden shrink-0 relative bg-[#3D2619]">
                  <img
                    src={recommendedItem.imageUrl}
                    alt={recommendedItem.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 left-2 px-2.5 py-1 rounded bg-[#3D2619] text-[#FAF7F2] text-xs font-bold">
                    ${recommendedItem.price.toFixed(2)}
                  </div>
                </div>

                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold uppercase px-2 py-0.5 rounded bg-[#EAE2D5] text-[#8C5E3C]">
                      {recommendedItem.category.toUpperCase()}
                    </span>
                    {recommendedItem.origins && (
                      <span className="text-xs text-[#7A6B60]">
                        📍 {recommendedItem.origins}
                      </span>
                    )}
                  </div>

                  <h4 className="font-serif text-2xl font-bold text-[#231A14]">
                    {recommendedItem.name}
                  </h4>

                  <p className="text-xs sm:text-sm text-[#5C4F46] leading-relaxed">
                    {recommendedItem.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="text-xs font-bold text-[#8C5E3C]">Key Notes:</span>
                    {recommendedItem.tastingNotes.map((note) => (
                      <span
                        key={note}
                        className="text-xs px-2.5 py-1 rounded-full bg-[#F4EFE6] text-[#3D2619] font-medium border border-[#E0D7C9]"
                      >
                        {note}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#EFE9DF]">
                    <button
                      onClick={() => onSelectRecommended(recommendedItem)}
                      className="px-5 py-2.5 rounded-xl bg-[#3D2619] text-[#FAF7F2] font-semibold text-xs sm:text-sm hover:bg-[#533522] transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
                    >
                      <span>Customize & Add to Order</span>
                      <ArrowRight className="w-4 h-4 text-[#D4A373]" />
                    </button>

                    <button
                      onClick={() => onQuickAdd(recommendedItem)}
                      className="px-4 py-2.5 rounded-xl bg-[#EAE2D5] text-[#3D2619] font-semibold text-xs hover:bg-[#DDD3C2] transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-[#8C5E3C]" />
                      <span>Instant 1-Click Bag</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
};
