import path from 'path';
import {
  execGit,
  writeJson,
  readJson,
  writeMarkdown,
  getHeadCommit,
  getShortHead,
  getRootCommit,
  getCurrentBranch,
  isWorktreeDirty,
  getContextHashes,
} from './utils.mjs';
import { writeGitNote } from './write-git-note.mjs';
import { detectGaps } from './detect-gaps.mjs';

const ROOT_DIR = process.cwd();

export function repairAiMemory() {
  console.log('\n========================================');
  console.log('       AI MEMORY REPAIR & HEALING       ');
  console.log('========================================\n');

  const head = getHeadCommit();
  const shortHead = getShortHead();
  const branch = getCurrentBranch();
  const root = getRootCommit();
  const now = new Date().toISOString();

  // 1. Ensure Git Note exists on HEAD
  console.log(`[AI Repair] Inspecting HEAD: ${shortHead}...`);
  let note = null;
  const noteRaw = execGit(`notes --ref=ai-context show ${head}`, { fallback: '' });

  if (!noteRaw) {
    console.log(`[AI Repair] Missing Git Note for HEAD (${shortHead}). Generating...`);
    note = writeGitNote(head);
  } else {
    try {
      note = JSON.parse(noteRaw);
      console.log(`[AI Repair] Git Note verified on HEAD.`);
    } catch {
      console.log(`[AI Repair] Corrupted Git Note detected on HEAD. Re-generating...`);
      note = writeGitNote(head);
    }
  }

  // 2. Read parents from commit
  const rawParents = execGit(`rev-parse ${head}^@`, { fallback: '' });
  const parents = rawParents ? rawParents.split('\n').filter(Boolean) : [];
  const previousCommit = parents[0] || null;

  // 3. Reconstruct .ai/runtime/current.json
  const runtimeState = {
    head,
    shortHead,
    branch,
    dirty: isWorktreeDirty(),
    initialCommit: root,
    previousCommit,
    latestEvent: 'repair',
    updatedAt: now,
    contextFresh: true,
    lastClassification: note?.change?.classification || 'UNKNOWN',
    lastSubject: note?.commit?.subject || '',
  };
  writeJson(path.join(ROOT_DIR, '.ai/runtime/current.json'), runtimeState);
  console.log(`✓ Restored: .ai/runtime/current.json`);

  // 4. Reconstruct .ai/runtime/current-summary.md
  const summaryMd = `# ANKIT KUMAR PROJECT INTELLIGENCE

**HEAD**: \`${head}\` (\`${shortHead}\`)  
**BRANCH**: \`${branch}\`  
**STATUS**: \`${runtimeState.dirty ? 'DIRTY' : 'CLEAN'}\`  
**INITIAL COMMIT**: \`${root}\`  
**PREVIOUS COMMIT**: \`${previousCommit || 'NONE'}\`  
**LAST EVENT**: \`repair\`  
**LAST CHANGE**: \`${runtimeState.lastSubject || 'N/A'}\`  
**CLASSIFICATION**: \`${runtimeState.lastClassification}\`  
**CONTEXT**: \`FRESH\`  
**MEMORY**: \`HEALTHY\`  
**GIT NOTE**: \`ATTACHED (refs/notes/ai-context)\`  
`;
  writeMarkdown(path.join(ROOT_DIR, '.ai/runtime/current-summary.md'), summaryMd);
  console.log(`✓ Restored: .ai/runtime/current-summary.md`);

  // 5. Reconstruct .ai/runtime/health.json
  const health = {
    git: { fresh: true, head, shortHead, branch },
    runtime: { fresh: true, updatedAt: now },
    commitNote: { exists: !!note, ref: 'refs/notes/ai-context' },
    context: { fresh: true, hashes: getContextHashes() },
    overall: 'HEALTHY',
  };
  writeJson(path.join(ROOT_DIR, '.ai/runtime/health.json'), health);
  console.log(`✓ Restored: .ai/runtime/health.json`);

  // 6. Write Snapshot
  if (note) {
    writeJson(path.join(ROOT_DIR, `.ai/snapshots/${shortHead}.json`), note);
    console.log(`✓ Snapshot saved: .ai/snapshots/${shortHead}.json`);
  }

  // 7. Update gap detection
  detectGaps();

  console.log('\n✓ AI Memory & Context successfully healed and synchronized.\n');
}

if (process.argv[1] && process.argv[1].endsWith('repair.mjs')) {
  repairAiMemory();
}
