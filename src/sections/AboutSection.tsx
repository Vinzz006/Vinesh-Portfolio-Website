import { useEffect } from 'react';
import { Cpu, Brain, Globe } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { animateSectionEntrance } from '../animations/anime-utils';
import { useReducedMotion } from '../hooks/useReducedMotion';
import ScrollTextReveal from '../components/motion/ScrollTextReveal';
import { projects } from '../data/projects';
import { timelineItems } from '../data/experience';
import { measuredResults } from '../data/metrics';

const stackLayers = [
  { label: 'Hardware', code: 'HW-01', color: '#39FF88' },
  { label: 'Embedded Systems', code: 'EMB-02', color: '#39FF88' },
  { label: 'AI / ML', code: 'ML-03', color: '#FFB000' },
  { label: 'Backend', code: 'BE-04', color: '#CCDACC' },
  { label: 'Cloud', code: 'CL-05', color: '#CCDACC' },
  { label: 'Frontend', code: 'FE-06', color: '#39FF88' },
];

export default function AboutSection() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });
  const reduced = useReducedMotion();

  // Compute metrics strictly from repository data
  const projectsDocumented = projects.length;
  const publicCodeCount = projects.filter((p) => p.githubUrl !== null).length;
  const distinctTechCount = new Set(projects.flatMap((p) => p.technologies)).size;

  // Derive completed years of study from experience.ts education period and today's date
  const eduItem = timelineItems.find((item) => item.type === 'education');
  const startYear = eduItem ? parseInt(eduItem.period.split('–')[0].trim(), 10) : 2024;
  const academicStartDate = new Date(startYear, 7, 1); // August 2024 start
  const now = new Date();
  const diffYears = (now.getTime() - academicStartDate.getTime()) / (365.25 * 24 * 60 * 60 * 1000);
  const yearsCompleted = Math.max(0, Math.floor(diffYears));

  // Only render measured results if an explicit test/measurement method is provided
  const verifiedMeasuredResults = measuredResults.filter((m) => Boolean(m.method && m.method.trim()));

  useEffect(() => {
    if (isVisible) {
      animateSectionEntrance('#about-content', reduced);
    }
  }, [isVisible, reduced]);

  return (
    <section
      id="about"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-20 relative font-mono text-xs border-b border-console-border bg-[#060806]"
      aria-labelledby="about-heading"
    >
      {/* Background Graticule */}
      <div className="absolute inset-0 graticule-grid opacity-20 pointer-events-none" aria-hidden="true" />

      <div id="about-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" style={{ opacity: 0 }}>
        {/* Telemetry Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-console-border pb-3 mb-10">
          <div className="flex items-center gap-2">
            <span className="text-phosphor font-bold">[02]</span>
            <span className="text-term-dim">//</span>
            <span className="text-term-bright font-bold tracking-wider">SYSTEM_ARCHITECTURE · BIOGRAPHY</span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-term-muted">
            <span>DISCIPLINE: ECE</span>
            <span className="text-term-dim">|</span>
            <span className="text-phosphor">SPEC_READY</span>
          </div>
        </div>

        {/* Main Statement with Text Reveal */}
        <div className="max-w-4xl mb-12">
          <div className="text-[11px] text-phosphor tracking-widest uppercase mb-2">
            &gt; CORE_THESIS
          </div>
          <h2 id="about-heading" className="text-2xl sm:text-4xl font-black text-term-bright mb-5 font-mono tracking-tight leading-tight">
            Where physical hardware becomes <span className="text-phosphor">intelligent</span> through software &amp; machine learning.
          </h2>
          <ScrollTextReveal
            text="I build systems where physical hardware becomes intelligent through software and machine learning. My work spans the full stack from reading a physical sensor on microcontrollers to serving model predictions and rendering real-time dashboards."
            className="text-base sm:text-lg text-term-text leading-relaxed font-sans font-normal"
            highlightWords={['hardware', 'software', 'machine', 'learning', 'sensor', 'microcontrollers', 'predictions', 'dashboards']}
          />
        </div>

        {/* Computed Hardware Metrics Registers */}
        <div className="mb-12">
          <div className="text-[11px] text-term-muted tracking-widest uppercase mb-3 flex items-center justify-between">
            <span>[REGISTER_BANK] COMPUTED REPOSITORY METRICS</span>
            <span className="text-term-dim text-[10px]">SRC: GITHUB_INVENTORY</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="border border-console-border bg-console-panel p-4">
              <span className="text-[10px] text-term-muted uppercase block tracking-wider mb-1">REG_00: PROJECTS</span>
              <div className="text-3xl font-black text-term-bright font-mono">
                {projectsDocumented}
              </div>
              <p className="text-[11px] text-term-muted mt-1 font-sans">Full Systems Documented</p>
            </div>

            <div className="border border-console-border bg-console-panel p-4">
              <span className="text-[10px] text-term-muted uppercase block tracking-wider mb-1">REG_01: OPEN REPOS</span>
              <div className="text-3xl font-black text-phosphor font-mono">
                {publicCodeCount}
              </div>
              <p className="text-[11px] text-term-muted mt-1 font-sans">Public Code Repositories</p>
            </div>

            <div className="border border-console-border bg-console-panel p-4">
              <span className="text-[10px] text-term-muted uppercase block tracking-wider mb-1">REG_02: TECH STACK</span>
              <div className="text-3xl font-black text-amber font-mono">
                {distinctTechCount}
              </div>
              <p className="text-[11px] text-term-muted mt-1 font-sans">Hardware, AI &amp; Web Tools</p>
            </div>

            <div className="border border-console-border bg-console-panel p-4">
              <span className="text-[10px] text-term-muted uppercase block tracking-wider mb-1">REG_03: ACADEMIC</span>
              <div className="text-3xl font-black text-term-bright font-mono">
                {yearsCompleted} <span className="text-sm font-normal text-term-muted">Yr</span>
              </div>
              <p className="text-[11px] text-term-muted mt-1 font-sans">B.E. ECE (2024–2028)</p>
            </div>

            {/* Verified measured results */}
            {verifiedMeasuredResults.map((result, idx) => (
              <div key={idx} className="border border-console-border bg-console-panel p-4 col-span-2 md:col-span-1">
                <span className="text-[10px] text-phosphor uppercase block tracking-wider mb-1">BENCHMARK_RESULT</span>
                <div className="text-2xl font-black text-term-bright font-mono">
                  {result.value} <span className="text-xs font-normal text-term-muted">{result.unit}</span>
                </div>
                <p className="text-xs font-semibold text-term-text mt-1">{result.label}</p>
                <p className="text-[10px] text-term-muted mt-0.5 truncate" title={result.method}>Method: {result.method}</p>
              </div>
            ))}
          </div>
        </div>

        {/* System Stack Pipeline */}
        <div className="mb-12 border border-console-border bg-console-panel p-5">
          <div className="text-[11px] text-term-muted tracking-widest uppercase mb-4 flex items-center justify-between border-b border-console-border pb-2">
            <span>[BUS_ROUTING] END-TO-END DATA PIPELINE</span>
            <span className="text-phosphor text-[10px]">CONTINUOUS_SIGNAL_FLOW</span>
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            {stackLayers.map((layer, i) => (
              <div key={layer.label} className="flex items-center gap-2">
                <div
                  className="px-3 py-1.5 border text-xs font-mono font-bold flex items-center gap-2"
                  style={{
                    borderColor: '#293629',
                    backgroundColor: '#060806',
                    color: layer.color,
                  }}
                >
                  <span className="text-[10px] text-term-muted font-normal">{layer.code}:</span>
                  <span>{layer.label}</span>
                </div>
                {i < stackLayers.length - 1 && (
                  <span className="text-term-dim font-mono">→</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Engineering Domain Modules */}
        <div>
          <div className="text-[11px] text-term-muted tracking-widest uppercase mb-4">
            [CORE_SUBSYSTEMS] HARDWARE, EDGE AI &amp; WEB ARCHITECTURE
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {/* Subsystem 1 */}
            <div className="border border-console-border bg-console-panel p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-console-border pb-3 mb-4">
                  <div className="flex items-center gap-2 text-phosphor">
                    <Cpu size={18} />
                    <span className="font-bold text-xs uppercase tracking-wider">MOD_01: EMBEDDED &amp; IOT</span>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 border border-phosphor/30 text-phosphor bg-phosphor/5">
                    HARDWARE
                  </span>
                </div>
                <h3 className="text-sm font-bold text-term-bright mb-2 font-mono">
                  Embedded Systems &amp; Hardware
                </h3>
                <p className="text-xs text-term-text font-sans leading-relaxed mb-4">
                  Microcontroller firmware engineering, sensor data acquisition, FreeRTOS multitasking, I2C/SPI bus protocols, and MQTT streaming.
                </p>
              </div>
              <div className="pt-3 border-t border-console-border flex flex-wrap gap-1.5 font-mono text-[10px]">
                {['ESP32', 'FreeRTOS', 'I2C', 'SPI', 'MQTT', 'GPIO'].map((t) => (
                  <span key={t} className="px-1.5 py-0.5 border border-console-border bg-console-well text-term-muted">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Subsystem 2 */}
            <div className="border border-console-border bg-console-panel p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-console-border pb-3 mb-4">
                  <div className="flex items-center gap-2 text-amber">
                    <Brain size={18} />
                    <span className="font-bold text-xs uppercase tracking-wider">MOD_02: EDGE AI &amp; TINYML</span>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 border border-amber/30 text-amber bg-amber/5">
                    INTELLIGENCE
                  </span>
                </div>
                <h3 className="text-sm font-bold text-term-bright mb-2 font-mono">
                  TinyML &amp; Edge Inference
                </h3>
                <p className="text-xs text-term-text font-sans leading-relaxed mb-4">
                  On-device machine learning model quantization, TensorFlow Lite for Microcontrollers, signal processing (FFT), and feature extraction.
                </p>
              </div>
              <div className="pt-3 border-t border-console-border flex flex-wrap gap-1.5 font-mono text-[10px]">
                {['TinyML', 'TFLite Micro', 'PyTorch', 'Quantization', 'FFT', 'SHAP'].map((t) => (
                  <span key={t} className="px-1.5 py-0.5 border border-console-border bg-console-well text-term-muted">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Subsystem 3 */}
            <div className="border border-console-border bg-console-panel p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-console-border pb-3 mb-4">
                  <div className="flex items-center gap-2 text-term-bright">
                    <Globe size={18} />
                    <span className="font-bold text-xs uppercase tracking-wider">MOD_03: TELEMETRY &amp; WEB</span>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 border border-console-border text-term-muted bg-console-well">
                    FULL-STACK
                  </span>
                </div>
                <h3 className="text-sm font-bold text-term-bright mb-2 font-mono">
                  Full-Stack Web Architecture
                </h3>
                <p className="text-xs text-term-text font-sans leading-relaxed mb-4">
                  High-performance React &amp; TypeScript applications with Tailwind CSS, FastAPI Python backend APIs, and real-time WebSockets.
                </p>
              </div>
              <div className="pt-3 border-t border-console-border flex flex-wrap gap-1.5 font-mono text-[10px]">
                {['React 19', 'TypeScript', 'FastAPI', 'WebSockets', 'Tailwind', 'Vite'].map((t) => (
                  <span key={t} className="px-1.5 py-0.5 border border-console-border bg-console-well text-term-muted">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
