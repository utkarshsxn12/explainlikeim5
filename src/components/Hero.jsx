import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowUpRight } from 'lucide-react';
import { COMPLEXITY_LEVELS } from '../utils/prompts';

const ROTATING_TOPICS = [
  "Why your Wifi is slow.",
  "The Stock Market.",
  "Black Holes.",
  "Why cats knock things off tables.",
  "Crypto."
];

const ROTATING_SUBTEXTS = [
  { text: "Type it. We'll dumb it down before your chai gets cold.", duration: 3000 },
  { text: "No cap, no jargon, no 45-minute YouTube video required.", duration: 3000 },
  { text: "Ask literally anything. We'll explain it before you finish overthinking.", duration: 3000 },
  { text: "Big words in. Simple answers out. Ego optional.", duration: 3000 },
  { text: "Faster than your professor's office hours. Way less awkward.", duration: 3000 },
  { text: "Skip the PhD. Skip the confusion. Just skip to the answer.", duration: 3000 },
  { text: "Type your confusion. We'll roast the complexity out of it.", duration: 3000 },
  { text: "That thing you nodded along to but never understood? Type it here.", duration: 4500, isSpecial: true }
];

export function Hero({ topic, setTopic, onSubmit, isLoading, activeTopic, selectedLevel }) {
  const [currentText, setCurrentText] = useState('');
  const [topicIndex, setTopicIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [subtextIndex, setSubtextIndex] = useState(0);

  const modeConfig = COMPLEXITY_LEVELS[selectedLevel] || COMPLEXITY_LEVELS.CHILD;

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

  useEffect(() => {
    const currentSubtextObj = ROTATING_SUBTEXTS[subtextIndex];
    const timer = setTimeout(() => {
      setSubtextIndex((prev) => (prev + 1) % ROTATING_SUBTEXTS.length);
    }, currentSubtextObj.duration);

    return () => clearTimeout(timer);
  }, [subtextIndex]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (topic.trim() && !isLoading) {
      onSubmit(topic.trim());
    }
  };

  const formattedActiveTopic = activeTopic 
    ? (activeTopic.endsWith('.') ? activeTopic : `${activeTopic}.`) 
    : '';

  const activeSubtext = ROTATING_SUBTEXTS[subtextIndex];

  return (
    <div className="relative pt-10 pb-6 px-6 max-w-5xl mx-auto w-full flex flex-col items-center">
      <motion.p 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-mono text-xs text-slate-500 dark:text-neutral-400 uppercase tracking-widest mb-8 text-center font-medium"
      >
        FOR ALL THE COMPLEX STUFF YOU NODDED ALONG TO BUT HAD ZERO CLUE ABOUT.
      </motion.p>

      <motion.h1 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="font-serif italic text-4xl sm:text-6xl md:text-7xl tracking-tight text-slate-900 dark:text-white leading-[1.15] mb-6 text-center w-full"
      >
        <div className="text-slate-900 dark:text-white block min-h-[1.25em] mb-1 font-serif">
          <span>{activeTopic ? formattedActiveTopic : currentText}</span>
          {!activeTopic && (
            <span 
              className="inline-block w-1 sm:w-1.5 h-[0.8em] ml-1.5 animate-pulse align-middle"
              style={{ backgroundColor: modeConfig.accentColor }}
            ></span>
          )}
        </div>

        <div 
          className="not-italic font-sans font-bold text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight block transition-colors duration-300"
          style={{ color: modeConfig.accentColor }}
        >
          {selectedLevel === 'CHILD' && "Explained like you're 5."}
          {selectedLevel === 'TEEN' && "Explained like you're 15."}
          {selectedLevel === 'EXPERT' && "Explained for an Expert."}
        </div>
      </motion.h1>

      <div className="h-14 sm:h-12 flex items-center justify-center mb-10 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={subtextIndex}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.4 }}
            className="text-base sm:text-lg text-slate-600 dark:text-neutral-300 max-w-2xl font-normal text-center leading-relaxed"
          >
            {activeSubtext.isSpecial ? (
              <span>
                That thing you nodded along to but{' '}
                <span 
                  className="font-semibold underline underline-offset-4"
                  style={{ color: modeConfig.accentColor }}
                >
                  never understood
                </span>
                ? Type it here.
              </span>
            ) : (
              <span>{activeSubtext.text}</span>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="w-full max-w-3xl mr-auto pl-0 sm:pl-4 pr-0 sm:pr-12">
        <motion.form 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          onSubmit={handleSubmit}
          className="w-full relative"
        >
          <div 
            className="relative flex items-center bg-white dark:bg-[#121212] border border-slate-300 dark:border-neutral-800 rounded-none p-2 transition-all duration-300"
            style={{ borderColor: isFocused ? modeConfig.accentColor : undefined }}
          >
            <div className="pl-3 pr-2 text-slate-400 dark:text-neutral-500">
              <Search className="w-5 h-5" />
            </div>

            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Ask me literally anything..."
              className="w-full bg-transparent text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-neutral-500 text-sm sm:text-base font-sans focus:outline-none py-2 px-1"
              disabled={isLoading}
            />

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.97 }}
              disabled={!topic.trim() || isLoading}
              style={{
                backgroundColor: (!topic.trim() || isLoading) ? undefined : modeConfig.accentColor,
              }}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-none font-mono font-bold text-xs uppercase tracking-wider transition-all duration-200 ${
                !topic.trim() || isLoading 
                  ? 'bg-slate-200 dark:bg-neutral-800 text-slate-400 dark:text-neutral-500 cursor-not-allowed' 
                  : 'text-black font-extrabold shadow-md'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  <span>WAIT</span>
                </div>
              ) : (
                <>
                  <span>EXPLAIN</span>
                  <ArrowUpRight className="w-4 h-4" />
                </>
              )}
            </motion.button>

            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isFocused ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              style={{ backgroundColor: modeConfig.accentColor }}
              className="absolute bottom-0 left-0 right-0 h-[2px] origin-center"
            />
          </div>
        </motion.form>
      </div>
    </div>
  );
}
