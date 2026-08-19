import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

export function Navbar({ isDarkMode, onToggleDarkMode, sessionCount }) {
  return (
    <nav className="w-full max-w-6xl mx-auto px-6 py-6 flex items-center justify-between border-b border-neutral-800/80">
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="flex items-center gap-3 cursor-pointer"
      >
        <div className="w-9 h-9 border border-neutral-700 bg-neutral-950 flex items-center justify-center rounded-sm">
          <span className="font-mono font-bold text-xs text-[#C6FF00] tracking-tighter">
            E5
          </span>
        </div>
        <div>
          <span className="font-serif italic font-bold text-2xl tracking-tight text-white block leading-none">
            ELI·5
          </span>
          <span className="font-mono text-[9px] block text-neutral-400 uppercase tracking-widest mt-0.5">
            EXPLAIN LIKE I'M FIVE
          </span>
        </div>
      </motion.div>

      <div className="flex items-center gap-4">
        {sessionCount > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="hidden sm:flex items-center gap-2 px-3 py-1 border border-neutral-800 bg-neutral-950 text-neutral-300 text-xs font-mono"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF00]"></span>
            <span>{sessionCount} RUNS</span>
          </motion.div>
        )}

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onToggleDarkMode}
          className="p-2 border border-neutral-800 bg-neutral-950 text-neutral-300 hover:border-[#C6FF00] transition-colors rounded-sm"
          aria-label="Toggle Theme"
        >
          {isDarkMode ? (
            <Sun className="w-4 h-4 text-[#C6FF00]" />
          ) : (
            <Moon className="w-4 h-4 text-neutral-300" />
          )}
        </motion.button>
      </div>
    </nav>
  );
}
