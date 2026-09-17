import type { Variants } from 'motion/react';
import { motionTokens } from './motionTokens';

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: motionTokens.duration.normal,
      ease: motionTokens.ease.outExpo,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: motionTokens.duration.fast,
    },
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: motionTokens.duration.normal,
      ease: motionTokens.ease.outExpo,
    },
  },
  exit: {
    opacity: 0,
    y: -16,
    transition: {
      duration: motionTokens.duration.fast,
    },
  },
};

export const blurReveal: Variants = {
  hidden: { opacity: 0, filter: 'blur(12px)', y: 16 },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: {
      duration: motionTokens.duration.slow,
      ease: motionTokens.ease.outExpo,
    },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 26,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    transition: {
      duration: motionTokens.duration.fast,
    },
  },
};

export const maskReveal: Variants = {
  hidden: { clipPath: 'inset(100% 0% 0% 0%)' },
  visible: {
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: {
      duration: motionTokens.duration.slow,
      ease: motionTokens.ease.outExpo,
    },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: motionTokens.stagger.normal,
      delayChildren: 0.1,
    },
  },
};

export const signalDraw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 1.6,
      ease: motionTokens.ease.inOutExpo,
    },
  },
};
