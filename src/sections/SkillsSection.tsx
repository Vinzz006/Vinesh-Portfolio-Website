import { useState } from 'react';
import { Terminal, Table, CheckCircle2, Cpu, Code2, Brain, Globe, Wrench } from 'lucide-react';

type SkillCategoryKey = 'languages' | 'hardware' | 'mledge' | 'web' | 'tools';

interface SkillRegister {
  addr: string;
  name: string;
  role: string;
  level: string;
  fileSize: string;
  usedInProjects: string[];
}

interface CategorySpec {
  id: SkillCategoryKey;
  label: string;
  path: string;
  icon: typeof Code2;
  skills: SkillRegister[];
}

const CATEGORIES: CategorySpec[] = [
  {
    id: 'languages',
    label: 'Languages',
    path: '/usr/bin/languages',
    icon: Code2,
    skills: [
      { addr: '0x01', name: 'Python', role: 'ML, Data Pipelines & FastAPI', level: 'CORE', fileSize: '3.11.8', usedInProjects: ['DS-001', 'DS-002', 'DS-003', 'DS-005', 'DS-006', 'DS-007', 'DS-008'] },
      { addr: '0x02', name: 'C', role: 'Microcontroller Firmware & Drivers', level: 'FIRMWARE', fileSize: 'C99/C11', usedInProjects: ['DS-001', 'DS-003', 'DS-010'] },
      { addr: '0x03', name: 'C++', role: 'Embedded OOP, ESP-IDF & FreeRTOS', level: 'FIRMWARE', fileSize: 'C++17', usedInProjects: ['DS-001', 'DS-003', 'DS-010'] },
      { addr: '0x04', name: 'TypeScript', role: 'Type-Safe Full-Stack Dashboards', level: 'CORE', fileSize: '5.8.0', usedInProjects: ['DS-001', 'DS-002', 'DS-003', 'DS-009', 'DS-010'] },
      { addr: '0x05', name: 'JavaScript', role: 'Client UI DOM & Asynchronous Logic', level: 'STANDARD', fileSize: 'ES2024', usedInProjects: ['DS-001', 'DS-002', 'DS-003', 'DS-009', 'DS-010'] },
      { addr: '0x06', name: 'SQL', role: 'Relational Schema & Aggregations', level: 'DATA', fileSize: 'ANSI', usedInProjects: ['DS-002', 'DS-005', 'DS-009'] },
      { addr: '0x07', name: 'Java', role: 'Object-Oriented Architecture', level: 'ACADEMIC', fileSize: 'JDK21', usedInProjects: ['ECE Academics'] },
    ],
  },
  {
    id: 'hardware',
    label: 'Hardware',
    path: '/dev/hardware_bus',
    icon: Cpu,
    skills: [
      { addr: '0x10', name: 'ESP32 (WROOM/S3)', role: '240MHz Dual-Core Microcontroller Hub', level: 'HARDWARE', fileSize: '240MHz', usedInProjects: ['DS-001', 'DS-002', 'DS-003', 'DS-010'] },
      { addr: '0x11', name: 'ESP8266', role: 'Wi-Fi Embedded Edge Node', level: 'HARDWARE', fileSize: '80MHz', usedInProjects: ['IoT Sensors'] },
      { addr: '0x12', name: 'Arduino Platform', role: 'Hardware Prototyping & Flashing', level: 'HARDWARE', fileSize: 'AVR/SAMD', usedInProjects: ['Sensor Tests'] },
      { addr: '0x13', name: 'I2C Bus Protocol', role: 'Two-Wire Serial Sensor Bus (400kHz)', level: 'BUS_IF', fileSize: '400kHz', usedInProjects: ['DS-001', 'DS-003', 'DS-010'] },
      { addr: '0x14', name: 'SPI Bus Protocol', role: 'High-Speed 4-Wire Master/Slave Bus', level: 'BUS_IF', fileSize: '20MHz', usedInProjects: ['Display IO'] },
      { addr: '0x15', name: 'UART Interface', role: 'Serial Telemetry & Debug Logging', level: 'BUS_IF', fileSize: '115.2k', usedInProjects: ['DS-001', 'DS-003', 'DS-010'] },
      { addr: '0x16', name: 'GPIO & 12-bit ADC', role: 'Analog Signal Conditioning & Pin IO', level: 'LOW_LVL', fileSize: '12-bit', usedInProjects: ['DS-001', 'DS-003', 'DS-010'] },
      { addr: '0x17', name: 'MPU6050 & CT Sensors', role: 'Tri-axial Accelerometers & Current Transformers', level: 'SENSORS', fileSize: '50Hz SPS', usedInProjects: ['DS-001', 'DS-003'] },
      { addr: '0x18', name: 'MQTT Protocol', role: 'Lightweight IoT Telemetry (QoS 1)', level: 'NETWORK', fileSize: 'TCP:1883', usedInProjects: ['DS-003'] },
      { addr: '0x19', name: 'FreeRTOS Multitasking', role: 'Preemptive Real-Time Task Queues', level: 'RTOS', fileSize: 'v10.5', usedInProjects: ['DS-001', 'DS-003'] },
    ],
  },
  {
    id: 'mledge',
    label: 'ML/Edge',
    path: '/opt/models/edge_inference',
    icon: Brain,
    skills: [
      { addr: '0x20', name: 'TinyML Edge AI', role: 'On-Device Quantized Microcontroller Inference', level: 'EDGE_AI', fileSize: '38KB INT8', usedInProjects: ['DS-001'] },
      { addr: '0x21', name: 'TensorFlow / TFLite', role: 'Model Training & Microcontroller Quantization', level: 'FRAMEWORK', fileSize: 'v2.16', usedInProjects: ['DS-001', 'DS-008'] },
      { addr: '0x22', name: 'PyTorch', role: 'Deep Learning & Neural Network Research', level: 'FRAMEWORK', fileSize: 'v2.2', usedInProjects: ['Research Nodes'] },
      { addr: '0x23', name: 'Scikit-learn', role: 'Classifiers, Ensembles & Dimensionality Reduction', level: 'CORE_ML', fileSize: 'v1.4', usedInProjects: ['DS-001', 'DS-002', 'DS-003', 'DS-009'] },
      { addr: '0x24', name: 'OpenCV', role: 'Computer Vision & Edge Image Processing', level: 'VISION', fileSize: 'v4.9', usedInProjects: ['DS-004', 'DS-006', 'DS-008'] },
      { addr: '0x25', name: 'SHAP Explainability', role: 'Feature Attribution & Interpretable AI Scoring', level: 'XAI', fileSize: 'TreeSHAP', usedInProjects: ['DS-002'] },
      { addr: '0x26', name: 'Hugging Face', role: 'Transformer Embeddings & Tokenizers', level: 'NLP', fileSize: 'Transformers', usedInProjects: ['DS-006', 'DS-007'] },
      { addr: '0x27', name: 'Pandas & NumPy', role: 'Time-Series Matrix Manipulation & FFT', level: 'NUMERICAL', fileSize: 'v2.2', usedInProjects: ['DS-001', 'DS-002', 'DS-003'] },
      { addr: '0x28', name: 'INT8 Post-Training Quant', role: 'FP32 to 8-Bit Integer Weight Compression', level: 'OPTIMIZATION', fileSize: '4x Shrink', usedInProjects: ['DS-001'] },
    ],
  },
  {
    id: 'web',
    label: 'Web',
    path: '/var/www/fullstack',
    icon: Globe,
    skills: [
      { addr: '0x30', name: 'React 19', role: 'Component-Driven Dashboard Architecture', level: 'FRONTEND', fileSize: 'v19.2', usedInProjects: ['DS-001', 'DS-002', 'DS-003', 'DS-009', 'DS-010'] },
      { addr: '0x31', name: 'FastAPI (Python)', role: 'Asynchronous Microservices & REST Gateways', level: 'BACKEND', fileSize: 'ASGI', usedInProjects: ['DS-002', 'DS-005', 'DS-006', 'DS-007', 'DS-009'] },
      { addr: '0x32', name: 'Tailwind CSS', role: 'Custom Hardware Console Design Systems', level: 'STYLING', fileSize: 'v3.4', usedInProjects: ['All Dashboards'] },
      { addr: '0x33', name: 'PostgreSQL', role: 'ACID Relational Storage & Session Records', level: 'DATABASE', fileSize: 'v16', usedInProjects: ['DS-002', 'DS-009'] },
      { addr: '0x34', name: 'SQLAlchemy', role: 'Async ORM Modeling & Migrations', level: 'BACKEND', fileSize: 'v2.0', usedInProjects: ['DS-002', 'DS-009'] },
      { addr: '0x35', name: 'WebSockets', role: 'Full-Duplex Real-Time Telemetry Streaming', level: 'TRANSPORT', fileSize: 'WSS', usedInProjects: ['DS-002', 'DS-009', 'DS-010'] },
      { addr: '0x36', name: 'Vite', role: 'Ultra-Fast Frontend Bundling & HMR', level: 'TOOLING', fileSize: 'v8.2', usedInProjects: ['All Frontends'] },
      { addr: '0x37', name: 'Recharts', role: 'High-Frequency Time-Series Data Plotting', level: 'VISUALIZATION', fileSize: 'SVG', usedInProjects: ['DS-001', 'DS-003', 'DS-010'] },
      { addr: '0x38', name: 'Node.js', role: 'Build Automation & CLI Utilities', level: 'RUNTIME', fileSize: 'v20 LTS', usedInProjects: ['Build Scripts'] },
    ],
  },
  {
    id: 'tools',
    label: 'Tools',
    path: '/usr/local/dev_tools',
    icon: Wrench,
    skills: [
      { addr: '0x40', name: 'Git & GitHub', role: 'Distributed Version Control & Workflows', level: 'VCS', fileSize: 'Git 2.44', usedInProjects: ['All Repos'] },
      { addr: '0x41', name: 'Docker', role: 'Containerized Testing & Microservice Isolation', level: 'DEVOPS', fileSize: 'Engine 26', usedInProjects: ['DS-005'] },
      { addr: '0x42', name: 'GitHub Actions CI/CD', role: 'Automated Build, Lint & Verification Pipelines', level: 'DEVOPS', fileSize: 'Workflows', usedInProjects: ['DS-005'] },
      { addr: '0x43', name: 'Firebase RTDB', role: 'Cloud JSON Telemetry Sync & Hosting', level: 'CLOUD', fileSize: 'NoSQL WSS', usedInProjects: ['DS-001', 'DS-003', 'DS-010'] },
      { addr: '0x44', name: 'Vercel & Render', role: 'Production Cloud Deployment Platforms', level: 'CLOUD', fileSize: 'Edge Server', usedInProjects: ['Portfolio', 'APIs'] },
      { addr: '0x45', name: 'ESP-IDF & Arduino IDE', role: 'Microcontroller Compilers & Serial Probes', level: 'IDE_EMBEDDED', fileSize: 'GCC Xtensa', usedInProjects: ['DS-001', 'DS-003', 'DS-010'] },
      { addr: '0x46', name: 'VS Code', role: 'Primary Development Environment', level: 'IDE', fileSize: 'IDE', usedInProjects: ['All Development'] },
      { addr: '0x47', name: 'Google Colab', role: 'Cloud GPU Model Training Workspaces', level: 'TRAINING', fileSize: 'Jupyter', usedInProjects: ['ML Training'] },
    ],
  },
];

