import React from 'react';
import { motion } from 'framer-motion';
import { COMPLEXITY_LEVELS } from '../utils/prompts';

export function ComplexitySlider({ selectedLevel, onSelectLevel }) {
  const levels = [
    { key: 'CHILD', data: COMPLEXITY_LEVELS.CHILD, activeBg: 'bg-[#FF6B8B] text-white' },
    { key: 'TEEN', data: COMPLEXITY_LEVELS.TEEN, activeBg: 'bg-[#00E5FF] text-slate-950' },
    { key: 'EXPERT', data: COMPLEXITY_LEVELS.EXPERT, activeBg: 'bg-[#C6FF00] text-black' },
  ];

  const currentConfig = COMPLEXITY_LEVELS[selectedLevel] || COMPLEXITY_LEVELS.CHILD;

  return (
    <div className="w-full max-w-3xl mr-auto pl-0 sm:pl-4 pr-0 sm:pr-12 my-6">
      <div className="flex items-center justify-between mb-2 font-mono text-xs uppercase tracking-wider text-slate-500 dark:text-neutral-400">
        <span>Target Mode Personality</span>
        <span className="font-bold" style={{ color: currentConfig.accentColor }}>
          [{currentConfig.code}] {currentConfig.badge}
        </span>
      </div>

      <div className="relative flex items-center bg-white dark:bg-[#121212] p-1.5 border border-slate-300 dark:border-neutral-800 transition-colors duration-300 shadow-sm">
        {levels.map(({ key, data, activeBg }) => {
          const isSelected = selectedLevel === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onSelectLevel(key)}
              className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-3 px-2 font-mono text-xs font-bold uppercase transition-all duration-300 ${
                isSelected 
                  ? 'text-slate-950 font-black' 
                  : 'text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <span>{data.label}</span>

              {isSelected && (
                <motion.div
                  layoutId="sliderIndicator"
                  className={`absolute inset-0 ${activeBg} shadow-md`}
                  transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                />
              )}
            </button>
          );
        })}
      </div>

      <motion.p 
        key={selectedLevel}
        initial={{ opacity: 0, y: 3 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xs text-slate-500 dark:text-neutral-400 mt-2.5 font-sans italic flex items-center gap-2"
      >
        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: currentConfig.accentColor }}></span>
        "{currentConfig.description}"
      </motion.p>
    </div>
  );
}
