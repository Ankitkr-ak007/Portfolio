import React from 'react';
import { Sparkles, Cpu, CheckCircle2 } from 'lucide-react';
import { CodeWindow } from '../ui/CodeWindow';

export const AiVsEngineering: React.FC = () => {
  const rustSnippet = `// Kalki Vision Core - Deterministic Schema Auto-Repair Match Loop
pub async fn execute_agent_step<T: DeserializeOwned + Validate>(
    raw_completion: &str,
    attempt: usize,
) -> Result<T, SystemError> {
    match serde_json::from_str::<T>(raw_completion) {
        Ok(payload) => {
            payload.validate()?;
            persist_audit_log(&payload).await?;
            Ok(payload)
        }
        Err(schema_err) if attempt < MAX_RETRY_COUNT => {
            log::warn!("Schema violation: {schema_err}. Dispatching auto-repair loop.");
            let repair_prompt = generate_repair_instruction(schema_err, raw_completion);
            let repaired_completion = call_gemini_repair(&repair_prompt).await?;
            execute_agent_step(&repaired_completion, attempt + 1).await
        }
        Err(fatal_err) => Err(SystemError::SchemaViolation(fatal_err)),
    }
}`;

  return (
    <section className="py-28 px-6 md:px-12 bg-[#030407] relative border-t border-[rgba(255,255,255,0.06)]">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Editorial Heading */}
        <div className="space-y-4 max-w-4xl">
          <div className="font-mono text-xs text-[#78AFFF] uppercase tracking-widest flex items-center space-x-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#78AFFF]" />
            <span>EDITORIAL INSIGHT // PERSPECTIVE</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter text-[#F8FAFC]">
            AI BUILDS FASTER. <br />
            <span className="bg-gradient-to-r from-[#78AFFF] via-[#B7D7FF] to-[#38BDF8] bg-clip-text text-transparent">
              ENGINEERING BUILDS WITH CONTROL.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#94A3B8] font-normal leading-relaxed">
            Comparing AI-assisted generation with deliberate systems engineering—and why the future belongs to engineers who master both.
          </p>
        </div>

        {/* Split Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* AI-Assisted Generation */}
          <div className="p-8 rounded-2xl bg-[#0A0D14] border border-[rgba(255,255,255,0.07)] space-y-6">
            <div className="flex items-center space-x-3 font-mono text-xs text-[#78AFFF]">
              <Sparkles className="w-5 h-5" />
              <span className="font-bold uppercase tracking-wider">AI-ASSISTED GENERATION</span>
            </div>
            <ul className="space-y-3 font-mono text-xs text-[#94A3B8]">
              <li className="flex items-center space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#78AFFF] shrink-0" />
                <span>Rapid initial prototyping & scaffolding</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#78AFFF] shrink-0" />
                <span>Navigating complex, unstructured documentation</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#78AFFF] shrink-0" />
                <span>Accelerating boilerplate generation and test mocks</span>
              </li>
            </ul>
          </div>

          {/* Deliberate Systems Engineering */}
          <div className="p-8 rounded-2xl bg-[#0A0D14] border border-[rgba(255,255,255,0.07)] space-y-6">
            <div className="flex items-center space-x-3 font-mono text-xs text-[#B7D7FF]">
              <Cpu className="w-5 h-5" />
              <span className="font-bold uppercase tracking-wider">DELIBERATE SYSTEMS ENGINEERING</span>
            </div>
            <ul className="space-y-3 font-mono text-xs text-[#94A3B8]">
              <li className="flex items-center space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#B7D7FF] shrink-0" />
                <span>Explicit architectures & deterministic state bounds</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#B7D7FF] shrink-0" />
                <span>Zero-allocation memory models & low-latency execution</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#B7D7FF] shrink-0" />
                <span>Production observability, safety, and strict contract typing</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Concrete Code Window */}
        <div className="space-y-3">
          <div className="font-mono text-xs text-[#475569] uppercase tracking-wider">
            RUST RECOVERY PIPELINE // KALKI VISION
          </div>
          <CodeWindow filename="kalki_recovery_engine.rs" language="rust" code={rustSnippet} />
        </div>

        {/* The Synthesis */}
        <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-[#10141E] via-[#0A0D14] to-[#030407] border border-[rgba(120,175,255,0.25)] shadow-[0_0_50px_rgba(120,175,255,0.12)] text-center space-y-3">
          <div className="font-mono text-xs text-[#78AFFF] uppercase tracking-widest">THE SYNTHESIS</div>
          <blockquote className="text-2xl sm:text-4xl font-extrabold uppercase text-[#F8FAFC] tracking-tight">
            “THE FUTURE IS NOT AI OR ENGINEERING. <br />
            IT IS ENGINEERING <span className="text-[#78AFFF]">WITH</span> AI.”
          </blockquote>
        </div>

      </div>
    </section>
  );
};
