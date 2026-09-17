import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Building2, GraduationCap, CheckCircle } from 'lucide-react';
import { EXPERIENCE } from '../../data/experience';
import { BrandIcon } from '../ui/BrandIcons';

export const ExperienceTimeline: React.FC = () => {
  const getIcon = (id: string) => {
    if (id === 'gemini-ambassador') return <Sparkles className="w-5 h-5 text-[#78AFFF]" />;
    if (id === 'kalki-vision') return <Building2 className="w-5 h-5 text-[#B7D7FF]" />;
    return <GraduationCap className="w-5 h-5 text-[#38BDF8]" />;
  };

  return (
    <section id="experience" className="py-28 px-6 md:px-12 bg-[#030407] relative">
      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="space-y-4 pb-8 border-b border-[rgba(255,255,255,0.07)]">
          <div className="font-mono text-xs text-[#78AFFF] uppercase tracking-widest flex items-center space-x-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#78AFFF]" />
            <span>JOURNEY & MILESTONES // 05</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter text-[#F8FAFC]">
            EXPERIENCE & INITIATIVES
          </h2>
          <p className="text-base sm:text-lg text-[#94A3B8] font-normal">
            Verifiable technical milestones shaping my perspective on systems and software engineering.
          </p>
        </div>

        {/* Vertical Timeline Container */}
        <div className="relative pl-6 sm:pl-10 space-y-12">
          
          {/* Vertical Glowing Signal Line */}
          <div className="absolute left-2 sm:left-3 top-2 bottom-2 w-[2px] bg-[rgba(255,255,255,0.08)]">
            <div className="w-full h-full bg-gradient-to-b from-[#78AFFF] via-[#B7D7FF] to-transparent animate-pulse" />
          </div>

          {EXPERIENCE.map((exp, index) => {
            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {/* Timeline Node Marker */}
                <div className="absolute -left-[30px] sm:-left-[43px] top-1.5 w-7 h-7 rounded-full bg-[#030407] border border-[#78AFFF] shadow-[0_0_15px_#78AFFF] flex items-center justify-center z-10">
                  <span className="w-2 h-2 rounded-full bg-[#78AFFF] animate-ping" />
                </div>

                {/* Experience Card */}
                <div className="p-6 sm:p-8 rounded-2xl bg-[#0A0D14] border border-[rgba(255,255,255,0.07)] hover:border-[#78AFFF] transition-all space-y-4">
                  
                  {/* Top Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center space-x-3">
                      {getIcon(exp.id)}
                      <div>
                        <h3 className="text-xl sm:text-2xl font-extrabold uppercase text-[#F8FAFC]">
                          {exp.role}
                        </h3>
                        <div className="font-mono text-xs text-[#78AFFF]">
                          {exp.organization}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 font-mono text-xs">
                      {exp.badge && (
                        <span className="px-2.5 py-1 rounded bg-[#10141E] border border-[rgba(120,175,255,0.3)] text-[#B7D7FF] uppercase text-[10px]">
                          {exp.badge}
                        </span>
                      )}
                      <span className="text-[#475569]">{exp.period}</span>
                    </div>
                  </div>

                  {/* Summary Description */}
                  <p className="text-sm text-[#94A3B8] leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Bullets List */}
                  <div className="space-y-2 pt-2 border-t border-[rgba(255,255,255,0.04)]">
                    {exp.bullets.map((bullet, i) => (
                      <div key={i} className="flex items-start space-x-2.5 text-xs text-[#94A3B8]">
                        <CheckCircle className="w-3.5 h-3.5 text-[#78AFFF] mt-0.5 shrink-0" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded bg-[#10141E] font-mono text-[10px] text-[#94A3B8] border border-[rgba(255,255,255,0.06)]"
                      >
                        <BrandIcon name={skill} className="w-3 h-3 text-[#78AFFF]" />
                        <span>{skill}</span>
                      </span>
                    ))}
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
