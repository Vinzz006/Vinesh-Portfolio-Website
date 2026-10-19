import { useState, useRef, useEffect, lazy, Suspense } from 'react';
import { Mail, ExternalLink, Copy, Check, FileText, Send, ArrowRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/Icons';
import { STATUS_PANEL, CONTACT_LINKS, OWNER_NAME, HERO_TITLE } from '../data/profile';

const ResumeModal = lazy(() => import('../components/ResumeModal'));

interface TerminalLog {
  id: string;
  command: string;
  output: React.ReactNode;
  timestamp: string;
}

export default function ContactSection() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [inputCommand, setInputCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyPointer, setHistoryPointer] = useState<number>(-1);
  const [terminalLogs, setTerminalLogs] = useState<TerminalLog[]>([
    {
      id: 'init-1',
      command: 'sys --status',
      output: (
        <span className="text-phosphor font-bold">
          VINESH SHANMUGAM DISPATCH TERMINAL v2.8.4 [HARDWARE_BENCH_ONLINE]
        </span>
      ),
      timestamp: '00:00:01',
    },
    {
      id: 'init-2',
      command: 'help',
      output: (
        <div className="space-y-1 text-xs">
          <p className="text-[#8B9E8B]">AVAILABLE COMMANDS:</p>
          <p><span className="text-phosphor font-bold">email</span> .... Display direct email address and open mail client</p>
          <p><span className="text-phosphor font-bold">github</span> ... Open GitHub repository profile (github.com/Vinzz006)</p>
          <p><span className="text-phosphor font-bold">linkedin</span> . Open official LinkedIn profile</p>
          <p><span className="text-phosphor font-bold">resume</span> ... Open official Resume PDF viewer and download</p>
          <p><span className="text-phosphor font-bold">whoami</span> ... Print engineering bio and credentials</p>
          <p><span className="text-phosphor font-bold">status</span> ... Display live opportunity &amp; location status</p>
          <p><span className="text-phosphor font-bold">sudo</span> ..... Superuser privileges (try: sudo hire vinesh)</p>
          <p><span className="text-phosphor font-bold">konami</span> ... Unlock retro 8-bit hardware bench easter egg</p>
          <p><span className="text-phosphor font-bold">clear</span> .... Clear terminal screen</p>
        </div>
      ),
      timestamp: '00:00:02',
    },
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(CONTACT_LINKS.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleExecuteCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    // Save to command history
    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryPointer(-1);

    const cmd = trimmed.toLowerCase();
    const time = new Date().toTimeString().split(' ')[0];

    if (cmd === 'clear') {
      setTerminalLogs([]);
      setInputCommand('');
      return;
    }

    let output: React.ReactNode = null;

    if (cmd.startsWith('sudo')) {
      if (cmd.includes('hire') || cmd.includes('recruit') || cmd.includes('offer')) {
        output = (
          <div className="space-y-1.5 text-xs text-phosphor border border-phosphor/30 bg-phosphor/5 p-3">
            <p className="font-bold text-sm">[EASTER_EGG // ROOT_ACCESS_SIMULATION]</p>
            <p className="text-term-bright">
              ⚡ Contract dispatch simulation initialized! Vinesh is prepping firmware and bench tools.
            </p>
            <p className="text-[#9DB09D] italic">
              (Just kidding, but my inbox is truly open: <a href={`mailto:${CONTACT_LINKS.email}`} className="text-phosphor underline font-bold">{CONTACT_LINKS.email}</a>)
            </p>
          </div>
        );
      } else if (cmd.includes('rm -rf') || cmd.includes('delete') || cmd.includes('drop')) {
        output = (
          <div className="space-y-1 text-xs text-[#FF4D4D] border border-[#FF4D4D]/30 bg-[#FF4D4D]/5 p-2.5">
            <p className="font-bold">[KERNEL SECURITY EXCEPTION: FLASH_PROTECTED]</p>
            <p>Firmware partition table (W25Q64 SPI Flash @ 0x3F4000) is write-protected in bench hardware mode.</p>
            <p className="text-[#9DB09D]">[SIMULATION] This incident has been logged to /var/log/esp32_wdt.log.</p>
          </div>
        );
      } else {
        output = (
          <div className="space-y-1 text-xs text-amber border border-amber/30 bg-amber/5 p-2.5">
            <p className="font-bold">[SECURITY NOTICE: USER IS NOT IN SUDOERS FILE]</p>
            <p className="text-term-text">This incident will be reported to the system administrator.</p>
            <p className="text-phosphor font-mono">&gt; Try: <span className="font-bold text-term-bright">sudo hire vinesh</span></p>
          </div>
        );
      }
    } else if (cmd === 'konami' || cmd === 'uuddlrlrba' || cmd === 'cheat' || cmd === 'easteregg') {
      output = (
        <div className="space-y-1.5 text-xs text-phosphor border border-phosphor/40 bg-phosphor/10 p-3">
          <p className="font-bold text-sm">🎮 [EASTER_EGG // RETRO 8-BIT BENCH CHEAT UNLOCKED]</p>
          <p className="text-term-bright">
            30 lives granted! Overclocking ESP32 dual Xtensa LX6 cores (bench mode simulation)...
          </p>
          <p className="text-amber">
            FreeRTOS tick rate simulated at 1000Hz · High-speed DMA channels unlocked on GPIO pins 04–33.
          </p>
          <p className="text-[#9DB09D] italic text-[11px]">
            * Note: This is an interactive easter egg and does not represent physical hardware benchmark ratings.
          </p>
        </div>
      );
    } else if (cmd === 'matrix') {
      output = (
        <div className="space-y-1 text-xs text-phosphor font-mono">
          <p>Wake up, engineer...</p>
          <p>The Matrix has you.</p>
          <p className="text-amber">Follow the green phosphor rabbit: 0x39FF88.</p>
          <p className="text-[#8B9E8B]">Knock, knock at GPIO pin 04.</p>
        </div>
      );
    } else if (cmd.startsWith('ping')) {
      output = (
        <div className="space-y-0.5 text-xs text-term-text font-mono">
          <p className="text-phosphor">PING vinesh-bench (127.0.0.1): 56 data bytes</p>
          <p>64 bytes from 127.0.0.1: icmp_seq=0 ttl=64 time=0.42 ms</p>
          <p>64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.38 ms</p>
          <p className="text-phosphor font-bold">--- vinesh-bench statistics --- 0% packet loss, bench latency 0.40ms</p>
        </div>
      );
    } else {
      switch (cmd) {
        case 'help':
          output = (
            <div className="space-y-1 text-xs">
              <p className="text-[#8B9E8B]">AVAILABLE COMMANDS:</p>
              <p><span className="text-phosphor font-bold">email</span> .... Display direct email address and open mail client</p>
              <p><span className="text-phosphor font-bold">github</span> ... Open GitHub repository profile (github.com/Vinzz006)</p>
              <p><span className="text-phosphor font-bold">linkedin</span> . Open official LinkedIn profile</p>
              <p><span className="text-phosphor font-bold">resume</span> ... Open official Resume PDF viewer and download</p>
              <p><span className="text-phosphor font-bold">whoami</span> / <span className="text-phosphor font-bold">about</span> . Print engineering bio, location &amp; credentials</p>
              <p><span className="text-phosphor font-bold">status</span> ... Display live opportunity &amp; location status</p>
              <p><span className="text-phosphor font-bold">sudo</span> ..... Superuser privileges (try: sudo hire vinesh)</p>
              <p><span className="text-phosphor font-bold">konami</span> ... Unlock retro 8-bit hardware bench easter egg</p>
              <p><span className="text-phosphor font-bold">clear</span> .... Clear terminal screen</p>
            </div>
          );
          break;

        case 'email':
          output = (
            <div className="space-y-1 text-xs">
              <p className="text-term-bright">
                Direct Email Address: <span className="text-phosphor font-bold">{CONTACT_LINKS.email}</span>
              </p>
              <div className="flex gap-2 pt-1">
                <a
                  href={`mailto:${CONTACT_LINKS.email}`}
                  className="console-btn text-[11px] py-0.5 px-2"
                >
                  $ open mailto:
                </a>
                <button
                  type="button"
                  onClick={copyEmailToClipboard}
                  className="console-btn-ghost text-[11px] py-0.5 px-2"
                >
                  {copiedEmail ? 'Copied!' : 'Copy to Clipboard'}
                </button>
              </div>
            </div>
          );
          break;

        case 'github':
          window.open(CONTACT_LINKS.github, '_blank', 'noopener,noreferrer');
          output = (
            <div className="text-xs">
              <span className="text-[#8B9E8B]">Dispatching browser to:</span>{' '}
              <a
                href={CONTACT_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-phosphor underline font-bold"
              >
                {CONTACT_LINKS.github}
              </a>
            </div>
          );
          break;

        case 'linkedin':
          window.open(CONTACT_LINKS.linkedin, '_blank', 'noopener,noreferrer');
          output = (
            <div className="text-xs">
              <span className="text-[#8B9E8B]">Dispatching browser to:</span>{' '}
              <a
                href={CONTACT_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-phosphor underline font-bold"
              >
                {CONTACT_LINKS.linkedin}
              </a>
            </div>
          );
          break;

        case 'resume':
          setResumeOpen(true);
          output = (
            <div className="text-xs">
              <span className="text-phosphor font-bold">Opening official Resume Document...</span>{' '}
              <a
                href={CONTACT_LINKS.resume}
                download="Vinesh_Shanmugam_Resume.pdf"
                className="text-amber underline ml-2"
              >
                [Direct Download PDF]
              </a>
            </div>
          );
          break;

        case 'whoami':
        case 'about':
          output = (
            <div className="space-y-1 text-xs text-term-text font-sans">
              <p className="text-term-bright font-bold font-mono">{OWNER_NAME} — {HERO_TITLE}</p>
              <p>Location: <span className="font-mono text-phosphor">{STATUS_PANEL.location}</span></p>
              <p>B.E. in Electronics &amp; Communication Engineering (2024–2028), Meenakshi Sundararajan Engineering College, Chennai.</p>
              <p>Specializes in edge AI, TinyML microcontrollers (ESP32), sensor signal pipelines, and real-time React dashboards.</p>
            </div>
          );
          break;

        case 'status':
          output = (
            <div className="space-y-1 text-xs">
              {!STATUS_PANEL.location.trim().toUpperCase().startsWith('TODO') && (
                <p><span className="text-[#8B9E8B]">LOCATION:</span> <span className="text-term-bright">{STATUS_PANEL.location}</span></p>
              )}
              {!STATUS_PANEL.status.trim().toUpperCase().startsWith('TODO') && (
                <p><span className="text-[#8B9E8B]">STATUS:</span> <span className="text-phosphor font-bold">{STATUS_PANEL.status}</span></p>
              )}
              {!STATUS_PANEL.stack.trim().toUpperCase().startsWith('TODO') && (
                <p><span className="text-[#8B9E8B]">CORE STACK:</span> <span className="text-amber">{STATUS_PANEL.stack}</span></p>
              )}
              {!STATUS_PANEL.telemetryBus.trim().toUpperCase().startsWith('TODO') && (
                <p><span className="text-[#8B9E8B]">BUS TELEMETRY:</span> <span className="text-term-bright">{STATUS_PANEL.telemetryBus}</span></p>
              )}
              {STATUS_PANEL.firmwareVersion && !STATUS_PANEL.firmwareVersion.trim().toUpperCase().startsWith('TODO') && (
                <p><span className="text-[#8B9E8B]">FIRMWARE:</span> <span className="text-term-bright">{STATUS_PANEL.firmwareVersion}</span></p>
              )}
            </div>
          );
          break;

        default:
          output = (
            <div className="text-xs text-[#FF4D4D]">
              command not found: '{cmd}'. Type <span className="text-phosphor font-bold">'help'</span> for list of valid commands.
            </div>
          );
      }
    }

    setTerminalLogs((prev) => [
      ...prev,
      {
        id: `log-${Date.now()}`,
        command: rawCmd,
        output,
        timestamp: time,
      },
    ]);
    setInputCommand('');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleExecuteCommand(inputCommand);
  };

  // Keyboard navigation for command history (Up/Down arrow keys)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextPtr = historyPointer === -1 ? commandHistory.length - 1 : Math.max(0, historyPointer - 1);
      setHistoryPointer(nextPtr);
      setInputCommand(commandHistory[nextPtr]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyPointer === -1) return;
      if (historyPointer < commandHistory.length - 1) {
        const nextPtr = historyPointer + 1;
        setHistoryPointer(nextPtr);
        setInputCommand(commandHistory[nextPtr]);
      } else {
        setHistoryPointer(-1);
        setInputCommand('');
      }
    }
  };

  // Global Konami Code sequence listener
  useEffect(() => {
    const konamiSequence = [
      'arrowup', 'arrowup', 'arrowdown', 'arrowdown',
      'arrowleft', 'arrowright', 'arrowleft', 'arrowright',
      'b', 'a'
    ];
    let keyIdx = 0;

    const handleGlobalKey = (e: KeyboardEvent) => {
      // Ignore input when focus is inside ANY text field or editable area
      const target = (e.target || document.activeElement) as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable ||
          target.getAttribute('role') === 'textbox')
      ) {
        return;
      }

      // Ignore when modifier keys are pressed
      if (e.ctrlKey || e.altKey || e.metaKey) return;

      if (e.key.toLowerCase() === konamiSequence[keyIdx]) {
        keyIdx++;
        if (keyIdx === konamiSequence.length) {
          keyIdx = 0;
          handleExecuteCommand('konami');
          const el = document.getElementById('contact');
          el?.scrollIntoView({ behavior: 'smooth' });
          inputRef.current?.focus();
        }
      } else {
        keyIdx = 0;
      }
    };

    window.addEventListener('keydown', handleGlobalKey);
    return () => window.removeEventListener('keydown', handleGlobalKey);
  }, []);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalLogs]);

  return (
    <section
      id="contact"
      className="py-20 relative font-mono text-xs border-b border-console-border bg-[#060806]"
      aria-labelledby="contact-heading"
    >
      {/* Background Graticule */}
      <div className="absolute inset-0 graticule-grid opacity-20 pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="border border-console-border bg-[#0B0E0B] p-4 mb-8">
          <div className="flex items-center gap-2 text-xs mb-1.5">
            <span className="text-phosphor font-bold">[04]</span>
            <span className="text-term-dim">//</span>
            <span className="text-[#8B9E8B] uppercase">COMMUNICATIONS_BUS // DISPATCH_CONSOLE</span>
            <span className="text-term-dim">·</span>
            <span className="text-phosphor font-bold">PORT: 22 / 443</span>
          </div>
          <h2 id="contact-heading" className="text-2xl sm:text-3xl font-black text-term-bright tracking-tight uppercase">
            Contact &amp; Telemetry
          </h2>
          <p className="font-sans text-term-text text-sm mt-1 max-w-2xl">
            Have a project or opportunity involving AI, embedded systems, IoT microcontrollers or full-stack web architecture? Reach out directly via the register links or dispatch commands in the interactive console below.
          </p>
        </div>

        {/* 1. Plain Visible Fallback Interface (Clickable without typing) */}
        <div className="mb-8">
          <div className="text-[10px] text-[#8B9E8B] uppercase tracking-wider mb-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-phosphor inline-block" />
            <span>DIRECT ACCESS REGISTERS // CLICKABLE FALLBACK</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Email Card */}
            <div className="console-panel border border-console-border p-4 bg-[#090C09] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[10px] text-[#8B9E8B] mb-2">
                  <span>ADDR: 0x01</span>
                  <span className="text-phosphor font-bold">DIRECT_MAIL</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Mail size={16} className="text-phosphor" />
                  <span className="text-sm font-bold text-term-bright">Email</span>
                </div>
                <p className="text-[11px] text-[#8B9E8B] truncate select-all" title={CONTACT_LINKS.email}>
                  {CONTACT_LINKS.email}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-console-border flex items-center justify-between gap-2">
                <a
                  href={`mailto:${CONTACT_LINKS.email}`}
                  className="console-btn text-[11px] py-1 px-2.5 flex items-center gap-1.5"
                >
                  <Send size={11} />
                  <span>Send Mail</span>
                </a>
                <button
                  type="button"
                  onClick={copyEmailToClipboard}
                  className="console-btn-ghost text-[11px] py-1 px-2 flex items-center gap-1"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? <Check size={11} className="text-phosphor" /> : <Copy size={11} />}
                  <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* GitHub Card */}
            <div className="console-panel border border-console-border p-4 bg-[#090C09] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[10px] text-[#8B9E8B] mb-2">
                  <span>ADDR: 0x02</span>
                  <span className="text-term-bright font-bold">VCS_REPO</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <GithubIcon size={16} className="text-term-bright" />
                  <span className="text-sm font-bold text-term-bright">GitHub</span>
                </div>
                <p className="text-[11px] text-[#8B9E8B] truncate">
                  github.com/Vinzz006
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-console-border">
                <a
                  href={CONTACT_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="console-btn-ghost text-[11px] py-1 px-2.5 w-full flex items-center justify-between"
                >
                  <span>$ git remote</span>
                  <ExternalLink size={11} />
                </a>
              </div>
            </div>

            {/* LinkedIn Card */}
            <div className="console-panel border border-console-border p-4 bg-[#090C09] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[10px] text-[#8B9E8B] mb-2">
                  <span>ADDR: 0x03</span>
                  <span className="text-term-bright font-bold">PROF_NETWORK</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <LinkedinIcon size={16} className="text-phosphor" />
                  <span className="text-sm font-bold text-term-bright">LinkedIn</span>
                </div>
                <p className="text-[11px] text-[#8B9E8B] truncate">
                  linkedin.com/in/vinesh-shanmugam
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-console-border">
                <a
                  href={CONTACT_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="console-btn-ghost text-[11px] py-1 px-2.5 w-full flex items-center justify-between"
                >
                  <span>$ connect</span>
                  <ExternalLink size={11} />
                </a>
              </div>
            </div>

            {/* Resume PDF Card */}
            <div className="console-panel border border-console-border p-4 bg-[#090C09] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[10px] text-[#8B9E8B] mb-2">
                  <span>ADDR: 0x04</span>
                  <span className="text-amber font-bold">OFFICIAL_DOC</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <FileText size={16} className="text-amber" />
                  <span className="text-sm font-bold text-term-bright">Resume PDF</span>
                </div>
                <p className="text-[11px] text-[#8B9E8B] truncate">
                  Vinesh_Shanmugam_Resume.pdf
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-console-border">
                <button
                  type="button"
                  onClick={() => setResumeOpen(true)}
                  className="console-btn text-[11px] py-1 px-2.5 w-full flex items-center justify-between"
                >
                  <span>$ open resume.pdf</span>
                  <ArrowRight size={11} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Interactive Terminal Prompt Interface */}
        <div className="console-panel border border-console-border bg-[#040504] p-4 sm:p-6 overflow-hidden">
          {/* Terminal Window Top Bar */}
          <div className="border-b border-console-border pb-3 mb-4 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#FF4D4D]" />
              <span className="w-2.5 h-2.5 bg-amber" />
              <span className="w-2.5 h-2.5 bg-phosphor" />
              <span className="ml-2 font-bold text-term-bright">
                vinesh@bench-console: /dev/ttyS0 (baud 115200)
              </span>
            </div>
            <span className="text-[10px] text-phosphor uppercase font-bold">
              [ACTIVE_SESSION]
            </span>
          </div>

          {/* Quick-Click Command Helpers */}
          <div className="mb-4 pb-2 border-b border-console-border/70 flex flex-wrap items-center gap-2 text-[11px]">
            <span className="text-[#8B9E8B]">QUICK COMMANDS:</span>
            {['help', 'email', 'github', 'linkedin', 'resume', 'whoami', 'sudo hire vinesh', 'konami', 'clear'].map((cmd) => (
              <button
                key={cmd}
                type="button"
                onClick={() => handleExecuteCommand(cmd)}
                className="px-2 py-0.5 border border-console-border bg-[#090C09] text-[#8B9E8B] hover:border-phosphor hover:text-phosphor focus-visible:outline-2 focus-visible:outline-phosphor transition-colors"
              >
                ${cmd}
              </button>
            ))}
          </div>

          {/* Terminal Logs Viewport */}
          <div
            className="max-h-72 overflow-y-auto space-y-3 pr-2 mb-4 font-mono"
            role="region"
            aria-label="Terminal Output Logs"
            aria-live="polite"
          >
            {terminalLogs.map((log) => (
              <div key={log.id} className="space-y-1">
                <div className="flex items-center gap-2 text-[#8B9E8B] text-xs">
                  <span className="text-phosphor font-bold">vinesh@bench-console:~$</span>
                  <span className="text-term-bright">{log.command}</span>
                  <span className="text-[10px] text-[#8B9E8B] ml-auto">[{log.timestamp}]</span>
                </div>
                <div className="pl-4 border-l border-console-border text-xs">
                  {log.output}
                </div>
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          {/* Terminal Input Line */}
          <form onSubmit={handleFormSubmit} className="pt-3 border-t border-console-border flex items-center gap-2">
            <label htmlFor="terminal-input" className="text-phosphor font-bold text-xs flex-shrink-0 cursor-pointer">
              vinesh@bench-console:~$
            </label>
            <input
              id="terminal-input"
              ref={inputRef}
              type="text"
              value={inputCommand}
              onChange={(e) => setInputCommand(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => {
                setTimeout(() => {
                  inputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 300);
              }}
              placeholder="type 'help' or command (↑/↓ for history)..."
              className="bg-transparent border-none text-xs text-term-bright outline-none flex-1 font-mono placeholder-term-dim focus:ring-0"
              autoComplete="off"
              spellCheck={false}
              aria-label="Terminal command prompt"
            />
            <button
              type="submit"
              className="console-btn text-[11px] py-1 px-3 flex items-center gap-1"
            >
              <span>RUN</span>
              <ArrowRight size={11} />
            </button>
          </form>
        </div>
      </div>

      {/* Official Resume Modal */}
      {resumeOpen && (
        <Suspense fallback={null}>
          <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
        </Suspense>
      )}
    </section>
  );
}
