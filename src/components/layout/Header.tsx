import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Command, ArrowUpRight, Terminal, Mail } from 'lucide-react';
import { BrandIcon } from '../ui/BrandIcons';
import { Magnetic } from '../motion/Magnetic';

interface HeaderProps {
  onOpenCommandPalette: () => void;
  onOpenTerminal: () => void;
  onCursorHover: (hovered: boolean, label?: string, variant?: 'default' | 'project' | 'button' | 'link' | '3d' | 'drag' | 'hidden') => void;
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

      const sections = ['hero', 'thinking', 'process', 'work', 'lab', 'experience', 'about', 'contact'];
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
    { name: 'THINKING', href: '#thinking', id: 'thinking' },
    { name: 'SYSTEMS', href: '#process', id: 'process' },
    { name: 'LAB', href: '#lab', id: 'lab' },
    { name: 'EXPERIENCE', href: '#experience', id: 'experience' },
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
                    layoutId="active-nav-indicator"
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

      {/* Fullscreen Mobile Navigation Composition */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-[68px] z-50 bg-[#030407]/98 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-8 md:hidden overflow-y-auto"
          >
            {/* Luminous Animated Signal Line */}
            <div className="relative w-full h-[1px] bg-[rgba(255,255,255,0.08)] overflow-hidden mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#78AFFF] to-transparent w-36 animate-signal" />
            </div>

            {/* Staggered Navigation Links */}
            <div className="space-y-4 my-auto">
              <div className="font-mono text-[10px] text-[#78AFFF] uppercase tracking-widest mb-2">
                NAVIGATION ARCHITECTURE
              </div>
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.06 }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(link.href);
                    }}
                    className="block text-3xl font-black uppercase tracking-tight text-[#F8FAFC] hover:text-[#78AFFF] transition-colors py-2"
                  >
                    {link.name}
                  </a>
                </motion.div>
              ))}
            </div>

            {/* Mobile Footer & Quick Triggers */}
            <div className="pt-6 border-t border-[rgba(255,255,255,0.08)] space-y-4">
              <div className="flex items-center justify-between gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCommandPalette();
                  }}
                  className="flex-1 flex items-center justify-center space-x-2 py-3 rounded-xl bg-[#0A0D14] border border-[rgba(255,255,255,0.08)] font-mono text-xs text-[#94A3B8]"
                >
                  <Command className="w-4 h-4 text-[#78AFFF]" />
                  <span>COMMAND PALETTE (⌘K)</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenTerminal();
                  }}
                  className="p-3 rounded-xl bg-[#0A0D14] border border-[rgba(255,255,255,0.08)] font-mono text-xs text-[#78AFFF]"
                  aria-label="Open CLI Terminal"
                >
                  <Terminal className="w-4 h-4" />
                </button>
              </div>

              {/* Social Links & Contact */}
              <div className="flex items-center justify-between font-mono text-xs text-[#475569]">
                <div className="flex space-x-4">
                  <a
                    href="https://github.com/Ankitkr-ak007"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#94A3B8] hover:text-[#78AFFF] transition-colors"
                  >
                    <BrandIcon name="github" className="w-4 h-4" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#94A3B8] hover:text-[#78AFFF] transition-colors"
                  >
                    <svg className="w-4 h-4 fill-current text-[#38BDF8]" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                    </svg>
                  </a>
                  <a
                    href="mailto:ankit.developer@example.com"
                    className="text-[#94A3B8] hover:text-[#78AFFF] transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
                <span>ANKIT KUMAR // 2026</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
