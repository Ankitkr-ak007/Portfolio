import React from 'react';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  onCursorHover: (hovered: boolean, label?: string, variant?: 'default' | 'project' | 'button' | 'link' | 'hidden') => void;
}

export const Footer: React.FC<FooterProps> = ({ onCursorHover }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 px-6 md:px-12 bg-[#050609] border-t border-[rgba(255,255,255,0.08)] select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs">
        
        {/* Left */}
        <div className="flex items-center space-x-3 text-[#9BA4B2]">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span className="font-bold text-[#F5F7FA]">ANKIT KUMAR</span>
          <span className="text-[#596170]">/</span>
          <span className="text-[#596170]">ENGINEER · BUILDER · EXPLORER</span>
        </div>

        {/* Center */}
        <div className="text-[#596170] flex items-center space-x-2">
          <span>SYSTEM ONLINE</span>
          <span>·</span>
          <span>© 2026 ANKIT KUMAR</span>
        </div>

        {/* Right: Back to Top */}
        <button
          onClick={scrollToTop}
          onMouseEnter={() => onCursorHover(true, 'TOP', 'button')}
          onMouseLeave={() => onCursorHover(false)}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-[#10141B] border border-[rgba(255,255,255,0.08)] hover:border-[#78AFFF] text-[#9BA4B2] hover:text-[#F5F7FA] transition-all"
        >
          <span>BACK TO TOP</span>
          <ArrowUp className="w-3.5 h-3.5 text-[#78AFFF]" />
        </button>

      </div>
    </footer>
  );
};
