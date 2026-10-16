const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');
const baseHtmlPath = path.join(distDir, 'index.html');

if (!fs.existsSync(baseHtmlPath)) {
  console.error('dist/index.html not found. Run vite build first.');
  process.exit(1);
}

const baseHtml = fs.readFileSync(baseHtmlPath, 'utf8');

const routes = [
  {
    path: '/',
    title: 'Vinesh Shanmugam | ECE Student · Embedded AI & IoT',
    description: 'Portfolio of Vinesh Shanmugam — ECE Student · Embedded AI & IoT. Also builds full-stack dashboards.',
    heading: 'Vinesh Shanmugam',
    bodyText: 'ECE Student · Embedded AI & IoT. Also builds full-stack dashboards. Building and evaluating applied engineering projects across embedded intelligence, sensor telemetry, edge machine learning, and full-stack software.',
  },
  {
    path: '/projects',
    title: 'Projects | Vinesh Shanmugam',
    description: 'Technical projects in Embedded AI, IoT, Edge ML, Computer Vision, and Full-Stack systems by Vinesh Shanmugam.',
    heading: 'Projects',
    bodyText: 'Applied engineering projects across embedded intelligence, sensor telemetry, edge machine learning, and full-stack software.',
  },
  {
    path: '/about',
    title: 'About | Vinesh Shanmugam',
    description: 'Background, technical skills, and education of Vinesh Shanmugam — ECE student in Embedded AI & IoT.',
    heading: 'About',
    bodyText: 'Electronics & Communication Engineering student who builds intelligent, cloud-connected hardware-software systems spanning embedded devices, AI/ML, and full-stack web applications.',
  },
  {
    path: '/experience',
    title: 'Experience | Vinesh Shanmugam',
    description: 'Work history, internships, and engineering experience of Vinesh Shanmugam.',
    heading: 'Experience',
    bodyText: 'Wireless Communication Engineering Intern at BSNL (Bharat Sanchar Nigam Limited). Hands-on exposure to wireless communication infrastructure.',
  },
  {
    path: '/contact',
    title: 'Contact | Vinesh Shanmugam',
    description: 'Get in touch with Vinesh Shanmugam for engineering roles, project collaboration, or technical inquiries.',
    heading: 'Contact',
    bodyText: 'Contact Vinesh Shanmugam via email at shanmugamvinesh75@gmail.com, LinkedIn, or GitHub.',
  },
  {
    path: '/projects/tinyml-human-activity-and-fall-detection',
    title: 'TinyML Human Activity & Fall Detection | Vinesh Shanmugam',
    description: 'An ESP32-based intelligent motion monitoring system that collects accelerometer data and uses machine learning for human activity recognition and fall detection.',
    heading: 'TinyML Human Activity & Fall Detection',
    bodyText: 'Collects raw accelerometer data via ESP32, performs signal processing and feature extraction, trains an ML model using scikit-learn and TensorFlow, and streams results to a Firebase dashboard for real-time monitoring.',
  },
  {
    path: '/projects/pancreasense-ai',
    title: 'PancreaSense AI | Vinesh Shanmugam',
    description: 'A research prototype AI-powered healthcare platform combining sensor data, machine learning and a modern web dashboard for intelligent health-risk screening — not a medically validated diagnostic system.',
    heading: 'PancreaSense AI',
    bodyText: 'Research prototype healthcare platform combining sensor data, machine learning and a modern web dashboard for intelligent health-risk screening — not a medically validated diagnostic system.',
  },
  {
    path: '/projects/smartwatts',
    title: 'SmartWatts | Vinesh Shanmugam',
    description: 'An intelligent electricity monitoring platform for real-time energy consumption monitoring, analytics, anomaly detection and actionable energy insights.',
    heading: 'SmartWatts',
    bodyText: 'ESP32 reads energy sensor data and pushes it to Firebase via MQTT. A React frontend displays real-time dashboards. AI module detects anomalies in consumption patterns.',
  },
  {
    path: '/projects/transit-assist',
    title: 'Transit Assist | Vinesh Shanmugam',
    description: 'An intelligent transportation assistance concept using computer vision and real-time information to support navigation and accessibility for commuters.',
    heading: 'Transit Assist',
    bodyText: 'Uses object detection and map APIs to assist users in navigating transit systems. Designed with accessibility in mind.',
  },
  {
    path: '/projects/devopsguard',
    title: 'DevOpsGuard | Vinesh Shanmugam',
    description: 'A DevOps-focused platform designed to help identify and manage problems across development and deployment workflows.',
    heading: 'DevOpsGuard',
    bodyText: 'Monitors CI/CD pipelines, detects anomalies, and surfaces actionable insights. Built with FastAPI, Docker, and GitHub integrations.',
  },
  {
    path: '/projects/ai-medical-report-and-prescription-analyzer',
    title: 'AI Medical Report & Prescription Analyzer | Vinesh Shanmugam',
    description: 'An AI-assisted tool for analyzing medical reports and prescriptions using NLP and machine learning — a research prototype, not a medical device.',
    heading: 'AI Medical Report & Prescription Analyzer',
    bodyText: 'Processes uploaded medical documents using NLP models to extract structured information and provide AI-assisted summaries for review. Research prototype, not a medical device.',
  },
  {
    path: '/projects/ai-farmer-query-and-advisory-system',
    title: 'AI Farmer Query & Advisory System | Vinesh Shanmugam',
    description: 'An AI-powered advisory system for farmers that answers agricultural queries and provides recommendations using NLP.',
    heading: 'AI Farmer Query & Advisory System',
    bodyText: 'Farmers can query the system in natural language. The AI backend processes questions and returns relevant agricultural advice and recommendations.',
  },
  {
    path: '/projects/medical-image-processing',
    title: 'Medical Image Processing | Vinesh Shanmugam',
    description: 'A suite of computer vision projects including brain tumor segmentation and chest X-ray classification using deep learning.',
    heading: 'Medical Image Processing',
    bodyText: 'Implements U-Net-style segmentation for brain MRI and CNN-based classification for chest X-ray datasets. Research-grade implementations.',
  },
  {
    path: '/projects/raildesk-ai',
    title: 'RailDesk AI | Vinesh Shanmugam',
    description: 'A railway-focused helpdesk and ticketing platform with AI assistance, designed to streamline railway customer support workflows.',
    heading: 'RailDesk AI',
    bodyText: 'Full-stack SaaS application with AI-assisted ticket routing, status tracking, and support automation for railway customer service.',
  },
  {
    path: '/projects/esp32-firebase-real-time-iot-dashboard',
    title: 'ESP32 + Firebase Real-Time IoT Dashboard | Vinesh Shanmugam',
    description: 'A real-time IoT monitoring dashboard integrating ESP32 microcontroller sensor data with Firebase for live data visualization.',
    heading: 'ESP32 + Firebase Real-Time IoT Dashboard',
    bodyText: 'ESP32 collects sensor readings and pushes them to Firebase Realtime Database. The React dashboard subscribes to live updates for real-time display.',
  },
];

