import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Brain, Zap } from 'lucide-react';

export function Navbar({ isDarkMode, onToggleDarkMode, sessionCount }) {
  return (
    <nav className="w-full max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
      <motion.div 
        whileHover={{ scale: 1.03 }}
        className="flex items-center gap-2.5 cursor-pointer"
      >
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-pink-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
          <Brain className="w-6 h-6" />
        </div>
        <div>
          <span className="font-display font-black text-xl sm:text-2xl tracking-tight text-slate-900 dark:text-white">
            ELI<span className="text-indigo-600 dark:text-indigo-400">5</span>
          </span>
          <span className="text-[10px] block font-bold text-amber-500 uppercase tracking-widest -mt-1">
            Explain Like I'm 5
          </span>
        </div>
      </motion.div>

      <div className="flex items-center gap-3">
        {sessionCount > 0 && (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold"
          >
            <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>{sessionCount} Explained</span>
          </motion.div>
        )}

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={onToggleDarkMode}
          className="p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 shadow-md transition-colors"
          aria-label="Toggle Theme"
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5 text-amber-400" />
          ) : (
            <Moon className="w-5 h-5 text-indigo-600" />
          )}
        </motion.button>
      </div>
    </nav>
  );
}
