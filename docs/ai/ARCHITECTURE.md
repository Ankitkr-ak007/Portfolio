# APPLICATION & 3D ARCHITECTURE

<!-- BEGIN HUMAN -->
## 1. COMPONENT & SECTION HIERARCHY
```text
src/main.tsx
  ↓
src/App.tsx (Global Lenis Controller & Custom Cursor)
  ↓
├── Navigation Bar (Header & Quick Jump)
├── Hero Section (SystemsCoreCanvas WebGL 3D Core + Fallback)
├── AI Philosophy Banner
├── System Topology DAG (Interactive Node Explorer)
├── Selected Work (Project Grid + Case Study Modal)
├── Interactive Lab (4-Sandbox Experiment Suite)
├── Skill Constellation (Filterable Tech Matrix)
├── Contact Section
└── Developer Tools (CommandPalette & Terminal Overlay)
```

## 2. 3D WEBGL ARCHITECTURE
* **Canvas Component**: `SystemsCoreCanvas.tsx`
* **Scene Component**: `SystemsCoreScene.tsx`
* **Fallback Component**: `FallbackScene.tsx` (Pure CSS 3D fallback for low-end / non-WebGL devices)
* **Error Boundary**: `WebGLErrorBoundary` catches WebGL context losses gracefully.
* **Frame Accumulator**: Custom time accumulator (`timeRef.current += delta`) replaces deprecated `THREE.Clock`.
* **Resource Cleanup**: Geometries and materials explicitly instantiated and disposed upon unmount.

## 3. OVERLAY & SCROLL CONTROLLER ARCHITECTURE
* **Lenis Smooth Scroll**: Controller in `src/lib/lenis.ts` (`pauseLenis()`, `resumeLenis()`).
* **Reference-Counted Lock**: `useBodyScrollLock.ts` manages body scroll locks dynamically across overlapping modals, command palettes, and terminal windows.
* **Scroll Boundary Isolation**: All overlay containers enforce `data-lenis-prevent="true"`, `overscroll-contain`, and `max-h-[100dvh]`.

## 4. LAB SANDBOX SUITE ARCHITECTURE
* **Lab 1**: Sub-Agent Graph Execution Trace
* **Lab 2**: Rust Borrow Checker Lifetime Simulator
* **Lab 3**: High-Frequency 60fps Canvas Wave Stream
* **Lab 4**: Self-Healing Schema Repair Loop
<!-- END HUMAN -->
