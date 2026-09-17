import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

interface CustomCursorProps {
  cursorState: {
    x: number;
    y: number;
    isHovered: boolean;
    label: string;
    variant: 'default' | 'project' | 'button' | 'link' | 'hidden';
  };
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ cursorState }) => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Smooth springs for outer ring
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Detect touch screens
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
    }
  }, []);

  useEffect(() => {
    cursorX.set(cursorState.x);
    cursorY.set(cursorState.y);
  }, [cursorState.x, cursorState.y, cursorX, cursorY]);

  if (isTouchDevice || cursorState.variant === 'hidden') return null;

  const isProject = cursorState.variant === 'project';
  const isButton = cursorState.variant === 'button';

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Primary Dot */}
      <div
        className="fixed left-0 top-0 h-2 w-2 rounded-full bg-[#78AFFF] transition-opacity duration-300 shadow-[0_0_10px_#78AFFF]"
        style={{
          transform: `translate3d(${cursorState.x - 4}px, ${cursorState.y - 4}px, 0)`,
          opacity: cursorState.x < 0 ? 0 : 1,
        }}
      />

      {/* Outer Ring / Label Bubble */}
      <motion.div
        className={`fixed left-0 top-0 flex items-center justify-center rounded-full border border-[rgba(120,175,255,0.4)] backdrop-blur-[2px] transition-all duration-200 ${
          isProject
            ? 'h-24 w-24 bg-[rgba(10,13,18,0.85)] border-[#78AFFF] shadow-[0_0_20px_rgba(120,175,255,0.3)]'
            : isButton
            ? 'h-14 w-14 bg-[rgba(120,175,255,0.15)] border-[#78AFFF]'
            : cursorState.isHovered
            ? 'h-12 w-12 bg-[rgba(120,175,255,0.08)] border-[#78AFFF]'
            : 'h-8 w-8 bg-transparent'
        }`}
        style={{
          x: smoothX,
          y: smoothY,
          translateX: isProject ? '-50%' : isButton ? '-50%' : cursorState.isHovered ? '-50%' : '-50%',
          translateY: isProject ? '-50%' : isButton ? '-50%' : cursorState.isHovered ? '-50%' : '-50%',
          opacity: cursorState.x < 0 ? 0 : 1,
        }}
      >
        {cursorState.label && (
          <span className="text-[10px] font-mono tracking-wider font-semibold text-[#B7D7FF] uppercase px-2 text-center">
            {cursorState.label}
          </span>
        )}
      </motion.div>
    </div>
  );
};
