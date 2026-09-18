import { useEffect, useRef, useState } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

interface NumberTickerProps {
  value: number;
  direction?: 'up' | 'down';
  delay?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
}

export function NumberTicker({
  value,
  direction = 'up',
  delay = 0,
  className = '',
  suffix = '',
  prefix = '',
}: NumberTickerProps) {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });
  const [displayValue, setDisplayValue] = useState(direction === 'up' ? 0 : value);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    const duration = 2000; // 2 seconds easeOutExpo animation

    const startVal = direction === 'up' ? 0 : value;
    const endVal = direction === 'up' ? value : 0;

    const timer = setTimeout(() => {
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        // easeOutExpo
        const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const current = Math.floor(startVal + (endVal - startVal) * ease);
        setDisplayValue(current);

        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };
      requestAnimationFrame(step);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [isVisible, value, direction, delay]);

  return (
    <span ref={ref as React.RefObject<HTMLSpanElement>} className={className}>
      {prefix}
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
}
