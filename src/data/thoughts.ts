export interface ThoughtItem {
  id: string;
  category: string;
  title: string;
  summary: string;
  takeaway: string;
  readTime: string;
  date: string;
  tags: string[];
}

export const THOUGHTS_ITEMS: ThoughtItem[] = [
  {
    id: 'agentic-loops-vs-linear-pipelines',
    category: 'SYSTEMS ARCHITECTURE',
    title: 'Why Most LLM Agents Fail in Production (And How to Fix Them)',
    summary: 'Single-prompt applications are fragile. Production multi-agent architectures demand state machines with self-correction mechanisms, schema boundaries, and deterministic fallbacks.',
    takeaway: 'Wrap every non-deterministic generative step in compile-time schema validation and bounded retry loops.',
    readTime: '4 min read',
    date: '2026',
    tags: ['AI Agents', 'Architecture', 'TypeScript', 'Zod']
  },
  {
    id: 'rust-cpp-in-modern-web',
    category: 'SYSTEMS PROGRAMMING',
    title: 'Zero-Cost Abstractions: Where C++ & Rust Meet Modern Web Runtimes',
    summary: 'When web clients handle heavy mathematical transforms, WebAssembly compiled from C++ and Rust guarantees deterministic execution without garbage collector spikes.',
    takeaway: 'Offload memory-intensive graphics and AST parser pipelines to native WASM modules.',
    readTime: '6 min read',
    date: '2026',
    tags: ['Rust', 'C++', 'WebAssembly', 'Performance']
  },
  {
    id: 'spectacle-vs-precision',
    category: 'DESIGN ENGINEERING',
    title: '10% Spectacle, 90% Precision: The Philosophy of Engineering UI',
    summary: 'Visual flair should serve semantic meaning, not distract from it. Micro-interactions and WebGL shaders should reinforce systems architecture rather than clutter user workflows.',
    takeaway: 'Reserve animation frames for spatial context and state transitions; keep typography crisp and accessible.',
    readTime: '3 min read',
    date: '2026',
    tags: ['Three.js', 'Motion', 'UI/UX', 'Accessibility']
  }
];
