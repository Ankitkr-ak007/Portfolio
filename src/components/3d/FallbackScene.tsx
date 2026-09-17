import React from 'react';

export const FallbackScene: React.FC = () => {
  return (
    <div className="relative w-full h-full min-h-[380px] flex items-center justify-center overflow-hidden">
      {/* Background glow */}
      <div className="absolute h-72 w-72 rounded-full bg-[rgba(120,175,255,0.08)] blur-3xl" />

      {/* Outer CSS Rotating Rings */}
      <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
        {/* Ring 1 */}
        <div className="absolute inset-0 rounded-full border border-[rgba(120,175,255,0.25)] border-dashed animate-[spin_30s_linear_infinite]" />
        
        {/* Ring 2 */}
        <div className="absolute inset-4 rounded-full border border-[rgba(183,215,255,0.15)] animate-[spin_20s_linear_infinite_reverse]" />

        {/* Central Core */}
        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-gradient-to-br from-[#10141B] via-[#0A0D12] to-[#050609] border border-[rgba(120,175,255,0.3)] shadow-[0_0_30px_rgba(120,175,255,0.2)] flex flex-col items-center justify-center transform rotate-45 backdrop-blur-md">
          <div className="transform -rotate-45 flex flex-col items-center space-y-2">
            <div className="h-3 w-3 rounded-full bg-[#78AFFF] animate-ping" />
            <span className="font-mono text-[10px] text-[#B7D7FF] tracking-widest uppercase font-semibold">
              SYSTEMS CORE
            </span>
            <span className="font-mono text-[9px] text-[#596170]">
              RUST / C++ / AI
            </span>
          </div>
        </div>

        {/* Floating Data Nodes */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-[#10141B] border border-[rgba(255,255,255,0.1)] rounded font-mono text-[9px] text-[#9BA4B2]">
          NODE // 01 [ACTIVE]
        </div>
        <div className="absolute bottom-4 right-4 px-2 py-1 bg-[#10141B] border border-[rgba(255,255,255,0.1)] rounded font-mono text-[9px] text-[#9BA4B2]">
          LATENCY &lt; 1ms
        </div>
        <div className="absolute bottom-4 left-4 px-2 py-1 bg-[#10141B] border border-[rgba(255,255,255,0.1)] rounded font-mono text-[9px] text-[#9BA4B2]">
          PARALLEL // DAG
        </div>
      </div>
    </div>
  );
};
