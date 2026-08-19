import React, { useState } from 'react';
import { Sun, Moon, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export function Navbar({ isDarkMode, onToggleDarkMode, sessionCount, onTriggerEasterEgg }) {
  const [clickCount, setClickCount] = useState(0);

  const handleLogoClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (newCount >= 3) {
      setClickCount(0);
      if (onTriggerEasterEgg) {
        onTriggerEasterEgg();
      }
    }
  };

  return (
    <header className="w-full max-w-5xl mx-auto px-6 pt-6 pb-4 flex items-center justify-between border-b border-[#1C1917]/20 dark:border-[#8EA8C3]/30 transition-colors duration-300 relative z-20">
      <div className="flex items-center gap-3">
        <motion.button 
          onClick={handleLogoClick}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex flex-col text-left focus:outline-none group cursor-pointer"
          title="Triple-click for a secret Easter Egg!"
        >
          <span className="font-serif italic text-3xl font-extrabold tracking-tight text-[#1C1917] dark:text-[#F0F4F8]">
            ELI<span className="not-italic font-sans text-amber-600 dark:text-amber-400">·5</span>
          </span>
          <span className="text-[10px] font-mono tracking-widest text-[#44403C] dark:text-[#8EA8C3] uppercase font-bold">
            EXPLAIN LIKE I'M FIVE
          </span>
        </motion.button>
      </div>

      <div className="flex items-center gap-3">
        {sessionCount > 0 && (
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8E0D5]/60 dark:bg-[#23354D]/70 border border-[#1C1917]/30 dark:border-[#8EA8C3]/40 text-xs font-mono text-[#1C1917] dark:text-[#F0F4F8] font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>{sessionCount} RUNS</span>
          </div>
        )}

        <button
          onClick={onToggleDarkMode}
          className="p-2.5 rounded-full bg-[#E8E0D5]/70 dark:bg-[#23354D]/80 border-2 border-[#1C1917]/30 dark:border-[#8EA8C3]/40 text-[#1C1917] dark:text-[#F0F4F8] hover:bg-[#1C1917] hover:text-[#FAF6EE] dark:hover:border-[#F0F4F8] transition-all duration-200 shadow-xs cursor-pointer"
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDarkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-[#1C1917]" />}
        </button>
      </div>
    </header>
  );
}
