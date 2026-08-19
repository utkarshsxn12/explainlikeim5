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
      desc: 'Choose your desired complexity level — child playground, high-school edition, or domain expert.',
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
        <div className="font-mono text-xs uppercase tracking-widest text-[#44403C] dark:text-[#8EA8C3] font-bold">
          HOW IT WORKS — 3-STEP PIPELINE
        </div>
        <span className="font-mono text-[10px] uppercase tracking-wider text-[#44403C]/80 dark:text-[#8EA8C3]/80 font-bold">
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
              className="p-5 bg-[#E8E0D5]/50 dark:bg-[#23354D]/70 border border-[#1C1917]/20 dark:border-[#8EA8C3]/30 transition-all duration-300 rounded-2xl shadow-xs hover:border-[#1C1917] dark:hover:border-[#F0F4F8] group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-bold px-2.5 py-0.5 bg-[#1C1917] dark:bg-[#F0F4F8] text-[#FAF6EE] dark:text-[#02122F] rounded-md">
                  {s.badge}
                </span>
                <IconComp className="w-4 h-4 text-[#44403C] dark:text-[#8EA8C3] group-hover:text-[#1C1917] dark:group-hover:text-[#F0F4F8] transition-colors" />
              </div>

              <h4 className="font-serif italic font-bold text-xl text-[#1C1917] dark:text-[#F0F4F8] mb-2">
                {s.title}
              </h4>

              <p className="text-xs text-[#44403C] dark:text-[#B8C5D6] leading-relaxed font-sans font-medium">
                {s.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
