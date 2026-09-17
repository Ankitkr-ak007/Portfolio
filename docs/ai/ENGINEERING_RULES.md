# ENGINEERING RULES & QUALITY GUIDELINES

<!-- BEGIN HUMAN -->
## 1. REACT 19 & TYPESCRIPT
* Write functional React 19 components with explicit TypeScript interfaces.
* Avoid `any` types or unsafe `as` casts unless explicitly justified.
* Maintain clean hook dependencies.

## 2. 3D & PERFORMANCE
* Always clean up WebGL materials and geometries.
* Avoid instantiating `THREE.Clock` to prevent deprecation warnings.
* Keep Canvas particle budgets responsive based on device DPR.

## 3. SCROLL LOCK & OVERLAY UX
* Use `useBodyScrollLock` hook for all modals and command palettes.
* Set `data-lenis-prevent="true"` and `overscroll-contain` on scrollable overlay nodes.

## 4. ACCESSIBILITY & REDUCED MOTION
* Check `prefers-reduced-motion: reduce` in animation components.
* Ensure full keyboard accessibility (`Enter`, `Space`, `Esc`, `Tab`).
<!-- END HUMAN -->
