# Testing Architecture & Verification Protocols

## 1. Overview

The test architecture ensures zero regression, strict type compliance, scroll boundary isolation, memory safety, and full WCAG AA accessibility.

---

## 2. Test Pyramid & Tooling

```text
┌─────────────────────────────────────────────────────────┐
│  Playwright E2E Suites & Axe Accessibility Audits      │
│  (16 Tests · Scroll Isolation · Viewports · Memory)     │
├─────────────────────────────────────────────────────────┤
│  Vitest & React Testing Library (RTL)                   │
│  (25 Tests · Hooks · Data · Overlays · Command · Term)  │
├─────────────────────────────────────────────────────────┤
│  Static Analysis & Type Checking                        │
│  (Oxlint · TypeScript Compiler tsc -b)                  │
└─────────────────────────────────────────────────────────┘
```

---

## 3. Unit & Integration Test Suites (Vitest)

Run with: `npm run test:unit`

### 3.1 Tested Modules
- **`src/lib/utils.test.ts`**:
  - Class concatenation and conflict resolution via `cn` (`clsx` + `tailwind-merge`).
- **`src/overlays/useScrollLock.test.ts`**:
  - Document overflow locking (`overflow: hidden; touch-action: none`).
  - Measurement and compensation for scrollbar layout shift.
  - Integration with Lenis virtual scroll suspension (`pauseLenis()`, `resumeLenis()`).
  - Restoration of exact scroll coordinates upon unmounting.
- **`src/overlays/useOverlayNavigation.test.ts`**:
  - Escape key interceptor for modal closure.
  - Tab focus trapping within overlay container bounds.
- **`src/hooks/useCustomCursor.test.ts`**:
  - State updates across `default`, `project`, `button`, `link`, `3d`, and `hidden` variants.
- **`src/data/data.test.ts`**:
  - Strict validation of all projects, enforcing all 11 case study sections.
  - Valid skill connections and non-empty experience entries.
  - Email format and URL protocol validation.
- **`src/components/ui/CommandPalette.test.tsx`**:
  - Query filtering, action execution, and shortcut dispatching.
- **`src/components/ui/Terminal.test.tsx`**:
  - Command parsing (`whoami`, `stack`, `clear`, `exit`), history buffer, and output rendering.
- **`src/components/projects/SelectedWork.test.tsx`**:
  - Category filtering and case study modal trigger.

---

## 4. End-to-End Test Suites (Playwright)

Run with: `npm run test:e2e`

### 4.1 Mandatory Overlay Scroll Isolation Suite (`e2e/overlay-scroll-isolation.spec.ts`)
1. Opens the **Case Study Modal**.
2. Simulates mouse wheel scrolling over the overlay container.
3. **ASSERTION 1**: Overlay container scroll offset increases (`scrollTop > 0`).
4. **ASSERTION 2**: Background document `window.scrollY` remains completely stationary.
5. Closes the modal via `Escape`.
6. **ASSERTION 3**: Document locks are removed and root smooth scrolling resumes.
7. Steps 1–6 are verified identically on the **Terminal CLI shell**.

### 4.2 Accessibility & WCAG AA Audit (`e2e/accessibility.spec.ts`)
- Automated `@axe-core/playwright` rules scanned across:
  - Root homepage view
  - Active Case Study modal
  - Active Terminal CLI shell
- **Result**: Zero critical accessibility violations.

### 4.3 Responsive Viewports & Visual Stability (`e2e/visual-regression.spec.ts`)
- Tested across standard viewports:
  - `1440 × 900` (Desktop Standard)
  - `1920 × 1080` (FHD Display)
  - `1024 × 768` (Tablet Landscape)
  - `768 × 1024` (Tablet Portrait)
  - `430 × 932` (iPhone 16 Pro Max)
  - `390 × 844` (iPhone 14)

### 4.4 WebGL & Overlay Memory Lifecycle Stress Test (`e2e/memory-lifecycle.spec.ts`)
- Rapidly mounts, opens, and destroys modal dialogs and terminal shells 15 consecutive times.
- Asserts zero unhandled page errors, zero memory leaks, and zero WebGL context crashes.

---

## 5. Automated CI Execution

GitHub Actions runs all test suites on every pull request and push to `main` via `.github/workflows/ci.yml`.
