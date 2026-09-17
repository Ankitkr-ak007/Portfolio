import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '../../data/projects';
import type { Project } from '../../data/projects';
import { CaseStudyModal } from './CaseStudyModal';
import { ProjectCardVisual } from './ProjectCardVisual';
import { BrandIcon } from '../ui/BrandIcons';

interface SelectedWorkProps {
  onCursorHover: (hovered: boolean, label?: string, variant?: 'default' | 'project' | 'button' | 'link' | '3d' | 'drag' | 'hidden') => void;
}

export const SelectedWork: React.FC<SelectedWorkProps> = ({ onCursorHover }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="work" className="py-28 px-6 md:px-12 bg-[#030407] relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-16 border-b border-[rgba(255,255,255,0.07)] mb-16">
          <div>
            <div className="font-mono text-xs text-[#78AFFF] uppercase tracking-widest mb-3 flex items-center space-x-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#78AFFF]" />
              <span>PROJECT ARCHIVE // 03</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter text-[#F8FAFC]">
              FEATURED SYSTEMS
            </h2>
          </div>
          <p className="text-sm md:text-base text-[#94A3B8] max-w-md font-normal mt-4 md:mt-0">
            Engineered systems where low-latency runtimes, AI orchestration, and deterministic architectures unite.
          </p>
        </div>

        {/* Vertical Editorial Project Archive */}
        <div className="space-y-16">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              layoutId={`project-card-${project.id}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => setSelectedProject(project)}
              onMouseEnter={() => onCursorHover(true, 'CASE STUDY', 'project')}
              onMouseLeave={() => onCursorHover(false)}
              className="group relative p-8 sm:p-12 rounded-2xl bg-[#0A0D14] border border-[rgba(255,255,255,0.07)] hover:border-[#78AFFF] shadow-[0_4px_40px_rgba(0,0,0,0.6)] transition-all duration-300 cursor-pointer overflow-hidden"
            >
              {/* Animated Light Background Glow on Hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(120,175,255,0.04)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                
                {/* Left: Metadata & Descriptions */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex items-center space-x-4 font-mono text-xs">
                    <span className="text-[#78AFFF] font-bold text-sm">
                      {project.number}
                    </span>
                    <span className="text-[#475569]">/</span>
                    <span className="px-3 py-1 rounded-full bg-[#10141E] text-[#B7D7FF] border border-[rgba(255,255,255,0.06)] uppercase tracking-wider text-[10px]">
                      {project.category}
                    </span>
                    <span className="text-[#475569] hidden sm:inline">{project.year}</span>
                  </div>

                  <motion.h3
                    layoutId={`project-title-${project.id}`}
                    className="text-3xl sm:text-5xl font-extrabold uppercase text-[#F8FAFC] group-hover:text-[#78AFFF] transition-colors tracking-tight flex items-center justify-between"
                  >
                    <span>{project.title}</span>
                    <ArrowUpRight className="w-6 h-6 text-[#475569] group-hover:text-[#78AFFF] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </motion.h3>

                  <p className="text-base text-[#94A3B8] leading-relaxed max-w-2xl">
                    {project.description}
                  </p>

                  {/* Tech stack tags with official BrandIcons */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-[#10141E] border border-[rgba(255,255,255,0.06)] font-mono text-[11px] text-[#94A3B8]"
                      >
                        <BrandIcon name={tech} className="w-3.5 h-3.5 text-[#78AFFF]" />
                        <span>{tech}</span>
                      </span>
                    ))}
                  </div>

                  <div className="pt-2 flex items-center space-x-2 font-mono text-xs text-[#78AFFF] font-semibold uppercase group-hover:translate-x-1 transition-transform">
                    <span>EXPLORE ARCHITECTURE & CASE STUDY</span>
                    <span>→</span>
                  </div>
                </div>

                {/* Right: Bespoke 3D Case Study Preview Canvas */}
                <div className="lg:col-span-5 h-64 sm:h-72 rounded-xl bg-[#10141E] border border-[rgba(255,255,255,0.06)] p-4 flex flex-col justify-between relative overflow-hidden group-hover:border-[rgba(120,175,255,0.3)] transition-colors">
                  <div className="flex items-center justify-between font-mono text-[10px] text-[#475569] z-10">
                    <span>3D TOPOLOGY // PREVIEW</span>
                    <span className="text-[#78AFFF]">PHYSICALLY RENDERED</span>
                  </div>

                  {/* 3D Wireframe Visual Preview */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ProjectCardVisual type={project.hero3D} />
                  </div>

                  <div className="font-mono text-[10px] text-[#94A3B8] flex justify-between z-10">
                    <span>{project.hero3D.toUpperCase()}</span>
                    <span>HOLOGRAPHIC MATRIX</span>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Shared-Element Full-Screen Case Study Modal */}
      <AnimatePresence>
        {selectedProject && (
          <CaseStudyModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            onCursorHover={onCursorHover}
          />
        )}
      </AnimatePresence>
    </section>
  );
};
