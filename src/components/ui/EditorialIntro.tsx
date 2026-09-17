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
  const opacity = useTransform(progress, [start, end], [0.2, 1]);
  const color = useTransform(progress, [start, end], ['#475569', '#F8FAFC']);

  return (
    <motion.span style={{ opacity, color }} className="transition-colors duration-200">
      {word}
    </motion.span>
  );
};

export const EditorialIntro: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.35'],
  });

  const statement = "I DON'T JUST BUILD INTERFACES. I BUILD SYSTEMS.";
  const supporting = "Engineering the layer where software ceases to be a collection of isolated features and becomes a deterministic, observable, and resilient architecture.";
  const words = supporting.split(' ');

  return (
    <section ref={containerRef} className="py-28 px-6 md:px-12 bg-[#030407] relative overflow-hidden">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Section Label */}
        <div className="font-mono text-xs text-[#78AFFF] uppercase tracking-widest flex items-center space-x-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#78AFFF] animate-ping" />
          <span>IDENTITY // 01</span>
        </div>

        {/* Big Bold Statement */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight uppercase text-[#F8FAFC]"
        >
          {statement}
        </motion.h2>

        {/* Scroll-Linked Word Reveal Supporting Paragraph */}
        <p className="text-xl sm:text-3xl lg:text-4xl font-semibold tracking-tight leading-relaxed flex flex-wrap gap-x-2.5 gap-y-1.5 pt-4">
          {words.map((word, i) => (
            <WordSpan
              key={i}
              word={word}
              progress={scrollYProgress}
              index={i}
              total={words.length}
            />
          ))}
        </p>
      </div>
    </section>
  );
};
