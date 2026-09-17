import type { Transition } from 'motion/react';
import { motionTokens } from './motionTokens';

export const springTransition: Transition = {
  ...motionTokens.spring.default,
};

export const snappyTransition: Transition = {
  ...motionTokens.spring.snappy,
};

export const gentleTransition: Transition = {
  ...motionTokens.spring.gentle,
};

export const pageTransition: Transition = {
  duration: motionTokens.duration.normal,
  ease: motionTokens.ease.outExpo,
};

export const projectTransition: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
  mass: 0.8,
};

export const signalDrawTransition: Transition = {
  duration: 1.8,
  ease: motionTokens.ease.inOutExpo,
};
