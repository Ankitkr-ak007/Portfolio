import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if user already saw intro during session
    const hasSeenIntro = sessionStorage.getItem('ak_portfolio_intro_seen');
    if (hasSeenIntro) {
      setIsVisible(false);
      onComplete();
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
            sessionStorage.setItem('ak_portfolio_intro_seen', 'true');
            onComplete();
          }, 400);
          return 100;
        }
        return prev + 5;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050609] text-[#F5F7FA] select-none"
        >
          {/* Grid Background */}
          <div className="absolute inset-0 bg-tech-grid opacity-20" />

          {/* Coordinates Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8 font-mono text-[11px] tracking-widest text-[#596170] flex items-center space-x-3"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#78AFFF] animate-ping" />
            <span>SYS_COORD // 28.6139° N, 77.2090° E</span>
            <span>·</span>
            <span>BOOT_SEQUENCE_2026</span>
          </motion.div>

          {/* Core Name Reveal */}
          <div className="relative overflow-hidden mb-6">
            <motion.h1
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-[#F5F7FA]"
            >
              ANKIT KUMAR
            </motion.h1>
          </div>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="font-mono text-xs text-[#9BA4B2] tracking-wider mb-8"
          >
            ENGINEERING × AI SYSTEMS ARCHITECTURE
          </motion.p>

          {/* Luminous Expanding Line */}
          <div className="relative w-64 md:w-80 h-[2px] bg-[#10141B] overflow-hidden rounded-full">
            <motion.div
              className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#78AFFF] via-[#B7D7FF] to-[#38BDF8] shadow-[0_0_12px_#78AFFF]"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut' }}
            />
          </div>

          {/* Percentage */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 font-mono text-xs text-[#596170]"
          >
            {progress}% INITIALIZED
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
