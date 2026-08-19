import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

export function Navbar({ isDarkMode, onToggleDarkMode, sessionCount }) {
  return (
    <nav className="w-full max-w-6xl mx-auto px-6 py-5 flex items-center justify-between border-b border-[#1C1917]/20 dark:border-[#23354D] transition-colors duration-300">
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="flex items-center gap-3 cursor-pointer"
      >
        <div>
          <span className="font-serif italic font-bold text-2xl sm:text-3xl tracking-tight text-[#1C1917] dark:text-[#F0F4F8] block leading-none transition-colors duration-300">
            ELI·5
          </span>
          <span className="font-mono text-[9px] block text-[#44403C] dark:text-[#8EA8C3] uppercase tracking-widest mt-1 font-bold">
            EXPLAIN LIKE I'M FIVE
          </span>
        </div>
      </motion.div>

      <div className="flex items-center gap-4">
        {sessionCount > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#1C1917]/30 dark:border-[#23354D] bg-[#E8E0D5]/60 dark:bg-[#23354D]/60 text-[#1C1917] dark:text-[#F0F4F8] text-xs font-mono font-bold transition-colors duration-300 shadow-xs"
          >
            <span className="w-2 h-2 rounded-full bg-[#1C1917] dark:bg-[#F0F4F8]"></span>
            <span>{sessionCount} RUNS</span>
          </motion.div>
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onToggleDarkMode}
          className="p-2.5 rounded-xl border border-[#1C1917]/30 dark:border-[#23354D] bg-[#E8E0D5]/50 dark:bg-[#23354D]/60 text-[#1C1917] dark:text-[#F0F4F8] hover:border-[#1C1917] dark:hover:border-[#F0F4F8] transition-colors shadow-xs"
          aria-label="Toggle Theme"
        >
          {isDarkMode ? (
            <Sun className="w-4 h-4 text-[#F0F4F8]" />
          ) : (
            <Moon className="w-4 h-4 text-[#1C1917]" />
          )}
        </motion.button>
      </div>
    </nav>
  );
}
