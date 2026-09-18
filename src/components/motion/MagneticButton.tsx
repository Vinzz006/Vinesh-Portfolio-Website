import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface MagneticButtonProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

export default function MagneticButton({
  children,
  strength = 0.3,
  className = '',
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !ref.current) return;
    const element = ref.current;

    const xTo = gsap.quickTo(element, 'x', { duration: 0.35, ease: 'power3.out' });
    const yTo = gsap.quickTo(element, 'y', { duration: 0.35, ease: 'power3.out' });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      // Clamp displacement to maximum 12px for subtle Apple-grade magnetic feeling
      const maxOffset = 12;
      const rawX = (e.clientX - centerX) * strength;
      const rawY = (e.clientY - centerY) * strength;
      const distanceX = Math.max(-maxOffset, Math.min(maxOffset, rawX));
      const distanceY = Math.max(-maxOffset, Math.min(maxOffset, rawY));

      xTo(distanceX);
      yTo(distanceY);
    };

    const handleMouseLeave = () => {
      gsap.to(element, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength, reduced]);

  return (
    <div ref={ref} className={`inline-block ${className}`}>
      {children}
    </div>
  );
}
