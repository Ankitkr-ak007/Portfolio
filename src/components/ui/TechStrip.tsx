import React from 'react';

export const TechStrip: React.FC = () => {
  const items = [
    'RUST',
    'C++',
    'TYPESCRIPT',
    'REACT 19',
    'AI AGENTS',
    'GOOGLE GEMINI API',
    'KALKI VISION',
    'SYSTEM DESIGN',
    'LOW-LATENCY BACKEND',
    'DOCKER',
    'POSTGRESQL',
    'WEBGL / THREE.JS',
  ];

  return (
    <div className="w-full py-4 bg-[#0A0D12] border-y border-[rgba(255,255,255,0.08)] overflow-hidden select-none">
      <div className="flex w-max animate-[marquee_25s_linear_infinite] hover:[animation-play-state:paused]">
        {[...items, ...items, ...items].map((tech, index) => (
          <div
            key={index}
            className="flex items-center space-x-6 mx-4 font-mono text-xs tracking-widest text-[#9BA4B2] hover:text-[#78AFFF] transition-colors"
          >
            <span className="font-semibold">{tech}</span>
            <span className="text-[#596170] text-sm">/</span>
          </div>
        ))}
      </div>
    </div>
  );
};
