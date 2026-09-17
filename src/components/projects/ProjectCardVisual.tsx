import React from 'react';
import { motion } from 'motion/react';

interface ProjectCardVisualProps {
  type: 'kalki-core' | 'agent-dag' | 'rust-systems' | 'topology-particles';
}

export const ProjectCardVisual: React.FC<ProjectCardVisualProps> = ({ type }) => {
  return (
    <div className="w-full h-full relative flex items-center justify-center select-none pointer-events-none overflow-hidden">
      {/* Background Matrix Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,175,255,0.08)_0%,transparent_70%)]" />
      
      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-15" 
        style={{ 
          backgroundImage: 'linear-gradient(to right, rgba(120,175,255,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(120,175,255,0.15) 1px, transparent 1px)',
          backgroundSize: '16px 16px' 
        }} 
      />

      {type === 'kalki-core' && (
        <div className="relative flex items-center justify-center">
          {/* Outer Gyro Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
            className="w-36 h-36 rounded-full border border-dashed border-[#78AFFF]/30 flex items-center justify-center"
          >
            <div className="w-2.5 h-2.5 rounded-full border border-[#78AFFF] bg-[#0A0D14] absolute -top-1" />
          </motion.div>

          {/* Counter-rotating Middle Ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
            className="w-24 h-24 rounded-full border border-[rgba(183,215,255,0.25)] absolute flex items-center justify-center"
          >
            <div className="w-2 h-2 rounded-full bg-[#B7D7FF] absolute -bottom-1" />
          </motion.div>

          {/* Central 3D Octahedron Wireframe */}
          <motion.div
            animate={{ rotateY: 360, rotateX: [15, -15, 15] }}
            transition={{ rotateY: { duration: 12, repeat: Infinity, ease: 'linear' }, rotateX: { duration: 6, repeat: Infinity, ease: 'easeInOut' } }}
            style={{ transformStyle: 'preserve-3d' }}
            className="absolute w-14 h-14 rounded-xl bg-gradient-to-br from-[#10141E] to-[#0A0D14] border border-[#78AFFF] shadow-[0_0_25px_rgba(120,175,255,0.4)] flex items-center justify-center transform rotate-45"
          >
            <div className="w-3.5 h-3.5 rounded-sm bg-[#78AFFF] shadow-[0_0_12px_#78AFFF] animate-pulse" />
          </motion.div>

          {/* Floating Telemetry Coordinates */}
          <div className="absolute -bottom-6 font-mono text-[9px] text-[#78AFFF] tracking-wider px-2 py-0.5 rounded bg-[#10141E]/80 border border-[rgba(120,175,255,0.2)]">
            CORE // SYNC 100%
          </div>
        </div>
      )}

      {type === 'agent-dag' && (
        <div className="relative w-48 h-36 flex items-center justify-center">
          {/* SVG Connection Lines with Pulse Effect */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 192 144">
            <line x1="96" y1="36" x2="40" y2="108" stroke="rgba(120,175,255,0.3)" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="96" y1="36" x2="96" y2="108" stroke="rgba(120,175,255,0.3)" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="96" y1="36" x2="152" y2="108" stroke="rgba(120,175,255,0.3)" strokeWidth="1.5" strokeDasharray="3 3" />
            
            {/* Animated Data Packets */}
            <motion.circle
              r="2.5"
              fill="#78AFFF"
              animate={{ cx: [96, 40], cy: [36, 108], opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.circle
              r="2.5"
              fill="#B7D7FF"
              animate={{ cx: [96, 96], cy: [36, 108], opacity: [0, 1, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
            />
            <motion.circle
              r="2.5"
              fill="#38BDF8"
              animate={{ cx: [96, 152], cy: [36, 108], opacity: [0, 1, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
            />
          </svg>

          {/* Master Orchestrator Node */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-lg bg-[#0A0D14] border border-[#78AFFF] shadow-[0_0_15px_rgba(120,175,255,0.5)] flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-[#78AFFF] animate-ping" />
          </div>

          {/* Worker Node 1 */}
          <div className="absolute bottom-4 left-5 w-7 h-7 rounded-md bg-[#10141E] border border-[rgba(255,255,255,0.15)] flex items-center justify-center">
            <span className="font-mono text-[8px] text-[#B7D7FF]">W1</span>
          </div>

          {/* Worker Node 2 */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-7 h-7 rounded-md bg-[#10141E] border border-[rgba(255,255,255,0.15)] flex items-center justify-center">
            <span className="font-mono text-[8px] text-[#B7D7FF]">W2</span>
          </div>

          {/* Worker Node 3 */}
          <div className="absolute bottom-4 right-5 w-7 h-7 rounded-md bg-[#10141E] border border-[rgba(255,255,255,0.15)] flex items-center justify-center">
            <span className="font-mono text-[8px] text-[#B7D7FF]">W3</span>
          </div>
        </div>
      )}

      {type === 'rust-systems' && (
        <div className="relative flex items-center justify-center">
          {/* Isometric Rotating Memory Register */}
          <motion.div
            animate={{ rotateZ: 360, rotateX: 55, rotateY: -25 }}
            transition={{ rotateZ: { duration: 20, repeat: Infinity, ease: 'linear' } }}
            style={{ transformStyle: 'preserve-3d' }}
            className="w-24 h-24 rounded-2xl border-2 border-[#F59E0B]/50 bg-[#10141E]/40 flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.2)]"
          >
            <div className="w-14 h-14 rounded-xl border border-[#F59E0B]/80 bg-[#0A0D14] flex items-center justify-center">
              <span className="font-mono text-[10px] text-[#F59E0B] font-bold">RUST</span>
            </div>
          </motion.div>

          <div className="absolute -bottom-6 font-mono text-[9px] text-[#F59E0B] tracking-wider px-2 py-0.5 rounded bg-[#10141E]/80 border border-[#F59E0B]/30">
            0x7FFE_00A4 // 0ms GC
          </div>
        </div>
      )}

      {type === 'topology-particles' && (
        <div className="relative w-48 h-36 flex items-center justify-center">
          {/* Radar Sweep Effect */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="absolute w-28 h-28 rounded-full border border-[#78AFFF]/20 flex items-center justify-center"
          >
            <div className="w-1/2 h-0.5 bg-gradient-to-r from-transparent to-[#78AFFF] absolute right-0" />
          </motion.div>

          {/* Orbiting Matrix Points */}
          <div className="relative w-24 h-24 flex items-center justify-center">
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0"
            >
              <div className="w-2 h-2 rounded-full bg-[#78AFFF] absolute top-1 left-3 shadow-[0_0_8px_#78AFFF]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#B7D7FF] absolute bottom-2 right-4" />
              <div className="w-2 h-2 rounded-full bg-[#38BDF8] absolute top-6 right-2 shadow-[0_0_8px_#38BDF8]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#78AFFF] absolute bottom-6 left-1" />
            </motion.div>

            <div className="w-9 h-9 rounded-full border border-[rgba(120,175,255,0.4)] bg-[#0A0D14] flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-[#78AFFF] shadow-[0_0_10px_#78AFFF]" />
            </div>
          </div>

          <div className="absolute -bottom-2 font-mono text-[9px] text-[#38BDF8] tracking-wider px-2 py-0.5 rounded bg-[#10141E]/80 border border-[#38BDF8]/30">
            TOPOLOGY // MESH
          </div>
        </div>
      )}
    </div>
  );
};
