import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Command, ArrowRight, Terminal, Layers, Sparkles, X } from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTerminal: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenTerminal,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          setQuery('');
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const commands = [
    { label: 'Go to Selected Work', action: () => scrollTo('#work'), icon: <Layers className="w-4 h-4 text-[#78AFFF]" /> },
    { label: 'Go to Engineering Philosophy', action: () => scrollTo('#engineering'), icon: <Sparkles className="w-4 h-4 text-[#B7D7FF]" /> },
    { label: 'Go to Experience Timeline', action: () => scrollTo('#experience'), icon: <ArrowRight className="w-4 h-4 text-[#38BDF8]" /> },
    { label: 'Go to The Lab Experiments', action: () => scrollTo('#lab'), icon: <Terminal className="w-4 h-4 text-[#78AFFF]" /> },
    { label: 'Go to About Me', action: () => scrollTo('#about'), icon: <Search className="w-4 h-4 text-[#9BA4B2]" /> },
    { label: 'Go to Contact', action: () => scrollTo('#contact'), icon: <ArrowRight className="w-4 h-4 text-emerald-400" /> },
    { label: 'Open Interactive Terminal', action: () => { onClose(); onOpenTerminal(); }, icon: <Terminal className="w-4 h-4 text-[#78AFFF]" /> },
    { label: 'Open GitHub Repository', action: () => window.open('https://github.com/Ankitkr-ak007', '_blank'), icon: (
      <svg className="w-4 h-4 fill-current text-[#F5F7FA]" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    ) },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  function scrollTo(selector: string) {
    onClose();
    const el = document.querySelector(selector);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#050609]/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          className="relative w-full max-w-xl bg-[#0A0D12] border border-[rgba(120,175,255,0.2)] rounded-2xl shadow-[0_0_60px_rgba(0,0,0,0.9)] z-10 overflow-hidden font-mono"
        >
          {/* Search Input Bar */}
          <div className="flex items-center px-4 border-b border-[rgba(255,255,255,0.08)]">
            <Command className="w-4 h-4 text-[#78AFFF] mr-3 shrink-0" />
            <input
              type="text"
              autoFocus
              placeholder="Type a command or search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full py-4 bg-transparent text-sm text-[#F5F7FA] placeholder-[#596170] focus:outline-none"
            />
            <button onClick={onClose} className="p-1 text-[#596170] hover:text-[#F5F7FA]">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Command List */}
          <div className="max-h-72 overflow-y-auto p-2 space-y-1">
            {filteredCommands.length > 0 ? (
              filteredCommands.map((cmd, i) => (
                <button
                  key={i}
                  onClick={cmd.action}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-[#10141B] text-xs text-[#9BA4B2] hover:text-[#F5F7FA] transition-colors group text-left"
                >
                  <div className="flex items-center space-x-3">
                    {cmd.icon}
                    <span>{cmd.label}</span>
                  </div>
                  <span className="text-[10px] text-[#596170] group-hover:text-[#78AFFF]">EXECUTE ↵</span>
                </button>
              ))
            ) : (
              <div className="p-4 text-center text-xs text-[#596170]">No matching commands</div>
            )}
          </div>

          <div className="px-4 py-2 bg-[#050609] border-t border-[rgba(255,255,255,0.06)] text-[10px] text-[#596170] flex justify-between">
            <span>PRESS ESC TO CLOSE</span>
            <span>ANKIT KUMAR CLI</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
