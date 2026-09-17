export interface SkillNode {
  id: string;
  name: string;
  category: "Languages" | "AI & Agents" | "Systems" | "Frontend" | "Backend & Data";
  level: string;
  description: string;
  whyIUseIt: string;
  projects: string[];
  connections: string[]; // Node IDs it links to
}

export const SKILLS: SkillNode[] = [
  {
    id: "rust",
    name: "Rust",
    category: "Languages",
    level: "Core Systems",
    description: "Memory safety without garbage collection, custom async runtimes, lock-free primitives, and CLI engines.",
    whyIUseIt: "Guarantees compile-time data race prevention and zero GC latency during real-time model execution.",
    projects: ["Kalki Vision", "Low-Latency Engine"],
    connections: ["cpp", "systems-arch", "agent-infra"]
  },
  {
    id: "cpp",
    name: "C++20",
    category: "Languages",
    level: "Bare-Metal",
    description: "RAII, custom memory pools, thread allocators, pointer arithmetic, and SIMD vector optimization.",
    whyIUseIt: "Direct hardware control and deterministic nanosecond-scale execution for computational kernels.",
    projects: ["Low-Latency Engine"],
    connections: ["rust", "systems-arch"]
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "Languages",
    level: "Full-Stack",
    description: "Strict static typing, complex generics, AST manipulation, schema validation with Zod, and full-stack architecture.",
    whyIUseIt: "Bridges frontend and backend with complete type parity and zero runtime type coercion surprises.",
    projects: ["Kalki Vision", "Agent Workflow Engine", "Portfolio"],
    connections: ["react", "nodejs", "gemini-api"]
  },
  {
    id: "react",
    name: "React 19 / Vite",
    category: "Frontend",
    level: "UI Architecture",
    description: "Component design systems, custom hooks, Motion animation, server components, and performance profiling.",
    whyIUseIt: "Modern concurrent rendering and declarative UI state management for sophisticated digital products.",
    projects: ["Portfolio", "Topology Visualizer"],
    connections: ["typescript", "threejs", "tailwind"]
  },
  {
    id: "threejs",
    name: "Three.js / WebGL",
    category: "Frontend",
    level: "3D & Canvas",
    description: "React Three Fiber, custom GLSL shaders, particle systems, instanced meshes, and postprocessing.",
    whyIUseIt: "Renders complex architectural spatial concepts into fluid 60fps GPU-accelerated interactive models.",
    projects: ["Topology Visualizer", "Systems Core"],
    connections: ["react", "typescript"]
  },
  {
    id: "gemini-api",
    name: "Google Gemini API",
    category: "AI & Agents",
    level: "Ambassador",
    description: "Structured outputs, function calling, multimodal context windows, sub-agent routing, and prompt tuning.",
    whyIUseIt: "World-class multimodal reasoning and massive long-context windows for multi-agent software engineering.",
    projects: ["Kalki Vision", "Agent Workflow Engine", "Gemini Demos"],
    connections: ["agent-infra", "typescript"]
  },
  {
    id: "agent-infra",
    name: "Agentic AI Infrastructure",
    category: "AI & Agents",
    level: "Architecture",
    description: "Multi-agent DAG graphs, stateful memory, validation loops, tool routing, and fail-safe fallback strategies.",
    whyIUseIt: "Enables autonomous sub-agents to collaborate on multi-file codebases without context degradation.",
    projects: ["Kalki Vision", "Agent Workflow Engine"],
    connections: ["gemini-api", "rust", "typescript"]
  },
  {
    id: "nodejs",
    name: "Node.js / Express",
    category: "Backend & Data",
    level: "Services",
    description: "Async event loops, REST & WebSocket servers, streaming middleware composition, and API gateways.",
    whyIUseIt: "Lightweight, scalable I/O orchestration and real-time WebSocket communication channels.",
    projects: ["Agent Workflow Engine"],
    connections: ["typescript", "postgresql", "docker"]
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "Backend & Data",
    level: "Data Store",
    description: "Relational schema design, indexes, transactional isolation, vector embeddings, and query optimization.",
    whyIUseIt: "Rock-solid transactional integrity and ACID compliance for mission-critical agent audit logs.",
    projects: ["Kalki Vision"],
    connections: ["nodejs", "docker"]
  },
  {
    id: "docker",
    name: "Docker & Containers",
    category: "Systems",
    level: "DevOps",
    description: "Containerization, multi-stage builds, and isolated runtime sandbox environments for AI tool execution.",
    whyIUseIt: "Guarantees reproducible build environments and sandboxes untrusted code generation securely.",
    projects: ["Kalki Vision", "Agent Workflow Engine"],
    connections: ["rust", "nodejs", "systems-arch"]
  },
  {
    id: "systems-arch",
    name: "System Design",
    category: "Systems",
    level: "Principles",
    description: "Determinism, fault tolerance, observability, rate limiting, and microservices patterns.",
    whyIUseIt: "Ensures software scales predictably and fails gracefully when operating under adversarial workloads.",
    projects: ["Kalki Vision", "Low-Latency Engine"],
    connections: ["rust", "cpp", "agent-infra", "docker"]
  },
  {
    id: "tailwind",
    name: "Tailwind CSS v4",
    category: "Frontend",
    level: "Design System",
    description: "Fluid design tokens, dark mode design systems, responsive micro-layouts, and CSS glassmorphism.",
    whyIUseIt: "Rapid, maintainable design token application without bloated stylesheet overhead.",
    projects: ["Portfolio"],
    connections: ["react", "typescript"]
  }
];
