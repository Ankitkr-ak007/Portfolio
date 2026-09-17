import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';
import type { CursorState } from '../../hooks/useCustomCursor';

interface CustomCursorProps {
  cursorState: CursorState;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ cursorState }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  // High performance motion values
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 320, mass: 0.5 };
  const smoothX = useSpring(rawX, springConfig);
  const smoothY = useSpring(rawY, springConfig);

  useEffect(() => {
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isTouchDevice, isVisible, rawX, rawY]);

  if (isTouchDevice || cursorState.variant === 'hidden' || !isVisible) return null;

  const isProject = cursorState.variant === 'project';
  const isButton = cursorState.variant === 'button';

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      {/* Primary Glowing Dot (Instant transform) */}
      <motion.div
        className="fixed left-0 top-0 h-2 w-2 rounded-full bg-[#78AFFF] shadow-[0_0_10px_#78AFFF]"
        style={{
          x: rawX,
          y: rawY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Outer Ring / Interactive Label Bubble (Spring physics) */}
      <motion.div
        className={`fixed left-0 top-0 flex items-center justify-center rounded-full border border-[rgba(120,175,255,0.4)] backdrop-blur-[2px] transition-all duration-200 ${
          isProject
            ? 'h-24 w-24 bg-[rgba(10,13,18,0.88)] border-[#78AFFF] shadow-[0_0_25px_rgba(120,175,255,0.35)]'
            : isButton
            ? 'h-14 w-14 bg-[rgba(120,175,255,0.15)] border-[#78AFFF]'
            : cursorState.isHovered
            ? 'h-12 w-12 bg-[rgba(120,175,255,0.08)] border-[#78AFFF]'
            : 'h-8 w-8 bg-transparent'
        }`}
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        {cursorState.label && (
          <span className="text-[10px] font-mono tracking-wider font-bold text-[#B7D7FF] uppercase px-2 text-center select-none">
            {cursorState.label}
          </span>
        )}
      </motion.div>
    </div>
  );
};
