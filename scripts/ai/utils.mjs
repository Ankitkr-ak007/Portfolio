import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { execSync } from 'child_process';

const ROOT_DIR = process.cwd();

export function execGit(cmd, options = {}) {
  try {
    return execSync(`git ${cmd}`, {
      cwd: options.cwd || ROOT_DIR,
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe'],
      ...options,
    }).trim();
  } catch (err) {
    if (options.throwOnError) throw err;
    if (options.fallback !== undefined) return options.fallback;
    return '';
  }
}

export function getFileHash(filePath) {
  if (!fs.existsSync(filePath)) return '';
  const buffer = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(buffer).digest('hex');
}

export function getStringHash(str) {
  return crypto.createHash('sha256').update(str || '').digest('hex');
}

export function readJson(filePath, defaultValue = null) {
  try {
    if (!fs.existsSync(filePath)) return defaultValue;
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch {
    return defaultValue;
  }
}

export function writeJson(filePath, data) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const sanitized = sanitizeSecrets(data);
  fs.writeFileSync(filePath, JSON.stringify(sanitized, null, 2) + '\n', 'utf-8');
}

export function readMarkdown(filePath) {
  if (!fs.existsSync(filePath)) return '';
  return fs.readFileSync(filePath, 'utf-8');
}

export function writeMarkdown(filePath, content) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, content, 'utf-8');
}

export function sanitizeSecrets(input) {
  if (typeof input === 'string') {
    return input
      .replace(/sk-[a-zA-Z0-9_-]{20,}/g, '[REDACTED_SECRET]')
      .replace(/AIza[0-9A-Za-z-_]{35}/g, '[REDACTED_API_KEY]')
      .replace(/ghp_[a-zA-Z0-9]{36}/g, '[REDACTED_GITHUB_TOKEN]')
      .replace(/github_pat_[a-zA-Z0-9_]{40,}/g, '[REDACTED_GITHUB_PAT]')
      .replace(/(Bearer\s+)[a-zA-Z0-9._-]{20,}/gi, '$1[REDACTED_TOKEN]')
      .replace(/(password|secret|token|api[_-]?key)\s*[:=]\s*["'][^"']+["']/gi, '$1="[REDACTED]"');
  }
  if (Array.isArray(input)) {
    return input.map(item => sanitizeSecrets(item));
  }
  if (input !== null && typeof input === 'object') {
    const output = {};
    for (const [key, value] of Object.entries(input)) {
      if (/password|secret|token|apikey|api_key|auth/i.test(key) && typeof value === 'string') {
        output[key] = '[REDACTED]';
      } else {
        output[key] = sanitizeSecrets(value);
      }
    }
    return output;
  }
  return input;
}

export function getRootCommit() {
  const roots = execGit('rev-list --max-parents=0 HEAD', { fallback: '' });
  if (roots) {
    const list = roots.split('\n').filter(Boolean);
    return list[0] || 'UNKNOWN';
  }
  return 'UNKNOWN';
}

export function getHeadCommit() {
  return execGit('rev-parse HEAD', { fallback: 'UNKNOWN' });
}

export function getShortHead() {
  return execGit('rev-parse --short HEAD', { fallback: 'UNKNOWN' });
}

export function getCurrentBranch() {
  return execGit('rev-parse --abbrev-ref HEAD', { fallback: 'main' });
}

export function isWorktreeDirty() {
  const status = execGit('status --porcelain', { fallback: '' });
  return status.trim().length > 0;
}

export function getContextHashes() {
  const docs = [
    'docs/ai/PROJECT_CONTEXT.md',
    'docs/ai/ARCHITECTURE.md',
    'docs/ai/DESIGN_SYSTEM.md',
    'docs/ai/ENGINEERING_RULES.md',
    'docs/ai/PROJECT_STATE.md',
  ];
  const hashes = {};
  for (const doc of docs) {
    const full = path.join(ROOT_DIR, doc);
    const key = path.basename(doc, '.md');
    hashes[key] = getFileHash(full);
  }
  return hashes;
}

export function replaceGeneratedSection(fullContent, newGeneratedBlock) {
  const beginMarker = '<!-- BEGIN GENERATED -->';
  const endMarker = '<!-- END GENERATED -->';
  if (!fullContent.includes(beginMarker) || !fullContent.includes(endMarker)) {
    return fullContent;
  }
  const regex = new RegExp(`${beginMarker}[\\s\\S]*?${endMarker}`, 'g');
  return fullContent.replace(regex, `${beginMarker}\n${newGeneratedBlock.trim()}\n${endMarker}`);
}

export function preserveHumanSections(existingContent, newGeneratedContent) {
  if (!existingContent) return newGeneratedContent;

  const humanBlocks = [];
  const regex = /<!-- BEGIN HUMAN -->([\s\S]*?)<!-- END HUMAN -->/g;
  let match;
  while ((match = regex.exec(existingContent)) !== null) {
    humanBlocks.push(match[0]);
  }

  if (humanBlocks.length === 0) {
    return newGeneratedContent;
  }

  let result = newGeneratedContent;
  let index = 0;
  result = result.replace(/<!-- BEGIN HUMAN -->([\s\S]*?)<!-- END HUMAN -->/g, () => {
    const block = humanBlocks[index] || '<!-- BEGIN HUMAN -->\n<!-- END HUMAN -->';
    index++;
    return block;
  });

  return result;
}

export function isStrictMode() {
  return process.env.AI_STRICT === '1' || process.env.AI_STRICT === 'true';
}

export function scanDirectory(dirPath, ignoreList = ['node_modules', '.git', 'dist', 'build', '.ai/cache', '.ai/runtime']) {
  const results = [];
  if (!fs.existsSync(dirPath)) return results;

  function walk(currentDir) {
    const files = fs.readdirSync(currentDir);
    for (const file of files) {
      const fullPath = path.join(currentDir, file);
      const relPath = path.relative(ROOT_DIR, fullPath).replace(/\\/g, '/');

      if (ignoreList.some(ignore => relPath.startsWith(ignore) || file === ignore)) {
        continue;
      }

      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        walk(fullPath);
      } else {
        results.push({
          path: relPath,
          size: stat.size,
          mtime: stat.mtime.toISOString(),
          hash: getFileHash(fullPath),
        });
      }
    }
  }

  walk(dirPath);
  return results;
}
