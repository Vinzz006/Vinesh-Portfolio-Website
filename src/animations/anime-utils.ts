import { animate, createTimeline, stagger } from 'animejs';

// ─── Hero Cinematic Opening Sequence ──────────────────────────────────────────

export function animateHeroOpening(containerSelector: string, reduced = false) {
  const el = (sel: string) => document.querySelectorAll(`${containerSelector} ${sel}`);

  if (reduced) {
    document
      .querySelectorAll(
        `${containerSelector} .hero-label, ${containerSelector} .hero-title, ${containerSelector} .hero-subtitle, ${containerSelector} .hero-statement, ${containerSelector} .hero-description, ${containerSelector} .hero-cta, ${containerSelector} .hero-portrait-wrap, ${containerSelector} .hero-hud-data`
      )
      .forEach((element) => {
        (element as HTMLElement).style.opacity = '1';
        (element as HTMLElement).style.transform = 'none';
      });
    return null;
  }

  const tl = createTimeline({ defaults: { ease: 'outExpo' } });

  // 1. Grid & System Status Online Badge
  tl.add(el('.hero-grid'), { opacity: [0, 0.3], duration: 400 })
    .add(el('.hero-label'), { opacity: [0, 1], y: [15, 0], duration: 450 }, '-=200')
    // 2. Portrait Reveal with soft depth zoom
    .add(el('.hero-portrait-wrap'), { opacity: [0, 1], scale: [0.94, 1], duration: 700, ease: 'outCubic' }, '-=300')
    // 3. Name Staggered Reveal
    .add(el('.hero-title'), { opacity: [0, 1], y: [30, 0], duration: 650 }, '-=500')
    // 4. Subtitle & Core Statement
    .add(el('.hero-subtitle'), { opacity: [0, 1], y: [15, 0], duration: 450 }, '-=400')
    .add(el('.hero-statement'), { opacity: [0, 1], y: [15, 0], duration: 500 }, '-=300')
    .add(el('.hero-description'), { opacity: [0, 1], y: [15, 0], duration: 450 }, '-=300')
    // 5. Data Flow Telemetry & Buttons
    .add(el('.hero-hud-data'), { opacity: [0, 1], y: [10, 0], duration: 400 }, '-=200')
    .add(el('.hero-cta'), { opacity: [0, 1], y: [15, 0], duration: 450, delay: stagger(80) }, '-=300');

  return tl;
}

// ─── Data Flow & Telemetry Pipeline Animation ────────────────────────────────

export function animateDataFlowPulse(nodeElements: NodeListOf<Element> | Element[], reduced = false) {
  if (reduced || !nodeElements.length) return;

  animate(nodeElements, {
    boxShadow: [
      '0 0 0px rgba(0, 212, 255, 0)',
      '0 0 20px rgba(0, 212, 255, 0.4), inset 0 0 10px rgba(0, 212, 255, 0.2)',
      '0 0 0px rgba(0, 212, 255, 0)',
    ],
    duration: 1200,
    delay: stagger(300),
    loop: true,
    ease: 'easeInOutQuad',
  });
}

// ─── Pipeline Entrance ───────────────────────────────────────────────────────

export function animatePipeline(containerSelector: string, reduced = false) {
  if (reduced) return;

  const nodes = document.querySelectorAll(`${containerSelector} .pipeline-node`);
  if (!nodes.length) return;

  animate(nodes, {
    opacity: [0, 1],
    y: [25, 0],
    scale: [0.95, 1],
    duration: 500,
    delay: stagger(100),
    ease: 'outBack',
  });

  const connectors = document.querySelectorAll(`${containerSelector} .pipeline-connector`);
  if (connectors.length) {
    animate(connectors, {
      scaleY: [0, 1],
      opacity: [0, 1],
      duration: 400,
      delay: stagger(100, { start: 150 }),
      ease: 'outExpo',
    });
  }
}

// ─── Project Cards Entrance & Hover ───────────────────────────────────────────

