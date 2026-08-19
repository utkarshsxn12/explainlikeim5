import React from 'react';
import { motion } from 'framer-motion';
import { Search, Sliders, Zap } from 'lucide-react';

export function WorkflowSection() {
  const steps = [
    {
      num: '01',
      title: 'Type Any Confusion',
      desc: 'Enter literally anything confusing — from quantum mechanics and inflation to why your wifi is slow.',
      icon: Search,
      badge: 'STEP 01'
    },
    {
      num: '02',
      title: 'Select Target Lens',
      desc: 'Choose your desired complexity level — 5yo child playground, 15yo high-school, or domain expert.',
      icon: Sliders,
      badge: 'STEP 02'
    },
    {
      num: '03',
      title: 'Instant Streaming',
      desc: 'Watch real-time token streaming break down the concept line-by-line in high resolution speed.',
      icon: Zap,
      badge: 'STEP 03'
    }
  ];

  return (
    <div className="w-full max-w-3xl mr-auto pl-0 sm:pl-4 pr-0 sm:pr-12 my-8">
      <div className="flex items-center justify-between mb-4">
        <div className="font-mono text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 font-bold">
          HOW IT WORKS — 3-STEP PIPELINE
        </div>
        <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
          ZERO JARGON
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {steps.map((s, idx) => {
          const IconComp = s.icon;
          return (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ y: -3 }}
              className="p-5 bg-white dark:bg-[#121212] border border-neutral-200 dark:border-neutral-800 transition-all duration-300 rounded-none shadow-xs hover:border-neutral-900 dark:hover:border-white group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-bold px-2 py-0.5 bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-800">
                  {s.badge}
                </span>
                <IconComp className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors" />
              </div>

              <h4 className="font-serif italic font-bold text-lg text-neutral-900 dark:text-white mb-2">
                {s.title}
              </h4>

              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans font-normal">
                {s.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
