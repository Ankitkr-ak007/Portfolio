import React, { useState } from 'react';
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
import { LabSection } from './components/lab/LabSection';
import { AiVsEngineering } from './components/insight/AiVsEngineering';
import { AiPhilosophyBanner } from './components/insight/AiPhilosophyBanner';
import { AboutSection } from './components/about/AboutSection';
import { ContactSection } from './components/contact/ContactSection';
import { Footer } from './components/layout/Footer';
import { CommandPalette } from './components/ui/CommandPalette';
import { Terminal } from './components/ui/Terminal';

export function App() {
  const [preloaderComplete, setPreloaderComplete] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);

  // Initialize smooth scroll
  useLenis();

  // Custom Cursor Hook
  const { cursor, setCursorHover } = useCustomCursor();

  return (
    <div className="relative min-h-screen bg-[#050609] text-[#F5F7FA] font-sans selection:bg-[#78AFFF] selection:text-[#050609]">
      {/* Preloader opening sequence */}
      <Preloader onComplete={() => setPreloaderComplete(true)} />

      {/* Custom Desktop Cursor */}
      <CustomCursor cursorState={cursor} />

      {/* Global Grain Texture & Background Grid */}
      <div className="fixed inset-0 bg-grain opacity-30 pointer-events-none z-[1]" />

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
        <LabSection />
        <AiVsEngineering />
        <AiPhilosophyBanner />
        <AboutSection />
        <ContactSection onCursorHover={setCursorHover} />
      </main>

      {/* Footer */}
      <Footer onCursorHover={setCursorHover} />

      {/* Command Palette (Ctrl+K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onOpenTerminal={() => setTerminalOpen(true)}
      />

      {/* Terminal Shell */}
      <Terminal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />
    </div>
  );
}

export default App;
