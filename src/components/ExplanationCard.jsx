import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Copy, Check, AlertCircle, RefreshCw } from 'lucide-react';
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
    <div className="w-full max-w-3xl mx-auto px-4 my-8">
      <AnimatePresence mode="wait">
        {error ? (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="p-6 bg-[#121212] border border-rose-900/60 text-neutral-200 text-left shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-3 text-rose-500 font-mono text-xs font-bold uppercase tracking-wider">
              <AlertCircle className="w-4 h-4" />
              <span>Execution Error</span>
            </div>
            <h3 className="font-serif italic font-bold text-xl text-white mb-2">
              Even we got confused. Try again?
            </h3>
            <p className="text-xs text-neutral-400 font-mono mb-4">
              {error}
            </p>
            {onRetry && (
              <button
                onClick={onRetry}
                className="inline-flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs uppercase tracking-wider transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>RETRY REQUEST</span>
              </button>
            )}
          </motion.div>
        ) : isLoading && !explanationText ? (
          <motion.div
            key="skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-8 bg-[#121212] border border-neutral-800 relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-6 border-b border-neutral-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-[#C6FF00] animate-ping"></div>
                <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
                  Processing Stream...
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="h-4 bg-neutral-800/80 rounded-none w-full shimmer-bg"></div>
              <div className="h-4 bg-neutral-800/80 rounded-none w-11/12 shimmer-bg"></div>
              <div className="h-4 bg-neutral-800/80 rounded-none w-4/5 shimmer-bg"></div>
              <div className="h-4 bg-neutral-800/80 rounded-none w-3/4 shimmer-bg"></div>
            </div>
          </motion.div>
        ) : explanationText ? (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative p-6 sm:p-8 bg-[#121212] border border-neutral-800 shadow-2xl"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6 border-b border-neutral-800 pb-4">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 font-mono text-xs font-bold bg-neutral-900 border border-neutral-800 text-[#C6FF00]">
                  {levelInfo.code}
                </span>
                <div>
                  <h3 className="font-serif italic font-bold text-2xl text-white capitalize leading-none mb-1">
                    {topic}
                  </h3>
                  <p className="font-mono text-[10px] uppercase text-neutral-400 tracking-wider">
                    TARGET: {levelInfo.shortLabel}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {latencyMetrics && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="px-3 py-1 bg-neutral-950 border border-neutral-800 text-[#C6FF00] font-mono text-xs"
                  >
                    {(latencyMetrics.latencyMs / 1000).toFixed(2)}s LATENCY
                  </motion.div>
                )}

                <button
                  onClick={handleCopy}
                  className="p-2 bg-neutral-900 border border-neutral-800 hover:border-[#C6FF00] text-neutral-300 transition-colors"
                  title="Copy explanation"
                >
                  {copied ? <Check className="w-4 h-4 text-[#C6FF00]" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className={`relative text-base sm:text-lg text-neutral-200 leading-relaxed font-normal ${isStreaming ? 'typing-cursor' : ''}`}>
              <ReactMarkdown
                components={{
                  h2: ({node, ...props}) => <h2 className="font-serif italic font-bold text-2xl sm:text-3xl text-[#C6FF00] mt-8 mb-4 border-b border-neutral-800 pb-2" {...props} />,
                  h3: ({node, ...props}) => <h3 className="font-sans font-semibold text-lg sm:text-xl text-white mt-6 mb-3" {...props} />,
                  p: ({node, ...props}) => <p className="mb-4 leading-relaxed text-neutral-300" {...props} />,
                  ul: ({node, ...props}) => <ul className="list-disc list-outside ml-5 space-y-2 mb-6" {...props} />,
                  ol: ({node, ...props}) => <ol className="list-decimal list-outside ml-5 space-y-2 mb-6" {...props} />,
                  li: ({node, ...props}) => <li className="text-neutral-200 font-normal pl-1" {...props} />,
                  strong: ({node, ...props}) => <strong className="font-bold text-white text-[#C6FF00]" {...props} />,
                  code: ({node, ...props}) => <code className="px-1.5 py-0.5 bg-neutral-900 border border-neutral-800 text-[#C6FF00] font-mono text-xs" {...props} />
                }}
              >
                {explanationText}
              </ReactMarkdown>
            </div>

            {latencyMetrics && !isStreaming && (
              <div className="mt-8 pt-4 border-t border-neutral-800 flex items-center justify-between font-mono text-[10px] text-neutral-400 uppercase tracking-wider">
                <span>
                  TTFB: {latencyMetrics.ttfbMs}ms
                </span>
                <span>
                  MODEL: GROQ ACTIVE PIPELINE
                </span>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-10 bg-[#121212] border border-dashed border-neutral-800 text-center"
          >
            <p className="font-mono text-xs uppercase tracking-widest text-neutral-400">
              Your brain will thank you in 5 seconds.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
