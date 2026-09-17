import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, Cpu, Search, Code, Wrench, ShieldCheck, Database, CheckCircle, Info, Play, RotateCcw } from 'lucide-react';

interface DiagramNode {
  id: string;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
  description: string;
}

export const InteractiveDiagram: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<DiagramNode | null>(null);
  const [activeStep, setActiveStep] = useState<number>(-1);
  const [isSimulating, setIsSimulating] = useState(false);

  const nodes: DiagramNode[] = [
    {
      id: 'user',
      label: '01 // USER INTENT',
      sublabel: 'Objective & Constraints',
      icon: <User className="w-5 h-5 text-[#78AFFF]" />,
      description: 'Incoming user instruction or automated API webhook structured with metadata and system constraints.'
    },
    {
      id: 'orchestrator',
      label: '02 // ORCHESTRATOR',
      sublabel: 'DAG State & Task Router',
      icon: <Cpu className="w-5 h-5 text-[#B7D7FF]" />,
      description: 'Central task dispatcher that breaks down complex requests into a directed acyclic graph (DAG) of specialized sub-agent tasks.'
    },
    {
      id: 'research',
      label: '03 // RESEARCH AGENT',
      sublabel: 'Codebase & Spec Indexing',
      icon: <Search className="w-5 h-5 text-[#38BDF8]" />,
      description: 'Sub-agent responsible for AST symbol resolution, dependency analysis, and Gemini API documentation retrieval.'
    },
    {
      id: 'coding',
      label: '04 // CODING AGENT',
      sublabel: 'Type-Safe Code Generation',
      icon: <Code className="w-5 h-5 text-[#78AFFF]" />,
      description: 'Sub-agent generating precise Rust/C++/TypeScript AST modifications with explicit type declarations.'
    },
    {
      id: 'tools',
      label: '05 // TOOL WORKERS',
      sublabel: 'Isolated Container Sandbox',
      icon: <Wrench className="w-5 h-5 text-[#B7D7FF]" />,
      description: 'Isolated Docker / WebAssembly runtimes executing linting, unit test suites, and compiler passes.'
    },
    {
      id: 'validation',
      label: '06 // VALIDATION LAYER',
      sublabel: 'Zod & Schema Auto-Repair',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      description: 'Zero-trust verification step. Intercepts schema violations and dispatches an immediate auto-repair loop.'
    },
    {
      id: 'state',
      label: '07 // PERSISTED STATE',
      sublabel: 'PostgreSQL / Memory Bus',
      icon: <Database className="w-5 h-5 text-[#78AFFF]" />,
      description: 'Immutable commit journal storing validated state, telemetry logs, and execution traces.'
    },
    {
      id: 'output',
      label: '08 // DETERMINISTIC OUTPUT',
      sublabel: 'Production-Ready Result',
      icon: <CheckCircle className="w-5 h-5 text-emerald-400" />,
      description: 'High-confidence response returned to the caller with zero raw LLM hallucinations or schema crashes.'
    }
  ];

  const handleSimulate = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setActiveStep(0);

    let current = 0;
    const interval = setInterval(() => {
      current++;
      if (current >= 8) {
        clearInterval(interval);
        setIsSimulating(false);
      } else {
        setActiveStep(current);
      }
    }, 700);
  };

  const handleReset = () => {
    setActiveStep(-1);
    setIsSimulating(false);
  };

  return (
    <div className="w-full p-6 sm:p-10 rounded-2xl bg-[#0A0D14] border border-[rgba(120,175,255,0.2)] shadow-[0_0_50px_rgba(0,0,0,0.8)] relative overflow-hidden">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[rgba(255,255,255,0.07)] mb-8 gap-4 font-mono text-xs">
        <div className="flex items-center space-x-2 text-[#78AFFF]">
          <span className="h-2 w-2 rounded-full bg-[#78AFFF] animate-ping" />
          <span className="font-bold">SYSTEM TOPOLOGY & SIGNAL DISPATCH ENGINE</span>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleSimulate}
            disabled={isSimulating}
            className="px-4 py-2 rounded-lg bg-[#78AFFF] text-[#030407] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#B7D7FF] disabled:opacity-50 transition-all flex items-center space-x-1.5"
          >
            <Play className="w-3.5 h-3.5" />
            <span>{isSimulating ? 'DISPATCHING PACKET...' : 'RUN PIPELINE SIMULATION'}</span>
          </button>

          <button
            onClick={handleReset}
            className="p-2 rounded-lg bg-[#10141E] border border-[rgba(255,255,255,0.08)] text-[#94A3B8] hover:text-[#F8FAFC] transition-all"
            title="Reset Simulation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Nodes Flow Graph */}
      <div className="space-y-6 relative z-10">
        
        {/* Row 1: User -> Orchestrator */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <NodeCard
            node={nodes[0]}
            isHighlighted={activeStep === 0}
            onSelect={() => setSelectedNode(nodes[0])}
          />
          <SignalConnector active={activeStep >= 0} />
          <NodeCard
            node={nodes[1]}
            isHighlighted={activeStep === 1}
            onSelect={() => setSelectedNode(nodes[1])}
          />
        </div>

        {/* Row 2: Parallel Sub-Agents (Research, Coder, Tools) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4 px-2 sm:px-6 rounded-xl bg-[#030407]/60 border border-[rgba(255,255,255,0.04)]">
          <NodeCard
            node={nodes[2]}
            isHighlighted={activeStep === 2}
            onSelect={() => setSelectedNode(nodes[2])}
          />
          <NodeCard
            node={nodes[3]}
            isHighlighted={activeStep === 3}
            onSelect={() => setSelectedNode(nodes[3])}
          />
          <NodeCard
            node={nodes[4]}
            isHighlighted={activeStep === 4}
            onSelect={() => setSelectedNode(nodes[4])}
          />
        </div>

        {/* Row 3: Validation -> State -> Output */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <NodeCard
            node={nodes[5]}
            isHighlighted={activeStep === 5}
            onSelect={() => setSelectedNode(nodes[5])}
          />
          <SignalConnector active={activeStep >= 5} />
          <NodeCard
            node={nodes[6]}
            isHighlighted={activeStep === 6}
            onSelect={() => setSelectedNode(nodes[6])}
          />
          <SignalConnector active={activeStep >= 6} />
          <NodeCard
            node={nodes[7]}
            isHighlighted={activeStep === 7}
            onSelect={() => setSelectedNode(nodes[7])}
          />
        </div>

      </div>

      {/* Explanation Callout Box */}
      {selectedNode && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 p-6 rounded-xl bg-[#10141E] border border-[#78AFFF] shadow-[0_0_30px_rgba(120,175,255,0.2)] flex items-start justify-between gap-4"
        >
          <div className="space-y-2">
            <div className="flex items-center space-x-2 font-mono text-xs text-[#78AFFF]">
              <Info className="w-4 h-4" />
              <span>{selectedNode.label} // {selectedNode.sublabel}</span>
            </div>
            <p className="text-sm sm:text-base text-[#F8FAFC] font-medium leading-relaxed">
              {selectedNode.description}
            </p>
          </div>
          <button
            onClick={() => setSelectedNode(null)}
            className="px-3 py-1.5 rounded-lg bg-[#030407] border border-[rgba(255,255,255,0.1)] text-xs font-mono text-[#94A3B8] hover:text-[#F8FAFC]"
          >
            CLOSE
          </button>
        </motion.div>
      )}
    </div>
  );
};

