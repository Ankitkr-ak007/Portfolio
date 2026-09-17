import React from 'react';
import { ArrowUp } from 'lucide-react';
import { Magnetic } from '../motion/Magnetic';

interface FooterProps {
  onCursorHover: (hovered: boolean, label?: string, variant?: 'default' | 'project' | 'button' | 'link' | '3d' | 'drag' | 'hidden') => void;
}

export const Footer: React.FC<FooterProps> = ({ onCursorHover }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-20 px-6 md:px-12 bg-[#030407] border-t border-[rgba(255,255,255,0.06)] select-none relative overflow-hidden">
      {/* Luminous Animated Signal Line to Close the Page */}
      <div className="relative w-full h-[1px] bg-[rgba(255,255,255,0.07)] overflow-hidden mb-16">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#78AFFF] to-transparent w-48 animate-signal" />
      </div>

      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Editorial Brand Statement */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[rgba(255,255,255,0.06)]">
          <div className="space-y-2">
            <h3 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#F8FAFC]">
              ANKIT KUMAR
            </h3>
            <p className="font-mono text-xs sm:text-sm text-[#78AFFF] uppercase tracking-widest">
              ENGINEER · BUILDER · EXPLORER
            </p>
          </div>

          <Magnetic strength={0.3}>
            <button
              onClick={scrollToTop}
              onMouseEnter={() => onCursorHover(true, 'TOP', 'button')}
              onMouseLeave={() => onCursorHover(false)}
              className="flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-[#0A0D14] border border-[rgba(255,255,255,0.08)] hover:border-[#78AFFF] text-xs font-mono font-bold text-[#F8FAFC] hover:text-[#78AFFF] transition-all"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-4 h-4 text-[#78AFFF]" />
            </button>
          </Magnetic>
        </div>

        {/* Bottom Bar Metadata */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#475569]">
          <div className="flex items-center space-x-2 text-[#94A3B8]">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span>PORTFOLIO SYSTEM ONLINE</span>
          </div>

          <div className="flex items-center space-x-4 text-[#94A3B8]">
            <span>© 2026 ANKIT KUMAR</span>
            <span>·</span>
            <span>RUST / TS / THREE.JS</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
