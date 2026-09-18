export interface ArchitectureNode {
  name: string;
  role: string;
  tech: string;
  description: string;
  type: 'sensor' | 'hardware' | 'edge' | 'backend' | 'ai' | 'cloud' | 'frontend' | 'network';
}

export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  technologies: string[];
  architecture: string[];
  architectureDetails?: ArchitectureNode[];
  status: 'Active' | 'In Progress' | 'Research' | 'Complete';
  githubUrl: string | null;
  liveUrl: string | null;
  featured: boolean;
  highlight?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'TinyML Human Activity & Fall Detection',
    category: 'Embedded AI / TinyML',
    description:
      'An ESP32-based intelligent motion monitoring system that collects accelerometer data and uses machine learning for human activity recognition and fall detection.',
    longDescription:
      'Collects raw accelerometer data via ESP32, performs signal processing and feature extraction, trains an ML model using scikit-learn and TensorFlow, and streams results to a Firebase dashboard for real-time monitoring.',
    technologies: ['ESP32', 'Accelerometer', 'Python', 'Scikit-learn', 'TensorFlow', 'TinyML', 'Firebase'],
    architecture: ['Accelerometer', 'ESP32', 'Signal Processing', 'Feature Extraction', 'ML Model', 'Firebase', 'Dashboard'],
    architectureDetails: [
      {
        name: 'Accelerometer',
        role: 'Motion Sensing',
        tech: 'MPU6050 / I2C',
        type: 'sensor',
        description: 'Captures 3-axis acceleration and angular velocity at 50Hz sample rate.',
      },
      {
        name: 'ESP32',
        role: 'Data Acquisition',
        tech: 'FreeRTOS / C++',
        type: 'hardware',
        description: 'Buffers raw IMU data, handles timing synchronization, and prepares packets.',
      },
      {
        name: 'Signal Processing',
        role: 'Noise Filtering',
        tech: 'Low-Pass Filter / FFT',
        type: 'edge',
        description: 'Applies digital filtering to eliminate gravity bias and high-frequency noise.',
      },
      {
        name: 'Feature Extraction',
        role: 'Mathematical Features',
        tech: 'RMS / Variance / Peak Count',
        type: 'edge',
        description: 'Computes statistical and frequency-domain features across sliding windows.',
      },
      {
        name: 'ML Model',
        role: 'Inference & Fall Detection',
        tech: 'Scikit-learn / TensorFlow',
        type: 'ai',
        description: 'Classifies movement patterns (walking, sitting, sudden fall impact).',
      },
      {
        name: 'Firebase',
        role: 'Realtime Cloud Sync',
        tech: 'Firebase RTDB / REST',
        type: 'cloud',
        description: 'Transmits categorized events and telemetry data with millisecond latency.',
      },
      {
        name: 'Dashboard',
        role: 'Web Visualization',
        tech: 'React / Recharts',
        type: 'frontend',
        description: 'Displays live motion graphs, fall alerts, and historical activity logs.',
      },
    ],
    status: 'Active',
    githubUrl: null,
    liveUrl: null,
    featured: true,
    highlight: 'Edge AI · Fall Detection',
  },
  {
    id: 2,
    title: 'PancreaSense AI',
    category: 'Healthcare AI + IoT',
    description:
      'A research prototype AI-powered healthcare platform combining sensor data, machine learning and a modern web dashboard for intelligent health-risk screening — not a medically validated diagnostic system.',
    longDescription:
      'Integrates ESP32 sensor data with a FastAPI backend, PostgreSQL database, and a React frontend. Uses ML models with SHAP explainability for AI-assisted health-risk analysis.',
    technologies: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL', 'SQLAlchemy', 'ESP32', 'Machine Learning', 'SHAP'],
    architecture: ['Sensors', 'ESP32', 'FastAPI', 'ML Model', 'PostgreSQL', 'React Dashboard'],
    architectureDetails: [
      {
        name: 'Sensors',
        role: 'Biometric Input',
        tech: 'Biometric / Environmental Sensors',
        type: 'sensor',
        description: 'Gathers non-invasive physiological readings and ambient metrics.',
      },
      {
        name: 'ESP32',
        role: 'Edge Ingestion',
        tech: 'ESP-IDF / Wi-Fi',
        type: 'hardware',
        description: 'Performs on-device calibration and securely transmits encrypted sensor readings.',
      },
      {
        name: 'FastAPI',
        role: 'Backend API Gateway',
        tech: 'Python / Pydantic',
        type: 'backend',
        description: 'Validates incoming payloads, manages patient sessions, and dispatches inference tasks.',
      },
      {
        name: 'ML Model',
        role: 'Risk Screening & SHAP',
        tech: 'Scikit-Learn / SHAP',
        type: 'ai',
        description: 'Computes predictive risk scores with explainable feature importance values.',
      },
      {
        name: 'PostgreSQL',
        role: 'Relational Persistence',
        tech: 'PostgreSQL / SQLAlchemy',
        type: 'cloud',
        description: 'Maintains encrypted historical records and audit logs.',
      },
      {
        name: 'React Dashboard',
        role: 'Clinical Insights UI',
        tech: 'React / TypeScript / Tailwind',
        type: 'frontend',
        description: 'Visualizes risk factors, SHAP summary plots, and temporal trends.',
      },
    ],
    status: 'In Progress',
    githubUrl: null,
    liveUrl: null,
    featured: true,
    highlight: 'Healthcare AI · Explainable AI',
  },
  {
    id: 3,
    title: 'SmartWatts',
    category: 'Smart Energy / IoT',
    description:
      'An intelligent electricity monitoring platform for real-time energy consumption monitoring, analytics, anomaly detection and actionable energy insights.',
    longDescription:
      'ESP32 reads energy sensor data and pushes it to Firebase via MQTT. A React frontend displays real-time dashboards. AI module detects anomalies in consumption patterns.',
    technologies: ['ESP32', 'IoT', 'Firebase', 'React', 'FastAPI', 'AI', 'MQTT'],
    architecture: ['Energy Sensor', 'ESP32', 'MQTT', 'Firebase', 'Analytics Engine', 'Dashboard'],
    architectureDetails: [
      {
        name: 'Energy Sensor',
        role: 'Current & Voltage Sensing',
        tech: 'CT Sensor / PZEM-004T',
        type: 'sensor',
        description: 'Measures AC voltage, RMS current, active power, and cumulative kWh.',
      },
      {
        name: 'ESP32',
        role: 'Microcontroller Hub',
        tech: 'C++ / PubSubClient',
        type: 'hardware',
        description: 'Samples power measurements every second and aggregates hourly metrics.',
      },
      {
        name: 'MQTT',
        role: 'Lightweight Messaging',
        tech: 'MQTT Broker / QoS 1',
        type: 'network',
        description: 'Ensures low-bandwidth transmission of telemetry payloads.',
      },
      {
        name: 'Firebase',
        role: 'Cloud Ingestion',
        tech: 'Firebase RTDB',
        type: 'cloud',
        description: 'Stores live state and broadcasts updates to connected clients.',
      },
      {
        name: 'Analytics Engine',
        role: 'Anomaly Detection',
        tech: 'Isolation Forest / Python',
        type: 'ai',
        description: 'Detects unexpected spikes, phantom power draws, and irregular usage.',
      },
      {
        name: 'Dashboard',
        role: 'Energy Control Center',
        tech: 'React / Recharts / Tailwind',
        type: 'frontend',
        description: 'Provides real-time wattage meters, tariff calculators, and efficiency tips.',
      },
    ],
    status: 'In Progress',
    githubUrl: null,
    liveUrl: null,
    featured: true,
    highlight: 'IoT · Energy AI',
  },
  {
    id: 4,
    title: 'Transit Assist',
    category: 'AI + Computer Vision + Accessibility',
    description:
      'An intelligent transportation assistance concept using computer vision and real-time information to support navigation and accessibility for commuters.',
    longDescription:
      'Uses object detection and map APIs to assist users in navigating transit systems. Designed with accessibility in mind.',
    technologies: ['Computer Vision', 'AI', 'Object Detection', 'Maps API', 'Python'],
    architecture: ['Camera Input', 'Object Detection', 'Route Planner', 'Maps API', 'User Interface'],
    architectureDetails: [
      {
        name: 'Camera Input',
        role: 'Video Stream',
        tech: 'Live Camera / Video Stream',
        type: 'sensor',
        description: 'Captures forward-facing live video feed in transit stations and vehicles.',
      },
      {
        name: 'Object Detection',
        role: 'Vision AI',
        tech: 'YOLO / OpenCV',
        type: 'ai',
        description: 'Identifies transit signage, platform edges, obstacles, and accessibility ramps.',
      },
      {
        name: 'Route Planner',
        role: 'Decision Engine',
        tech: 'Python / Graph Algorithms',
        type: 'backend',
        description: 'Calculates optimal barrier-free transfer paths and platform navigation.',
      },
      {
        name: 'Maps API',
        role: 'Geospatial Context',
        tech: 'Transit Feeds / Maps REST',
        type: 'cloud',
        description: 'Integrates real-time timetable updates, GPS coordinates, and arrival predictions.',
      },
      {
        name: 'User Interface',
        role: 'Accessible Feedback',
        tech: 'React / Web Speech Audio',
        type: 'frontend',
        description: 'Delivers high-contrast visuals and auditory guidance cues for commuters.',
      },
    ],
    status: 'Research',
    githubUrl: null,
    liveUrl: null,
    featured: true,
    highlight: 'Computer Vision · Accessibility',
  },
  {
    id: 5,
    title: 'DevOpsGuard',
    category: 'DevOps / Automation',
    description:
      'A DevOps-focused platform designed to help identify and manage problems across development and deployment workflows.',
    longDescription:
      'Monitors CI/CD pipelines, detects anomalies, and surfaces actionable insights. Built with FastAPI, Docker, and GitHub integrations.',
    technologies: ['Python', 'FastAPI', 'Docker', 'GitHub', 'CI/CD'],
    architecture: ['GitHub Events', 'CI/CD Monitor', 'FastAPI', 'Anomaly Detector', 'Dashboard'],
    architectureDetails: [
      {
        name: 'GitHub Events',
        role: 'Webhook Web Receiver',
        tech: 'GitHub Webhooks / REST',
        type: 'network',
        description: 'Listens for commit pushes, pull requests, workflow runs, and deployment triggers.',
      },
      {
        name: 'CI/CD Monitor',
        role: 'Pipeline Telemetry',
        tech: 'Docker / Runner Metrics',
        type: 'backend',
        description: 'Captures build duration, step exit codes, and dependency cache statuses.',
      },
      {
        name: 'FastAPI',
        role: 'Event Processor',
        tech: 'FastAPI / Async Workers',
        type: 'backend',
        description: 'Parses logs, aggregates timing statistics, and orchestrates remediation alerts.',
      },
      {
        name: 'Anomaly Detector',
        role: 'Heuristic & ML Check',
        tech: 'Python / Time-series rules',
        type: 'ai',
        description: 'Identifies slow build regressions, flaky test runs, and configuration drifts.',
      },
      {
        name: 'Dashboard',
        role: 'DevOps Control Panel',
        tech: 'React / Tailwind CSS',
        type: 'frontend',
        description: 'Summarizes workflow health, failure frequencies, and pipeline bottlenecks.',
      },
    ],
    status: 'In Progress',
    githubUrl: null,
    liveUrl: null,
    featured: false,
    highlight: 'DevOps · Automation',
  },
  {
    id: 6,
    title: 'AI Medical Report & Prescription Analyzer',
    category: 'Healthcare AI',
    description:
      'An AI-assisted tool for analyzing medical reports and prescriptions using NLP and machine learning — a research prototype, not a medical device.',
    longDescription:
      'Processes uploaded medical documents using NLP models to extract structured information and provide AI-assisted summaries for review.',
    technologies: ['Python', 'NLP', 'FastAPI', 'React', 'AI/ML'],
    architecture: ['Document Upload', 'OCR', 'NLP Model', 'FastAPI', 'React Dashboard'],
    architectureDetails: [
      {
        name: 'Document Upload',
        role: 'Document Ingestion',
        tech: 'PDF / Image Upload',
        type: 'frontend',
        description: 'Secure interface for submitting clinical reports and prescription scans.',
      },
      {
        name: 'OCR',
        role: 'Text Digitization',
        tech: 'Tesseract / Vision Parser',
        type: 'ai',
        description: 'Extracts printed and handwritten alphanumeric tokens from scanned files.',
      },
      {
        name: 'NLP Model',
        role: 'Entity Recognition',
        tech: 'BioBERT / Named Entity Rec',
        type: 'ai',
        description: 'Identifies medication dosages, test biomarkers, and reference ranges.',
      },
      {
        name: 'FastAPI',
        role: 'Report Generator',
        tech: 'FastAPI / Python',
        type: 'backend',
        description: 'Structures extracted findings into structured JSON summaries.',
      },
      {
        name: 'React Dashboard',
        role: 'Physician Review View',
        tech: 'React / Tailwind',
        type: 'frontend',
        description: 'Highlights critical values with side-by-side document comparison.',
      },
    ],
    status: 'In Progress',
    githubUrl: null,
    liveUrl: null,
    featured: false,
    highlight: 'NLP · Healthcare',
  },
  {
    id: 7,
    title: 'AI Farmer Query & Advisory System',
    category: 'AI + Agriculture',
    description:
      'An AI-powered advisory system for farmers that answers agricultural queries and provides recommendations using NLP.',
    longDescription:
      'Farmers can query the system in natural language. The AI backend processes questions and returns relevant agricultural advice and recommendations.',
    technologies: ['Python', 'NLP', 'FastAPI', 'React', 'AI/ML'],
    architecture: ['User Query', 'NLP Engine', 'Knowledge Base', 'FastAPI', 'React Frontend'],
    architectureDetails: [
      {
        name: 'User Query',
        role: 'Multilingual Voice/Text',
        tech: 'Voice Input / Text Form',
        type: 'frontend',
        description: 'Receives queries on crop diseases, weather impact, and pest management.',
      },
      {
        name: 'NLP Engine',
        role: 'Intent Classification',
        tech: 'Transformers / Sentence Embeddings',
        type: 'ai',
        description: 'Understands query intent, botanical terms, and regional crop nomenclature.',
      },
      {
        name: 'Knowledge Base',
        role: 'Agronomy Knowledge Base',
        tech: 'Vector DB / Agronomy Dataset',
        type: 'cloud',
        description: 'Stores vetted agricultural guidelines, seasonal advisories, and remedies.',
      },
      {
        name: 'FastAPI',
        role: 'Response Generator',
        tech: 'FastAPI / Python',
        type: 'backend',
        description: 'Synthesizes concise, actionable advice tailored to soil and season.',
      },
      {
        name: 'React Frontend',
        role: 'Mobile-Friendly UI',
        tech: 'React / Responsive PWA',
        type: 'frontend',
        description: 'Delivers clear visual guides and step-by-step crop care action items.',
      },
    ],
    status: 'Complete',
    githubUrl: null,
    liveUrl: null,
    featured: false,
    highlight: 'NLP · AgriTech',
  },
  {
    id: 8,
    title: 'Medical Image Processing',
    category: 'Computer Vision / Medical AI',
    description:
      'A suite of computer vision projects including brain tumor segmentation and chest X-ray classification using deep learning.',
    longDescription:
      'Implements U-Net-style segmentation for brain MRI and CNN-based classification for chest X-ray datasets. Research-grade implementations.',
    technologies: ['Python', 'TensorFlow', 'OpenCV', 'Computer Vision', 'Deep Learning'],
    architecture: ['Image Input', 'Preprocessing', 'CNN / U-Net', 'Prediction', 'Visualization'],
    architectureDetails: [
      {
        name: 'Image Input',
        role: 'DICOM / Scan Reader',
        tech: 'DICOM / NIfTI / PNG',
        type: 'sensor',
        description: 'Loads MRI brain slices and chest radiograph imaging arrays.',
      },
      {
        name: 'Preprocessing',
        role: 'Normalization & Augmentation',
        tech: 'OpenCV / NumPy',
        type: 'edge',
        description: 'Resizes, normalizes pixel intensities, and applies contrast enhancement.',
      },
      {
        name: 'CNN / U-Net',
        role: 'Deep Learning Model',
        tech: 'TensorFlow / Keras',
        type: 'ai',
        description: 'Executes encoder-decoder semantic segmentation and classification.',
      },
      {
        name: 'Prediction',
        role: 'Mask & Confidence Score',
        tech: 'Softmax / Binary Mask',
        type: 'ai',
        description: 'Outputs tumor region contour masks and pathology probability scores.',
      },
      {
        name: 'Visualization',
        role: 'Heatmap Overlay',
        tech: 'Matplotlib / React Viewer',
        type: 'frontend',
        description: 'Renders color-coded lesion segmentation masks superimposed on original scans.',
      },
    ],
    status: 'Complete',
    githubUrl: null,
    liveUrl: null,
    featured: false,
    highlight: 'Deep Learning · Medical CV',
  },
  {
    id: 9,
    title: 'RailDesk AI',
    category: 'AI + Full-Stack / Railway SaaS',
    description:
      'A railway-focused helpdesk and ticketing platform with AI assistance, designed to streamline railway customer support workflows.',
    longDescription:
      'Full-stack SaaS application with AI-assisted ticket routing, status tracking, and support automation for railway customer service.',
    technologies: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL', 'AI/ML'],
    architecture: ['User Interface', 'FastAPI', 'AI Router', 'Database', 'Notification Service'],
    architectureDetails: [
      {
        name: 'User Interface',
        role: 'Passenger Support Portal',
        tech: 'React / TypeScript',
        type: 'frontend',
        description: 'Submits complaints, PNR inquiries, lost-and-found reports, and feedback.',
      },
      {
        name: 'FastAPI',
        role: 'Core Backend Hub',
        tech: 'FastAPI / Async',
        type: 'backend',
        description: 'Manages ticket lifecycles, authentication, and SLA timers.',
      },
      {
        name: 'AI Router',
        role: 'Intelligent Ticket Classifier',
        tech: 'NLP Classification / Scikit',
        type: 'ai',
        description: 'Categorizes ticket urgency and assigns issues to appropriate railway divisions.',
      },
      {
        name: 'Database',
        role: 'Persistent Storage',
        tech: 'PostgreSQL / SQLAlchemy',
        type: 'cloud',
        description: 'Maintains ticket histories, department logs, and resolution tracking.',
      },
      {
        name: 'Notification Service',
        role: 'Alert Dispatcher',
        tech: 'WebSockets / Email / SMS',
        type: 'network',
        description: 'Sends real-time resolution updates and SMS alerts to passengers.',
      },
    ],
    status: 'In Progress',
    githubUrl: null,
    liveUrl: null,
    featured: false,
    highlight: 'SaaS · AI · Railway',
  },
  {
    id: 10,
    title: 'ESP32 + Firebase Real-Time IoT Dashboard',
    category: 'IoT + Cloud',
    description:
      'A real-time IoT monitoring dashboard integrating ESP32 microcontroller sensor data with Firebase for live data visualization.',
    longDescription:
      'ESP32 collects sensor readings and pushes them to Firebase Realtime Database. The React dashboard subscribes to live updates for real-time display.',
    technologies: ['ESP32', 'Firebase', 'React', 'IoT', 'Real-Time DB'],
    architecture: ['ESP32', 'Sensor Data', 'Firebase RTDB', 'React Dashboard', 'Real-Time Charts'],
    architectureDetails: [
      {
        name: 'ESP32',
        role: 'Edge Node Hub',
        tech: 'ESP32 / C++ / Wi-Fi',
        type: 'hardware',
        description: 'Controls hardware sensors, runs background tasks, and manages Wi-Fi reconnection.',
      },
      {
        name: 'Sensor Data',
        role: 'Analog/Digital Signals',
        tech: 'DHT22 / ADC / GPIO',
        type: 'sensor',
        description: 'Gathers ambient environmental telemetry with low power consumption.',
      },
      {
        name: 'Firebase RTDB',
        role: 'Realtime JSON Cloud DB',
        tech: 'Firebase WebSocket API',
        type: 'cloud',
        description: 'Low-latency NoSQL database broadcasting real-time value changes.',
      },
      {
        name: 'React Dashboard',
        role: 'Real-Time Web UI',
        tech: 'React / TypeScript',
        type: 'frontend',
        description: 'Subscribes to live WebSocket data streams and updates gauges instantly.',
      },
      {
        name: 'Real-Time Charts',
        role: 'Telemetry Plotting',
        tech: 'Recharts / Smooth Curves',
        type: 'frontend',
        description: 'Plots live rolling time-series data with threshold alert styling.',
      },
    ],
    status: 'Complete',
    githubUrl: null,
    liveUrl: null,
    featured: false,
    highlight: 'IoT · Real-Time',
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
