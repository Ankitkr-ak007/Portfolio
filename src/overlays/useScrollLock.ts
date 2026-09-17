import { useEffect } from 'react';
import { pauseLenis, resumeLenis } from '../lib/lenis';

let activeLocksCount = 0;
let savedScrollY = 0;

/**
 * Robust scroll lock hook for modal dialogs and fullscreen overlays
 * Suspends Lenis, locks root scrolling, and prevents scrollbar layout shift
 */
export function useScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (!isLocked) return;

    if (activeLocksCount === 0) {
      savedScrollY = window.scrollY;
      pauseLenis();

      // Measure scrollbar width to prevent layout jump
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }

      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    }

    activeLocksCount++;

    return () => {
      activeLocksCount = Math.max(0, activeLocksCount - 1);

      if (activeLocksCount === 0) {
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
        document.body.style.touchAction = '';

        resumeLenis();
        window.scrollTo(0, savedScrollY);
      }
    };
  }, [isLocked]);
}
