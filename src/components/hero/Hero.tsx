import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Terminal, Cpu, Zap, ShieldCheck } from 'lucide-react';
import { SystemsCoreCanvas } from '../3d/SystemsCoreCanvas';

interface HeroProps {
  onCursorHover: (hovered: boolean, label?: string, variant?: 'default' | 'project' | 'button' | 'link' | 'hidden') => void;
  onOpenTerminal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCursorHover, onOpenTerminal }) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen pt-32 pb-20 flex flex-col justify-between overflow-hidden bg-[#050609]">
      {/* Background Radial Glow & Grid */}
      <div className="absolute inset-0 bg-tech-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(120,175,255,0.08)_0%,transparent_70%)] pointer-events-none" />

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
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[rgba(16,20,27,0.9)] border border-[rgba(120,175,255,0.3)] shadow-[0_0_15px_rgba(120,175,255,0.15)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#78AFFF] animate-pulse" />
              <span className="font-mono text-[11px] font-semibold text-[#B7D7FF] tracking-wider uppercase">
                FULL-STACK ENGINEER · AI BUILDER
              </span>
            </div>

            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#0A0D12] border border-[rgba(255,255,255,0.08)] font-mono text-[11px] text-[#9BA4B2]">
              <Cpu className="w-3 h-3 text-[#78AFFF]" />
              <span>GEMINI STUDENT AMBASSADOR 2026</span>
            </div>
          </motion.div>

          {/* Main Enormous Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-2"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter uppercase leading-[0.95] text-[#F5F7FA]">
              I BUILD <br />
              <span className="bg-gradient-to-r from-[#F5F7FA] via-[#78AFFF] to-[#B7D7FF] bg-clip-text text-transparent">
                SYSTEMS
              </span> <br />
              THAT THINK.
            </h1>
          </motion.div>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg sm:text-xl text-[#9BA4B2] font-normal leading-relaxed max-w-2xl"
          >
            Engineering reliable software at the intersection of low-latency backend systems, multi-agent AI infrastructure, and responsive human interfaces.
          </motion.p>

          {/* Conceptual Telemetry Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2"
          >
            <div className="p-3 rounded-lg bg-[rgba(16,20,27,0.5)] border border-[rgba(255,255,255,0.06)] font-mono">
              <div className="text-[10px] text-[#596170] uppercase">RUNTIME</div>
              <div className="text-xs text-[#F5F7FA] font-semibold mt-0.5">RUST / C++ / TS</div>
            </div>
            <div className="p-3 rounded-lg bg-[rgba(16,20,27,0.5)] border border-[rgba(255,255,255,0.06)] font-mono">
              <div className="text-[10px] text-[#596170] uppercase">LATENCY</div>
              <div className="text-xs text-[#78AFFF] font-semibold mt-0.5">&lt; 1ms* [TARGET]</div>
            </div>
            <div className="p-3 rounded-lg bg-[rgba(16,20,27,0.5)] border border-[rgba(255,255,255,0.06)] font-mono col-span-2 sm:col-span-1">
              <div className="text-[10px] text-[#596170] uppercase">STATE</div>
              <div className="text-xs text-[#B7D7FF] font-semibold mt-0.5 flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>BUILDING KALKI VISION</span>
              </div>
            </div>
          </motion.div>

          {/* Primary & Secondary CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 pt-4"
          >
            <button
              onClick={() => scrollTo('work')}
              onMouseEnter={() => onCursorHover(true, 'EXPLORE', 'button')}
              onMouseLeave={() => onCursorHover(false)}
              className="px-6 py-3.5 rounded-lg bg-[#78AFFF] text-[#050609] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#B7D7FF] shadow-[0_0_20px_rgba(120,175,255,0.4)] transition-all transform hover:-translate-y-0.5 flex items-center space-x-2"
            >
              <span>VIEW SELECTED WORK</span>
              <ArrowDown className="w-4 h-4 text-[#050609]" />
            </button>

            <button
              onClick={onOpenTerminal}
              onMouseEnter={() => onCursorHover(true, 'TERMINAL', 'button')}
              onMouseLeave={() => onCursorHover(false)}
              className="px-6 py-3.5 rounded-lg bg-[rgba(16,20,27,0.8)] border border-[rgba(255,255,255,0.12)] text-[#F5F7FA] font-mono text-xs font-semibold uppercase tracking-wider hover:border-[#78AFFF] hover:text-[#78AFFF] transition-all flex items-center space-x-2"
            >
              <Terminal className="w-4 h-4 text-[#78AFFF]" />
              <span>OPEN TERMINAL</span>
            </button>
          </motion.div>

        </div>

        {/* Right Column: 3D Systems Core Experience */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="lg:col-span-5 h-[420px] lg:h-[540px] relative rounded-2xl bg-[rgba(10,13,18,0.4)] border border-[rgba(255,255,255,0.06)] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]"
        >
          {/* Corner Metadata Brackets */}
          <div className="absolute top-4 left-4 z-20 font-mono text-[10px] text-[#596170] uppercase">
            SYS_VIEW // 3D_CORE
          </div>
          <div className="absolute top-4 right-4 z-20 font-mono text-[10px] text-[#78AFFF] flex items-center space-x-1">
            <Zap className="w-3 h-3" />
            <span>INTERACTIVE</span>
          </div>

          <SystemsCoreCanvas />

          <div className="absolute bottom-4 left-4 right-4 z-20 p-3 rounded-lg bg-[rgba(10,13,18,0.8)] backdrop-blur-md border border-[rgba(255,255,255,0.08)] flex items-center justify-between font-mono text-[11px] text-[#9BA4B2]">
            <span className="flex items-center space-x-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#78AFFF]" />
              <span>KALKI VISION CORE ARCHITECTURE</span>
            </span>
            <span className="text-[#596170]">R3F / THREE.JS</span>
          </div>
        </motion.div>

      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="max-w-7xl mx-auto px-6 md:px-12 w-full pt-12 flex items-center justify-between text-[#596170] font-mono text-xs"
      >
        <div className="flex items-center space-x-3">
          <div className="w-5 h-8 rounded-full border border-[rgba(255,255,255,0.15)] flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-[#78AFFF] animate-bounce" />
          </div>
          <span className="uppercase tracking-widest text-[10px]">SCROLL TO EXPLORE ARCHITECTURE</span>
        </div>

        <div className="hidden sm:block text-[10px] text-[#596170]">
          ANKIT KUMAR © 2026
        </div>
      </motion.div>
    </section>
  );
};
