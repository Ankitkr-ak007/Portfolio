import { execGit } from './utils.mjs';

export function fetchNotes() {
  console.log('[AI Notes] Fetching refs/notes/ai-context from remote origin...');
  try {
    const res = execGit('fetch origin refs/notes/ai-context:refs/notes/ai-context', { throwOnError: true });
    console.log(res || '✓ Successfully fetched Git Notes from origin.');
  } catch (err) {
    console.warn(`[AI Notes] Note fetch notification: ${err.message}`);
  }
}

if (process.argv[1] && process.argv[1].endsWith('notes-fetch.mjs')) {
  fetchNotes();
}
