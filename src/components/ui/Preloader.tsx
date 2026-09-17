import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const shouldReduceMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === 'undefined') return true;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return false;
    return !sessionStorage.getItem('ak_portfolio_intro_seen');
  });

  useEffect(() => {
    if (!isVisible) {
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
          }, 250);
          return 100;
        }
        return prev + 6;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [isVisible, onComplete, shouldReduceMotion]);

  if (shouldReduceMotion) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#030407] text-[#F8FAFC] select-none"
          role="status"
          aria-live="polite"
          aria-label="Loading systems interface"
        >
          {/* Grid Background */}
          <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none" />

          {/* Coordinates Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8 font-mono text-[11px] tracking-widest text-[#475569] flex items-center space-x-3"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#78AFFF] animate-ping" />
            <span>SYS_INIT // 2026</span>
            <span>·</span>
            <span>KALKI_VISION_CORE</span>
          </motion.div>

          {/* Core Name Reveal */}
          <div className="relative overflow-hidden mb-6">
            <motion.h1
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-[#F8FAFC]"
            >
              ANKIT KUMAR
            </motion.h1>
          </div>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="font-mono text-xs text-[#94A3B8] tracking-wider mb-8"
          >
            ENGINEERING × AI SYSTEMS ARCHITECTURE
          </motion.p>

          {/* Luminous Expanding Line */}
          <div className="relative w-64 md:w-80 h-[2px] bg-[#10141E] overflow-hidden rounded-full">
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
            className="mt-4 font-mono text-xs text-[#475569]"
          >
            {progress}% INITIALIZED
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
