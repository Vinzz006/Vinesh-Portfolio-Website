import { useDocumentMeta } from '../hooks/useDocumentMeta';

interface ExperienceEntry {
  role: string;
  organization: string;
  dates?: string;
  bullets: string[];
  tags: string[];
}

const experiences: ExperienceEntry[] = [
  {
    role: 'Wireless Communication Engineering Intern',
    organization: 'BSNL (Bharat Sanchar Nigam Limited)',
    // Dates omitted on the page per instructions until verified; tracked in docs/USER_INPUTS_NEEDED.md
    bullets: [
      'Gained hands-on exposure to wireless communication infrastructure at a telecom service provider, including cellular network architecture, base station equipment, and signal transmission systems.',
      'Assisted in monitoring signal quality and studying RF propagation & GSM/LTE network fundamentals in a live telecom environment under engineering supervision.',
    ],
    tags: ['Wireless', 'Telecommunications', 'GSM/LTE', 'RF Propagation'],
  },
];

export default function ExperiencePage() {
  useDocumentMeta({
    title: 'Experience',
    description: 'Work history, internships, and engineering experience of Vinesh Shanmugam.',
  });

  return (
    <div className="max-w-[720px] mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-12">
      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-text">
          Experience
        </h1>
        <p className="text-base text-text-muted leading-relaxed">
          Professional and engineering work history in telecommunications and systems.
        </p>
      </div>

      {/* Simple vertical list */}
      <div className="space-y-10">
        {experiences.map((exp) => (
          <article
            key={exp.role}
            className="p-6 rounded-lg border border-border bg-white dark:bg-[#0B0F14] space-y-4"
          >
            <div className="space-y-1">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <h2 className="text-lg font-semibold text-text">{exp.role}</h2>
                {exp.dates && (
                  <span className="text-xs font-mono text-text-muted">
                    {exp.dates}
                  </span>
                )}
              </div>
              <p className="text-sm font-medium text-accent">
                {exp.organization}
              </p>
            </div>

            <ul className="list-disc list-outside ml-4 space-y-2 text-sm text-text-muted leading-relaxed">
              {exp.bullets.map((bullet, idx) => (
                <li key={idx} className="pl-1">
                  {bullet}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-1.5 pt-2">
              {exp.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded bg-surface text-text-muted font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
