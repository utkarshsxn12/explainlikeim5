import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

export function Navbar({ isDarkMode, onToggleDarkMode, sessionCount }) {
  return (
    <nav className="w-full max-w-6xl mx-auto px-6 py-5 flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 transition-colors duration-300">
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="flex items-center gap-3 cursor-pointer"
      >
        <div>
          <span className="font-serif italic font-bold text-2xl sm:text-3xl tracking-tight text-neutral-900 dark:text-white block leading-none transition-colors duration-300">
            ELI·5
          </span>
          <span className="font-mono text-[9px] block text-neutral-500 dark:text-neutral-400 uppercase tracking-widest mt-1 font-bold">
            EXPLAIN LIKE I'M FIVE
          </span>
        </div>
      </motion.div>

      <div className="flex items-center gap-4">
        {sessionCount > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="hidden sm:flex items-center gap-2 px-3 py-1 border border-neutral-300 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-300 text-xs font-mono font-bold transition-colors duration-300"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 dark:bg-white"></span>
            <span>{sessionCount} RUNS</span>
          </motion.div>
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onToggleDarkMode}
          className="p-2 border border-neutral-300 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200 hover:border-neutral-900 dark:hover:border-white transition-colors rounded-none shadow-xs"
          aria-label="Toggle Theme"
        >
          {isDarkMode ? (
            <Sun className="w-4 h-4 text-white" />
          ) : (
            <Moon className="w-4 h-4 text-neutral-900" />
          )}
        </motion.button>
      </div>
    </nav>
  );
}
