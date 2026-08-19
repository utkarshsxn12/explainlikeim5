import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowUpRight } from 'lucide-react';

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
  const [isFocused, setIsFocused] = useState(false);

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
    <div className="relative pt-12 pb-8 px-6 max-w-5xl mx-auto w-full flex flex-col items-center">
      <motion.p 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-mono text-xs text-neutral-400 uppercase tracking-widest mb-8 text-center"
      >
        Powered by Groq — avg response time tracked live
      </motion.p>

      <motion.h1 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="font-serif italic text-4xl sm:text-6xl md:text-7xl tracking-tight text-white leading-[1.15] mb-8 text-center w-full"
      >
        <div className="text-white block min-h-[1.25em] mb-1 font-serif">
          <span>{activeTopic ? formattedActiveTopic : currentText}</span>
          {!activeTopic && (
            <span className="inline-block w-1 sm:w-1.5 h-[0.8em] bg-[#C6FF00] ml-1.5 animate-pulse align-middle"></span>
          )}
        </div>

        <div className="text-[#C6FF00] not-italic font-sans font-bold text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight block">
          Explained like you're 5.
        </div>
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-base sm:text-lg text-neutral-400 max-w-2xl font-normal mb-12 text-center leading-relaxed"
      >
        Type anything confusing. Get instant clarity powered by Groq's high-speed AI — <span className="text-neutral-200 border-b border-[#C6FF00] font-medium">no PhD required</span>.
      </motion.p>

      <div className="w-full max-w-3xl mr-auto pl-0 sm:pl-4 pr-0 sm:pr-12">
        <motion.form 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          onSubmit={handleSubmit}
          className="w-full relative"
        >
          <div className="relative flex items-center bg-[#121212] border border-neutral-800 rounded-none p-2 transition-colors duration-300 focus-within:border-[#C6FF00]">
            <div className="pl-3 pr-2 text-neutral-500">
              <Search className="w-5 h-5" />
            </div>

            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Ask me literally anything..."
              className="w-full bg-transparent text-white placeholder-neutral-500 text-sm sm:text-base font-sans focus:outline-none py-2 px-1"
              disabled={isLoading}
            />

            <motion.button
              type="submit"
              whileTap={{ scale: 0.97 }}
              disabled={!topic.trim() || isLoading}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-none font-mono font-bold text-xs uppercase tracking-wider text-black transition-all duration-200 ${
                !topic.trim() || isLoading 
                  ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed' 
                  : 'bg-[#C6FF00] hover:bg-[#b0e600]'
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
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C6FF00] origin-center"
            />
          </div>
        </motion.form>
      </div>
    </div>
  );
}
