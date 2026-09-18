import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Layers, Orbit } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { animateSkills } from '../animations/anime-utils';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { skillCategories } from '../data/skills';
import SectionLightSweep from '../components/SectionLightSweep';
import Skills3DUniverse from '../components/3d/Skills3DUniverse';
import TiltCard from '../components/motion/TiltCard';

export default function SkillsSection() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });
  const reduced = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState(skillCategories[0].id);
  const [viewMode, setViewMode] = useState<'3d' | 'matrix'>('3d');

  useEffect(() => {
    if (isVisible) {
      animateSkills('#skills-grid', reduced);
    }
  }, [isVisible, activeCategory, reduced]);

  const current = skillCategories.find((c) => c.id === activeCategory) ?? skillCategories[0];

  return (
    <section
      id="skills"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 relative bg-[#050505]"
      aria-labelledby="skills-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <SectionLightSweep actLabel="ACT 05" actTitle="CONSTELLATION & STACK" isVisible={isVisible} />
      </div>

      <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <span className="section-label">SKILLS & ARCHITECTURE</span>
            <h2 id="skills-heading" className="text-4xl sm:text-5xl font-black text-text-bright mt-2 tracking-tight">
              Technology{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-400 to-secondary">
                Universe
              </span>
            </h2>
            <p className="section-subtitle mt-3">
              Full-stack tools, languages, firmware and frameworks I use to build production systems.
            </p>
          </div>

          {/* View Switcher: 3D Universe vs Matrix */}
          {!reduced && (
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#0C0C0C] border border-border-subtle self-start sm:self-auto">
              <button
                onClick={() => setViewMode('3d')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-mono text-xs transition-all ${
                  viewMode === '3d'
                    ? 'bg-primary/20 text-primary border border-primary/40 shadow-[0_0_12px_rgba(0,212,255,0.2)]'
                    : 'text-text-muted hover:text-text-secondary'
                }`}
              >
                <Orbit size={13} />
                3D UNIVERSE
              </button>
              <button
                onClick={() => setViewMode('matrix')}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-mono text-xs transition-all ${
                  viewMode === 'matrix'
                    ? 'bg-primary/20 text-primary border border-primary/40 shadow-[0_0_12px_rgba(0,212,255,0.2)]'
                    : 'text-text-muted hover:text-text-secondary'
                }`}
              >
                <Layers size={13} />
                MATRIX
              </button>
            </div>
          )}
        </div>

        {/* 3D Skill Universe Canvas (Shown in 3D mode) */}
        {!reduced && viewMode === '3d' && (
          <div className="mb-10">
            <Skills3DUniverse
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
            />
          </div>
        )}

        <div className="grid lg:grid-cols-[220px_1fr] gap-10">
          {/* Category tabs */}
          <nav aria-label="Skill categories">
            <ul className="flex flex-row lg:flex-col gap-2 overflow-x-auto no-scrollbar pb-2 lg:pb-0" role="tablist">
              {skillCategories.map((cat) => (
                <li key={cat.id} role="none">
                  <button
                    role="tab"
                    aria-selected={activeCategory === cat.id}
                    aria-controls={`skills-panel-${cat.id}`}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 border whitespace-nowrap lg:whitespace-normal ${
                      activeCategory === cat.id
                        ? 'border-opacity-50 text-white shadow-glow-sm'
                        : 'border-border-subtle text-text-muted hover:text-text-secondary hover:bg-bg-secondary'
                    }`}
                    style={
                      activeCategory === cat.id
                        ? {
                            borderColor: cat.accent + '60',
                            backgroundColor: cat.accent + '10',
                            color: cat.accent,
                          }
                        : {}
                    }
                  >
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: activeCategory === cat.id ? cat.accent : '#475569' }}
                      aria-hidden="true"
                    />
                    {cat.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Skills panel */}
          <div
            id={`skills-panel-${current.id}`}
            role="tabpanel"
            aria-label={`${current.label} skills`}
          >
            <div id="skills-grid">
              <div className="mb-4 flex items-center gap-3">
                <div
                  className="w-1 h-6 rounded-full"
                  style={{ backgroundColor: current.accent }}
                  aria-hidden="true"
                />
                <h3 className="font-semibold text-text-bright">{current.label}</h3>
                <span className="font-mono text-xs text-text-muted">{current.skills.length} technologies</span>
              </div>
              <motion.div
                key={current.id}
                initial={reduced ? {} : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="flex flex-wrap gap-3"
                role="list"
              >
                {current.skills.map((skill, i) => (
                  <motion.div
                    key={skill}
                    role="listitem"
                    initial={reduced ? {} : { opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                    className="skill-chip px-4 py-2 text-sm hover:border-primary/40 transition-all cursor-default shadow-sm"
                    style={{
                      borderColor: current.accent + '35',
                      color: current.accent + 'EE',
                      backgroundColor: current.accent + '0B',
                    }}
                  >
                    {skill}
                  </motion.div>
                ))}
              </motion.div>

              <p className="mt-6 font-mono text-[10px] text-text-muted">
                ─ Hands-on system engineering experience. No arbitrary percentages.
              </p>
            </div>

            {/* All categories overview */}
            <div className="mt-10 pt-8 border-t border-border-subtle">
              <p className="font-mono text-xs text-text-muted tracking-widest mb-4">COMPLETE TECHNOLOGY MATRIX</p>
              <div className="flex flex-wrap gap-2">
                {skillCategories.flatMap((cat) =>
                  cat.skills.map((skill) => (
                    <span
                      key={`${cat.id}-${skill}`}
                      className="font-mono text-[10px] px-2.5 py-1 rounded-lg border border-border-subtle text-text-muted hover:text-primary hover:border-primary/30 transition-all cursor-default bg-bg-secondary/60"
                    >
                      {skill}
                    </span>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
