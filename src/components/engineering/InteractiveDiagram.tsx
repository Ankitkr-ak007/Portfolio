import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, Cpu, Search, Code, Wrench, ShieldCheck, Database, CheckCircle, Info } from 'lucide-react';

interface DiagramNode {
  id: string;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
  description: string;
}

export const InteractiveDiagram: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<DiagramNode | null>(null);

  const nodes: DiagramNode[] = [
    {
      id: 'user',
      label: 'USER INPUT',
      sublabel: 'Intent & Constraints',
      icon: <User className="w-5 h-5 text-[#78AFFF]" />,
      description: 'Incoming user prompt or automated API trigger structured with metadata and system constraints.'
    },
    {
      id: 'orchestrator',
      label: 'ORCHESTRATOR',
      sublabel: 'State & Task Router',
      icon: <Cpu className="w-5 h-5 text-[#B7D7FF]" />,
      description: 'Central task dispatcher that breaks down complex requests into a directed acyclic graph (DAG) of specialized tool calls.'
    },
    {
      id: 'research',
      label: 'RESEARCH AGENT',
      sublabel: 'Context Gathering',
      icon: <Search className="w-5 h-5 text-[#38BDF8]" />,
      description: 'Sub-agent responsible for fetching codebase symbols, documentation, and external API specifications.'
    },
    {
      id: 'coding',
      label: 'CODING AGENT',
      sublabel: 'AST & Code Gen',
      icon: <Code className="w-5 h-5 text-[#78AFFF]" />,
      description: 'Sub-agent targeting precise code modifications using AST analysis and strict type checking.'
    },
    {
      id: 'tools',
      label: 'TOOL WORKERS',
      sublabel: 'Sandbox Execution',
      icon: <Wrench className="w-5 h-5 text-[#B7D7FF]" />,
      description: 'Isolated Docker / WebAssembly environments executing linting, unit tests, and compiler builds.'
    },
    {
      id: 'validation',
      label: 'VALIDATION LAYER',
      sublabel: 'Zod & Schema Repair',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      description: 'Zero-trust verification step. If output fails schema or unit test, auto-dispatches repair instruction loop.'
    },
    {
      id: 'state',
      label: 'PERSISTED STATE',
      sublabel: 'PostgreSQL / Memory',
      icon: <Database className="w-5 h-5 text-[#78AFFF]" />,
      description: 'Immutable commit log storing final validated code diffs, execution metrics, and context state.'
    },
    {
      id: 'output',
      label: 'DETERMINISTIC OUTPUT',
      sublabel: 'Clean Response',
      icon: <CheckCircle className="w-5 h-5 text-emerald-400" />,
      description: 'High-confidence response returned to the caller with zero raw LLM hallucinations.'
    }
  ];

  return (
    <div className="w-full p-6 sm:p-10 rounded-2xl bg-[#0A0D12] border border-[rgba(120,175,255,0.2)] shadow-[0_0_50px_rgba(0,0,0,0.8)] relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-[rgba(255,255,255,0.08)] mb-8 font-mono text-xs">
        <div className="flex items-center space-x-2 text-[#78AFFF]">
          <span className="h-2 w-2 rounded-full bg-[#78AFFF] animate-ping" />
          <span>INTERACTIVE SYSTEM TOPOLOGY</span>
        </div>
        <span className="text-[#596170]">CLICK ANY NODE FOR DETAILS</span>
      </div>

      {/* Nodes Flow Graph */}
      <div className="space-y-8 relative z-10">
        
        {/* Row 1: User -> Orchestrator */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
          <NodeCard node={nodes[0]} onSelect={() => setSelectedNode(nodes[0])} />
          <SignalConnector />
          <NodeCard node={nodes[1]} onSelect={() => setSelectedNode(nodes[1])} />
        </div>

        {/* Row 2: Parallel Sub-Agents (Research, Coder, Tools) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4 px-2 sm:px-6 rounded-xl bg-[#050609]/60 border border-[rgba(255,255,255,0.04)]">
          <NodeCard node={nodes[2]} onSelect={() => setSelectedNode(nodes[2])} />
          <NodeCard node={nodes[3]} onSelect={() => setSelectedNode(nodes[3])} />
          <NodeCard node={nodes[4]} onSelect={() => setSelectedNode(nodes[4])} />
        </div>

        {/* Row 3: Validation -> State -> Output */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <NodeCard node={nodes[5]} onSelect={() => setSelectedNode(nodes[5])} />
          <SignalConnector />
          <NodeCard node={nodes[6]} onSelect={() => setSelectedNode(nodes[6])} />
          <SignalConnector />
          <NodeCard node={nodes[7]} onSelect={() => setSelectedNode(nodes[7])} />
        </div>

      </div>

      {/* Explanation Modal Overlay */}
      {selectedNode && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 p-6 rounded-xl bg-[#10141B] border border-[#78AFFF] shadow-[0_0_30px_rgba(120,175,255,0.2)] flex items-start justify-between"
        >
          <div className="space-y-2">
            <div className="flex items-center space-x-2 font-mono text-xs text-[#78AFFF]">
              <Info className="w-4 h-4" />
              <span>{selectedNode.label} // {selectedNode.sublabel}</span>
            </div>
            <p className="text-sm text-[#F5F7FA] font-medium leading-relaxed">
              {selectedNode.description}
            </p>
          </div>
          <button
            onClick={() => setSelectedNode(null)}
            className="px-3 py-1 rounded bg-[#050609] border border-[rgba(255,255,255,0.1)] text-xs font-mono text-[#9BA4B2] hover:text-[#F5F7FA]"
          >
            CLOSE
          </button>
        </motion.div>
      )}
    </div>
  );
};

const NodeCard: React.FC<{ node: DiagramNode; onSelect: () => void }> = ({ node, onSelect }) => (
  <div
    onClick={onSelect}
    className="w-full sm:w-auto flex-1 p-4 rounded-xl bg-[#10141B] border border-[rgba(255,255,255,0.08)] hover:border-[#78AFFF] hover:bg-[#1A2230] cursor-pointer transition-all duration-200 shadow-md group"
  >
    <div className="flex items-center space-x-3">
      <div className="p-2 rounded-lg bg-[#050609] border border-[rgba(255,255,255,0.08)] group-hover:border-[#78AFFF]">
        {node.icon}
      </div>
      <div>
        <div className="font-mono text-xs font-bold text-[#F5F7FA] uppercase tracking-wider group-hover:text-[#78AFFF]">
          {node.label}
        </div>
        <div className="font-mono text-[10px] text-[#9BA4B2]">
          {node.sublabel}
        </div>
      </div>
    </div>
  </div>
);

const SignalConnector = () => (
  <div className="hidden sm:flex items-center justify-center w-8 h-2 relative">
    <div className="w-full h-[2px] bg-[rgba(120,175,255,0.3)] relative overflow-hidden">
      <div className="absolute inset-0 bg-[#78AFFF] animate-signal" />
    </div>
  </div>
);
