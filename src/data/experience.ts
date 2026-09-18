export interface TimelineItem {
  id: string;
  type: 'education' | 'experience' | 'project' | 'internship';
  title: string;
  organization: string;
  period: string;
  description: string;
  tags: string[];
}

export const timelineItems: TimelineItem[] = [
  {
    id: 'ece',
    type: 'education',
    title: 'Bachelor of Engineering (B.E.) in Electronics & Communication Engineering',
    organization: 'Meenakshi Sundararajan Engineering College, Chennai, Tamil Nadu',
    period: '2024 – 2028',
    description:
      'Pursuing B.E. in Electronics & Communication Engineering. Building intelligent, cloud-connected hardware-software systems spanning embedded devices, AI/ML, and full-stack web applications.',
    tags: ['ECE', 'Embedded Systems', 'IoT', 'AI/ML', 'Signal Processing'],
  },
  {
    id: 'bsnl',
    type: 'internship',
    title: 'Wireless Communication Engineering Intern',
    organization: 'BSNL (Bharat Sanchar Nigam Limited)',
    period: 'Internship',
    description:
      'Gained hands-on exposure to wireless communication infrastructure at a telecom service provider, including cellular network architecture, base station equipment, and signal transmission systems. Assisted in monitoring signal quality and studying RF propagation & GSM/LTE fundamentals.',
    tags: ['Wireless', 'Telecommunications', 'GSM/LTE', 'RF Propagation', 'BSNL'],
  },
  {
    id: 'tinyml',
    type: 'project',
    title: 'TinyML Human Activity & Fall Detection',
    organization: 'Embedded AI Project',
    period: 'Active',
    description:
      'Designed an end-to-end embedded AI pipeline acquiring accelerometer motion data on an ESP32, applying digital filtering & feature extraction, and classifying activities to detect falls with real-time Firebase cloud streaming.',
    tags: ['ESP32', 'TinyML', 'Scikit-learn', 'TensorFlow', 'Firebase'],
  },
  {
    id: 'pancrea',
    type: 'project',
    title: 'PancreaSense AI',
    organization: 'Healthcare AI + IoT Platform',
    period: 'In Progress',
    description:
      'Built a research-prototype healthcare AI platform combining ESP32 sensor acquisition with FastAPI, PostgreSQL, and SHAP explainability for interpretable feature-level risk screening.',
    tags: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL', 'SHAP'],
  },
  {
    id: 'smartwatts',
    type: 'project',
    title: 'SmartWatts — IoT Electricity Monitoring',
    organization: 'Smart Energy System',
    period: 'In Progress',
    description:
      'Engineered a cloud-connected IoT electricity monitoring system using ESP32 nodes streaming to Firebase, featuring real-time energy analytics, anomaly detection, and consumption recommendations.',
    tags: ['ESP32', 'Firebase', 'FastAPI', 'React', 'Anomaly Detection'],
  },
];
