import React, { useState } from 'react';
import { SKILLS } from '../../data/skills';
import type { SkillNode } from '../../data/skills';
import { BrandIcon } from '../ui/BrandIcons';
import { GitCommit, Sparkles } from 'lucide-react';

export const TechConstellation: React.FC = () => {
  const [activeSkill, setActiveSkill] = useState<SkillNode | null>(null);

  return (
    <div className="w-full p-8 sm:p-12 rounded-2xl bg-[#0A0D14] border border-[rgba(255,255,255,0.07)] shadow-[0_4px_40px_rgba(0,0,0,0.6)]">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-[rgba(255,255,255,0.07)] mb-10 gap-4">
        <div>
          <div className="font-mono text-xs text-[#78AFFF] uppercase tracking-widest mb-2 flex items-center space-x-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#78AFFF]" />
            <span>ENGINEERING MATRIX // 05</span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-extrabold uppercase text-[#F8FAFC]">
            INTERCONNECTED STACK & GRAPH
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-[#94A3B8] font-mono">
          Hover over any node to highlight linked architectural edges
        </p>
      </div>

      {/* Skills Graph Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {SKILLS.map((skill) => {
          const isSelected = activeSkill?.id === skill.id;
          const isConnected = activeSkill?.connections.includes(skill.id);

          return (
            <div
              key={skill.id}
              onMouseEnter={() => setActiveSkill(skill)}
              onMouseLeave={() => setActiveSkill(null)}
              className={`p-5 rounded-xl border transition-all duration-300 cursor-pointer select-none ${
                isSelected
                  ? 'bg-[#161D2B] border-[#78AFFF] shadow-[0_0_30px_rgba(120,175,255,0.35)] scale-[1.03]'
                  : isConnected
                  ? 'bg-[#121824] border-[#B7D7FF] shadow-[0_0_18px_rgba(183,215,255,0.2)]'
                  : 'bg-[#0A0D14] border-[rgba(255,255,255,0.07)] hover:border-[rgba(120,175,255,0.4)]'
              }`}
            >
              <div className="flex items-center justify-between mb-3 font-mono text-[10px]">
                <span className="text-[#475569] uppercase">{skill.category}</span>
                <span className="text-[#78AFFF] font-semibold">{skill.level}</span>
              </div>
              
              <div className="flex items-center space-x-2.5">
                <BrandIcon name={skill.id} className="w-5 h-5 text-[#78AFFF] shrink-0" />
                <h4 className="text-base font-bold text-[#F8FAFC] font-mono">
                  {skill.name}
                </h4>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Skill Deep Inspection Panel */}
      <div className="min-h-[120px] p-6 sm:p-8 rounded-xl bg-[#030407] border border-[rgba(120,175,255,0.25)] flex flex-col justify-center">
        {activeSkill ? (
          <div className="space-y-4 animate-fadeIn">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[rgba(255,255,255,0.06)] pb-3">
              <div className="font-mono text-xs text-[#78AFFF] font-bold uppercase flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#78AFFF] animate-ping" />
                <span>{activeSkill.name} // {activeSkill.category}</span>
              </div>
              <div className="flex items-center space-x-2 font-mono text-[11px] text-[#94A3B8]">
                <GitCommit className="w-3.5 h-3.5 text-[#78AFFF]" />
                <span>USED IN: {activeSkill.projects.join(', ')}</span>
              </div>
            </div>

            <p className="text-sm text-[#F8FAFC] leading-relaxed">
              {activeSkill.description}
            </p>

            <div className="p-3 rounded-lg bg-[#0A0D14] border border-[rgba(255,255,255,0.06)] font-mono text-xs text-[#B7D7FF] flex items-center space-x-2">
              <Sparkles className="w-3.5 h-3.5 text-[#78AFFF] shrink-0" />
              <span><strong>WHY I USE IT:</strong> {activeSkill.whyIUseIt}</span>
            </div>
          </div>
        ) : (
          <div className="text-center font-mono text-xs text-[#475569]">
            HOVER OVER ANY NODE TO INSPECT ARCHITECTURAL RATIONALE & LINKED SYSTEMS
          </div>
        )}
      </div>
    </div>
  );
};