export function animateProjectCards(containerSelector: string, reduced = false) {
  if (reduced) {
    const cards = document.querySelectorAll(`${containerSelector} .project-card`);
    cards.forEach((c) => ((c as HTMLElement).style.opacity = '1'));
    return;
  }

  const cards = document.querySelectorAll(`${containerSelector} .project-card`);
  if (!cards.length) return;

  animate(cards, {
    opacity: [0, 1],
    y: [30, 0],
    scale: [0.97, 1],
    duration: 550,
    delay: stagger(70),
    ease: 'outExpo',
  });
}

export function animateCardHover(cardEl: HTMLElement, isEntering: boolean) {
  if (isEntering) {
    animate(cardEl, {
      y: -5,
      borderColor: 'rgba(0, 212, 255, 0.4)',
      boxShadow: '0 0 35px rgba(0, 212, 255, 0.12), 0 8px 30px rgba(0, 0, 0, 0.5)',
      duration: 300,
      ease: 'outQuad',
    });
  } else {
    animate(cardEl, {
      y: 0,
      borderColor: 'rgba(26, 40, 64, 0.8)',
      boxShadow: '0 4px 24px rgba(0, 0, 0, 0.4)',
      duration: 350,
      ease: 'outSine',
    });
  }
}

// ─── Skill Chips Animation ────────────────────────────────────────────────────

export function animateSkills(containerSelector: string, reduced = false) {
  if (reduced) {
    const chips = document.querySelectorAll(`${containerSelector} .skill-chip`);
    chips.forEach((c) => ((c as HTMLElement).style.opacity = '1'));
    return;
  }

  const chips = document.querySelectorAll(`${containerSelector} .skill-chip`);
  if (!chips.length) return;

  animate(chips, {
    opacity: [0, 1],
    scale: [0.88, 1],
    duration: 380,
    delay: stagger(25),
    ease: 'outBack',
  });
}

// ─── Counter Animation ────────────────────────────────────────────────────────

export function animateCounter(
  el: HTMLElement,
  from: number,
  to: number,
  duration = 1400
) {
  animate({ value: from }, {
    value: to,
    duration,
    ease: 'outExpo',
    onUpdate: (anim) => {
      el.textContent = Math.round((anim.targets[0] as { value: number }).value).toString();
    },
  });
}

// ─── Magnetic Button Effect ───────────────────────────────────────────────────

export function addMagneticEffect(el: HTMLElement, strength = 0.25) {
  const handleMove = (e: MouseEvent) => {
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * strength;
    const dy = (e.clientY - cy) * strength;
    animate(el, { x: dx, y: dy, duration: 250, ease: 'outSine' });
  };
  const handleLeave = () => {
    animate(el, { x: 0, y: 0, duration: 350, ease: 'outElastic(1, 0.6)' });
  };
  el.addEventListener('mousemove', handleMove);
  el.addEventListener('mouseleave', handleLeave);
  return () => {
    el.removeEventListener('mousemove', handleMove);
    el.removeEventListener('mouseleave', handleLeave);
  };
}

// ─── Node Pulse & Burst ───────────────────────────────────────────────────────

export function animateNodePulse(element: HTMLElement | null, color = '#00D4FF') {
  if (!element) return;
  animate(element, {
    scale: [1, 1.04, 1],
    boxShadow: [
      `0 0 0px ${color}00`,
      `0 0 25px ${color}80, 0 0 10px ${color}40`,
      `0 0 0px ${color}00`,
    ],
    duration: 550,
    ease: 'outBack',
  });
}

// ─── Section Entrance ─────────────────────────────────────────────────────────

export function animateSectionEntrance(selector: string, reduced = false) {
  const el = document.querySelector(selector);
  if (!el) return;
  if (reduced) {
    (el as HTMLElement).style.opacity = '1';
    (el as HTMLElement).style.transform = 'none';
    return;
  }
  animate(el, {
    opacity: [0, 1],
    y: [20, 0],
    duration: 650,
    ease: 'outExpo',
  });
}
