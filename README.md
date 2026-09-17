# Ankit Kumar — Engineering × AI Portfolio

> **High-Throughput Systems, Multi-Agent Architectures & Immersive Deterministic Web Applications**

[![CI Pipeline](https://github.com/Ankitkr-ak007/Portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/Ankitkr-ak007/Portfolio/actions/workflows/ci.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.x-61dafb?logo=react)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-r186-black?logo=three.js)](https://threejs.org/)
[![Vitest](https://img.shields.io/badge/Vitest-5.x-yellow?logo=vitest)](https://vitest.dev/)
[![Playwright](https://img.shields.io/badge/Playwright-E2E-green?logo=playwright)](https://playwright.dev/)

---

## 🏛️ Executive Summary

This repository houses the personal engineering portfolio and systems showcase for **Ankit Kumar** — B.Tech Student, Full-Stack Software Engineer, C++/Rust Developer, AI Systems Builder, and **Google Gemini Student Ambassador 2026**.

Built strictly following the **Level-1000 Engineering Control Center** architectural specifications (Parts 1–18), the website embodies the philosophy:
> *"10% Spectacle, 90% Precision: Architecture > Prompting, Validation > Blind Trust, Determinism > Accidental Behavior."*

---

## ⚡ Core Highlights & Signature "WOW" Moments

1. **WOW 01: Systems Core (Hero 3D Visualizer)**
   - Custom procedural Three.js / React Three Fiber scene with Fresnel interference shaders, dynamic orbit rings, signal packet emitters, and real-time GPU data particle streams.
   - Built with single-canvas lifecycle management, controlled DPR scaling (`[1, 1.5]`), and automated WebGL crash boundary fallbacks.

2. **WOW 02: Shared-Element Project Architecture Transitions**
   - Vertical editorial archive featuring holographic SVG/CSS 3D preview cards.
   - Fluid `layoutId` modal expansion into exhaustive **11-section deep architectural case studies** (`role`, `overview`, `problem`, `approach`, `system`, `architecture`, `decisions`, `technologies`, `challenges`, `outcomes`, `learnings`).

3. **WOW 03: Architecture & Process Visualizer**
   - Sticky scroll horizontal systems pipeline demonstrating deterministic software deployment (`THINK`, `BUILD`, `BREAK`, `VALIDATE`, `SHIP`).
   - Interactive Sub-Agent Topology DAG with live packet dispatch and schema-repair observability.

4. **Interactive AI Lab Sandboxes**
   - **Agent Topology & Signal Flow**: Live SVG packet simulation.
   - **Rust Borrow Checker Visualizer**: Interactive stack vs. heap borrowing & scope lifetime mechanics.
   - **Procedural Canvas Stream**: 60fps trigonometric particle vector field.
   - **Deterministic Schema Repair Loop**: Self-healing Zod validation demonstration.

5. **Command Palette (`⌘K` / `Ctrl+K`) & Interactive Terminal (`~ zsh`)**
   - Full keyboard-driven command dispatcher and UNIX CLI shell with command history, tab focus trapping, and zero background scroll leakage.

6. **Overlay Scroll Isolation Architecture (`src/overlays/`)**
   - Robust modal scroll isolation: suspensions of Lenis smooth scroll engine (`pauseLenis()`), locked body overflow with layout-shift compensation, strict `overscroll-behavior: contain`, and full keyboard navigation.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Core Framework** | React 19, TypeScript, Vite 8 |
| **Styling & Design** | Tailwind CSS v4, Custom Design Tokens, CSS Custom Properties |
| **3D & Shaders** | Three.js (r186), React Three Fiber (v9), @react-three/drei, GLSL Shaders |
| **Animation & Motion** | Motion (`motion/react` v13), Lenis Smooth Scroll Engine |
| **Validation & State** | Zod (v4), Native React State Hooks, Strict Contract Types |
| **Icons & Brand** | Lucide React, Verified Custom SVG Tech Vectors |
| **Unit & Integration** | Vitest, React Testing Library, `@testing-library/jest-dom`, `jsdom` |
| **End-to-End & Audits** | Playwright, `@axe-core/playwright` (WCAG AA), Lighthouse CI |
| **CI / CD & Hosting** | GitHub Actions, Vercel SPA Hosting |

---

## 📂 Project Structure

```text
src/
├── 3d/                     # Modular Three.js & R3F systems
│   ├── SystemsCore/        # Hero 3D Core, OrbitRings, SignalNodes, DataParticles
│   ├── fallbacks/          # WebGLErrorBoundary, FallbackScene
│   ├── materials/          # Shared PBR material palette
│   ├── shaders/            # Custom GLSL shaders (fresnel, noise, signalFlow)
│   └── utils/              # WebGL support detector and memory helpers
├── components/
│   ├── about/              # Bio, portrait module, distinction cards
│   ├── contact/            # Direct inbox, mailto action, copy action, socials
│   ├── engineering/        # HowIThink principles, TechConstellation graph, HorizontalProcess
│   ├── experience/         # Factual career timeline, Google Ambassador milestones
│   ├── hero/               # Hero headline, telemetry badges, CTA triggers
│   ├── insight/            # Editorial philosophy & comparison tables
│   ├── lab/                # Interactive sandboxes (Agent Graph, Rust, Canvas, Zod)
│   ├── layout/             # Header, Footer, CustomCursor, Navigation
│   ├── motion/             # ScrollProgress, Magnetic button wrapper
│   ├── projects/           # SelectedWork archive, CaseStudyModal, ProjectCardVisual
│   └── ui/                 # Preloader, CommandPalette, Terminal CLI, BrandIcons
├── data/                   # Strictly typed, centralized data models
│   ├── experience.ts       # Authentic career milestones
│   ├── labExperiments.ts   # Lab sandboxes dataset
│   ├── metadata.ts         # Author identity, links, and navigation
│   ├── principles.ts       # Engineering principles & flows
│   ├── projects.ts         # 11-section deep architectural case studies
│   ├── skills.ts           # Interconnected tech nodes & graph edges
│   └── thoughts.ts         # Technical articles and insights
├── hooks/                  # Custom React hooks (useLenis, useCustomCursor)
├── lib/                    # Lenis controller, class merger (cn), suppression utils
├── motion/                 # Motion tokens, springs, bezier curves, reduced-motion hooks
├── overlays/               # ModalShell, OverlayScrollArea, useScrollLock, useOverlayNavigation
├── styles/                 # Design tokens (colors, typography, elevation, spacing)
└── test/                   # Vitest setup, matchers, and DOM polyfills
```

---

## 🚀 Local Development Setup

### Prerequisites
- **Node.js**: `v20.x` or `v22.x` (Recommended: `v22.x`)
- **npm**: `v10.x` or higher

### 1. Clone & Install
```bash
git clone https://github.com/Ankitkr-ak007/Portfolio.git
cd Portfolio
npm ci
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```
Open [http://localhost:4173](http://localhost:4173).

---

## 🧪 Testing Suite Execution

### 1. Static Analysis & Type Verification
```bash
npm run lint         # Runs oxlint (0 errors, 0 warnings)
npm run typecheck    # Runs tsc --noEmit strict type checking
```

### 2. Unit & Integration Tests (Vitest)
```bash
npm run test:unit    # Runs 25 in-memory unit tests (100% green in ~2.5s)
npm run test:coverage # Generates V8 code coverage report
```

### 3. End-to-End Tests (Playwright)
```bash
# Ensure browsers are installed
npx playwright install chromium

# Run all 16 E2E tests against production preview
npm run test:e2e

# Run with interactive UI mode
npx playwright test --ui
```

### 4. Lighthouse Quality Audit
```bash
npm run test:lighthouse
```

---

## 🤖 Event-Driven AI Project Intelligence & Git Memory

This repository maintains an event-driven AI memory layer where Git is the authoritative event source.

Every Git commit automatically triggers:
- Exact HEAD commit intelligence capture
- Attachment of structured machine-readable **Git Notes** (`refs/notes/ai-context`)
- Continuous synchronization of `.ai/runtime/current.json`
- Commit snapshot indexing (`.ai/snapshots/<sha>.json`)
- Documentation drift detection

### Initializing AI Memory Hooks:
```bash
npm run ai:install-hooks  # Activates version-controlled .githooks
npm run ai:hooks:status   # Verifies hook health status
npm run ai:start          # Dynamically reads Git HEAD and initializes session
npm run ai:health         # Validates Git == Runtime == Git Note invariant
```

---

## 📜 Documentation Index

- [🏛️ System Architecture Deep-Dive](docs/ARCHITECTURE.md)
- [🎨 Design System & Token Specifications](docs/DESIGN_SYSTEM.md)
- [🧪 Testing Architecture & Verification Protocols](docs/TESTING.md)
- [🚀 Deployment & Production Infrastructure](docs/DEPLOYMENT.md)
- [🛡️ Final Quality & Compliance Report](docs/QUALITY_REPORT.md)
- [📦 Asset Provenance & License Log](docs/ai/ASSET_SOURCES.md)

---

## 📬 Contact & Channels

- **Email**: [ankit.kr.dev@gmail.com](mailto:ankit.kr.dev@gmail.com)
- **GitHub**: [github.com/Ankitkr-ak007](https://github.com/Ankitkr-ak007)
- **LinkedIn**: [linkedin.com/in/ankit-kumar-dev](https://www.linkedin.com/in/ankit-kumar-dev)

---

## ⚖️ License

MIT License © 2026 Ankit Kumar. Built with precision and care.
