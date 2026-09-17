import { useEffect } from 'react';
import { pauseLenis, resumeLenis } from '../lib/lenis';

let activeLocksCount = 0;
let savedScrollY = 0;

export function useBodyScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (!isLocked) return;

    if (activeLocksCount === 0) {
      savedScrollY = window.scrollY;
      pauseLenis();

      document.documentElement.style.overflow = 'hidden';
      document.documentElement.style.scrollbarGutter = 'stable';
      document.body.style.overflow = 'hidden';
    }

    activeLocksCount++;

    return () => {
      activeLocksCount = Math.max(0, activeLocksCount - 1);

      if (activeLocksCount === 0) {
        document.documentElement.style.overflow = '';
        document.documentElement.style.scrollbarGutter = '';
        document.body.style.overflow = '';

        resumeLenis();
        window.scrollTo(0, savedScrollY);
      }
    };
  }, [isLocked]);
}
