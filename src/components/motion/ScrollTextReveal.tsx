import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface ScrollTextRevealProps {
  text: string;
  className?: string;
  highlightWords?: string[];
}

function Word({
  word,
  range,
  progress,
  isHighlight,
}: {
  word: string;
  range: [number, number];
  progress: MotionValue<number>;
  isHighlight: boolean;
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <span className="relative inline-block mr-[0.28em] my-[0.05em]">
      <span className="absolute opacity-15 select-none">{word}</span>
      <motion.span
        style={{ opacity }}
        className={isHighlight ? 'text-gradient-primary font-semibold' : 'text-text-primary'}
      >
        {word}
      </motion.span>
    </span>
  );
}

export default function ScrollTextReveal({
  text,
  className = '',
  highlightWords = [],
}: ScrollTextRevealProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 85%', 'end 45%'],
  });

  const words = text.split(' ');

  if (reduced) {
    return (
      <p className={className}>
        {words.map((w, i) => {
          const clean = w.replace(/[^\w]/g, '');
          const isHighlight = highlightWords.includes(clean);
          return (
            <span
              key={i}
              className={`mr-[0.28em] ${isHighlight ? 'text-gradient-primary font-semibold' : 'text-text-primary'}`}
            >
              {w}
            </span>
          );
        })}
      </p>
    );
  }

  return (
    <p ref={containerRef} className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = Math.min(1, start + 1.2 / words.length);
        const clean = word.replace(/[^\w]/g, '');
        const isHighlight = highlightWords.includes(clean);
        return (
          <Word
            key={i}
            word={word}
            range={[start, end]}
            progress={scrollYProgress}
            isHighlight={isHighlight}
          />
        );
      })}
    </p>
  );
}
