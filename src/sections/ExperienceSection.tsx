import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Code2, FlaskConical } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { animateSectionEntrance } from '../animations/anime-utils';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { timelineItems } from '../data/experience';
import type { TimelineItem } from '../data/experience';
import SectionLightSweep from '../components/SectionLightSweep';

import TiltCard from '../components/motion/TiltCard';

const typeConfig: Record<TimelineItem['type'], { Icon: React.ComponentType<{size?: number; className?: string}>; color: string; label: string }> = {
  education: { Icon: GraduationCap, color: '#00D4FF', label: 'Education' },
  experience: { Icon: Briefcase, color: '#10B981', label: 'Experience' },
  project: { Icon: Code2, color: '#7C3AED', label: 'Project' },
  internship: { Icon: FlaskConical, color: '#F59E0B', label: 'Internship' },
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
      className="py-24 relative bg-[#050505]"
      aria-labelledby="experience-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <SectionLightSweep actLabel="ACT 06" actTitle="MILESTONES & TIMELINE" isVisible={isVisible} />
      </div>

      <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" aria-hidden="true" />

      <div
        id="experience-content"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{ opacity: 0 }}
      >
        {/* Header */}
        <div className="mb-12">
          <span className="section-label">EXPERIENCE & JOURNEY</span>
          <h2 id="experience-heading" className="text-4xl sm:text-5xl font-black text-text-bright mt-2 tracking-tight">
            Journey &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-400 to-secondary">
              Milestones
            </span>
          </h2>
          <p className="section-subtitle mt-3">
            Academic degree, telecom engineering internship and milestone development systems.
          </p>
        </div>

        <div className="max-w-3xl">
          <ol className="relative" aria-label="Experience timeline">
            {/* Vertical glowing circuit path line */}
            <div
              className="absolute left-5 top-0 bottom-0 w-0.5"
              style={{
                background: 'linear-gradient(to bottom, rgba(0,212,255,0.7), rgba(124,58,237,0.5), transparent)',
                boxShadow: '0 0 10px rgba(0, 212, 255, 0.3)',
              }}
              aria-hidden="true"
            />

            {timelineItems.map((item, i) => {
              const { Icon, color, label } = typeConfig[item.type];
              return (
                <motion.li
                  key={item.id}
                  initial={reduced ? {} : { opacity: 0, x: -20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative pl-14 pb-10 last:pb-0"
                >
                  {/* Icon dot */}
                  <div
                    className="absolute left-0 top-0 w-10 h-10 rounded-xl flex items-center justify-center border z-10 shadow-lg"
                    style={{
                      backgroundColor: color + '18',
                      borderColor: color + '50',
                      boxShadow: `0 0 15px ${color}30`,
                    }}
                    aria-hidden="true"
                  >
                    <span style={{ color, display: 'flex' }}>
                      <Icon size={16} />
                    </span>
                  </div>

                  <TiltCard maxTilt={2.5} className="rounded-2xl">
                    <div className="glass-card p-6 border-white/10 hover:border-primary/40 hover:shadow-[0_0_30px_rgba(0,212,255,0.12)] transition-all duration-300">
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className="font-mono text-[10px] px-2.5 py-0.5 rounded-md border font-bold"
                              style={{ borderColor: color + '40', color, backgroundColor: color + '12' }}
                            >
                              {label.toUpperCase()}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-text-bright leading-snug">
                            {item.title}
                          </h3>
                          <p className="text-text-secondary text-sm font-medium mt-0.5">{item.organization}</p>
                        </div>
                        <span className="font-mono text-xs text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/30 whitespace-nowrap font-bold">
                          {item.period}
                        </span>
                      </div>
                      <p className="text-text-secondary text-sm leading-relaxed mb-4">
                        {item.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {item.tags.map((tag) => (
                          <span key={tag} className="tech-badge text-[10px] px-2 py-0.5">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </TiltCard>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
