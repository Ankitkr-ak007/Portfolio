import { execGit } from './utils.mjs';

export function pushNotes() {
  console.log('[AI Notes] Pushing refs/notes/ai-context to remote origin...');
  try {
    const res = execGit('push origin refs/notes/ai-context:refs/notes/ai-context', { throwOnError: true });
    console.log(res || '✓ Successfully synchronized Git Notes with origin.');
  } catch (err) {
    console.warn(`[AI Notes] Note push notification: ${err.message}`);
    console.log('Ensure remote origin is configured and permits refs/notes/ push.');
  }
}

if (process.argv[1] && process.argv[1].endsWith('notes-push.mjs')) {
  pushNotes();
}
