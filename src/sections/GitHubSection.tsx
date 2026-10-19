import { useState } from 'react';
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
      className="py-20 relative font-mono text-xs border-b border-console-border bg-[#060806]"
      aria-labelledby="github-heading"
    >
      <div className="absolute inset-0 graticule-grid opacity-20 pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Telemetry Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-console-border pb-3 mb-10">
          <div className="flex items-center gap-2">
            <span className="text-phosphor font-bold">[07]</span>
            <span className="text-term-dim">//</span>
            <span className="text-term-bright font-bold tracking-wider">CODE_REPOSITORY · OPEN_SOURCE_TELEMETRY</span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-term-muted">
            <span>SYNC: API_POLL</span>
            <span className="text-term-dim">|</span>
            <span className="text-phosphor">ONLINE</span>
          </div>
        </div>

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-[11px] text-phosphor tracking-widest uppercase mb-2">
              &gt; GITHUB_ACTIVITY
            </div>
            <h2 id="github-heading" className="text-2xl sm:text-3xl font-black text-term-bright font-mono tracking-tight">
              Public Repositories &amp; Source Trees
            </h2>
            <p className="text-xs text-term-muted mt-2 font-sans">
              Firmware commits, TinyML training notebooks, and full-stack dashboards on GitHub.
            </p>
          </div>

          <a
            href="https://github.com/Vinzz006"
            target="_blank"
            rel="noopener noreferrer"
            className="console-btn self-start flex items-center gap-2"
          >
            <GithubIcon size={14} />
            $ git remote (Vinzz006)
          </a>
        </div>

        {/* Stats bar */}
        {user && (
          <motion.div
            initial={reduced ? {} : { opacity: 0, y: 10 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            className="border border-console-border bg-console-panel p-4 mb-8 grid grid-cols-2 sm:grid-cols-4 gap-4"
            role="region"
            aria-label="GitHub statistics"
          >
            {[
              { label: 'Public Repos', value: user.public_repos },
              { label: 'Followers', value: user.followers },
              { label: 'Following', value: user.following },
              { label: 'Repos shown', value: Math.min(repos.length, showCount) },
            ].map(({ label, value }) => (
              <div key={label} className="text-center p-2 border border-console-border/40 bg-console-well">
                <p className="text-2xl font-bold text-phosphor font-mono">{value}</p>
                <p className="font-mono text-[10px] text-term-muted mt-1 uppercase tracking-widest">{label}</p>
              </div>
            ))}
          </motion.div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16 gap-3" aria-live="polite" aria-busy="true">
            <RefreshCw size={20} className="text-phosphor animate-spin" />
            <p className="font-mono text-xs text-term-muted">[FETCHING REPOSITORIES VIA GITHUB API...]</p>
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div
            className="border border-[#FF4D4D]/30 bg-console-panel p-6 text-center"
            role="alert"
          >
            <AlertCircle size={28} className="text-[#FF4D4D] mx-auto mb-2" />
            <p className="text-term-bright text-xs mb-2">
              GitHub API query rate limited or connection offline.
            </p>
            <p className="font-mono text-[11px] text-term-muted mb-4">Diagnostic: {error}</p>
            <a
              href="https://github.com/Vinzz006"
              target="_blank"
              rel="noopener noreferrer"
              className="console-btn-ghost inline-flex items-center gap-2"
            >
              <GithubIcon size={14} />
              $ open https://github.com/Vinzz006
            </a>
          </div>
        )}

        {/* Repos grid */}
        {!loading && !error && repos.length > 0 && (
          <>
            <div
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3"
              role="list"
              aria-label="GitHub repositories"
            >
              {repos.slice(0, showCount).map((repo, i) => (
                <motion.div
                  key={repo.id}
                  role="listitem"
                  initial={reduced ? {} : { opacity: 0, y: 10 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                >
                  <GitHubRepoCard repo={repo} />
                </motion.div>
              ))}
            </div>

            {showCount < repos.length && (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => setShowCount((n) => n + 6)}
                  className="console-btn-ghost"
                >
                  $ git fetch --more (+6 Repos)
                </button>
              </div>
            )}
          </>
        )}

        {/* No repos fallback */}
        {!loading && !error && repos.length === 0 && (
          <div className="text-center py-12 border border-console-border bg-console-panel">
            <p className="text-term-muted font-mono text-xs">[NO PUBLIC REPOSITORIES CACHED]</p>
            <a
              href="https://github.com/Vinzz006"
              target="_blank"
              rel="noopener noreferrer"
              className="console-btn mt-3 inline-flex items-center gap-2"
            >
              <GithubIcon size={14} />
              $ open github.com/Vinzz006
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
