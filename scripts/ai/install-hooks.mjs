import fs from 'fs';
import path from 'path';
import { execGit } from './utils.mjs';

const ROOT_DIR = process.cwd();
const HOOKS_DIR = path.join(ROOT_DIR, '.githooks');

const HOOKS = [
  {
    name: 'pre-commit',
    content: `#!/usr/bin/env sh
# Event-driven AI memory pre-commit trigger
node scripts/ai/git-event.mjs pre-commit
`,
  },
  {
    name: 'post-commit',
    content: `#!/usr/bin/env sh
# Event-driven AI memory post-commit trigger
node scripts/ai/git-event.mjs post-commit
`,
  },
  {
    name: 'post-merge',
    content: `#!/usr/bin/env sh
# Event-driven AI memory post-merge trigger
node scripts/ai/git-event.mjs post-merge
`,
  },
  {
    name: 'post-checkout',
    content: `#!/usr/bin/env sh
# Event-driven AI memory post-checkout trigger
node scripts/ai/git-event.mjs post-checkout
`,
  },
  {
    name: 'pre-push',
    content: `#!/usr/bin/env sh
# Event-driven AI memory pre-push validation
node scripts/ai/git-event.mjs pre-push
`,
  },
];

export function installHooks() {
  console.log('\n========================================');
  console.log('   INSTALLING AI EVENT-DRIVEN HOOKS     ');
  console.log('========================================\n');

  if (!fs.existsSync(HOOKS_DIR)) {
    fs.mkdirSync(HOOKS_DIR, { recursive: true });
  }

  for (const hook of HOOKS) {
    const hookPath = path.join(HOOKS_DIR, hook.name);
    fs.writeFileSync(hookPath, hook.content.replace(/\r\n/g, '\n'), {
      encoding: 'utf-8',
      mode: 0o755,
    });
    console.log(`✓ Installed hook: .githooks/${hook.name}`);
  }

  // Configure git core.hooksPath
  try {
    execGit('config core.hooksPath .githooks', { throwOnError: true });
    const currentHooksPath = execGit('config core.hooksPath', { fallback: '' });
    console.log(`\n✓ Git configured: core.hooksPath = ${currentHooksPath}`);
    console.log('✓ AI Event hooks active.\n');
  } catch (err) {
    console.error(`\n❌ Failed to configure core.hooksPath: ${err.message}`);
  }
}

if (process.argv[1] && process.argv[1].endsWith('install-hooks.mjs')) {
  installHooks();
}
