import { ExternalLink, ArrowRight, Cpu, Activity, CheckCircle2, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';
import { GithubIcon } from './Icons';
import type { Project } from '../data/projects';
import { BorderBeam } from './ui/BorderBeam';
import TiltCard from './motion/TiltCard';

interface ProjectCardProps {
  project: Project;
  index: number;
  onViewDetails: (project: Project) => void;
}

const statusConfig = {
  'Active': { color: 'text-accent-green border-accent-green/30 bg-accent-green/10', dot: 'status-online' },
  'In Progress': { color: 'text-accent-amber border-accent-amber/30 bg-accent-amber/10', dot: 'status-processing' },
  'Research': { color: 'text-secondary border-secondary/30 bg-secondary/10', dot: 'status-ready' },
  'Complete': { color: 'text-primary border-primary/30 bg-primary/10', dot: 'status-ready' },
};

// Distinctive accent colors per category
const categoryColors: Record<string, string> = {
  'Embedded AI / TinyML': '#00D4FF',
  'Healthcare AI + IoT': '#10B981',
  'Smart City IoT + V2X': '#F59E0B',
  'Industrial IoT & Edge AI': '#7C3AED',
  'Neurotech & Signal Processing': '#EC4899',
  'Robotics & Autonomous Systems': '#3B82F6',
  'CleanTech IoT & Energy AI': '#10B981',
  'Wearable HealthTech & Edge ML': '#06B6D4',
  'Environmental IoT & TinyML': '#84CC16',
  'RF & Power Electronics': '#F97316',
};

export default function ProjectCard({ project, index, onViewDetails }: ProjectCardProps) {
  const status = statusConfig[project.status];
  const numberStr = String(index + 1).padStart(2, '0');
  const accentColor = categoryColors[project.category] || '#00D4FF';

  return (
    <TiltCard
      maxTilt={3.5}
      className="h-full rounded-3xl border border-white/10 bg-[#0C0C0C]/90 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:border-primary/40 hover:shadow-[0_10px_40px_rgba(0,212,255,0.12)]"
    >
      <article
        data-cursor="VIEW ↗"
        className="project-card group relative p-6 sm:p-8 flex flex-col justify-between h-full overflow-hidden"
        aria-label={project.title}
      >
        {index === 0 && (
          <BorderBeam size={220} duration={9} colorFrom="#00D4FF" colorTo="#7C3AED" />
        )}

        {/* Ambient Top Glow */}
        <div
          className="absolute -top-24 -right-24 w-60 h-60 rounded-full opacity-15 blur-3xl pointer-events-none group-hover:opacity-30 transition-opacity duration-500"
          style={{ backgroundColor: accentColor }}
        />

        {/* Top Meta Bar */}
        <div>
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="font-mono text-3xl sm:text-4xl font-black text-white/20 group-hover:text-primary transition-colors">
                {numberStr}
              </span>
              <div>
                <span
                  className="font-mono text-[10px] tracking-[0.2em] font-bold uppercase block"
                  style={{ color: accentColor }}
                >
                  {project.category}
                </span>
                <span className="font-mono text-[9px] text-text-muted">
                  SYSTEM NODE // ARCHIVE
                </span>
              </div>
            </div>

            <div className={cn('flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-mono font-semibold uppercase tracking-wider', status.color)}>
              <span className={status.dot} />
              {project.status}
            </div>
          </div>

          {/* Project Title */}
          <h3 className="text-xl sm:text-2xl font-black text-text-bright mb-3 group-hover:text-primary transition-colors duration-200 leading-tight">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-text-secondary text-sm leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Architecture Pipeline Preview */}
          <div className="mb-5 p-3 rounded-xl bg-[#050505]/80 border border-border-subtle">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[9px] text-text-muted uppercase tracking-widest flex items-center gap-1">
                <Cpu size={11} className="text-primary" />
                ARCHITECTURE DATAFLOW
              </span>
              <span className="font-mono text-[9px] text-accent-green font-semibold">
                {project.architecture.length} STAGES
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              {project.architecture.map((step, i) => (
                <span key={step} className="flex items-center gap-1.5">
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#111111] border border-white/5 text-text-primary font-medium">
                    {step}
                  </span>
                  {i < project.architecture.length - 1 && (
                    <ArrowRight size={10} className="text-primary/60 flex-shrink-0" />
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* Technology Badges */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="font-mono text-[10px] px-2.5 py-1 rounded-lg bg-[#141414] border border-white/10 text-text-secondary group-hover:border-primary/30 group-hover:text-text-bright transition-all"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 mt-auto">
          <div className="flex items-center gap-2">
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline text-xs py-1.5 flex items-center gap-1.5"
                aria-label={`GitHub repository for ${project.title}`}
              >
                <GithubIcon size={13} />
                GitHub
              </a>
            ) : (
              <span className="btn-outline text-xs py-1.5 opacity-40 cursor-not-allowed flex items-center gap-1.5">
                <GithubIcon size={13} />
                Repo Locked
              </span>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline text-xs py-1.5 flex items-center gap-1.5"
                aria-label={`Live demo for ${project.title}`}
              >
                <ExternalLink size={13} />
                Live Demo
              </a>
            )}
          </div>

          <button
            onClick={() => onViewDetails(project)}
            className="btn-ghost text-xs py-1.5 ml-auto text-primary hover:text-white flex items-center gap-1.5 font-mono font-semibold"
            aria-label={`Inspect ${project.title} details`}
          >
            INSPECT CASE STUDY
            <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </article>
    </TiltCard>
  );
}
