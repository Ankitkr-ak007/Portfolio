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
    <section id="lab" className="py-28 px-6 md:px-12 bg-[#050609] relative">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="space-y-4 pb-8 border-b border-[rgba(255,255,255,0.08)]">
          <div className="font-mono text-xs text-[#78AFFF] uppercase tracking-widest flex items-center space-x-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#78AFFF]" />
            <span>THE LAB // 05</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter text-[#F5F7FA]">
            INTERACTIVE EXPERIMENTS
          </h2>
          <p className="text-base text-[#9BA4B2] font-normal">
            Things I'm currently exploring at the boundary of AI infrastructure and systems engineering.
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
                className={`p-6 rounded-xl border text-left transition-all duration-300 font-mono ${
                  isActive
                    ? 'bg-[#10141B] border-[#78AFFF] shadow-[0_0_25px_rgba(120,175,255,0.25)] scale-[1.02]'
                    : 'bg-[#0A0D12] border-[rgba(255,255,255,0.08)] hover:border-[rgba(120,175,255,0.3)]'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] mb-2">
                  <span className="text-[#596170]">{exp.number}</span>
                  <span className="text-[#78AFFF]">{exp.category}</span>
                </div>
                <h3 className="text-base font-bold uppercase text-[#F5F7FA] mb-1">
                  {exp.title}
                </h3>
                <p className="text-[11px] text-[#9BA4B2] line-clamp-2">
                  {exp.tagline}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Interactive Stage */}
        <div className="p-8 sm:p-12 rounded-2xl bg-[#0A0D12] border border-[rgba(120,175,255,0.2)] shadow-[0_0_60px_rgba(0,0,0,0.8)]">
          {renderExperiment()}
        </div>

      </div>
    </section>
  );
};
