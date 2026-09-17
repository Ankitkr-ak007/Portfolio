import fs from 'fs';
import path from 'path';
import { execGit } from './utils.mjs';

const ROOT_DIR = process.cwd();
const HOOKS = ['pre-commit', 'post-commit', 'post-merge', 'post-checkout', 'pre-push'];

export function checkHooksStatus() {
  const hooksPath = execGit('config core.hooksPath', { fallback: 'NOT CONFIGURED' });
  const isHooksPathValid = hooksPath === '.githooks' || hooksPath.endsWith('.githooks');

  console.log(`
AI GIT HOOKS STATUS

core.hooksPath:
${hooksPath}
`);

  let allInstalled = isHooksPathValid;

  for (const hook of HOOKS) {
    const hookFile = path.join(ROOT_DIR, '.githooks', hook);
    const exists = fs.existsSync(hookFile);
    if (!exists) allInstalled = false;
    console.log(`${hook}:
${exists ? 'INSTALLED' : 'MISSING'}\n`);
  }

  const status = allInstalled ? 'HEALTHY' : 'DEGRADED (Run: npm run ai:install-hooks)';
  console.log(`STATUS:
${status}
`);

  return allInstalled;
}

if (process.argv[1] && process.argv[1].endsWith('hooks-status.mjs')) {
  checkHooksStatus();
}
