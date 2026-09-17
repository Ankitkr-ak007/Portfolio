import { execGit } from './utils.mjs';
import { writeGitNote } from './write-git-note.mjs';
import { analyzeGit } from './analyze-git.mjs';

export function rebuildHistory() {
  console.log('\n========================================');
  console.log('    REBUILDING GIT HISTORICAL MEMORY    ');
  console.log('========================================\n');

  const rawCommits = execGit('rev-list --reverse HEAD', { fallback: '' });
  if (!rawCommits) {
    console.error('No git commits found in repository.');
    return;
  }

  const commits = rawCommits.split('\n').filter(Boolean);
  console.log(`[AI History Rebuild] Found ${commits.length} commits in history.\n`);

  let count = 0;
  for (const sha of commits) {
    const shortSha = sha.substring(0, 7);
    const existing = execGit(`notes --ref=ai-context show ${sha}`, { fallback: '' });
    if (!existing) {
      process.stdout.write(`Generating note for ${shortSha}... `);
      const res = writeGitNote(sha);
      if (res) {
        console.log('✓ Attached');
        count++;
      } else {
        console.log('❌ Failed');
      }
    } else {
      console.log(`Note exists for ${shortSha} (skipping)`);
    }
  }

  console.log(`\n✓ Backfilled ${count} commit notes in refs/notes/ai-context.`);

  // Update git intelligence index
  analyzeGit();
  console.log('✓ Git intelligence index updated.\n');
}

if (process.argv[1] && process.argv[1].endsWith('rebuild-history.mjs')) {
  rebuildHistory();
}
