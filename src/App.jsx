import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WorkflowSection } from './components/WorkflowSection';
import { ComplexitySlider } from './components/ComplexitySlider';
import { ExplanationCard } from './components/ExplanationCard';
import { RecentTopics } from './components/RecentTopics';
import { EasterEggModal } from './components/EasterEggModal';
import { SecretModal } from './components/SecretModal';
import { MatrixRain } from './components/MatrixRain';
import { ChaiModal } from './components/ChaiModal';
import { RoastOverlay } from './components/RoastOverlay';
import { GravityBanner } from './components/GravityBanner';
import { GridBackground } from './components/GridBackground';
import { fetchExplanationStreaming } from './services/groqService';
import { COMPLEXITY_LEVELS } from './utils/prompts';

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp', 
  'ArrowDown', 'ArrowDown', 
  'ArrowLeft', 'ArrowRight', 
  'ArrowLeft', 'ArrowRight', 
  'b', 'a'
];

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
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [konamiIndex, setKonamiIndex] = useState(0);

  // Secret Easter Egg States
  const [isMatrixActive, setIsMatrixActive] = useState(false);
  const [isChaiOpen, setIsChaiOpen] = useState(false);
  const [isRoastActive, setIsRoastActive] = useState(false);
  const [isGravityActive, setIsGravityActive] = useState(false);
  const [isSecretModalOpen, setIsSecretModalOpen] = useState(false);

  const modeConfig = COMPLEXITY_LEVELS[selectedLevel] || COMPLEXITY_LEVELS.CHILD;

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const expectedKey = KONAMI_CODE[konamiIndex].toLowerCase();
      const pressedKey = e.key.toLowerCase();

      // Matrix Shortcut: Ctrl+Shift+M or `~`
      if ((e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'm') || e.key === '`') {
        setIsMatrixActive(prev => !prev);
        return;
      }

      if (e.key === 'Escape') {
        setIsMatrixActive(false);
      }

      if (pressedKey === expectedKey) {
        const nextIndex = konamiIndex + 1;
        if (nextIndex === KONAMI_CODE.length) {
          setShowEasterEgg(true);
          setKonamiIndex(0);
        } else {
          setKonamiIndex(nextIndex);
        }
      } else {
        setKonamiIndex(0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konamiIndex]);

  const handleToggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const handleRunExplanation = async (targetTopic, levelKey = selectedLevel) => {
    if (!targetTopic.trim() || isLoading) return;

    const cleanTopic = targetTopic.trim();
    const lowerTopic = cleanTopic.toLowerCase();

    // Check Easter Egg triggers
    if (lowerTopic === 'matrix') {
      setIsMatrixActive(true);
      setTopic('');
      return;
    }
    if (lowerTopic === 'chai' || lowerTopic === 'tea' || lowerTopic === 'stress') {
      setIsChaiOpen(true);
    }
    if (lowerTopic.includes('roast')) {
      setIsRoastActive(true);
    }
    if (lowerTopic === 'gravity' || lowerTopic === 'bounce' || lowerTopic === 'fall') {
      setIsGravityActive(true);
      setTopic('');
      return;
    }
    if (lowerTopic === 'gugugaga' || lowerTopic === 'baby' || lowerTopic === 'toddler') {
      setSelectedLevel('TODDLER');
      levelKey = 'TODDLER';
    }

    setTopic(cleanTopic);
    setActiveTopic(cleanTopic);
    setExplanationText('');
    setError(null);
    setLatencyMetrics(null);
    setIsLoading(true);
    setIsStreaming(false);

    setTimeout(() => {
      const el = document.getElementById('explanation-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 50);

    try {
      const result = await fetchExplanationStreaming(
        cleanTopic,
        levelKey,
        (tokenDelta, cleanText) => {
          setIsStreaming(true);
          setExplanationText(cleanText);
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
    <div className="min-h-screen bg-[#FAF6EE] dark:bg-[#02122F] text-[#1C1917] dark:text-[#F0F4F8] flex flex-col transition-colors duration-300 relative overflow-hidden font-sans bg-grain">
      <GridBackground isDarkMode={isDarkMode} />
      
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-amber-500/10 dark:bg-[#23354D]/30 rounded-full blur-[120px] pointer-events-none"></div>

      <Navbar 
        isDarkMode={isDarkMode} 
        onToggleDarkMode={handleToggleDarkMode} 
        sessionCount={sessionCount} 
        onTriggerEasterEgg={() => setShowEasterEgg(true)}
        onOpenSecrets={() => setIsSecretModalOpen(true)}
      />

      <GravityBanner 
        isActive={isGravityActive} 
        onReset={() => setIsGravityActive(false)} 
      />

      <motion.main 
        animate={isGravityActive ? { y: 220, rotate: 2 } : { y: 0, rotate: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
        className="flex-1 max-w-5xl mx-auto w-full px-4 pb-16 flex flex-col items-center relative z-10"
      >
        <Hero 
          topic={topic} 
          setTopic={setTopic} 
          onSubmit={(t) => handleRunExplanation(t, selectedLevel)} 
          isLoading={isLoading} 
          activeTopic={activeTopic}
          selectedLevel={selectedLevel}
        />

        <WorkflowSection />

        <div className="w-full max-w-3xl border-t border-[#1C1917]/20 dark:border-[#8EA8C3]/30 my-2"></div>

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

        <div className="w-full max-w-3xl border-t border-[#1C1917]/20 dark:border-[#8EA8C3]/30 my-2"></div>

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
      </motion.main>

      <footer className="w-full border-t border-[#1C1917]/20 dark:border-[#8EA8C3]/30 py-6 text-center text-xs font-mono text-[#44403C] dark:text-[#8EA8C3] relative z-10 backdrop-blur-md bg-[#FAF6EE]/70 dark:bg-[#02122F]/70">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-2 uppercase tracking-wider font-bold mb-2">
          <span>ELI5 — REAL-TIME INFERENCE PIPELINE ⚡</span>
          <span className="text-[#1C1917] dark:text-[#F0F4F8] font-extrabold">
            [{modeConfig.code}] {modeConfig.shortLabel.toUpperCase()} MODE ACTIVE
          </span>
        </div>
        <div className="flex items-center justify-center mt-1">
          <button 
            onClick={() => setIsSecretModalOpen(true)} 
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] text-[#44403C]/30 dark:text-[#8EA8C3]/30 hover:text-[#1C1917] dark:hover:text-[#F0F4F8] hover:bg-[#1C1917]/5 dark:hover:bg-[#8EA8C3]/10 transition-all duration-300 group cursor-pointer font-mono"
            title="Encrypted Cipher Terminal"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#1C1917]/30 dark:bg-[#8EA8C3]/40 group-hover:bg-amber-400 transition-colors" />
            <span className="max-w-0 group-hover:max-w-xs opacity-0 group-hover:opacity-100 overflow-hidden whitespace-nowrap transition-all duration-300 font-bold uppercase tracking-widest">
              [SOLVE CIPHER]
            </span>
          </button>
        </div>
      </footer>

      {/* Secret Easter Egg Overlays & Modals */}
      <EasterEggModal 
        isOpen={showEasterEgg} 
        onClose={() => setShowEasterEgg(false)} 
      />

      <SecretModal 
        isOpen={isSecretModalOpen} 
        onClose={() => setIsSecretModalOpen(false)} 
      />

      <MatrixRain 
        isActive={isMatrixActive} 
        onClose={() => setIsMatrixActive(false)} 
      />

      <ChaiModal 
        isOpen={isChaiOpen} 
        onClose={() => setIsChaiOpen(false)} 
      />

      <RoastOverlay 
        isActive={isRoastActive} 
        onClose={() => setIsRoastActive(false)} 
      />
    </div>
  );
}


