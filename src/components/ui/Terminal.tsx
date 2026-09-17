import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Terminal as TerminalIcon } from 'lucide-react';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandHistory {
  cmd: string;
  output: string;
}

export const Terminal: React.FC<TerminalProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandHistory[]>([
    { cmd: 'help', output: 'Available commands: whoami, stack, work, lab, contact, sudo, clear, exit' }
  ]);

  useBodyScrollLock(isOpen);

  if (!isOpen) return null;

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCmd = input.trim().toLowerCase();
    if (!cleanCmd) return;

    let output = '';

    switch (cleanCmd) {
      case 'help':
        output = 'Available commands: whoami, stack, work, lab, contact, sudo, clear, exit';
        break;
      case 'whoami':
        output = 'Ankit Kumar — B.Tech Student, Full-Stack Engineer, C++/Rust Developer & AI Builder. Google Gemini Student Ambassador 2026.';
        break;
      case 'stack':
        output = 'Core: Rust, C++, TypeScript, React 19, Three.js, Node.js, PostgreSQL, Docker, Google Gemini API.';
        break;
      case 'work':
        output = 'Projects: Kalki Vision (Agentic AI), Multi-Agent Workflow Engine, Low-Latency C++ Engine, WebGL Topology Visualizer.';
        break;
      case 'lab':
        output = 'Active Experiments: Sub-Agent Graph, Rust Borrow Checker Simulator, Procedural Canvas Stream, Schema Repair Loop.';
        break;
      case 'contact':
        output = 'Email: ankit@kalkivision.ai | GitHub: https://github.com/Ankitkr-ak007';
        break;
      case 'sudo':
        output = '⚡ ROOT ACCESS GRANTED: "Architecture > Prompting. Systems built with control always outlast raw completions."';
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'exit':
        onClose();
        return;
      default:
        output = `Command not recognized: '${cleanCmd}'. Type 'help' for available commands.`;
    }

    setHistory((prev) => [...prev, { cmd: input, output }]);
    setInput('');
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 h-[100dvh] w-full overflow-hidden flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-label="Interactive Terminal"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#050609]/85 backdrop-blur-md"
        />

        {/* Dedicated Terminal Scroll Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-2xl bg-[#0A0D12] border border-[rgba(120,175,255,0.3)] rounded-xl shadow-[0_0_60px_rgba(0,0,0,0.95)] z-10 overflow-hidden font-mono"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#10141B] border-b border-[rgba(255,255,255,0.08)]">
            <div className="flex items-center space-x-2 text-xs text-[#78AFFF]">
              <TerminalIcon className="w-4 h-4" />
              <span>ankit@kalki-core:~ (zsh)</span>
            </div>
            <button onClick={onClose} aria-label="Close terminal" className="p-1 text-[#596170] hover:text-[#F5F7FA]">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Terminal Independent Scrollable Content Area */}
          <div
            data-lenis-prevent="true"
            data-lenis-prevent-touch="true"
            onWheel={(e) => e.stopPropagation()}
            className="p-4 max-h-[min(70dvh,540px)] overflow-y-auto overscroll-contain space-y-3 text-xs font-mono"
          >
            <div className="text-[#596170]">
              KALKI VISION TERMINAL // VERSION 2026.1 <br />
              Type <span className="text-[#78AFFF]">help</span> to list commands or <span className="text-[#78AFFF]">exit</span> to close.
            </div>

            {history.map((h, i) => (
              <div key={i} className="space-y-1">
                <div className="flex items-center space-x-2 text-[#78AFFF]">
                  <span>ankit@kalki-core:~$</span>
                  <span className="text-[#F5F7FA] font-bold">{h.cmd}</span>
                </div>
                <div className="text-[#9BA4B2] pl-4 whitespace-pre-wrap">{h.output}</div>
              </div>
            ))}

            {/* Input Line */}
            <form onSubmit={handleCommand} className="flex items-center space-x-2 pt-2">
              <span className="text-[#78AFFF]">ankit@kalki-core:~$</span>
              <input
                type="text"
                autoFocus
                aria-label="Terminal command input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full bg-transparent text-xs text-[#F5F7FA] focus:outline-none"
              />
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