const SITE_URL = 'https://vinesh-portfolio-website.vercel.app';

for (const route of routes) {
  const pageUrl = `${SITE_URL}${route.path === '/' ? '' : route.path}`;

  let html = baseHtml
    .replace(/<title>.*?<\/title>/, `<title>${route.title}</title>`)
    .replace(/<meta\s+name="description"\s+content=".*?"\s*\/>/, `<meta name="description" content="${route.description}" />`)
    .replace(/<meta\s+property="og:title"\s+content=".*?"\s*\/>/, `<meta property="og:title" content="${route.title}" />`)
    .replace(/<meta\s+property="og:description"\s+content=".*?"\s*\/>/, `<meta property="og:description" content="${route.description}" />`)
    .replace(/<meta\s+property="og:url"\s+content=".*?"\s*\/>/, `<meta property="og:url" content="${pageUrl}" />`)
    .replace(/<meta\s+name="twitter:title"\s+content=".*?"\s*\/>/, `<meta name="twitter:title" content="${route.title}" />`)
    .replace(/<meta\s+name="twitter:description"\s+content=".*?"\s*\/>/, `<meta name="twitter:description" content="${route.description}" />`)
    .replace(/<meta\s+name="twitter:url"\s+content=".*?"\s*\/>/, `<meta name="twitter:url" content="${pageUrl}" />`)
    .replace(/<link\s+rel="canonical"\s+href=".*?"\s*\/>/, `<link rel="canonical" href="${pageUrl}" />`);

  // In root container, inject semantic fallback content for this specific route
  const fallbackContent = `
      <div style="min-height: 100vh; background-color: #FFFFFF; color: #111827; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 2rem; font-family: 'Inter', system-ui, -apple-system, sans-serif; text-align: center;">
        <h1 style="font-size: 2.25rem; font-weight: 600; margin-bottom: 0.5rem; color: #111827;">${route.heading}</h1>
        <p style="max-width: 650px; color: #4B5563; line-height: 1.6; margin-bottom: 2rem;">
          ${route.bodyText}
        </p>
        <nav aria-label="Static Navigation" style="display: flex; gap: 1.5rem; flex-wrap: wrap; justify-content: center;">
          <a href="/" style="color: #1D4ED8; text-decoration: underline;">Home</a>
          <a href="/projects" style="color: #1D4ED8; text-decoration: underline;">Projects</a>
          <a href="/about" style="color: #1D4ED8; text-decoration: underline;">About</a>
          <a href="/experience" style="color: #1D4ED8; text-decoration: underline;">Experience</a>
          <a href="/contact" style="color: #1D4ED8; text-decoration: underline;">Contact</a>
          <a href="/resume.pdf" download="Vinesh_Shanmugam_Resume.pdf" style="color: #1D4ED8; text-decoration: underline;">Resume (PDF)</a>
        </nav>
      </div>`;

  html = html.replace(/<div id="root">[\s\S]*?<\/div>\s*<!-- Noscript/, `<div id="root">${fallbackContent}\n    </div>\n\n    <!-- Noscript`);

  if (route.path === '/') {
    fs.writeFileSync(baseHtmlPath, html, 'utf8');
  } else {
    const routeDir = path.join(distDir, route.path.slice(1));
    if (!fs.existsSync(routeDir)) {
      fs.mkdirSync(routeDir, { recursive: true });
    }
    fs.writeFileSync(path.join(routeDir, 'index.html'), html, 'utf8');
  }
}

console.log(`Successfully prerendered ${routes.length} static routes in dist/`);
