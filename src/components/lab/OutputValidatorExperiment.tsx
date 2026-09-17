import React, { useState } from 'react';
import { RefreshCw, CheckCircle2 } from 'lucide-react';

export const OutputValidatorExperiment: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'parsing' | 'invalid' | 'repaired'>('idle');

  const handleSimulate = () => {
    setStatus('parsing');
    setTimeout(() => {
      setStatus('invalid');
      setTimeout(() => {
        setStatus('repaired');
      }, 1000);
    }, 800);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between font-mono text-xs text-[#9BA4B2]">
        <span>EXP-04 // SELF-HEALING DETERMINISTIC SCHEMA REPAIR LOOP</span>
        <span className="text-[#78AFFF]">ENGINE: ZOD / SCHEMAS</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Raw Output Box */}
        <div className="p-4 rounded-xl bg-[#050609] border border-[rgba(255,255,255,0.08)] font-mono text-xs space-y-2">
          <div className="text-[10px] text-[#596170] uppercase">01 // RAW MODEL OUTPUT (MALFORMED)</div>
          <div className="text-rose-400 bg-rose-950/20 p-3 rounded border border-rose-900/40">
            <code>&#123; "action": "deploy", "target": null &#125;</code>
          </div>
          <div className="text-[10px] text-rose-400">
            {status === 'invalid' || status === 'repaired' ? '❌ ZOD ERROR: Required key "target" cannot be null' : 'Awaiting verification...'}
          </div>
        </div>

        {/* Repaired Output Box */}
        <div className="p-4 rounded-xl bg-[#050609] border border-[rgba(255,255,255,0.08)] font-mono text-xs space-y-2">
          <div className="text-[10px] text-[#596170] uppercase">02 // AUTO-REPAIRED PERSISTED JSON</div>
          <div className={`p-3 rounded border transition-all ${
            status === 'repaired' ? 'text-emerald-400 bg-emerald-950/20 border-emerald-500/40' : 'text-[#596170] bg-[#10141B]'
          }`}>
            <code>{status === 'repaired' ? '{\n  "action": "deploy",\n  "target": "kalki-core-v1",\n  "status": "VALIDATED"\n}' : 'Waiting for repair loop...'}</code>
          </div>
          <div className="text-[10px] text-emerald-400 flex items-center space-x-1">
            {status === 'repaired' && (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>SCHEMA VERIFIED & PERSISTED (0ms OVERHEAD)</span>
              </>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={handleSimulate}
        disabled={status === 'parsing' || status === 'invalid'}
        className="px-5 py-2.5 rounded-lg bg-[#78AFFF] text-[#050609] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#B7D7FF] disabled:opacity-50 transition-all flex items-center space-x-2"
      >
        <RefreshCw className={`w-4 h-4 ${status === 'parsing' || status === 'invalid' ? 'animate-spin' : ''}`} />
        <span>TEST SCHEMA REPAIR LOOP</span>
      </button>
    </div>
  );
};
