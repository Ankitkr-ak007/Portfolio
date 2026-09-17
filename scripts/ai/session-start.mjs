import { execGit, getHeadCommit, getShortHead, getCurrentBranch, isWorktreeDirty } from './utils.mjs';
import { syncContext } from './sync-context.mjs';
import { repairAiMemory } from './repair.mjs';
import { validateContext } from './validate-context.mjs';

export function sessionStart() {
  syncContext();
  repairAiMemory();
  validateContext();

  const head = getHeadCommit();
  const shortHead = getShortHead();
  const branch = getCurrentBranch();
  const isDirty = isWorktreeDirty();

  const hooksPath = execGit('config core.hooksPath', { fallback: '' });
  const hooksInstalled = hooksPath === '.githooks' || hooksPath.endsWith('.githooks');

  console.log(`
╭─────────────────────────────────────────────────────────────╮
│              ANKIT KUMAR PORTFOLIO INTELLIGENCE              │
╰─────────────────────────────────────────────────────────────╯

HEAD         ${shortHead} (${head})
BRANCH       ${branch}
STATUS       ${isDirty ? 'DIRTY (Uncommitted changes exist)' : 'CLEAN'}
HOOKS        ${hooksInstalled ? 'ACTIVE (.githooks)' : '⚠️  MISSING (Run: npm run ai:install-hooks)'}

CONTEXT      FRESH (Synced & Validated)
RUNTIME      SYNCHRONIZED (.ai/runtime/current.json)
GIT NOTE     ATTACHED (refs/notes/ai-context)

REQUIRED READ ORDER BEFORE MODIFYING CODE:
1. AGENTS.md (System Navigation Map)
2. docs/ai/PROJECT_CONTEXT.md (Identity & Philosophy)
3. docs/ai/PROJECT_STATE.md (Current Runtime State)
4. docs/ai/ARCHITECTURE.md (If modifying code architecture)
5. docs/ai/DESIGN_SYSTEM.md (If modifying visual/UI components)
6. docs/ai/KNOWN_ISSUES.md (Check existing open/resolved bugs)

AI Session Initialization Complete. Ready for instructions.
`);
}

if (process.argv[1] && process.argv[1].endsWith('session-start.mjs')) {
  sessionStart();
}
