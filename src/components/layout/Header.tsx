import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Command, ArrowUpRight, Terminal } from 'lucide-react';
import { Magnetic } from '../motion/Magnetic';

interface HeaderProps {
  onOpenCommandPalette: () => void;
  onOpenTerminal: () => void;
  onCursorHover: (hovered: boolean, label?: string, variant?: 'default' | 'project' | 'button' | 'link' | 'hidden') => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenCommandPalette,
  onOpenTerminal,
  onCursorHover,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      const sections = ['hero', 'work', 'engineering', 'experience', 'lab', 'about', 'contact'];
      const scrollPos = window.scrollY + 220;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'WORK', href: '#work', id: 'work' },
    { name: 'ENGINEERING', href: '#engineering', id: 'engineering' },
    { name: 'EXPERIENCE', href: '#experience', id: 'experience' },
    { name: 'LAB', href: '#lab', id: 'lab' },
    { name: 'ABOUT', href: '#about', id: 'about' },
  ];

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'py-3.5 bg-[rgba(3,4,7,0.85)] backdrop-blur-xl border-b border-[rgba(255,255,255,0.06)] shadow-[0_4px_30px_rgba(0,0,0,0.7)]'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Logo / Brand Name */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            scrollTo('#hero');
          }}
          onMouseEnter={() => onCursorHover(true, 'HOME', 'link')}
          onMouseLeave={() => onCursorHover(false)}
          className="group flex items-center space-x-3 text-sm tracking-tight font-semibold text-[#F8FAFC]"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#78AFFF] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#78AFFF]" />
          </span>
          <span className="font-mono text-xs tracking-wider uppercase text-[#94A3B8] group-hover:text-[#F8FAFC] transition-colors">
            ANKIT KUMAR <span className="text-[#475569]">/ AK</span>
          </span>
        </a>

        {/* Floating Command Center Nav Links */}
        <nav className="hidden md:flex items-center p-1 rounded-full bg-[rgba(10,13,20,0.7)] border border-[rgba(255,255,255,0.06)] backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(link.href);
                }}
                onMouseEnter={() => onCursorHover(true, 'GOTO', 'link')}
                onMouseLeave={() => onCursorHover(false)}
                className={`relative px-4 py-1.5 font-mono text-xs tracking-wider transition-colors rounded-full ${
                  isActive ? 'text-[#F8FAFC] font-bold' : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavTab"
                    className="absolute inset-0 bg-[#161D2B] border border-[rgba(120,175,255,0.3)] rounded-full shadow-[0_0_15px_rgba(120,175,255,0.15)] -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Desktop Quick Actions (Terminal, ⌘K, Contact) */}
        <div className="hidden md:flex items-center space-x-2.5">
          {/* Terminal Quick Trigger */}
          <Magnetic strength={0.25}>
            <button
              onClick={onOpenTerminal}
              onMouseEnter={() => onCursorHover(true, 'CLI', 'button')}
              onMouseLeave={() => onCursorHover(false)}
              aria-label="Open Interactive CLI Terminal"
              className="p-2.5 rounded-xl bg-[rgba(16,20,30,0.7)] border border-[rgba(255,255,255,0.07)] hover:border-[#78AFFF] text-[#94A3B8] hover:text-[#78AFFF] transition-all"
              title="Open Interactive Terminal"
            >
              <Terminal className="w-3.5 h-3.5" />
            </button>
          </Magnetic>

          {/* Cmd+K Palette Trigger */}
          <Magnetic strength={0.25}>
            <button
              onClick={onOpenCommandPalette}
              onMouseEnter={() => onCursorHover(true, 'PALETTE', 'button')}
              onMouseLeave={() => onCursorHover(false)}
              aria-label="Open Command Palette"
              className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-[rgba(16,20,30,0.7)] border border-[rgba(255,255,255,0.07)] hover:border-[#78AFFF] text-xs font-mono text-[#94A3B8] hover:text-[#F8FAFC] transition-all"
              title="Open Command Palette (Ctrl+K)"
            >
              <Command className="w-3.5 h-3.5 text-[#78AFFF]" />
              <span className="text-[11px]">⌘K</span>
            </button>
          </Magnetic>

          {/* Let's Talk CTA */}
          <Magnetic strength={0.3}>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollTo('#contact');
              }}
              onMouseEnter={() => onCursorHover(true, 'CONTACT', 'button')}
              onMouseLeave={() => onCursorHover(false)}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#10141E] to-[#1A2234] border border-[rgba(120,175,255,0.25)] text-xs font-mono tracking-wider font-semibold text-[#B7D7FF] hover:border-[#78AFFF] hover:shadow-[0_0_20px_rgba(120,175,255,0.2)] transition-all"
            >
              <span>LET'S TALK</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#78AFFF]" />
            </a>
          </Magnetic>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close mobile navigation menu' : 'Open mobile navigation menu'}
          aria-expanded={mobileMenuOpen}
          className="md:hidden p-2.5 rounded-xl bg-[#0A0D14] border border-[rgba(255,255,255,0.08)] text-[#F8FAFC]"
        >
          {mobileMenuOpen ? <X className="w-5 h-5 text-[#78AFFF]" /> : <Menu className="w-5 h-5 text-[#F8FAFC]" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0A0D14] border-b border-[rgba(255,255,255,0.08)] px-6 py-6 space-y-4"
          >
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(link.href);
                  }}
                  className="font-mono text-sm tracking-widest text-[#94A3B8] hover:text-[#78AFFF] py-1"
                >
                  {link.name}
                </a>
              ))}
            </nav>
            <div className="pt-4 border-t border-[rgba(255,255,255,0.08)] flex items-center justify-between">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCommandPalette();
                }}
                className="flex items-center space-x-2 font-mono text-xs text-[#94A3B8]"
              >
                <Command className="w-4 h-4 text-[#78AFFF]" />
                <span>COMMAND PALETTE (CTRL+K)</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTerminal();
                }}
                className="flex items-center space-x-2 font-mono text-xs text-[#78AFFF]"
              >
                <Terminal className="w-4 h-4" />
                <span>CLI</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
