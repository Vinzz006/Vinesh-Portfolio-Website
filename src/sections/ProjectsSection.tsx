import { useEffect, useState } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { GithubIcon } from '../components/Icons';
import { motion, AnimatePresence } from 'framer-motion';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { animateProjectCards } from '../animations/anime-utils';
import { useReducedMotion } from '../hooks/useReducedMotion';
import ProjectCard from '../components/ProjectCard';
import SectionLightSweep from '../components/SectionLightSweep';
import { projects } from '../data/projects';
import type { Project } from '../data/projects';

import { Layers, LayoutGrid } from 'lucide-react';

export default function ProjectsSection() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.05 });
  const reduced = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [layoutMode, setLayoutMode] = useState<'stack' | 'grid'>('stack');

  const filterTabs = ['All', 'Featured', 'Embedded AI', 'Healthcare', 'IoT', 'Hardware / Embedded'];

  const displayed = projects.filter((proj) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Featured') return proj.featured;
    if (activeFilter === 'Embedded AI') {
      return (
        proj.category.toLowerCase().includes('ai') ||
        proj.category.toLowerCase().includes('tinyml') ||
        proj.technologies.some((t) => ['TinyML', 'TensorFlow', 'Scikit-learn', 'PyTorch', 'OpenCV', 'YOLO'].includes(t))
      );
    }
    if (activeFilter === 'Healthcare') {
      return (
        proj.category.toLowerCase().includes('health') ||
        proj.category.toLowerCase().includes('bio') ||
        proj.title.toLowerCase().includes('pancrea') ||
        proj.title.toLowerCase().includes('eeg') ||
        proj.title.toLowerCase().includes('fall')
      );
    }
    if (activeFilter === 'IoT') {
      return (
        proj.category.toLowerCase().includes('iot') ||
        proj.technologies.some((t) => ['ESP32', 'MQTT', 'Firebase', 'I2C', 'Sensors'].includes(t))
      );
    }
    if (activeFilter === 'Hardware / Embedded') {
      return (
        proj.category.toLowerCase().includes('embedded') ||
        proj.category.toLowerCase().includes('signal') ||
        proj.technologies.some((t) => ['ESP32', 'CAN Bus', 'FreeRTOS', 'DSP', 'I2C', 'SPI', 'ADC'].includes(t))
      );
    }
    return true;
  });

  useEffect(() => {
    if (isVisible) {
      animateProjectCards('#projects-grid', reduced);
    }
  }, [isVisible, reduced, activeFilter, layoutMode]);

  return (
    <section
      id="projects"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 relative bg-[#050505]"
      aria-labelledby="projects-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <SectionLightSweep actLabel="ACT 03" actTitle="SYSTEMS ARCHIVE" isVisible={isVisible} />
      </div>

      <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <div>
            <span className="section-label">PROJECTS ARCHIVE</span>
            <h2 id="projects-heading" className="text-4xl sm:text-5xl font-black text-text-bright mt-2 tracking-tight">
              Engineering{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-400 to-secondary">
                Systems
              </span>
            </h2>
            <p className="section-subtitle mt-3 max-w-xl">
              End-to-end systems built across sensors, firmware, machine learning and full-stack web applications.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Stacking / Grid View Switcher */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#0C0C0C] border border-border-subtle">
              <button
                onClick={() => setLayoutMode('stack')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono text-xs transition-all ${
                  layoutMode === 'stack'
                    ? 'bg-primary/20 text-primary border border-primary/40 shadow-[0_0_12px_rgba(0,212,255,0.2)]'
                    : 'text-text-muted hover:text-text-secondary'
                }`}
                aria-label="Sticky stacked cards view"
              >
                <Layers size={13} />
                STACKED
              </button>
              <button
                onClick={() => setLayoutMode('grid')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono text-xs transition-all ${
                  layoutMode === 'grid'
                    ? 'bg-primary/20 text-primary border border-primary/40 shadow-[0_0_12px_rgba(0,212,255,0.2)]'
                    : 'text-text-muted hover:text-text-secondary'
                }`}
                aria-label="Grid view"
              >
                <LayoutGrid size={13} />
                GRID
              </button>
            </div>

            <div className="flex items-center gap-2 bg-[#0C0C0C] p-2.5 rounded-xl border border-border-subtle">
              <span className="font-mono text-xs text-text-muted">{projects.length} PROJECTS</span>
              <div className="w-px h-4 bg-border-subtle" />
              <span className="font-mono text-xs text-accent-green font-semibold">
                {projects.filter((p) => p.status === 'Active' || p.status === 'In Progress').length} ACTIVE NODES
              </span>
            </div>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-10" role="tablist" aria-label="Project filter">
          {filterTabs.map((tab) => {
            const isSelected = activeFilter === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                role="tab"
                aria-selected={isSelected}
                className={`px-3.5 py-1.5 rounded-lg font-mono text-xs transition-all duration-200 border ${
                  isSelected
                    ? 'border-primary bg-primary/15 text-primary font-bold shadow-glow-sm scale-[1.02]'
                    : 'border-border-subtle text-text-muted hover:text-text-secondary hover:border-border-DEFAULT hover:bg-[#0C0C0C]'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Projects Display: Sticky Stack vs Grid */}
        {layoutMode === 'stack' ? (
          <div className="relative pb-16 space-y-8" role="list">
            {displayed.map((project, i) => (
              <div
                key={project.id}
                className="sticky transition-all duration-300"
                style={{
                  top: `calc(96px + ${Math.min(i, 6) * 12}px)`,
                  zIndex: i + 1,
                }}
              >
                <ProjectCard
                  project={project}
                  index={i}
                  onViewDetails={setSelectedProject}
                />
              </div>
            ))}
          </div>
        ) : (
          <div
            id="projects-grid"
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            role="list"
          >
            {displayed.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
                onViewDetails={setSelectedProject}
              />
            ))}
          </div>
        )}

        {/* No results fallback */}
        {displayed.length === 0 && (
          <div className="text-center py-16">
            <p className="font-mono text-sm text-text-muted">No projects found in this category.</p>
            <button
              onClick={() => setActiveFilter('All')}
              className="btn-ghost mt-4 text-xs"
            >
              Reset Filter
            </button>
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

/* ─── Project Detail Modal ─────────────────────────────────────────────────── */
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ type: 'spring', duration: 0.4 }}
        className="glass-card w-full max-w-2xl max-h-[85vh] overflow-y-auto no-scrollbar p-8 border-primary/30 shadow-[0_0_50px_rgba(0,212,255,0.15)]"
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <span className="font-mono text-[10px] tracking-widest text-primary font-semibold uppercase">{project.category}</span>
            <h2 id="modal-title" className="text-2xl font-bold text-text-bright mt-1">{project.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg border border-border-subtle text-text-muted hover:text-text-primary hover:border-border-DEFAULT transition-colors"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        <p className="text-text-secondary leading-relaxed mb-6">{project.longDescription}</p>

        <div className="mb-6 p-4 rounded-xl bg-bg-primary/90 border border-border-subtle">
          <p className="font-mono text-xs text-primary uppercase tracking-widest mb-3 font-semibold">System Architecture Flow</p>
          <div className="flex flex-wrap items-center gap-2">
            {project.architecture.map((step, i) => (
              <span key={step} className="flex items-center gap-2">
                <span className="font-mono text-xs px-2.5 py-1 rounded bg-bg-secondary border border-border-subtle text-text-bright font-medium">
                  {step}
                </span>
                {i < project.architecture.length - 1 && (
                  <ArrowRight size={12} className="text-primary" />
                )}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <p className="font-mono text-xs text-text-muted uppercase tracking-widest mb-3">Technologies</p>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span key={tech} className="tech-badge">{tech}</span>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border-subtle">
          {project.githubUrl ? (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm flex items-center gap-2 shadow-glow-sm">
              <GithubIcon size={16} />
              View on GitHub
            </a>
          ) : (
            <span className="btn-ghost text-sm opacity-50 cursor-not-allowed">GitHub — Coming Soon</span>
          )}
          <button
            onClick={() => {
              onClose();
              const el = document.getElementById('lab');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-outline text-sm flex items-center gap-2 ml-auto"
          >
            Inspect in Engineering Lab
            <ArrowRight size={14} />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
