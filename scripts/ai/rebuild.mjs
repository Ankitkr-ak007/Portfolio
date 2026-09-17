import { syncContext } from './sync-context.mjs';
import { repairAiMemory } from './repair.mjs';
import { validateContext } from './validate-context.mjs';
import { checkAiHealth } from './health.mjs';

export function rebuildAiSystem() {
  console.log('\n========================================');
  console.log('      FULL AI SYSTEM RECONSTRUCTION     ');
  console.log('========================================\n');

  syncContext();
  repairAiMemory();
  validateContext();
  checkAiHealth();

  console.log('\n✓ Full AI system reconstruction complete.\n');
}

if (process.argv[1] && process.argv[1].endsWith('rebuild.mjs')) {
  rebuildAiSystem();
}
