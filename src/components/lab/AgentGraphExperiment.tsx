import React, { useState } from 'react';
import { Play, RotateCcw, CheckCircle2, Cpu, Eye } from 'lucide-react';

export const AgentGraphExperiment: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(-1);
  const [isRunning, setIsRunning] = useState(false);

  const steps = [
    { label: 'PLANNER', detail: 'Decomposes high-level intent into a directed task DAG' },
    { label: 'RESEARCHER', detail: 'Retrieves codebase context, AST symbols, and API documentation' },
    { label: 'CODER', detail: 'Generates type-safe Rust/C++/TS AST diffs and algorithms' },
    { label: 'VALIDATOR', detail: 'Executes Zod schema contracts and isolated unit test suites' },
    { label: 'OBSERVER', detail: 'Records telemetry metrics and persists validated state to journal' },
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
    }, 750);
  };

  const handleReset = () => {
    setActiveStep(-1);
    setIsRunning(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between font-mono text-xs text-[#94A3B8]">
        <span>EXP-01 // MULTI-AGENT ORCHESTRATION GRAPH & SIGNAL FLOW</span>
        <span className="text-[#78AFFF]">
          STATE: {isRunning ? 'RUNNING' : activeStep === steps.length - 1 ? 'COMPLETED' : 'IDLE'}
        </span>
      </div>

      {/* Nodes visualizer */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
        {steps.map((step, idx) => {
          const isActive = activeStep === idx;
          const isDone = activeStep > idx;

          return (
            <div
              key={step.label}
              className={`p-4 rounded-xl border transition-all duration-300 font-mono ${
                isActive
                  ? 'bg-[#161D2B] border-[#78AFFF] shadow-[0_0_20px_rgba(120,175,255,0.3)] scale-[1.03]'
                  : isDone
                  ? 'bg-[#0A0D14] border-emerald-400/50'
                  : 'bg-[#030407] border-[rgba(255,255,255,0.08)]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] text-[#475569]">0{idx + 1}</span>
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : idx === 4 ? (
                  <Eye className={`w-4 h-4 ${isActive ? 'text-[#78AFFF] animate-pulse' : 'text-[#475569]'}`} />
                ) : (
                  <Cpu className={`w-4 h-4 ${isActive ? 'text-[#78AFFF] animate-spin' : 'text-[#475569]'}`} />
                )}
              </div>
              <div className="text-xs font-bold text-[#F8FAFC] uppercase tracking-wider">{step.label}</div>
              <div className="text-[10px] text-[#94A3B8] mt-1.5 leading-tight">{step.detail}</div>
            </div>
          );
        })}
      </div>

      {/* Control Buttons */}
      <div className="flex items-center space-x-4 pt-2">
        <button
          onClick={handleRun}
          disabled={isRunning}
          className="px-5 py-2.5 rounded-lg bg-[#78AFFF] text-[#030407] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#B7D7FF] disabled:opacity-50 transition-all flex items-center space-x-2"
        >
          <Play className="w-4 h-4" />
          <span>{isRunning ? 'DISPATCHING SIGNAL...' : 'DISPATCH AGENT SIGNAL'}</span>
        </button>

        <button
          onClick={handleReset}
          className="px-5 py-2.5 rounded-lg bg-[#10141E] border border-[rgba(255,255,255,0.1)] text-[#94A3B8] font-mono text-xs hover:text-[#F8FAFC] transition-all flex items-center space-x-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>RESET GRAPH</span>
        </button>
      </div>
    </div>
  );
};
