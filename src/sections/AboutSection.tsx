import { useEffect, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Brain, Globe, Cloud, Zap, Activity, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { animateSectionEntrance } from '../animations/anime-utils';
import { useReducedMotion, useLowPower } from '../hooks/useReducedMotion';
import SectionLightSweep from '../components/SectionLightSweep';
import { NumberTicker } from '../components/ui/NumberTicker';
import { BentoGrid, BentoGridItem } from '../components/ui/BentoGrid';
import { BorderBeam } from '../components/ui/BorderBeam';
import ScrollTextReveal from '../components/motion/ScrollTextReveal';
import { projects } from '../data/projects';
import { timelineItems } from '../data/experience';
import { measuredResults } from '../data/metrics';

const About3DDecorations = lazy(() => import('../components/3d/About3DDecorations'));

const stackLayers = [
  { label: 'Hardware', color: '#10B981' },
  { label: 'Embedded Systems', color: '#00D4FF' },
  { label: 'AI / ML', color: '#7C3AED' },
  { label: 'Backend', color: '#F59E0B' },
  { label: 'Cloud', color: '#3B82F6' },
  { label: 'Frontend', color: '#EC4899' },
];

export default function AboutSection() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });
  const reduced = useReducedMotion();
  const lowPower = useLowPower();

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
      className="py-24 relative overflow-hidden bg-[#050505]"
      aria-labelledby="about-heading"
    >
      {/* 3D Ambient Background Geometries - Skipped in lowPower */}
      {!lowPower && (
        <Suspense fallback={null}>
          <About3DDecorations />
        </Suspense>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 relative z-10">
        <SectionLightSweep actLabel="ACT 02" actTitle="ENGINEERING ARCHITECTURE" isVisible={isVisible} />
      </div>

      <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" aria-hidden="true" />

      <div id="about-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" style={{ opacity: 0 }}>
        {/* Label */}
        <div className="mb-4">
          <span className="section-label">ABOUT ME</span>
        </div>

        {/* Main statement with Scroll-Linked Word Reveal */}
        <div className="max-w-4xl mb-14">
          <h2 id="about-heading" className="text-4xl sm:text-5xl md:text-6xl font-black text-text-bright mb-6 tracking-tight">
            Where hardware becomes{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-400 to-secondary">
              intelligent
            </span>
          </h2>
          <ScrollTextReveal
            text="I build systems where physical hardware becomes intelligent through software and machine learning. My work spans the full stack from reading a physical sensor on microcontrollers to serving model predictions and rendering real-time dashboards."
            className="text-xl sm:text-2xl text-text-secondary leading-relaxed font-normal"
            highlightWords={['hardware', 'software', 'machine', 'learning', 'sensor', 'microcontrollers', 'predictions', 'dashboards']}
          />
        </div>

        {/* Computed Metrics Banner derived strictly from repository data */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          <div className="glass-card p-5 border-primary/20 relative overflow-hidden group">
            <BorderBeam size={100} duration={6} colorFrom="#00D4FF" colorTo="#10B981" />
            <p className="font-mono text-[10px] text-text-muted uppercase tracking-widest mb-1">PROJECTS DOCUMENTED</p>
            <div className="text-3xl md:text-4xl font-black text-text-bright flex items-baseline gap-1">
              <NumberTicker value={projectsDocumented} />
            </div>
            <p className="text-xs text-text-muted mt-1">Full Systems in Archive</p>
          </div>

          <div className="glass-card p-5 border-secondary/20 relative overflow-hidden group">
            <BorderBeam size={100} duration={8} colorFrom="#7C3AED" colorTo="#EC4899" />
            <p className="font-mono text-[10px] text-text-muted uppercase tracking-widest mb-1">PUBLIC CODE REPOSITORIES</p>
            <div className="text-3xl md:text-4xl font-black text-primary flex items-baseline gap-1">
              <NumberTicker value={publicCodeCount} />
            </div>
            <p className="text-xs text-text-muted mt-1">Open Source Repositories</p>
          </div>

          <div className="glass-card p-5 border-accent-green/20 relative overflow-hidden group">
            <BorderBeam size={100} duration={7} colorFrom="#10B981" colorTo="#00D4FF" />
            <p className="font-mono text-[10px] text-text-muted uppercase tracking-widest mb-1">DISTINCT TECHNOLOGIES</p>
            <div className="text-3xl md:text-4xl font-black text-accent-green flex items-baseline gap-1">
              <NumberTicker value={distinctTechCount} />
            </div>
            <p className="text-xs text-text-muted mt-1">Across Hardware, AI & Web</p>
          </div>

          <div className="glass-card p-5 border-accent-amber/20 relative overflow-hidden group">
            <BorderBeam size={100} duration={9} colorFrom="#F59E0B" colorTo="#7C3AED" />
            <p className="font-mono text-[10px] text-text-muted uppercase tracking-widest mb-1">YEARS OF STUDY COMPLETED</p>
            <div className="text-3xl md:text-4xl font-black text-accent-amber flex items-baseline gap-1">
              <NumberTicker value={yearsCompleted} suffix={yearsCompleted === 1 ? ' Year' : ' Years'} />
            </div>
            <p className="text-xs text-text-muted mt-1">B.E. ECE (2024 – 2028)</p>
          </div>

          {/* Measured results tiles rendered only when a defensible measurement method is supplied */}
          {verifiedMeasuredResults.map((result, idx) => (
            <div key={idx} className="glass-card p-5 border-accent-green/30 relative overflow-hidden group col-span-2 md:col-span-1">
              <BorderBeam size={100} duration={7} colorFrom="#10B981" colorTo="#00D4FF" />
              <p className="font-mono text-[10px] text-accent-green uppercase tracking-widest mb-1">MEASURED RESULT</p>
              <div className="text-2xl md:text-3xl font-black text-text-bright flex items-baseline gap-1">
                {result.value} <span className="text-sm font-normal text-text-muted">{result.unit}</span>
              </div>
              <p className="text-xs font-semibold text-text-primary mt-1">{result.label}</p>
              <p className="text-[10px] text-text-muted mt-0.5 truncate" title={result.method}>Method: {result.method}</p>
            </div>
          ))}
        </div>

        {/* Stack layers visual */}
        <div className="mb-12">
          <p className="font-mono text-xs text-text-muted tracking-widest mb-4">SYSTEM STACK PIPELINE</p>
          <div className="flex flex-wrap gap-2 items-center">
            {stackLayers.map((layer, i) => (
              <div key={layer.label} className="flex items-center gap-2">
                <div
                  className="px-3.5 py-1.5 rounded-lg border text-xs font-mono font-bold transition-all duration-200 hover:scale-105 shadow-sm"
                  style={{
                    borderColor: layer.color + '40',
                    backgroundColor: layer.color + '08',
                    color: layer.color,
                  }}
                >
                  {layer.label}
                </div>
                {i < stackLayers.length - 1 && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M6 0 L6 12" stroke={layer.color} strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
                    <path d="M3 9 L6 12 L9 9" stroke={layer.color} strokeWidth="1" opacity="0.5" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Aceternity UI Bento Grid Layout */}
        <BentoGrid className="mb-12">
          <BentoGridItem
            title="Embedded Systems & IoT Hardware"
            description="Microcontroller firmware engineering, sensor data acquisition,FreeRTOS multitasking, I2C/SPI bus protocols, and MQTT streaming."
            icon={<Cpu size={22} />}
            badge="ESP32 · FreeRTOS"
            hasBeam={true}
            header={
              <div className="w-full h-24 rounded-xl bg-gradient-to-br from-[#10B981]/20 via-bg-primary to-bg-secondary p-3 border border-[#10B981]/30 flex flex-col justify-between">
                <span className="font-mono text-[9px] text-[#10B981] font-bold">HARDWARE SENSING NODE</span>
                <div className="flex gap-1.5 flex-wrap">
                  {['ESP32', 'I2C', 'SPI', 'FreeRTOS', 'MQTT'].map((t) => (
                    <span key={t} className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-bg-primary/80 border border-[#10B981]/40 text-[#10B981]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            }
          />

          <BentoGridItem
            title="TinyML & Edge AI Intelligence"
            description="On-device machine learning model quantization, TensorFlow Lite for Microcontrollers, signal processing (FFT), and feature extraction."
            icon={<Brain size={22} />}
            badge="TensorFlow · TinyML"
            header={
              <div className="w-full h-24 rounded-xl bg-gradient-to-br from-[#7C3AED]/20 via-bg-primary to-bg-secondary p-3 border border-[#7C3AED]/30 flex flex-col justify-between">
                <span className="font-mono text-[9px] text-[#7C3AED] font-bold">EDGE INFERENCE ENGINE</span>
                <div className="flex gap-1.5 flex-wrap">
                  {['TinyML', 'PyTorch', 'Scikit-Learn', 'OpenCV', 'SHAP'].map((t) => (
                    <span key={t} className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-bg-primary/80 border border-[#7C3AED]/40 text-[#7C3AED]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            }
          />

          <BentoGridItem
            title="Full-Stack Web Architecture"
            description="High-performance React & TypeScript applications with Tailwind CSS, FastAPI Python backend APIs, and real-time WebSockets."
            icon={<Globe size={22} />}
            badge="React · FastAPI"
            hasBeam={true}
            header={
              <div className="w-full h-24 rounded-xl bg-gradient-to-br from-[#00D4FF]/20 via-bg-primary to-bg-secondary p-3 border border-[#00D4FF]/30 flex flex-col justify-between">
                <span className="font-mono text-[9px] text-[#00D4FF] font-bold">DASHBOARD & REST API</span>
                <div className="flex gap-1.5 flex-wrap">
                  {['React', 'TypeScript', 'Vite', 'FastAPI', 'Tailwind'].map((t) => (
                    <span key={t} className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-bg-primary/80 border border-[#00D4FF]/40 text-[#00D4FF]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            }
          />
        </BentoGrid>
      </div>
    </section>
  );
}
