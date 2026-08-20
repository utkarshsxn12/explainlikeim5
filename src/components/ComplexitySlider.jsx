import React from 'react';
import { motion } from 'framer-motion';
import { COMPLEXITY_LEVELS } from '../utils/prompts';

export function ComplexitySlider({ selectedLevel, onSelectLevel }) {
  const levels = [
    ...(selectedLevel === 'TODDLER' ? [{ key: 'TODDLER', data: COMPLEXITY_LEVELS.TODDLER }] : []),
    { key: 'CHILD', data: COMPLEXITY_LEVELS.CHILD },
    { key: 'TEEN', data: COMPLEXITY_LEVELS.TEEN },
    { key: 'EXPERT', data: COMPLEXITY_LEVELS.EXPERT },
  ];

  const currentConfig = COMPLEXITY_LEVELS[selectedLevel] || COMPLEXITY_LEVELS.CHILD;


  return (
    <div className="w-full max-w-3xl mx-auto my-6">
      <div className="flex items-center justify-between mb-2.5 font-mono text-xs uppercase tracking-wider text-[#44403C] dark:text-[#8EA8C3] font-bold">
        <span>Target Mode</span>
        <span className="font-bold tracking-widest text-[#1C1917] dark:text-[#F0F4F8]">
          [{currentConfig.code}] MODE ACTIVE
        </span>
      </div>

      <div className="relative flex items-center bg-[#E8E0D5]/50 dark:bg-[#23354D]/80 backdrop-blur-md p-1.5 border-2 border-[#1C1917]/30 dark:border-[#8EA8C3]/40 rounded-2xl transition-colors duration-300 shadow-sm">
        {levels.map(({ key, data }) => {
          const isSelected = selectedLevel === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onSelectLevel(key)}
              className={`relative flex-1 flex items-center justify-center gap-2 py-3 px-2 font-mono text-xs font-bold uppercase transition-colors duration-200 ${
                isSelected 
                  ? 'text-[#FAF6EE] dark:text-[#02122F] font-black' 
                  : 'text-[#1C1917] dark:text-[#B8C5D6] hover:text-slate-900 dark:hover:text-white'
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
                  className="absolute inset-0 bg-[#1C1917] dark:bg-[#F0F4F8] rounded-xl shadow-md z-10"
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
        className="text-xs text-[#44403C] dark:text-[#8EA8C3] mt-2.5 font-sans italic flex items-center gap-2 font-medium"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#1C1917] dark:bg-[#F0F4F8]"></span>
        "{currentConfig.description}"
      </motion.p>
    </div>
  );
}
