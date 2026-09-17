import path from 'path';
import { execGit, writeJson } from './utils.mjs';

const ROOT_DIR = process.cwd();

let commitArg = '';
const args = process.argv.slice(2);
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--commit' && args[i + 1]) {
    commitArg = args[i + 1];
    break;
  }
}

if (!commitArg) {
  commitArg = execGit('rev-parse HEAD', { fallback: 'HEAD' });
}

console.log(`\n=== RECONSTRUCTING HISTORICAL INTELLIGENCE FOR COMMIT: ${commitArg} ===\n`);

const commitInfo = execGit(`show --stat ${commitArg}`, { fallback: 'Commit not found' });
const commitLog = execGit(`log -1 --pretty=format:"%H|%an|%ad|%s" ${commitArg}`, { fallback: '' });

if (!commitLog) {
  console.error(`Error: Commit ${commitArg} not found in repository history.`);
  process.exit(1);
}

const [sha, author, date, subject] = commitLog.split('|');

console.log(`SHA:         ${sha}`);
console.log(`Author:      ${author}`);
console.log(`Date:        ${date}`);
console.log(`Subject:     ${subject}`);
console.log('\nModified Files & Stat:');
console.log(commitInfo);

// Save snapshot to .ai/snapshots/
const snapshotPath = path.join(ROOT_DIR, `.ai/snapshots/${sha.substring(0, 7)}.json`);
writeJson(snapshotPath, {
  sha,
  author,
  date,
  subject,
  stat: commitInfo,
  reconstructedAt: new Date().toISOString(),
});

console.log(`\n✔ Snapshot saved to .ai/snapshots/${sha.substring(0, 7)}.json`);
