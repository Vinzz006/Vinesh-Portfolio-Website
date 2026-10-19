import { useState, useEffect, useRef, ReactNode } from 'react';

interface LazySectionProps {
  children: ReactNode;
  fallback?: ReactNode;
  rootMargin?: string;
  minHeight?: string;
  mobileMinHeight?: string;
  sectionId?: string;
}

export default function LazySection({
  children,
  fallback,
  rootMargin = '400px 0px',
  minHeight = '600px',
  mobileMinHeight,
  sectionId,
}: LazySectionProps) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const effectiveMinHeight = (isMobile && mobileMinHeight) ? mobileMinHeight : minHeight;

  const [shouldRender, setShouldRender] = useState(() => {
    if (typeof window === 'undefined') return true;
    // Render immediately if IntersectionObserver is unsupported or visitor is a web crawler bot
    if (!('IntersectionObserver' in window)) return true;
    if (
      typeof navigator !== 'undefined' &&
      /bot|googlebot|bingbot|crawler|spider|robot|crawling/i.test(navigator.userAgent)
    ) {
      return true;
    }
    // Render immediately if URL hash targets this section
    if (sectionId && window.location.hash === `#${sectionId}`) {
      return true;
    }
    return false;
  });

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shouldRender) return;

    // Listen for hashchange events in URL
    const handleHashChange = () => {
      if (sectionId && window.location.hash === `#${sectionId}`) {
        setShouldRender(true);
      }
    };

    // Listen for immediate section load events dispatched by nav links or CTAs
    const handleLoadSection = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail === sectionId || customEvent.detail === 'all') {
        setShouldRender(true);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('load-lazy-section', handleLoadSection);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldRender(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('load-lazy-section', handleLoadSection);
      observer.disconnect();
    };
  }, [shouldRender, sectionId, rootMargin]);

  return (
    <div
      ref={containerRef}
      id={shouldRender ? undefined : sectionId}
      style={{
        minHeight: effectiveMinHeight,
        scrollMarginTop: '48px',
      }}
    >
      {shouldRender ? children : fallback || null}
    </div>
  );
}
