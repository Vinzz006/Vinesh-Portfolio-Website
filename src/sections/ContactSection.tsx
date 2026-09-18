import { useEffect, useRef, useState } from 'react';
import { Mail, ExternalLink, Terminal as TerminalIcon, Send, CheckCircle2, CornerDownLeft, Sparkles, ArrowRight } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { animateSectionEntrance } from '../animations/anime-utils';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { GithubIcon, LinkedinIcon } from '../components/Icons';
import SectionLightSweep from '../components/SectionLightSweep';
import MagneticButton from '../components/motion/MagneticButton';
import TiltCard from '../components/motion/TiltCard';

const contactLinks = [
  {
    label: 'Email Direct',
    sub: 'shanmugamvinesh75@gmail.com',
    href: 'mailto:shanmugamvinesh75@gmail.com',
    Icon: Mail,
    color: '#10B981',
  },
  {
    label: 'LinkedIn',
    sub: 'linkedin.com/in/vinesh-shanmugam-109215363',
    href: 'https://www.linkedin.com/in/vinesh-shanmugam-109215363',
    Icon: LinkedinIcon,
    color: '#0077B5',
  },
  {
    label: 'GitHub Repository',
    sub: 'github.com/Vinzz006',
    href: 'https://github.com/Vinzz006',
    Icon: GithubIcon,
    color: '#00D4FF',
  },
];

interface CommandLog {
  id: string;
  cmd: string;
  output: string | React.ReactNode;
  time: string;
}

