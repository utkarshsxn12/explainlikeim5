import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Copy, Check, AlertCircle, RefreshCw, BookOpen, GraduationCap, PlayCircle, ExternalLink, Terminal } from 'lucide-react';
import { COMPLEXITY_LEVELS } from '../utils/prompts';

export function ExplanationCard({ 
  topic, 
  explanationText, 
  isLoading, 
  isStreaming, 
  error, 
  latencyMetrics, 
  levelKey,
  onRetry 
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!explanationText) return;
    navigator.clipboard.writeText(explanationText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const levelInfo = COMPLEXITY_LEVELS[levelKey] || COMPLEXITY_LEVELS.CHILD;

  const wikiUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(topic ? topic.replace(/ /g, '_') : '')}`;
  const scholarUrl = `https://scholar.google.com/scholar?q=${encodeURIComponent(topic || '')}`;
  const youtubeUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent((topic || '') + ' explained')}`;

  return (
    <div className="w-full max-w-3xl mx-auto px-4 my-8">
      <AnimatePresence mode="wait">
        {error ? (
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -15 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="p-6 bg-white dark:bg-[#121212] border-2 border-rose-500 text-neutral-900 dark:text-neutral-100 text-left shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-3 text-rose-600 dark:text-rose-400 font-mono text-xs font-bold uppercase tracking-wider">
              <AlertCircle className="w-5 h-5" />
              <span>Pipeline Failure</span>
            </div>
            <h3 className="font-serif italic font-bold text-2xl text-neutral-900 dark:text-white mb-2">
              Even we got confused. Try again?
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 font-mono mb-4">
              {error}
            </p>
            {onRetry && (
              <button
                onClick={onRetry}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-900 dark:bg-white text-white dark:text-black font-mono text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
              >
                <RefreshCw className="w-4 h-4" />
                <span>RETRY PIPELINE</span>
              </button>
            )}
          </motion.div>
        ) : isLoading && !explanationText ? (
          <motion.div
            key="skeleton"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3 }}
            className="p-8 bg-white dark:bg-[#121212] border border-neutral-300 dark:border-neutral-800 shadow-xl relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-6 border-b border-neutral-200 dark:border-neutral-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-neutral-900 dark:bg-white animate-ping"></div>
                <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-widest font-bold">
                  Streaming {levelInfo.shortLabel} Mode Response...
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="h-4 bg-neutral-200 dark:bg-neutral-800/80 rounded-none w-full shimmer-bg"></div>
              <div className="h-4 bg-neutral-200 dark:bg-neutral-800/80 rounded-none w-11/12 shimmer-bg"></div>
              <div className="h-4 bg-neutral-200 dark:bg-neutral-800/80 rounded-none w-4/5 shimmer-bg"></div>
              <div className="h-4 bg-neutral-200 dark:bg-neutral-800/80 rounded-none w-3/4 shimmer-bg"></div>
            </div>
          </motion.div>
        ) : explanationText ? (
          <motion.div
            key={`card-${levelKey}`}
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -15 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            className="w-full"
          >
            <div className="relative p-6 sm:p-8 bg-white dark:bg-[#121212] border border-neutral-300 dark:border-neutral-800 shadow-2xl text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6 border-b border-neutral-200 dark:border-neutral-800 pb-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 font-mono text-xs font-bold bg-neutral-900 dark:bg-white text-white dark:text-black uppercase tracking-wider">
                    {levelInfo.code} / {levelInfo.badge}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {latencyMetrics && (
                    <span className="px-3 py-1 font-mono font-bold text-xs bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white">
                      {(latencyMetrics.latencyMs / 1000).toFixed(2)}s LATENCY
                    </span>
                  )}

                  <button
                    onClick={handleCopy}
                    className="p-2 bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 hover:border-neutral-900 dark:hover:border-white text-neutral-800 dark:text-neutral-200 transition-colors"
                    title="Copy explanation"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className={`relative text-base sm:text-lg text-neutral-900 dark:text-neutral-100 leading-relaxed font-normal ${isStreaming ? 'typing-cursor' : ''}`}>
                <ReactMarkdown
                  components={{
                    h2: ({node, ...props}) => <h2 className="font-serif italic font-bold text-2xl sm:text-3xl text-neutral-900 dark:text-white mt-8 mb-4 border-b border-neutral-200 dark:border-neutral-800 pb-2" {...props} />,
                    h3: ({node, ...props}) => <h3 className="font-sans font-bold text-lg sm:text-xl text-neutral-800 dark:text-neutral-200 mt-6 mb-3" {...props} />,
                    p: ({node, ...props}) => <p className="mb-4 leading-relaxed text-neutral-800 dark:text-neutral-200 font-normal" {...props} />,
                    ul: ({node, ...props}) => <ul className="space-y-3 mb-6 ml-2" {...props} />,
                    li: ({node, ...props}) => (
                      <motion.li 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-start gap-3 bg-neutral-50 dark:bg-neutral-900/60 p-4 border border-neutral-200 dark:border-neutral-800" 
                        {...props}
                      >
                        <span className="w-2 h-2 rounded-full bg-neutral-900 dark:bg-white mt-2 shrink-0"></span>
                        <span className="font-medium text-neutral-900 dark:text-neutral-100">{props.children}</span>
                      </motion.li>
                    ),
                    strong: ({node, ...props}) => <strong className="font-extrabold text-neutral-900 dark:text-white" {...props} />,
                    code: ({node, ...props}) => <code className="px-1.5 py-0.5 bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white font-mono text-xs font-bold" {...props} />
                  }}
                >
                  {explanationText}
                </ReactMarkdown>
              </div>

              {latencyMetrics && !isStreaming && (
                <div className="mt-8 pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between font-mono text-[10px] text-neutral-500 dark:text-neutral-400 uppercase tracking-wider font-bold">
                  <span>
                    TTFB: {latencyMetrics.ttfbMs}ms
                  </span>
                  <span>
                    REAL-TIME INFERENCE COMPLETED
                  </span>
                </div>
              )}

              {levelKey === 'EXPERT' && !isStreaming && explanationText && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-800"
                >
                  <div className="font-mono text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-neutral-900 dark:text-white" />
                    <span>GO DEEPER — RESEARCH PIPELINE</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                    <a
                      href={wikiUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3.5 bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-neutral-200 hover:border-neutral-900 dark:hover:border-white hover:-translate-y-0.5 transition-all duration-200 group rounded-none"
                    >
                      <div className="flex items-center gap-2.5 min-w-0 pr-2">
                        <BookOpen className="w-4 h-4 shrink-0 text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white" />
                        <span className="text-xs font-mono font-bold truncate">
                          Wikipedia — {topic}
                        </span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 shrink-0 opacity-60 group-hover:opacity-100 transition-opacity" />
                    </a>

                    <a
                      href={scholarUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3.5 bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-neutral-200 hover:border-neutral-900 dark:hover:border-white hover:-translate-y-0.5 transition-all duration-200 group rounded-none"
                    >
                      <div className="flex items-center gap-2.5 min-w-0 pr-2">
                        <GraduationCap className="w-4 h-4 shrink-0 text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white" />
                        <span className="text-xs font-mono font-bold truncate">
                          Google Scholar
                        </span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 shrink-0 opacity-60 group-hover:opacity-100 transition-opacity" />
                    </a>

                    <a
                      href={youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3.5 bg-neutral-50 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-neutral-200 hover:border-neutral-900 dark:hover:border-white hover:-translate-y-0.5 transition-all duration-200 group rounded-none"
                    >
                      <div className="flex items-center gap-2.5 min-w-0 pr-2">
                        <PlayCircle className="w-4 h-4 shrink-0 text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white" />
                        <span className="text-xs font-mono font-bold truncate">
                          YouTube Deep-Dives
                        </span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 shrink-0 opacity-60 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </div>

                  <p className="font-mono text-[10px] text-neutral-500 dark:text-neutral-400 text-left font-medium">
                    Links generated from your search topic — not verified for accuracy of external content.
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-10 bg-white dark:bg-[#121212] border border-dashed border-neutral-300 dark:border-neutral-800 text-center"
          >
            <p className="font-mono text-xs uppercase tracking-widest text-neutral-500 dark:text-neutral-400 font-bold">
              Your brain will thank you in 5 seconds.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
