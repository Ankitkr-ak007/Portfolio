# Ankit Kumar — Flagship Engineering & AI Portfolio

> **"I build systems that think."**

A production-grade, award-winning personal portfolio website built for **Ankit Kumar** — B.Tech Student, Full-Stack Engineer, C++ & Rust Developer, AI Systems Infrastructure Enthusiast, and Google Gemini Student Ambassador 2026.

---

## 🛠️ Technology Stack

- **Core**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS v4, Custom CSS Design Tokens
- **Animations**: Motion (`motion/react`), Lenis Smooth Scroll
- **3D & Canvas**: Three.js, React Three Fiber (`@react-three/fiber`), `@react-three/drei`
- **Icons**: Lucide React
- **Utilities**: `clsx`, `tailwind-merge`, `zod`

---

## ⚡ Quick Start

### 1. Install Dependencies
```bash
npm install --legacy-peer-deps
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

---

## 📁 Architecture Overview

```text
src/
├── app/
│   └── App.tsx              # Root application component
├── components/
│   ├── 3d/                  # Three.js 3D Systems Core & Fallbacks
│   │   ├── SystemsCoreCanvas.tsx
│   │   ├── SystemsCoreScene.tsx
│   │   └── FallbackScene.tsx
│   ├── hero/                # Hero section & conceptual telemetry
│   ├── projects/            # Selected work cards & full-screen case study modals
│   ├── engineering/         # Principles, interactive topology flow & constellation
│   ├── experience/          # Vertical timeline with signal line
│   ├── lab/                 # Interactive mini-experiments (DAG, Rust Memory, Canvas Wave)
│   ├── insight/             # Editorial AI vs Engineering comparison & thesis banner
│   ├── about/               # Biography, portrait placeholder & credibility layer
│   ├── contact/             # Contact form & direct channels
│   ├── layout/              # Header nav, Footer & Custom Cursor
│   └── ui/                  # Preloader, Command Palette (Ctrl+K), Terminal shell, CodeWindow
├── data/
│   ├── projects.ts          # Project dataset & case study details
│   ├── experience.ts        # Experience & Ambassador journey data
│   ├── skills.ts            # Technical constellation nodes
│   └── labExperiments.ts    # Interactive lab experiments
├── hooks/
│   ├── useLenis.ts          # Smooth scrolling hook
│   └── useCustomCursor.ts   # Magnetic custom cursor hook
├── styles/
│   └── globals.css          # Design tokens, theme colors & custom keyframe animations
└── main.tsx
```

---

## 📝 How to Update Portfolio Content

All content is data-driven and stored in clean TypeScript files under `src/data/`:

1. **Projects & Case Studies**: Modify `src/data/projects.ts` to add or update projects, technologies, and detailed problem/solution breakdowns.
2. **Experience & Milestones**: Update `src/data/experience.ts` to edit roles, Google Gemini Ambassador details, and achievements.
3. **Skills Constellation**: Edit `src/data/skills.ts` to add skill nodes, categories, and connection relationships.
4. **Lab Experiments**: Modify `src/data/labExperiments.ts` to adjust experiment descriptions or titles.

---

## 💡 Keyboard Shortcuts & Features

- **`Ctrl + K` or `⌘ + K`**: Opens developer Command Palette.
- **Interactive Terminal**: Click "Open Terminal" or run command in palette to trigger the CLI shell. (Try typing `sudo`!).
- **Custom Cursor**: Desktop spring physics cursor with hover labels (`VIEW PROJECT`, `EXPLORE`, `GITHUB`). Automatically fallback on touch devices.
- **WebGL Fallback**: Graceful CSS 3D fallback if WebGL fails or is unsupported.
- **Preloader**: 1.5s intro sequence; remembers `sessionStorage` so repeat visits skip the preloader.

---

## 📄 License

Created for Ankit Kumar © 2026. All rights reserved.
