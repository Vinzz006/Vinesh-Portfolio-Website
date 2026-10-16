import { Star, GitFork, Code2, ExternalLink } from 'lucide-react';
import { GithubIcon } from './Icons';
import type { GitHubRepo } from '../lib/github';
import { formatRelativeTime } from '../lib/utils';

interface GitHubRepoCardProps {
  repo: GitHubRepo;
}

const languageColors: Record<string, string> = {
  Python: '#3776AB',
  TypeScript: '#3178C6',
  JavaScript: '#F7DF1E',
  C: '#555555',
  'C++': '#F34B7D',
  Java: '#ED8B00',
  HTML: '#E34C26',
  CSS: '#563D7C',
  Jupyter: '#DA5B0B',
};

export default function GitHubRepoCard({ repo }: GitHubRepoCardProps) {
  const langColor = repo.language ? languageColors[repo.language] ?? '#64748B' : '#64748B';

  return (
    <article
      className="glass-card p-5 transition-all duration-300 hover:border-primary/25 hover:shadow-glow-sm group"
      aria-label={`Repository: ${repo.name}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2 min-w-0">
          <Code2 size={14} className="text-primary flex-shrink-0" />
          <h3 className="font-mono text-sm font-semibold text-text-primary truncate group-hover:text-primary transition-colors">
            {repo.name}
          </h3>
        </div>
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 p-1.5 rounded-md text-text-muted hover:text-primary hover:bg-primary/5 transition-colors"
          aria-label={`Open ${repo.name} on GitHub`}
        >
          <ExternalLink size={12} />
        </a>
      </div>

      <p className="text-text-secondary text-xs leading-relaxed mb-4 line-clamp-2 min-h-[2.5rem]">
        {repo.description ?? 'No description provided.'}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs text-text-muted">
          {repo.language && (
            <span className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: langColor }}
                aria-hidden="true"
              />
              <span className="font-mono">{repo.language}</span>
            </span>
          )}
          <span className="flex items-center gap-1" aria-label={`${repo.stargazers_count} stars`}>
            <Star size={11} />
            {repo.stargazers_count}
          </span>
          <span className="flex items-center gap-1" aria-label={`${repo.forks_count} forks`}>
            <GitFork size={11} />
            {repo.forks_count}
          </span>
        </div>
        <span className="text-[10px] font-mono text-text-muted" aria-label={`Last updated ${formatRelativeTime(repo.updated_at)}`}>
          {formatRelativeTime(repo.updated_at)}
        </span>
      </div>

      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 w-full btn-outline py-1.5 text-xs justify-center flex items-center gap-2"
        aria-label={`View ${repo.name} on GitHub`}
      >
        <GithubIcon size={12} />
        View Repository
      </a>
    </article>
  );
}
