import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Brain, Globe, Cloud, Zap, Activity, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { animateSectionEntrance } from '../animations/anime-utils';
import { useReducedMotion } from '../hooks/useReducedMotion';
import SectionLightSweep from '../components/SectionLightSweep';
import { NumberTicker } from '../components/ui/NumberTicker';
import { BentoGrid, BentoGridItem } from '../components/ui/BentoGrid';
import { BorderBeam } from '../components/ui/BorderBeam';
import About3DDecorations from '../components/3d/About3DDecorations';
import ScrollTextReveal from '../components/motion/ScrollTextReveal';

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
      {/* 3D Ambient Background Geometries */}
      <About3DDecorations />

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
            text="I build systems where physical hardware becomes intelligent through software and machine learning. My work spans the full stack from reading a physical sensor on microcontrollers to serving model predictions and rendering 60 FPS real-time dashboards."
            className="text-xl sm:text-2xl text-text-secondary leading-relaxed font-normal"
            highlightWords={['hardware', 'software', 'machine', 'learning', 'sensor', 'microcontrollers', 'predictions', 'dashboards']}
          />
        </div>

        {/* Magic UI Animated Number Ticker Metrics Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          <div className="glass-card p-5 border-primary/20 relative overflow-hidden group">
            <BorderBeam size={100} duration={6} colorFrom="#00D4FF" colorTo="#10B981" />
            <p className="font-mono text-[10px] text-text-muted uppercase tracking-widest mb-1">PROTOTYPED SYSTEMS</p>
            <div className="text-3xl md:text-4xl font-black text-text-bright flex items-baseline gap-1">
              <NumberTicker value={10} suffix="+" />
            </div>
            <p className="text-xs text-text-muted mt-1">IoT, AI & Full-Stack Projects</p>
          </div>

          <div className="glass-card p-5 border-secondary/20 relative overflow-hidden group">
            <BorderBeam size={100} duration={8} colorFrom="#7C3AED" colorTo="#EC4899" />
            <p className="font-mono text-[10px] text-text-muted uppercase tracking-widest mb-1">REAL-TIME STREAMING</p>
            <div className="text-3xl md:text-4xl font-black text-primary flex items-baseline gap-1">
              <NumberTicker value={60} suffix=" FPS" />
            </div>
            <p className="text-xs text-text-muted mt-1">Telemetry Dashboard Sync</p>
          </div>

          <div className="glass-card p-5 border-accent-green/20 relative overflow-hidden group">
            <BorderBeam size={100} duration={7} colorFrom="#10B981" colorTo="#00D4FF" />
            <p className="font-mono text-[10px] text-text-muted uppercase tracking-widest mb-1">ML ACCURACY</p>
            <div className="text-3xl md:text-4xl font-black text-accent-green flex items-baseline gap-1">
              <NumberTicker value={99} suffix="%" />
            </div>
            <p className="text-xs text-text-muted mt-1">TinyML Activity Classification</p>
          </div>

          <div className="glass-card p-5 border-accent-amber/20 relative overflow-hidden group">
            <BorderBeam size={100} duration={9} colorFrom="#F59E0B" colorTo="#7C3AED" />
            <p className="font-mono text-[10px] text-text-muted uppercase tracking-widest mb-1">EDGE INFERENCE</p>
            <div className="text-3xl md:text-4xl font-black text-accent-amber flex items-baseline gap-1">
              <NumberTicker value={12} suffix=" ms" />
            </div>
            <p className="text-xs text-text-muted mt-1">On-Device Model Latency</p>
          </div>
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
