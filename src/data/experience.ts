export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  badge?: string;
  description: string;
  bullets: string[];
  skills: string[];
}

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: "gemini-ambassador",
    role: "Google Gemini Student Ambassador",
    organization: "Google",
    period: "2026",
    badge: "Official Ambassador",
    description: "Leading developer engagement and technical exploration of Google Gemini 2.5/3.0 models, multimodal APIs, and developer tooling across academic & builder communities.",
    bullets: [
      "Organized technical deep-dives on Gemini API function calling, structured output schemas, and agentic workflows.",
      "Built reference implementations demonstrating zero-shot multimodal analysis and long-context processing.",
      "Collaborated with student developers and engineering leads to foster AI systems engineering."
    ],
    skills: ["Google Gemini API", "Multimodal AI", "Agent Workflows", "Technical Leadership", "System Demos"]
  },
  {
    id: "kalki-vision",
    role: "Founder & AI Systems Builder",
    organization: "Kalki Vision",
    period: "2025 - PRESENT",
    badge: "Builder Project",
    description: "Architecting reliable operational AI systems, exploring multi-agent orchestration layers, and building fail-safe execution pipelines around LLMs.",
    bullets: [
      "Engineered validation algorithms that parse, verify, and auto-correct LLM outputs prior to database persistence.",
      "Developed high-throughput async Rust micro-services for managing model state and concurrent tool calls.",
      "Designed interactive WebGL topology dashboards for real-time agent workflow telemetry."
    ],
    skills: ["Rust", "TypeScript", "AI Infrastructure", "System Architecture", "Agentic Systems"]
  },
  {
    id: "btech-developer",
    role: "Full-Stack & Systems Developer",
    organization: "B.Tech Computer Science",
    period: "2023 - PRESENT",
    badge: "Academic & Systems",
    description: "Deep technical study of computer science fundamentals, OS memory management, compilers, C++ concurrency, and high-performance full-stack web applications.",
    bullets: [
      "Built custom C++ data structures and lock-free thread pool abstractions for high-frequency data processing.",
      "Created modern Web platforms using React 19, Vite, Tailwind CSS, and WebGL animations.",
      "Participated in algorithmic coding competitions and open-source systems projects."
    ],
    skills: ["C++", "Rust", "React", "TypeScript", "Algorithms", "System Design"]
  }
];
