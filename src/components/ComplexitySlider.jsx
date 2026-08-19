import React from 'react';
import { motion } from 'framer-motion';
import { COMPLEXITY_LEVELS } from '../utils/prompts';

export function ComplexitySlider({ selectedLevel, onSelectLevel }) {
  const levels = [
    { key: 'CHILD', data: COMPLEXITY_LEVELS.CHILD },
    { key: 'TEEN', data: COMPLEXITY_LEVELS.TEEN },
    { key: 'EXPERT', data: COMPLEXITY_LEVELS.EXPERT },
  ];

  const currentConfig = COMPLEXITY_LEVELS[selectedLevel] || COMPLEXITY_LEVELS.CHILD;

  return (
    <div className="w-full max-w-3xl mr-auto pl-0 sm:pl-4 pr-0 sm:pr-12 my-6">
      <div className="flex items-center justify-between mb-2.5 font-mono text-xs uppercase tracking-wider text-[#2D6A4F] dark:text-neutral-400 font-bold">
        <span>Target Mode</span>
        <span className="font-bold tracking-widest text-[#1B4332] dark:text-[#74C69D]">
          [{currentConfig.code}] MODE ACTIVE
        </span>
      </div>

      <div className="relative flex items-center bg-[#FCD5CE]/40 dark:bg-[#1E1E1E] p-1.5 border-2 border-[#1B4332]/30 dark:border-neutral-700 rounded-2xl transition-colors duration-300 shadow-sm">
        {levels.map(({ key, data }) => {
          const isSelected = selectedLevel === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onSelectLevel(key)}
              className={`relative flex-1 flex items-center justify-center gap-2 py-3 px-2 font-mono text-xs font-bold uppercase transition-colors duration-200 ${
                isSelected 
                  ? 'text-[#FDF6ED] dark:text-slate-950 font-black' 
                  : 'text-[#1B4332] dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <motion.span
                animate={{ scale: isSelected ? 1.05 : 1 }}
                transition={{ duration: 0.2 }}
                className="relative z-20"
              >
                {data.label}
              </motion.span>

              {isSelected && (
                <motion.div
                  layoutId="sliderIndicator"
                  className="absolute inset-0 bg-[#1B4332] dark:bg-[#74C69D] rounded-xl shadow-md z-10"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      <motion.p 
        key={selectedLevel}
        initial={{ opacity: 0, x: -5 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="text-xs text-[#2D6A4F] dark:text-neutral-400 mt-2.5 font-sans italic flex items-center gap-2 font-medium"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#1B4332] dark:bg-[#74C69D]"></span>
        "{currentConfig.description}"
      </motion.p>
    </div>
  );
}
