import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function RecentTopics({ topics, onSelectTopic }) {
  if (!topics || topics.length === 0) return null;

  return (
    <div className="w-full max-w-3xl mr-auto pl-0 sm:pl-4 pr-0 sm:pr-12 my-4">
      <div className="font-mono text-[11px] uppercase tracking-widest text-neutral-400 mb-2">
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
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => onSelectTopic(t)}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#121212] border border-neutral-800 text-xs font-mono text-neutral-300 hover:border-[#C6FF00] hover:text-[#C6FF00] transition-colors"
            >
              <span>{t}</span>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
