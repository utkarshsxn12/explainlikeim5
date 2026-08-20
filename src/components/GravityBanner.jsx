import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function GravityBanner({ isActive, onReset }) {
  if (!isActive) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-2xl bg-indigo-900/90 border-2 border-indigo-400 text-indigo-100 font-mono text-xs font-black uppercase tracking-widest shadow-2xl backdrop-blur-md flex items-center gap-3"
      >
        <span>ZERO GRAVITY MODE ENGAGED</span>
        <button
          onClick={onReset}
          className="ml-2 px-3 py-1 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-mono text-[10px] font-bold uppercase transition-colors cursor-pointer"
        >
          RE-ENGAGE GRAVITY
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
