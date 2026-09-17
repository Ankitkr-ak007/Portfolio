# KNOWN & RESOLVED ISSUES LOG

<!-- BEGIN HUMAN -->
## ISSUE-001: Modal Content Mouse Wheel Background Scroll Leak
* **Status**: RESOLVED
* **Severity**: HIGH
* **Component**: Overlay / Modal System (`useBodyScrollLock.ts`, `src/lib/lenis.ts`)
* **Description**: Mouse wheel over open modal container scrolled background window instead of modal content.
* **Fix**: Implemented reference-counted Lenis pause/resume controller and `data-lenis-prevent="true"` attribute.
* **Related Commit**: `1c2fbf4`

## ISSUE-002: THREE.Clock Deprecation Warning in WebGL Scene Init
* **Status**: RESOLVED
* **Severity**: MEDIUM
* **Component**: `SystemsCoreScene.tsx`, `suppressThreeWarnings.ts`
* **Description**: Three.js r186 emitted deprecation warning for `THREE.Clock`.
* **Fix**: Replaced Drei Float with custom frame accumulator and added top-level console warning interceptor.
* **Related Commit**: `2443b40`
<!-- END HUMAN -->
