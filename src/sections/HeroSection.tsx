import { useEffect, useState } from 'react';
import { ArrowRight, FileText, Mail, Terminal, RotateCcw } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/Icons';
import ResumeModal from '../components/ResumeModal';
import BootSequenceIntro from '../components/BootSequenceIntro';
import MicrocontrollerWorkbench from '../components/MicrocontrollerWorkbench';
import { OWNER_NAME, HERO_TITLE, STATUS_PANEL, CONTACT_LINKS } from '../data/profile';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function HeroSection() {
  const reduced = useReducedMotion();
  const [resumeOpen, setResumeOpen] = useState(false);
  const [showBootIntro, setShowBootIntro] = useState(() => {
    try {
      if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return false;
      }
      return !sessionStorage.getItem('vinesh_boot_seq_seen');
    } catch {
      return false;
    }
  });

  const fullRole = HERO_TITLE; // "ECE Student · Embedded AI & IoT"
  const typedRole = fullRole;

  const handleRerunBoot = () => {
    try {
      sessionStorage.removeItem('vinesh_boot_seq_seen');
    } catch {
      // ignore
    }
    setShowBootIntro(true);
  };

  return (
    <>
      {/* 1.5s Boot-Sequence Intro (Shown once per session, skippable) */}
      {showBootIntro && (
        <BootSequenceIntro onComplete={() => setShowBootIntro(false)} />
      )}

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

              {/* Live Hardware Status Panel (Configurable in src/data/profile.ts) */}
              <div className="console-panel border border-console-border p-3.5 sm:p-4 mb-6 relative bg-[#090C09]">
                <div className="flex items-center justify-between border-b border-console-border pb-2 mb-2.5 text-[10px]">
                  <div className="flex items-center gap-2">
                    <span className="led-phosphor animate-pulse" />
                    <span className="text-phosphor font-bold uppercase tracking-wider">
                      BENCH STATUS REGISTER // 0x00
                    </span>
                  </div>
                  <span className="text-term-dim uppercase">REALTIME TELEMETRY</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
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
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </>
  );
}
