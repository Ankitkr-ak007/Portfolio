import React from 'react';
import { motion } from 'motion/react';
import { motionTokens } from './tokens';

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  variant?: 'word' | 'blur' | 'slideUp';
}

export const TextReveal: React.FC<TextRevealProps> = ({
  children,
  className = '',
  delay = 0,
  variant = 'word',
}) => {
  const words = children.split(' ');

  if (variant === 'blur') {
    return (
      <motion.span
        initial={{ opacity: 0, filter: 'blur(8px)', y: 10 }}
        whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: motionTokens.duration.normal, delay, ease: motionTokens.ease.outExpo }}
        className={`inline-block ${className}`}
      >
        {children}
      </motion.span>
    );
  }

  return (
    <span className={`inline-flex flex-wrap gap-x-[0.3em] ${className}`}>
      {words.map((word, idx) => (
        <span key={idx} className="overflow-hidden inline-block py-[0.1em]">
          <motion.span
            initial={{ y: '100%', opacity: 0 }}
            whileInView={{ y: '0%', opacity: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
              duration: motionTokens.duration.normal,
              delay: delay + idx * motionTokens.stagger.fast,
              ease: motionTokens.ease.outExpo,
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
};
