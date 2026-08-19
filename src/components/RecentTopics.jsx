import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { History, Sparkles } from 'lucide-react';

export function RecentTopics({ topics, onSelectTopic }) {
  if (!topics || topics.length === 0) return null;

  return (
    <div className="w-full max-w-xl mx-auto my-4 px-4 text-center">
      <div className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5">
        <History className="w-3.5 h-3.5" />
        <span>Recent Confusion Topics</span>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <AnimatePresence>
          {topics.map((t, idx) => (
            <motion.button
              key={`${t}-${idx}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelectTopic(t)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-sm hover:border-indigo-400 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>{t}</span>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
