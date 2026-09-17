import React from 'react';
import { Sparkles, Cpu, CheckCircle2 } from 'lucide-react';
import { CodeWindow } from '../ui/CodeWindow';

export const AiVsEngineering: React.FC = () => {
  const rustSnippet = `// Kalki Vision Core - Deterministic Auto-Repair Match Loop
match validate_schema(&raw_completion) {
    Ok(validated_payload) => {
        persist_state(validated_payload);
        execute_tool_workflow(validated_payload.action);
    },
    Err(schema_violation) => {
        log::warn!("Schema violation detected: {:?}", schema_violation);
        let repaired = auto_repair_instruction(schema_violation);
        retry_model_completion(repaired);
    }
}`;

  return (
    <section className="py-28 px-6 md:px-12 bg-[#050609] relative border-t border-[rgba(255,255,255,0.08)]">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Editorial Heading */}
        <div className="space-y-4 max-w-4xl">
          <div className="font-mono text-xs text-[#78AFFF] uppercase tracking-widest flex items-center space-x-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#78AFFF]" />
            <span>EDITORIAL INSIGHT // PERSPECTIVE</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter text-[#F5F7FA]">
            AI BUILDS FASTER. <br />
            <span className="bg-gradient-to-r from-[#78AFFF] via-[#B7D7FF] to-[#38BDF8] bg-clip-text text-transparent">
              ENGINEERING BUILDS WITH CONTROL.
            </span>
          </h2>
          <p className="text-lg text-[#9BA4B2] font-normal leading-relaxed">
            Comparing AI-assisted generation with deliberate systems engineering—and why the future belongs to engineers building with both.
          </p>
        </div>

        {/* Split Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* AI-Assisted Development */}
          <div className="p-8 rounded-2xl bg-[#0A0D12] border border-[rgba(255,255,255,0.08)] space-y-6">
            <div className="flex items-center space-x-3 font-mono text-xs text-[#78AFFF]">
              <Sparkles className="w-5 h-5" />
              <span className="font-bold uppercase tracking-wider">AI-ASSISTED DEVELOPMENT</span>
            </div>
            <ul className="space-y-3 font-mono text-xs text-[#9BA4B2]">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#78AFFF]" />
                <span>Rapid initial prototyping & scaffold generation</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#78AFFF]" />
                <span>Exploring unstructured problem spaces quickly</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#78AFFF]" />
                <span>Fast iteration loops on standard boilerplate</span>
              </li>
            </ul>
          </div>

          {/* Traditional / Deliberate Engineering */}
          <div className="p-8 rounded-2xl bg-[#0A0D12] border border-[rgba(255,255,255,0.08)] space-y-6">
            <div className="flex items-center space-x-3 font-mono text-xs text-[#B7D7FF]">
              <Cpu className="w-5 h-5" />
              <span className="font-bold uppercase tracking-wider">DELIBERATE SYSTEMS ENGINEERING</span>
            </div>
            <ul className="space-y-3 font-mono text-xs text-[#9BA4B2]">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#B7D7FF]" />
                <span>Explicit architecture & deterministic state bounds</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#B7D7FF]" />
                <span>Zero-allocation memory models & low-latency execution</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#B7D7FF]" />
                <span>Production observability, safety & strict contracts</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Conceptual Code Snippet */}
        <div className="space-y-4">
          <div className="font-mono text-xs text-[#596170] uppercase">
            EXAMPLE RUST DETERMINISTIC RECOVERY LOGIC
          </div>
          <CodeWindow filename="kalki_recovery.rs" language="rust" code={rustSnippet} />
        </div>

        {/* Nuance Statement */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-[#10141B] via-[#0A0D12] to-[#050609] border border-[rgba(120,175,255,0.3)] shadow-[0_0_50px_rgba(120,175,255,0.15)] text-center space-y-3">
          <div className="font-mono text-xs text-[#78AFFF] uppercase tracking-widest">THE SYNTHESIS</div>
          <blockquote className="text-2xl sm:text-3xl font-extrabold uppercase text-[#F5F7FA] tracking-tight">
            “THE INTERESTING FUTURE IS NOT AI OR ENGINEERING. <br />
            IT IS ENGINEERING <span className="text-[#78AFFF]">WITH</span> AI.”
          </blockquote>
        </div>

      </div>
    </section>
  );
};
