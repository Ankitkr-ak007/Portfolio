import { execGit } from './utils.mjs';
import { syncContext } from './sync-context.mjs';
import { validateContext } from './validate-context.mjs';

export function sessionEnd() {
  console.log('\n[AI Session End] Finalizing session, syncing context, and recording session log...');
  syncContext();
  validateContext();

  const shortHead = execGit('rev-parse --short HEAD', { fallback: 'UNKNOWN' });
  const status = execGit('status --porcelain', { fallback: '' });
  const isDirty = status.length > 0;

  console.log(`
╭─────────────────────────────────────────────────────────────╮
│              SESSION CONCLUSION SUMMARY                      │
╰─────────────────────────────────────────────────────────────╯

HEAD         ${shortHead}
STATUS       ${isDirty ? 'DIRTY (Uncommitted work remains)' : 'CLEAN'}

NEXT STEPS:
1. Ensure docs/ai/CHANGELOG.md is updated with user-visible changes.
2. Ensure docs/ai/SESSION_LOG.md records the session ID & objectives.
3. Commit working directory if requested: git commit -m "type(scope): description".
`);
}

if (process.argv[1] && process.argv[1].endsWith('session-end.mjs')) {
  sessionEnd();
}
