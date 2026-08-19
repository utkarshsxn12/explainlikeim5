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
    <div className="w-full max-w-3xl mr-auto pl-0 sm:pl-4 pr-0 sm:pr-12 my-6">
      <div className="flex items-center justify-between mb-2 font-mono text-xs uppercase tracking-wider text-neutral-400">
        <span>Target Complexity</span>
        <span className="text-[#C6FF00]">
          [{COMPLEXITY_LEVELS[selectedLevel].code}] MODE
        </span>
      </div>

      <div className="relative flex items-center bg-[#121212] p-1 border border-neutral-800">
        {levels.map(({ key, data }) => {
          const isSelected = selectedLevel === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onSelectLevel(key)}
              className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-2.5 px-2 font-mono text-xs font-bold uppercase transition-colors duration-200 ${
                isSelected 
                  ? 'text-black' 
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <span>{data.code}</span>
              <span className="hidden sm:inline font-sans text-xs">({data.shortLabel})</span>

              {isSelected && (
                <motion.div
                  layoutId="sliderIndicator"
                  className="absolute inset-0 bg-[#C6FF00] -z-10"
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
        className="text-xs text-neutral-400 mt-2 font-sans italic"
      >
        "{COMPLEXITY_LEVELS[selectedLevel].description}"
      </motion.p>
    </div>
  );
}
