import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Cpu, Code2, AlertTriangle, ShieldCheck, Rocket } from 'lucide-react';

export const HorizontalProcess: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ['1%', '-65%']);

  const steps = [
    {
      num: '01',
      title: 'THINK',
      tagline: 'FIRST PRINCIPLES & CONSTRAINTS',
      icon: <Cpu className="w-6 h-6 text-[#78AFFF]" />,
      desc: 'Deconstruct objectives into explicit contracts, state bounds, and data flow topologies before writing a single line of code.',
      metric: 'DAG SPEC // STRICT'
    },
    {
      num: '02',
      title: 'BUILD',
      tagline: 'TYPE & MEMORY-SAFE RUNTIMES',
      icon: <Code2 className="w-6 h-6 text-[#B7D7FF]" />,
      desc: 'Implement core business logic in Rust, C++20, and strict TypeScript. Zero-allocation memory models and zero-cost abstractions.',
      metric: 'TYPE SAFETY // 100%'
    },
    {
      num: '03',
      title: 'BREAK',
      tagline: 'CHAOS & BOUNDARY STRESS',
      icon: <AlertTriangle className="w-6 h-6 text-[#F59E0B]" />,
      desc: 'Inject malformed LLM responses, concurrency race conditions, and network packet drops to expose non-deterministic edge cases.',
      metric: 'FAULT INJECTION // ACTIVE'
    },
    {
      num: '04',
      title: 'VALIDATE',
      tagline: 'SELF-HEALING SCHEMA LOOPS',
      icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
      desc: 'Wrap all model outputs with Zod schemas and auto-repair feedback loops so downstream databases never receive invalid payloads.',
      metric: 'ZERO UNCAUGHT ERRORS'
    },
    {
      num: '05',
      title: 'SHIP',
      tagline: 'DETERMINISTIC OBSERVABILITY',
      icon: <Rocket className="w-6 h-6 text-[#38BDF8]" />,
      desc: 'Deploy containerized, observable systems equipped with telemetry, health hooks, and reproducible state persistence.',
      metric: 'PRODUCTION // DEPLOYED'
    }
  ];

  return (
    <section id="process" ref={targetRef} className="relative h-[280vh] bg-[#030407]">
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden px-6 md:px-12">
        
        {/* Section Header */}
        <div className="max-w-7xl mx-auto w-full mb-10">
          <div className="font-mono text-xs text-[#78AFFF] uppercase tracking-widest flex items-center space-x-2 mb-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#78AFFF]" />
            <span>ENGINEERING PROCESS // 02</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#F8FAFC]">
            HOW I SHIP DETERMINISTIC SYSTEMS
          </h2>
        </div>

        {/* Horizontal Moving Cards Track */}
        <motion.div style={{ x }} className="flex gap-8 w-max">
          {steps.map((step) => (
            <div
              key={step.num}
              className="w-[340px] sm:w-[420px] p-8 sm:p-10 rounded-2xl bg-[#0A0D14] border border-[rgba(255,255,255,0.07)] hover:border-[#78AFFF] shadow-[0_4px_40px_rgba(0,0,0,0.6)] flex flex-col justify-between transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between font-mono text-xs mb-6">
                  <span className="text-3xl font-black text-[#78AFFF]">{step.num}</span>
                  <div className="p-2.5 rounded-xl bg-[#10141E] border border-[rgba(255,255,255,0.06)]">
                    {step.icon}
                  </div>
                </div>

                <div className="font-mono text-[11px] text-[#94A3B8] uppercase tracking-wider mb-1">
                  {step.tagline}
                </div>
                <h3 className="text-2xl font-black text-[#F8FAFC] tracking-tight uppercase mb-4">
                  {step.title}
                </h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[rgba(255,255,255,0.06)] font-mono text-[10px] text-[#78AFFF] flex items-center justify-between">
                <span>STAGE STATUS:</span>
                <span className="font-bold">{step.metric}</span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Bottom Horizontal Progress Bar */}
        <div className="max-w-7xl mx-auto w-full mt-8 flex items-center justify-between font-mono text-[11px] text-[#475569]">
          <span>SCROLL HORIZONTALLY THROUGH METHODOLOGY</span>
          <span>5-PHASE LIFECYCLE</span>
        </div>

      </div>
    </section>
  );
};
