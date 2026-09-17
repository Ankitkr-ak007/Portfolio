import React from 'react';
import { motion } from 'motion/react';

export const AiPhilosophyBanner: React.FC = () => {
  return (
    <section className="py-24 px-6 md:px-12 bg-[#050609] relative overflow-hidden border-y border-[rgba(255,255,255,0.08)]">
      {/* Background Radial Light Field */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,175,255,0.1)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
        <div className="font-mono text-xs text-[#78AFFF] uppercase tracking-widest flex items-center justify-center space-x-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#78AFFF] animate-ping" />
          <span>AI SYSTEMS THESIS</span>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-tight text-[#F5F7FA]"
        >
          PROMPTING IS ONLY THE INTERFACE. <br />
          <span className="bg-gradient-to-r from-[#78AFFF] via-[#B7D7FF] to-[#38BDF8] bg-clip-text text-transparent">
            THE SYSTEM AROUND THE MODEL
          </span> <br />
          DETERMINES WHAT IT CAN ACTUALLY DO.
        </motion.h2>

        <p className="font-mono text-xs text-[#9BA4B2] tracking-wider uppercase pt-2">
          ANKIT KUMAR // AGENTIC AI & INFRASTRUCTURE
        </p>
      </div>
    </section>
  );
};
