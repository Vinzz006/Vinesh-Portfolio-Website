import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, ChevronDown, FileText, Cpu, Activity, Radio, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/Icons';
import { animateHeroOpening } from '../animations/anime-utils';
import { calculateParallax } from '../animations/heroAnimations';
import { useReducedMotion } from '../hooks/useReducedMotion';
import vineshPortrait from '../assets/vinesh_portrait.jpg';
import ResumeModal from '../components/ResumeModal';
import { Spotlight } from '../components/ui/Spotlight';
import { Meteors } from '../components/ui/Meteors';
import { Marquee } from '../components/ui/Marquee';
import { BorderBeam } from '../components/ui/BorderBeam';
import HeroTechnologicalCore from '../components/3d/HeroTechnologicalCore';
import MagneticButton from '../components/motion/MagneticButton';

const techBadges = [
  'ESP32 Microcontroller',
  'TinyML Edge AI',
  'TensorFlow',
  'PyTorch',
  'FastAPI Python',
  'React 19 & TypeScript',
  'Firebase Real-time DB',
  'PostgreSQL & SQLAlchemy',
  'FreeRTOS Multitasking',
  'OpenCV Computer Vision',
  'SHAP Model Explainability',
  'MQTT Telemetry Protocol',
];

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [resumeOpen, setResumeOpen] = useState(false);
  const [parallaxPos, setParallaxPos] = useState({ x: 0, y: 0, rotateX: 0, rotateY: 0 });

  useEffect(() => {
    if (!containerRef.current) return;
    const timer = setTimeout(() => {
      animateHeroOpening('#hero-content', reduced);
    }, 80);
    return () => clearTimeout(timer);
  }, [reduced]);

  // Damping Mouse Parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced) return;
    const { x, y, rotateX, rotateY } = calculateParallax(
      e.clientX,
      e.clientY,
      window.innerWidth,
      window.innerHeight,
      0.5
    );
    setParallaxPos({ x, y, rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setParallaxPos({ x: 0, y: 0, rotateX: 0, rotateY: 0 });
  };

  const handleScroll = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="hero-section min-h-screen flex flex-col justify-center relative overflow-hidden pt-24 pb-12"
      aria-labelledby="hero-heading"
    >
      {/* Central Interactive 3D Technological Core (R3F & Three.js) */}
      <HeroTechnologicalCore mouseX={parallaxPos.x * 0.04} mouseY={parallaxPos.y * 0.04} />

      {/* 1. Spotlight Glow Accent */}
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#00D4FF" />

      {/* 2. Micro Meteors Atmospheric Field */}
      <Meteors number={12} />

      {/* 3. Subtle Cybernetic Grid */}
      <div
        className="hero-grid absolute inset-0 grid-bg opacity-20 pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${parallaxPos.x * 0.3}px, ${parallaxPos.y * 0.3}px, 0)`,
        }}
        aria-hidden="true"
      />

      {/* 4. Volumetric Ambient Radiance */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] rounded-full pointer-events-none opacity-40 blur-3xl transition-transform duration-700 ease-out"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(0, 212, 255, 0.15) 0%, rgba(124, 58, 237, 0.10) 45%, transparent 75%)',
          transform: `translate3d(${parallaxPos.x * 0.6}px, ${parallaxPos.y * 0.6}px, 0)`,
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 md:py-16 z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left — Identity & Technical Telemetry */}
          <div id="hero-content" className="lg:col-span-7">
            {/* Small Spec Label */}
            <div className="hero-label mb-5">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0C0C0C]/90 border border-primary/30 backdrop-blur-md shadow-[0_0_20px_rgba(0,212,255,0.15)]">
                <span className="w-2 h-2 rounded-full bg-accent-green shadow-[0_0_8px_#10B981] animate-pulse" />
                <span className="font-mono text-xs tracking-[0.25em] uppercase text-primary font-bold">
                  AI / ML • FULL STACK • IoT • EMBEDDED
                </span>
              </div>
            </div>

            {/* Monumental Hero Name Typography */}
            <h1
              id="hero-heading"
              className="hero-title text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-black mb-3 tracking-tighter leading-[0.92] text-transparent bg-clip-text bg-gradient-to-r from-text-bright via-text-primary to-primary/90"
              style={{ opacity: 0 }}
            >
              VINESH<br />SHANMUGAM
            </h1>

            {/* Subtitle / Spec */}
            <p
              className="hero-subtitle font-mono text-xs sm:text-sm tracking-[0.25em] text-primary/90 mb-5 uppercase flex items-center gap-2 font-semibold"
              style={{ opacity: 0 }}
            >
              <Cpu size={15} className="text-primary animate-pulse" />
              AI/ML Developer • Full-Stack Developer • IoT & Embedded Systems
            </p>

            {/* Core Brand Statement */}
            <p
              className="hero-statement text-xl md:text-2xl font-semibold text-text-bright mb-4 leading-snug max-w-2xl"
              style={{ opacity: 0 }}
            >
              "Building intelligent systems where{' '}
              <span className="text-primary border-b border-primary/40 pb-0.5">hardware</span>,{' '}
              <span className="text-secondary border-b border-secondary/40 pb-0.5">software</span> and{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary font-bold">AI</span> meet."
            </p>

            {/* Narrative Description */}
            <p
              className="hero-description text-text-secondary text-base leading-relaxed mb-7 max-w-xl"
              style={{ opacity: 0 }}
            >
              I design and build end-to-end intelligent systems that connect physical sensors, embedded microcontrollers,
              on-device ML inference, cloud platforms and real-time dashboard applications.
            </p>

            {/* Live Data Flow Telemetry Preview */}
            <div className="hero-hud-data mb-8 p-3 rounded-xl bg-[#0C0C0C]/80 border border-border-subtle backdrop-blur-md max-w-xl" style={{ opacity: 0 }}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] text-text-muted uppercase tracking-widest flex items-center gap-1.5">
                  <Activity size={12} className="text-accent-green" />
                  REAL-TIME PIPELINE TELEMETRY
                </span>
                <span className="font-mono text-[10px] text-primary font-bold">60 FPS // STREAM ACTIVE</span>
              </div>
              <div className="grid grid-cols-6 gap-1 font-mono text-[9px] text-center">
                <div className="p-1.5 rounded bg-[#050505] border border-border-subtle text-accent-green font-semibold">SENSOR</div>
                <div className="p-1.5 rounded bg-[#050505] border border-border-subtle text-primary font-semibold">ESP32</div>
                <div className="p-1.5 rounded bg-[#050505] border border-border-subtle text-secondary font-semibold">EDGE ML</div>
                <div className="p-1.5 rounded bg-[#050505] border border-border-subtle text-accent-amber font-semibold">FASTAPI</div>
                <div className="p-1.5 rounded bg-[#050505] border border-border-subtle text-blue-400 font-semibold">CLOUD</div>
                <div className="p-1.5 rounded bg-[#050505] border border-border-subtle text-pink-400 font-semibold">REACT</div>
              </div>
            </div>

            {/* CTAs with Magnetic Buttons */}
            <div className="flex flex-wrap gap-3 items-center">
              <MagneticButton strength={0.25}>
                <button
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hero-cta btn-primary shadow-glow-cyan"
                  style={{ opacity: 0 }}
                  aria-label="View engineering projects"
                >
                  View Projects
                  <ArrowRight size={16} />
                </button>
              </MagneticButton>

              <MagneticButton strength={0.2}>
                <button
                  onClick={() => setResumeOpen(true)}
                  className="hero-cta btn-outline flex items-center gap-2"
                  style={{ opacity: 0 }}
                  aria-label="Open Resume PDF viewer"
                >
                  <FileText size={16} className="text-primary" />
                  Resume PDF
                </button>
              </MagneticButton>

              <a
                href="https://github.com/Vinzz006"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-cta btn-ghost"
                style={{ opacity: 0 }}
                aria-label="GitHub profile"
              >
                <GithubIcon size={16} />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/vinesh-shanmugam-109215363"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-cta btn-ghost"
                style={{ opacity: 0 }}
                aria-label="LinkedIn profile"
              >
                <LinkedinIcon size={16} />
                LinkedIn
              </a>
              <a
                href="mailto:shanmugamvinesh75@gmail.com"
                className="hero-cta btn-ghost"
                style={{ opacity: 0 }}
                aria-label="Send direct email"
              >
                <Mail size={16} />
                Contact
              </a>
            </div>
          </div>

          {/* Right — Cinematic Integrated Portrait with BorderBeam */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
            <CinematicHeroPortrait parallax={parallaxPos} reduced={reduced} />
          </div>
        </div>

        {/* 5. Marquee Continuous Technology Stream */}
        <div className="mt-14 pt-6 border-t border-border-subtle/40">
          <Marquee pauseOnHover repeat={4} className="py-2">
            {techBadges.map((badge) => (
              <div
                key={badge}
                className="px-3.5 py-1.5 rounded-xl bg-[#0C0C0C]/80 border border-border-subtle text-xs font-mono text-text-secondary flex items-center gap-2 backdrop-blur-md hover:border-primary/50 hover:text-primary transition-all duration-300"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                {badge}
              </div>
            ))}
          </Marquee>
        </div>
      </div>

      {/* Cinematic "SCROLL TO EXPLORE" Indicator */}
      <div className="mt-2 flex flex-col items-center gap-2 z-10 pb-4">
        <button
          onClick={handleScroll}
          className="text-text-muted hover:text-primary transition-colors flex flex-col items-center gap-2 group"
          aria-label="Scroll down to explore about section"
        >
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase group-hover:text-primary transition-colors font-semibold">
            SCROLL TO EXPLORE
          </span>
          <div className="w-[1.5px] h-8 bg-gradient-to-b from-primary via-primary/50 to-transparent relative overflow-hidden">
            <div className="w-full h-1/2 bg-white animate-pulse" />
          </div>
          <ChevronDown size={14} className="text-primary animate-bounce -mt-1" />
        </button>
      </div>

      {/* Resume Modal */}
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </section>
  );
}

