import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Code2, Layers, Sparkles } from 'lucide-react';
import { PROJECTS } from '../../data/projects';
import type { Project } from '../../data/projects';
import { CaseStudyModal } from './CaseStudyModal';

interface SelectedWorkProps {
  onCursorHover: (hovered: boolean, label?: string, variant?: 'default' | 'project' | 'button' | 'link' | 'hidden') => void;
}

export const SelectedWork: React.FC<SelectedWorkProps> = ({ onCursorHover }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="work" className="py-28 px-6 md:px-12 bg-[#050609] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-16 border-b border-[rgba(255,255,255,0.08)] mb-16">
          <div>
            <div className="font-mono text-xs text-[#78AFFF] uppercase tracking-widest mb-3 flex items-center space-x-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#78AFFF]" />
              <span>SELECTED WORK // 02</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter text-[#F5F7FA]">
              FEATURED PROJECTS
            </h2>
          </div>
          <p className="text-sm md:text-base text-[#9BA4B2] max-w-md font-normal mt-4 md:mt-0">
            Systems where software architecture, backend determinism, and interaction design unite.
          </p>
        </div>

        {/* Editorial Project List */}
        <div className="space-y-16">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => setSelectedProject(project)}
              onMouseEnter={() => onCursorHover(true, 'CASE STUDY', 'project')}
              onMouseLeave={() => onCursorHover(false)}
              className="group relative p-8 sm:p-12 rounded-2xl bg-[#0A0D12] border border-[rgba(255,255,255,0.08)] hover:border-[#78AFFF] shadow-[0_4px_40px_rgba(0,0,0,0.5)] transition-all duration-300 cursor-pointer overflow-hidden"
            >
              {/* Animated Light Border Pulse on Hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(120,175,255,0.05)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                
                {/* Left: Metadata & Descriptions */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center space-x-4 font-mono text-xs">
                    <span className="text-[#78AFFF] font-bold text-sm">
                      {project.number}
                    </span>
                    <span className="text-[#596170]">/</span>
                    <span className="px-3 py-1 rounded-full bg-[#10141B] text-[#B7D7FF] border border-[rgba(255,255,255,0.06)] uppercase tracking-wider text-[10px]">
                      {project.category}
                    </span>
                    <span className="text-[#596170] hidden sm:inline">{project.year}</span>
                  </div>

                  <h3 className="text-3xl sm:text-4xl font-extrabold uppercase text-[#F5F7FA] group-hover:text-[#78AFFF] transition-colors tracking-tight flex items-center justify-between">
                    <span>{project.title}</span>
                    <ArrowUpRight className="w-6 h-6 text-[#596170] group-hover:text-[#78AFFF] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </h3>

                  <p className="text-base text-[#9BA4B2] leading-relaxed max-w-2xl">
                    {project.description}
                  </p>

                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded bg-[#10141B] border border-[rgba(255,255,255,0.06)] font-mono text-[11px] text-[#9BA4B2]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2 flex items-center space-x-3 font-mono text-xs text-[#78AFFF] font-semibold uppercase group-hover:translate-x-1 transition-transform">
                    <span>EXPLORE CASE STUDY</span>
                    <span>→</span>
                  </div>
                </div>

                {/* Right: Abstract System Topology Visualization Preview */}
                <div className="lg:col-span-5 h-64 sm:h-72 rounded-xl bg-[#10141B] border border-[rgba(255,255,255,0.06)] p-6 flex flex-col justify-between relative overflow-hidden group-hover:border-[rgba(120,175,255,0.3)] transition-colors">
                  <div className="flex items-center justify-between font-mono text-[10px] text-[#596170]">
                    <span>ARCHITECTURE PREVIEW</span>
                    <span className="text-[#78AFFF]">DAG // VALIDATED</span>
                  </div>

                  {/* Interactive Nodes Graphic */}
                  <div className="my-auto flex items-center justify-center space-x-4 sm:space-x-6">
                    <div className="w-12 h-12 rounded-lg bg-[#050609] border border-[#78AFFF] flex items-center justify-center text-[#78AFFF] shadow-[0_0_15px_rgba(120,175,255,0.2)]">
                      <Code2 className="w-5 h-5" />
                    </div>
                    <div className="w-8 h-[2px] bg-gradient-to-r from-[#78AFFF] to-[#38BDF8] animate-pulse" />
                    <div className="w-12 h-12 rounded-lg bg-[#050609] border border-[#B7D7FF] flex items-center justify-center text-[#B7D7FF]">
                      <Layers className="w-5 h-5" />
                    </div>
                    <div className="w-8 h-[2px] bg-gradient-to-r from-[#B7D7FF] to-[#38BDF8] animate-pulse" />
                    <div className="w-12 h-12 rounded-lg bg-[#050609] border border-emerald-400 flex items-center justify-center text-emerald-400">
                      <Sparkles className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="font-mono text-[10px] text-[#9BA4B2] flex justify-between">
                    <span>INPUT: PROMPT + SCHEMA</span>
                    <span>OUTPUT: DETERMINISTIC</span>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Case Study Modal Overlay */}
      <CaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onCursorHover={onCursorHover}
      />
    </section>
  );
};
