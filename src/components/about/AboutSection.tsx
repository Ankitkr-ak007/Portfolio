import React from 'react';
import { PortraitModule } from './PortraitModule';
import { Sparkles, Terminal, Code2, BookOpen } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-28 px-6 md:px-12 bg-[#050609] relative">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Section Header */}
        <div className="space-y-4 pb-8 border-b border-[rgba(255,255,255,0.08)]">
          <div className="font-mono text-xs text-[#78AFFF] uppercase tracking-widest flex items-center space-x-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#78AFFF]" />
            <span>ABOUT & IDENTITY // 06</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter text-[#F5F7FA]">
            BEHIND THE SYSTEMS
          </h2>
        </div>

        {/* 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Portrait */}
          <div className="lg:col-span-5">
            <PortraitModule />
          </div>

          {/* Right Column: Bio & Credibility */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4 text-base sm:text-lg text-[#9BA4B2] leading-relaxed">
              <p>
                I'm <strong className="text-[#F5F7FA]">Ankit Kumar</strong>, a B.Tech student and software engineer focused on building systems across the full stack and modern AI.
              </p>
              <p>
                I work primarily with <strong className="text-[#78AFFF]">C++, Rust, TypeScript</strong>, and modern AI developer tools, with a dedicated interest in agentic systems, infrastructure, and reliable software architecture.
              </p>
              <p className="text-[#F5F7FA] font-medium italic border-l-2 border-[#78AFFF] pl-4 py-1">
                “I enjoy understanding how systems behave when the happy path disappears.”
              </p>
            </div>

            {/* Credibility / Social Proof Layer */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-[#0A0D12] border border-[rgba(255,255,255,0.08)] space-y-1 font-mono">
                <div className="text-[10px] text-[#78AFFF] uppercase flex items-center space-x-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>GOOGLE GEMINI</span>
                </div>
                <div className="text-xs text-[#F5F7FA] font-bold">STUDENT AMBASSADOR 2026</div>
              </div>

              <div className="p-4 rounded-xl bg-[#0A0D12] border border-[rgba(255,255,255,0.08)] space-y-1 font-mono">
                <div className="text-[10px] text-[#B7D7FF] uppercase flex items-center space-x-1">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>FOUNDER / BUILDER</span>
                </div>
                <div className="text-xs text-[#F5F7FA] font-bold">KALKI VISION</div>
              </div>

              <div className="p-4 rounded-xl bg-[#0A0D12] border border-[rgba(255,255,255,0.08)] space-y-1 font-mono">
                <div className="text-[10px] text-[#38BDF8] uppercase flex items-center space-x-1">
                  <Code2 className="w-3.5 h-3.5" />
                  <span>CORE FOCUS</span>
                </div>
                <div className="text-xs text-[#F5F7FA] font-bold">AI × ENGINEERING</div>
              </div>
            </div>

            {/* Personal Signals */}
            <div className="space-y-3 pt-4 border-t border-[rgba(255,255,255,0.06)]">
              <div className="font-mono text-xs text-[#596170] uppercase">OUTSIDE THE CODE</div>
              <div className="flex flex-wrap gap-3">
                {['Technology Writing', 'Student AI Communities', 'Systems Benchmarking', 'Open Source Exploration', 'WebGL Shaders'].map((signal) => (
                  <span
                    key={signal}
                    className="px-3 py-1.5 rounded-lg bg-[#10141B] border border-[rgba(255,255,255,0.06)] font-mono text-xs text-[#9BA4B2]"
                  >
                    {signal}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
