/**
 * Cross-browser idle task scheduler with Safari / iOS fallback.
 *
 * Safari and WebKit on iOS do not implement window.requestIdleCallback.
 * This helper uses requestIdleCallback when available (Chromium, Firefox)
 * and gracefully falls back to setTimeout with the requested timeout window.
 */

export type IdleHandle = number | ReturnType<typeof setTimeout>;

export function scheduleIdle(callback: () => void, timeoutMs: number = 200): IdleHandle {
  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    return (window as any).requestIdleCallback(callback, { timeout: timeoutMs });
  }
  return setTimeout(callback, timeoutMs);
}

export function cancelIdle(handle: IdleHandle): void {
  if (typeof window !== 'undefined' && 'cancelIdleCallback' in window && typeof handle === 'number') {
    (window as any).cancelIdleCallback(handle);
  } else {
    clearTimeout(handle as any);
  }
}
