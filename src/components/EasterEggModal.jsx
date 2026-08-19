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
          className="relative w-full max-w-lg p-8 bg-[#FDF6ED] dark:bg-[#1E1E1E] border-2 border-[#1B4332] dark:border-[#74C69D] text-[#1B4332] dark:text-white text-center shadow-2xl rounded-2xl"
        >
          <div className="absolute top-0 right-0 p-4">
            <button
              onClick={onClose}
              className="p-2 text-[#2D6A4F] dark:text-neutral-400 hover:text-[#1B4332] dark:hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <span className="inline-block px-3 py-1 rounded-full bg-[#FCD5CE]/60 dark:bg-neutral-900 border border-[#1B4332]/30 dark:border-neutral-700 text-[#1B4332] dark:text-[#74C69D] font-mono text-[10px] font-bold uppercase tracking-widest mb-4">
            EASTER EGG UNLOCKED
          </span>

          <h2 className="font-serif italic font-bold text-4xl sm:text-5xl text-[#1B4332] dark:text-white mb-4">
            The Answer Is <span className="text-[#1B4332] dark:text-[#74C69D] not-italic font-sans">42</span>
          </h2>

          <p className="text-[#2D6A4F] dark:text-neutral-300 text-sm sm:text-base leading-relaxed mb-6 font-sans font-medium">
            Don't Panic! You found the secret cosmic response. Deep Thought took 7.5 million years to calculate this, but Groq streamed it instantly. Remember to grab your towel!
          </p>

          <button
            onClick={onClose}
            className="w-full py-3 bg-[#1B4332] dark:bg-[#74C69D] hover:bg-[#2D6A4F] dark:hover:bg-[#52B788] text-[#FDF6ED] dark:text-black font-mono font-bold text-xs uppercase tracking-widest transition-colors rounded-xl shadow-md"
          >
            ALWAYS KNOW YOUR TOWEL
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
