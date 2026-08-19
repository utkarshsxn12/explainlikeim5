import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

export function Navbar({ isDarkMode, onToggleDarkMode, sessionCount }) {
  return (
    <nav className="w-full max-w-6xl mx-auto px-6 py-5 flex items-center justify-between border-b border-slate-200 dark:border-neutral-800/80 transition-colors duration-300">
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="flex items-center gap-3 cursor-pointer"
      >
        <div>
          <span className="font-serif italic font-bold text-2xl sm:text-3xl tracking-tight text-slate-900 dark:text-white block leading-none transition-colors duration-300">
            ELI·5
          </span>
          <span className="font-mono text-[9px] block text-slate-500 dark:text-neutral-400 uppercase tracking-widest mt-1">
            EXPLAIN LIKE I'M FIVE
          </span>
        </div>
      </motion.div>

      <div className="flex items-center gap-4">
        {sessionCount > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="hidden sm:flex items-center gap-2 px-3 py-1 border border-slate-200 dark:border-neutral-800 bg-slate-100 dark:bg-neutral-950 text-slate-700 dark:text-neutral-300 text-xs font-mono transition-colors duration-300"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-lime-500 dark:bg-[#C6FF00]"></span>
            <span>{sessionCount} RUNS</span>
          </motion.div>
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onToggleDarkMode}
          className="p-2 border border-slate-300 dark:border-neutral-800 bg-slate-100 dark:bg-neutral-950 text-slate-800 dark:text-neutral-200 hover:border-lime-500 dark:hover:border-[#C6FF00] transition-colors rounded-sm shadow-xs"
          aria-label="Toggle Theme"
        >
          {isDarkMode ? (
            <Sun className="w-4 h-4 text-[#C6FF00]" />
          ) : (
            <Moon className="w-4 h-4 text-slate-700" />
          )}
        </motion.button>
      </div>
    </nav>
  );
}
