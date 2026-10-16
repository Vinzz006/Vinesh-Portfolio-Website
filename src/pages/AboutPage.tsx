import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { isSkillUsedInProjects } from '../data/skills';
import { timelineItems } from '../data/experience';

interface SkillGroup {
  name: string;
  skills: string[];
}

const skillAreas: SkillGroup[] = [
  {
    name: 'Languages',
    skills: ['Python', 'C', 'C++', 'Java', 'JavaScript', 'TypeScript', 'SQL'],
  },
  {
    name: 'AI / ML',
    skills: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenCV', 'Pandas', 'NumPy', 'SHAP', 'Hugging Face'],
  },
  {
    name: 'Embedded / IoT',
    skills: ['ESP32', 'ESP8266', 'Arduino', 'Sensors', 'I2C', 'UART', 'GPIO', 'MQTT', 'TinyML'],
  },
  {
    name: 'Web (Frontend & Backend)',
    skills: ['React', 'TypeScript', 'FastAPI', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'SQLAlchemy', 'REST APIs', 'WebSockets', 'Vite', 'Recharts'],
  },
  {
    name: 'Tools & Cloud',
    skills: ['Git', 'GitHub Actions', 'Docker', 'Firebase', 'CI/CD', 'Vercel', 'Render'],
  },
];

export default function AboutPage() {
  useDocumentMeta({
    title: 'About',
    description: 'Background, technical skills, and education of Vinesh Shanmugam — ECE student in Embedded AI & IoT.',
  });

  const education = timelineItems.find((item) => item.type === 'education');

  return (
    <div className="max-w-[720px] mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-16">
      {/* Bio Section */}
      <section className="space-y-4">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-text">
          About
        </h1>
        <div className="space-y-4 text-base text-text leading-relaxed">
          <p>
            I am an Electronics & Communication Engineering student who builds intelligent, cloud-connected hardware-software systems spanning embedded devices, AI/ML, and full-stack web applications.
          </p>
          <p className="text-text-muted">
            My work spans the physical-to-digital spectrum: acquiring physical sensor telemetry on microcontrollers (such as the ESP32), filtering signals and running TinyML inferences on edge hardware, and transmitting data via lightweight protocols to cloud backends and real-time visualization dashboards.
          </p>
        </div>
      </section>

      {/* Skills Grouped by Area */}
      <section className="space-y-8">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight text-text">
            Skills
          </h2>
          <p className="text-sm text-text-muted">
            Categorized by technical domain. Technologies verified in project implementations are listed first.
          </p>
        </div>

        <div className="space-y-8">
          {skillAreas.map((area) => {
            const usedInProjects = area.skills.filter((s) => isSkillUsedInProjects(s));
            const alsoFamiliarWith = area.skills.filter((s) => !isSkillUsedInProjects(s));

            return (
              <div key={area.name} className="space-y-3">
                <h3 className="text-lg font-semibold text-text">
                  {area.name}
                </h3>

                {usedInProjects.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="text-xs font-medium text-text-muted uppercase tracking-wider">
                      Used in projects
                    </span>
                    <ul className="flex flex-wrap gap-2 pt-1">
                      {usedInProjects.map((skill) => (
                        <li
                          key={skill}
                          className="text-xs px-2.5 py-1 rounded bg-surface text-text border border-border font-mono"
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {alsoFamiliarWith.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    <span className="text-xs font-medium text-text-muted uppercase tracking-wider">
                      Also familiar with
                    </span>
                    <ul className="flex flex-wrap gap-2 pt-1">
                      {alsoFamiliarWith.map((skill) => (
                        <li
                          key={skill}
                          className="text-xs px-2.5 py-1 rounded bg-surface/50 text-text-muted border border-border/80 font-mono"
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Education Block */}
      {education && (
        <section className="space-y-4 pt-4 border-t border-border">
          <h2 className="text-2xl font-semibold tracking-tight text-text">
            Education
          </h2>

          <div className="p-6 rounded-lg border border-border bg-surface space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
              <h3 className="text-base font-semibold text-text">
                {education.title}
              </h3>
              <span className="text-xs font-mono text-text-muted">
                {education.period}
              </span>
            </div>

            <p className="text-sm font-medium text-accent">
              {education.organization}
            </p>

            <p className="text-sm text-text-muted leading-relaxed pt-2">
              {education.description}
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
