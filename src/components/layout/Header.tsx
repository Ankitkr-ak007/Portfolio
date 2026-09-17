import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Command, ArrowUpRight } from 'lucide-react';

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
      setIsScrolled(window.scrollY > 40);

      // Section spy
      const sections = ['hero', 'work', 'engineering', 'experience', 'lab', 'about', 'contact'];
      const scrollPos = window.scrollY + 200;

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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'WORK', href: '#work' },
    { name: 'ENGINEERING', href: '#engineering' },
    { name: 'EXPERIENCE', href: '#experience' },
    { name: 'LAB', href: '#lab' },
    { name: 'ABOUT', href: '#about' },
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
          ? 'py-3 bg-[rgba(5,6,9,0.85)] backdrop-blur-md border-b border-[rgba(255,255,255,0.08)] shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo / Name */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            scrollTo('#hero');
          }}
          onMouseEnter={() => onCursorHover(true, 'HOME', 'link')}
          onMouseLeave={() => onCursorHover(false)}
          className="group flex items-center space-x-3 text-sm tracking-tight font-semibold text-[#F5F7FA]"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#78AFFF] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#78AFFF]" />
          </span>
          <span className="font-mono text-xs tracking-wider uppercase text-[#9BA4B2] group-hover:text-[#F5F7FA] transition-colors">
            ANKIT KUMAR <span className="text-[#596170]">/ AK</span>
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
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
                className={`relative font-mono text-xs tracking-widest transition-colors ${
                  isActive ? 'text-[#78AFFF] font-semibold' : 'text-[#9BA4B2] hover:text-[#F5F7FA]'
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-[#78AFFF] rounded-full shadow-[0_0_8px_#78AFFF]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Actions (Cmd+K + Contact CTA) */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Cmd+K Palette Trigger */}
          <button
            onClick={onOpenCommandPalette}
            onMouseEnter={() => onCursorHover(true, 'PALETTE', 'button')}
            onMouseLeave={() => onCursorHover(false)}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-[rgba(16,20,27,0.7)] border border-[rgba(255,255,255,0.08)] hover:border-[#78AFFF] text-xs font-mono text-[#9BA4B2] hover:text-[#F5F7FA] transition-all"
            title="Open Command Palette (Ctrl+K)"
          >
            <Command className="w-3.5 h-3.5 text-[#78AFFF]" />
            <span className="text-[11px]">⌘K</span>
          </button>

          {/* Let's Talk CTA */}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('#contact');
            }}
            onMouseEnter={() => onCursorHover(true, 'CONTACT', 'button')}
            onMouseLeave={() => onCursorHover(false)}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-[#10141B] to-[#1A2230] border border-[rgba(120,175,255,0.3)] text-xs font-mono tracking-wider font-semibold text-[#B7D7FF] hover:border-[#78AFFF] hover:shadow-[0_0_15px_rgba(120,175,255,0.25)] transition-all transform hover:-translate-y-0.5"
          >
            <span>LET'S TALK</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#78AFFF]" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg bg-[#10141B] border border-[rgba(255,255,255,0.08)] text-[#F5F7FA]"
        >
          {mobileMenuOpen ? <X className="w-5 h-5 text-[#78AFFF]" /> : <Menu className="w-5 h-5 text-[#F5F7FA]" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0A0D12] border-b border-[rgba(255,255,255,0.08)] px-6 py-6 space-y-4"
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
                  className="font-mono text-sm tracking-widest text-[#9BA4B2] hover:text-[#78AFFF] py-1"
                >
                  {link.name}
                </a>
              ))}
            </nav>
            <div className="pt-4 border-t border-[rgba(255,255,255,0.08)] flex items-center justify-between">
              <button
                onClick={onOpenCommandPalette}
                className="flex items-center space-x-2 font-mono text-xs text-[#9BA4B2]"
              >
                <Command className="w-4 h-4 text-[#78AFFF]" />
                <span>COMMAND PALETTE (CTRL+K)</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
