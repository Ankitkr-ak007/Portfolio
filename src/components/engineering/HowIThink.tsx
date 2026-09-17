import React from 'react';
import { motion } from 'motion/react';
import { Cpu, ShieldCheck, Layers } from 'lucide-react';
import { InteractiveDiagram } from './InteractiveDiagram';
import { TechConstellation } from './TechConstellation';

export const HowIThink: React.FC = () => {
  return (
    <section id="engineering" className="py-28 px-6 md:px-12 bg-[#050609] relative">
      <div className="max-w-7xl mx-auto space-y-24">
        
        {/* Section Header */}
        <div className="space-y-4">
          <div className="font-mono text-xs text-[#78AFFF] uppercase tracking-widest flex items-center space-x-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#78AFFF]" />
            <span>ENGINEERING ARCHITECTURE // 03</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter text-[#F5F7FA]">
            I DON'T JUST SHIP FEATURES. <br />
            <span className="bg-gradient-to-r from-[#78AFFF] via-[#B7D7FF] to-[#38BDF8] bg-clip-text text-transparent">
              I DESIGN SYSTEMS.
            </span>
          </h2>
          <p className="text-lg text-[#9BA4B2] max-w-2xl font-normal">
            Three principles guiding how I approach software, AI infrastructure, and systems reliability.
          </p>
        </div>

        {/* 3 Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Principle 01 */}
          <div className="p-8 rounded-2xl bg-[#0A0D12] border border-[rgba(255,255,255,0.08)] hover:border-[#78AFFF] transition-all space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-[#78AFFF] font-bold">01 // PRINCIPLE</span>
              <Cpu className="w-5 h-5 text-[#78AFFF]" />
            </div>
            <h3 className="text-2xl font-bold uppercase text-[#F5F7FA]">
              Architecture Over Prompts
            </h3>
            <p className="text-sm text-[#9BA4B2] leading-relaxed">
              AI systems fail when the architecture assumes model output is always correct. I build strict schema verification and repair loops around LLMs so business logic stays resilient.
            </p>
            <div className="p-3 rounded-lg bg-[#050609] border border-[rgba(255,255,255,0.06)] font-mono text-[11px] text-[#B7D7FF]">
              MODEL → VALIDATION → SCHEMA → RECOVERY
            </div>
          </div>

          {/* Principle 02 */}
          <div className="p-8 rounded-2xl bg-[#0A0D12] border border-[rgba(255,255,255,0.08)] hover:border-[#78AFFF] transition-all space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-[#B7D7FF] font-bold">02 // PRINCIPLE</span>
              <ShieldCheck className="w-5 h-5 text-[#B7D7FF]" />
            </div>
            <h3 className="text-2xl font-bold uppercase text-[#F5F7FA]">
              Determinism Matters
            </h3>
            <p className="text-sm text-[#9BA4B2] leading-relaxed">
              Software requires explicit contracts, strong type safety, and predictable state transitions. Rust, C++, and typed systems provide control when raw completions fluctuate.
            </p>
            <div className="p-3 rounded-lg bg-[#050609] border border-[rgba(255,255,255,0.06)] font-mono text-[11px] text-[#78AFFF]">
              CONTRACTS · TYPES · OBSERVABILITY
            </div>
          </div>

          {/* Principle 03 */}
          <div className="p-8 rounded-2xl bg-[#0A0D12] border border-[rgba(255,255,255,0.08)] hover:border-[#78AFFF] transition-all space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-[#38BDF8] font-bold">03 // PRINCIPLE</span>
              <Layers className="w-5 h-5 text-[#38BDF8]" />
            </div>
            <h3 className="text-2xl font-bold uppercase text-[#F5F7FA]">
              AI is Infrastructure
            </h3>
            <p className="text-sm text-[#9BA4B2] leading-relaxed">
              AI is moving from chatbots to operational infrastructure. Sub-agents, tool routing, memory graphs, and continuous evaluation form the next computing stack.
            </p>
            <div className="p-3 rounded-lg bg-[#050609] border border-[rgba(255,255,255,0.06)] font-mono text-[11px] text-[#38BDF8]">
              AGENTS · ORCHESTRATION · TOOLING
            </div>
          </div>

        </div>

        {/* Interactive Architecture Flow Diagram */}
        <InteractiveDiagram />

        {/* Tech Constellation */}
        <TechConstellation />

      </div>
    </section>
  );
};
