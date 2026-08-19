import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function RecentTopics({ topics, onSelectTopic }) {
  if (!topics || topics.length === 0) return null;

  return (
    <div className="w-full max-w-3xl mr-auto pl-0 sm:pl-4 pr-0 sm:pr-12 my-4">
      <div className="font-mono text-[11px] uppercase tracking-widest text-[#44403C] dark:text-neutral-400 mb-2 font-bold">
        Recent Topics
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <AnimatePresence>
          {topics.map((t, idx) => (
            <motion.button
              key={`${t}-${idx}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => onSelectTopic(t)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E8E0D5]/50 dark:bg-[#1E1E1E] border border-[#1C1917]/30 dark:border-neutral-700 text-xs font-mono text-[#1C1917] dark:text-neutral-200 hover:bg-[#1C1917] hover:text-[#FAF6EE] dark:hover:border-[#74C69D] dark:hover:text-[#74C69D] shadow-xs transition-all duration-200 font-medium"
            >
              <span>{t}</span>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
