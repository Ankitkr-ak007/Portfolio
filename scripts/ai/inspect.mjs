import path from 'path';
import { readMarkdown } from './utils.mjs';

const ROOT_DIR = process.cwd();
const topic = process.argv[2] ? process.argv[2].toLowerCase() : 'all';

const topicMap = {
  context: 'docs/ai/PROJECT_CONTEXT.md',
  state: 'docs/ai/PROJECT_STATE.md',
  architecture: 'docs/ai/ARCHITECTURE.md',
  design: 'docs/ai/DESIGN_SYSTEM.md',
  rules: 'docs/ai/ENGINEERING_RULES.md',
  decisions: 'docs/ai/DECISIONS.md',
  issues: 'docs/ai/KNOWN_ISSUES.md',
  git: 'docs/ai/GIT_HISTORY.md',
  files: 'docs/ai/FILE_MAP.md',
  routes: 'docs/ai/ROUTES.md',
  dependencies: 'docs/ai/DEPENDENCIES.md',
  assets: 'docs/ai/ASSETS.md',
  testing: 'docs/ai/TESTING.md',
  performance: 'docs/ai/PERFORMANCE.md',
  gaps: 'docs/ai/AI_GAP_REPORT.md',
  changelog: 'docs/ai/CHANGELOG.md',
  session: 'docs/ai/SESSION_LOG.md',
};

if (topic === 'all' || !topicMap[topic]) {
  console.log(`
=== ANKIT PORTFOLIO REPOSITORY INSPECTOR ===

Usage: npm run ai:inspect <topic>

Available Topics:
  - context      (Identity & Philosophy)
  - state        (Current Branch & Runtime State)
  - architecture (System & 3D Architecture)
  - design       (Design System & Token Map)
  - rules        (Engineering Rules & Guidelines)
  - decisions    (Architecture Decision Records)
  - issues       (Known & Resolved Issues)
  - git          (Commit History & Branch Graph)
  - files        (File Index & Purpose Map)
  - routes       (Route & Component Index)
  - dependencies (Package Inventory)
  - assets       (Assets & Texture Audit)
  - testing      (Test Framework & Guidelines)
  - performance  (Performance & Frame Budgets)
  - gaps         (TODOs & Context Drift Audit)
  - changelog    (Development Story)
  - session      (Session History)
`);
} else {
  const relPath = topicMap[topic];
  const content = readMarkdown(path.join(ROOT_DIR, relPath));
  console.log(`\n=== INSPECTING: ${relPath} ===\n`);
  console.log(content);
}
