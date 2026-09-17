# FRONTEND INSTRUCTIONS

1. Use React 19 functional components with TypeScript interfaces.
2. Animate with `motion` (Framer Motion v13). Prefer hardware-accelerated properties (`transform`, `opacity`).
3. For modal/overlay components, integrate `useBodyScrollLock` and set `data-lenis-prevent="true"` on scrollable containers.
4. Enforce strict keyboard accessibility (`Enter`, `Space`, `Escape`, `Tab` focus loops).
