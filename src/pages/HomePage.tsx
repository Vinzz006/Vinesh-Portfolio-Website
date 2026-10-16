import { Link } from 'react-router-dom';
import portraitImg from '../assets/vinesh_portrait.webp';
import { OWNER_NAME, HERO_TITLE, HERO_SUBTITLE } from '../data/profile';
import { projects, Project } from '../data/projects';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

export default function HomePage() {
  useDocumentMeta({
    title: 'Home',
    description: `${OWNER_NAME} — ${HERO_TITLE}. ${HERO_SUBTITLE}.`,
  });

  // 3 selected projects: prefer projects with public code or demos, then featured flag
  const selectedProjects = [...projects]
    .sort((a, b) => {
      const aEvidence = a.githubUrl || a.liveUrl || a.demoVideoUrl ? 1 : 0;
      const bEvidence = b.githubUrl || b.liveUrl || b.demoVideoUrl ? 1 : 0;
      if (aEvidence !== bEvidence) return bEvidence - aEvidence;
      if (a.featured !== b.featured) return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      return a.id - b.id;
    })
    .slice(0, 3);

  // Derive "Currently" block from In Progress projects
  const inProgressProjects = projects.filter((p) => p.status === 'In Progress');

  return (
    <div className="max-w-[1000px] mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-16 sm:space-y-24">
      {/* Hero Section */}
      <section className="max-w-[720px] space-y-6">
        <div className="flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-text">
              {OWNER_NAME}
            </h1>
            <p className="text-lg text-text-muted leading-relaxed">
              {HERO_TITLE}. {HERO_SUBTITLE}.
            </p>
          </div>

          <img
            src={portraitImg}
            alt="Portrait of Vinesh Shanmugam"
            width={112}
            height={112}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border border-border bg-surface shrink-0"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Link
            to="/projects"
            className="btn-primary"
          >
            View projects
          </Link>
          <Link
            to="/contact"
            className="btn-secondary"
          >
            Contact
          </Link>
        </div>
      </section>

      {/* Currently Section */}
      <section className="max-w-[720px] p-5 rounded-lg border border-border bg-surface text-sm space-y-1">
        <h2 className="font-semibold text-text text-sm uppercase tracking-wider text-text-muted">
          Currently
        </h2>
        <p className="text-text leading-relaxed">
          Building and evaluating{' '}
          {inProgressProjects.map((p, idx) => (
            <span key={p.id}>
              <Link
                to={`/projects/${p.slug}`}
                className="font-medium text-text hover:text-accent hover:underline underline-offset-2"
              >
                {p.title}
              </Link>
              {idx < inProgressProjects.length - 1 ? ', ' : ''}
            </span>
          ))}
          .
        </p>
      </section>

      {/* Selected Projects */}
      <section className="space-y-6">
        <div className="flex items-baseline justify-between">
          <h2 className="text-2xl font-semibold tracking-tight text-text">
            Selected projects
          </h2>
          <Link
            to="/projects"
            className="text-sm font-medium text-accent hover:underline underline-offset-4"
          >
            All projects →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {selectedProjects.map((project: Project) => (
            <article
              key={project.id}
              className="card p-5 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="tag-pill text-xs">
                    {project.status}
                  </span>
                  {project.category && (
                    <span className="text-xs text-text-muted truncate">
                      {project.category}
                    </span>
                  )}
                </div>

                <h3 className="text-base font-semibold text-text">
                  <Link
                    to={`/projects/${project.slug}`}
                    className="hover:text-accent hover:underline underline-offset-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
                  >
                    {project.title}
                  </Link>
                </h3>

                <p className="text-sm text-text-muted leading-relaxed line-clamp-3">
                  {project.description}
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-border space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="tag-pill text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3 text-xs pt-1">
                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-accent hover:underline py-2 inline-flex items-center min-h-[44px]"
                    >
                      Code
                    </a>
                  ) : (
                    <span className="text-text-muted py-2 inline-flex items-center min-h-[44px]">No public code yet</span>
                  )}

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-accent hover:underline py-2 inline-flex items-center min-h-[44px]"
                    >
                      Demo
                    </a>
                  )}

                  <Link
                    to={`/projects/${project.slug}`}
                    className="ml-auto font-medium text-text hover:text-accent hover:underline py-2 inline-flex items-center min-h-[44px]"
                  >
                    Case study →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
