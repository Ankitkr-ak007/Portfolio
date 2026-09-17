import { execGit } from './utils.mjs';
import { readGitNote } from './read-git-note.mjs';

export function showCommitHistory(targetSha) {
  let commitArg = targetSha;
  if (!commitArg) {
    const args = process.argv.slice(2);
    for (let i = 0; i < args.length; i++) {
      if (args[i] === '--commit' && args[i + 1]) {
        commitArg = args[i + 1];
        break;
      }
    }
  }

  if (!commitArg) {
    commitArg = execGit('rev-parse HEAD', { fallback: 'HEAD' });
  }

  const sha = execGit(`rev-parse ${commitArg}`, { fallback: '' });
  if (!sha) {
    console.error(`Error: Commit ${commitArg} not found in repository history.`);
    return;
  }

  const commitLog = execGit(`log -1 --pretty=format:"%H|%h|%P|%an|%ad|%s" --date=iso ${sha}`, { fallback: '' });
  if (!commitLog) {
    console.error(`Error: Commit ${sha} details could not be parsed.`);
    return;
  }

  const [fullSha, sSha, parents, author, date, subject] = commitLog.split('|');
  const note = readGitNote(sha);

  console.log(`
╭─────────────────────────────────────────────────────────────╮
│               HISTORICAL COMMIT INTELLIGENCE                │
╰─────────────────────────────────────────────────────────────╯

COMMIT:          ${fullSha} (${sSha})
PARENT(S):       ${parents || 'ROOT (None)'}
AUTHOR:          ${author}
DATE:            ${date}
MESSAGE:         ${subject}
CLASSIFICATION:  ${note?.change?.classification || 'UNKNOWN'}
AI SESSION:      ${note?.ai?.sessionId || 'None / External'}

AFFECTED SYSTEMS:
  Components:    ${note?.impact?.components?.length ? note.impact.components.join(', ') : 'None'}
  3D WebGL:      ${note?.impact?.['3d']?.length ? note.impact['3d'].join(', ') : 'None'}
  Motion:        ${note?.impact?.motion?.length ? note.impact.motion.join(', ') : 'None'}
  Design:        ${note?.impact?.design?.length ? note.impact.design.join(', ') : 'None'}
  Tests:         ${note?.impact?.testing?.length ? note.impact.testing.join(', ') : 'None'}

CONTEXT HASHES:
  Project State: ${note?.context?.stateHash || 'N/A'}
  Architecture:  ${note?.context?.architectureHash || 'N/A'}
  Design System: ${note?.context?.designSystemHash || 'N/A'}

GIT NOTE STATUS:
  Attached:      ${note ? 'YES (refs/notes/ai-context)' : 'NO (Run: npm run ai:record -- --commit ' + sSha + ')'}

To inspect full raw patch diff for this commit:
  git show ${sSha}
`);
}

if (process.argv[1] && process.argv[1].endsWith('history.mjs')) {
  showCommitHistory();
}
