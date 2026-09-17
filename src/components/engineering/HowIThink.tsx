import React, { useState } from 'react';
import { Cpu, ShieldCheck, Layers, Activity, Eye, ChevronDown } from 'lucide-react';
import { InteractiveDiagram } from './InteractiveDiagram';
import { TechConstellation } from './TechConstellation';

export const HowIThink: React.FC = () => {
  const [expandedPrinciple, setExpandedPrinciple] = useState<number | null>(0);

  const principles = [
    {
      num: '01',
      title: 'Architecture > Prompting',
      tagline: 'RESILIENT GUARDRAILS',
      icon: <Cpu className="w-5 h-5 text-[#78AFFF]" />,
      summary: 'AI systems fail when software architecture assumes model outputs are always correct. I wrap LLMs in strict schema verification and auto-repair feedback loops.',
      detail: 'Prompting is simply an interface. When building production software, you cannot rely on model benevolence. We construct deterministic pipelines where model outputs are validated against typed schemas, and failures trigger automated self-repair routines before reaching state persistence.',
      flow: 'INPUT → MODEL WORKER → ZOD PARSER → REPAIR LOOP → DATABASE'
    },
    {
      num: '02',
      title: 'Validation > Blind Trust',
      tagline: 'ZERO-TRUST BOUNDARIES',
      icon: <ShieldCheck className="w-5 h-5 text-[#B7D7FF]" />,
      summary: 'Never trust external or probabilistic input without strict boundary validation. If output fails contracts, intercept immediately.',
      detail: 'Every sub-agent tool call, user submission, and LLM JSON payload passes through runtime assertions. We eliminate downstream corrupted state by catching malformed structures at the exact ingestion boundary.',
      flow: 'PAYLOAD → RUNTIME TYPE CHECK → ASSERTION → DISPATCH'
    },
    {
      num: '03',
      title: 'Determinism > Accidental Behavior',
      tagline: 'PREDICTABLE STATE',
      icon: <Layers className="w-5 h-5 text-[#38BDF8]" />,
      summary: 'Software requires explicit contracts, compile-time memory safety, and predictable state transitions. Rust and C++ provide stability when LLMs fluctuate.',
      detail: 'Where performance and reliability are paramount, we employ Rust ownership semantics and C++ zero-allocation queues. Combining deterministic systems code with probabilistic AI models yields fast, reliable applications.',
      flow: 'MEMORY SAFETY · COMPILE-TIME CHECKS · ZERO GC PAUSES'
    },
    {
      num: '04',
      title: 'Observability > Guessing',
      tagline: 'AUDITABLE TRACES',
      icon: <Eye className="w-5 h-5 text-[#F59E0B]" />,
      summary: 'You cannot optimize or debug what you cannot observe. Every sub-agent decision, token packet, and state delta must be traceable in real time.',
      detail: 'We build visual DAG topologies and event streaming into every multi-agent system. When a failure occurs, the exact sub-agent, prompt context, and token response are indexed for immediate post-mortem debugging.',
      flow: 'TRACE LOGGING → EVENT STREAM → TOPOLOGY INSPECTION'
    },
    {
      num: '05',
      title: 'Systems > Isolated Features',
      tagline: 'COHESIVE INTEGRATION',
      icon: <Activity className="w-5 h-5 text-emerald-400" />,
      summary: 'Software is not a disconnected collection of UI widgets. It is an interconnected operating system where memory, backend, and interface act as one.',
      detail: 'From GPU shaders down to low-level socket queues, every architectural layer should support a singular, cohesive purpose. Engineering elegance lives in how clean and resilient the entire machine operates under load.',
      flow: 'INTERFACE ↔ BACKEND ↔ MEMORY ↔ OBSERVABILITY'
    }
  ];

  return (
    <section id="engineering" className="py-28 px-6 md:px-12 bg-[#030407] relative">
      <div className="max-w-7xl mx-auto space-y-24">
        
        {/* Section Header */}
        <div className="space-y-4 max-w-4xl">
          <div className="font-mono text-xs text-[#78AFFF] uppercase tracking-widest flex items-center space-x-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#78AFFF]" />
            <span>ENGINEERING ARCHITECTURE // 04</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter text-[#F8FAFC]">
            I DON'T JUST SHIP FEATURES. <br />
            <span className="bg-gradient-to-r from-[#78AFFF] via-[#B7D7FF] to-[#38BDF8] bg-clip-text text-transparent">
              I DESIGN SYSTEMS.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#94A3B8] font-normal leading-relaxed">
            Five core engineering principles that guide how I approach systems design, AI infrastructure, and software reliability.
          </p>
        </div>

        {/* 5 Principles Expandable Matrix */}
        <div className="space-y-4">
          {principles.map((p, idx) => {
            const isExpanded = expandedPrinciple === idx;
            return (
              <div
                key={p.num}
                className={`p-6 sm:p-8 rounded-2xl border transition-all duration-300 ${
                  isExpanded
                    ? 'bg-[#0A0D14] border-[#78AFFF] shadow-[0_4px_30px_rgba(120,175,255,0.15)]'
                    : 'bg-[#0A0D14]/60 border-[rgba(255,255,255,0.06)] hover:border-[rgba(120,175,255,0.3)]'
                }`}
              >
                <div
                  onClick={() => setExpandedPrinciple(isExpanded ? null : idx)}
                  className="flex items-center justify-between cursor-pointer select-none"
                >
                  <div className="flex items-center space-x-4 sm:space-x-6">
                    <span className="font-mono text-xl sm:text-2xl font-black text-[#78AFFF]">{p.num}</span>
                    <div className="p-2.5 rounded-xl bg-[#10141E] border border-[rgba(255,255,255,0.06)]">
                      {p.icon}
                    </div>
                    <div>
                      <div className="font-mono text-[10px] text-[#475569] uppercase tracking-wider">
                        {p.tagline}
                      </div>
                      <h3 className="text-lg sm:text-2xl font-extrabold uppercase text-[#F8FAFC]">
                        {p.title}
                      </h3>
                    </div>
                  </div>

                  <ChevronDown
                    className={`w-5 h-5 text-[#94A3B8] transition-transform duration-300 ${
                      isExpanded ? 'transform rotate-180 text-[#78AFFF]' : ''
                    }`}
                  />
                </div>

                {isExpanded && (
                  <div className="mt-6 pt-6 border-t border-[rgba(255,255,255,0.06)] space-y-4 font-sans animate-fadeIn">
                    <p className="text-sm sm:text-base text-[#F8FAFC] font-medium leading-relaxed">
                      {p.summary}
                    </p>
                    <p className="text-sm text-[#94A3B8] leading-relaxed">
                      {p.detail}
                    </p>
                    <div className="p-3.5 rounded-xl bg-[#030407] border border-[rgba(255,255,255,0.06)] font-mono text-xs text-[#78AFFF]">
                      <code>{p.flow}</code>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Interactive Architecture Flow Diagram */}
        <InteractiveDiagram />

        {/* Tech Constellation Network */}
        <TechConstellation />

      </div>
    </section>
  );
};
