import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export const EditorialIntro: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.4'],
  });

  const text = "I'm interested in the layer where software stops being a collection of features and becomes a resilient, deterministic system.";
  const words = text.split(' ');

  return (
    <section ref={containerRef} className="py-28 px-6 md:px-12 bg-[#050609] relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="font-mono text-xs text-[#78AFFF] uppercase tracking-widest mb-6 flex items-center space-x-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#78AFFF]" />
          <span>CORE PHILOSOPHY // 01</span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-snug flex flex-wrap gap-x-3 gap-y-2">
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            // Word opacity interpolation
            const opacity = useTransform(scrollYProgress, [start, end], [0.25, 1]);
            const color = useTransform(scrollYProgress, [start, end], ['#596170', '#F5F7FA']);

            return (
              <motion.span
                key={i}
                style={{ opacity, color }}
                className="transition-colors duration-200"
              >
                {word}
              </motion.span>
            );
          })}
        </h2>
      </div>
    </section>
  );
};
