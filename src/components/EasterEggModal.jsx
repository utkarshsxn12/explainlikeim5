import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, X, Rocket } from 'lucide-react';

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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -3 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-indigo-950 via-slate-900 to-purple-950 border-2 border-amber-400/80 shadow-2xl text-white overflow-hidden text-center"
        >
          <div className="absolute top-0 right-0 p-4">
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="w-16 h-16 mx-auto mb-4 rounded-3xl bg-amber-400/20 border border-amber-400/50 flex items-center justify-center text-amber-300 text-3xl animate-bounce">
            🛸
          </div>

          <span className="inline-block px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 font-extrabold text-xs uppercase tracking-widest mb-2 border border-amber-400/40">
            Hitchhiker's Guide Easter Egg Triggered!
          </span>

          <h2 className="font-display font-black text-3xl sm:text-4xl text-white mb-3">
            The Ultimate Answer: <span className="text-amber-400 underline decoration-wavy">42</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-medium">
            Don't Panic! You found the secret cosmic response. Deep Thought took 7.5 million years to calculate this, but Groq explained it in a fraction of a second. Remember to grab your towel! 🪐✨
          </p>

          <button
            onClick={onClose}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-pink-500 hover:from-amber-300 hover:to-pink-400 text-slate-950 font-black text-sm uppercase tracking-wider shadow-xl transition-all"
          >
            Always Know Where Your Towel Is! 🚀
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
