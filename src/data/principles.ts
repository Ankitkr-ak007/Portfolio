export interface EngineeringPrinciple {
  id: string;
  num: string;
  title: string;
  tagline: string;
  summary: string;
  detail: string;
  flow: string;
  iconName: 'Cpu' | 'ShieldCheck' | 'Layers' | 'Eye' | 'Activity';
  accentColor: string;
}

export const ENGINEERING_PRINCIPLES: EngineeringPrinciple[] = [
  {
    id: 'architecture-over-prompting',
    num: '01',
    title: 'Architecture > Prompting',
    tagline: 'RESILIENT GUARDRAILS',
    iconName: 'Cpu',
    accentColor: '#78AFFF',
    summary: 'AI systems fail when software architecture assumes model outputs are always correct. I wrap LLMs in strict schema verification and auto-repair feedback loops.',
    detail: 'Prompting is simply an interface. When building production software, you cannot rely on model benevolence. We construct deterministic pipelines where model outputs are validated against typed schemas, and failures trigger automated self-repair routines before reaching state persistence.',
    flow: 'INPUT → MODEL WORKER → ZOD PARSER → REPAIR LOOP → DATABASE'
  },
  {
    id: 'validation-over-blind-trust',
    num: '02',
    title: 'Validation > Blind Trust',
    tagline: 'ZERO-TRUST BOUNDARIES',
    iconName: 'ShieldCheck',
    accentColor: '#B7D7FF',
    summary: 'Never trust external or probabilistic input without strict boundary validation. If output fails contracts, intercept immediately.',
    detail: 'Every sub-agent tool call, user submission, and LLM JSON payload passes through runtime assertions. We eliminate downstream corrupted state by catching malformed structures at the exact ingestion boundary.',
    flow: 'PAYLOAD → RUNTIME TYPE CHECK → ASSERTION → DISPATCH'
  },
  {
    id: 'determinism-over-accidental-behavior',
    num: '03',
    title: 'Determinism > Accidental Behavior',
    tagline: 'PREDICTABLE STATE',
    iconName: 'Layers',
    accentColor: '#38BDF8',
    summary: 'Software requires explicit contracts, compile-time memory safety, and predictable state transitions. Rust and C++ provide stability when LLMs fluctuate.',
    detail: 'Where performance and reliability are paramount, we employ Rust ownership semantics and C++ zero-allocation queues. Combining deterministic systems code with probabilistic AI models yields fast, reliable applications.',
    flow: 'MEMORY SAFETY · COMPILE-TIME CHECKS · ZERO GC PAUSES'
  },
  {
    id: 'observability-over-guessing',
    num: '04',
    title: 'Observability > Guessing',
    tagline: 'AUDITABLE TRACES',
    iconName: 'Eye',
    accentColor: '#F59E0B',
    summary: 'You cannot optimize or debug what you cannot observe. Every sub-agent decision, token packet, and state delta must be traceable in real time.',
    detail: 'We build visual DAG topologies and event streaming into every multi-agent system. When a failure occurs, the exact sub-agent, prompt context, and token response are indexed for immediate post-mortem debugging.',
    flow: 'TRACE LOGGING → EVENT STREAM → TOPOLOGY INSPECTION'
  },
  {
    id: 'systems-over-isolated-features',
    num: '05',
    title: 'Systems > Isolated Features',
    tagline: 'COHESIVE INTEGRATION',
    iconName: 'Activity',
    accentColor: '#34D399',
    summary: 'Software is not a disconnected collection of UI widgets. It is an interconnected operating system where memory, backend, and interface act as one.',
    detail: 'From GPU shaders down to low-level socket queues, every architectural layer should support a singular, cohesive purpose. Engineering elegance lives in how clean and resilient the entire machine operates under load.',
    flow: 'INTERFACE ↔ BACKEND ↔ MEMORY ↔ OBSERVABILITY'
  }
];