export default function SkillsSection() {
  const [activeCategoryKey, setActiveCategoryKey] = useState<SkillCategoryKey>('languages');
  const [viewMode, setViewMode] = useState<'table' | 'terminal'>('table');
  const [searchQuery, setSearchQuery] = useState('');

  const currentCategory = CATEGORIES.find((c) => c.id === activeCategoryKey) || CATEGORIES[0];

  const displayedSkills = currentCategory.skills.filter((s) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      s.name.toLowerCase().includes(query) ||
      s.role.toLowerCase().includes(query) ||
      s.addr.toLowerCase().includes(query)
    );
  });

  return (
    <section
      id="skills"
      className="py-20 relative font-mono text-xs border-b border-console-border bg-[#060806]"
      aria-labelledby="skills-heading"
    >
      {/* Background Graticule */}
      <div className="absolute inset-0 graticule-grid opacity-20 pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="border border-console-border bg-[#0B0E0B] p-4 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs mb-1.5">
                <span className="text-phosphor font-bold">[03]</span>
                <span className="text-term-dim">//</span>
                <span className="text-term-muted uppercase">HARDWARE_REGISTERS // SKILL_MATRIX</span>
                <span className="text-term-dim">·</span>
                <span className="text-phosphor font-bold">48 VERIFIED REGISTERS</span>
              </div>
              <h2 id="skills-heading" className="text-2xl sm:text-3xl font-black text-term-bright tracking-tight uppercase">
                Technical Registers &amp; Pinout
              </h2>
              <p className="font-sans text-term-text text-sm mt-1 max-w-2xl">
                Categorized hardware pin table and system binary directory. Zero arbitrary progress bars or percentages.
              </p>
            </div>

            {/* View Mode Switcher: Pin Table vs Terminal ls */}
            <div className="flex items-center gap-1.5 p-1 border border-console-border bg-[#040504] self-start md:self-auto">
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-1 flex items-center gap-1.5 text-xs transition-all ${
                  viewMode === 'table'
                    ? 'border border-phosphor bg-phosphor/15 text-phosphor font-bold'
                    : 'border-transparent text-term-muted hover:text-term-bright'
                }`}
                title="View as Hardware Pin Table"
              >
                <Table size={13} />
                <span>PIN TABLE</span>
              </button>
              <button
                onClick={() => setViewMode('terminal')}
                className={`px-3 py-1 flex items-center gap-1.5 text-xs transition-all ${
                  viewMode === 'terminal'
                    ? 'border border-phosphor bg-phosphor/15 text-phosphor font-bold'
                    : 'border-transparent text-term-muted hover:text-term-bright'
                }`}
                title="View as Terminal ls Output"
              >
                <Terminal size={13} />
                <span>TERMINAL LS</span>
              </button>
            </div>
          </div>

          {/* Category Tabs: Languages / Hardware / ML/Edge / Web / Tools */}
          <div className="mt-5 pt-3 border-t border-console-border flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5" role="tablist" aria-label="Skill categories">
              {CATEGORIES.map((cat) => {
                const isSelected = activeCategoryKey === cat.id;
                const Icon = cat.icon;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategoryKey(cat.id)}
                    role="tab"
                    aria-selected={isSelected}
                    className={`px-3 py-1.5 border text-xs flex items-center gap-2 transition-all ${
                      isSelected
                        ? 'border-phosphor bg-phosphor/15 text-phosphor font-bold shadow-[0_0_8px_rgba(57,255,136,0.2)]'
                        : 'border-console-border bg-[#040504] text-term-muted hover:border-phosphor/40 hover:text-term-bright'
                    }`}
                  >
                    <Icon size={12} className={isSelected ? 'text-phosphor' : 'text-term-dim'} />
                    <span>{cat.label}</span>
                    <span className="text-[10px] opacity-75">[{cat.skills.length}]</span>
                  </button>
                );
              })}
            </div>

            {/* Quick Search */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-term-dim">grep:</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="search register..."
                className="bg-[#040504] border border-console-border px-2.5 py-1 text-xs text-term-bright placeholder-term-dim outline-none focus:border-phosphor w-36 sm:w-44"
              />
            </div>
          </div>
        </div>

        {/* View Mode 1: Hardware Pinout / Datasheet Register Table */}
        {viewMode === 'table' ? (
          <div className="console-panel border border-console-border bg-[#090C09] overflow-hidden">
            {/* Table Header Bar */}
            <div className="bg-[#0B0E0B] border-b border-console-border px-4 py-2.5 flex items-center justify-between text-[11px] text-term-muted">
              <div className="flex items-center gap-2">
                <span className="led-phosphor animate-pulse" />
                <span className="text-phosphor font-bold uppercase">
                  REGISTER_TABLE // {currentCategory.label.toUpperCase()}
                </span>
              </div>
              <span className="text-term-dim">ADDR_SPACE: {currentCategory.path}</span>
            </div>

            {/* Data Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-console-border bg-[#050705] text-[10px] text-term-dim uppercase tracking-wider">
                    <th className="py-2.5 px-4 w-20">ADDR</th>
                    <th className="py-2.5 px-4">PIN / SYMBOL</th>
                    <th className="py-2.5 px-4">FUNCTION / BUS ARCHITECTURE</th>
                    <th className="py-2.5 px-4 w-28">LEVEL</th>
                    <th className="py-2.5 px-4">VERIFIED IN PROJECTS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-console-border/70 font-mono">
                  {displayedSkills.map((skill) => (
                    <tr
                      key={skill.addr}
                      className="hover:bg-[#0E130E] transition-colors group"
                    >
                      {/* Register Address */}
                      <td className="py-2.5 px-4 text-phosphor font-bold">
                        {skill.addr}
                      </td>

                      {/* Symbol Name */}
                      <td className="py-2.5 px-4 font-bold text-term-bright group-hover:text-phosphor transition-colors">
                        {skill.name}
                      </td>

                      {/* Technical Role Description */}
                      <td className="py-2.5 px-4 text-term-text font-sans text-xs">
                        {skill.role}
                      </td>

                      {/* Classification Level */}
                      <td className="py-2.5 px-4">
                        <span className="text-[10px] px-1.5 py-0.5 border border-console-border bg-[#040504] text-term-muted font-bold">
                          {skill.level}
                        </span>
                      </td>

                      {/* Project Cross References */}
                      <td className="py-2.5 px-4">
                        <div className="flex flex-wrap gap-1">
                          {skill.usedInProjects.map((proj) => (
                            <span
                              key={proj}
                              className="text-[9px] px-1.5 py-0.5 border border-phosphor/30 bg-phosphor/5 text-phosphor"
                            >
                              {proj}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer Summary Bar */}
            <div className="border-t border-console-border px-4 py-2 bg-[#050705] flex items-center justify-between text-[10px] text-term-dim">
              <span>DISPLAYING {displayedSkills.length} OF {currentCategory.skills.length} REGISTERS</span>
              <span className="text-phosphor">STATUS: 100% OPERATIONAL // NO ERRORS</span>
            </div>
          </div>
        ) : (
          /* View Mode 2: Terminal `ls -la` Directory Output */
          <div className="console-panel border border-console-border bg-[#040504] p-4 sm:p-6 overflow-hidden">
            {/* Terminal Top Window Bar */}
            <div className="border-b border-console-border pb-3 mb-4 flex items-center justify-between text-xs text-term-muted">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#FF4D4D]" />
                <span className="w-2.5 h-2.5 bg-amber" />
                <span className="w-2.5 h-2.5 bg-phosphor" />
                <span className="ml-2 text-term-bright font-bold">
                  bash - vinesh@bench-console: {currentCategory.path}
                </span>
              </div>
              <span className="text-[10px] text-term-dim">POSIX sh</span>
            </div>

            {/* Terminal Command Execution Output */}
            <div className="space-y-1.5 text-xs font-mono leading-relaxed overflow-x-auto">
              <div className="text-phosphor font-bold flex items-center gap-2">
                <span className="text-term-dim">$</span>
                <span>ls -la --color=always {currentCategory.path}</span>
              </div>

              <div className="text-term-dim">
                total {currentCategory.skills.length * 4 + 8}
              </div>

              <div className="text-term-dim">
                drwxr-xr-x 2 vinesh staff 4096 Oct 18 23:45 .
              </div>
              <div className="text-term-dim">
                drwxr-xr-x 7 vinesh staff 4096 Oct 18 23:45 ..
              </div>

              {displayedSkills.map((skill) => (
                <div
                  key={skill.addr}
                  className="flex items-baseline gap-4 hover:bg-[#0B0E0B] px-1 py-0.5"
                >
                  <span className="text-term-dim w-24 flex-shrink-0">-rwxr-xr-x</span>
                  <span className="text-term-muted w-12 flex-shrink-0">vinesh</span>
                  <span className="text-amber w-16 text-right flex-shrink-0">{skill.fileSize}</span>
                  <span className="text-phosphor font-bold w-40 flex-shrink-0">{skill.name}*</span>
                  <span className="text-term-dim truncate"># [{skill.addr}] {skill.role} ({skill.usedInProjects.join(', ')})</span>
                </div>
              ))}

              <div className="pt-3 text-term-bright flex items-center gap-1.5">
                <span className="text-phosphor">vinesh@bench-console:~$</span>
                <span className="w-2 h-4 bg-phosphor animate-blink inline-block" />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
