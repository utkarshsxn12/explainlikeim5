import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function RecentTopics({ topics, onSelectTopic }) {
  if (!topics || topics.length === 0) return null;

  return (
    <div className="w-full max-w-3xl mr-auto pl-0 sm:pl-4 pr-0 sm:pr-12 my-4">
      <div className="font-mono text-[11px] uppercase tracking-widest text-[#44403C] dark:text-sky-400 mb-2 font-bold">
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
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E8E0D5]/50 dark:bg-slate-900/90 border border-[#1C1917]/30 dark:border-sky-900/60 text-xs font-mono text-[#1C1917] dark:text-sky-200 hover:bg-[#1C1917] hover:text-[#FAF6EE] dark:hover:border-[#38BDF8] dark:hover:text-[#38BDF8] shadow-xs transition-all duration-200 font-medium"
            >
              <span>{t}</span>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
