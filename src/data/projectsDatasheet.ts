import { projects, type Project } from './projects';

export interface ProjectDatasheet {
  project: Project;
  datasheetId: string;
  statusTag: 'DEPLOYED' | 'PROTOTYPE' | 'IN PROGRESS';
  filterCategories: ('EMBEDDED' | 'EDGE-ML' | 'FULL-STACK')[];
  spec: {
    mcu: string;
    sensors: string;
    protocol: string;
    mlModel: string;
    backend: string;
    role: string;
  };
  problem: string;
  whatIBuilt: string[];
  results: string[];
  architectureDiagram: {
    name: string;
    label: string;
    type: 'sensor' | 'mcu' | 'ml' | 'cloud' | 'dashboard';
  }[];
}

export const projectDatasheets: ProjectDatasheet[] = [
  {
    project: projects[0], // TinyML Fall Detection
    datasheetId: 'DS-001',
    statusTag: 'PROTOTYPE',
    filterCategories: ['EMBEDDED', 'EDGE-ML'],
    spec: {
      mcu: 'ESP32 Dual-Core (Xtensa LX6 / FreeRTOS)',
      sensors: 'MPU6050 3-Axis Accelerometer (I2C 400kHz)',
      protocol: 'I2C Bus / MQTT / Firebase REST API',
      mlModel: 'Quantized TinyML (Scikit-Learn / TensorFlow Lite)',
      backend: 'Firebase Realtime Database (WebSocket Cloud Sync)',
      role: 'Firmware & Embedded ML Engineer',
    },
    problem:
      'Wearable fall detection systems often rely on power-hungry cloud inference with intolerable latency and privacy risks. The challenge is running real-time motion classification and high-g fall impact detection entirely on a resource-constrained microcontroller.',
    whatIBuilt: [
      'Designed end-to-end data acquisition firmware in C++/FreeRTOS sampling IMU motion at 50Hz via I2C.',
      'Implemented on-device digital filtering (Butterworth low-pass & sliding-window RMS) to isolate dynamic acceleration from gravity bias.',
      'Trained a lightweight decision classifier in Scikit-Learn/TensorFlow, quantized to integer precision for microcontroller execution.',
      'Configured Wi-Fi telemetry broadcasting classified activity states and immediate fall alerts to Firebase RTDB.',
    ],
    results: [
      'TODO: add verified metrics (accuracy, latency, memory footprint)',
    ],
    architectureDiagram: [
      { name: 'MPU6050', label: 'IMU SENSOR', type: 'sensor' },
      { name: 'ESP32', label: 'DSP & BUFFER', type: 'mcu' },
      { name: 'TinyML', label: 'ON-DEVICE ML', type: 'ml' },
      { name: 'Firebase', label: 'CLOUD RTDB', type: 'cloud' },
      { name: 'Web UI', label: 'DASHBOARD', type: 'dashboard' },
    ],
  },
  {
    project: projects[1], // PancreaSense AI
    datasheetId: 'DS-002',
    statusTag: 'IN PROGRESS',
    filterCategories: ['EMBEDDED', 'EDGE-ML', 'FULL-STACK'],
    spec: {
      mcu: 'ESP32 (ESP-IDF / Wi-Fi)',
      sensors: 'Non-invasive Biometric & Ambient Sensors',
      protocol: 'HTTPS / JSON REST / WebSockets',
      mlModel: 'Random Forest Classifier + SHAP Explainability',
      backend: 'FastAPI (Python) + PostgreSQL + SQLAlchemy',
      role: 'Full-Stack & ML Systems Engineer',
    },
    problem:
      'Clinical risk prediction models typically function as uninterpretable black boxes, making them difficult for clinicians to trust or audit. Furthermore, sensor acquisition is rarely tied seamlessly into interpretable feature scoring.',
    whatIBuilt: [
      'Engineered an ESP32 hardware telemetry client collecting physiological readings and streaming encrypted payloads over Wi-Fi.',
      'Constructed a high-throughput FastAPI backend managing patient records, session tokens, and inference queues.',
      'Implemented SHAP (SHapley Additive exPlanations) to compute exact feature importance values for every risk assessment.',
      'Developed a React & TypeScript clinical dashboard visualizing risk factor contributions and longitudinal patient trends.',
    ],
    results: [
      'TODO: add verified metrics (accuracy, latency, memory footprint)',
    ],
    architectureDiagram: [
      { name: 'Biometrics', label: 'SENSOR INPUT', type: 'sensor' },
      { name: 'ESP32', label: 'INGESTION NODE', type: 'mcu' },
      { name: 'ML + SHAP', label: 'RISK SCORING', type: 'ml' },
      { name: 'FastAPI', label: 'POSTGRES BACKEND', type: 'cloud' },
      { name: 'React', label: 'CLINICAL UI', type: 'dashboard' },
    ],
  },
  {
    project: projects[2], // SmartWatts
    datasheetId: 'DS-003',
    statusTag: 'IN PROGRESS',
    filterCategories: ['EMBEDDED', 'EDGE-ML', 'FULL-STACK'],
    spec: {
      mcu: 'ESP32 Microcontroller Hub',
      sensors: 'PZEM-004T / Split-Core CT Current Transformer',
      protocol: 'MQTT (QoS 1) / Wi-Fi 802.11 b/g/n',
      mlModel: 'Isolation Forest Anomaly Detection (Time-Series)',
      backend: 'Firebase RTDB + FastAPI REST Services',
      role: 'IoT Hardware & Energy AI Developer',
    },
    problem:
      'Commercial electrical monitoring hardware is costly and lacks intelligent edge analytics to detect phantom power drain, anomalous wattage spikes, and sub-meter equipment malfunctions in real time.',
    whatIBuilt: [
      'Interfaced PZEM-004T energy monitoring modules over isolated UART to capture AC voltage, RMS current, active power, and cumulative kWh.',
      'Implemented an MQTT publisher with automatic reconnection and local circular buffering during network disconnections.',
      'Built a time-series anomaly detection worker using Isolation Forest in Python to flag irregular power draws.',
      'Engineered a real-time React dashboard with rolling power graphs, tariff cost calculators, and automated peak-hour alerts.',
    ],
    results: [
      'TODO: add verified metrics (accuracy, latency, memory footprint)',
    ],
    architectureDiagram: [
      { name: 'CT Sensor', label: 'AC MEASUREMENT', type: 'sensor' },
      { name: 'ESP32', label: 'MQTT GATEWAY', type: 'mcu' },
      { name: 'Isolation Forest', label: 'ANOMALY ENGINE', type: 'ml' },
      { name: 'Firebase', label: 'TELEMETRY CLOUD', type: 'cloud' },
      { name: 'React', label: 'ENERGY CONSOLE', type: 'dashboard' },
    ],
  },
  {
    project: projects[3], // Transit Assist
    datasheetId: 'DS-004',
    statusTag: 'PROTOTYPE',
    filterCategories: ['EDGE-ML'],
    spec: {
      mcu: 'Edge Vision Compute Node (Linux / Mobile)',
      sensors: 'Station Forward-Facing Video Camera Feed',
      protocol: 'Geospatial Transit APIs / Web Speech Audio',
      mlModel: 'YOLO Object Detection + OpenCV Preprocessing',
      backend: 'Python Routing Engine + Graph Algorithms',
      role: 'Computer Vision & Accessibility Engineer',
    },
    problem:
      'Visually impaired and mobility-challenged commuters face severe difficulties navigating complex transit hubs, identifying platform gaps, reading dynamic LED signs, and locating accessible ramps.',
    whatIBuilt: [
      'Engineered a computer vision pipeline running YOLO object detection on video streams to detect platform edges, tactile paving, and obstacles.',
      'Integrated real-time transit schedule feeds with localized graph routing algorithms to compute step-free platform transfers.',
      'Built high-contrast auditory user interface cues using the Web Speech API for hands-free navigational prompts.',
    ],
    results: [
      'TODO: add verified metrics (accuracy, latency, memory footprint)',
    ],
    architectureDiagram: [
      { name: 'Video Feed', label: 'CAMERA STREAM', type: 'sensor' },
      { name: 'Edge Node', label: 'FRAME GRABBER', type: 'mcu' },
      { name: 'YOLO / CV', label: 'OBJECT DETECT', type: 'ml' },
      { name: 'Transit Feeds', label: 'TIMETABLE CLOUD', type: 'cloud' },
      { name: 'Speech UI', label: 'AUDIO GUIDANCE', type: 'dashboard' },
    ],
  },
  {
    project: projects[4], // DevOpsGuard
    datasheetId: 'DS-005',
    statusTag: 'IN PROGRESS',
    filterCategories: ['FULL-STACK'],
    spec: {
      mcu: 'Docker Runner / Host Daemon',
      sensors: 'GitHub Webhooks / CI Runner Telemetry',
      protocol: 'Webhooks / REST API / Docker Socket',
      mlModel: 'Time-Series Heuristics & Regressive Bottleneck Detector',
      backend: 'FastAPI + Async Worker Queues + PostgreSQL',
      role: 'Full-Stack DevOps & Backend Engineer',
    },
    problem:
      'CI/CD workflows suffer from silent performance regressions, flaky test runs, and unmonitored container cache invalidations that waste computing credits and delay critical production deployments.',
    whatIBuilt: [
      'Constructed a FastAPI webhook receiver ingesting GitHub Actions commit pushes, pull requests, and job completion events.',
      'Engineered worker pipelines analyzing build step durations, exit statuses, and dependency download latencies.',
      'Implemented automated heuristic checks flagging slow build regressions, flaky test patterns, and configuration drifts.',
      'Built a React monitoring dashboard displaying pipeline bottlenecks, success rates, and suggested remediation steps.',
    ],
    results: [
      'TODO: add verified metrics (accuracy, latency, memory footprint)',
    ],
    architectureDiagram: [
      { name: 'Webhooks', label: 'GITHUB EVENTS', type: 'sensor' },
      { name: 'Runner Daemon', label: 'STEP TELEMETRY', type: 'mcu' },
      { name: 'Rules Engine', label: 'ANOMALY DETECT', type: 'ml' },
      { name: 'FastAPI / DB', label: 'EVENT STORE', type: 'cloud' },
      { name: 'React', label: 'PIPELINE HUD', type: 'dashboard' },
    ],
  },
  {
    project: projects[5], // AI Medical Report Analyzer
    datasheetId: 'DS-006',
    statusTag: 'IN PROGRESS',
    filterCategories: ['FULL-STACK', 'EDGE-ML'],
    spec: {
      mcu: 'Document Ingestion Gateway',
      sensors: 'Scanned Document Array / PDF Upload Stream',
      protocol: 'HTTPS / Multi-part Upload / JSON REST',
      mlModel: 'Tesseract OCR + BioBERT Named Entity Recognition',
      backend: 'FastAPI (Python) + Async Worker Queue',
      role: 'NLP & Full-Stack Engineer',
    },
    problem:
      'Clinical reports, laboratory printouts, and prescriptions are commonly delivered as unformatted paper scans, complicating rapid review, longitudinal tracking, and drug-interaction verification.',
    whatIBuilt: [
      'Built a document ingestion pipeline preprocessing scanned prescription images via OpenCV (denoising, binarization, deskewing).',
      'Applied OCR to digitize alphanumeric characters, followed by a fine-tuned BioBERT model extracting medical entities.',
      'Structured extracted biomarker values, reference ranges, and dosages into clean schema-validated JSON payloads.',
      'Developed a React review dashboard presenting side-by-side document views and automated out-of-range value highlights.',
    ],
    results: [
      'TODO: add verified metrics (accuracy, latency, memory footprint)',
    ],
    architectureDiagram: [
      { name: 'Scanned PDF', label: 'DOCUMENT STREAM', type: 'sensor' },
      { name: 'OpenCV', label: 'IMAGE PREPROCESS', type: 'mcu' },
      { name: 'BioBERT', label: 'ENTITY EXTRACTION', type: 'ml' },
      { name: 'FastAPI', label: 'SCHEMA PARSER', type: 'cloud' },
      { name: 'React', label: 'CLINICIAN VIEW', type: 'dashboard' },
    ],
  },
  {
    project: projects[6], // AI Farmer Query System
    datasheetId: 'DS-007',
    statusTag: 'DEPLOYED',
    filterCategories: ['FULL-STACK'],
    spec: {
      mcu: 'Mobile PWA Client Node',
      sensors: 'Voice Input / Audio Stream / Multilingual Text',
      protocol: 'HTTPS / REST API / Vector DB Query',
      mlModel: 'Sentence Transformers / Semantic Similarity Embeddings',
      backend: 'FastAPI (Python) + Agronomy Vector Knowledge Base',
      role: 'AI & Full-Stack Developer',
    },
    problem:
      'Smallholder farmers often lack access to timely agronomic advisories, pest control strategies, and crop management guidelines in their local language without navigating complex technical documentation.',
    whatIBuilt: [
      'Engineered an intuitive natural language query interface accepting colloquial and voice-transcribed farmer inputs.',
      'Implemented semantic similarity search over a curated agronomic knowledge base using sentence transformer embeddings.',
      'Built a FastAPI service delivering contextual remedies, seasonal crop management advice, and localized disease alerts.',
      'Constructed a lightweight mobile-friendly React frontend optimized for low-bandwidth rural cellular networks.',
    ],
    results: [
      'TODO: add verified metrics (accuracy, latency, memory footprint)',
    ],
    architectureDiagram: [
      { name: 'Farmer Voice', label: 'QUERY INPUT', type: 'sensor' },
      { name: 'PWA Client', label: 'REQUEST PARSER', type: 'mcu' },
      { name: 'Embeddings', label: 'INTENT CLASSIFIER', type: 'ml' },
      { name: 'Vector Store', label: 'AGRONOMY DB', type: 'cloud' },
      { name: 'Mobile UI', label: 'ACTION STEPS', type: 'dashboard' },
    ],
  },
  {
    project: projects[7], // Medical Image Processing
    datasheetId: 'DS-008',
    statusTag: 'DEPLOYED',
    filterCategories: ['EDGE-ML'],
    spec: {
      mcu: 'GPU Acceleration Compute Workstation',
      sensors: 'DICOM / NIfTI MRI Slices & Chest Radiograph Arrays',
      protocol: 'Local HDF5 / NumPy Array Streaming',
      mlModel: 'Encoder-Decoder U-Net + Deep CNN Classifiers',
      backend: 'TensorFlow / Keras + OpenCV + Python',
      role: 'Deep Learning Research Engineer',
    },
    problem:
      'Manual delineation of brain tumor boundaries from multi-parametric MRI scans is time-intensive and subject to inter-observer variability, highlighting the need for reproducible semantic segmentation models.',
    whatIBuilt: [
      'Implemented a U-Net architecture featuring skip connections to preserve high-resolution spatial features for tumor boundary delineation.',
      'Applied image augmentation and intensity normalization across multi-modal MRI scans (T1, T2, FLAIR).',
      'Engineered a CNN classifier for detecting pathological features in chest radiography datasets.',
      'Rendered overlaid colored contour masks on MRI slices for clear anatomical verification.',
    ],
    results: [
      'TODO: add verified metrics (accuracy, latency, memory footprint)',
    ],
    architectureDiagram: [
      { name: 'MRI Array', label: 'DICOM PIXELS', type: 'sensor' },
      { name: 'Preprocess', label: 'NORMALIZATION', type: 'mcu' },
      { name: 'U-Net CNN', label: 'SEGMENTATION', type: 'ml' },
      { name: 'Tensors', label: 'MASK EXTRACTION', type: 'cloud' },
      { name: 'Viewer', label: 'OVERLAY HEATMAP', type: 'dashboard' },
    ],
  },
  {
    project: projects[8], // RailDesk AI
    datasheetId: 'DS-009',
    statusTag: 'IN PROGRESS',
    filterCategories: ['FULL-STACK'],
    spec: {
      mcu: 'SaaS Cloud Server Node',
      sensors: 'Passenger Portal Webhook / PNR Status Stream',
      protocol: 'WebSockets / HTTPS / SMS Notification Gateway',
      mlModel: 'NLP Classification & Urgency Ranking (Scikit-Learn)',
      backend: 'FastAPI + PostgreSQL + SQLAlchemy Async',
      role: 'Full-Stack SaaS & ML Developer',
    },
    problem:
      'High-volume railway passenger grievances (cleanliness, mechanical failures, ticketing, emergency assistance) face delayed routing and manual triage, resulting in breached service level agreements (SLAs).',
    whatIBuilt: [
      'Designed a full-stack ticketing platform accepting passenger reports with automatic PNR validation and attachment uploads.',
      'Implemented an NLP classifier evaluating complaint urgency and automatically assigning tickets to relevant railway divisions.',
      'Built real-time agent workspaces with WebSocket status synchronization and resolution audit logging in PostgreSQL.',
      'Integrated SMS and email alert dispatchers notifying passengers of ticket progress in real time.',
    ],
    results: [
      'TODO: add verified metrics (accuracy, latency, memory footprint)',
    ],
    architectureDiagram: [
      { name: 'Passenger', label: 'GRIEVANCE PORTAL', type: 'sensor' },
      { name: 'FastAPI', label: 'SESSION GATEWAY', type: 'mcu' },
      { name: 'NLP Router', label: 'URGENCY TRIAGE', type: 'ml' },
      { name: 'PostgreSQL', label: 'TICKET DATABASE', type: 'cloud' },
      { name: 'Agent HUD', label: 'OPERATIONS DESK', type: 'dashboard' },
    ],
  },
  {
    project: projects[9], // ESP32 + Firebase Real-Time IoT Dashboard
    datasheetId: 'DS-010',
    statusTag: 'DEPLOYED',
    filterCategories: ['EMBEDDED', 'FULL-STACK'],
    spec: {
      mcu: 'ESP32 Wi-Fi Node (C++ / ESP-IDF)',
      sensors: 'DHT22 Temperature & Humidity / Analog Voltage Pins',
      protocol: 'Firebase WebSocket API / JSON Realtime DB',
      mlModel: 'Rolling Median Filter & Outlier Clamp Algorithm',
      backend: 'Firebase Realtime NoSQL Database',
      role: 'IoT Firmware & Frontend Developer',
    },
    problem:
      'Standard IoT monitoring dashboards frequently rely on polling-heavy architectures that introduce latency, consume excessive cloud bandwidth, and fail to immediately notify operators of threshold breaches.',
    whatIBuilt: [
      'Authored robust ESP32 C++ firmware reading ambient environmental sensors with exponential smoothing noise reduction.',
      'Utilized Firebase Realtime Database WebSockets for bidirectional low-latency data streaming.',
      'Constructed a React dashboard subscribing to live JSON changes and updating gauge meters and time-series plots smoothly.',
      'Implemented client-side threshold trigger alerts with visual alarms when readings exceed safe operating parameters.',
    ],
    results: [
      'TODO: add verified metrics (accuracy, latency, memory footprint)',
    ],
    architectureDiagram: [
      { name: 'DHT22 / ADC', label: 'TELEMETRY SENSOR', type: 'sensor' },
      { name: 'ESP32', label: 'C++ FIRMWARE', type: 'mcu' },
      { name: 'Filter Alg', label: 'SIGNAL SMOOTHING', type: 'ml' },
      { name: 'Firebase RTDB', label: 'WEBSOCKET CLOUD', type: 'cloud' },
      { name: 'React', label: 'REALTIME GAUGES', type: 'dashboard' },
    ],
  },
];
