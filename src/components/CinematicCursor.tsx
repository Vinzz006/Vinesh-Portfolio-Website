import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function CinematicCursor() {
  const reduced = useReducedMotion();
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);

  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true);
      return;
    }

    if (reduced || !cursorDotRef.current || !cursorRingRef.current) return;

    const dotXTo = gsap.quickTo(cursorDotRef.current, 'x', { duration: 0.1, ease: 'power3.out' });
    const dotYTo = gsap.quickTo(cursorDotRef.current, 'y', { duration: 0.1, ease: 'power3.out' });
    const ringXTo = gsap.quickTo(cursorRingRef.current, 'x', { duration: 0.35, ease: 'power3.out' });
    const ringYTo = gsap.quickTo(cursorRingRef.current, 'y', { duration: 0.35, ease: 'power3.out' });

    const handleMouseMove = (e: MouseEvent) => {
      dotXTo(e.clientX);
      dotYTo(e.clientY);
      ringXTo(e.clientX);
      ringYTo(e.clientY);

      // Check hovered element data-cursor or clickable attributes
      const target = e.target as HTMLElement | null;
      const cursorTarget = target?.closest('[data-cursor]') as HTMLElement | null;
      const interactiveTarget = target?.closest('button, a, [role="button"], [role="tab"]') as HTMLElement | null;

      if (cursorTarget) {
        const text = cursorTarget.getAttribute('data-cursor') || '';
        setCursorText(text);
        setIsHovered(true);
      } else if (interactiveTarget) {
        setCursorText('');
        setIsHovered(true);
      } else {
        setCursorText('');
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [reduced]);

  if (isTouch || reduced) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none">
      {/* Central Sharp Dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full bg-primary -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_#00D4FF]"
      />

      {/* Ring with context badge text */}
      <div
        ref={cursorRingRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-300 ease-out flex items-center justify-center font-mono text-[9px] font-bold uppercase tracking-wider backdrop-blur-xs ${
          isHovered
            ? 'w-16 h-16 border-primary bg-primary/15 text-primary shadow-[0_0_25px_rgba(0,212,255,0.3)] scale-110'
            : 'w-9 h-9 border-primary/40 bg-transparent text-transparent'
        }`}
      >
        {cursorText}
      </div>
    </div>
  );
}
