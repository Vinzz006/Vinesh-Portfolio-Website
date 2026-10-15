import { useEffect, useState } from 'react';

export function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return prefersReduced;
}

export function useLowPower(): boolean {
  const reducedMotion = useReducedMotion();
  const [lowPower, setLowPower] = useState(() => {
    if (typeof window === 'undefined') return false;

    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const lowCores =
      typeof navigator !== 'undefined' &&
      typeof navigator.hardwareConcurrency === 'number' &&
      navigator.hardwareConcurrency <= 4;
    const lowMemory =
      typeof navigator !== 'undefined' &&
      'deviceMemory' in navigator &&
      typeof (navigator as unknown as { deviceMemory: number }).deviceMemory === 'number' &&
      (navigator as unknown as { deviceMemory: number }).deviceMemory <= 4;
    const saveData =
      typeof navigator !== 'undefined' &&
      'connection' in navigator &&
      (navigator as unknown as { connection?: { saveData?: boolean } }).connection?.saveData === true;

    return isTouch || lowCores || lowMemory || saveData;
  });

  useEffect(() => {
    if (reducedMotion) {
      setLowPower(true);
      return;
    }

    if (typeof window === 'undefined') return;

    const touchMq = window.matchMedia('(pointer: coarse)');
    const update = () => {
      const isTouch = touchMq.matches;
      const lowCores =
        typeof navigator !== 'undefined' &&
        typeof navigator.hardwareConcurrency === 'number' &&
        navigator.hardwareConcurrency <= 4;
      const lowMemory =
        typeof navigator !== 'undefined' &&
        'deviceMemory' in navigator &&
        typeof (navigator as unknown as { deviceMemory: number }).deviceMemory === 'number' &&
        (navigator as unknown as { deviceMemory: number }).deviceMemory <= 4;
      const saveData =
        typeof navigator !== 'undefined' &&
        'connection' in navigator &&
        (navigator as unknown as { connection?: { saveData?: boolean } }).connection?.saveData === true;

      setLowPower(reducedMotion || isTouch || lowCores || lowMemory || Boolean(saveData));
    };

    update();
    touchMq.addEventListener('change', update);
    return () => touchMq.removeEventListener('change', update);
  }, [reducedMotion]);

  return lowPower;
}
