# AGENTS.md — EVENT-DRIVEN REPOSITORY INTELLIGENCE ROUTER

> **STOP.** Before modifying any code in this repository, you MUST follow the Event-Driven Universal AI Bootstrap Protocol.

## 1. UNIVERSAL BOOTSTRAP PROTOCOL

Before proposing or implementing ANY changes:

1. **Verify Event Hooks**: If cloning or opening the repo for the first time, ensure hooks are active: `npm run ai:install-hooks`.
2. **Synchronize Context**: Run `npm run ai:start` in your terminal environment. This dynamically verifies Git HEAD, checks `.ai/runtime/current.json`, inspects Git Notes, and validates context freshness.
3. **Read Identity**: Read [`docs/ai/PROJECT_CONTEXT.md`](file:///C:/Users/Ankit%20Kumar/Portfolio/docs/ai/PROJECT_CONTEXT.md) to understand owner identity, design philosophy, and technical positioning.
4. **Inspect Runtime State**: Read [`docs/ai/PROJECT_STATE.md`](file:///C:/Users/Ankit%20Kumar/Portfolio/docs/ai/PROJECT_STATE.md) or run `npm run ai:state` for branch, commit, and build environment metadata.
5. **Read Specific Intelligence**:
   * Changing architecture? Read [`docs/ai/ARCHITECTURE.md`](file:///C:/Users/Ankit%20Kumar/Portfolio/docs/ai/ARCHITECTURE.md).
   * Modifying UI/Visuals? Read [`docs/ai/DESIGN_SYSTEM.md`](file:///C:/Users/Ankit%20Kumar/Portfolio/docs/ai/DESIGN_SYSTEM.md).
   * Adding features or writing TypeScript? Read [`docs/ai/ENGINEERING_RULES.md`](file:///C:/Users/Ankit%20Kumar/Portfolio/docs/ai/ENGINEERING_RULES.md).
   * Debugging an issue? Read [`docs/ai/KNOWN_ISSUES.md`](file:///C:/Users/Ankit%20Kumar/Portfolio/docs/ai/KNOWN_ISSUES.md).
6. **Inspect Git & Implementation**: Run `git status` and analyze target source files before writing code.
7. **Normal Commit Workflow**: Simply `git add <files>` and `git commit -m "<msg>"`. Git hooks automatically attach structured Git Notes to `refs/notes/ai-context`, update runtime memory, and refresh snapshots without requiring manual synchronization.

---

## 2. EVENT-DRIVEN AI MEMORY ARCHITECTURE

```text
SOURCE CODE / ASSETS / CONFIG
              ↓
             GIT
              ↓
        GIT EVENT LAYER (.githooks/)
              ↓
    ┌─────────┴─────────┐
    ↓                   ↓
PRE-COMMIT          POST-COMMIT
    ↓                   ↓
staged context      exact HEAD record
    ↓                   ↓
tracked docs        Git Note (refs/notes/ai-context)
                    runtime memory (.ai/runtime/current.json)
                    snapshot (.ai/snapshots/<sha>.json)
                    change record & gap report
```

---

## 3. CORE CLI COMMANDS FOR AI

```bash
npm run ai:start          # Start AI session: dynamic Git HEAD check, runtime sync, dashboard
npm run ai:state          # Display current runtime memory, Git HEAD status, and dirty state
npm run ai:health         # Check invariant health (Git HEAD == runtime.head == Note.sha)
npm run ai:repair         # Self-healing: reconstruct missing Git Note or runtime memory idempotently
npm run ai:rebuild        # Full clean reconstruction of AI caches, indices, and gap report
npm run ai:rebuild-history # Backfill Git Notes across entire commit history from root to HEAD
npm run ai:history        # Inspect commit intelligence, attached Git Note, and system impact
npm run ai:diff           # Analyze system & memory impact between two commits
npm run ai:record         # Explicitly attach Git Note to a specific commit SHA
npm run ai:install-hooks  # Install and configure .githooks with core.hooksPath
npm run ai:hooks:status   # Verify installation health of all version-controlled Git hooks
npm run ai:notes:push     # Push refs/notes/ai-context to remote origin
npm run ai:notes:fetch    # Fetch refs/notes/ai-context from remote origin
```

---

## 4. GOLDEN INVARIANTS OF THE REPOSITORY

1. **Git is Authoritative**: Never trust static files without verifying `git rev-parse HEAD`.
2. **Immutable Commits**: AI metadata is attached via Git Notes (`refs/notes/ai-context`) without amending or altering commit SHAs.
3. **Exact Invariant**: `git rev-parse HEAD == .ai/runtime/current.json.head == Git Note commit.sha`.
4. **No Unrelated Staging**: Pre-commit hooks stage ONLY safe generated documentation regions. Never run `git add .` indiscriminately.
5. **No Hallucinated Credentials**: Never invent experience, metrics, or technologies.

