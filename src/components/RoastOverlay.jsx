import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function RoastOverlay({ isActive, onClose }) {
  if (!isActive) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-x-0 bottom-0 z-40 pointer-events-none flex flex-col items-center">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          className="mb-6 px-6 py-3 rounded-2xl bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 text-white font-mono text-xs font-black uppercase tracking-widest shadow-2xl flex items-center gap-3 border-2 border-orange-300 pointer-events-auto"
        >
          <span>ROAST MODE ACTIVE (NO MERCY)</span>
          <button
            onClick={onClose}
            className="ml-2 px-2 py-0.5 bg-black/40 hover:bg-black/60 rounded-lg text-[10px] font-mono transition-colors cursor-pointer"
          >
            [DISMISS]
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
