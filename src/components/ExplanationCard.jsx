import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Copy, Check, AlertCircle, RefreshCw, BookOpen, GraduationCap, PlayCircle, ExternalLink, Terminal, Sparkles } from 'lucide-react';
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
            className="p-6 rounded-2xl bg-rose-50 dark:bg-[#180A0A] border-2 border-rose-300 dark:border-rose-900/80 text-rose-900 dark:text-rose-200 text-left shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-3 text-rose-600 dark:text-rose-400 font-mono text-xs font-bold uppercase tracking-wider">
              <AlertCircle className="w-5 h-5" />
              <span>Pipeline Failure</span>
            </div>
            <h3 className="font-serif italic font-bold text-2xl text-rose-950 dark:text-white mb-2">
              Even we got confused. Try again?
            </h3>
            <p className="text-xs text-rose-700 dark:text-rose-300 font-mono mb-4">
              {error}
            </p>
            {onRetry && (
              <button
                onClick={onRetry}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
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
            className={`p-8 shadow-xl relative overflow-hidden ${
              levelKey === 'CHILD' 
                ? 'rounded-3xl bg-rose-50/90 dark:bg-rose-950/30 border-2 border-rose-300 dark:border-rose-800' 
                : levelKey === 'TEEN' 
                ? 'rounded-xl bg-slate-900/95 dark:bg-[#0A0E17] border-2 border-cyan-500/50 shadow-[0_0_30px_rgba(0,229,255,0.15)]'
                : 'rounded-md bg-[#0D1117] border border-slate-700/90'
            }`}
          >
            <div className="flex items-center justify-between mb-6 border-b border-slate-200 dark:border-neutral-800 pb-4">
              <div className="flex items-center gap-3">
                <div 
                  className="w-3 h-3 rounded-full animate-ping"
                  style={{ backgroundColor: levelInfo.accentColor }}
                ></div>
                <span className="font-mono text-xs text-slate-500 dark:text-neutral-400 uppercase tracking-widest font-bold">
                  Streaming {levelInfo.shortLabel} Mode Response...
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="h-4 bg-slate-200 dark:bg-neutral-800/80 rounded-none w-full shimmer-bg"></div>
              <div className="h-4 bg-slate-200 dark:bg-neutral-800/80 rounded-none w-11/12 shimmer-bg"></div>
              <div className="h-4 bg-slate-200 dark:bg-neutral-800/80 rounded-none w-4/5 shimmer-bg"></div>
              <div className="h-4 bg-slate-200 dark:bg-neutral-800/80 rounded-none w-3/4 shimmer-bg"></div>
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
            {levelKey === 'CHILD' && (
              <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-rose-50/90 via-amber-50/50 to-white dark:from-rose-950/40 dark:via-slate-900/90 dark:to-slate-950 border-2 border-rose-300 dark:border-rose-800/80 shadow-2xl text-slate-900 dark:text-rose-50">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6 border-b border-rose-200 dark:border-rose-900/50 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-rose-200 dark:bg-rose-900/80 text-rose-800 dark:text-rose-200 font-mono font-bold text-xs uppercase tracking-wider">
                      05 / KINDERGARTEN PLAYGROUND EDITION
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {latencyMetrics && (
                      <span className="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/80 border border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-300 font-bold text-xs">
                        {(latencyMetrics.latencyMs / 1000).toFixed(2)}s LATENCY
                      </span>
                    )}

                    <button
                      onClick={handleCopy}
                      className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-rose-200 dark:border-rose-800 hover:bg-rose-100 dark:hover:bg-slate-700 text-slate-700 dark:text-rose-200 transition-colors"
                      title="Copy explanation"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className={`relative text-base sm:text-lg text-slate-800 dark:text-rose-100 leading-relaxed font-medium ${isStreaming ? 'typing-cursor' : ''}`}>
                  <ReactMarkdown
                    components={{
                      p: ({node, ...props}) => <p className="mb-4 leading-relaxed text-slate-800 dark:text-rose-100" {...props} />,
                      ul: ({node, ...props}) => <ul className="space-y-3 mb-6" {...props} />,
                      li: ({node, ...props}) => (
                        <motion.li 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex items-start gap-3 bg-white/90 dark:bg-rose-950/40 p-4 rounded-2xl border border-rose-200/80 dark:border-rose-900/40 shadow-xs" 
                          {...props}
                        >
                          <span className="w-2 h-2 rounded-full bg-rose-500 mt-2 shrink-0"></span>
                          <span className="font-semibold text-slate-800 dark:text-rose-100">{props.children}</span>
                        </motion.li>
                      ),
                      strong: ({node, ...props}) => <strong className="font-extrabold text-rose-600 dark:text-rose-300" {...props} />
                    }}
                  >
                    {explanationText}
                  </ReactMarkdown>
                </div>
              </div>
            )}

            {levelKey === 'TEEN' && (
              <div className="relative p-6 sm:p-8 rounded-xl bg-slate-900/95 dark:bg-[#0A0E17] border-2 border-cyan-500/60 shadow-[0_0_30px_rgba(0,229,255,0.15)] text-cyan-50">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6 border-b border-cyan-800/60 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-none bg-cyan-950 text-[#00E5FF] border border-cyan-800 font-mono text-xs font-bold uppercase tracking-widest">
                      15 / HIGH SCHOOL CYBER EDITION
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {latencyMetrics && (
                      <span className="px-3 py-1 font-mono text-xs font-bold bg-cyan-950 text-[#00E5FF] border border-cyan-800">
                        [SPEED: {(latencyMetrics.latencyMs / 1000).toFixed(2)}s]
                      </span>
                    )}

                    <button
                      onClick={handleCopy}
                      className="p-2 bg-slate-800 border border-cyan-800 hover:border-[#00E5FF] text-cyan-300 transition-colors"
                      title="Copy explanation"
                    >
                      {copied ? <Check className="w-4 h-4 text-[#00E5FF]" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className={`relative text-base sm:text-lg text-slate-200 leading-relaxed font-sans ${isStreaming ? 'typing-cursor' : ''}`}>
                  <ReactMarkdown
                    components={{
                      h2: ({node, ...props}) => <h2 className="font-mono font-bold text-xl sm:text-2xl text-[#00E5FF] mt-6 mb-3 border-b border-cyan-900/60 pb-1.5 uppercase tracking-wide" {...props} />,
                      h3: ({node, ...props}) => <h3 className="font-mono font-semibold text-lg text-indigo-300 mt-4 mb-2" {...props} />,
                      p: ({node, ...props}) => <p className="mb-4 leading-relaxed text-slate-200" {...props} />,
                      ul: ({node, ...props}) => <ul className="list-disc list-outside ml-5 space-y-2 mb-6" {...props} />,
                      li: ({node, ...props}) => <li className="text-slate-200 font-medium pl-1" {...props} />,
                      strong: ({node, ...props}) => <strong className="font-bold text-[#00E5FF]" {...props} />
                    }}
                  >
                    {explanationText}
                  </ReactMarkdown>
                </div>
              </div>
            )}

            {levelKey === 'EXPERT' && (
              <div className="relative p-6 sm:p-8 rounded-md bg-[#0D1117] border border-slate-700/90 shadow-2xl text-neutral-200">
                <div className="flex items-center justify-between bg-slate-900 px-4 py-2.5 border-b border-slate-800 -mx-6 sm:-mx-8 -mt-6 sm:-mt-8 mb-6 rounded-t-md">
                  <span className="font-mono text-xs text-slate-400">
                    terminal://domain_expert_analysis.sh
                  </span>
                  <span className="font-mono text-[10px] text-[#C6FF00] uppercase tracking-widest font-bold">
                    TELEMETRY ACTIVE
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 mb-6 border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 font-mono text-xs font-bold bg-neutral-900 border border-slate-700 text-[#C6FF00]">
                      EXP / DOMAIN EXPERT TERMINAL
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    {latencyMetrics && (
                      <span className="px-3 py-1 bg-neutral-900 border border-slate-700 text-[#C6FF00] font-mono text-xs font-bold">
                        {(latencyMetrics.latencyMs / 1000).toFixed(2)}s LATENCY
                      </span>
                    )}

                    <button
                      onClick={handleCopy}
                      className="p-2 bg-neutral-900 border border-slate-700 hover:border-[#C6FF00] text-neutral-300 transition-colors"
                      title="Copy explanation"
                    >
                      {copied ? <Check className="w-4 h-4 text-[#C6FF00]" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className={`relative text-base sm:text-lg text-neutral-200 leading-relaxed font-normal ${isStreaming ? 'typing-cursor' : ''}`}>
                  <ReactMarkdown
                    components={{
                      h2: ({node, ...props}) => <h2 className="font-serif italic font-bold text-2xl sm:text-3xl text-[#C6FF00] mt-8 mb-4 border-b border-slate-800 pb-2" {...props} />,
                      h3: ({node, ...props}) => <h3 className="font-sans font-semibold text-lg text-white mt-6 mb-3" {...props} />,
                      p: ({node, ...props}) => <p className="mb-4 leading-relaxed text-neutral-300" {...props} />,
                      ul: ({node, ...props}) => <ul className="list-disc list-outside ml-5 space-y-2 mb-6" {...props} />,
                      li: ({node, ...props}) => <li className="text-neutral-200 font-normal pl-1" {...props} />,
                      strong: ({node, ...props}) => <strong className="font-bold text-[#C6FF00]" {...props} />
                    }}
                  >
                    {explanationText}
                  </ReactMarkdown>
                </div>

                {latencyMetrics && !isStreaming && (
                  <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between font-mono text-[10px] text-slate-400 uppercase tracking-wider">
                    <span>
                      TTFB: {latencyMetrics.ttfbMs}ms
                    </span>
                    <span className="text-[#C6FF00] font-bold">
                      EXPERT ANALYSIS COMPLETED
                    </span>
                  </div>
                )}

                {!isStreaming && explanationText && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="mt-8 pt-6 border-t border-slate-800"
                  >
                    <div className="font-mono text-xs font-bold text-[#C6FF00] uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-[#C6FF00]" />
                      <span>GO DEEPER — RESEARCH PIPELINE</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                      <a
                        href={wikiUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3.5 bg-neutral-900 border border-slate-700 text-neutral-200 hover:border-[#C6FF00] hover:text-[#C6FF00] hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 group rounded-none"
                      >
                        <div className="flex items-center gap-2.5 min-w-0 pr-2">
                          <BookOpen className="w-4 h-4 shrink-0 text-slate-400 group-hover:text-[#C6FF00]" />
                          <span className="text-xs font-mono font-medium truncate">
                            Wikipedia — {topic}
                          </span>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 shrink-0 opacity-60 group-hover:opacity-100 transition-opacity" />
                      </a>

                      <a
                        href={scholarUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3.5 bg-neutral-900 border border-slate-700 text-neutral-200 hover:border-[#C6FF00] hover:text-[#C6FF00] hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 group rounded-none"
                      >
                        <div className="flex items-center gap-2.5 min-w-0 pr-2">
                          <GraduationCap className="w-4 h-4 shrink-0 text-slate-400 group-hover:text-[#C6FF00]" />
                          <span className="text-xs font-mono font-medium truncate">
                            Google Scholar
                          </span>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 shrink-0 opacity-60 group-hover:opacity-100 transition-opacity" />
                      </a>

                      <a
                        href={youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3.5 bg-neutral-900 border border-slate-700 text-neutral-200 hover:border-[#C6FF00] hover:text-[#C6FF00] hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 group rounded-none"
                      >
                        <div className="flex items-center gap-2.5 min-w-0 pr-2">
                          <PlayCircle className="w-4 h-4 shrink-0 text-slate-400 group-hover:text-[#C6FF00]" />
                          <span className="text-xs font-mono font-medium truncate">
                            YouTube Deep-Dives
                          </span>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 shrink-0 opacity-60 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </div>

                    <p className="font-mono text-[10px] text-slate-500 text-left">
                      Links generated from your search topic — not verified for accuracy of external content.
                    </p>
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-10 bg-white dark:bg-[#121212] border border-dashed border-slate-300 dark:border-neutral-800 text-center"
          >
            <p className="font-mono text-xs uppercase tracking-widest text-slate-500 dark:text-neutral-400">
              Your brain will thank you in 5 seconds.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
