import { execGit } from './utils.mjs';
import { syncContext } from './sync-context.mjs';
import { validateContext } from './validate-context.mjs';

export function sessionStart() {
  syncContext();
  validateContext();

  const shortHead = execGit('rev-parse --short HEAD', { fallback: 'UNKNOWN' });
  const branch = execGit('rev-parse --abbrev-ref HEAD', { fallback: 'main' });
  const status = execGit('status --porcelain', { fallback: '' });
  const isDirty = status.length > 0;

  console.log(`
╭─────────────────────────────────────────────────────────────╮
│              ANKIT KUMAR PORTFOLIO INTELLIGENCE              │
╰─────────────────────────────────────────────────────────────╯

HEAD         ${shortHead}
BRANCH       ${branch}
STATUS       ${isDirty ? 'DIRTY (Uncommitted changes exist)' : 'CLEAN'}

CONTEXT      FRESH (Synced & Validated)
ARCH         FRESH (docs/ai/ARCHITECTURE.md)
DESIGN       FRESH (docs/ai/DESIGN_SYSTEM.md)
GIT INDEX    FRESH (.ai/cache/git-index.json)

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
