import { useEffect, useState } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useGitHub } from '../hooks/useGitHub';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { GithubIcon } from '../components/Icons';
import GitHubRepoCard from '../components/GitHubRepoCard';

export default function GitHubSection() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.05 });
  const { user, repos, loading, error } = useGitHub();
  const reduced = useReducedMotion();
  const [showCount, setShowCount] = useState(6);

  return (
    <section
      id="github"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-28 relative"
      aria-labelledby="github-heading"
    >
      <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <span className="section-label">GITHUB</span>
            <h2 id="github-heading" className="section-title mt-2">
              Open Source{' '}
              <span className="text-gradient-primary">Activity</span>
            </h2>
            <p className="section-subtitle mt-3">
              Public repositories and contributions on GitHub.
            </p>
          </div>

          <a
            href="https://github.com/Vinzz006"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary self-start flex items-center gap-2"
            aria-label="View GitHub profile"
          >
            <GithubIcon size={16} />
            View Profile
          </a>
        </div>

        {/* Stats bar */}
        {user && (
          <motion.div
            initial={reduced ? {} : { opacity: 0, y: 10 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            className="glass-card p-5 mb-8 grid grid-cols-2 sm:grid-cols-4 gap-4"
            role="region"
            aria-label="GitHub statistics"
          >
            {[
              { label: 'Public Repos', value: user.public_repos },
              { label: 'Followers', value: user.followers },
              { label: 'Following', value: user.following },
              { label: 'Repos shown', value: Math.min(repos.length, showCount) },
            ].map(({ label, value }) => (
              <div key={label} className="text-center">
                <p className="text-2xl font-bold text-primary font-mono">{value}</p>
                <p className="font-mono text-[10px] text-text-muted mt-1 uppercase tracking-widest">{label}</p>
              </div>
            ))}
          </motion.div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-4" aria-live="polite" aria-busy="true">
            <RefreshCw size={24} className="text-primary animate-spin" />
            <p className="font-mono text-sm text-text-muted">Loading repositories from GitHub…</p>
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div
            className="glass-card p-8 text-center border-accent-red/20"
            role="alert"
          >
            <AlertCircle size={32} className="text-accent-red mx-auto mb-3" />
            <p className="text-text-secondary mb-4">
              Could not load GitHub data. This may be due to API rate limiting.
            </p>
            <p className="font-mono text-xs text-text-muted mb-4">Error: {error}</p>
            <a
              href="https://github.com/Vinzz006"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost inline-flex items-center gap-2"
            >
              <GithubIcon size={16} />
              View on GitHub Directly
            </a>
          </div>
        )}

        {/* Repos grid */}
        {!loading && !error && repos.length > 0 && (
          <>
            <div
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
              role="list"
              aria-label="GitHub repositories"
            >
              {repos.slice(0, showCount).map((repo, i) => (
                <motion.div
                  key={repo.id}
                  role="listitem"
                  initial={reduced ? {} : { opacity: 0, y: 16 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <GitHubRepoCard repo={repo} />
                </motion.div>
              ))}
            </div>

            {showCount < repos.length && (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => setShowCount((n) => n + 6)}
                  className="btn-ghost"
                  aria-label="Load more repositories"
                >
                  Load More Repositories
                </button>
              </div>
            )}
          </>
        )}

        {/* No repos fallback */}
        {!loading && !error && repos.length === 0 && (
          <div className="text-center py-16">
            <p className="text-text-muted font-mono text-sm">No public repositories found.</p>
            <a
              href="https://github.com/Vinzz006"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost mt-4 inline-flex items-center gap-2"
            >
              <GithubIcon size={16} />
              Visit GitHub Profile
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
