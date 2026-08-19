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
    <div className="min-h-screen bg-cute-bgLight dark:bg-cute-bgDark text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-300 relative overflow-hidden font-sans">
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-400/20 dark:bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-pink-400/20 dark:bg-pink-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <Navbar 
        isDarkMode={isDarkMode} 
        onToggleDarkMode={handleToggleDarkMode} 
        sessionCount={sessionCount} 
      />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 pb-16 flex flex-col items-center">
        <Hero 
          topic={topic} 
          setTopic={setTopic} 
          onSubmit={(t) => handleRunExplanation(t, selectedLevel)} 
          isLoading={isLoading} 
          activeTopic={activeTopic}
        />

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

      <footer className="w-full border-t border-slate-200/80 dark:border-slate-800/80 py-6 text-center text-xs font-semibold text-slate-500 dark:text-slate-400">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>ELI5 — Powered by Groq streaming speed ⚡</span>
          <span className="text-indigo-600 dark:text-indigo-400 font-bold">No PhD Required 🧒</span>
        </div>
      </footer>

      <EasterEggModal 
        isOpen={showEasterEgg} 
        onClose={() => setShowEasterEgg(false)} 
      />
    </div>
  );
}
