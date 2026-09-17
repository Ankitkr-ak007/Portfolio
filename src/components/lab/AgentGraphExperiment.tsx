import React, { useState } from 'react';
import { Play, RotateCcw, CheckCircle2, Cpu } from 'lucide-react';

export const AgentGraphExperiment: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(-1);
  const [isRunning, setIsRunning] = useState(false);

  const steps = [
    { label: 'PLANNER_NODE', detail: 'Decomposing objective into DAG tasks' },
    { label: 'RESEARCHER_NODE', detail: 'Retrieving codebase context & Gemini API specs' },
    { label: 'CODER_NODE', detail: 'Generating type-safe Rust/TS AST modifications' },
    { label: 'VERIFIER_NODE', detail: 'Evaluating unit tests & Zod schema validation' }
  ];

  const handleRun = () => {
    if (isRunning) return;
    setIsRunning(true);
    setActiveStep(0);

    let current = 0;
    const interval = setInterval(() => {
      current++;
      if (current >= steps.length) {
        clearInterval(interval);
        setIsRunning(false);
      } else {
        setActiveStep(current);
      }
    }, 900);
  };

  const handleReset = () => {
    setActiveStep(-1);
    setIsRunning(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between font-mono text-xs text-[#9BA4B2]">
        <span>EXP-01 // SUB-AGENT TOPOLOGY & SIGNAL FLOW</span>
        <span className="text-[#78AFFF]">STATE: {isRunning ? 'RUNNING' : activeStep === 3 ? 'COMPLETED' : 'IDLE'}</span>
      </div>

      {/* Nodes visualizer */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {steps.map((step, idx) => {
          const isActive = activeStep === idx;
          const isDone = activeStep > idx;

          return (
            <div
              key={step.label}
              className={`p-4 rounded-xl border transition-all duration-300 font-mono ${
                isActive
                  ? 'bg-[#10141B] border-[#78AFFF] shadow-[0_0_20px_rgba(120,175,255,0.3)] scale-105'
                  : isDone
                  ? 'bg-[#0A0D12] border-emerald-400/50'
                  : 'bg-[#050609] border-[rgba(255,255,255,0.08)]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-[#596170]">STEP 0{idx + 1}</span>
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Cpu className={`w-4 h-4 ${isActive ? 'text-[#78AFFF] animate-spin' : 'text-[#596170]'}`} />
                )}
              </div>
              <div className="text-xs font-bold text-[#F5F7FA] uppercase">{step.label}</div>
              <div className="text-[10px] text-[#9BA4B2] mt-1">{step.detail}</div>
            </div>
          );
        })}
      </div>

      {/* Control Buttons */}
      <div className="flex items-center space-x-4">
        <button
          onClick={handleRun}
          disabled={isRunning}
          className="px-5 py-2.5 rounded-lg bg-[#78AFFF] text-[#050609] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#B7D7FF] disabled:opacity-50 transition-all flex items-center space-x-2"
        >
          <Play className="w-4 h-4" />
          <span>DISPATCH SIGNAL</span>
        </button>

        <button
          onClick={handleReset}
          className="px-5 py-2.5 rounded-lg bg-[#10141B] border border-[rgba(255,255,255,0.1)] text-[#9BA4B2] font-mono text-xs hover:text-[#F5F7FA] transition-all flex items-center space-x-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>RESET GRAPH</span>
        </button>
      </div>
    </div>
  );
};
