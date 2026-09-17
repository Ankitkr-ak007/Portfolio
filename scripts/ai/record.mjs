import { writeGitNote } from './write-git-note.mjs';

export function recordCommitNote() {
  const args = process.argv.slice(2);
  let commitSha = 'HEAD';

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--commit' && args[i + 1]) {
      commitSha = args[i + 1];
      break;
    }
  }

  console.log(`[AI Record] Generating Git Note for: ${commitSha}...`);
  const note = writeGitNote(commitSha);

  if (note) {
    console.log(`✓ Git Note attached to ${note.commit.shortSha} in refs/notes/ai-context`);
    console.log(JSON.stringify(note, null, 2));
  } else {
    console.error(`❌ Failed to attach Git Note to ${commitSha}`);
    process.exit(1);
  }
}

if (process.argv[1] && process.argv[1].endsWith('record.mjs')) {
  recordCommitNote();
}
