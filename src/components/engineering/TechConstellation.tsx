import React, { useState } from 'react';
import { SKILLS } from '../../data/skills';
import type { SkillNode } from '../../data/skills';

export const TechConstellation: React.FC = () => {
  const [activeSkill, setActiveSkill] = useState<SkillNode | null>(null);

  return (
    <div className="w-full p-8 sm:p-12 rounded-2xl bg-[#0A0D12] border border-[rgba(255,255,255,0.08)] shadow-[0_4px_40px_rgba(0,0,0,0.5)]">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-[rgba(255,255,255,0.08)] mb-10">
        <div>
          <div className="font-mono text-xs text-[#78AFFF] uppercase tracking-widest mb-2">
            TECHNICAL CONSTELLATION
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold uppercase text-[#F5F7FA]">
            ENGINEERING STACK & GRAPH
          </h3>
        </div>
        <p className="text-sm text-[#9BA4B2] font-mono mt-2 md:mt-0">
          Hover over nodes to see architectural links
        </p>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
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
                  ? 'bg-[#10141B] border-[#78AFFF] shadow-[0_0_25px_rgba(120,175,255,0.3)] scale-[1.03]'
                  : isConnected
                  ? 'bg-[#10141B]/80 border-[#B7D7FF] shadow-[0_0_15px_rgba(183,215,255,0.2)]'
                  : 'bg-[#0A0D12] border-[rgba(255,255,255,0.08)] hover:border-[rgba(120,175,255,0.4)]'
              }`}
            >
              <div className="flex items-center justify-between mb-2 font-mono text-[10px]">
                <span className="text-[#596170] uppercase">{skill.category}</span>
                <span className="text-[#78AFFF] font-semibold">{skill.level}</span>
              </div>
              <h4 className="text-lg font-bold text-[#F5F7FA] font-mono">
                {skill.name}
              </h4>
            </div>
          );
        })}
      </div>

      {/* Active Skill Info Panel */}
      <div className="min-h-[90px] p-6 rounded-xl bg-[#050609] border border-[rgba(120,175,255,0.2)] flex flex-col justify-center">
        {activeSkill ? (
          <div className="space-y-2">
            <div className="font-mono text-xs text-[#78AFFF] font-bold uppercase flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#78AFFF] animate-ping" />
              <span>{activeSkill.name} // {activeSkill.category}</span>
            </div>
            <p className="text-sm text-[#9BA4B2] font-normal leading-relaxed">
              {activeSkill.description}
            </p>
          </div>
        ) : (
          <div className="text-center font-mono text-xs text-[#596170]">
            HOVER ANY NODE TO INSPECT CONSTELLATION RELATIONSHIPS
          </div>
        )}
      </div>
    </div>
  );
};
