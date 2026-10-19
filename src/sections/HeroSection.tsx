import { useState, useEffect, lazy, Suspense } from 'react';
import { ArrowRight, FileText, Mail, Terminal, RotateCcw } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/Icons';
import OperatorIdPhoto from '../components/OperatorIdPhoto';
import MicrocontrollerWorkbench from '../components/MicrocontrollerWorkbench';
import { OWNER_NAME, HERO_TITLE, STATUS_PANEL, CONTACT_LINKS } from '../data/profile';
import { useReducedMotion } from '../hooks/useReducedMotion';

// Defer non-critical modals out of initial bundle
const ResumeModal = lazy(() => import('../components/ResumeModal'));

export default function HeroSection() {
  const reduced = useReducedMotion();
  const [resumeOpen, setResumeOpen] = useState(false);

  // In-place Status Panel BIOS boot sequence: runs once per session, capped at 1.2s, skippable
  const [bootDone, setBootDone] = useState(() => {
    if (typeof window === 'undefined') return true;
    try {
      return (
        !!sessionStorage.getItem('vinesh_boot_seq_seen') ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      );
    } catch {
      return true;
    }
  });
  const [bootStep, setBootStep] = useState(0);

  useEffect(() => {
    if (bootDone) return;
    const t1 = setTimeout(() => setBootStep(1), 220);
    const t2 = setTimeout(() => setBootStep(2), 500);
    const t3 = setTimeout(() => setBootStep(3), 800);
    const tEnd = setTimeout(() => {
      setBootDone(true);
      try {
        sessionStorage.setItem('vinesh_boot_seq_seen', '1');
      } catch {}
    }, 1200);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ') {
        setBootDone(true);
        try {
          sessionStorage.setItem('vinesh_boot_seq_seen', '1');
        } catch {}
      }
    };
    window.addEventListener('keydown', onKey);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(tEnd);
      window.removeEventListener('keydown', onKey);
    };
  }, [bootDone]);

  const fullRole = HERO_TITLE; // "ECE Student · Embedded AI & IoT"
  const typedRole = fullRole;

  const handleRerunBoot = () => {
    setBootStep(0);
    setBootDone(false);
  };

  return (
    <>
      <section
        id="home"
        className="relative pt-8 pb-16 md:pt-12 md:pb-24 overflow-hidden font-mono border-b border-console-border bg-[#060806]"
        aria-labelledby="hero-heading"
      >
        {/* Oscilloscope Background Graticule */}
        <div className="absolute inset-0 graticule-grid opacity-25 pointer-events-none" aria-hidden="true" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Channel Breadcrumb & Re-run Trigger */}
          <div className="border border-console-border bg-[#0B0E0B] px-3.5 py-1.5 mb-8 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-phosphor font-bold">[CH_01]</span>
              <span className="text-term-dim">//</span>
              <span className="text-term-muted uppercase">HARDWARE_BENCH_INITIALIZE</span>
              <span className="hidden sm:inline text-term-dim">·</span>
              <span className="hidden sm:inline text-term-muted">ADDR: 0x00FF</span>
            </div>
            <div className="flex items-center gap-3 text-[11px]">
              <span className="text-term-dim hidden sm:inline">BAUD: 115200</span>
              <button
                onClick={handleRerunBoot}
                className="text-term-muted hover:text-phosphor transition-colors flex items-center gap-1"
                title="Re-run 1.5s BIOS boot sequence"
              >
                <RotateCcw size={11} />
                <span>[RE-RUN BOOT]</span>
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left Column: Identity, Status Panel, Bio & Terminal CTAs */}
            <div className="lg:col-span-7 flex flex-col justify-start">
              {/* Monospace Name Heading */}
              <h1
                id="hero-heading"
                className="text-4xl sm:text-5xl md:text-6xl font-black text-term-bright tracking-tight leading-[1.0] uppercase mb-3"
              >
                {OWNER_NAME}
              </h1>

              {/* Typed Role Line with Blinking Cursor */}
              <div className="text-sm sm:text-base text-phosphor font-bold tracking-wide flex items-center gap-1.5 mb-6 min-h-[28px]">
                <span className="text-term-dim">&gt;</span>
                <span>{typedRole}</span>
                <span className="w-2.5 h-4 sm:h-5 bg-phosphor animate-blink inline-block" aria-hidden="true" />
              </div>

              {/* Hardware Operator ID & Status Register Bank */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6 items-start">
                {/* Operator ID Photo Card */}
                <div className="shrink-0 self-center sm:self-start">
                  <OperatorIdPhoto variant="hero" aboveFold={true} />
                </div>

                {/* Live Hardware Status Panel with Zero-CLS In-Place BIOS Boot Animation */}
                <div
                  className="flex-1 w-full min-w-0 console-panel border border-console-border p-3 sm:p-3.5 bg-[#090C09] relative overflow-hidden cursor-pointer"
                  onClick={() => {
                    if (!bootDone) {
                      setBootDone(true);
                      try {
                        sessionStorage.setItem('vinesh_boot_seq_seen', '1');
                      } catch {}
                    }
                  }}
                  title={!bootDone ? 'Click or press Esc to skip boot initialization' : undefined}
                >
                  {/* Transient In-Place BIOS Boot Animation (Zero CLS: Absolute Overlay over Status Registers) */}
                  {!bootDone && (
                    <div
                      className="absolute inset-0 z-20 bg-[#090C09] p-3 sm:p-3.5 flex flex-col justify-between font-mono select-none"
                      aria-hidden="true"
                    >
                      <div>
                        <div className="flex items-center justify-between border-b border-console-border pb-2 mb-2 text-[10px]">
                          <div className="flex items-center gap-2">
                            <span className="led-phosphor animate-ping" />
                            <span className="text-phosphor font-bold uppercase tracking-wider">
                              BENCH STATUS // BIOS_INIT
                            </span>
                          </div>
                          <span className="text-term-dim uppercase text-[9px]">[ESC / CLICK TO SKIP]</span>
                        </div>
                        <div className="text-[10px] text-term-dim pb-1 mb-1.5 border-b border-console-border/40 flex justify-between">
                          <span className="text-phosphor font-semibold">&gt; ESP32-WROOM-32D BIOS</span>
                          <span>240MHz · 520KB</span>
                        </div>
                        <div className="space-y-1 text-[11px]">
                          <div className={`flex justify-between transition-opacity duration-150 ${bootStep >= 1 ? 'opacity-100 text-term-text' : 'opacity-0'}`}>
                            <span>&gt; GPIO &amp; power rails:</span>
                            <span className="text-phosphor font-bold">[ OK ]</span>
                          </div>
                          <div className={`flex justify-between transition-opacity duration-150 ${bootStep >= 2 ? 'opacity-100 text-term-text' : 'opacity-0'}`}>
                            <span>&gt; I2C bus &amp; MPU6050:</span>
                            <span className="text-phosphor font-bold">[ OK ]</span>
                          </div>
                          <div className={`flex justify-between transition-opacity duration-150 ${bootStep >= 3 ? 'opacity-100 text-term-text' : 'opacity-0'}`}>
                            <span>&gt; Telemetry registers:</span>
                            <span className="text-phosphor font-bold">[ ONLINE ]</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-[9px] text-term-dim border-t border-console-border/50 pt-1 text-right">
                        SYS_CLOCK: 240MHz
                      </div>
                    </div>
                  )}

                  {/* Permanent Status Registers (Guarantees 100% stable geometry from frame 0) */}
                  <div className="flex items-center justify-between border-b border-console-border pb-2 mb-2.5 text-[10px]">
                    <div className="flex items-center gap-2">
                      <span className="led-phosphor animate-pulse" />
                      <span className="text-phosphor font-bold uppercase tracking-wider">
                        BENCH STATUS REGISTER // 0x00
                      </span>
                    </div>
                    <span className="text-term-dim uppercase">REALTIME TELEMETRY</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {STATUS_PANEL.location && !STATUS_PANEL.location.trim().toUpperCase().startsWith('TODO') && (
                      <div className="p-2 border border-console-border bg-[#040504]">
                        <span className="text-[10px] text-term-dim block uppercase">LOCATION:</span>
                        <span className="text-term-bright font-semibold">{STATUS_PANEL.location}</span>
                      </div>
                    )}
                    {STATUS_PANEL.status && !STATUS_PANEL.status.trim().toUpperCase().startsWith('TODO') && (
                      <div className="p-2 border border-console-border bg-[#040504]">
                        <span className="text-[10px] text-term-dim block uppercase">OPPORTUNITY STATUS:</span>
                        <span className="text-phosphor font-bold flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 bg-phosphor inline-block" />
                          {STATUS_PANEL.status}
                        </span>
                      </div>
                    )}
                    {STATUS_PANEL.stack && !STATUS_PANEL.stack.trim().toUpperCase().startsWith('TODO') && (
                      <div className="p-2 border border-console-border bg-[#040504]">
                        <span className="text-[10px] text-term-dim block uppercase">CORE STACK:</span>
                        <span className="text-amber font-semibold truncate block" title={STATUS_PANEL.stack}>
                          {STATUS_PANEL.stack}
                        </span>
                      </div>
                    )}
                    {STATUS_PANEL.firmwareVersion && !STATUS_PANEL.firmwareVersion.trim().toUpperCase().startsWith('TODO') && (
                      <div className="p-2 border border-console-border bg-[#040504]">
                        <span className="text-[10px] text-term-dim block uppercase">FIRMWARE:</span>
                        <span className="text-term-bright font-semibold">{STATUS_PANEL.firmwareVersion}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Core Preserved Brand Statement */}
              <p className="text-base sm:text-lg font-bold text-term-bright mb-3 leading-snug">
                Building intelligent systems where{' '}
                <span className="text-phosphor border-b border-phosphor/40 pb-0.5">hardware</span>,{' '}
                <span className="text-amber border-b border-amber/40 pb-0.5">software</span> and{' '}
                <span className="text-term-bright border-b border-white/40 pb-0.5">AI</span> meet.
              </p>

              {/* Preserved Narrative Description */}
              <p className="font-sans text-term-text text-sm sm:text-base leading-relaxed mb-6 max-w-xl">
                I design and build end-to-end intelligent systems that connect physical sensors,
                embedded microcontrollers, on-device ML inference, cloud platforms and real-time dashboard applications.
              </p>

              {/* System Pipeline Architecture Preview */}
              <div className="border border-console-border bg-[#080B08] p-3 mb-7 max-w-xl">
                <div className="flex items-center justify-between mb-2 text-[10px] text-term-dim">
                  <span className="text-phosphor uppercase font-semibold">BUS ARCHITECTURE FLOW:</span>
                  <span>6 CHANNELS</span>
                </div>
                <div className="grid grid-cols-6 gap-1 text-[9px] text-center font-bold">
                  <div className="p-1 border border-console-border bg-[#040504] text-phosphor">SENSOR</div>
                  <div className="p-1 border border-console-border bg-[#040504] text-phosphor">ESP32</div>
                  <div className="p-1 border border-console-border bg-[#040504] text-amber">EDGE ML</div>
                  <div className="p-1 border border-console-border bg-[#040504] text-term-text">FASTAPI</div>
                  <div className="p-1 border border-console-border bg-[#040504] text-term-text">CLOUD</div>
                  <div className="p-1 border border-console-border bg-[#040504] text-phosphor">REACT</div>
                </div>
              </div>

              {/* Terminal Command Styled CTAs */}
              <div className="space-y-2">
                <div className="text-[10px] text-term-dim uppercase tracking-wider mb-1">
                  &gt; EXECUTE BENCH COMMANDS:
                </div>
                <div className="flex flex-wrap gap-2.5 items-center">
                  {/* Open Resume PDF Command */}
                  <button
                    onClick={() => setResumeOpen(true)}
                    className="console-btn text-xs py-2 px-3.5 flex items-center gap-2"
                  >
                    <FileText size={13} />
                    <span>$ open resume.pdf</span>
                  </button>

                  {/* View Projects Command */}
                  <button
                    onClick={() => {
                      window.dispatchEvent(new CustomEvent('load-lazy-section', { detail: 'projects' }));
                      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="console-btn-amber text-xs py-2 px-3.5 flex items-center gap-2"
                  >
                    <span>$ view projects</span>
                    <ArrowRight size={13} />
                  </button>

                  {/* Direct Email Command */}
                  <a
                    href={`mailto:${CONTACT_LINKS.email}`}
                    className="console-btn-ghost text-xs py-2 px-3 flex items-center gap-1.5"
                  >
                    <Mail size={13} />
                    <span>$ mailto:vinesh</span>
                  </a>

                  {/* GitHub Remote Command */}
                  <a
                    href={CONTACT_LINKS.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="console-btn-ghost text-xs py-2 px-3 flex items-center gap-1.5"
                  >
                    <GithubIcon size={13} />
                    <span>$ git remote</span>
                  </a>

                  {/* LinkedIn Command */}
                  <a
                    href={CONTACT_LINKS.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="console-btn-ghost text-xs py-2 px-3 flex items-center gap-1.5"
                  >
                    <LinkedinIcon size={13} />
                    <span>$ linkedin</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: 60fps Microcontroller Pinout & Live Oscilloscope Workbench */}
            <div className="lg:col-span-5 w-full">
              <MicrocontrollerWorkbench />
            </div>
          </div>
        </div>
      </section>

      {/* Official Resume Modal */}
      {resumeOpen && (
        <Suspense fallback={null}>
          <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
        </Suspense>
      )}
    </>
  );
}
