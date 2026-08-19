import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Zap, Copy, Check, AlertTriangle, Sparkles, RefreshCw, Clock } from 'lucide-react';
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

  return (
    <div className="w-full max-w-3xl mx-auto px-4 my-6">
      <AnimatePresence mode="wait">
        {error ? (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="p-6 rounded-3xl bg-rose-50 dark:bg-rose-950/40 border-2 border-rose-200 dark:border-rose-800/80 text-rose-900 dark:text-rose-200 text-center shadow-lg"
          >
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-rose-100 dark:bg-rose-900/60 flex items-center justify-center text-rose-600 dark:text-rose-400">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg mb-1">Even we got confused. Try again? 😅</h3>
            <p className="text-sm text-rose-700 dark:text-rose-300 max-w-md mx-auto mb-4 font-medium">
              {error}
            </p>
            {onRetry && (
              <button
                onClick={onRetry}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Retry Request</span>
              </button>
            )}
          </motion.div>
        ) : isLoading && !explanationText ? (
          <motion.div
            key="skeleton"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-6 border-b border-slate-100 dark:border-slate-800/80 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400 animate-bounce">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded animate-pulse mb-1.5"></div>
                  <div className="h-3 w-20 bg-slate-100 dark:bg-slate-800/60 rounded animate-pulse"></div>
                </div>
              </div>
              <span className="text-xs font-semibold text-indigo-500 animate-pulse">Simplifying the universe... ⚡</span>
            </div>

            <div className="space-y-3">
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-lg w-full shimmer-bg"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-lg w-11/12 shimmer-bg"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-lg w-4/5 shimmer-bg"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-lg w-3/4 shimmer-bg"></div>
            </div>
          </motion.div>
        ) : explanationText ? (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border-2 border-indigo-100 dark:border-indigo-900/50 shadow-2xl overflow-hidden"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl p-2 rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-100 dark:border-indigo-800/50">
                  {levelInfo.emoji}
                </span>
                <div>
                  <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white capitalize">
                    {topic}
                  </h3>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    Explained for {levelInfo.shortLabel}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {latencyMetrics && (
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800/80 text-amber-700 dark:text-amber-300 text-xs font-bold shadow-sm"
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>Explained in {(latencyMetrics.latencyMs / 1000).toFixed(2)}s</span>
                  </motion.div>
                )}

                <button
                  onClick={handleCopy}
                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
                  title="Copy explanation"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className={`relative text-base sm:text-lg text-slate-800 dark:text-slate-200 leading-relaxed font-normal ${isStreaming ? 'typing-cursor' : ''}`}>
              <ReactMarkdown
                components={{
                  h2: ({node, ...props}) => <h2 className="font-display font-bold text-xl sm:text-2xl text-indigo-600 dark:text-indigo-400 mt-6 mb-3 border-b border-indigo-100 dark:border-indigo-900/40 pb-1.5" {...props} />,
                  h3: ({node, ...props}) => <h3 className="font-display font-semibold text-lg sm:text-xl text-purple-600 dark:text-purple-400 mt-4 mb-2" {...props} />,
                  p: ({node, ...props}) => <p className="mb-3.5 leading-relaxed" {...props} />,
                  ul: ({node, ...props}) => <ul className="list-disc list-outside ml-5 space-y-2 mb-4" {...props} />,
                  ol: ({node, ...props}) => <ol className="list-decimal list-outside ml-5 space-y-2 mb-4" {...props} />,
                  li: ({node, ...props}) => <li className="text-slate-800 dark:text-slate-200 font-medium pl-1" {...props} />,
                  strong: ({node, ...props}) => <strong className="font-bold text-slate-900 dark:text-white" {...props} />,
                  code: ({node, ...props}) => <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-300 font-mono text-sm" {...props} />
                }}
              >
                {explanationText}
              </ReactMarkdown>
            </div>

            {latencyMetrics && !isStreaming && (
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-400 dark:text-slate-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  First token in {latencyMetrics.ttfbMs}ms
                </span>
                <span className="font-mono text-[11px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                  Groq Active Models
                </span>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-8 rounded-3xl bg-slate-50/60 dark:bg-slate-900/40 border-2 border-dashed border-slate-200 dark:border-slate-800 text-center"
          >
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-indigo-500">
              <Sparkles className="w-6 h-6" />
            </div>
            <p className="font-display font-medium text-slate-600 dark:text-slate-400 text-sm">
              Your brain will thank you in 5 seconds.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
