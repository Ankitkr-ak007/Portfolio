import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { X, ExternalLink, Cpu, ShieldCheck, Layers, CheckCircle2, Lightbulb, GitBranch } from 'lucide-react';
import type { Project } from '../../data/projects';
import { useScrollLock, useOverlayNavigation, OverlayScrollArea } from '../../overlays';
import { Project3DVisual } from '../3d/Project3DVisual';
import { BrandIcon } from '../ui/BrandIcons';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
  onCursorHover: (hovered: boolean, label?: string, variant?: 'default' | 'project' | 'button' | 'link' | '3d' | 'drag' | 'hidden') => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  onClose,
  onCursorHover,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useScrollLock(!!project);
  useOverlayNavigation({ isOpen: !!project, onClose, containerRef });

  if (!project) return null;

  const { role, overview, problem, approach, system, architecture, decisions, challenges, outcomes, learnings } = project.caseStudy;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 h-[100dvh] w-full overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-[#030407]/90 backdrop-blur-2xl"
      />

      {/* Dedicated Modal Scroll Container */}
      <OverlayScrollArea className="relative z-10 flex items-center justify-center p-4 sm:p-6 lg:p-10">
        <motion.div
          layoutId={`project-card-${project.id}`}
          className="relative w-full max-w-5xl bg-[#0A0D14] border border-[rgba(120,175,255,0.25)] rounded-2xl p-6 sm:p-10 shadow-[0_0_90px_rgba(0,0,0,0.95)] my-auto max-h-[90dvh] overflow-y-auto overscroll-contain"
        >
          {/* Top Metadata Bar */}
          <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.07)] pb-6 mb-8">
            <div className="flex items-center space-x-3 font-mono text-xs text-[#78AFFF]">
              <span className="px-2.5 py-1 rounded-md bg-[#10141E] border border-[rgba(120,175,255,0.3)] font-bold">
                SYSTEM // {project.number}
              </span>
              <span className="text-[#94A3B8]">{project.category}</span>
              <span className="text-[#475569]">·</span>
              <span className="text-[#78AFFF] font-semibold">{role}</span>
              <span className="text-[#475569]">·</span>
              <span className="text-[#475569]">{project.year}</span>
            </div>

            <button
              onClick={onClose}
              aria-label="Close case study"
              onMouseEnter={() => onCursorHover(true, 'CLOSE', 'button')}
              onMouseLeave={() => onCursorHover(false)}
              className="p-2 rounded-xl bg-[#10141E] border border-[rgba(255,255,255,0.1)] text-[#94A3B8] hover:text-[#F8FAFC] hover:border-[#78AFFF] transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 3D Header Visual & Title */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10 pb-8 border-b border-[rgba(255,255,255,0.06)]">
            <div className="lg:col-span-8 space-y-4">
              <motion.h2
                layoutId={`project-title-${project.id}`}
                className="text-3xl sm:text-5xl font-black uppercase text-[#F8FAFC] tracking-tight"
              >
                {project.title}
              </motion.h2>
              <p className="text-base sm:text-lg text-[#94A3B8] max-w-3xl leading-relaxed">
                {overview}
              </p>
              
              {/* Tech Badges with Brand Icons */}
              <div className="flex flex-wrap gap-2 pt-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-[#10141E] border border-[rgba(255,255,255,0.07)] font-mono text-xs text-[#B7D7FF]"
                  >
                    <BrandIcon name={tech} className="w-3.5 h-3.5 text-[#78AFFF]" />
                    <span>{tech}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 h-48 sm:h-56 rounded-xl bg-[#10141E] border border-[rgba(255,255,255,0.06)] flex items-center justify-center relative overflow-hidden">
              <Project3DVisual type={project.hero3D} />
            </div>
          </div>

          {/* Section 02: Problem & Approach & System */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            <div className="p-5 rounded-xl bg-[#10141E]/70 border border-[rgba(255,255,255,0.06)] space-y-2.5">
              <div className="flex items-center space-x-2 text-xs font-mono text-[#78AFFF] uppercase tracking-wider">
                <Cpu className="w-4 h-4" />
                <span>01 // THE PROBLEM</span>
              </div>
              <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                {problem}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#10141E]/70 border border-[rgba(255,255,255,0.06)] space-y-2.5">
              <div className="flex items-center space-x-2 text-xs font-mono text-[#38BDF8] uppercase tracking-wider">
                <Lightbulb className="w-4 h-4" />
                <span>02 // THE APPROACH</span>
              </div>
              <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                {approach}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#10141E]/70 border border-[rgba(255,255,255,0.06)] space-y-2.5">
              <div className="flex items-center space-x-2 text-xs font-mono text-[#B7D7FF] uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>03 // THE SYSTEM</span>
              </div>
              <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                {system}
              </p>
            </div>
          </div>

          {/* Section 03: Architecture Flow Diagram */}
          <div className="p-6 rounded-xl bg-gradient-to-r from-[#10141E] to-[#0A0D14] border border-[rgba(120,175,255,0.25)] mb-8 space-y-3">
            <div className="flex items-center space-x-2 text-xs font-mono text-[#78AFFF] uppercase tracking-wider">
              <Layers className="w-4 h-4" />
              <span>04 // DATA & EXECUTION FLOW</span>
            </div>
            <div className="p-4 rounded-lg bg-[#030407] border border-[rgba(255,255,255,0.08)] font-mono text-xs text-[#B7D7FF] overflow-x-auto leading-relaxed">
              <code>{architecture}</code>
            </div>
          </div>

          {/* Section 04: Key Engineering Decisions */}
          <div className="mb-8 space-y-3">
            <div className="flex items-center space-x-2 font-mono text-xs text-[#78AFFF] uppercase tracking-widest">
              <GitBranch className="w-4 h-4" />
              <span>05 // ARCHITECTURAL DECISIONS</span>
            </div>
            <div className="grid grid-cols-1 gap-2.5">
              {decisions.map((dec, i) => (
                <div key={i} className="flex items-start space-x-3 p-4 rounded-xl bg-[#10141E]/40 border border-[rgba(255,255,255,0.04)] text-sm text-[#94A3B8]">
                  <span className="font-mono text-xs text-[#78AFFF] font-bold mt-0.5">0{i + 1}</span>
                  <span>{dec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 05: Challenges Overcome */}
          <div className="mb-8 space-y-3">
            <div className="font-mono text-xs text-[#475569] uppercase tracking-widest">
              06 // TECHNICAL CHALLENGES OVERCOME
            </div>
            <div className="grid grid-cols-1 gap-2.5">
              {challenges.map((c, i) => (
                <div key={i} className="flex items-start space-x-3 p-4 rounded-xl bg-[#10141E]/40 border border-[rgba(255,255,255,0.04)]">
                  <CheckCircle2 className="w-4 h-4 text-[#78AFFF] mt-0.5 shrink-0" />
                  <span className="text-sm text-[#94A3B8]">{c}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 06 & 07: Outcomes and Learnings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="p-6 rounded-xl bg-[rgba(120,175,255,0.06)] border border-[rgba(120,175,255,0.2)] space-y-2">
              <div className="font-mono text-xs text-[#78AFFF] uppercase">07 // QUALITATIVE / MEASURABLE OUTCOME</div>
              <p className="text-sm text-[#F8FAFC] font-medium leading-relaxed">
                {outcomes}
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#10141E]/70 border border-[rgba(255,255,255,0.06)] space-y-2">
              <div className="font-mono text-xs text-[#F59E0B] uppercase flex items-center space-x-1.5">
                <Lightbulb className="w-3.5 h-3.5" />
                <span>08 // KEY LESSONS LEARNED</span>
              </div>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                {learnings}
              </p>
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="flex items-center justify-between border-t border-[rgba(255,255,255,0.07)] pt-6">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => onCursorHover(true, 'GITHUB', 'button')}
                onMouseLeave={() => onCursorHover(false)}
                className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-[#10141E] border border-[rgba(255,255,255,0.1)] hover:border-[#78AFFF] text-xs font-mono text-[#F8FAFC] transition-all"
              >
                <BrandIcon name="github" className="w-4 h-4 text-[#78AFFF]" />
                <span>VIEW REPOSITORY</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#475569]" />
              </a>
            )}

            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-[#78AFFF] text-[#030407] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#B7D7FF] transition-all"
            >
              CLOSE CASE STUDY
            </button>
          </div>
        </motion.div>
      </OverlayScrollArea>
    </div>
  );
};
