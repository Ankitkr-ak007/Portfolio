import { execGit } from './utils.mjs';
import { classifyChanges } from './analyze-staged.mjs';

export function analyzeDiff(oldRev, newRev) {
  if (!oldRev || !newRev) {
    console.error('Usage: npm run ai:diff -- <old_commit> <new_commit>');
    return;
  }

  const oldSha = execGit(`rev-parse ${oldRev}`, { fallback: '' });
  const newSha = execGit(`rev-parse ${newRev}`, { fallback: '' });

  if (!oldSha || !newSha) {
    console.error(`[AI Diff] Invalid commit references: ${oldRev}..${newRev}`);
    return;
  }

  const rawStatus = execGit(`diff --name-status ${oldSha} ${newSha}`, { fallback: '' });
  const filesAdded = [];
  const filesDeleted = [];
  const filesModified = [];
  const filesRenamed = [];
  const allFiles = [];

  if (rawStatus) {
    const lines = rawStatus.split('\n').filter(Boolean);
    for (const l of lines) {
      const [status, ...parts] = l.split('\t');
      const file = parts.join('\t').trim();
      allFiles.push(file);
      if (status.startsWith('A')) filesAdded.push(file);
      else if (status.startsWith('D')) filesDeleted.push(file);
      else if (status.startsWith('R')) filesRenamed.push(file);
      else filesModified.push(file);
    }
  }

  const { classification } = classifyChanges(allFiles);

  const designImpact = allFiles.filter(f => f.endsWith('.css') || f.includes('tokens') || f.includes('BrandIcons'));
  const motionImpact = allFiles.filter(f => f.includes('/motion/') || f.includes('lenis'));
  const threeImpact = allFiles.filter(f => f.includes('/3d/'));
  const archImpact = allFiles.filter(f => f.includes('App.tsx') || f.includes('/overlays/') || f.includes('/data/'));
  const perfImpact = allFiles.filter(f => f.includes('3d') || f.includes('vite.config') || f.includes('lazy'));
  const testImpact = allFiles.filter(f => f.includes('.test.') || f.includes('.spec.') || f.startsWith('e2e/'));

  const docsToReview = [];
  if (designImpact.length > 0) docsToReview.push('docs/ai/DESIGN_SYSTEM.md');
  if (threeImpact.length > 0 || archImpact.length > 0) docsToReview.push('docs/ai/ARCHITECTURE.md');
  if (perfImpact.length > 0) docsToReview.push('docs/ai/PERFORMANCE.md');
  if (testImpact.length > 0) docsToReview.push('docs/ai/TESTING.md');

  console.log(`
╭─────────────────────────────────────────────────────────────╮
│                  AI COMMIT IMPACT DIFF                      │
╰─────────────────────────────────────────────────────────────╯

RANGE:           ${oldSha.substring(0, 7)} .. ${newSha.substring(0, 7)}
CLASSIFICATION:  ${classification}

FILES SUMMARY:
  Total Changed: ${allFiles.length}
  Added:         ${filesAdded.length}
  Modified:      ${filesModified.length}
  Deleted:       ${filesDeleted.length}
  Renamed:       ${filesRenamed.length}

SYSTEM IMPACT:
  Design Tokens/CSS:     ${designImpact.length > 0 ? designImpact.join(', ') : 'None'}
  Motion & Animation:    ${motionImpact.length > 0 ? motionImpact.join(', ') : 'None'}
  3D WebGL Engine:       ${threeImpact.length > 0 ? threeImpact.join(', ') : 'None'}
  Architecture:          ${archImpact.length > 0 ? archImpact.join(', ') : 'None'}
  Performance:           ${perfImpact.length > 0 ? perfImpact.join(', ') : 'None'}
  Test Suites:           ${testImpact.length > 0 ? testImpact.join(', ') : 'None'}

MEMORY & DOCUMENTATION IMPACT:
  Docs Requiring Review: ${docsToReview.length > 0 ? docsToReview.join(', ') : 'None (Up-to-date)'}
`);
}

const args = process.argv.slice(2);
if (args.length >= 2) {
  analyzeDiff(args[0], args[1]);
} else if (process.argv[1] && process.argv[1].endsWith('diff.mjs')) {
  console.log('Usage: npm run ai:diff -- <old_commit> <new_commit>');
}
