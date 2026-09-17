import { useScroll, useTransform, useSpring, useMotionValue, useReducedMotion } from 'motion/react';

/**
 * Hook for smooth spring-driven scroll progress
 */
export function useSmoothScrollProgress() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  return { scrollYProgress, smoothProgress };
}

/**
 * Hook for component-level parallax displacement
 */
export function useParallax(value: ReturnType<typeof useScroll>['scrollYProgress'], distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

/**
 * Hook for smooth spring cursor coordinates
 */
export function useCursorCoordinates() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springX = useSpring(mouseX, { stiffness: 450, damping: 32, mass: 0.4 });
  const springY = useSpring(mouseY, { stiffness: 450, damping: 32, mass: 0.4 });

  return { mouseX, mouseY, springX, springY };
}

export { useScroll, useTransform, useSpring, useMotionValue, useReducedMotion };
