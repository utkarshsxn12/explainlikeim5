import React from 'react';
import { motion } from 'framer-motion';
import { COMPLEXITY_LEVELS } from '../utils/prompts';

export function ComplexitySlider({ selectedLevel, onSelectLevel }) {
  const levels = [
    { key: 'CHILD', data: COMPLEXITY_LEVELS.CHILD },
    { key: 'TEEN', data: COMPLEXITY_LEVELS.TEEN },
    { key: 'EXPERT', data: COMPLEXITY_LEVELS.EXPERT },
  ];

  return (
    <div className="w-full max-w-xl mx-auto my-6 px-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Target Audience / Complexity
        </span>
        <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80 px-2.5 py-0.5 rounded-full border border-indigo-200 dark:border-indigo-800">
          {COMPLEXITY_LEVELS[selectedLevel].shortLabel} Mode Active
        </span>
      </div>

      <div className="relative flex items-center bg-slate-200/80 dark:bg-slate-900/90 p-1.5 rounded-2xl border border-slate-300/60 dark:border-slate-800 shadow-inner">
        {levels.map(({ key, data }) => {
          const isSelected = selectedLevel === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onSelectLevel(key)}
              className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-3 px-2 rounded-xl text-xs sm:text-sm font-bold transition-colors duration-200 ${
                isSelected 
                  ? 'text-slate-900 dark:text-white' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <motion.span 
                animate={{ scale: isSelected ? [1, 1.25, 1] : 1, rotate: isSelected ? [0, -10, 10, 0] : 0 }}
                transition={{ duration: 0.3 }}
                className="text-lg sm:text-xl"
              >
                {data.emoji}
              </motion.span>
              <span className="font-display font-bold tracking-tight">{data.shortLabel}</span>

              {isSelected && (
                <motion.div
                  layoutId="sliderIndicator"
                  className="absolute inset-0 bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200/80 dark:border-slate-700 -z-10"
                  transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                />
              )}
            </button>
          );
        })}
      </div>

      <motion.p 
        key={selectedLevel}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium italic"
      >
        "{COMPLEXITY_LEVELS[selectedLevel].description}"
      </motion.p>
    </div>
  );
}
