import React, { useState, Suspense, lazy } from 'react';
import { useLenis } from './hooks/useLenis';
import { useCustomCursor } from './hooks/useCustomCursor';
import { ScrollProgress } from './components/motion/ScrollProgress';
import { Preloader } from './components/ui/Preloader';
import { CustomCursor } from './components/layout/CustomCursor';
import { Header } from './components/layout/Header';
import { Hero } from './components/hero/Hero';
import { EditorialIntro } from './components/ui/EditorialIntro';
import { TechStrip } from './components/ui/TechStrip';
import { TechConstellation } from './components/engineering/TechConstellation';
import { SelectedWork } from './components/projects/SelectedWork';
import { HowIThink } from './components/engineering/HowIThink';
import { HorizontalProcess } from './components/engineering/HorizontalProcess';
import { ExperienceTimeline } from './components/experience/ExperienceTimeline';
import { AboutSection } from './components/about/AboutSection';
import { ContactSection } from './components/contact/ContactSection';
import { Footer } from './components/layout/Footer';

// Lazy loaded below-the-fold modules for optimal loading performance
const LabSection = lazy(() => import('./components/lab/LabSection').then((m) => ({ default: m.LabSection })));
const AiVsEngineering = lazy(() => import('./components/insight/AiVsEngineering').then((m) => ({ default: m.AiVsEngineering })));
const AiPhilosophyBanner = lazy(() => import('./components/insight/AiPhilosophyBanner').then((m) => ({ default: m.AiPhilosophyBanner })));
const CommandPalette = lazy(() => import('./components/ui/CommandPalette').then((m) => ({ default: m.CommandPalette })));
const Terminal = lazy(() => import('./components/ui/Terminal').then((m) => ({ default: m.Terminal })));

export function App() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);

  // Initialize Lenis smooth scroll engine
  useLenis();

  // Custom Cursor Hook
  const { cursor, setCursorHover } = useCustomCursor();

  // Global Keyboard Shortcuts (⌘K / Ctrl+K for Palette, ⌘` / Ctrl+` for Terminal)
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === '`') {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#030407] text-[#F8FAFC] font-sans selection:bg-[#78AFFF] selection:text-[#030407]">
      {/* Top System Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Preloader opening sequence */}
      <Preloader onComplete={() => {}} />

      {/* Custom Desktop Cursor */}
      <CustomCursor cursorState={cursor} />

      {/* Global Grain Texture & Background Grid */}
      <div className="fixed inset-0 bg-grain opacity-35 pointer-events-none z-[1]" aria-hidden="true" />

      {/* Floating Command Nav Header */}
      <Header
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        onOpenTerminal={() => setTerminalOpen(true)}
        onCursorHover={setCursorHover}
      />

      {/* 12-Stage Information Architecture Narrative Flow */}
      <main className="relative z-10">
        {/* 01: Hero / Systems Core */}
        <Hero
          onCursorHover={setCursorHover}
          onOpenTerminal={() => setTerminalOpen(true)}
        />

        {/* 02: Introduction */}
        <EditorialIntro />

        {/* 03: Engineering DNA */}
        <TechStrip />
        <section id="engineering-dna" className="py-20 px-6 md:px-12 bg-[#030407]">
          <div className="max-w-7xl mx-auto">
            <TechConstellation />
          </div>
        </section>

        {/* 04: Selected Work */}
        <SelectedWork onCursorHover={setCursorHover} />

        {/* 05: How I Think */}
        <HowIThink />

        {/* 06: Architecture Visualizer */}
        <HorizontalProcess />

        {/* 07: AI Lab */}
        <Suspense fallback={<div className="py-20 text-center font-mono text-xs text-[#475569]">INITIALIZING LAB MODULES...</div>}>
          <LabSection />
        </Suspense>

        {/* 08: Experience */}
        <ExperienceTimeline />

        {/* 09: About */}
        <AboutSection />

        {/* 10: Writing / Thoughts */}
        <Suspense fallback={null}>
          <AiVsEngineering />
          <AiPhilosophyBanner />
        </Suspense>

        {/* 11: Contact */}
        <ContactSection onCursorHover={setCursorHover} />
      </main>

      {/* 12: Footer */}
      <Footer onCursorHover={setCursorHover} />

      {/* Command Palette (Ctrl+K / ⌘K) */}
      <Suspense fallback={null}>
        <CommandPalette
          isOpen={commandPaletteOpen}
          onClose={() => setCommandPaletteOpen(false)}
          onOpenTerminal={() => setTerminalOpen(true)}
        />
      </Suspense>

      {/* Terminal CLI Shell */}
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
