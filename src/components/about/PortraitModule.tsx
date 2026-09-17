import React from 'react';

export const PortraitModule: React.FC = () => {
  return (
    <div className="relative w-full h-[420px] sm:h-[480px] rounded-2xl bg-[#0A0D12] border border-[rgba(255,255,255,0.08)] overflow-hidden flex items-center justify-center select-none shadow-[0_4px_40px_rgba(0,0,0,0.6)]">
      {/* Background Oversized Typography */}
      <div className="absolute inset-0 flex items-center justify-center font-black text-8xl sm:text-9xl text-[#10141B] tracking-tighter uppercase pointer-events-none">
        ANKIT
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none" />

      {/* Frame Lines */}
      <div className="absolute top-4 left-4 right-4 bottom-4 border border-[rgba(120,175,255,0.15)] rounded-xl pointer-events-none" />

      {/* Technical Coordinates Metadata */}
      <div className="absolute top-8 left-8 font-mono text-[10px] text-[#78AFFF] uppercase">
        ID // AK_PORTRAIT_2026
      </div>
      <div className="absolute top-8 right-8 font-mono text-[10px] text-[#596170]">
        28.6139° N, 77.2090° E
      </div>

      {/* Portrait Placeholder Avatar */}
      <div className="relative z-10 flex flex-col items-center space-y-4">
        <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-[#10141B] via-[#0A0D12] to-[#050609] border-2 border-[#78AFFF] shadow-[0_0_30px_rgba(120,175,255,0.3)] flex items-center justify-center">
          <span className="font-mono text-3xl sm:text-4xl font-black text-[#F5F7FA]">
            AK
          </span>
        </div>

        <div className="font-mono text-xs text-[#B7D7FF] font-semibold tracking-widest uppercase">
          ANKIT KUMAR
        </div>
        <div className="font-mono text-[10px] text-[#596170]">
          B.TECH CS · FULL-STACK · AI BUILDER
        </div>
      </div>

      {/* Bottom Telemetry */}
      <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between font-mono text-[10px] text-[#596170]">
        <span>STATUS: ACTIVE</span>
        <span>KALKI VISION // GEMINI 2026</span>
      </div>
    </div>
  );
};
