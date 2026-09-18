import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ChevronDown, Sparkles } from 'lucide-react';
import Vinzz3DScene from '../three/Vinzz3DScene';
import vineshCinematic from '../../assets/vinesh_cinematic_intro.jpg';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface Cinematic3DIntroProps {
  onComplete: () => void;
}

export default function Cinematic3DIntro({ onComplete }: Cinematic3DIntroProps) {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isEntering, setIsEntering] = useState(false);
  const [visible, setVisible] = useState(() => {
    if (typeof window !== 'undefined') {
      const shown = sessionStorage.getItem('vinzz_cinematic_intro_v3');
      return !shown;
    }
    return true;
  });

  // Track cursor position for subtle 3D camera parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced) return;
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    setMousePos({ x, y });
  };

  useEffect(() => {
    if (reduced || !visible) {
      onComplete();
      return;
    }

    // GSAP Intro Reveal Sequence
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        titleRef.current,
        { opacity: 0, scale: 0.85, y: 30, filter: 'blur(10px)' },
        { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)', duration: 1.2, delay: 0.3 }
      )
        .fromTo(
          taglineRef.current,
          { opacity: 0, y: 15, letterSpacing: '0.1em' },
          { opacity: 1, y: 0, letterSpacing: '0.35em', duration: 0.8 },
          '-=0.4'
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.2'
        );
    }, containerRef);

    return () => ctx.revert();
  }, [reduced, visible, onComplete]);

  // Trigger Enter Portfolio sequence
  const handleEnter = () => {
    if (isEntering) return;
    setIsEntering(true);
    sessionStorage.setItem('vinzz_cinematic_intro_v3', 'true');

    // Camera Push Acceleration Transition
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        scale: 1.15,
        opacity: 0,
        filter: 'blur(12px)',
        duration: 0.9,
        ease: 'power4.inOut',
        onComplete: () => {
          setVisible(false);
          onComplete();
        },
      });
    } else {
      setVisible(false);
      onComplete();
    }
  };

  const handleSkip = () => {
    sessionStorage.setItem('vinzz_cinematic_intro_v3', 'true');
    setVisible(false);
    onComplete();
  };

  if (!visible || reduced) return null;

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[1000] overflow-hidden select-none bg-[#050A0F]"
      >
        {/* Ambient Studio Atmosphere Backdrop Blur */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-30">
          <img
            src={vineshCinematic}
            alt=""
            className="w-full h-full object-cover filter blur-[100px] scale-125 saturate-150"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050A0F] via-[#050A0F]/60 to-[#050A0F]/90" />
        </div>

        {/* 1. 3D WebGL Canvas Layer (Three.js & R3F with Cinematic Portrait Mesh) */}
        <Vinzz3DScene mouseX={mousePos.x} mouseY={mousePos.y} isEntering={isEntering} />

        {/* 2. Top Header Bar (Skip Intro & Status Badge) */}
        <div className="absolute top-6 left-6 right-6 z-20 flex items-center justify-between pointer-events-auto">
          <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-bg-secondary/70 border border-primary/30 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-accent-green shadow-[0_0_8px_#10B981] animate-pulse" />
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-primary font-bold">
              3D CINEMATIC MODE // 2026
            </span>
          </div>

          <button
            onClick={handleSkip}
            className="px-4 py-1.5 rounded-full bg-bg-secondary/70 border border-border-subtle hover:border-primary/50 text-text-muted hover:text-primary font-mono text-xs tracking-wider uppercase backdrop-blur-md transition-all duration-300 cursor-pointer"
          >
            SKIP INTRO ↗
          </button>
        </div>

        {/* 3. Center/Left 3D Typography Overlay ("VINZZ" + Tagline) */}
        <div className="absolute inset-0 z-10 flex flex-col justify-center max-w-7xl mx-auto px-6 lg:px-12 pointer-events-none">
          <div className="max-w-2xl">
            {/* Identity Badge */}
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
              <span className="font-mono text-xs tracking-[0.25em] text-primary font-semibold uppercase">
                VINESH SHANMUGAM // WORKSPACE
              </span>
            </div>

            {/* 3D Metallic VINZZ Title */}
            <div ref={titleRef} className="relative mb-4">
              <h1 className="text-7xl sm:text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-text-bright via-primary/90 to-text-bright tracking-tight leading-none drop-shadow-[0_15px_35px_rgba(0,212,255,0.3)]">
                VINZZ
              </h1>
              {/* Metallic 3D Bevel Highlight stroke */}
              <div className="absolute -inset-1 text-7xl sm:text-8xl md:text-9xl font-black text-primary/10 tracking-tight leading-none pointer-events-none -z-10 blur-sm">
                VINZZ
              </div>
            </div>

            {/* Pedestal Tagline Badge: SOFTWARE × AI × ECE */}
            <div ref={taglineRef} className="inline-block">
              <div className="px-5 py-2.5 rounded-xl bg-bg-secondary/80 border border-primary/40 backdrop-blur-xl shadow-[0_0_20px_rgba(0,212,255,0.15)] flex flex-col gap-1">
                <p className="font-mono text-xs sm:text-sm font-bold text-primary tracking-[0.35em] uppercase flex items-center gap-2">
                  <Sparkles size={14} className="text-primary animate-pulse" />
                  SOFTWARE × AI × ECE
                </p>
                <p className="font-mono text-[10px] text-text-muted tracking-wider">
                  EMBEDDED SYSTEMS · INTELLIGENT HARDWARE · FULL-STACK
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Bottom Left Cinematic CTA: ENTER PORTFOLIO */}
        <div
          ref={ctaRef}
          className="absolute bottom-10 left-6 sm:left-12 z-20 pointer-events-auto"
        >
          <button
            onClick={handleEnter}
            className="group flex flex-col items-start gap-2 bg-transparent text-left focus:outline-none cursor-pointer"
            aria-label="Enter portfolio experience"
          >
            <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.3em] uppercase text-text-bright group-hover:text-primary transition-colors flex items-center gap-2">
              ENTER PORTFOLIO
            </span>
            <div className="flex items-center gap-2">
              <div className="w-24 h-[2px] bg-primary/40 group-hover:w-32 group-hover:bg-primary transition-all duration-300" />
              <ChevronDown size={16} className="text-primary animate-bounce group-hover:translate-y-1 transition-transform" />
            </div>
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
