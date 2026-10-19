import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Code2, FlaskConical } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { animateSectionEntrance } from '../animations/anime-utils';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { timelineItems } from '../data/experience';
import type { TimelineItem } from '../data/experience';

const typeConfig: Record<TimelineItem['type'], { Icon: React.ComponentType<{ size?: number; className?: string }>; color: string; label: string }> = {
  education: { Icon: GraduationCap, color: '#39FF88', label: 'Education' },
  experience: { Icon: Briefcase, color: '#FFB000', label: 'Experience' },
  project: { Icon: Code2, color: '#CCDACC', label: 'Project' },
  internship: { Icon: FlaskConical, color: '#FFB000', label: 'Internship' },
};

export default function ExperienceSection() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });
  const reduced = useReducedMotion();

  useEffect(() => {
    if (isVisible) {
      animateSectionEntrance('#experience-content', reduced);
    }
  }, [isVisible, reduced]);

  return (
    <section
      id="experience"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-20 relative font-mono text-xs border-b border-console-border bg-[#060806]"
      aria-labelledby="experience-heading"
    >
      {/* Background Graticule */}
      <div className="absolute inset-0 graticule-grid opacity-20 pointer-events-none" aria-hidden="true" />

      <div
        id="experience-content"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        style={{ opacity: 0 }}
      >
        {/* Telemetry Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-console-border pb-3 mb-10">
          <div className="flex items-center gap-2">
            <span className="text-phosphor font-bold">[06]</span>
            <span className="text-term-dim">//</span>
            <span className="text-term-bright font-bold tracking-wider">CHRONOLOGICAL_LOG · EXPERIENCE &amp; EDUCATION</span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-term-muted">
            <span>MILESTONES: 4</span>
            <span className="text-term-dim">|</span>
            <span className="text-phosphor">VERIFIED</span>
          </div>
        </div>

        {/* Section Title */}
        <div className="max-w-3xl mb-12">
          <div className="text-[11px] text-phosphor tracking-widest uppercase mb-2">
            &gt; TIMELINE_RECORDS
          </div>
          <h2 id="experience-heading" className="text-2xl sm:text-3xl font-black text-term-bright font-mono tracking-tight">
            Academic Degree, Telecom Internship &amp; Milestone Systems
          </h2>
          <p className="text-xs text-term-muted mt-2 font-sans">
            Formal engineering study at Meenakshi Sundararajan Engineering College, enterprise telecommunications at BSNL, and specialized system milestones.
          </p>
        </div>

        <div className="max-w-3xl">
          <ol className="relative" aria-label="Experience timeline">
            {/* Vertical bus trace line */}
            <div
              className="absolute left-4 top-0 bottom-0 w-px bg-console-border"
              aria-hidden="true"
            />

            {timelineItems.map((item, i) => {
              const { Icon, color, label } = typeConfig[item.type];
              return (
                <motion.li
                  key={item.id}
                  initial={reduced ? {} : { opacity: 0, x: -10 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="relative pl-12 pb-10 last:pb-0"
                >
                  {/* Pin point node */}
                  <div
                    className="absolute left-2 top-1.5 w-4 h-4 border border-console-border bg-console-base flex items-center justify-center -translate-x-1/2"
                    aria-hidden="true"
                  >
                    <div
                      className="w-1.5 h-1.5"
                      style={{ backgroundColor: color }}
                    />
                  </div>

                  {/* Entry Card */}
                  <div className="border border-console-border bg-console-panel p-5">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3 border-b border-console-border pb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <span
                            className="font-mono text-[10px] px-2 py-0.5 border font-bold"
                            style={{ borderColor: color + '40', color, backgroundColor: color + '10' }}
                          >
                            {label.toUpperCase()}
                          </span>
                          <span className="text-[10px] text-term-muted flex items-center gap-1">
                            <Icon size={12} />
                            {item.organization}
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-term-bright font-mono leading-snug">
                          {item.title}
                        </h3>
                      </div>
                      <span className="font-mono text-[11px] text-phosphor border border-phosphor/30 bg-phosphor/5 px-2.5 py-0.5 whitespace-nowrap font-bold">
                        {item.id === 'bsnl' ? (/\d{4}/.test(item.period) ? item.period : 'Internship') : item.period}
                      </span>
                    </div>

                    <p className="text-term-text text-xs leading-relaxed font-sans mb-4">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-console-border">
                      {item.tags.map((tag) => (
                        <span key={tag} className="font-mono text-[10px] px-2 py-0.5 border border-console-border bg-console-well text-term-muted">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
