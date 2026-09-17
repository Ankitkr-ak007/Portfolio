# AGENTS.md — REPOSITORY INTELLIGENCE ROUTER

> **STOP.** Before modifying any code in this repository, you MUST follow the Universal AI Bootstrap Protocol.

## 1. UNIVERSAL BOOTSTRAP PROTOCOL

Before proposing or implementing ANY changes:

1. **Synchronize Context**: Run `npm run ai:start` in your terminal environment.
2. **Read Identity**: Read [`docs/ai/PROJECT_CONTEXT.md`](file:///C:/Users/Ankit%20Kumar/Portfolio/docs/ai/PROJECT_CONTEXT.md) to understand owner identity, design philosophy, and technical positioning.
3. **Inspect Runtime State**: Read [`docs/ai/PROJECT_STATE.md`](file:///C:/Users/Ankit%20Kumar/Portfolio/docs/ai/PROJECT_STATE.md) for branch, commit, and build environment metadata.
4. **Read Specific Intelligence**:
   * Changing architecture? Read [`docs/ai/ARCHITECTURE.md`](file:///C:/Users/Ankit%20Kumar/Portfolio/docs/ai/ARCHITECTURE.md).
   * Modifying UI/Visuals? Read [`docs/ai/DESIGN_SYSTEM.md`](file:///C:/Users/Ankit%20Kumar/Portfolio/docs/ai/DESIGN_SYSTEM.md).
   * Adding features or writing TypeScript? Read [`docs/ai/ENGINEERING_RULES.md`](file:///C:/Users/Ankit%20Kumar/Portfolio/docs/ai/ENGINEERING_RULES.md).
   * Debugging an issue? Read [`docs/ai/KNOWN_ISSUES.md`](file:///C:/Users/Ankit%20Kumar/Portfolio/docs/ai/KNOWN_ISSUES.md).
5. **Inspect Git & Implementation**: Run `git status` and analyze target source files before writing code.
6. **Finalize Session**: Run `npm run ai:end` to validate context and update logs.

---

## 2. REPOSITORY KNOWLEDGE MAP

This repository maintains a complete, persistent source of truth under `docs/ai/`:

### Human-Owned Core Context
* [`docs/ai/PROJECT_CONTEXT.md`](file:///C:/Users/Ankit%20Kumar/Portfolio/docs/ai/PROJECT_CONTEXT.md) — Personal positioning, design aesthetics, audience, and content rules.
* [`docs/ai/ARCHITECTURE.md`](file:///C:/Users/Ankit%20Kumar/Portfolio/docs/ai/ARCHITECTURE.md) — Application layout, 3D WebGL scene hierarchy, scroll lock, state, and error handling.
* [`docs/ai/DESIGN_SYSTEM.md`](file:///C:/Users/Ankit%20Kumar/Portfolio/docs/ai/DESIGN_SYSTEM.md) — Color tokens, typography, spacing, motion physics, and visual anti-patterns.
* [`docs/ai/ENGINEERING_RULES.md`](file:///C:/Users/Ankit%20Kumar/Portfolio/docs/ai/ENGINEERING_RULES.md) — Strict React 19, TypeScript, Motion, and 3D memory management standards.
* [`docs/ai/DECISIONS.md`](file:///C:/Users/Ankit%20Kumar/Portfolio/docs/ai/DECISIONS.md) — Architecture Decision Records (ADRs) explaining technical trade-offs.

### Live & Generated Repository State
* [`docs/ai/PROJECT_STATE.md`](file:///C:/Users/Ankit%20Kumar/Portfolio/docs/ai/PROJECT_STATE.md) — Current branch, commit hash, worktree state, and tool versions.
* [`docs/ai/KNOWN_ISSUES.md`](file:///C:/Users/Ankit%20Kumar/Portfolio/docs/ai/KNOWN_ISSUES.md) — Active and resolved issues with reproducing steps and fix commits.
* [`docs/ai/GIT_HISTORY.md`](file:///C:/Users/Ankit%20Kumar/Portfolio/docs/ai/GIT_HISTORY.md) — Indexed commit history, branch topology, and origin SHA.
* [`docs/ai/FILE_MAP.md`](file:///C:/Users/Ankit%20Kumar/Portfolio/docs/ai/FILE_MAP.md) — Directory index and architectural file purpose.
* [`docs/ai/ROUTES.md`](file:///C:/Users/Ankit%20Kumar/Portfolio/docs/ai/ROUTES.md) — Route records, lazy loaded chunks, and interactive components.
* [`docs/ai/DEPENDENCIES.md`](file:///C:/Users/Ankit%20Kumar/Portfolio/docs/ai/DEPENDENCIES.md) — Direct/transitive package inventory and criticality flags.
* [`docs/ai/ASSETS.md`](file:///C:/Users/Ankit%20Kumar/Portfolio/docs/ai/ASSETS.md) — Audit of models, textures, icons, and static public assets.
* [`docs/ai/ENVIRONMENT.md`](file:///C:/Users/Ankit%20Kumar/Portfolio/docs/ai/ENVIRONMENT.md) — Safe environment variable usage and security rules.
* [`docs/ai/TESTING.md`](file:///C:/Users/Ankit%20Kumar/Portfolio/docs/ai/TESTING.md) — Manual & automated testing procedures (WebGL, overlay scroll, keyboard).
* [`docs/ai/PERFORMANCE.md`](file:///C:/Users/Ankit%20Kumar/Portfolio/docs/ai/PERFORMANCE.md) — Frame budget, DPR strategy, and chunk optimization.
* [`docs/ai/AI_GAP_REPORT.md`](file:///C:/Users/Ankit%20Kumar/Portfolio/docs/ai/AI_GAP_REPORT.md) — In-code TODO/FIXME audit and context drift detection.
* [`docs/ai/CHANGELOG.md`](file:///C:/Users/Ankit%20Kumar/Portfolio/docs/ai/CHANGELOG.md) — Human-readable product release story.
* [`docs/ai/SESSION_LOG.md`](file:///C:/Users/Ankit%20Kumar/Portfolio/docs/ai/SESSION_LOG.md) — Detailed AI session activity log.

---

## 3. CORE CLI COMMANDS FOR AI

```bash
npm run ai:start     # Start AI session: syncs context, validates schema, outputs dashboard
npm run ai:sync      # Synchronize repository state and regenerate intelligence docs
npm run ai:validate  # Validate context integrity and link graph
npm run ai:inspect   # Inspect specific doc (e.g. npm run ai:inspect architecture)
npm run ai:changes   # Compare worktree diff against last sync state
npm run ai:gaps      # Scan TODOs/FIXMEs and detect context drift
npm run ai:end       # Finalize AI session, validate state, and guide logging
```

---

## 4. GOLDEN RULE OF THE REPOSITORY

> Code and Git history are the ultimate source of truth. Documentation explains the code. Never invent missing facts. Always inspect Git history (`git log`, `git show`) when encountering non-obvious architecture.
