import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ComplexitySlider } from './components/ComplexitySlider';
import { ExplanationCard } from './components/ExplanationCard';
import { RecentTopics } from './components/RecentTopics';
import { EasterEggModal } from './components/EasterEggModal';
import { fetchExplanationStreaming } from './services/groqService';

export default function App() {
  const [topic, setTopic] = useState('');
  const [activeTopic, setActiveTopic] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('CHILD');
  const [explanationText, setExplanationText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState(null);
  const [latencyMetrics, setLatencyMetrics] = useState(null);
  const [recentTopics, setRecentTopics] = useState(['Blockchain', 'Quantum Computing', 'Black Holes']);
  const [sessionCount, setSessionCount] = useState(0);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleToggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const handleRunExplanation = async (targetTopic, levelKey = selectedLevel) => {
    if (!targetTopic.trim() || isLoading) return;

    const cleanTopic = targetTopic.trim();
    setTopic(cleanTopic);
    setActiveTopic(cleanTopic);
    setExplanationText('');
    setError(null);
    setLatencyMetrics(null);
    setIsLoading(true);
    setIsStreaming(false);

    try {
      const result = await fetchExplanationStreaming(
        cleanTopic,
        levelKey,
        (tokenDelta) => {
          setIsStreaming(true);
          setExplanationText(prev => prev + tokenDelta);
        },
        () => {
          setIsLoading(false);
        }
      );

      setIsStreaming(false);
      setIsLoading(false);
      setExplanationText(result.text);
      setLatencyMetrics({
        latencyMs: result.latencyMs,
        ttfbMs: result.ttfbMs
      });

      setSessionCount(prev => prev + 1);

      if (!recentTopics.includes(cleanTopic)) {
        setRecentTopics(prev => [cleanTopic, ...prev.slice(0, 4)]);
      }

      if (result.isEasterEgg) {
        setShowEasterEgg(true);
      }
    } catch (err) {
      setIsLoading(false);
      setIsStreaming(false);
      setError(err.message || 'Something went wrong while fetching explanation. Try again?');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0A0A0A] text-slate-900 dark:text-neutral-100 flex flex-col transition-colors duration-300 relative overflow-hidden font-sans bg-grain">
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-lime-500/10 dark:bg-[#C6FF00]/8 rounded-full blur-[120px] pointer-events-none"></div>

      <Navbar 
        isDarkMode={isDarkMode} 
        onToggleDarkMode={handleToggleDarkMode} 
        sessionCount={sessionCount} 
      />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 pb-16 flex flex-col items-center relative z-10">
        <Hero 
          topic={topic} 
          setTopic={setTopic} 
          onSubmit={(t) => handleRunExplanation(t, selectedLevel)} 
          isLoading={isLoading} 
          activeTopic={activeTopic}
        />

        <div className="w-full max-w-3xl border-t border-slate-200 dark:border-neutral-800/60 my-2"></div>

        <ComplexitySlider 
          selectedLevel={selectedLevel} 
          onSelectLevel={(level) => {
            setSelectedLevel(level);
            if (activeTopic) {
              handleRunExplanation(activeTopic, level);
            }
          }} 
        />

        <RecentTopics 
          topics={recentTopics} 
          onSelectTopic={(t) => handleRunExplanation(t, selectedLevel)} 
        />

        <div className="w-full max-w-3xl border-t border-slate-200 dark:border-neutral-800/60 my-2"></div>

        <ExplanationCard 
          topic={activeTopic}
          explanationText={explanationText}
          isLoading={isLoading}
          isStreaming={isStreaming}
          error={error}
          latencyMetrics={latencyMetrics}
          levelKey={selectedLevel}
          onRetry={() => handleRunExplanation(activeTopic, selectedLevel)}
        />
      </main>

      <footer className="w-full border-t border-slate-200 dark:border-neutral-800 py-6 text-center text-xs font-mono text-slate-500 dark:text-neutral-400 relative z-10">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-2 uppercase tracking-wider">
          <span>ELI5 — GROQ STREAMING PIPELINE ⚡</span>
          <span className="text-lime-600 dark:text-[#C6FF00] font-bold">NO PHD REQUIRED</span>
        </div>
      </footer>

      <EasterEggModal 
        isOpen={showEasterEgg} 
        onClose={() => setShowEasterEgg(false)} 
      />
    </div>
  );
}
