import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Cpu, ShieldCheck, Layers, CheckCircle2 } from 'lucide-react';
import type { Project } from '../../data/projects';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
  onCursorHover: (hovered: boolean, label?: string, variant?: 'default' | 'project' | 'button' | 'link' | 'hidden') => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  onClose,
  onCursorHover,
}) => {
  useBodyScrollLock(!!project);

  if (!project || !project.caseStudy) return null;

  const { problem, approach, architecture, challenges, outcome } = project.caseStudy;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 overflow-y-auto" role="dialog" aria-modal="true" aria-label={project.title}>
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#050609]/90 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-5xl bg-[#0A0D12] border border-[rgba(120,175,255,0.2)] rounded-2xl p-6 sm:p-10 shadow-[0_0_80px_rgba(0,0,0,0.9)] z-10 my-auto max-h-[90vh] overflow-y-auto"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.08)] pb-6 mb-8">
            <div className="flex items-center space-x-3 font-mono text-xs text-[#78AFFF]">
              <span className="px-2.5 py-1 rounded bg-[#10141B] border border-[rgba(120,175,255,0.3)]">
                PROJECT // {project.number}
              </span>
              <span className="text-[#9BA4B2]">{project.category}</span>
            </div>

            <button
              onClick={onClose}
              aria-label="Close case study"
              onMouseEnter={() => onCursorHover(true, 'CLOSE', 'button')}
              onMouseLeave={() => onCursorHover(false)}
              className="p-2 rounded-lg bg-[#10141B] border border-[rgba(255,255,255,0.1)] text-[#9BA4B2] hover:text-[#F5F7FA] hover:border-[#78AFFF] transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Header Title */}
          <div className="mb-8 space-y-3">
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-[#F5F7FA] tracking-tight">
              {project.title}
            </h2>
            <p className="text-lg text-[#9BA4B2] max-w-3xl font-normal leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Tech Badges */}
          <div className="flex flex-wrap gap-2 mb-10">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-md bg-[#10141B] border border-[rgba(255,255,255,0.08)] font-mono text-xs text-[#B7D7FF]"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Grid Layout: Problem & Approach */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="p-6 rounded-xl bg-[#10141B]/60 border border-[rgba(255,255,255,0.06)] space-y-3">
              <div className="flex items-center space-x-2 text-xs font-mono text-[#78AFFF] uppercase tracking-wider">
                <Cpu className="w-4 h-4" />
                <span>01 // THE PROBLEM STATEMENT</span>
              </div>
              <p className="text-sm text-[#9BA4B2] leading-relaxed">
                {problem}
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#10141B]/60 border border-[rgba(255,255,255,0.06)] space-y-3">
              <div className="flex items-center space-x-2 text-xs font-mono text-[#B7D7FF] uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>02 // ENGINEERING APPROACH</span>
              </div>
              <p className="text-sm text-[#9BA4B2] leading-relaxed">
                {approach}
              </p>
            </div>
          </div>

          {/* Architecture Box */}
          <div className="p-6 rounded-xl bg-gradient-to-r from-[#10141B] to-[#0A0D12] border border-[rgba(120,175,255,0.2)] mb-10 space-y-4">
            <div className="flex items-center space-x-2 text-xs font-mono text-[#78AFFF] uppercase tracking-wider">
              <Layers className="w-4 h-4" />
              <span>03 // SYSTEM ARCHITECTURE FLOW</span>
            </div>
            <div className="p-4 rounded-lg bg-[#050609] border border-[rgba(255,255,255,0.08)] font-mono text-xs text-[#B7D7FF] overflow-x-auto">
              <code>{architecture}</code>
            </div>
          </div>

          {/* Key Challenges */}
          <div className="mb-10 space-y-4">
            <h3 className="font-mono text-xs text-[#596170] uppercase tracking-widest">
              04 // TECHNICAL CHALLENGES OVERCOME
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {challenges.map((c, i) => (
                <div key={i} className="flex items-start space-x-3 p-3.5 rounded-lg bg-[#10141B]/40 border border-[rgba(255,255,255,0.04)]">
                  <CheckCircle2 className="w-4 h-4 text-[#78AFFF] mt-0.5 shrink-0" />
                  <span className="text-sm text-[#9BA4B2]">{c}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Outcome */}
          <div className="p-6 rounded-xl bg-[rgba(120,175,255,0.05)] border border-[rgba(120,175,255,0.2)] mb-10 space-y-2">
            <div className="font-mono text-xs text-[#78AFFF] uppercase">05 // MEASURABLE OUTCOME</div>
            <p className="text-base text-[#F5F7FA] font-medium">
              {outcome}
            </p>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between border-t border-[rgba(255,255,255,0.08)] pt-6">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => onCursorHover(true, 'GITHUB', 'button')}
                onMouseLeave={() => onCursorHover(false)}
                className="flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-[#10141B] border border-[rgba(255,255,255,0.1)] hover:border-[#78AFFF] text-xs font-mono text-[#F5F7FA] transition-all"
              >
                <svg className="w-4 h-4 fill-current text-[#78AFFF]" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                <span>VIEW REPOSITORY</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#596170]" />
              </a>
            )}

            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-lg bg-[#78AFFF] text-[#050609] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#B7D7FF] transition-all"
            >
              CLOSE CASE STUDY
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
