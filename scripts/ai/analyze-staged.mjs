import { execGit, getContextHashes } from './utils.mjs';

export function classifyChanges(files, message = '') {
  let classification = 'REFACTOR';
  let source = 'path';

  if (message) {
    const lower = message.toLowerCase();
    if (lower.startsWith('feat') || lower.includes('add ')) classification = 'FEATURE';
    else if (lower.startsWith('fix') || lower.includes('bug')) classification = 'BUGFIX';
    else if (lower.startsWith('perf') || lower.includes('optimize')) classification = 'PERFORMANCE';
    else if (lower.startsWith('docs') || lower.includes('doc')) classification = 'DOCUMENTATION';
    else if (lower.startsWith('test') || lower.includes('spec')) classification = 'TEST';
    else if (lower.startsWith('style') || lower.includes('design') || lower.includes('ui')) classification = 'DESIGN';
    else if (lower.startsWith('chore') || lower.includes('deps')) classification = 'DEPENDENCY';
    source = 'message';
    return { classification, source };
  }

  const has3D = files.some(f => f.includes('/3d/') || f.includes('three'));
  const hasMotion = files.some(f => f.includes('/motion/') || f.includes('lenis'));
  const hasTests = files.some(f => f.includes('.test.') || f.includes('.spec.') || f.startsWith('e2e/'));
  const hasDocs = files.some(f => f.startsWith('docs/') || f.endsWith('.md'));
  const hasPkg = files.some(f => f === 'package.json' || f === 'package-lock.json');
  const hasStyles = files.some(f => f.endsWith('.css') || f.includes('/styles/'));

  if (has3D) classification = '3D';
  else if (hasMotion) classification = 'MOTION';
  else if (hasTests) classification = 'TEST';
  else if (hasDocs) classification = 'DOCUMENTATION';
  else if (hasPkg) classification = 'DEPENDENCY';
  else if (hasStyles) classification = 'DESIGN';

  return { classification, source };
}

export function analyzeStaged() {
  const nameOnly = execGit('diff --cached --name-only', { fallback: '' });
  const files = nameOnly ? nameOnly.split('\n').filter(Boolean) : [];

  const rawStat = execGit('diff --cached --numstat', { fallback: '' });
  let insertions = 0;
  let deletions = 0;
  const filesAdded = [];
  const filesDeleted = [];
  const filesRenamed = [];
  const filesChanged = [];

  if (rawStat) {
    const lines = rawStat.split('\n').filter(Boolean);
    for (const l of lines) {
      const parts = l.split('\t');
      if (parts.length >= 3) {
        insertions += parseInt(parts[0], 10) || 0;
        deletions += parseInt(parts[1], 10) || 0;
      }
    }
  }

  const statusRaw = execGit('diff --cached --name-status', { fallback: '' });
  if (statusRaw) {
    const lines = statusRaw.split('\n').filter(Boolean);
    for (const l of lines) {
      const [status, ...fileParts] = l.split('\t');
      const file = fileParts.join('\t');
      if (status.startsWith('A')) filesAdded.push(file);
      else if (status.startsWith('D')) filesDeleted.push(file);
      else if (status.startsWith('R')) filesRenamed.push(file);
      else filesChanged.push(file);
    }
  }

  const { classification, source } = classifyChanges(files);

  const impact = {
    routes: files.filter(f => f.includes('App.tsx') || f.includes('/pages/')),
    components: files.filter(f => f.includes('/components/')).map(f => f.split('/').pop().replace(/\.[^/.]+$/, '')),
    '3d': files.filter(f => f.includes('/3d/')),
    motion: files.filter(f => f.includes('/motion/') || f.includes('lenis')),
    design: files.filter(f => f.endsWith('.css') || f.includes('BrandIcons') || f.includes('tokens')),
    performance: files.filter(f => f.includes('3d') || f.includes('vite.config') || f.includes('lazy')),
    accessibility: files.filter(f => f.includes('accessibility') || f.includes('Modal') || f.includes('Terminal')),
    testing: files.filter(f => f.includes('.test.') || f.includes('.spec.') || f.startsWith('e2e/')),
  };

  return {
    files,
    filesAdded,
    filesDeleted,
    filesRenamed,
    filesChanged,
    insertions,
    deletions,
    classification,
    classificationSource: source,
    impact,
    contextHashes: getContextHashes(),
  };
}

if (process.argv[1] && process.argv[1].endsWith('analyze-staged.mjs')) {
  const result = analyzeStaged();
  console.log(JSON.stringify(result, null, 2));
}
