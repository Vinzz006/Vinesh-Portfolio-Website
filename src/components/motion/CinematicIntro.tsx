import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export default function CinematicIntro({ onComplete }: { onComplete: () => void }) {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(() => {
    if (typeof window !== 'undefined') {
      const visited = sessionStorage.getItem('cinematic_intro_shown');
      return !visited;
    }
    return true;
  });

  useEffect(() => {
    if (reduced || !visible) {
      onComplete();
      return;
    }

    // Auto complete after 1.4s
    const timer = setTimeout(() => {
      sessionStorage.setItem('cinematic_intro_shown', 'true');
      setVisible(false);
      onComplete();
    }, 1400);

    return () => clearTimeout(timer);
  }, [reduced, visible, onComplete]);

  if (!visible || reduced) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="cinematic-intro"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-[100] bg-[#050A0F] flex flex-col justify-between p-8 font-mono pointer-events-none select-none"
      >
        {/* Top bar */}
        <div className="flex justify-between items-center text-xs text-text-muted">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            00:00:01
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-primary font-bold"
          >
            SYSTEM INITIALIZING
          </motion.span>
        </div>

        {/* Center title reveal */}
        <div className="flex flex-col items-center justify-center my-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(12px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-2"
          >
            <h1 className="text-4xl md:text-6xl font-black text-text-bright tracking-tight">
              VINESH SHANMUGAM
            </h1>
            <p className="text-xs md:text-sm text-primary tracking-[0.3em] uppercase">
              ECE × AI/ML × EMBEDDED SYSTEMS
            </p>
          </motion.div>
        </div>

        {/* Bottom bar progress */}
        <div className="flex justify-between items-center text-[10px] text-text-muted">
          <span>PORTFOLIO DIRECTORY v2026</span>
          <div className="w-32 h-[2px] bg-bg-secondary rounded-full overflow-hidden">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
              className="h-full bg-gradient-to-r from-primary to-secondary"
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
