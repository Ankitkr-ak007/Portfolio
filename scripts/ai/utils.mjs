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
  } catch {
    if (options.fallback !== undefined) return options.fallback;
    return '';
  }
}

export function getFileHash(filePath) {
  if (!fs.existsSync(filePath)) return '';
  const buffer = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(buffer).digest('hex');
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
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf-8');
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

export function scanDirectory(dirPath, ignoreList = ['node_modules', '.git', 'dist', 'build', '.ai/cache']) {
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
