import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Search, ArrowRight } from 'lucide-react';

const ROTATING_TOPICS = [
  "Why your Wifi is slow.",
  "The Stock Market.",
  "Black Holes.",
  "Why cats knock things off tables.",
  "Crypto."
];

export function Hero({ topic, setTopic, onSubmit, isLoading, activeTopic }) {
  const [currentText, setCurrentText] = useState('');
  const [topicIndex, setTopicIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (activeTopic) return;

    const targetTopic = ROTATING_TOPICS[topicIndex];
    let timer;

    if (!isDeleting) {
      if (currentText.length < targetTopic.length) {
        timer = setTimeout(() => {
          setCurrentText(targetTopic.slice(0, currentText.length + 1));
        }, 75);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2500);
      }
    } else {
      if (currentText.length > 0) {
        timer = setTimeout(() => {
          setCurrentText(targetTopic.slice(0, currentText.length - 1));
        }, 35);
      } else {
        setIsDeleting(false);
        setTopicIndex((prev) => (prev + 1) % ROTATING_TOPICS.length);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, topicIndex, activeTopic]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (topic.trim() && !isLoading) {
      onSubmit(topic.trim());
    }
  };

  const formattedActiveTopic = activeTopic 
    ? (activeTopic.endsWith('.') ? activeTopic : `${activeTopic}.`) 
    : '';

  return (
    <div className="relative pt-8 pb-6 px-4 max-w-4xl mx-auto text-center flex flex-col items-center">
      <motion.div 
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100/80 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800/60 text-indigo-700 dark:text-indigo-300 text-xs sm:text-sm font-semibold mb-6 shadow-sm"
      >
        <Sparkles className="w-4 h-4 text-amber-500 animate-spin" style={{ animationDuration: '4s' }} />
        <span>Big brain topics. Baby brain explanations.</span>
        <span className="bg-indigo-500 text-white text-[10px] uppercase font-extrabold px-1.5 py-0.5 rounded">v2.0</span>
      </motion.div>

      <motion.h1 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.2] mb-6 text-center w-full"
      >
        <div className="text-slate-900 dark:text-white block min-h-[1.25em] mb-1">
          <span>{activeTopic ? formattedActiveTopic : currentText}</span>
          {!activeTopic && (
            <span className="inline-block w-1 sm:w-1.5 h-[0.85em] bg-indigo-500 ml-1.5 animate-pulse rounded-full align-middle"></span>
          )}
        </div>

        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent underline decoration-amber-400 decoration-wavy decoration-2 block">
          Explained like you're 5.
        </div>
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl font-medium mb-8 leading-relaxed"
      >
        Type anything confusing. Get instant clarity powered by Groq's high-speed AI — <span className="text-indigo-600 dark:text-indigo-400 font-semibold underline underline-offset-4">no PhD required</span>.
      </motion.p>

      <motion.form 
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        onSubmit={handleSubmit}
        className="w-full max-w-2xl relative group"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl blur-md opacity-40 group-hover:opacity-75 transition duration-500 group-focus-within:opacity-100"></div>

        <div className="relative flex items-center bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-2 sm:p-2.5 shadow-2xl transition-all duration-300 focus-within:border-indigo-500 dark:focus-within:border-indigo-400">
          <div className="pl-3 sm:pl-4 pr-2 text-slate-400 dark:text-slate-500">
            <Search className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>

          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Ask me literally anything... (e.g. Black holes, Blockchain, Inflation)"
            className="w-full bg-transparent text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm sm:text-lg font-medium focus:outline-none py-2 px-1"
            disabled={isLoading}
          />

          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={!topic.trim() || isLoading}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base text-white shadow-lg transition-all duration-200 ${
              !topic.trim() || isLoading 
                ? 'bg-slate-300 dark:bg-slate-800 cursor-not-allowed opacity-60' 
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-indigo-500/30'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span className="hidden sm:inline">Thinking...</span>
              </div>
            ) : (
              <>
                <span>Explain!</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </>
            )}
          </motion.button>
        </div>
      </motion.form>
    </div>
  );
}
