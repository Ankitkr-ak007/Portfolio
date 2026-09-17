# CONTRIBUTING & AI DEVELOPMENT WORKFLOW

Welcome to Ankit Kumar's Portfolio Repository!

## AI DEVELOPMENT PROTOCOL

This repository features a self-updating **Cross-AI Project Intelligence System**.

Before starting any development or making changes with an AI assistant:

```bash
# 1. Initialize & Synchronize AI Context
npm run ai:start

# 2. Read identity and rules
# Consult AGENTS.md and docs/ai/PROJECT_CONTEXT.md

# 3. Develop & Verify
npm run lint
npm run build

# 4. Finalize Session
npm run ai:end
```

## COMMIT CONVENTION
Use standard Conventional Commits format:
* `feat(scope): ...`
* `fix(scope): ...`
* `perf(scope): ...`
* `refactor(scope): ...`
* `docs(scope): ...`
