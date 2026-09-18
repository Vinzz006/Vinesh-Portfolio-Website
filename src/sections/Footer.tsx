import { useEffect, useState } from 'react';
import { Mail, ArrowUp, Command, Keyboard, X } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/Icons';

export default function Footer() {
  const year = new Date().getFullYear();

  const [uptime, setUptime] = useState(0);
  const [kbModalOpen, setKbModalOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setUptime((u) => u + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Listen for '?' key to open shortcuts modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.key === '?' || (e.key === 'k' && (e.metaKey || e.ctrlKey))) &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        setKbModalOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatUptime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <footer
      className="border-t border-border-subtle bg-bg-primary relative"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid sm:grid-cols-3 gap-8 items-center">
          {/* Brand */}
          <div>
            <p className="font-bold text-text-bright">Vinesh Shanmugam</p>
            <p className="font-mono text-[10px] text-text-muted mt-1 tracking-widest uppercase">
              ECE Engineer · AI/ML · Embedded Systems · Full-Stack
            </p>
          </div>

          {/* Links */}
          <nav className="flex justify-center gap-4" aria-label="Social links">
            <a
              href="https://github.com/Vinzz006"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-border-subtle text-text-muted hover:text-primary hover:border-primary/40 transition-all duration-200"
              aria-label="GitHub"
            >
              <GithubIcon size={16} />
            </a>
            <a
              href="https://www.linkedin.com/in/vinesh-shanmugam-109215363"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-border-subtle text-text-muted hover:text-primary hover:border-primary/40 transition-all duration-200"
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={16} />
            </a>
            <a
              href="mailto:shanmugamvinesh75@gmail.com"
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-border-subtle text-text-muted hover:text-primary hover:border-primary/40 transition-all duration-200"
              aria-label="Email"
            >
              <Mail size={16} />
            </a>
          </nav>

          {/* Credit & Back to top */}
          <div className="text-right flex items-center justify-end gap-3">
            <div>
              <p className="font-mono text-[10px] text-text-muted">
                Designed & built by Vinesh Shanmugam
              </p>
              <p className="font-mono text-[10px] text-text-muted mt-0.5">
                © {year} · All rights reserved
              </p>
            </div>
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-bg-secondary border border-border-subtle text-text-muted hover:text-primary hover:border-primary/50 transition-all"
              title="Scroll Back To Top"
              aria-label="Back to top"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>

        {/* Bottom line HUD status */}
        <div className="mt-8 pt-6 border-t border-border-subtle flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <p className="font-mono text-[10px] text-text-muted">
              Hardware · AI/ML · IoT · Cloud · Full-Stack
            </p>
            <button
              onClick={() => setKbModalOpen(true)}
              className="font-mono text-[10px] px-2 py-0.5 rounded border border-border-subtle text-text-muted hover:text-primary hover:border-primary/30 flex items-center gap-1 transition-colors"
            >
              <Keyboard size={10} />
              <span className="hidden sm:inline">Shortcuts</span> [?]
            </button>
          </div>

          <div className="flex items-center gap-3 font-mono text-[10px]">
            <span className="text-text-muted">
              SESSION UPTIME: <span className="text-primary font-bold">{formatUptime(uptime)}</span>
            </span>
            <div className="flex items-center gap-1.5 pl-2 border-l border-border-subtle">
              <span className="status-online" aria-hidden="true" />
              <span className="text-accent-green font-bold">SYSTEM ONLINE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Keyboard Shortcuts Overlay Modal */}
      {kbModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg-primary/80 backdrop-blur-md">
          <div className="glass-card max-w-md w-full p-6 border-primary/30 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-border-subtle mb-4">
              <div className="flex items-center gap-2">
                <Command size={16} className="text-primary" />
                <h3 className="font-bold text-text-bright text-sm">Keyboard Shortcuts</h3>
              </div>
              <button
                onClick={() => setKbModalOpen(false)}
                className="p-1 rounded text-text-muted hover:text-text-primary"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-2.5 font-mono text-xs text-text-secondary">
              <div className="flex justify-between items-center p-2 rounded bg-bg-primary border border-border-subtle">
                <span>Toggle Shortcuts Menu</span>
                <kbd className="px-2 py-0.5 rounded bg-bg-secondary border border-border-subtle text-primary font-bold">?</kbd>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-bg-primary border border-border-subtle">
                <span>Jump to Engineering Lab</span>
                <span className="text-text-muted">Scroll / Click Lab link</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-bg-primary border border-border-subtle">
                <span>Interactive Cyber Terminal</span>
                <span className="text-text-muted">Contact Section → Console Mode</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-border-subtle text-center">
              <button
                onClick={() => setKbModalOpen(false)}
                className="btn-primary text-xs w-full justify-center py-2"
              >
                Close Shortcuts Overlay
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
