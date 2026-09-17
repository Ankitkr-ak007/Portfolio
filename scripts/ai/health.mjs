import fs from 'fs';
import path from 'path';
import {
  execGit,
  readJson,
  getHeadCommit,
  getRootCommit,
  getCurrentBranch,
} from './utils.mjs';

const ROOT_DIR = process.cwd();

export function checkAiHealth() {
  const head = getHeadCommit();
  const branch = getCurrentBranch();
  const root = getRootCommit();

  let gitPass = head !== 'UNKNOWN' && root !== 'UNKNOWN';
  let runtimePass = false;
  let notePass = false;
  let contextPass = false;
  let docPass = false;
  let hooksPass = false;

  // 1. Check runtime state
  const runtimePath = path.join(ROOT_DIR, '.ai/runtime/current.json');
  if (fs.existsSync(runtimePath)) {
    const runtime = readJson(runtimePath, {});
    if (runtime.head === head) {
      runtimePass = true;
    }
  }

  // 2. Check Git Note on HEAD
  const noteRaw = execGit(`notes --ref=ai-context show ${head}`, { fallback: '' });
  if (noteRaw) {
    try {
      const note = JSON.parse(noteRaw);
      if (note.commit && (note.commit.sha === head || note.commit.shortSha === head.substring(0, 7))) {
        notePass = true;
      }
    } catch {
      notePass = false;
    }
  }

  // 3. Check Context hashes & manifest
  const manifestPath = path.join(ROOT_DIR, '.ai/manifest.json');
  contextPass = fs.existsSync(manifestPath);

  // 4. Check documentation suite
  const requiredDocs = [
    'docs/ai/PROJECT_CONTEXT.md',
    'docs/ai/ARCHITECTURE.md',
    'docs/ai/DESIGN_SYSTEM.md',
    'docs/ai/ENGINEERING_RULES.md',
    'docs/ai/PROJECT_STATE.md',
    'docs/ai/GIT_HISTORY.md',
  ];
  docPass = requiredDocs.every(d => fs.existsSync(path.join(ROOT_DIR, d)));

  // 5. Check Hooks configuration
  const hooksPath = execGit('config core.hooksPath', { fallback: '' });
  hooksPass = hooksPath === '.githooks' || hooksPath.endsWith('.githooks');

  const overall = gitPass && runtimePass && notePass && contextPass && docPass && hooksPass;

  console.log(`
╭─────────────────────────────────────────────────────────────╮
│                   AI MEMORY HEALTH REPORT                   │
╰─────────────────────────────────────────────────────────────╯

HEAD COMMIT:     ${head.substring(0, 7)}
CURRENT BRANCH:  ${branch}
ROOT COMMIT:     ${root.substring(0, 7)}

Git:
${gitPass ? 'PASS' : 'FAIL'}

Runtime (.ai/runtime/current.json):
${runtimePass ? 'PASS (HEAD matches runtime)' : 'FAIL (Run: npm run ai:repair)'}

Commit Note (refs/notes/ai-context):
${notePass ? 'PASS (Note attached to HEAD)' : 'FAIL (Run: npm run ai:repair)'}

Context:
${contextPass ? 'PASS' : 'FAIL'}

Documentation:
${docPass ? 'PASS' : 'FAIL'}

Hooks (core.hooksPath):
${hooksPass ? 'PASS' : 'FAIL (Run: npm run ai:install-hooks)'}

OVERALL:
${overall ? 'HEALTHY' : 'DEGRADED'}
`);

  return overall;
}

if (process.argv[1] && process.argv[1].endsWith('health.mjs')) {
  const isHealthy = checkAiHealth();
  if (!isHealthy && process.env.AI_STRICT === '1') {
    process.exit(1);
  }
}
