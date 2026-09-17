import { execGit } from './utils.mjs';

export function readGitNote(commitSha = 'HEAD') {
  const sha = execGit(`rev-parse ${commitSha}`, { fallback: '' });
  if (!sha) return null;

  const raw = execGit(`notes --ref=ai-context show ${sha}`, { fallback: '' });
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

if (process.argv[1] && process.argv[1].endsWith('read-git-note.mjs')) {
  const target = process.argv[2] || 'HEAD';
  const note = readGitNote(target);
  if (note) {
    console.log(JSON.stringify(note, null, 2));
  } else {
    console.log(`[AI Note Reader] No Git Note found for ${target} in refs/notes/ai-context`);
  }
}
