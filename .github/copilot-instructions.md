# GITHUB COPILOT INSTRUCTIONS

You are operating inside Ankit Kumar's Engineering & AI Portfolio codebase.

## MANDATORY PROTOCOL
1. Read `AGENTS.md` and `docs/ai/PROJECT_CONTEXT.md` for identity and design language constraints.
2. Follow strict TypeScript and React 19 standards (`docs/ai/ENGINEERING_RULES.md`).
3. Adhere to design system tokens (`docs/ai/DESIGN_SYSTEM.md`): custom dark palette `#050609`, `#78AFFF`, `#B7D7FF`.
4. Ensure overlay elements include `data-lenis-prevent="true"`, `overscroll-contain`, and body scroll lock integrations (`docs/ai/ARCHITECTURE.md`).
5. Never introduce legacy `THREE.Clock` instantiations; use `useFrame((_, delta) => ...)` frame delta accumulators.
