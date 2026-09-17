import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 35,
    restDelta: 0.001,
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[60] pointer-events-none bg-transparent">
      {/* Background track indicator */}
      <div className="absolute inset-0 bg-white/[0.04]" />
      
      {/* Active Glowing Indicator */}
      <motion.div
        style={{ scaleX }}
        className="h-full bg-gradient-to-r from-[#78AFFF] via-[#B7D7FF] to-[#38BDF8] shadow-[0_0_8px_#78AFFF] origin-left"
      />
    </div>
  );
};
