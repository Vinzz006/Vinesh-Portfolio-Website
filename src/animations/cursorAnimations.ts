// Cinematic Cursor Math & Pointer Physics

export interface CursorState {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  hoverType: 'default' | 'button' | 'card' | 'link';
  active: boolean;
}

export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia('(pointer: coarse)').matches
  );
}

export function initCursorListeners(
  onUpdate: (x: number, y: number, hoverType: CursorState['hoverType']) => void
) {
  if (isTouchDevice()) return () => {};

  let hoverType: CursorState['hoverType'] = 'default';

  const handleMouseMove = (e: MouseEvent) => {
    // Determine hover target type
    const target = e.target as HTMLElement | null;
    if (target) {
      const interactiveBtn = target.closest('button, a, .btn-primary, .btn-ghost, .btn-outline');
      const card = target.closest('.project-card, .glass-card-hover, .pipeline-node');
      
      if (interactiveBtn) {
        hoverType = 'button';
      } else if (card) {
        hoverType = 'card';
      } else if (target.closest('a, [role="button"]')) {
        hoverType = 'link';
      } else {
        hoverType = 'default';
      }
    } else {
      hoverType = 'default';
    }

    onUpdate(e.clientX, e.clientY, hoverType);
  };

  window.addEventListener('mousemove', handleMouseMove, { passive: true });

  return () => {
    window.removeEventListener('mousemove', handleMouseMove);
  };
}
