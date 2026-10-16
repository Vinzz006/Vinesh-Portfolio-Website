import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { projects, Project } from '../data/projects';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

export default function ProjectsPage() {
  useDocumentMeta({
    title: 'Projects',
    description: 'Technical projects in Embedded AI, IoT, Edge ML, Computer Vision, and Full-Stack systems by Vinesh Shanmugam.',
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = Array.from(new Set(projects.map((p) => p.category)));
    return ['All', ...cats];
  }, []);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') return projects;
    return projects.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="max-w-[1000px] mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-8 sm:space-y-12">
      <div className="max-w-[720px] space-y-3">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-text">
          Projects
        </h1>
        <p className="text-base text-text-muted leading-relaxed">
          Applied engineering projects across embedded intelligence, sensor telemetry, edge machine learning, and full-stack software.
        </p>
      </div>

      {/* Filter chips (4+ categories exist) */}
      <div className="flex flex-wrap gap-2 pt-2" role="group" aria-label="Filter projects by category">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-150 min-h-[32px] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
              selectedCategory === cat
                ? 'bg-accent text-white font-semibold'
                : 'bg-surface text-text-muted hover:text-text border border-border'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 2-column Project Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project: Project) => (
          <article
            key={project.id}
            className="card p-6 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="tag-pill text-xs">
                  {project.status}
                </span>
                <span className="text-xs text-text-muted truncate">
                  {project.category}
                </span>
              </div>

              <h2 className="text-lg font-semibold text-text">
                <Link
                  to={`/projects/${project.slug}`}
                  className="hover:text-accent hover:underline underline-offset-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
                >
                  {project.title}
                </Link>
              </h2>

              <p className="text-sm text-text-muted leading-relaxed">
                {project.description}
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-border space-y-4">
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="tag-pill text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 text-xs pt-1">
                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-accent hover:underline"
                  >
                    Code
                  </a>
                ) : (
                  <span className="text-text-muted">No public code yet</span>
                )}

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-accent hover:underline"
                  >
                    Demo
                  </a>
                )}

                <Link
                  to={`/projects/${project.slug}`}
                  className="ml-auto font-medium text-text hover:text-accent hover:underline"
                >
                  View case study →
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
