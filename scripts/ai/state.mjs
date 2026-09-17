import fs from 'fs';
import path from 'path';
import {
  execGit,
  readJson,
  getHeadCommit,
  getRootCommit,
  getCurrentBranch,
  isWorktreeDirty,
} from './utils.mjs';

const ROOT_DIR = process.cwd();

export function reportState() {
  const head = getHeadCommit();
  const shortHead = head.substring(0, 7);
  const branch = getCurrentBranch();
  const root = getRootCommit();
  const isDirty = isWorktreeDirty();

  const stagedCount = (execGit('diff --cached --name-only', { fallback: '' }).split('\n').filter(Boolean)).length;
  const unstagedCount = (execGit('diff --name-only', { fallback: '' }).split('\n').filter(Boolean)).length;
  const untrackedCount = (execGit('ls-files --others --exclude-standard', { fallback: '' }).split('\n').filter(Boolean)).length;

  const runtimePath = path.join(ROOT_DIR, '.ai/runtime/current.json');
  const runtime = fs.existsSync(runtimePath) ? readJson(runtimePath, {}) : null;

  const lastEvent = runtime?.latestEvent || 'N/A';
  const lastChange = runtime?.lastSubject || execGit('log -1 --pretty=format:"%s"', { fallback: 'N/A' });
  const contextFresh = runtime ? (runtime.head === head) : false;

  console.log(`
PROJECT STATE

HEAD:
${shortHead} (${head})

BRANCH:
${branch}

INITIAL:
${root.substring(0, 7)}

STATUS:
${isDirty ? 'DIRTY' : 'CLEAN'} (Staged: ${stagedCount}, Unstaged: ${unstagedCount}, Untracked: ${untrackedCount})

LAST EVENT:
${lastEvent}

LAST CHANGE:
${lastChange}

CONTEXT:
${contextFresh ? 'FRESH' : 'STALE (Run: npm run ai:start)'}

MEMORY:
${contextFresh ? 'FRESH' : 'NEEDS SYNC'}

DOC DRIFT:
NONE
`);
}

if (process.argv[1] && process.argv[1].endsWith('state.mjs')) {
  reportState();
}
