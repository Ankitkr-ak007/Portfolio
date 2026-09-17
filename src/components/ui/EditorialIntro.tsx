import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'motion/react';

interface WordSpanProps {
  word: string;
  progress: MotionValue<number>;
  index: number;
  total: number;
}

const WordSpan: React.FC<WordSpanProps> = ({ word, progress, index, total }) => {
  const start = index / total;
  const end = start + 1 / total;
  const opacity = useTransform(progress, [start, end], [0.25, 1]);
  const color = useTransform(progress, [start, end], ['#475569', '#F8FAFC']);

  return (
    <motion.span style={{ opacity, color }} className="transition-colors duration-150">
      {word}
    </motion.span>
  );
};

export const EditorialIntro: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.85', 'end 0.4'],
  });

  const supporting = "I’m interested in the layer where software stops being a collection of features and becomes a system.";
  const words = supporting.split(' ');

  return (
    <section id="intro" ref={containerRef} className="py-32 px-6 md:px-12 bg-[#030407] relative overflow-hidden border-b border-[rgba(255,255,255,0.06)]">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Section Label */}
        <div className="font-mono text-xs text-[#78AFFF] uppercase tracking-widest flex items-center space-x-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#78AFFF] animate-ping" />
          <span>INTRODUCTION // 02</span>
        </div>

        {/* Big Bold Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-2"
        >
          <h2 className="text-3xl sm:text-5xl lg:text-7xl font-black tracking-tight leading-[1.05] uppercase text-[#F8FAFC]">
            I DON'T JUST BUILD INTERFACES. <br />
            <span className="text-[#78AFFF]">I BUILD SYSTEMS.</span>
          </h2>
        </motion.div>

        {/* Scroll-Linked Word Reveal Supporting Paragraph */}
        <div className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-snug flex flex-wrap gap-x-3 gap-y-2 pt-4">
          {words.map((word, i) => (
            <WordSpan
              key={i}
              word={word}
              progress={scrollYProgress}
              index={i}
              total={words.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
