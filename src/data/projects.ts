export interface CaseStudy {
  role: string;
  overview: string;
  problem: string;
  approach: string;
  system: string;
  architecture: string;
  decisions: string[];
  challenges: string[];
  outcomes: string;
  learnings: string;
}

export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  year: string;
  description: string;
  technologies: string[];
  brandIcons: string[];
  hero3D: 'kalki-core' | 'agent-dag' | 'rust-systems' | 'topology-particles';
  featured: boolean;
  githubUrl?: string;
  liveUrl?: string;
  caseStudy: CaseStudy;
}

export const PROJECTS: Project[] = [
  {
    id: "kalki-vision",
    number: "01",
    title: "Kalki Vision",
    category: "AGENTIC AI / ORCHESTRATION / INFRASTRUCTURE",
    year: "2025 - 2026",
    description: "Architecting resilient orchestration layers for operational AI systems, enforcing deterministic execution boundaries and schema-repair loops around non-deterministic LLMs.",
    technologies: ["Rust", "TypeScript", "Google Gemini API", "Docker", "Zod", "Tailwind CSS"],
    brandIcons: ["rust", "typescript", "gemini", "docker"],
    hero3D: "kalki-core",
    featured: true,
    githubUrl: "https://github.com/Ankitkr-ak007",
    caseStudy: {
      role: "Founder & AI Systems Architect",
      overview: "Kalki Vision is an operational AI infrastructure framework designed to bridge the reliability gap between non-deterministic model completions and mission-critical production backends.",
      problem: "Raw LLM completions fail unpredictably when tool-calling or executing multi-step business logic without explicit contract validation. Hallucinations and malformed JSON payloads break downstream workflows.",
      approach: "Treat non-deterministic model completions as untrusted external network inputs, wrapping them in strict validation boundaries with automated zero-overhead schema repair.",
      system: "An asynchronous execution runtime written in Rust and TypeScript that parses model outputs through strict Zod schemas with an automatic schema-repair loop before state transitions.",
      architecture: "MODELS (Gemini 2.5/3.0) → AGENTS → TOOLS (Sandboxed Docker) → MEMORY → ORCHESTRATION (Rust Runtime) → APPLICATIONS",
      decisions: [
        "Adopted Rust for core state routing to eliminate garbage-collection micro-stutters during high-frequency agent tool calls.",
        "Implemented schema auto-patching rather than dropping malformed completions, preserving 94% of semi-valid model outputs.",
        "Isolated sub-agent tool sandboxes inside lightweight Docker containers to enforce security constraints."
      ],
      challenges: [
        "Handling non-deterministic JSON responses without inflating context token windows.",
        "Maintaining sub-50ms latency overhead during multi-step schema verification passes.",
        "Synchronizing concurrent thread state across async Rust workers without deadlock."
      ],
      outcomes: "Created a resilient agent framework capable of executing multi-step workflows with fail-safe recovery, complete state observability, and zero unhandled schema exceptions.",
      learnings: "Architecture around the model matters far more than prompt tuning. Deterministic guardrails and type systems turn experimental AI prototypes into dependable software."
    }
  },
  {
    id: "agent-orchestrator",
    number: "02",
    title: "Multi-Agent Workflow Engine",
    category: "DISTRIBUTED AI SYSTEMS / ORCHESTRATION",
    year: "2025 - 2026",
    description: "Distributed task Graph engine enabling specialized sub-agents (Planner, Researcher, Coder, Verifier) to collaborate on multi-file codebases with stateful memory.",
    technologies: ["TypeScript", "Node.js", "Gemini 2.5 / 3.0", "Redis", "WebSockets"],
    brandIcons: ["typescript", "nodejs", "gemini"],
    hero3D: "agent-dag",
    featured: true,
    githubUrl: "https://github.com/Ankitkr-ak007",
    caseStudy: {
      role: "Lead Systems & Backend Engineer",
      overview: "A directed acyclic graph (DAG) workflow engine that coordinates asynchronous sub-agent communication for complex, multi-stage engineering tasks.",
      problem: "Single-prompt systems suffer severe context degradation and hallucination loops when asked to research, modify, test, and verify across entire multi-file codebases.",
      approach: "Decompose monolithic prompts into discrete, role-specialized sub-agents operating along a validated DAG with consensus verification before disk commits.",
      system: "A distributed orchestrator breaking tasks into specialized sub-agents communicating over a typed message bus with shared graph memory and step-by-step verification.",
      architecture: "Planner Node → Directed Acyclic Graph (DAG) → Parallel Sub-Agents (Researcher, Coder, Verifier) → Consensus Node → Output Diff",
      decisions: [
        "Structured task flow as a strictly validated DAG to eliminate infinite recursion loops between sub-agents.",
        "Used Redis pub/sub for low-latency agent event streaming and live UI state replication.",
        "Integrated strict consensus voting before allowing code diffs to be committed to disk."
      ],
      challenges: [
        "Preventing deadlocks in cyclic sub-agent dependency graphs.",
        "Minimizing token usage across iterative multi-round research passes."
      ],
      outcomes: "Delivered a reliable multi-agent orchestration engine with verifiable execution paths and zero cyclic lockups.",
      learnings: "Specialization beats monolithic models. Breaking problems into distinct roles (planning vs. coding vs. testing) dramatically reduces error rates."
    }
  },
  {
    id: "cpp-rust-systems",
    number: "03",
    title: "Low-Latency Systems Engine",
    category: "SYSTEMS & RUNTIMES / C++ & RUST",
    year: "2025",
    description: "High-performance C++20 and Rust computational utilities exploring zero-allocation memory pools, lock-free queues, and cache-aligned memory architecture.",
    technologies: ["C++20", "Rust", "CMake", "GTest", "SIMD Primitives"],
    brandIcons: ["cpp", "rust"],
    hero3D: "rust-systems",
    featured: true,
    githubUrl: "https://github.com/Ankitkr-ak007",
    caseStudy: {
      role: "Systems Programmer",
      overview: "A bare-metal performance exploration focusing on lock-free data structures, SIMD vectorization, and deterministic memory layouts in modern C++20 and Rust.",
      problem: "Standard garbage-collected runtimes introduce non-deterministic micro-stutters and memory fragmentation that degrade real-time data streaming and telemetry.",
      approach: "Pre-allocate memory blocks during startup and align cache structures to 64-byte boundaries to eliminate memory stalls and false sharing.",
      system: "Zero-allocation ring-buffer queues and custom memory pool allocators engineered for consistent sub-millisecond execution times under continuous load.",
      architecture: "Telemetry Ingestion → Lock-free Ring Buffer → SIMD Processor → Memory-Mapped File Storage",
      decisions: [
        "Utilized cache-aligned 64-byte structures to eliminate false sharing across CPU cores.",
        "Employed RAII and compile-time Rust borrow semantics to guarantee memory safety without runtime locks.",
        "Implemented SIMD vectorization for batch numerical computations."
      ],
      challenges: [
        "Enforcing strict memory ownership in Rust across dynamic multi-threaded worker pools.",
        "Optimizing cache line alignment across Intel and AMD processor architectures."
      ],
      outcomes: "Achieved deterministic execution latency with zero runtime heap allocations during continuous high-throughput data streams.",
      learnings: "Understanding hardware architecture and memory layout is the ultimate differentiator when software needs to be truly fast and predictable."
    }
  },
  {
    id: "neural-canvas-3d",
    number: "04",
    title: "Systems Topology Visualizer",
    category: "CREATIVE ENGINEERING & WEBGL",
    year: "2026",
    description: "GPU-accelerated interactive 3D particle constellation and procedural computational core rendered using Three.js, React Three Fiber, and custom GLSL shaders.",
    technologies: ["Three.js", "React Three Fiber", "GLSL Shaders", "TypeScript", "Tailwind CSS"],
    brandIcons: ["threejs", "react", "typescript", "tailwind"],
    hero3D: "topology-particles",
    featured: false,
    githubUrl: "https://github.com/Ankitkr-ak007",
    caseStudy: {
      role: "Creative Technologist & WebGL Engineer",
      overview: "A GPU-accelerated 3D WebGL visualization engine mapping distributed systems telemetry, node interactions, and bandwidth vectors into spatial geometric nodes.",
      problem: "Complex distributed architectures and agent state transitions are difficult to comprehend through static 2D flowcharts and tabular logs.",
      approach: "Leverage WebGL GPU instancing and fragment shaders to translate live telemetry vectors into fluid spatial 3D topology.",
      system: "A real-time WebGL particle engine utilizing custom fragment shaders, dynamic lighting, and instanced meshes to render live system topologies at 60fps.",
      architecture: "System Telemetry Stream → InstancedMesh Geometry → Custom GLSL Shaders → R3F Canvas Render Pipeline",
      decisions: [
        "Implemented InstancedMesh to render 10,000+ particles with a single GPU draw call.",
        "Built dynamic DPR scaling and graceful CSS 3D fallback for mobile and low-power devices.",
        "Replaced THREE.Clock with custom delta time accumulation to prevent r186 deprecation warnings."
      ],
      challenges: [
        "Maintaining rock-solid 60fps framerates during heavy interactive pointer manipulation.",
        "Handling WebGL context loss gracefully without crashing the parent React application."
      ],
      outcomes: "Delivered a lightweight, fluid 3D spatial experience with responsive scaling and zero drop in framerate across desktop and mobile devices.",
      learnings: "Interactive 3D can elevate engineering storytelling when it communicates real architectural concepts rather than serving as mere visual decoration."
    }
  }
];
