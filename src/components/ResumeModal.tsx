import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Download, ExternalLink, FileText, CheckCircle, GraduationCap, Briefcase, Code, Sparkles } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/80 backdrop-blur-md"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', duration: 0.4 }}
        className="glass-card w-full max-w-4xl max-h-[90vh] overflow-y-auto no-scrollbar border-primary/40 shadow-[0_0_50px_rgba(0,212,255,0.15)] flex flex-col"
      >
        {/* Modal Top Bar */}
        <div className="sticky top-0 bg-bg-secondary/95 backdrop-blur-md px-6 py-4 border-b border-border-subtle flex items-center justify-between z-20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
              <FileText size={16} />
            </div>
            <div>
              <h2 id="resume-modal-title" className="text-base font-bold text-text-bright">
                Vinesh Shanmugam — Official Resume
              </h2>
              <p className="font-mono text-[10px] text-text-muted">
                ECE Engineer · AI/ML · Embedded Systems · IoT · Full-Stack
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/Vinesh_Shanmugam_Resume.pdf"
              download="Vinesh_Shanmugam_Resume.pdf"
              className="btn-primary text-xs py-1.5 px-3 flex items-center gap-1.5 shadow-glow-sm"
              title="Download PDF Resume"
            >
              <Download size={13} />
              <span>Download PDF</span>
            </a>
            <a
              href="/Vinesh_Shanmugam_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline text-xs py-1.5 px-3 hidden sm:flex items-center gap-1.5"
              title="Open in new browser tab"
            >
              <ExternalLink size={13} />
              <span>Open PDF</span>
            </a>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg border border-border-subtle text-text-muted hover:text-text-primary hover:border-primary/40 transition-colors ml-1"
              aria-label="Close resume preview"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Resume Content Body */}
        <div className="p-6 md:p-8 space-y-8 bg-bg-primary/60 text-text-primary text-sm font-sans leading-relaxed">
          {/* Header Block */}
          <div className="text-center pb-6 border-b border-border-subtle">
            <h1 className="text-2xl md:text-3xl font-black text-text-bright tracking-tight">
              VINESH SHANMUGAM
            </h1>
            <p className="font-mono text-xs text-primary font-semibold tracking-widest mt-1 uppercase">
              ECE ENGINEER · AI/ML · EMBEDDED SYSTEMS · IoT · FULL-STACK DEVELOPMENT
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 font-mono text-xs text-text-muted mt-2">
              <a href="mailto:shanmugamvinesh75@gmail.com" className="hover:text-primary transition-colors">
                shanmugamvinesh75@gmail.com
              </a>
              <span>·</span>
              <a href="https://github.com/Vinzz006" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                github.com/Vinzz006
              </a>
              <span>·</span>
              <a href="https://www.linkedin.com/in/vinesh-shanmugam-109215363" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                linkedin.com/in/vinesh-shanmugam-109215363
              </a>
              <span>·</span>
              <span>+91 63851 07219</span>
              <span>·</span>
              <span>Chennai, Tamil Nadu</span>
            </div>
          </div>

          {/* Summary */}
          <div>
            <h3 className="font-mono text-xs font-bold text-text-bright tracking-wider uppercase flex items-center gap-2 mb-2 pb-1 border-b border-border-subtle">
              <Sparkles size={13} className="text-primary" />
              Summary
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed">
              Electronics & Communication Engineering student who builds intelligent, cloud-connected hardware-software systems spanning embedded devices, AI/ML, and full-stack web applications. Experienced in developing ESP32-based sensing pipelines, training and deploying machine learning models, and building REST APIs and React dashboards that turn real-world sensor data into actionable insight.
            </p>
          </div>

          {/* Technical Skills */}
          <div>
            <h3 className="font-mono text-xs font-bold text-text-bright tracking-wider uppercase flex items-center gap-2 mb-3 pb-1 border-b border-border-subtle">
              <Code size={13} className="text-primary" />
              Technical Skills
            </h3>
            <div className="grid md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-bg-secondary border border-border-subtle">
                <span className="font-mono font-semibold text-text-bright">Programming: </span>
                <span className="text-text-secondary">Python, Java, C, C++, JavaScript, TypeScript, SQL</span>
              </div>
              <div className="p-3 rounded-lg bg-bg-secondary border border-border-subtle">
                <span className="font-mono font-semibold text-text-bright">AI / Machine Learning: </span>
                <span className="text-text-secondary">TensorFlow, PyTorch, Scikit-learn, OpenCV, Pandas, NumPy, Hugging Face, Computer Vision, TinyML</span>
              </div>
              <div className="p-3 rounded-lg bg-bg-secondary border border-border-subtle">
                <span className="font-mono font-semibold text-text-bright">Embedded Systems / IoT: </span>
                <span className="text-text-secondary">ESP32, ESP8266, Arduino, Sensors, I2C, UART, GPIO, MQTT</span>
              </div>
              <div className="p-3 rounded-lg bg-bg-secondary border border-border-subtle">
                <span className="font-mono font-semibold text-text-bright">Frontend: </span>
                <span className="text-text-secondary">React, TypeScript, Vite, Tailwind CSS, Chart.js, Recharts</span>
              </div>
              <div className="p-3 rounded-lg bg-bg-secondary border border-border-subtle">
                <span className="font-mono font-semibold text-text-bright">Backend & Cloud: </span>
                <span className="text-text-secondary">FastAPI, Flask, Node.js, REST APIs, WebSockets, Firebase, PostgreSQL, SQLAlchemy</span>
              </div>
              <div className="p-3 rounded-lg bg-bg-secondary border border-border-subtle">
                <span className="font-mono font-semibold text-text-bright">DevOps / Tools: </span>
                <span className="text-text-secondary">Git, GitHub, Docker, CI/CD, Vercel, Render, VS Code, Arduino IDE, Google Colab</span>
              </div>
            </div>
          </div>

          {/* Projects */}
          <div>
            <h3 className="font-mono text-xs font-bold text-text-bright tracking-wider uppercase flex items-center gap-2 mb-3 pb-1 border-b border-border-subtle">
              <Sparkles size={13} className="text-primary" />
              Key Projects
            </h3>
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-bg-secondary border border-border-subtle">
                <div className="flex flex-wrap items-baseline justify-between gap-1 mb-1">
                  <h4 className="font-bold text-text-bright text-sm">TinyML-Based Human Activity & Fall Detection</h4>
                  <span className="font-mono text-[10px] text-primary">ESP32 · Python · Scikit-learn · TensorFlow · TinyML · Firebase</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-text-secondary mt-2">
                  <li>Designed an end-to-end embedded AI pipeline acquiring accelerometer motion data on an ESP32, applying signal processing and feature extraction to classify activity and detect falls in real time.</li>
                  <li>Trained and evaluated a TinyML model using Scikit-learn & TensorFlow, optimized for on-device inference on resource-constrained hardware.</li>
                  <li>Integrated ESP32 sensing node with Firebase to stream classification results to a cloud dashboard for real-time monitoring.</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-bg-secondary border border-border-subtle">
                <div className="flex flex-wrap items-baseline justify-between gap-1 mb-1">
                  <h4 className="font-bold text-text-bright text-sm">PancreaSense AI</h4>
                  <span className="font-mono text-[10px] text-primary">React · TypeScript · FastAPI · PostgreSQL · ESP32 · ML · SHAP</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-text-secondary mt-2">
                  <li>Built a research-prototype healthcare platform combining ESP32 sensor acquisition with FastAPI and PostgreSQL.</li>
                  <li>Implemented a machine learning risk-assessment model with SHAP-based explainability for interpretable screening insights.</li>
                  <li>Developed a modern React & TypeScript dashboard visualizing health risk indicators and explainability charts.</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-bg-secondary border border-border-subtle">
                <div className="flex flex-wrap items-baseline justify-between gap-1 mb-1">
                  <h4 className="font-bold text-text-bright text-sm">SmartWatts — IoT Energy Monitoring Platform</h4>
                  <span className="font-mono text-[10px] text-primary">ESP32 · Firebase · React · FastAPI · Machine Learning</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-text-secondary mt-2">
                  <li>Engineered a cloud-connected IoT system collecting real-time power consumption metrics on ESP32 nodes streamed to Firebase.</li>
                  <li>Built a FastAPI backend & React analytics dashboard detecting anomalous usage patterns with AI recommendations.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div>
            <h3 className="font-mono text-xs font-bold text-text-bright tracking-wider uppercase flex items-center gap-2 mb-3 pb-1 border-b border-border-subtle">
              <Briefcase size={13} className="text-primary" />
              Experience
            </h3>
            <div className="p-4 rounded-xl bg-bg-secondary border border-border-subtle">
              <div className="flex flex-wrap items-baseline justify-between gap-1 mb-1">
                <h4 className="font-bold text-text-bright text-sm">Wireless Communication Engineering Intern</h4>
                <span className="font-mono text-xs text-text-muted">BSNL (Bharat Sanchar Nigam Limited)</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-text-secondary mt-2 text-xs">
                <li>Gained hands-on exposure to wireless communication infrastructure at a major telecom service provider, including cellular network architecture, base station equipment, and signal transmission systems.</li>
                <li>Assisted in monitoring signal quality, network performance, and studied RF propagation & GSM/LTE fundamentals in a live telecom environment.</li>
              </ul>
            </div>
          </div>

          {/* Education */}
          <div>
            <h3 className="font-mono text-xs font-bold text-text-bright tracking-wider uppercase flex items-center gap-2 mb-3 pb-1 border-b border-border-subtle">
              <GraduationCap size={13} className="text-primary" />
              Education
            </h3>
            <div className="p-4 rounded-xl bg-bg-secondary border border-border-subtle flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <h4 className="font-bold text-text-bright text-sm">Bachelor of Engineering (B.E.) in Electronics & Communication Engineering</h4>
                <p className="text-text-secondary text-xs mt-0.5">Meenakshi Sundararajan Engineering College, Chennai, Tamil Nadu</p>
              </div>
              <span className="font-mono text-xs text-primary font-semibold">2024 – 2028</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-bg-secondary/95 backdrop-blur-md px-6 py-4 border-t border-border-subtle flex items-center justify-between z-20">
          <span className="font-mono text-xs text-text-muted flex items-center gap-1.5">
            <CheckCircle size={14} className="text-accent-green" />
            Verified Engineering Resume
          </span>
          <div className="flex items-center gap-3">
            <a
              href="/Vinesh_Shanmugam_Resume.pdf"
              download="Vinesh_Shanmugam_Resume.pdf"
              className="btn-primary text-xs py-2 px-4 flex items-center gap-2 shadow-glow-sm"
            >
              <Download size={14} />
              Download Official PDF
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
