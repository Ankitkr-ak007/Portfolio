export interface CaseStudy {
  problem: string;
  approach: string;
  architecture: string;
  challenges: string[];
  outcome: string;
}

export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  year: string;
  description: string;
  technologies: string[];
  image?: string;
  featured: boolean;
  githubUrl?: string;
  liveUrl?: string;
  caseStudy?: CaseStudy;
}

export const PROJECTS: Project[] = [
  {
    id: "kalki-vision",
    number: "01",
    title: "Kalki Vision",
    category: "AGENTIC AI / INFRASTRUCTURE",
    year: "2026",
    description: "Building resilient infrastructure and orchestration layers for operational AI systems, ensuring deterministic execution around non-deterministic models.",
    technologies: ["Rust", "TypeScript", "Google Gemini API", "Docker", "Agent Workflows"],
    featured: true,
    githubUrl: "https://github.com/Ankitkr-ak007",
    caseStudy: {
      problem: "Raw LLM completions fail unpredictable in production when tool calling or executing multi-step business logic without explicit boundary validation.",
      approach: "Engineered an asynchronous orchestration layer in Rust & TypeScript that wraps model outputs in strict Zod/Pydantic schemas with automatic schema-repair loops.",
      architecture: "Client Request → Orchestrator Core → Model Worker → Schema Validator → Fallback Repair Loop → Deterministic Execution Engine.",
      challenges: [
        "Handling non-deterministic JSON responses without inflating context size",
        "Maintaining < 50ms latency overhead during multi-step schema verification",
        "Managing thread locks and concurrent memory state in Rust backend"
      ],
      outcome: "Created a reliable execution framework capable of running complex agent tasks with fail-safe recovery and total state observability."
    }
  },
  {
    id: "agent-orchestrator",
    number: "02",
    title: "Multi-Agent Workflow Engine",
    category: "AI SYSTEMS / BACKEND",
    year: "2025 - 2026",
    description: "Distributed task Graph engine enabling sub-agents to collaborate on code generation, security audits, and continuous verification with stateful memory.",
    technologies: ["TypeScript", "Node.js", "Gemini 2.5/3.0", "Redis", "WebSockets"],
    featured: true,
    githubUrl: "https://github.com/Ankitkr-ak007",
    caseStudy: {
      problem: "Single-prompt systems hit context degradation and hallucination loops when handling end-to-end software development workflows.",
      approach: "Decomposed tasks into specialized sub-agent graphs (Researcher, Coder, Reviewer, Tester) communicating over a typed message bus.",
      architecture: "Planner Node → Directed Acyclic Graph (DAG) → Parallel Sub-Agents → Consensus & Verification Node → Final Output.",
      challenges: [
        "Preventing deadlocks in cyclic sub-agent dependency graphs",
        "Optimizing token utilization across iterative research rounds"
      ],
      outcome: "Achieved continuous 4x improvement in complex multi-file code editing reliability over single-pass LLM prompts."
    }
  },
  {
    id: "cpp-rust-systems",
    number: "03",
    title: "Low-Latency Systems Engine",
    category: "SYSTEMS & RUNTIMES",
    year: "2025",
    description: "High-performance C++ and Rust computational utilities exploring memory-safe concurrency, lock-free queues, and cache-aligned memory layout.",
    technologies: ["C++20", "Rust", "CMake", "GTest", "SIMD"],
    featured: true,
    githubUrl: "https://github.com/Ankitkr-ak007",
    caseStudy: {
      problem: "Standard garbage-collected runtimes introduce non-deterministic micro-stutters unacceptable for real-time systems telemetry.",
      approach: "Wrote zero-allocation memory pools and custom ring-buffer queues in C++20 and Rust for raw data stream processing.",
      architecture: "Telemetry Ingestion → Lock-free Ring Buffer → SIMD Processor → Memory-Mapped File Storage.",
      challenges: [
        "Enforcing strict memory ownership in Rust across dynamic thread pools",
        "Cache line alignment optimization for Intel/AMD architectures"
      ],
      outcome: "Sub-millisecond processing times with zero runtime allocations during continuous data streaming."
    }
  },
  {
    id: "neural-canvas-3d",
    number: "04",
    title: "Systems Topology Visualizer",
    category: "CREATIVE ENGINEERING & WebGL",
    year: "2026",
    description: "GPU-accelerated interactive 3D particle constellation and procedural computational core rendered using Three.js and custom GLSL shaders.",
    technologies: ["Three.js", "React Three Fiber", "GLSL", "TypeScript", "Tailwind CSS"],
    featured: false,
    githubUrl: "https://github.com/Ankitkr-ak007",
    caseStudy: {
      problem: "Complex distributed system graphs are difficult to visualize and comprehend using static 2D flowcharts.",
      approach: "Created a WebGL particle engine that maps node interactions, bandwidth usage, and latency into dynamic 3D geometric nodes.",
      architecture: "System Telemetry Hook → InstancedMesh Geometry → Custom Fragment Shader → R3F Canvas Render Pipeline.",
      challenges: [
        "Maintaining smooth 60fps performance with 10,000+ active particles",
        "Implementing graceful WebGL fallbacks for mobile and low-power devices"
      ],
      outcome: "Delivered an award-worthy interactive experience with full responsive scaling and zero drop in framerate."
    }
  }
];
