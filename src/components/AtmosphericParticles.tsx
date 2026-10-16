import { useEffect, useRef } from 'react';
import { ParticleEngine } from '../animations/particleSystem';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function AtmosphericParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!canvasRef.current || reduced) return;

    const engine = new ParticleEngine(canvasRef.current, reduced);
    engine.start();

    return () => {
      engine.destroy();
    };
  }, [reduced]);

  if (reduced) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1] w-full h-full opacity-70"
      aria-hidden="true"
    />
  );
}
