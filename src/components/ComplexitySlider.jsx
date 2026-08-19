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
      <div className="flex items-center justify-between mb-2.5 font-mono text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-bold">
        <span>Target Mode</span>
        <span className="font-bold tracking-widest text-neutral-900 dark:text-white">
          [{currentConfig.code}] MODE ACTIVE
        </span>
      </div>

      <div className="relative flex items-center bg-white dark:bg-[#121212] p-1.5 border border-neutral-300 dark:border-neutral-800 rounded-none transition-colors duration-300 shadow-xs">
        {levels.map(({ key, data }) => {
          const isSelected = selectedLevel === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onSelectLevel(key)}
              className={`relative flex-1 flex items-center justify-center gap-2 py-3 px-2 font-mono text-xs font-bold uppercase transition-colors duration-200 ${
                isSelected 
                  ? 'text-white dark:text-black font-extrabold' 
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
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
                  className="absolute inset-0 bg-neutral-900 dark:bg-white rounded-none shadow-xs z-10"
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
        className="text-xs text-neutral-500 dark:text-neutral-400 mt-2.5 font-sans italic flex items-center gap-2 font-medium"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 dark:bg-white"></span>
        "{currentConfig.description}"
      </motion.p>
    </div>
  );
}
