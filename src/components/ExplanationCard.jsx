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
            className="p-6 rounded-2xl bg-[#E8E0D5]/80 dark:bg-slate-900/90 border-2 border-rose-400 dark:border-rose-900/80 text-rose-950 dark:text-rose-200 text-left shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-3 text-rose-700 dark:text-rose-400 font-mono text-xs font-bold uppercase tracking-wider">
              <AlertCircle className="w-5 h-5" />
              <span>Pipeline Failure</span>
            </div>
            <h3 className="font-serif italic font-bold text-2xl text-rose-950 dark:text-white mb-2">
              Even we got confused. Try again?
            </h3>
            <p className="text-xs text-rose-800 dark:text-rose-300 font-mono mb-4 font-medium">
              {error}
            </p>
            {onRetry && (
              <button
                onClick={onRetry}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1C1917] dark:bg-rose-600 hover:bg-[#2A2421] text-[#FAF6EE] font-mono text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
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
            className="p-8 rounded-2xl bg-[#E8E0D5]/40 dark:bg-slate-900/90 border-2 border-[#1C1917]/30 dark:border-sky-900/60 shadow-xl relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-6 border-b border-[#1C1917]/20 dark:border-sky-900/40 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-[#1C1917] dark:bg-[#38BDF8] animate-ping"></div>
                <span className="font-mono text-xs text-[#44403C] dark:text-sky-300 uppercase tracking-widest font-bold">
                  Streaming {levelInfo.shortLabel} Mode Response...
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="h-4 bg-[#1C1917]/10 dark:bg-sky-950/40 rounded-lg w-full shimmer-bg"></div>
              <div className="h-4 bg-[#1C1917]/10 dark:bg-sky-950/40 rounded-lg w-11/12 shimmer-bg"></div>
              <div className="h-4 bg-[#1C1917]/10 dark:bg-sky-950/40 rounded-lg w-4/5 shimmer-bg"></div>
              <div className="h-4 bg-[#1C1917]/10 dark:bg-sky-950/40 rounded-lg w-3/4 shimmer-bg"></div>
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
            <div className="relative p-6 sm:p-8 rounded-2xl bg-[#E8E0D5]/40 dark:bg-slate-900/90 border-2 border-[#1C1917]/30 dark:border-sky-900/60 shadow-2xl text-[#1C1917] dark:text-slate-100 transition-colors duration-300">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6 border-b border-[#1C1917]/20 dark:border-sky-900/40 pb-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-[#1C1917] dark:bg-[#38BDF8] text-[#FAF6EE] dark:text-slate-950 font-mono font-bold text-xs uppercase tracking-wider">
                    {levelInfo.code} / {levelInfo.badge}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {latencyMetrics && (
                    <span className="px-3 py-1 rounded-full bg-[#1C1917]/10 dark:bg-slate-950 border border-[#1C1917]/30 dark:border-sky-800/60 text-[#1C1917] dark:text-[#38BDF8] font-bold font-mono text-xs">
                      {(latencyMetrics.latencyMs / 1000).toFixed(2)}s LATENCY
                    </span>
                  )}

                  <button
                    onClick={handleCopy}
                    className="p-2 rounded-xl bg-[#FAF6EE] dark:bg-slate-950 border border-[#1C1917]/30 dark:border-sky-800/60 hover:bg-[#1C1917] hover:text-[#FAF6EE] dark:hover:border-[#38BDF8] text-[#1C1917] dark:text-sky-300 transition-colors"
                    title="Copy explanation"
                  >
                    {copied ? <Check className="w-4 h-4 text-[#38BDF8]" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className={`relative text-base sm:text-lg text-[#1C1917] dark:text-slate-100 leading-relaxed font-medium ${isStreaming ? 'typing-cursor' : ''}`}>
                <ReactMarkdown
                  components={{
                    h2: ({node, ...props}) => <h2 className="font-serif italic font-bold text-2xl sm:text-3xl text-[#1C1917] dark:text-[#38BDF8] mt-8 mb-4 border-b border-[#1C1917]/20 dark:border-sky-900/40 pb-2" {...props} />,
                    h3: ({node, ...props}) => <h3 className="font-sans font-bold text-lg sm:text-xl text-[#44403C] dark:text-white mt-6 mb-3" {...props} />,
                    p: ({node, ...props}) => <p className="mb-4 leading-relaxed text-[#1C1917] dark:text-slate-200 font-medium" {...props} />,
                    ul: ({node, ...props}) => <ul className="space-y-3 mb-6" {...props} />,
                    li: ({node, ...props}) => (
                      <motion.li 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-start gap-3 bg-[#FAF6EE] dark:bg-slate-950/60 p-4 rounded-xl border border-[#1C1917]/20 dark:border-sky-900/40 shadow-xs" 
                        {...props}
                      >
                        <span className="w-2 h-2 rounded-full bg-[#1C1917] dark:bg-[#38BDF8] mt-2 shrink-0"></span>
                        <span className="font-bold text-[#1C1917] dark:text-slate-100">{props.children}</span>
                      </motion.li>
                    ),
                    strong: ({node, ...props}) => <strong className="font-extrabold text-[#1C1917] dark:text-[#38BDF8]" {...props} />,
                    code: ({node, ...props}) => <code className="px-1.5 py-0.5 bg-[#1C1917]/10 dark:bg-slate-950 border border-[#1C1917]/30 dark:border-sky-800/60 text-[#1C1917] dark:text-[#38BDF8] font-mono text-xs font-bold" {...props} />
                  }}
                >
                  {explanationText}
                </ReactMarkdown>
              </div>

              {latencyMetrics && !isStreaming && (
                <div className="mt-8 pt-4 border-t border-[#1C1917]/20 dark:border-sky-900/40 flex items-center justify-between font-mono text-[10px] text-[#44403C] dark:text-sky-400 uppercase tracking-wider font-bold">
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
                  className="mt-8 pt-6 border-t border-[#1C1917]/20 dark:border-sky-900/40"
                >
                  <div className="font-mono text-xs font-bold text-[#1C1917] dark:text-[#38BDF8] uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-[#1C1917] dark:text-[#38BDF8]" />
                    <span>GO DEEPER — RESEARCH PIPELINE</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                    <a
                      href={wikiUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3.5 bg-[#FAF6EE] dark:bg-slate-950 border border-[#1C1917]/30 dark:border-sky-900/60 text-[#1C1917] dark:text-slate-200 hover:border-[#1C1917] dark:hover:border-[#38BDF8] hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 group rounded-xl"
                    >
                      <div className="flex items-center gap-2.5 min-w-0 pr-2">
                        <BookOpen className="w-4 h-4 shrink-0 text-[#44403C] dark:text-sky-400 group-hover:text-[#1C1917] dark:group-hover:text-[#38BDF8]" />
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
                      className="flex items-center justify-between p-3.5 bg-[#FAF6EE] dark:bg-slate-950 border border-[#1C1917]/30 dark:border-sky-900/60 text-[#1C1917] dark:text-slate-200 hover:border-[#1C1917] dark:hover:border-[#38BDF8] hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 group rounded-xl"
                    >
                      <div className="flex items-center gap-2.5 min-w-0 pr-2">
                        <GraduationCap className="w-4 h-4 shrink-0 text-[#44403C] dark:text-sky-400 group-hover:text-[#1C1917] dark:group-hover:text-[#38BDF8]" />
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
                      className="flex items-center justify-between p-3.5 bg-[#FAF6EE] dark:bg-slate-950 border border-[#1C1917]/30 dark:border-sky-900/60 text-[#1C1917] dark:text-slate-200 hover:border-[#1C1917] dark:hover:border-[#38BDF8] hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 group rounded-xl"
                    >
                      <div className="flex items-center gap-2.5 min-w-0 pr-2">
                        <PlayCircle className="w-4 h-4 shrink-0 text-[#44403C] dark:text-sky-400 group-hover:text-[#1C1917] dark:group-hover:text-[#38BDF8]" />
                        <span className="text-xs font-mono font-bold truncate">
                          YouTube Deep-Dives
                        </span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 shrink-0 opacity-60 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </div>

                  <p className="font-mono text-[10px] text-[#44403C] dark:text-sky-400/80 text-left font-medium">
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
            className="p-10 bg-[#E8E0D5]/20 dark:bg-slate-900/90 border-2 border-dashed border-[#1C1917]/30 dark:border-sky-900/60 text-center rounded-2xl"
          >
            <p className="font-mono text-xs uppercase tracking-widest text-[#44403C] dark:text-sky-300 font-bold">
              Your brain will thank you in 5 seconds.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
