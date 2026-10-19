import { useEffect, useState, lazy, Suspense } from 'react';
import { Menu, X, FileText, ExternalLink, Terminal } from 'lucide-react';
import { STATUS_PANEL, CONTACT_LINKS } from '../data/content';

const ResumeModal = lazy(() => import('./ResumeModal'));

interface NavItem {
  num: string;
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { num: '01', label: 'About', href: '#about' },
  { num: '02', label: 'Projects', href: '#projects' },
  { num: '03', label: 'Skills', href: '#skills' },
  { num: '04', label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [resumeOpen, setResumeOpen] = useState<boolean>(false);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);

  // Scroll-spy active section detection
  useEffect(() => {
    const sectionIds = ['contact', 'skills', 'lab', 'projects', 'about', 'home'];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            return;
          }
        }
      }

      if (window.scrollY < 150) {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll and register Escape key when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setMobileMenuOpen(false);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const targetId = href.startsWith('#') ? href.slice(1) : href;
    window.dispatchEvent(new CustomEvent('load-lazy-section', { detail: 'all' }));

    const scrollTarget = () => {
      const target = document.getElementById(targetId);
      if (target) {
        const headerHeight = 48;
        const targetRect = target.getBoundingClientRect();
        const targetTop = targetRect.top + window.scrollY - headerHeight;
        window.scrollTo({
          top: targetTop,
          behavior: 'smooth',
        });
      }
    };

    scrollTarget();
    requestAnimationFrame(() => {
      setTimeout(scrollTarget, 40);
      setTimeout(scrollTarget, 150);
      setTimeout(scrollTarget, 350);
    });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY !== null) {
      const deltaY = e.changedTouches[0].clientY - touchStartY;
      // Swipe down > 50px dismisses the menu
      if (deltaY > 50) {
        setMobileMenuOpen(false);
      }
    }
    setTouchStartY(null);
  };

  return (
    <>
      <header
        role="banner"
        className="sticky top-0 left-0 right-0 z-40 bg-[#060806]/95 backdrop-blur-md border-b border-console-border font-mono text-xs select-none"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between">
          {/* Left Brand Identifier */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#home');
            }}
            className="flex items-center gap-2.5 text-term-bright hover:text-phosphor transition-colors group py-1.5"
            aria-label="Vinesh Shanmugam - Hardware Console Home"
          >
            <span className="led-phosphor" />
            <span className="font-bold tracking-wider uppercase text-sm sm:text-base">
              VINESH SHANMUGAM
            </span>
            <span className="hidden md:inline-block text-[10px] text-term-muted border border-console-border px-1.5 py-0.2 bg-[#0B0E0B]">
              [240MHz · SYS_OK]
            </span>
          </a>

          {/* Desktop Minimal Section Number Links (01 About, 02 Projects, 03 Skills, 04 Contact) */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Workbench sections">
            {NAV_ITEMS.map(({ num, label, href }) => {
              const targetId = href.slice(1);
              const isActive = activeSection === targetId;

              return (
                <button
                  key={href}
                  onClick={() => handleNavClick(href)}
                  className={`px-3 py-1.5 min-h-[36px] flex items-center gap-1.5 transition-all text-xs border ${
                    isActive
                      ? 'border-phosphor/70 bg-phosphor/15 text-phosphor font-bold shadow-[0_0_10px_rgba(57,255,136,0.2)]'
                      : 'border-transparent text-term-muted hover:border-console-border hover:text-term-bright hover:bg-console-panel'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className={isActive ? 'text-phosphor' : 'text-term-dim'}>
                    {num}
                  </span>
                  <span>{label}</span>
                </button>
              );
            })}

            {/* Quick Resume PDF Command Button */}
            <div className="ml-3 pl-3 border-l border-console-border flex items-center gap-2">
              <button
                onClick={() => setResumeOpen(true)}
                className="console-btn text-[11px] py-1.5 px-3 min-h-[36px] flex items-center gap-1.5"
                title="Open Resume Document"
              >
                <FileText size={12} />
                <span>$ resume</span>
              </button>
            </div>
          </nav>

          {/* Mobile Terminal Menu Trigger (>= 44x44px touch target) */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="min-w-[44px] min-h-[44px] p-2 border border-console-border text-phosphor bg-console-panel flex items-center justify-center gap-1.5 text-xs font-bold"
              aria-label="Open terminal navigation menu"
            >
              <Terminal size={15} />
              <span>MENU</span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Terminal-Style Navigation Menu (h-[100dvh] + touch swipe dismiss + Esc) */}
      {mobileMenuOpen && (
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="fixed inset-0 h-[100dvh] z-50 bg-[#060806]/98 font-mono text-term-text p-6 flex flex-col justify-between overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Terminal Navigation Menu"
        >
          {/* Graticule pattern */}
          <div className="absolute inset-0 graticule-grid opacity-30 pointer-events-none" />

          {/* Terminal Menu Header Bar */}
          <div className="relative z-10 border-b border-console-border pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="led-phosphor animate-pulse" />
              <span className="text-phosphor font-bold text-xs uppercase tracking-widest">
                DEBUG_DISPATCH // TERMINAL MENU
              </span>
            </div>
            {/* Close Button with >= 44x44px touch target */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="min-w-[44px] min-h-[44px] px-3 py-2 border border-console-border text-term-muted hover:text-phosphor hover:border-phosphor text-xs flex items-center justify-center font-bold"
              aria-label="Close menu"
            >
              [X] ESC
            </button>
          </div>

          {/* Menu Commands Body */}
          <div className="relative z-10 my-auto py-6 space-y-4">
            <div className="text-term-dim text-[11px] mb-2 flex items-center justify-between">
              <span>&gt; SELECT BENCH SUBSYSTEM [1-4] OR EXECUTE COMMAND:</span>
              <span className="text-phosphor text-[10px]">SWIPE DOWN TO CLOSE</span>
            </div>

            <div className="space-y-2.5">
              {NAV_ITEMS.map(({ num, label, href }) => {
                const targetId = href.slice(1);
                const isActive = activeSection === targetId;

                return (
                  <button
                    key={href}
                    onClick={() => handleNavClick(href)}
                    className={`w-full text-left p-3.5 min-h-[48px] border flex items-center justify-between transition-all ${
                      isActive
                        ? 'border-phosphor bg-phosphor/15 text-phosphor font-bold'
                        : 'border-console-border bg-[#0B0E0B] text-term-text hover:border-phosphor/50 hover:text-phosphor'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-phosphor font-bold">{num}</span>
                      <span className="text-sm tracking-wider uppercase font-semibold">
                        $ cd /{label.toLowerCase()}
                      </span>
                    </div>
                    <span className="text-xs text-term-dim">
                      [{label.toUpperCase()}]
                    </span>
                  </button>
                );
              })}

              {/* Engineering Lab quick link */}
              <button
                onClick={() => handleNavClick('#lab')}
                className="w-full text-left p-3.5 min-h-[48px] border border-console-border bg-[#0B0E0B] text-term-text hover:border-phosphor/50 hover:text-phosphor flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="text-amber font-bold">LAB</span>
                  <span className="text-sm tracking-wider uppercase font-semibold">
                    $ cd /engineering-lab
                  </span>
                </div>
                <span className="text-xs text-term-dim">[LIVE PIPELINE]</span>
              </button>
            </div>

            {/* Quick Action Commands */}
            <div className="pt-4 border-t border-console-border space-y-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setResumeOpen(true);
                }}
                className="w-full text-left p-3 min-h-[48px] border border-phosphor/40 bg-phosphor/10 text-phosphor text-xs flex items-center justify-between font-bold"
              >
                <span>$ open resume.pdf</span>
                <span className="text-[10px]">[PDF VIEWER]</span>
              </button>

              <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                <a
                  href={CONTACT_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] p-2.5 border border-console-border flex items-center justify-center text-term-muted hover:text-phosphor hover:border-phosphor"
                >
                  $ git remote
                </a>
                <a
                  href={`mailto:${CONTACT_LINKS.email}`}
                  className="min-h-[44px] p-2.5 border border-console-border flex items-center justify-center text-term-muted hover:text-phosphor hover:border-phosphor"
                >
                  $ mailto:vinesh
                </a>
              </div>
            </div>
          </div>

          {/* Terminal Menu Footer */}
          <div className="relative z-10 border-t border-console-border pt-3 flex items-center justify-between text-[10px] text-term-dim">
            <span>LOC: {STATUS_PANEL.location}</span>
            <span className="text-phosphor">{STATUS_PANEL.status.toUpperCase()}</span>
          </div>
        </div>
      )}

      {/* Official Resume PDF Modal */}
      {resumeOpen && (
        <Suspense fallback={null}>
          <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
        </Suspense>
      )}
    </>
  );
}
