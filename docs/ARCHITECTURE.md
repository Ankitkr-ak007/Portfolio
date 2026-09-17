# System Architecture Specification

## 1. Architectural Philosophy

The architecture of Ankit Kumar's portfolio is engineered around the principle:
> **"10% Spectacle, 90% Precision."**

Every visual element, 3D shader, and layout transition directly communicates systems engineering principles rather than serving as ungrounded decorative flair.

---

## 2. High-Level System Topology

```text
USER INTERACTION
  │
  ├── Pointer / Touch Events ──► useCustomCursor (Ref-based, zero React re-render lag)
  ├── Keyboard Navigation   ──► Global Shortcuts (⌘K / Ctrl+K, ⌘` / Ctrl+`, Escape)
  └── Viewport Scroll        ──► Lenis Smooth Scroll Engine (Virtual Scroll Normalization)
        │
        ▼
COMPONENT HIERARCHY
  │
  ├── 01. SYSTEMS CORE (Hero) ────► Single R3F WebGL Canvas + GLSL Fresnel Shaders + ErrorBoundary
  ├── 02. MANIFESTO (Intro)   ────► Scroll-linked Word Luminance Transform (useScroll)
  ├── 03. MATRIX (Skills)     ────► Relational Node Graph with Connected Edge Highlighting
  ├── 04. SELECTED WORK       ────► Holographic SVG/CSS 3D Archive -> Shared-Element Modal
  ├── 05. PRINCIPLES          ────► Accordion Flow Schemas (Strict Types & State Machine)
  ├── 06. ARCHITECTURE        ────► Horizontal Process Pipeline (Sticky Viewport Translation)
  ├── 07. AI LAB (Sandboxes)  ────► 4 Interactive Isolated Sandboxes (Graph, Rust, Canvas, Zod)
  ├── 08. EXPERIENCE          ────► Verified Career & Google Gemini Ambassador Milestones
  ├── 09. ABOUT               ────► Bio, Interactive Tech Badge, Verified Credentials
  ├── 10. EDITORIAL WRITING   ────► Systems Analysis & Interactive Code Comparison Window
  ├── 11. CONTACT             ────► Direct Mailto Action, One-Click Clipboard Copy, Socials
  └── 12. FOOTER              ────► Luminous Signal Termination Line & Back-to-Top Action
```

---

## 3. WebGL & 3D Systems Core Architecture (`src/3d/`)

### 3.1 Single-Canvas Context Management
A major risk in multi-canvas WebGL implementations is browser context loss (`THREE.WebGLRenderer: Context Lost.`). To eliminate this permanently:
- **Hero Canvas Only**: The root page hosts exactly **one active WebGL canvas** in the Hero ([`SystemsCoreCanvas.tsx`](file:///C:/Users/Ankit%20Kumar/Portfolio/src/3d/SystemsCore/SystemsCoreCanvas.tsx)).
- **Archive Visuals**: Project cards in the archive list use zero WebGL contexts; they are rendered with lightweight GPU-accelerated CSS 3D and SVG holographic transforms ([`ProjectCardVisual.tsx`](file:///C:/Users/Ankit%20Kumar/Portfolio/src/components/projects/ProjectCardVisual.tsx)).
- **Modal Viewers**: The 3D inspector in [`CaseStudyModal.tsx`](file:///C:/Users/Ankit%20Kumar/Portfolio/src/components/projects/CaseStudyModal.tsx) mounts on-demand only when a modal is opened, cleanly disposing geometries and materials upon exit.

### 3.2 WebGL Error Boundary & Graceful Degradation
- All 3D scenes are encapsulated in [`WebGLErrorBoundary.tsx`](file:///C:/Users/Ankit%20Kumar/Portfolio/src/3d/fallbacks/WebGLErrorBoundary.tsx) and pre-screened with [`webglSupport.ts`](file:///C:/Users/Ankit%20Kumar/Portfolio/src/3d/utils/webglSupport.ts).
- If WebGL 2.0 is disabled or fails on low-end hardware, the system seamlessly degrades to an accessible 2D holographic fallback ([`FallbackScene.tsx`](file:///C:/Users/Ankit%20Kumar/Portfolio/src/3d/fallbacks/FallbackScene.tsx)).

### 3.3 Shader Subsystem (`src/3d/shaders/`)
- **Fresnel Shader** (`fresnel.ts`): Procedural rim-light interference highlighting normal grazing angles.
- **Signal Flow Shader** (`signalFlow.ts`): Mathematical pulse traveling along orbital pathways representing token transmission.
- **Procedural Noise** (`noise.ts`): High-frequency simplex noise generating atmospheric surface shifts.

---

## 4. Overlay & Modal Scroll Isolation Architecture (`src/overlays/`)

### 4.1 Problem Addressed
Standard web modals frequently suffer from **scroll chaining** and **layout jumping**: scrolling over an opened modal causes the background document to scroll, and removing scrollbars causes the layout to jump horizontally.

### 4.2 Solution Implementation
The dedicated [`src/overlays/`](file:///C:/Users/Ankit%20Kumar/Portfolio/src/overlays/) module guarantees:
1. **Lenis Suspension**: When an overlay opens, `pauseLenis()` immediately suspends the virtual smooth scrolling engine.
2. **Scrollbar Compensation**: `useScrollLock.ts` measures the scrollbar width (`window.innerWidth - clientWidth`) and applies exact padding to `document.body`, preventing layout shift.
3. **Document Lock**: `document.documentElement` and `document.body` are locked (`overflow: hidden; touch-action: none;`).
4. **Single Scroll Surface**: Content is wrapped in [`OverlayScrollArea.tsx`](file:///C:/Users/Ankit%20Kumar/Portfolio/src/overlays/OverlayScrollArea.tsx) with:
   ```css
   overscroll-behavior: contain;
   data-lenis-prevent="true";
   ```
5. **Exact Restoration**: When the overlay unmounts, `resumeLenis()` fires and `window.scrollTo(0, savedScrollY)` restores the exact viewport coordinates.

---

## 5. Motion Token Architecture (`src/motion/`)

All animation parameters are governed by centralized tokens to guarantee cohesive physical weight and avoid arbitrary ad-hoc durations:

- **Spring Physics (`motionTokens.ts`)**:
  - `snappy`: `{ stiffness: 400, damping: 28 }` (Buttons, micro-interactions)
  - `smooth`: `{ stiffness: 260, damping: 20 }` (Cards, dialogs)
  - `deliberate`: `{ stiffness: 140, damping: 18 }` (Section reveals)
  - `floating`: `{ stiffness: 50, damping: 10 }` (3D hover parallax)
- **Bezier Easing Curves**:
  - `editorial`: `[0.16, 1, 0.3, 1]` (High-end editorial reveals)
  - `powerOut`: `[0.22, 1, 0.36, 1]` (Modal entrances)
- **Accessibility**: All variants automatically evaluate `useReducedMotion()`. If reduced motion is requested by the OS, duration drops to `0.01s` and transforms are flattened to opacity-only fades.

---

## 6. Centralized Data Architecture (`src/data/`)

All site content is strictly typed and decoupled from presentation components:
- **`projects.ts`**: Complete case study structures enforcing 11 required sections.
- **`principles.ts`**: Engineering tenets with validation flows.
- **`skills.ts`**: 12 categorized technology nodes with bidirectional connection IDs.
- **`experience.ts`**: Chronological career roles with highlight achievements.
- **`labExperiments.ts`**: Sandbox metadata and tech tags.
- **`thoughts.ts`**: Technical publications and read-time estimates.
- **`metadata.ts`**: Site-wide configuration, author identity, and verified URLs.
