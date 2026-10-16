import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { GithubIcon, LinkedinIcon } from '../components/Icons';

export default function ContactPage() {
  useDocumentMeta({
    title: 'Contact',
    description: 'Get in touch with Vinesh Shanmugam for engineering roles, project collaboration, or technical inquiries.',
  });

  return (
    <div className="max-w-[720px] mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-10">
      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-text">
          Contact
        </h1>
        <p className="text-base text-text-muted leading-relaxed">
          I'm always open to discussing embedded systems, edge machine learning, IoT projects, or engineering opportunities.
        </p>
      </div>

      <div className="p-6 rounded-lg border border-border bg-white dark:bg-[#0B0F14] space-y-6">
        <ul className="divide-y divide-border text-sm">
          <li className="py-4 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="font-medium text-text">Email</span>
            <a
              href="mailto:shanmugamvinesh75@gmail.com"
              className="text-accent hover:underline underline-offset-4 font-mono text-sm"
            >
              shanmugamvinesh75@gmail.com
            </a>
          </li>

          <li className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="font-medium text-text">LinkedIn</span>
            <a
              href="https://www.linkedin.com/in/vinesh-shanmugam-109215363"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline underline-offset-4 inline-flex items-center gap-1.5"
            >
              <LinkedinIcon size={16} />
              linkedin.com/in/vinesh-shanmugam-109215363 ↗
            </a>
          </li>

          <li className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="font-medium text-text">GitHub</span>
            <a
              href="https://github.com/Vinzz006"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline underline-offset-4 inline-flex items-center gap-1.5"
            >
              <GithubIcon size={16} />
              github.com/Vinzz006 ↗
            </a>
          </li>

          <li className="py-4 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="font-medium text-text">Resume (PDF)</span>
            <a
              href="/resume.pdf"
              download="Vinesh_Shanmugam_Resume.pdf"
              className="text-accent hover:underline underline-offset-4 inline-flex items-center gap-1.5"
            >
              Download PDF (Updated) ↓
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
