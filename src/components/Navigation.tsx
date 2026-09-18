import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Menu, X, FileText } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { cn } from '../lib/utils';
import ResumeModal from './ResumeModal';
import MagneticButton from './motion/MagneticButton';

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#lab', label: 'Engineering Lab' },
  { href: '#skills', label: 'Skills' },
  { href: '#research', label: 'Research' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const menuRef = useRef<HTMLDivElement>(null);

  // Framer Motion Scroll Progress for the header line indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // Active section detection
      const sections = navLinks.map((l) => l.href.slice(1));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) {
          setActiveSection(id);
          return;
        }
      }
      setActiveSection('home');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    if (mobileOpen) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header
        role="banner"
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
          scrolled
            ? 'py-3 bg-[#050505]/85 backdrop-blur-2xl border-b border-white/[0.12] shadow-[0_4px_30px_rgba(0,0,0,0.8)]'
            : 'py-5 bg-transparent border-b border-white/[0.06]'
        )}
      >
        <nav
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
            className="flex flex-col group"
            aria-label="Vinesh Shanmugam - Home"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-green shadow-[0_0_8px_#10B981] animate-pulse" />
              <span className="font-bold text-text-bright text-base leading-none group-hover:text-primary transition-colors duration-200">
                Vinesh Shanmugam
              </span>
            </div>
            <span className="font-mono text-[9px] text-text-muted tracking-widest mt-1 ml-4 uppercase">
              AI/ML · FULL STACK · IoT · EMBEDDED
            </span>
          </a>

          {/* Desktop Nav Links with active sliding indicator */}
          <ul className="hidden lg:flex items-center gap-6" role="list">
            {navLinks.map(({ href, label }) => {
              const isActive = activeSection === href.slice(1);
              return (
                <li key={href} className="relative">
                  <button
                    onClick={() => handleNavClick(href)}
                    className={cn(
                      'text-sm font-medium transition-colors duration-200 py-1',
                      isActive ? 'text-primary font-semibold' : 'text-text-secondary hover:text-text-primary'
                    )}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {label}
                  </button>

                  {/* Smooth Framer Motion Active Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary rounded-full shadow-[0_0_8px_#00D4FF]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </li>
              );
            })}
          </ul>

          {/* Desktop Right */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="https://github.com/Vinzz006"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline text-xs"
              aria-label="GitHub profile"
            >
              <GithubIcon size={14} />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/vinesh-shanmugam-109215363"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline text-xs"
              aria-label="LinkedIn profile"
            >
              <LinkedinIcon size={14} />
              LinkedIn
            </a>
            <MagneticButton strength={0.2}>
              <button
                onClick={() => setResumeOpen(true)}
                className="btn-primary text-xs py-2 shadow-glow-sm flex items-center gap-1.5"
                aria-label="View Resume PDF"
              >
                <FileText size={14} />
                Resume
              </button>
            </MagneticButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg border border-border-subtle text-text-secondary hover:text-primary hover:border-primary/40 transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        {/* ─── Scroll Progress Line Indicator on Header Bottom Border ─── */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-border-subtle/30 overflow-hidden pointer-events-none"
          aria-hidden="true"
        >
          <motion.div
            className="h-full bg-gradient-to-r from-primary via-[#38BDF8] to-secondary shadow-[0_0_12px_#00D4FF]"
            style={{
              scaleX,
              transformOrigin: '0%',
            }}
          />
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div
            ref={menuRef}
            className="lg:hidden absolute top-full left-0 right-0 bg-bg-primary/98 backdrop-blur-xl border-b border-border-subtle shadow-xl"
            role="dialog"
            aria-label="Mobile navigation"
          >
            <ul className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1" role="list">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <button
                    onClick={() => handleNavClick(href)}
                    className={cn(
                      'w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200',
                      activeSection === href.slice(1)
                        ? 'text-primary bg-primary/5 border border-primary/20 font-semibold'
                        : 'text-text-secondary hover:text-text-primary hover:bg-bg-secondary'
                    )}
                  >
                    {label}
                  </button>
                </li>
              ))}
              <li className="pt-2 border-t border-border-subtle flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    setResumeOpen(true);
                  }}
                  className="btn-primary text-xs w-full justify-center py-2.5"
                >
                  <FileText size={14} /> View & Download Resume PDF
                </button>
                <div className="flex gap-2">
                  <a
                    href="https://github.com/Vinzz006"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost text-xs flex-1 justify-center"
                  >
                    <GithubIcon size={14} /> GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/vinesh-shanmugam-109215363"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost text-xs flex-1 justify-center"
                  >
                    <LinkedinIcon size={14} /> LinkedIn
                  </a>
                </div>
              </li>
            </ul>
          </div>
        )}
      </header>

      {/* Interactive Resume Modal */}
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </>
  );
}
