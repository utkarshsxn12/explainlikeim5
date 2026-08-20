import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function ChaiModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-md p-8 bg-[#FAF6EE] dark:bg-[#112240] border-2 border-amber-600 dark:border-amber-400 text-[#1C1917] dark:text-[#F0F4F8] text-center shadow-2xl rounded-3xl overflow-hidden"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 px-2 py-1 text-xs font-mono font-bold text-[#44403C] dark:text-[#8EA8C3] hover:text-[#1C1917] dark:hover:text-white transition-colors"
          >
            [CLOSE]
          </button>

          <div className="relative my-4 flex flex-col items-center justify-center">
            {/* Animated Steam */}
            <div className="flex gap-2 mb-2">
              <motion.span
                animate={{ y: [-5, -20], opacity: [0.8, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, delay: 0 }}
                className="w-1.5 h-6 bg-amber-400/60 rounded-full blur-[1px]"
              />
              <motion.span
                animate={{ y: [-5, -25], opacity: [0.9, 0] }}
                transition={{ duration: 2.1, repeat: Infinity, delay: 0.4 }}
                className="w-2 h-8 bg-amber-500/70 rounded-full blur-[1px]"
              />
              <motion.span
                animate={{ y: [-5, -18], opacity: [0.7, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, delay: 0.2 }}
                className="w-1.5 h-5 bg-amber-400/60 rounded-full blur-[1px]"
              />
            </div>
          </div>

          <span className="inline-block px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-700 dark:text-amber-300 font-mono text-[10px] font-bold uppercase tracking-widest mb-3">
            CHAI EMERGENCY BREAK UNLOCKED
          </span>

          <h2 className="font-serif italic font-bold text-3xl text-[#1C1917] dark:text-white mb-3">
            Take a Sip & Breathe.
          </h2>

          <p className="text-[#44403C] dark:text-[#B8C5D6] text-sm sm:text-base leading-relaxed mb-6 font-sans font-medium">
            "Bhai, take a sip of Chai. Overthinking kills more dreams than failure ever will. Big words can wait!"
          </p>

          <button
            onClick={onClose}
            className="w-full py-3.5 bg-amber-600 hover:bg-amber-700 text-white font-mono font-bold text-xs uppercase tracking-widest transition-colors rounded-xl shadow-lg cursor-pointer"
          >
            SIP CHAI & RESUME
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
