import { GithubIcon, LinkedinIcon } from './Icons';

export default function Footer() {
  return (
    <footer className="w-full border-t border-border bg-surface dark:bg-[#0E131A] mt-auto transition-colors duration-150">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-text-muted">
        <p className="order-2 sm:order-1 text-center sm:text-left">
          © {new Date().getFullYear()} Vinesh Shanmugam. Content-first portfolio.
        </p>

        <div className="order-1 sm:order-2 flex items-center gap-6">
          <a
            href="/resume.pdf"
            download="Vinesh_Shanmugam_Resume.pdf"
            className="text-text-muted hover:text-accent hover:underline underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm py-1 font-medium transition-colors duration-150"
          >
            Resume (PDF)
          </a>

          <a
            href="https://github.com/Vinzz006"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile of Vinesh Shanmugam"
            className="text-text-muted hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm p-1 transition-colors duration-150"
          >
            <GithubIcon size={18} />
          </a>

          <a
            href="https://www.linkedin.com/in/vinesh-shanmugam-109215363"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile of Vinesh Shanmugam"
            className="text-text-muted hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm p-1 transition-colors duration-150"
          >
            <LinkedinIcon size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
