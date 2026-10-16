import { useParams, Link } from 'react-router-dom';
import { projects, Project } from '../data/projects';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import NotFoundPage from './NotFoundPage';

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  const projectIndex = projects.findIndex((p) => p.slug === slug);
  const project: Project | undefined = projects[projectIndex];

  useDocumentMeta({
    title: project ? project.title : 'Project Not Found',
    description: project ? project.description : undefined,
  });

  if (!project) {
    return <NotFoundPage />;
  }

  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  const isHealthcare =
    project.category.toLowerCase().includes('healthcare') ||
    project.title.toLowerCase().includes('pancrea') ||
    project.title.toLowerCase().includes('medical');

  const hasLinks = Boolean(project.githubUrl || project.liveUrl || project.demoVideoUrl);

  return (
    <article className="max-w-[720px] mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-12">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="text-sm">
        <Link
          to="/projects"
          className="text-accent hover:underline underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm inline-flex items-center gap-1.5"
        >
          <span aria-hidden="true">←</span> Back to Projects
        </Link>
      </nav>

      {/* Header */}
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-surface text-text-muted border border-border">
            {project.status}
          </span>
          <span className="text-xs text-text-muted font-medium">
            {project.category}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-text">
          {project.title}
        </h1>

        <p className="text-lg text-text-muted leading-relaxed">
          {project.description}
        </p>

        {/* Healthcare Honesty Disclaimer */}
        {isHealthcare && (
          <div
            role="note"
            className="p-4 rounded-md border border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 text-amber-900 dark:text-amber-200 text-sm leading-relaxed"
          >
            <strong>Research Prototype Notice:</strong> This project is an experimental engineering prototype developed for research and educational purposes. It is not a medically validated device or diagnostic instrument.
          </div>
        )}
      </header>

      {/* Overview & What I Built */}
      {project.longDescription && (
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-text">What I built</h2>
          <p className="text-base text-text leading-relaxed">
            {project.longDescription}
          </p>
        </section>
      )}

      {/* Tech Stack */}
      {project.technologies && project.technologies.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-text">Tech stack</h2>
          <ul className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <li
                key={tech}
                className="text-xs px-2.5 py-1 rounded bg-surface text-text border border-border font-mono"
              >
                {tech}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Architecture (Numbered list & Details) */}
      {project.architecture && project.architecture.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-text">Architecture</h2>
          
          {/* Simple textual flow */}
          <div className="p-4 rounded-md bg-surface border border-border font-mono text-xs text-text overflow-x-auto">
            {project.architecture.join('  →  ')}
          </div>

          {/* Detailed step breakdown if available */}
          {project.architectureDetails && project.architectureDetails.length > 0 && (
            <ol className="space-y-3 pt-2">
              {project.architectureDetails.map((node, index) => (
                <li
                  key={node.name}
                  className="p-4 rounded-md border border-border bg-white dark:bg-[#0B0F14] text-sm space-y-1"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-accent font-semibold">
                      {String(index + 1).padStart(2, '0')}.
                    </span>
                    <span className="font-semibold text-text">{node.name}</span>
                    <span className="text-xs text-text-muted font-mono">({node.tech})</span>
                  </div>
                  <p className="text-text-muted leading-relaxed pl-6">
                    {node.description}
                  </p>
                </li>
              ))}
            </ol>
          )}
        </section>
      )}

      {/* My Role (Only shown if data exists) */}
      {project.role && (
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-text">My role</h2>
          <p className="text-base text-text leading-relaxed">{project.role}</p>
        </section>
      )}

      {/* Results (Only shown if data exists) */}
      {project.results && project.results.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-text">Results</h2>
          <ul className="list-disc list-inside space-y-2 text-base text-text">
            {project.results.map((res, i) => (
              <li key={i}>{res}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Links */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-text">Links</h2>
        {hasLinks ? (
          <div className="flex flex-wrap gap-4 text-sm">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-accent hover:underline underline-offset-4"
              >
                GitHub Repository ↗
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-accent hover:underline underline-offset-4"
              >
                Live Project Demo ↗
              </a>
            )}
            {project.demoVideoUrl && (
              <a
                href={project.demoVideoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-accent hover:underline underline-offset-4"
              >
                Demo Video ↗
              </a>
            )}
          </div>
        ) : (
          <p className="text-sm text-text-muted">
            No public code or live deployment link published yet.
          </p>
        )}
      </section>

      {/* Previous / Next Project Navigation */}
      <footer className="pt-8 border-t border-border flex items-center justify-between gap-4 text-sm">
        {prevProject ? (
          <Link
            to={`/projects/${prevProject.slug}`}
            className="group flex flex-col items-start gap-1 text-text hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
          >
            <span className="text-xs text-text-muted">← Previous project</span>
            <span className="font-medium group-hover:underline">{prevProject.title}</span>
          </Link>
        ) : (
          <div />
        )}

        {nextProject && (
          <Link
            to={`/projects/${nextProject.slug}`}
            className="group flex flex-col items-end gap-1 text-text hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm text-right"
          >
            <span className="text-xs text-text-muted">Next project →</span>
            <span className="font-medium group-hover:underline">{nextProject.title}</span>
          </Link>
        )}
      </footer>
    </article>
  );
}
