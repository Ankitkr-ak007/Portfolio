# TESTING GUIDELINES & QA PROCEDURES

<!-- BEGIN HUMAN -->
## 1. AUTOMATED VERIFICATION PROCEDURES
* **Linter Check**: `npm run lint` (Oxlint must pass with 0 errors).
* **Production Compilation**: `npm run build` (TypeScript compilation + Vite bundler).
* **Context Validation**: `npm run ai:validate` (Context integrity check).

## 2. MANUAL QA PROTOCOLS
* **Overlay Scroll Test**: Open Case Study Modal, Terminal, and Command Palette. Verify mouse wheel / trackpad scroll stays inside modal while background document remains stationary.
* **3D Canvas Fallback Test**: Disable WebGL in browser devtools or test on touch device. Verify `<FallbackScene />` CSS 3D replacement renders cleanly.
* **Keyboard Navigation Test**: Press `Ctrl+K` or `⌘K` to open Command Palette. Navigate options with `Up`/`Down` arrow keys and press `Escape` to close.
* **Responsive Breakpoint Test**: Check layout at 375px (Mobile), 768px (Tablet), 1440px (Desktop).
<!-- END HUMAN -->
