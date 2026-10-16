// High-Performance Atmospheric Particle Canvas

export interface Particle {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  opacity: number;
  baseOpacity: number;
  color: string;
  pulseSpeed: number;
  pulsePhase: number;
}

export class ParticleEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private animFrameId: number | null = null;
  private width = 0;
  private height = 0;
  private mouseX = -1000;
  private mouseY = -1000;
  private isRunning = false;
  private isReducedMotion = false;

  private colors = ['rgba(0, 212, 255, ', 'rgba(124, 58, 237, ', 'rgba(16, 185, 129, '];

  constructor(canvas: HTMLCanvasElement, isReducedMotion = false) {
    this.canvas = canvas;
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Canvas 2D context not supported');
    this.ctx = context;
    this.isReducedMotion = isReducedMotion;

    this.resize();
    this.initParticles();
    this.bindEvents();
  }

  private resize = () => {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.ctx.scale(dpr, dpr);
  };

  private initParticles() {
    const count = this.isReducedMotion ? 0 : Math.min(Math.floor(this.width / 40), 35);
    this.particles = [];

    for (let i = 0; i < count; i++) {
      const baseOp = Math.random() * 0.4 + 0.15;
      const colorPrefix = this.colors[Math.floor(Math.random() * this.colors.length)];
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: Math.random() * 1.8 + 0.8,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.4 - 0.1, // slow float upwards
        opacity: baseOp,
        baseOpacity: baseOp,
        color: colorPrefix,
        pulseSpeed: Math.random() * 0.02 + 0.008,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }
  }

  private bindEvents() {
    window.addEventListener('resize', this.handleResize, { passive: true });
    window.addEventListener('mousemove', this.handleMouseMove, { passive: true });
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
  }

  private handleResize = () => {
    this.resize();
    this.initParticles();
  };

  private handleMouseMove = (e: MouseEvent) => {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
  };

  private handleVisibilityChange = () => {
    if (document.hidden) {
      this.stop();
    } else {
      this.start();
    }
  };

  public start() {
    if (this.isRunning || this.isReducedMotion) return;
    this.isRunning = true;
    this.loop();
  }

  public stop() {
    this.isRunning = false;
    if (this.animFrameId !== null) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
  }

  private loop = () => {
    if (!this.isRunning) return;
    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      p.pulsePhase += p.pulseSpeed;
      p.opacity = p.baseOpacity + Math.sin(p.pulsePhase) * 0.15;

      p.x += p.vx;
      p.y += p.vy;

      // Mouse influence
      const dx = this.mouseX - p.x;
      const dy = this.mouseY - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        const force = (120 - dist) / 120;
        p.x -= (dx / dist) * force * 0.6;
        p.y -= (dy / dist) * force * 0.6;
      }

      // Wrap edges
      if (p.y < -10) p.y = this.height + 10;
      if (p.x < -10) p.x = this.width + 10;
      if (p.x > this.width + 10) p.x = -10;

      // Render point with subtle radial glow
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `${p.color}${Math.max(0, p.opacity)})`;
      this.ctx.fill();

      // Occasional connection line between close particles
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const pdx = p.x - p2.x;
        const pdy = p.y - p2.y;
        const pdist = Math.sqrt(pdx * pdx + pdy * pdy);

        if (pdist < 80) {
          const alpha = (1 - pdist / 80) * 0.08;
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.strokeStyle = `rgba(0, 212, 255, ${alpha})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.stroke();
        }
      }
    }

    this.animFrameId = requestAnimationFrame(this.loop);
  };

  public destroy() {
    this.stop();
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
  }
}