const NodeCard: React.FC<{ node: DiagramNode; isHighlighted: boolean; onSelect: () => void }> = ({
  node,
  isHighlighted,
  onSelect,
}) => (
  <div
    onClick={onSelect}
    className={`w-full sm:w-auto flex-1 p-4 rounded-xl border cursor-pointer transition-all duration-300 shadow-md select-none group ${
      isHighlighted
        ? 'bg-[#161D2B] border-[#78AFFF] shadow-[0_0_25px_rgba(120,175,255,0.4)] scale-[1.03]'
        : 'bg-[#10141E] border-[rgba(255,255,255,0.07)] hover:border-[#78AFFF] hover:bg-[#1A2234]'
    }`}
  >
    <div className="flex items-center space-x-3">
      <div className={`p-2 rounded-lg border ${isHighlighted ? 'bg-[#030407] border-[#78AFFF]' : 'bg-[#030407] border-[rgba(255,255,255,0.06)]'}`}>
        {node.icon}
      </div>
      <div>
        <div className={`font-mono text-xs font-bold uppercase tracking-wider ${isHighlighted ? 'text-[#78AFFF]' : 'text-[#F8FAFC] group-hover:text-[#78AFFF]'}`}>
          {node.label}
        </div>
        <div className="font-mono text-[10px] text-[#94A3B8]">
          {node.sublabel}
        </div>
      </div>
    </div>
  </div>
);

const SignalConnector: React.FC<{ active?: boolean }> = ({ active = false }) => (
  <div className="hidden sm:flex items-center justify-center w-8 h-2 relative">
    <div className="w-full h-[2px] bg-[rgba(120,175,255,0.25)] relative overflow-hidden">
      {active && <div className="absolute inset-0 bg-[#78AFFF] animate-signal" />}
    </div>
  </div>
);
