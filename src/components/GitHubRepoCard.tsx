import { Star, GitFork, Code2, ExternalLink } from 'lucide-react';
import { GithubIcon } from './Icons';
import type { GitHubRepo } from '../lib/github';
import { formatRelativeTime } from '../lib/utils';

interface GitHubRepoCardProps {
  repo: GitHubRepo;
}

const languageColors: Record<string, string> = {
  Python: '#39FF88',
  TypeScript: '#39FF88',
  JavaScript: '#FFB000',
  C: '#CCDACC',
  'C++': '#CCDACC',
  Java: '#FFB000',
  HTML: '#CCDACC',
  CSS: '#CCDACC',
  Jupyter: '#FFB000',
};

export default function GitHubRepoCard({ repo }: GitHubRepoCardProps) {
  const langColor = repo.language ? languageColors[repo.language] ?? '#6D7D6D' : '#6D7D6D';

  return (
    <article
      className="border border-console-border bg-console-panel p-4 transition-colors duration-200 hover:border-phosphor/50 flex flex-col justify-between font-mono"
      aria-label={`Repository: ${repo.name}`}
    >
      <div>
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2 min-w-0">
            <Code2 size={13} className="text-phosphor flex-shrink-0" />
            <h3 className="font-mono text-xs font-bold text-term-bright truncate hover:text-phosphor transition-colors">
              {repo.name}
            </h3>
          </div>
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 p-1 text-term-muted hover:text-phosphor transition-colors"
            aria-label={`Open ${repo.name} on GitHub`}
          >
            <ExternalLink size={12} />
          </a>
        </div>

        <p className="text-term-text text-xs leading-relaxed font-sans mb-3 line-clamp-2 min-h-[2.5rem]">
          {repo.description ?? 'No description provided.'}
        </p>
      </div>

      <div>
        <div className="flex items-center justify-between text-[11px] text-term-muted border-t border-console-border pt-2.5">
          <div className="flex items-center gap-3">
            {repo.language && (
              <span className="flex items-center gap-1.5">
                <span
                  className="w-2 h-2 flex-shrink-0"
                  style={{ backgroundColor: langColor }}
                  aria-hidden="true"
                />
                <span className="font-mono text-[10px]">{repo.language}</span>
              </span>
            )}
            <span className="flex items-center gap-1 text-[10px]" aria-label={`${repo.stargazers_count} stars`}>
              <Star size={10} className="text-amber" />
              {repo.stargazers_count}
            </span>
            <span className="flex items-center gap-1 text-[10px]" aria-label={`${repo.forks_count} forks`}>
              <GitFork size={10} />
              {repo.forks_count}
            </span>
          </div>
          <span className="text-[10px] font-mono text-term-dim" aria-label={`Last updated ${formatRelativeTime(repo.updated_at)}`}>
            {formatRelativeTime(repo.updated_at)}
          </span>
        </div>

        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 w-full console-btn-ghost py-1 text-[11px] justify-center flex items-center gap-1.5"
          aria-label={`$ git remote view - ${repo.name}`}
        >
          <GithubIcon size={11} />
          $ git remote view
        </a>
      </div>
    </article>
  );
}
