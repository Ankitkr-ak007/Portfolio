import React from 'react';
import { BrandIcon } from './BrandIcons';

export const TechStrip: React.FC = () => {
  const technologies = [
    { name: 'Rust', id: 'rust' },
    { name: 'C++', id: 'cpp' },
    { name: 'TypeScript', id: 'typescript' },
    { name: 'React 19', id: 'react' },
    { name: 'Google Gemini API', id: 'gemini' },
    { name: 'Docker', id: 'docker' },
    { name: 'Three.js / WebGL', id: 'threejs' },
    { name: 'Node.js', id: 'nodejs' },
    { name: 'Tailwind CSS', id: 'tailwind' },
    { name: 'Motion', id: 'motion' },
    { name: 'GitHub', id: 'github' },
  ];

  return (
    <section aria-label="Technologies and Frameworks" className="w-full py-5 bg-[#0A0D14] border-y border-[rgba(255,255,255,0.06)] overflow-hidden select-none">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]">
        {[...technologies, ...technologies, ...technologies, ...technologies].map((tech, index) => (
          <div
            key={index}
            className="flex items-center space-x-3 mx-6 font-mono text-xs tracking-wider text-[#94A3B8] hover:text-[#78AFFF] transition-colors"
          >
            <BrandIcon name={tech.id} className="w-4 h-4 text-[#78AFFF]" />
            <span className="font-semibold">{tech.name}</span>
            <span className="text-[#334155] ml-4">/</span>
          </div>
        ))}
      </div>
    </section>
  );
};
