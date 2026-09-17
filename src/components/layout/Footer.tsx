import React from 'react';
import { ArrowUp } from 'lucide-react';
import { Magnetic } from '../motion/Magnetic';

interface FooterProps {
  onCursorHover: (hovered: boolean, label?: string, variant?: 'default' | 'project' | 'button' | 'link' | 'hidden') => void;
}

export const Footer: React.FC<FooterProps> = ({ onCursorHover }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-16 px-6 md:px-12 bg-[#030407] border-t border-[rgba(255,255,255,0.06)] select-none">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Large Editorial Statement */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-12 border-b border-[rgba(255,255,255,0.06)]">
          <div>
            <h3 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#F8FAFC]">
              LET'S BUILD SOMETHING <br />
              <span className="bg-gradient-to-r from-[#78AFFF] via-[#B7D7FF] to-[#38BDF8] bg-clip-text text-transparent">
                THAT MATTERS.
              </span>
            </h3>
          </div>

          <Magnetic strength={0.3}>
            <button
              onClick={scrollToTop}
              onMouseEnter={() => onCursorHover(true, 'TOP', 'button')}
              onMouseLeave={() => onCursorHover(false)}
              className="flex items-center space-x-2 px-5 py-3 rounded-xl bg-[#0A0D14] border border-[rgba(255,255,255,0.08)] hover:border-[#78AFFF] text-xs font-mono text-[#94A3B8] hover:text-[#F8FAFC] transition-all"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-4 h-4 text-[#78AFFF]" />
            </button>
          </Magnetic>
        </div>

        {/* Bottom Bar Metadata */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#475569]">
          <div className="flex items-center space-x-3 text-[#94A3B8]">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="font-bold text-[#F8FAFC]">ANKIT KUMAR</span>
            <span>/</span>
            <span>FULL-STACK & AI SYSTEMS ENGINEER</span>
          </div>

          <div className="flex items-center space-x-4">
            <span>© 2026 ANKIT KUMAR</span>
            <span>·</span>
            <span>BUILT WITH REACT 19 & THREE.JS</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
