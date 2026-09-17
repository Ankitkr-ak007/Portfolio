export interface SkillNode {
  id: string;
  name: string;
  category: "Languages" | "AI & Agents" | "Systems" | "Frontend" | "Backend & Data";
  level: string;
  description: string;
  connections: string[]; // Node IDs it links to
}

export const SKILLS: SkillNode[] = [
  {
    id: "rust",
    name: "Rust",
    category: "Languages",
    level: "Core Systems",
    description: "Memory safety without garbage collection, custom async runtimes, lock-free primitives, and CLI engines.",
    connections: ["cpp", "systems-arch", "agent-infra"]
  },
  {
    id: "cpp",
    name: "C++",
    category: "Languages",
    level: "Performance",
    description: "C++20, RAII, custom allocators, thread pools, pointer arithmetic, and algorithmic optimization.",
    connections: ["rust", "systems-arch"]
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "Languages",
    level: "Full-Stack",
    description: "Strict static typing, complex generics, AST parsing, schema validation with Zod, and production React apps.",
    connections: ["react", "nodejs", "gemini-api"]
  },
  {
    id: "react",
    name: "React 19 / Vite",
    category: "Frontend",
    level: "UI Architecture",
    description: "Component design systems, custom hooks, Motion animation, server components, performance tuning.",
    connections: ["typescript", "threejs", "tailwind"]
  },
  {
    id: "threejs",
    name: "Three.js / WebGL",
    category: "Frontend",
    level: "3D & Canvas",
    description: "React Three Fiber, custom GLSL shaders, particle systems, camera controls, postprocessing effects.",
    connections: ["react", "typescript"]
  },
  {
    id: "gemini-api",
    name: "Google Gemini API",
    category: "AI & Agents",
    level: "Ambassador",
    description: "Structured outputs, function calling, multimodal context windows, agent orchestration, prompt tuning.",
    connections: ["agent-infra", "typescript", "python"]
  },
  {
    id: "agent-infra",
    name: "Agentic AI Infrastructure",
    category: "AI & Agents",
    level: "Architecture",
    description: "Multi-agent graphs, stateful memory, validation loops, tool routing, fail-safe fallback strategies.",
    connections: ["gemini-api", "rust", "typescript"]
  },
  {
    id: "nodejs",
    name: "Node.js / Express",
    category: "Backend & Data",
    level: "Services",
    description: "Async event loops, REST & WebSocket servers, middleware composition, API gateways.",
    connections: ["typescript", "postgresql", "docker"]
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    category: "Backend & Data",
    level: "Data Store",
    description: "Relational schema design, indexes, transactional isolation, vector embeddings, query optimization.",
    connections: ["nodejs", "docker"]
  },
  {
    id: "docker",
    name: "Docker & Containers",
    category: "Systems",
    level: "DevOps",
    description: "Containerization, multi-stage builds, isolated runtime environments for AI tool execution.",
    connections: ["rust", "nodejs", "systems-arch"]
  },
  {
    id: "systems-arch",
    name: "System Design",
    category: "Systems",
    level: "Principles",
    description: "Determinism, fault tolerance, observability, rate limiting, microservices, architectural patterns.",
    connections: ["rust", "cpp", "agent-infra", "docker"]
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "Frontend",
    level: "Styling Token",
    description: "Fluid design tokens, dark mode design systems, responsive micro-layouts, glassmorphism utilities.",
    connections: ["react", "typescript"]
  }
];
