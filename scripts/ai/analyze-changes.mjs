import path from 'path';
import { execGit, readJson } from './utils.mjs';

const ROOT_DIR = process.cwd();

export function analyzeChanges() {
  console.log('[AI Change Analyzer] Comparing repository status vs previous sync...');

  const gitStatus = execGit('status --porcelain', { fallback: '' });
  const changedFiles = [];

  if (gitStatus) {
    const lines = gitStatus.split('\n');
    for (const line of lines) {
      if (!line.trim()) continue;
      const code = line.substring(0, 2).trim();
      const file = line.substring(3).trim();
      changedFiles.push({ code, file });
    }
  }

  const lastSync = readJson(path.join(ROOT_DIR, '.ai/cache/last-sync.json'), { commit: 'UNKNOWN' });
  const head = execGit('rev-parse --short HEAD', { fallback: 'UNKNOWN' });

  console.log(`\n=== REPOSITORY CHANGE ANALYSIS ===`);
  console.log(`Current HEAD: ${head}`);
  console.log(`Last Sync HEAD: ${lastSync.commit}`);
  console.log(`Worktree Status: ${changedFiles.length > 0 ? `${changedFiles.length} file(s) modified/untracked` : 'CLEAN'}`);

  if (changedFiles.length > 0) {
    console.log('\nModified / Untracked files:');
    for (const item of changedFiles) {
      console.log(`  [${item.code}] ${item.file}`);
    }
  } else {
    console.log('\nNo uncommitted worktree changes detected.');
  }
}

if (process.argv[1] && process.argv[1].endsWith('analyze-changes.mjs')) {
  analyzeChanges();
}
