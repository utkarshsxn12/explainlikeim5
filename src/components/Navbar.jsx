import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

export function Navbar({ isDarkMode, onToggleDarkMode, sessionCount }) {
  return (
    <nav className="w-full max-w-6xl mx-auto px-6 py-5 flex items-center justify-between border-b border-[#1B4332]/20 dark:border-neutral-800 transition-colors duration-300">
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="flex items-center gap-3 cursor-pointer"
      >
        <div>
          <span className="font-serif italic font-bold text-2xl sm:text-3xl tracking-tight text-[#1B4332] dark:text-white block leading-none transition-colors duration-300">
            ELI·5
          </span>
          <span className="font-mono text-[9px] block text-[#2D6A4F] dark:text-neutral-400 uppercase tracking-widest mt-1 font-bold">
            EXPLAIN LIKE I'M FIVE
          </span>
        </div>
      </motion.div>

      <div className="flex items-center gap-4">
        {sessionCount > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#1B4332]/30 dark:border-neutral-800 bg-[#FCD5CE]/50 dark:bg-neutral-900 text-[#1B4332] dark:text-neutral-300 text-xs font-mono font-bold transition-colors duration-300"
          >
            <span className="w-2 h-2 rounded-full bg-[#2D6A4F] dark:bg-[#74C69D]"></span>
            <span>{sessionCount} RUNS</span>
          </motion.div>
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onToggleDarkMode}
          className="p-2.5 rounded-xl border border-[#1B4332]/30 dark:border-neutral-800 bg-[#FCD5CE]/40 dark:bg-neutral-900 text-[#1B4332] dark:text-neutral-200 hover:border-[#1B4332] dark:hover:border-[#74C69D] transition-colors shadow-xs"
          aria-label="Toggle Theme"
        >
          {isDarkMode ? (
            <Sun className="w-4 h-4 text-[#74C69D]" />
          ) : (
            <Moon className="w-4 h-4 text-[#1B4332]" />
          )}
        </motion.button>
      </div>
    </nav>
  );
}
