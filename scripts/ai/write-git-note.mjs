import { execGit, sanitizeSecrets, getContextHashes, getCurrentBranch, isWorktreeDirty } from './utils.mjs';
import { classifyChanges } from './analyze-staged.mjs';

export function writeGitNote(commitSha = 'HEAD', overrides = {}) {
  const sha = execGit(`rev-parse ${commitSha}`, { fallback: '' });
  if (!sha) {
    console.error(`[AI Note Writer] Invalid commit reference: ${commitSha}`);
    return null;
  }

  const shortSha = sha.substring(0, 7);

  // Parse commit info
  const rawInfo = execGit(`show -s --format="%H|%h|%P|%an|%ae|%cn|%ad|%s|%b" --date=iso ${sha}`, { fallback: '' });
  if (!rawInfo) {
    console.error(`[AI Note Writer] Failed to read commit details for: ${sha}`);
    return null;
  }

  const [fullSha, sSha, parentsRaw, author, authorEmail, committer, date, subject, body] = rawInfo.split('|');
  const parents = parentsRaw ? parentsRaw.trim().split(' ').filter(Boolean) : [];

  // Parse diff stats & status
  const rawStats = execGit(`show --numstat --format="" ${sha}`, { fallback: '' });
  let insertions = 0;
  let deletions = 0;
  const filesChanged = [];

  if (rawStats) {
    const lines = rawStats.split('\n').filter(Boolean);
    for (const l of lines) {
      const parts = l.split('\t');
      if (parts.length >= 3) {
        insertions += parseInt(parts[0], 10) || 0;
        deletions += parseInt(parts[1], 10) || 0;
        filesChanged.push(parts[2].trim());
      }
    }
  }

  const rawStatus = execGit(`show --name-status --format="" ${sha}`, { fallback: '' });
  const filesAdded = [];
  const filesDeleted = [];
  const filesRenamed = [];

  if (rawStatus) {
    const lines = rawStatus.split('\n').filter(Boolean);
    for (const l of lines) {
      const [status, ...fileParts] = l.split('\t');
      const file = fileParts.join('\t').trim();
      if (status.startsWith('A')) filesAdded.push(file);
      else if (status.startsWith('D')) filesDeleted.push(file);
      else if (status.startsWith('R')) filesRenamed.push(file);
    }
  }

  const { classification, source: classificationSource } = classifyChanges(filesChanged, subject);

  const impact = {
    routes: filesChanged.filter(f => f.includes('App.tsx') || f.includes('/pages/')),
    components: filesChanged.filter(f => f.includes('/components/')).map(f => f.split('/').pop().replace(/\.[^/.]+$/, '')),
    '3d': filesChanged.filter(f => f.includes('/3d/')),
    motion: filesChanged.filter(f => f.includes('/motion/') || f.includes('lenis')),
    design: filesChanged.filter(f => f.endsWith('.css') || f.includes('BrandIcons') || f.includes('tokens')),
    performance: filesChanged.filter(f => f.includes('3d') || f.includes('vite.config') || f.includes('lazy')),
    accessibility: filesChanged.filter(f => f.includes('accessibility') || f.includes('Modal') || f.includes('Terminal')),
    testing: filesChanged.filter(f => f.includes('.test.') || f.includes('.spec.') || f.startsWith('e2e/')),
  };

  const contextHashes = getContextHashes();

  const noteData = {
    schemaVersion: 1,
    commit: {
      sha,
      shortSha,
      parents,
      author: author || 'Ankit Kumar',
      authorEmail: authorEmail || 'ankit.developer@example.com',
      committer: committer || author || 'Ankit Kumar',
      date: date || new Date().toISOString(),
      subject: subject || '',
      body: (body || '').trim(),
    },
    repository: {
      branch: getCurrentBranch(),
      status: isWorktreeDirty() ? 'DIRTY' : 'CLEAN',
    },
    change: {
      classification,
      classificationSource,
      filesChanged,
      filesAdded,
      filesDeleted,
      filesRenamed,
      insertions,
      deletions,
    },
    impact,
    context: {
      contextSchemaVersion: '1.0.0',
      projectContextHash: contextHashes.PROJECT_CONTEXT || '',
      architectureHash: contextHashes.ARCHITECTURE || '',
      designSystemHash: contextHashes.DESIGN_SYSTEM || '',
      stateHash: contextHashes.PROJECT_STATE || '',
    },
    ai: {
      sessionId: process.env.AI_SESSION_ID || overrides.sessionId || null,
      tool: process.env.AI_TOOL || overrides.tool || 'Antigravity',
      model: process.env.AI_MODEL || overrides.model || 'Gemini Pro 2.5',
    },
    validation: {
      lint: overrides.lint !== undefined ? overrides.lint : null,
      typecheck: overrides.typecheck !== undefined ? overrides.typecheck : null,
      build: overrides.build !== undefined ? overrides.build : null,
      tests: overrides.tests !== undefined ? overrides.tests : null,
    },
  };

  const sanitized = sanitizeSecrets(noteData);
  const jsonString = JSON.stringify(sanitized, null, 2);

  // Write note to refs/notes/ai-context
  try {
    // Check if a note already exists
    const existingRaw = execGit(`notes --ref=ai-context show ${sha}`, { fallback: '' });
    if (existingRaw) {
      try {
        const existing = JSON.parse(existingRaw);
        // Merge records if multiple
        if (existing.records && Array.isArray(existing.records)) {
          sanitized.records = [...existing.records, noteData];
        }
      } catch {
        // overwrite cleanly if corrupted
      }
    }

    const payload = JSON.stringify(sanitized).replace(/"/g, '\\"');
    execGit(`notes --ref=ai-context add -f -m "${payload}" ${sha}`, { throwOnError: true });
    return sanitized;
  } catch (err) {
    console.error(`[AI Note Writer] Error attaching Git Note to ${sha}:`, err.message);
    return null;
  }
}

if (process.argv[1] && process.argv[1].endsWith('write-git-note.mjs')) {
  const target = process.argv[2] || 'HEAD';
  const res = writeGitNote(target);
  if (res) {
    console.log(`[AI Note Writer] Successfully wrote Git Note to ${res.commit.shortSha} in refs/notes/ai-context`);
  }
}
