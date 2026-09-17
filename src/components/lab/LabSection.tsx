import React, { useState } from 'react';
import { LAB_EXPERIMENTS } from '../../data/labExperiments';
import { AgentGraphExperiment } from './AgentGraphExperiment';
import { RustMemoryExperiment } from './RustMemoryExperiment';
import { NeuralStreamExperiment } from './NeuralStreamExperiment';
import { OutputValidatorExperiment } from './OutputValidatorExperiment';

export const LabSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('agent-graph');

  const renderExperiment = () => {
    switch (activeTab) {
      case 'agent-graph':
        return <AgentGraphExperiment />;
      case 'rust-memory':
        return <RustMemoryExperiment />;
      case 'neural-stream':
        return <NeuralStreamExperiment />;
      case 'output-validator':
        return <OutputValidatorExperiment />;
      default:
        return <AgentGraphExperiment />;
    }
  };

  return (
    <section id="lab" className="py-28 px-6 md:px-12 bg-[#030407] relative">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="space-y-4 pb-8 border-b border-[rgba(255,255,255,0.07)]">
          <div className="font-mono text-xs text-[#78AFFF] uppercase tracking-widest flex items-center space-x-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#78AFFF]" />
            <span>THE LAB // 06</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter text-[#F8FAFC]">
            INTERACTIVE EXPERIMENTS
          </h2>
          <p className="text-base sm:text-lg text-[#94A3B8] font-normal">
            Miniature interactive sandboxes exploring AI graph execution, memory borrowing, trigonometry vector fields, and schema repair.
          </p>
        </div>

        {/* Experiment Tab Switcher */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {LAB_EXPERIMENTS.map((exp) => {
            const isActive = activeTab === exp.id;
            return (
              <button
                key={exp.id}
                onClick={() => setActiveTab(exp.id)}
                className={`p-6 rounded-2xl border text-left transition-all duration-300 font-mono select-none ${
                  isActive
                    ? 'bg-[#161D2B] border-[#78AFFF] shadow-[0_0_25px_rgba(120,175,255,0.25)] scale-[1.02]'
                    : 'bg-[#0A0D14] border-[rgba(255,255,255,0.07)] hover:border-[rgba(120,175,255,0.3)]'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] mb-2">
                  <span className="text-[#475569]">{exp.number}</span>
                  <span className="text-[#78AFFF] font-bold">{exp.category}</span>
                </div>
                <h3 className="text-base font-bold uppercase text-[#F8FAFC] mb-1">
                  {exp.title}
                </h3>
                <p className="text-[11px] text-[#94A3B8] line-clamp-2">
                  {exp.tagline}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Interactive Sandbox Canvas */}
        <div className="p-8 sm:p-12 rounded-2xl bg-[#0A0D14] border border-[rgba(120,175,255,0.2)] shadow-[0_0_60px_rgba(0,0,0,0.85)]">
          {renderExperiment()}
        </div>

      </div>
    </section>
  );
};
