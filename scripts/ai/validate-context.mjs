import path from 'path';
import fs from 'fs';
import { readJson } from './utils.mjs';

const ROOT_DIR = process.cwd();

export function validateContext() {
  console.log('[AI Context Validator] Validating project intelligence system integrity...');

  const requiredFiles = [
    'AGENTS.md',
    'CLAUDE.md',
    'GEMINI.md',
    'AI_BOOTSTRAP.md',
    '.cursor/rules/00-project-intelligence.mdc',
    '.github/copilot-instructions.md',
    '.ai/manifest.json',
    'docs/ai/PROJECT_CONTEXT.md',
    'docs/ai/PROJECT_STATE.md',
    'docs/ai/ARCHITECTURE.md',
    'docs/ai/DESIGN_SYSTEM.md',
    'docs/ai/ENGINEERING_RULES.md',
    'docs/ai/DECISIONS.md',
    'docs/ai/CURRENT_WORK.md',
    'docs/ai/KNOWN_ISSUES.md',
    'docs/ai/CHANGELOG.md',
    'docs/ai/GIT_HISTORY.md',
    'docs/ai/FILE_MAP.md',
    'docs/ai/DEPENDENCIES.md',
    'docs/ai/ROUTES.md',
    'docs/ai/ASSETS.md',
    'docs/ai/ENVIRONMENT.md',
    'docs/ai/TESTING.md',
    'docs/ai/PERFORMANCE.md',
    'docs/ai/AI_GAP_REPORT.md',
    'docs/ai/SESSION_LOG.md',
  ];

  let missing = [];
  for (const relPath of requiredFiles) {
    const full = path.join(ROOT_DIR, relPath);
    if (!fs.existsSync(full)) {
      missing.push(relPath);
    }
  }

  const manifest = readJson(path.join(ROOT_DIR, '.ai/manifest.json'), null);
  let manifestValid = true;
  if (!manifest || manifest.schemaVersion !== 1) {
    manifestValid = false;
  }

  console.log('\n=== VALIDATION RESULTS ===');
  if (missing.length === 0 && manifestValid) {
    console.log('✔ All 26 system files and adapters verified.');
    console.log('✔ Manifest schema v1 valid.');
    console.log('✔ Context status: HEALTHY (100% compliant)\n');
    return true;
  } else {
    if (missing.length > 0) {
      console.error('✘ Missing required system files:');
      missing.forEach(f => console.error(`  - ${f}`));
    }
    if (!manifestValid) {
      console.error('✘ Invalid manifest.json schema.');
    }
    console.error('\nValidation failed.');
    process.exitCode = 1;
    return false;
  }
}

if (process.argv[1] && process.argv[1].endsWith('validate-context.mjs')) {
  validateContext();
}