export default function ContactSection() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });
  const reduced = useReducedMotion();

  // Mode: 'cards' or 'terminal'
  const [activeTab, setActiveTab] = useState<'cards' | 'terminal'>('cards');
  const [inputVal, setInputVal] = useState('');
  const [commandLogs, setCommandLogs] = useState<CommandLog[]>([
    {
      id: 'init-1',
      cmd: 'system --status',
      output: 'VINESH SHANMUGAM DISPATCH TERMINAL v2.5 [ONLINE]',
      time: '00:00:01',
    },
    {
      id: 'init-2',
      cmd: 'help',
      output: 'Available commands: whoami, projects, skills, contact, resume, clear',
      time: '00:00:02',
    },
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible) {
      animateSectionEntrance('#contact-content', reduced);
    }
  }, [isVisible, reduced]);

  useEffect(() => {
    if (activeTab === 'terminal') {
      terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [commandLogs, activeTab]);

  const executeCommand = (cmdStr: string) => {
    const raw = cmdStr.trim().toLowerCase();
    if (!raw) return;

    const time = new Date().toTimeString().split(' ')[0];

    if (raw === 'clear') {
      setCommandLogs([]);
      setInputVal('');
      return;
    }

    let output: React.ReactNode = '';

    if (raw === 'help') {
      output = (
        <div className="space-y-1 text-xs">
          <p className="text-primary font-semibold">AVAILABLE SYSTEM COMMANDS:</p>
          <p><span className="text-accent-green font-bold">whoami</span> — Display engineering bio & role</p>
          <p><span className="text-accent-green font-bold">projects</span> — List core projects & tech stacks</p>
          <p><span className="text-accent-green font-bold">skills</span> — Display hardware/AI/full-stack matrix</p>
          <p><span className="text-accent-green font-bold">contact</span> — Show direct contact links & email</p>
          <p><span className="text-accent-green font-bold">resume</span> — Open PDF resume download link</p>
          <p><span className="text-accent-green font-bold">clear</span> — Clear console output</p>
        </div>
      );
    } else if (raw === 'whoami') {
      output = (
        <div className="space-y-1 text-xs text-text-secondary">
          <p className="font-bold text-text-bright">Vinesh Shanmugam</p>
          <p>ECE Engineer building intelligent systems connecting physical sensors, embedded microcontrollers, edge ML inference, and full-stack web platforms.</p>
          <p className="text-primary">Meenakshi Sundararajan Engineering College (2024–2028)</p>
        </div>
      );
    } else if (raw === 'projects') {
      output = (
        <div className="space-y-1 text-xs text-text-secondary">
          <p className="text-primary font-bold">PROTOTYPED ENGINEERING SYSTEMS (10 TOTAL):</p>
          <p>1. TinyML Human Activity & Fall Detection [ESP32, TensorFlow, Firebase]</p>
          <p>2. PancreaSense AI [FastAPI, React, PostgreSQL, SHAP]</p>
          <p>3. Adaptive Wireless Traffic Optimization System [YOLO, MQTT, ESP32]</p>
          <p>4. Predictive Industrial Machine Health Monitor [FFT, TinyML, FreeRTOS]</p>
          <p>Type <span className="text-primary">'help'</span> for more actions.</p>
        </div>
      );
    } else if (raw === 'skills') {
      output = (
        <div className="space-y-1 text-xs text-text-secondary">
          <p className="text-primary font-bold">CORE SKILL MATRIX:</p>
          <p>Languages: Python, C, C++, TypeScript, SQL, Java</p>
          <p>AI/ML: TensorFlow, PyTorch, Scikit-learn, OpenCV, TinyML, SHAP</p>
          <p>Embedded: ESP32, FreeRTOS, I2C/SPI, UART, MQTT, TinyML</p>
          <p>Full-Stack: React 19, FastAPI, PostgreSQL, Tailwind, Three.js</p>
        </div>
      );
    } else if (raw === 'contact') {
      output = (
        <div className="space-y-1 text-xs text-text-secondary">
          <p>Email: <a href="mailto:shanmugamvinesh75@gmail.com" className="text-primary underline">shanmugamvinesh75@gmail.com</a></p>
          <p>GitHub: <a href="https://github.com/Vinzz006" target="_blank" rel="noopener noreferrer" className="text-primary underline">github.com/Vinzz006</a></p>
          <p>LinkedIn: <a href="https://www.linkedin.com/in/vinesh-shanmugam-109215363" target="_blank" rel="noopener noreferrer" className="text-primary underline">linkedin.com/in/vinesh-shanmugam-109215363</a></p>
        </div>
      );
    } else if (raw === 'resume') {
      output = (
        <div className="space-y-1 text-xs">
          <p className="text-accent-green">Official Resume PDF available for download:</p>
          <a href="/Vinesh_Shanmugam_Resume.pdf" download="Vinesh_Shanmugam_Resume.pdf" className="text-primary underline flex items-center gap-1 mt-1 font-bold">
            <ExternalLink size={12} /> Download Vinesh_Shanmugam_Resume.pdf
          </a>
        </div>
      );
    } else {
      output = (
        <p className="text-accent-red text-xs">
          Command not recognized: '{raw}'. Type <span className="text-primary font-bold">'help'</span> for available commands.
        </p>
      );
    }

    setCommandLogs((prev) => [
      ...prev,
      { id: `log-${Date.now()}`, cmd: cmdStr, output, time },
    ]);
    setInputVal('');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(inputVal);
  };

  return (
    <section
      id="contact"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 relative overflow-hidden bg-[#050505]"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <SectionLightSweep actLabel="ACT 08" actTitle="COMMUNICATION & TELEMETRY" isVisible={isVisible} />
      </div>

      <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" aria-hidden="true" />

      {/* Atmospheric Bottom Radial Ambient */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] rounded-full pointer-events-none opacity-25 blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(0, 212, 255, 0.25) 0%, rgba(124, 58, 237, 0.15) 50%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div
        id="contact-content"
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
        style={{ opacity: 0 }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0C0C0C] border border-border-subtle mb-6">
          <Sparkles size={14} className="text-primary animate-pulse" />
          <span className="font-mono text-xs text-primary tracking-[0.2em] uppercase font-bold">
            LET'S CONNECT
          </span>
        </div>

        <h2 id="contact-heading" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mt-2 mb-6 text-text-bright tracking-tight leading-none uppercase">
          LET'S BUILD SOMETHING{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-400 to-secondary">
            TOGETHER.
          </span>
        </h2>

        <p className="text-text-secondary text-base sm:text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
          Have a project or opportunity involving AI, embedded systems, IoT microcontrollers or full-stack web architecture? Let's connect and engineer something real.
        </p>

        {/* View Toggle Mode Selector */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <button
            onClick={() => setActiveTab('cards')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'cards'
                ? 'bg-primary text-[#050505] font-bold shadow-glow-cyan'
                : 'bg-[#0C0C0C] border border-border-subtle text-text-secondary hover:text-text-primary'
            }`}
          >
            Direct Contact Cards
          </button>
          <button
            onClick={() => setActiveTab('terminal')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 font-mono ${
              activeTab === 'terminal'
                ? 'bg-secondary text-white font-bold shadow-glow-violet'
                : 'bg-[#0C0C0C] border border-border-subtle text-text-secondary hover:text-text-primary'
            }`}
          >
            <TerminalIcon size={14} />
            Dispatch Console
          </button>
        </div>

        {/* Mode 1: Contact Cards with Magnetic CTA */}
        {activeTab === 'cards' && (
          <div>
            <div className="grid sm:grid-cols-3 gap-4 mb-12" role="list">
              {contactLinks.map(({ label, sub, href, Icon, color }) => (
                <TiltCard key={label} maxTilt={3} className="rounded-2xl">
                  <a
                    href={href}
                    target={href.startsWith('mailto') ? undefined : '_blank'}
                    rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                    className="glass-card p-6 flex flex-col items-center gap-3 group border-white/10 hover:border-primary/40 hover:shadow-[0_0_35px_rgba(0,212,255,0.15)] transition-all duration-300 block text-center"
                    role="listitem"
                    aria-label={label}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-md"
                      style={{ backgroundColor: color + '15', border: `1px solid ${color}35` }}
                    >
                      <span style={{ color, display: 'flex' }}>
                        <Icon size={22} />
                      </span>
                    </div>
                    <div>
                      <p className="font-bold text-text-bright text-sm group-hover:text-primary transition-colors">
                        {label}
                      </p>
                      <p className="font-mono text-[10px] text-text-muted mt-1 truncate max-w-[190px]">
                        {sub}
                      </p>
                    </div>
                    <ExternalLink size={12} className="text-text-muted group-hover:text-primary transition-colors" aria-hidden="true" />
                  </a>
                </TiltCard>
              ))}
            </div>

            {/* Grand Magnetic CTA Button */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <MagneticButton strength={0.3}>
                <a
                  href="mailto:shanmugamvinesh75@gmail.com"
                  className="btn-primary text-sm sm:text-base px-8 py-4 inline-flex items-center gap-2.5 shadow-[0_0_30px_rgba(0,212,255,0.3)] hover:shadow-[0_0_50px_rgba(0,212,255,0.5)] font-bold rounded-2xl"
                  aria-label="Send direct email to Vinesh"
                >
                  <Mail size={18} />
                  START A CONVERSATION
                  <ArrowRight size={16} />
                </a>
              </MagneticButton>

              <MagneticButton strength={0.2}>
                <a
                  href="/Vinesh_Shanmugam_Resume.pdf"
                  download="Vinesh_Shanmugam_Resume.pdf"
                  className="btn-outline text-sm sm:text-base px-7 py-4 inline-flex items-center gap-2 font-semibold rounded-2xl border-white/15 hover:border-white/40"
                  aria-label="Download Official Resume PDF"
                >
                  <ExternalLink size={16} />
                  Resume PDF
                </a>
              </MagneticButton>
            </div>
          </div>
        )}

        {/* Mode 2: Interactive Cyber Console */}
        {activeTab === 'terminal' && (
          <div className="text-left glass-card p-6 border-secondary/30 shadow-2xl font-mono text-xs max-w-3xl mx-auto rounded-2xl overflow-hidden bg-bg-secondary/95">
            {/* Terminal Title Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-border-subtle mb-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-accent-red opacity-80" />
                <span className="w-3 h-3 rounded-full bg-accent-amber opacity-80" />
                <span className="w-3 h-3 rounded-full bg-accent-green opacity-80" />
                <span className="text-[11px] text-text-muted font-bold ml-2">
                  vinesh@engineering-lab:~ (bash)
                </span>
              </div>
              <span className="text-[10px] text-primary">STATUS: INTERACTIVE</span>
            </div>

            {/* Quick Command Pills */}
            <div className="flex flex-wrap items-center gap-1.5 mb-4">
              <span className="text-[10px] text-text-muted">QUICK COMMANDS:</span>
              {['help', 'whoami', 'projects', 'skills', 'contact', 'resume', 'clear'].map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => executeCommand(cmd)}
                  className="px-2 py-0.5 rounded bg-bg-primary border border-border-subtle text-[10px] text-primary hover:border-primary transition-colors"
                >
                  {cmd}
                </button>
              ))}
            </div>

            {/* Terminal Output Logs */}
            <div className="space-y-3 max-h-[300px] overflow-y-auto no-scrollbar pr-2 mb-4">
              {commandLogs.map((log) => (
                <div key={log.id} className="space-y-1">
                  <div className="flex items-center gap-2 text-text-muted">
                    <span className="text-accent-green font-bold">vinesh@lab:~$</span>
                    <span className="text-text-bright font-semibold">{log.cmd}</span>
                    <span className="text-[9px] ml-auto">{log.time}</span>
                  </div>
                  <div className="pl-4 text-text-secondary">{log.output}</div>
                </div>
              ))}
              <div ref={terminalEndRef} />
            </div>

            {/* Command Input Form */}
            <form onSubmit={handleFormSubmit} className="flex items-center gap-2 pt-3 border-t border-border-subtle">
              <span className="text-accent-green font-bold flex-shrink-0">vinesh@lab:~$</span>
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Type command ('help', 'projects', 'whoami', 'resume')..."
                className="flex-1 bg-transparent text-text-bright focus:outline-none text-xs font-mono placeholder:text-text-muted"
                autoFocus
              />
              <button
                type="submit"
                className="p-1.5 rounded bg-primary/20 text-primary hover:bg-primary hover:text-bg-primary transition-colors"
                title="Execute Command"
              >
                <CornerDownLeft size={14} />
              </button>
            </form>
          </div>
        )}

        <p className="mt-8 font-mono text-xs text-text-muted">
          Available for engineering roles · research collaborations · hackathons · startup projects
        </p>
      </div>
    </section>
  );
}
