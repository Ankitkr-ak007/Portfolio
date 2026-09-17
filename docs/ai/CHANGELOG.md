# PRODUCT DEVELOPMENT CHANGELOG

<!-- BEGIN HUMAN -->
## 2026-09-17 — Project Intelligence System Architecture

### Added
* Self-updating Cross-AI Project Intelligence System with support for OpenAI Codex, Claude Code, Gemini CLI, Cursor, and GitHub Copilot.
* CLI automation toolset (`ai:sync`, `ai:start`, `ai:end`, `ai:validate`, `ai:inspect`, `ai:changes`, `ai:gaps`, `ai:git`, `ai:history`).
* Comprehensive system documentation under `docs/ai/`.

## 2026-09-17 — Deprecation Warning & QA Polish (`2443b40`)

### Fixed
* Silenced `THREE.Clock` deprecation warning via top-level console interceptor in `main.tsx`.
* Resolved all React Compiler and oxlint warnings across `CustomCursor` and `SystemsCoreScene`.

## 2026-09-17 — Overlay Scroll Architecture Refactor (`1c2fbf4`)

### Fixed
* Created `useBodyScrollLock` reference-counted lock and Lenis controller to isolate overlay scrolling from window background.
<!-- END HUMAN -->
