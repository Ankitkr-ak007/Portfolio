import React from 'react';
import { motion } from 'motion/react';
import { Cpu, Zap, ShieldCheck, Terminal as TerminalIcon } from 'lucide-react';
import { SystemsCoreCanvas } from '../../3d/SystemsCore/SystemsCoreCanvas';
import { Magnetic } from '../motion/Magnetic';

interface HeroProps {
  onCursorHover: (hovered: boolean, label?: string, variant?: 'default' | 'project' | 'button' | 'link' | '3d' | 'drag' | 'hidden') => void;
  onOpenTerminal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCursorHover, onOpenTerminal }) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen pt-32 pb-16 flex flex-col justify-between overflow-hidden bg-[#030407]">
      {/* Subtle Background Radial Atmosphere & Engineering Grid */}
      <div className="absolute inset-0 bg-tech-grid opacity-35 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-[radial-gradient(ellipse_at_center,rgba(120,175,255,0.07)_0%,transparent_70%)] pointer-events-none" />

      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 my-auto">
        
        {/* Left Column: Headline & Content */}
        <div className="lg:col-span-7 flex flex-col space-y-8">
          
          {/* Badge & Metadata Pill */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap items-center gap-3"
          >
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[rgba(16,20,30,0.85)] border border-[rgba(120,175,255,0.25)] shadow-[0_0_15px_rgba(120,175,255,0.12)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#78AFFF] animate-ping" />
              <span className="font-mono text-[11px] font-semibold text-[#B7D7FF] tracking-wider uppercase">
                ANKIT KUMAR // ENGINEERING × AI
              </span>
            </div>

            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#0A0D14] border border-[rgba(255,255,255,0.07)] font-mono text-[11px] text-[#94A3B8]">
              <Cpu className="w-3 h-3 text-[#78AFFF]" />
              <span>GEMINI STUDENT AMBASSADOR 2026</span>
            </div>
          </motion.div>

          {/* Main Enormous Editorial Headline */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-1"
          >
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter uppercase leading-[0.96] text-[#F8FAFC]">
              I BUILD SYSTEMS <br />
              <span className="bg-gradient-to-r from-[#F8FAFC] via-[#78AFFF] to-[#B7D7FF] bg-clip-text text-transparent">
                THAT TURN COMPLEXITY
              </span> <br />
              INTO SOFTWARE.
            </h1>
          </motion.div>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-lg text-[#94A3B8] font-normal leading-relaxed max-w-2xl"
          >
            Engineering reliable operational infrastructure at the intersection of low-latency systems in Rust & C++, multi-agent AI orchestration, and deterministic software architecture.
          </motion.p>

          {/* Conceptual Tech Stack Strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="flex flex-wrap gap-2 pt-1 font-mono text-xs text-[#94A3B8]"
          >
            {['FULL-STACK', 'RUST', 'C++', 'AI SYSTEMS'].map((item) => (
              <span key={item} className="px-3 py-1 rounded-md bg-[#0A0D14] border border-[rgba(255,255,255,0.06)] uppercase tracking-wider text-[11px]">
                {item}
              </span>
            ))}
          </motion.div>

          {/* Small Technical Metadata */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="grid grid-cols-3 gap-3 pt-2"
          >
            <div className="p-3 rounded-xl bg-[rgba(16,20,30,0.6)] border border-[rgba(255,255,255,0.06)] font-mono">
              <div className="text-[10px] text-[#475569] uppercase tracking-wider">IDENTIFIER</div>
              <div className="text-xs text-[#F8FAFC] font-semibold mt-0.5">SYS / 001</div>
            </div>
            <div className="p-3 rounded-xl bg-[rgba(16,20,30,0.6)] border border-[rgba(255,255,255,0.06)] font-mono">
              <div className="text-[10px] text-[#475569] uppercase tracking-wider">ARCHITECTURE</div>
              <div className="text-xs text-[#78AFFF] font-semibold mt-0.5">ARCH / ACTIVE</div>
            </div>
            <div className="p-3 rounded-xl bg-[rgba(16,20,30,0.6)] border border-[rgba(255,255,255,0.06)] font-mono">
              <div className="text-[10px] text-[#475569] uppercase tracking-wider">STATUS</div>
              <div className="text-xs text-[#B7D7FF] font-semibold mt-0.5 flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>BUILD / 2026</span>
              </div>
            </div>
          </motion.div>

          {/* Magnetic CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <Magnetic strength={0.3}>
              <button
                onClick={() => scrollTo('work')}
                onMouseEnter={() => onCursorHover(true, 'WORK', 'button')}
                onMouseLeave={() => onCursorHover(false)}
                className="px-6 py-3.5 rounded-xl bg-[#78AFFF] text-[#030407] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#B7D7FF] shadow-[0_0_25px_rgba(120,175,255,0.35)] transition-all flex items-center space-x-2"
              >
                <span>VIEW SELECTED WORK</span>
                <span>↗</span>
              </button>
            </Magnetic>

            <Magnetic strength={0.3}>
              <button
                onClick={() => scrollTo('thinking')}
                onMouseEnter={() => onCursorHover(true, 'SYSTEM', 'button')}
                onMouseLeave={() => onCursorHover(false)}
                className="px-6 py-3.5 rounded-xl bg-[rgba(16,20,30,0.8)] border border-[rgba(255,255,255,0.12)] text-[#F8FAFC] font-mono text-xs font-semibold uppercase tracking-wider hover:border-[#78AFFF] hover:text-[#78AFFF] transition-all flex items-center space-x-2"
              >
                <span>EXPLORE THE SYSTEM</span>
                <span>↓</span>
              </button>
            </Magnetic>

            <Magnetic strength={0.25}>
              <button
                onClick={onOpenTerminal}
                onMouseEnter={() => onCursorHover(true, 'CLI', 'button')}
                onMouseLeave={() => onCursorHover(false)}
                className="p-3.5 rounded-xl bg-[#0A0D14] border border-[rgba(255,255,255,0.08)] text-[#94A3B8] hover:text-[#78AFFF] hover:border-[#78AFFF] transition-all"
                title="Open Interactive CLI Terminal"
                aria-label="Open CLI Terminal"
              >
                <TerminalIcon className="w-4 h-4" />
              </button>
            </Magnetic>
          </motion.div>

        </div>

        {/* Right Column: 3D Systems Core Experience */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          onMouseEnter={() => onCursorHover(true, 'EXPLORE', 'project')}
          onMouseLeave={() => onCursorHover(false)}
          className="lg:col-span-5 h-[420px] lg:h-[520px] relative rounded-2xl bg-[rgba(10,13,20,0.45)] border border-[rgba(255,255,255,0.07)] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]"
        >
          {/* Corner Metadata Brackets */}
          <div className="absolute top-4 left-4 z-20 font-mono text-[10px] text-[#475569] uppercase">
            SYS_VIEW // 3D_CORE
          </div>
          <div className="absolute top-4 right-4 z-20 font-mono text-[10px] text-[#78AFFF] flex items-center space-x-1">
            <Zap className="w-3 h-3" />
            <span>INTERACTIVE</span>
          </div>

          <SystemsCoreCanvas />

          <div className="absolute bottom-4 left-4 right-4 z-20 p-3 rounded-xl bg-[rgba(10,13,20,0.85)] backdrop-blur-md border border-[rgba(255,255,255,0.07)] flex items-center justify-between font-mono text-[11px] text-[#94A3B8]">
            <span className="flex items-center space-x-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#78AFFF]" />
              <span>SYSTEMS CORE // RUST × TS × AI</span>
            </span>
            <span className="text-[#475569]">R3F / THREE.JS</span>
          </div>
        </motion.div>

      </div>

      {/* Live System Metaphor & Scroll Signal Line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="max-w-7xl mx-auto px-6 md:px-12 w-full pt-8 flex flex-col space-y-4"
      >
        {/* Luminous Signal Line */}
        <div className="relative w-full h-[1px] bg-[rgba(255,255,255,0.07)] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#78AFFF] to-transparent w-48 animate-signal" />
        </div>

        <div className="flex items-center justify-between text-[#475569] font-mono text-xs">
          <button
            onClick={() => scrollTo('thinking')}
            className="flex items-center space-x-2 text-[11px] text-[#94A3B8] hover:text-[#78AFFF] transition-colors uppercase tracking-widest"
          >
            <span>SCROLL TO ENTER</span>
            <span>↓</span>
          </button>

          <div className="flex items-center space-x-2 text-[10px] text-[#94A3B8]">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>PORTFOLIO SYSTEM ONLINE // 2026</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
