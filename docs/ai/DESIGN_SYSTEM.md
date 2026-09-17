# DESIGN SYSTEM & VISUAL SPECIFICATION

<!-- BEGIN HUMAN -->
## 1. BRAND & COLOR TOKENS
* **Background Primary**: `#050609` (Technical void dark)
* **Background Surface**: `#0A0D12` (Card surface)
* **Background Elevated**: `#111620` (Modal / overlay background)
* **Tech Accent Primary**: `#78AFFF` (Cybernetic cyan blue)
* **Tech Accent Light**: `#B7D7FF` (Secondary glow)
* **Border Slate**: `rgba(120, 175, 255, 0.15)`
* **Text Main**: `#F1F5F9`
* **Text Muted**: `#94A3B8`

## 2. TYPOGRAPHY
* **Font Stack**: System UI sans + JetBrains Mono / Monospace for code snippets and metrics.
* **Heading Hierarchy**: `h1` (Hero headline), `h2` (Section title), `h3` (Component header).

## 3. MOTION & PHYSICS
* **Library**: `motion` (Framer Motion v13).
* **Easing**: Cubic-bezier spring (`damping: 28, stiffness: 320`).
* **Hardware Acceleration**: Only animate `transform` and `opacity`.

## 4. VISUAL ANTI-PATTERNS ("DO NOT DO THIS")
* ❌ Do not introduce generic bright neon colors or rainbow gradients.
* ❌ Do not create standard SaaS white templates or generic glassmorphism blur traps.
* ❌ Do not remove touch device / reduced-motion checks.
* ❌ Do not alter padding scales or replace intentional whitespace with crowded cards.
<!-- END HUMAN -->
