# ARCHITECTURE DECISION RECORDS (ADR)

<!-- BEGIN HUMAN -->
## ADR-001: Unified Motion Library & Lenis Scroll Controller
* **Status**: ACCEPTED
* **Date**: 2026-09-17
* **Decision**: Adopt Motion (Framer Motion v13) alongside Lenis for smooth window scrolling.
* **Context**: Mixing legacy animation frameworks caused scroll locking glitches.
* **Consequences**: Centralized scroll lock control and hardware-accelerated animations.

## ADR-002: THREE.Clock Deprecation Interception & Frame Delta Accumulation
* **Status**: ACCEPTED
* **Date**: 2026-09-17
* **Decision**: Replaced Drei `<Float>` with frame accumulator (`useFrame((_, delta) => timeRef.current += delta)`). Added top-level console interceptor in `src/lib/suppressThreeWarnings.ts`.
* **Context**: Three.js r186 deprecated `THREE.Clock` triggering console warnings.
* **Consequences**: Zero console warnings during WebGL scene render.

## ADR-003: Reference-Counted Scroll Lock System
* **Status**: ACCEPTED
* **Date**: 2026-09-17
* **Decision**: Created `useBodyScrollLock.ts` and `src/lib/lenis.ts` reference counter.
* **Context**: Opening nested modals captured window wheel scroll instead of modal content.
* **Consequences**: Background page stays stationary when any modal, terminal, or command palette is open.
<!-- END HUMAN -->
