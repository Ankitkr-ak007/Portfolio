export interface LabExperiment {
  id: string;
  number: string;
  title: string;
  tagline: string;
  category: string;
  description: string;
  tech: string[];
}

export const LAB_EXPERIMENTS: LabExperiment[] = [
  {
    id: "agent-graph",
    number: "EXP-01",
    title: "Agent Topology & Signal Flow",
    tagline: "Interactive sub-agent signal propagation and state DAG",
    category: "AI INFRASTRUCTURE",
    description: "Simulate a live multi-agent execution pipeline. Click nodes to dispatch packets, view payload validation, and observe state synchronization.",
    tech: ["TypeScript", "State Graph", "SVG Signal Animation"]
  },
  {
    id: "rust-memory",
    number: "EXP-02",
    title: "Rust Borrow Checker Visualizer",
    tagline: "Interactive stack vs. heap borrowing & scope lifetime mechanics",
    category: "SYSTEMS PROGRAMMING",
    description: "Explore Rust's zero-cost abstraction ownership model. Toggle mutable references (`&mut T`) and watch how the compiler blocks data races at compile-time.",
    tech: ["Rust Concepts", "Memory Layout", "Interactive Simulation"]
  },
  {
    id: "neural-stream",
    number: "EXP-03",
    title: "Procedural Canvas Stream",
    tagline: "Real-time 60fps trigonometric particle vector field",
    category: "CREATIVE COMPUTING",
    description: "A mathematical particle vector field generated via 2D Canvas context. Tweak wave frequency, velocity, and turbulence in real-time.",
    tech: ["HTML5 Canvas", "Trigonometry", "Vector Fields"]
  },
  {
    id: "output-validator",
    number: "EXP-04",
    title: "Deterministic Schema Repair Loop",
    tagline: "Self-healing LLM response verification pipeline",
    category: "RELIABILITY ENGINEERING",
    description: "Watch a malformed model completion get intercepted by Zod schemas, triggering an instant zero-latency repair instruction.",
    tech: ["Schema Verification", "Zod Parser", "Self-Healing JSON"]
  }
];
