import React, { useState, Suspense, lazy } from 'react';
import { useLenis } from './hooks/useLenis';
import { useCustomCursor } from './hooks/useCustomCursor';
import { Preloader } from './components/ui/Preloader';
import { CustomCursor } from './components/layout/CustomCursor';
import { Header } from './components/layout/Header';
import { Hero } from './components/hero/Hero';
import { TechStrip } from './components/ui/TechStrip';
import { EditorialIntro } from './components/ui/EditorialIntro';
import { SelectedWork } from './components/projects/SelectedWork';
import { HowIThink } from './components/engineering/HowIThink';
import { ExperienceTimeline } from './components/experience/ExperienceTimeline';
import { AboutSection } from './components/about/AboutSection';
import { ContactSection } from './components/contact/ContactSection';
import { Footer } from './components/layout/Footer';

// Lazy loaded components for optimized chunk loading
const LabSection = lazy(() => import('./components/lab/LabSection').then((m) => ({ default: m.LabSection })));
const AiVsEngineering = lazy(() => import('./components/insight/AiVsEngineering').then((m) => ({ default: m.AiVsEngineering })));
const AiPhilosophyBanner = lazy(() => import('./components/insight/AiPhilosophyBanner').then((m) => ({ default: m.AiPhilosophyBanner })));
const CommandPalette = lazy(() => import('./components/ui/CommandPalette').then((m) => ({ default: m.CommandPalette })));
const Terminal = lazy(() => import('./components/ui/Terminal').then((m) => ({ default: m.Terminal })));

export function App() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);

  // Initialize smooth scroll
  useLenis();

  // Custom Cursor Hook
  const { cursor, setCursorHover } = useCustomCursor();

  return (
    <div className="relative min-h-screen bg-[#050609] text-[#F5F7FA] font-sans selection:bg-[#78AFFF] selection:text-[#050609]">
      {/* Preloader opening sequence */}
      <Preloader onComplete={() => {}} />

      {/* Custom Desktop Cursor */}
      <CustomCursor cursorState={cursor} />

      {/* Global Grain Texture & Background Grid */}
      <div className="fixed inset-0 bg-grain opacity-30 pointer-events-none z-[1]" aria-hidden="true" />

      {/* Header Navigation */}
      <Header
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        onOpenTerminal={() => setTerminalOpen(true)}
        onCursorHover={setCursorHover}
      />

      {/* Main Page Content */}
      <main className="relative z-10">
        <Hero
          onCursorHover={setCursorHover}
          onOpenTerminal={() => setTerminalOpen(true)}
        />
        <TechStrip />
        <EditorialIntro />
        <SelectedWork onCursorHover={setCursorHover} />
        <HowIThink />
        <ExperienceTimeline />

        {/* Lazy Loaded Below-The-Fold Sections */}
        <Suspense fallback={<div className="py-20 text-center font-mono text-xs text-[#596170]">LOADING LAB...</div>}>
          <LabSection />
          <AiVsEngineering />
          <AiPhilosophyBanner />
        </Suspense>

        <AboutSection />
        <ContactSection onCursorHover={setCursorHover} />
      </main>

      {/* Footer */}
      <Footer onCursorHover={setCursorHover} />

      {/* Command Palette (Ctrl+K) */}
      <Suspense fallback={null}>
        <CommandPalette
          isOpen={commandPaletteOpen}
          onClose={() => setCommandPaletteOpen(false)}
          onOpenTerminal={() => setTerminalOpen(true)}
        />
      </Suspense>

      {/* Terminal Shell */}
      <Suspense fallback={null}>
        <Terminal
          isOpen={terminalOpen}
          onClose={() => setTerminalOpen(false)}
        />
      </Suspense>
    </div>
  );
}

export default App;
