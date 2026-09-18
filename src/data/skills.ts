export interface SkillCategory {
  id: string;
  label: string;
  skills: string[];
  accent: string;
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    label: 'Languages',
    accent: '#00D4FF',
    skills: ['Python', 'Java', 'C', 'C++', 'JavaScript', 'TypeScript', 'SQL'],
  },
  {
    id: 'ai-ml',
    label: 'AI / ML',
    accent: '#7C3AED',
    skills: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenCV', 'Hugging Face', 'Pandas', 'NumPy', 'SHAP'],
  },
  {
    id: 'embedded',
    label: 'Embedded / IoT',
    accent: '#10B981',
    skills: ['ESP32', 'ESP8266', 'Arduino', 'I2C', 'UART', 'GPIO', 'Sensors', 'MQTT', 'TinyML'],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    accent: '#F59E0B',
    skills: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'shadcn/ui', 'Recharts', 'Framer Motion'],
  },
  {
    id: 'backend',
    label: 'Backend',
    accent: '#EF4444',
    skills: ['FastAPI', 'Flask', 'Node.js', 'REST APIs', 'WebSockets', 'PostgreSQL', 'SQLAlchemy'],
  },
  {
    id: 'cloud',
    label: 'Cloud',
    accent: '#3B82F6',
    skills: ['Firebase', 'Vercel', 'Render', 'Docker', 'GitHub Actions', 'CI/CD'],
  },
  {
    id: 'animation',
    label: 'Creative / 3D',
    accent: '#EC4899',
    skills: ['Anime.js', 'Framer Motion', 'Three.js', 'React Three Fiber', 'SVG Animation'],
  },
];
