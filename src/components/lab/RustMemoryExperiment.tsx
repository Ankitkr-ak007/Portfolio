import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle } from 'lucide-react';

export const RustMemoryExperiment: React.FC = () => {
  const [borrowState, setBorrowState] = useState<'immutable' | 'mutable' | 'conflict'>('immutable');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between font-mono text-xs text-[#9BA4B2]">
        <span>EXP-02 // RUST BORROW CHECKER & RAII LIFETIME MECHANICS</span>
        <span className="text-[#78AFFF]">COMPILE_TIME: ZERO-COST</span>
      </div>

      {/* Code Snippet Box */}
      <div className="p-4 rounded-xl bg-[#050609] border border-[rgba(255,255,255,0.08)] font-mono text-xs overflow-x-auto space-y-1 text-[#F5F7FA]">
        <div><span className="text-[#78AFFF]">fn</span> main() &#123;</div>
        <div className="pl-4"><span className="text-[#78AFFF]">let mut</span> data = String::from(<span className="text-emerald-400">"KALKI_VISION_CORE"</span>);</div>
        
        {borrowState === 'immutable' && (
          <>
            <div className="pl-4 text-[#9BA4B2]"><span className="text-[#78AFFF]">let</span> r1 = &amp;data; <span className="text-[#596170]">// Immutable borrow 1</span></div>
            <div className="pl-4 text-[#9BA4B2]"><span className="text-[#78AFFF]">let</span> r2 = &amp;data; <span className="text-[#596170]">// Immutable borrow 2 (ALLOWED)</span></div>
            <div className="pl-4 text-emerald-400">println!(<span className="text-emerald-300">"&#123;&#125;, &#123;&#125;"</span>, r1, r2);</div>
          </>
        )}

        {borrowState === 'mutable' && (
          <>
            <div className="pl-4 text-[#B7D7FF]"><span className="text-[#78AFFF]">let</span> m1 = &amp;<span className="text-[#78AFFF]">mut</span> data; <span className="text-[#596170]">// Exclusive mutable borrow</span></div>
            <div className="pl-4 text-[#B7D7FF]">m1.push_str(<span className="text-emerald-400">"_ACTIVE"</span>);</div>
            <div className="pl-4 text-emerald-400">println!(<span className="text-emerald-300">"&#123;&#125;"</span>, m1);</div>
          </>
        )}

        {borrowState === 'conflict' && (
          <>
            <div className="pl-4 text-[#9BA4B2]"><span className="text-[#78AFFF]">let</span> r1 = &amp;data;</div>
            <div className="pl-4 text-rose-400 font-bold"><span className="text-[#78AFFF]">let</span> m1 = &amp;<span className="text-[#78AFFF]">mut</span> data; <span className="text-rose-400">// ERROR[E0502]: cannot borrow `data` as mutable because it is also borrowed as immutable</span></div>
          </>
        )}

        <div>&#125;</div>
      </div>

      {/* Memory Status Callout */}
      <div className={`p-4 rounded-xl border font-mono text-xs flex items-center space-x-3 ${
        borrowState === 'conflict'
          ? 'bg-rose-950/30 border-rose-500/40 text-rose-300'
          : 'bg-[#10141B] border-[rgba(120,175,255,0.3)] text-[#B7D7FF]'
      }`}>
        {borrowState === 'conflict' ? (
          <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
        ) : (
          <ShieldCheck className="w-5 h-5 text-[#78AFFF] shrink-0" />
        )}
        <div>
          {borrowState === 'immutable' && 'Multiple immutable references (&T) permitted concurrently. Data read safety guaranteed.'}
          {borrowState === 'mutable' && 'Single exclusive mutable reference (&mut T) granted. Data races prevented at compile time.'}
          {borrowState === 'conflict' && 'COMPILER REJECTED: Borrow checker blocks aliasing + mutation to eliminate data races.'}
        </div>
      </div>

      {/* Selector Buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setBorrowState('immutable')}
          className={`px-4 py-2 rounded-lg font-mono text-xs border transition-all ${
            borrowState === 'immutable' ? 'bg-[#78AFFF] text-[#050609] border-[#78AFFF] font-bold' : 'bg-[#10141B] border-[rgba(255,255,255,0.08)] text-[#9BA4B2]'
          }`}
        >
          &amp;T (IMMUTABLE SHARED)
        </button>

        <button
          onClick={() => setBorrowState('mutable')}
          className={`px-4 py-2 rounded-lg font-mono text-xs border transition-all ${
            borrowState === 'mutable' ? 'bg-[#B7D7FF] text-[#050609] border-[#B7D7FF] font-bold' : 'bg-[#10141B] border-[rgba(255,255,255,0.08)] text-[#9BA4B2]'
          }`}
        >
          &amp;mut T (MUTABLE EXCLUSIVE)
        </button>

        <button
          onClick={() => setBorrowState('conflict')}
          className={`px-4 py-2 rounded-lg font-mono text-xs border transition-all ${
            borrowState === 'conflict' ? 'bg-rose-500 text-white border-rose-500 font-bold' : 'bg-[#10141B] border-[rgba(255,255,255,0.08)] text-[#9BA4B2]'
          }`}
        >
          TRIGGER BORROW CONFLICT
        </button>
      </div>
    </div>
  );
};
