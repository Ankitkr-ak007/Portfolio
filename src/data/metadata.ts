export interface SiteMetadata {
  name: string;
  title: string;
  role: string;
  ambassadorRole: string;
  founderRole: string;
  description: string;
  status: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  systemVersion: string;
  buildYear: number;
}

export const SITE_METADATA: SiteMetadata = {
  name: "Ankit Kumar",
  title: "Ankit Kumar — Engineering × AI",
  role: "Full-Stack Developer · Systems & AI Builder",
  ambassadorRole: "Google Gemini Student Ambassador 2026",
  founderRole: "Builder & Contributor, Kalki Vision",
  description: "Systems and AI builder crafting high-throughput agentic workflows, deterministic architectures, and immersive high-performance web applications.",
  status: "OPEN FOR ENGINEERING ROLES & COLLABORATION",
  location: "India",
  email: "ankit.kr.dev@gmail.com",
  github: "https://github.com/Ankitkr-ak007",
  linkedin: "https://www.linkedin.com/in/ankit-kumar-dev",
  systemVersion: "v2026.4.1",
  buildYear: 2026,
};

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  index: string;
}

export const NAVIGATION_ITEMS: NavigationItem[] = [
  { id: 'work', label: 'WORK', href: '#work', index: '01' },
  { id: 'engineering-dna', label: 'SYSTEMS', href: '#engineering-dna', index: '02' },
  { id: 'architecture', label: 'ARCH', href: '#architecture', index: '03' },
  { id: 'lab', label: 'AI LAB', href: '#lab', index: '04' },
  { id: 'experience', label: 'EXP', href: '#experience', index: '05' },
  { id: 'about', label: 'ABOUT', href: '#about', index: '06' },
  { id: 'contact', label: 'CONTACT', href: '#contact', index: '07' },
];
