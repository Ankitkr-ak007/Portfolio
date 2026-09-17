/**
 * Reusable Motion Tokens for Level-1000 Engineering Architecture
 * Powered by motion/react
 */

export const motionTokens = {
  // Spring Physics Configurations
  spring: {
    snappy: { type: 'spring' as const, stiffness: 400, damping: 28, mass: 0.6 },
    default: { type: 'spring' as const, stiffness: 320, damping: 28, mass: 0.8 },
    gentle: { type: 'spring' as const, stiffness: 180, damping: 24, mass: 1.0 },
    bouncy: { type: 'spring' as const, stiffness: 500, damping: 18, mass: 0.5 },
  },

  // Standard Timing Durations (seconds)
  duration: {
    instant: 0.1,
    fast: 0.25,
    normal: 0.45,
    slow: 0.75,
    cinematic: 1.2,
  },

  // Cubic-Bezier Easing Presets
  ease: {
    outExpo: [0.16, 1, 0.3, 1] as const,
    inOutExpo: [0.87, 0, 0.13, 1] as const,
    outQuart: [0.25, 1, 0.5, 1] as const,
    inOutQuart: [0.76, 0, 0.24, 1] as const,
  },

  // Stagger Presets
  stagger: {
    fast: 0.04,
    normal: 0.08,
    slow: 0.15,
  },
};
