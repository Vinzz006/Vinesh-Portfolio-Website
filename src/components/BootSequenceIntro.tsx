import { useEffect, useState, useCallback } from 'react';

interface BootSequenceIntroProps {
  onComplete: () => void;
}

const BOOT_LOGS = [
  { text: '> initializing GPIO & power rails.............', status: '[  OK  ]' },
  { text: '> probing I2C bus (MPU6050, CT sensors)........', status: '[  OK  ]' },
  { text: '> calibrating analog front-end (ADC1)..........', status: '[  OK  ]' },
  { text: '> loading TinyML quantized edge model..........', status: '[  OK  ]' },
  { text: '> mounting telemetry pipeline & MQTT..........', status: '[  OK  ]' },
  { text: '> starting hardware debug console.............', status: '[  OK  ]' },
  { text: '> PORTFOLIO BENCH ONLINE.', status: '' },
];

export default function BootSequenceIntro({ onComplete }: BootSequenceIntroProps) {
  const [currentLine, setCurrentLine] = useState(0);
  const [fading, setFading] = useState(false);

  const finish = useCallback(() => {
    try {
      sessionStorage.setItem('vinesh_boot_seq_seen', 'true');
    } catch {
      // ignore storage errors
    }
    setFading(true);
    setTimeout(() => {
      onComplete();
    }, 150);
  }, [onComplete]);

  useEffect(() => {
    // If prefers-reduced-motion is requested, complete immediately
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onComplete();
      return;
    }

    // Any keypress skips immediately
    const handleKeyDown = () => {
      finish();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [finish, onComplete]);

  useEffect(() => {
    if (currentLine < BOOT_LOGS.length) {
      const delay = currentLine === BOOT_LOGS.length - 1 ? 350 : 160;
      const timer = setTimeout(() => {
        setCurrentLine((prev) => prev + 1);
      }, delay);
      return () => clearTimeout(timer);
    } else {
      // Once all lines printed, hold briefly then finish (total sequence ~1.5s)
      const endTimer = setTimeout(() => {
        finish();
      }, 200);
      return () => clearTimeout(endTimer);
    }
  }, [currentLine, finish]);

  return (
    <div
      onClick={finish}
      style={{ contain: 'strict' }}
      className={`fixed inset-0 z-50 bg-[#060806]/95 text-term-text font-mono flex flex-col justify-between p-6 sm:p-12 cursor-pointer transition-opacity duration-300 select-none ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-hidden="true"
      inert={fading ? true : undefined}
    >
      {/* Background graticule */}
      <div className="absolute inset-0 graticule-grid opacity-30 pointer-events-none" />

      {/* Top Header */}
      <div className="relative z-10 border-b border-console-border pb-3 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="led-phosphor animate-pulse" />
          <span className="text-phosphor font-bold tracking-widest uppercase">
            BIOS // HARDWARE_INIT
          </span>
        </div>
        <span className="text-term-muted text-[11px]">
          XTENSA LX7 @ 240MHz · ESP-IDF v5.2 · SRAM 512KB
        </span>
      </div>

      {/* Terminal Output */}
      <div className="relative z-10 max-w-3xl my-auto py-6">
        <div className="border-t border-b border-console-border py-1.5 text-term-dim text-[11px] sm:text-xs mb-3 font-mono tracking-wider">
          VINESH SHANMUGAM // EMBEDDED AI &amp; HARDWARE BENCH DEBUGGER
        </div>

        <div className="space-y-1.5 text-xs sm:text-sm">
          {BOOT_LOGS.slice(0, currentLine).map((log, index) => (
            <div
              key={index}
              className={`flex items-baseline justify-between gap-4 ${
                index === BOOT_LOGS.length - 1
                  ? 'text-phosphor font-bold text-sm sm:text-base mt-2'
                  : 'text-term-bright'
              }`}
            >
              <span className="truncate">{log.text}</span>
              {log.status && (
                <span className="text-phosphor font-bold flex-shrink-0">
                  {log.status}
                </span>
              )}
            </div>
          ))}

          {currentLine < BOOT_LOGS.length && (
            <div className="inline-flex items-center gap-1 text-phosphor">
              <span className="w-2.5 h-4 bg-phosphor animate-blink inline-block" />
            </div>
          )}
        </div>
      </div>

      {/* Skip prompt footer */}
      <div className="relative z-10 border-t border-console-border pt-3 flex items-center justify-between text-[11px] text-term-muted">
        <span>PRESS [ESC] OR CLICK ANYWHERE TO SKIP</span>
        <span className="text-phosphor/80">[CLICK TO SKIP]</span>
      </div>
    </div>
  );
}
