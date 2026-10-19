import { useEffect, useState } from 'react';
import { Mail, ArrowUp, Command, Keyboard, X } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/Icons';
import { HERO_TITLE, HERO_SUBTITLE, OWNER_NAME } from '../data/profile';

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
      className="border-t border-console-border bg-[#060806] relative font-mono text-xs"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid sm:grid-cols-3 gap-8 items-center">
          {/* Brand & Telemetry */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 bg-phosphor" />
              <p className="font-bold text-term-bright">{OWNER_NAME}</p>
            </div>
            <p className="font-mono text-[10px] text-term-muted tracking-widest uppercase">
              {HERO_TITLE} · {HERO_SUBTITLE}
            </p>
          </div>

          {/* Links */}
          <nav className="flex justify-center gap-3" aria-label="Social links">
            <a
              href="https://github.com/Vinzz006"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center border border-console-border bg-console-panel text-term-muted hover:text-phosphor hover:border-phosphor transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon size={14} />
            </a>
            <a
              href="https://www.linkedin.com/in/vinesh-shanmugam-109215363"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center border border-console-border bg-console-panel text-term-muted hover:text-phosphor hover:border-phosphor transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={14} />
            </a>
            <a
              href="mailto:shanmugamvinesh75@gmail.com"
              className="w-8 h-8 flex items-center justify-center border border-console-border bg-console-panel text-term-muted hover:text-phosphor hover:border-phosphor transition-colors"
              aria-label="Email"
            >
              <Mail size={14} />
            </a>
          </nav>

          {/* Credit & Back to top */}
          <div className="text-right flex items-center justify-end gap-3">
            <div>
              <p className="font-mono text-[10px] text-term-muted">
                HARDWARE DEBUG BENCH v2.6
              </p>
              <p className="font-mono text-[10px] text-term-dim mt-0.5">
                © {year} {OWNER_NAME} · MIT
              </p>
            </div>
            <button
              onClick={scrollToTop}
              className="p-2 border border-console-border bg-console-panel text-term-muted hover:text-phosphor hover:border-phosphor transition-colors"
              title="Scroll Back To Top"
              aria-label="Back to top"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>

        {/* Bottom line HUD status */}
        <div className="mt-8 pt-6 border-t border-console-border flex flex-wrap justify-between items-center gap-4 text-[10px]">
          <div className="flex items-center gap-3">
            <p className="text-term-muted">
              BUS: I2C / SPI / UART / MQTT / WEBSOCKET
            </p>
            <button
              onClick={() => setKbModalOpen(true)}
              className="px-2 py-0.5 border border-console-border bg-console-panel text-term-muted hover:text-phosphor hover:border-phosphor flex items-center gap-1 transition-colors"
            >
              <Keyboard size={10} />
              <span className="hidden sm:inline">Commands</span> [?]
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-term-muted">
              SESSION UPTIME: <span className="text-phosphor font-bold">{formatUptime(uptime)}</span>
            </span>
            <div className="flex items-center gap-1.5 pl-2 border-l border-console-border">
              <span className="w-1.5 h-1.5 bg-phosphor animate-pulse" aria-hidden="true" />
              <span className="text-phosphor font-bold">BENCH_ONLINE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Keyboard Shortcuts Overlay Modal */}
      {kbModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="border border-console-border bg-console-panel max-w-md w-full p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-console-border mb-4">
              <div className="flex items-center gap-2">
                <Command size={14} className="text-phosphor" />
                <h3 className="font-bold text-term-bright text-xs">HARDWARE CONSOLE SHORTCUTS</h3>
              </div>
              <button
                onClick={() => setKbModalOpen(false)}
                className="p-1 border border-console-border text-term-muted hover:text-phosphor"
              >
                <X size={14} />
              </button>
            </div>

            <div className="space-y-2 text-xs text-term-text">
              <div className="flex justify-between items-center p-2 border border-console-border bg-console-well">
                <span>Toggle Shortcut Register</span>
                <kbd className="px-2 py-0.5 border border-phosphor/40 text-phosphor bg-phosphor/5 font-bold">?</kbd>
              </div>
              <div className="flex justify-between items-center p-2 border border-console-border bg-console-well">
                <span>Contact Terminal Command</span>
                <span className="text-phosphor">Type help in terminal</span>
              </div>
              <div className="flex justify-between items-center p-2 border border-console-border bg-console-well">
                <span>Command History in Terminal</span>
                <span className="text-amber">↑ / ↓ Arrow Keys</span>
              </div>
              <div className="flex justify-between items-center p-2 border border-console-border bg-console-well">
                <span>Easter Egg Sequence</span>
                <span className="text-term-muted">Konami Code / sudo</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-console-border text-center">
              <button
                onClick={() => setKbModalOpen(false)}
                className="console-btn text-xs w-full justify-center py-1.5"
              >
                [CLOSE SHORTCUTS MODAL]
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