/* ─── Cinematic Integrated Portrait ─────────────────────────────────────────────── */
function CinematicHeroPortrait({
  parallax,
  reduced,
}: {
  parallax: { x: number; y: number; rotateX: number; rotateY: number };
  reduced: boolean;
}) {
  return (
    <motion.div
      initial={reduced ? {} : { opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.15 }}
      className="hero-portrait-wrap relative w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[420px] group perspective-1000"
      aria-label="Cinematic Portrait of Vinesh Shanmugam"
      style={{
        transform: reduced
          ? 'none'
          : `translate3d(${parallax.x * 1.5}px, ${parallax.y * 1.5}px, 0) rotateX(${parallax.rotateX}deg) rotateY(${parallax.rotateY}deg)`,
      }}
    >
      {/* 1. Multi-layered cyan & violet glow behind portrait */}
      <div
        className="absolute -inset-6 rounded-full opacity-50 blur-3xl pointer-events-none group-hover:opacity-75 transition-opacity duration-700"
        style={{
          background: 'radial-gradient(circle, rgba(0,212,255,0.3) 0%, rgba(124,58,237,0.25) 50%, transparent 80%)',
        }}
        aria-hidden="true"
      />

      {/* 2. Sleek integrated portrait container with BorderBeam */}
      <div className="relative rounded-3xl overflow-hidden border border-primary/40 bg-bg-secondary/90 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-all duration-500 group-hover:border-primary/70 group-hover:shadow-[0_0_40px_rgba(0,212,255,0.25)]">
        <BorderBeam size={220} duration={10} colorFrom="#00D4FF" colorTo="#7C3AED" />

        {/* Futuristic HUD Corner Crosshairs */}
        <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-primary z-30 pointer-events-none opacity-80" />
        <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-primary z-30 pointer-events-none opacity-80" />
        <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-primary z-30 pointer-events-none opacity-80" />
        <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-primary z-30 pointer-events-none opacity-80" />

        {/* Top Floating Status Overlay (Name Only) */}
        <div className="absolute top-4 left-4 z-30 pointer-events-none">
          <div className="px-3 py-1 rounded-md bg-bg-primary/90 backdrop-blur-md border border-border-subtle flex items-center gap-2 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
            <span className="font-mono text-[10px] font-bold text-text-bright tracking-wider uppercase">
              VINESH SHANMUGAM
            </span>
          </div>
        </div>

        {/* Portrait Image (1:1 aspect ratio matching the circular neon artwork) */}
        <div className="relative aspect-square w-full overflow-hidden bg-[#050505] flex items-center justify-center">
          <img
            src={vineshPortrait}
            alt="Vinesh Shanmugam"
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            loading="eager"
          />

          {/* Cinematic Volumetric Blue Rim Gradient & Vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at 50% 50%, transparent 75%, rgba(5,10,15,0.4) 100%)',
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
