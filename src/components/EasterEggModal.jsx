import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { X } from 'lucide-react';

export function EasterEggModal({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      const duration = 2.5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 999 };

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) {
          return clearInterval(interval);
        }
        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: Math.random(), y: Math.random() - 0.2 } });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-lg p-8 bg-white dark:bg-[#121212] border border-lime-500 dark:border-[#C6FF00] text-slate-900 dark:text-white text-center shadow-2xl"
        >
          <div className="absolute top-0 right-0 p-4">
            <button
              onClick={onClose}
              className="p-2 text-slate-500 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <span className="inline-block px-3 py-1 bg-slate-100 dark:bg-neutral-900 border border-slate-300 dark:border-neutral-800 text-lime-700 dark:text-[#C6FF00] font-mono text-[10px] uppercase tracking-widest mb-4">
            EASTER EGG UNLOCKED
          </span>

          <h2 className="font-serif italic font-bold text-4xl sm:text-5xl text-slate-900 dark:text-white mb-4">
            The Answer Is <span className="text-lime-600 dark:text-[#C6FF00] not-italic font-sans">42</span>
          </h2>

          <p className="text-slate-600 dark:text-neutral-300 text-sm sm:text-base leading-relaxed mb-6 font-sans">
            Don't Panic! You found the secret cosmic response. Deep Thought took 7.5 million years to calculate this, but Groq streamed it instantly. Remember to grab your towel!
          </p>

          <button
            onClick={onClose}
            className="w-full py-3 bg-lime-400 dark:bg-[#C6FF00] hover:bg-lime-300 dark:hover:bg-[#b0e600] text-black font-mono font-bold text-xs uppercase tracking-widest transition-colors shadow-md"
          >
            ALWAYS KNOW YOUR TOWEL
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
