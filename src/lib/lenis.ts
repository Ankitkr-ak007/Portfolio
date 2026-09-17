import Lenis from 'lenis';

let globalLenis: Lenis | null = null;

export function setGlobalLenis(instance: Lenis | null) {
  globalLenis = instance;
}

export function getGlobalLenis(): Lenis | null {
  return globalLenis;
}

export function pauseLenis() {
  if (globalLenis) {
    globalLenis.stop();
  }
}

export function resumeLenis() {
  if (globalLenis) {
    globalLenis.start();
  }
}
