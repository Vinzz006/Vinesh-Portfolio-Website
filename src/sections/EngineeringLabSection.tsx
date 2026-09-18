import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  ArrowRight,
  Layers,
  Cpu,
  Sparkles,
  Activity,
  CheckCircle2,
  Terminal,
  Zap,
  Pause,
  RotateCcw,
  Radio,
  Sliders,
} from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { animatePipeline, animateNodePulse } from '../animations/anime-utils';
import { useReducedMotion } from '../hooks/useReducedMotion';
import StatusIndicator from '../components/StatusIndicator';
import LiveSignalWaveform from '../components/LiveSignalWaveform';
import ArchitectureFlowConnector from '../components/ArchitectureFlowCanvas';
import SectionLightSweep from '../components/SectionLightSweep';
import { projects, type ArchitectureNode } from '../data/projects';

const pipelineNodes = [
  {
    id: 'sensor',
    label: 'SENSOR LAYER',
    icon: '⚡',
    color: '#10B981',
    type: 'sensor',
    protocol: 'I2C / SPI / ADC',
    description: 'Physical world interface. Reads temperature, motion, voltage, pressure and environmental telemetry.',
    technologies: ['Accelerometer', 'Temperature Sensor', 'Current Sensor', 'I2C', 'SPI', 'ADC'],
    projectIds: [1, 2, 3, 8, 10],
  },
  {
    id: 'esp32',
    label: 'ESP32 CONTROLLER',
    icon: '🔧',
    color: '#00D4FF',
    type: 'hardware',
    protocol: 'FreeRTOS / DMA',
    description: 'Dual-core microcontroller handling data acquisition, signal conditioning, Wi-Fi/BLE, and MQTT publishing.',
    technologies: ['ESP32', 'ESP-IDF', 'FreeRTOS', 'Wi-Fi', 'MQTT', 'GPIO', 'UART'],
    projectIds: [1, 2, 3, 10],
  },
  {
    id: 'edge',
    label: 'EDGE PROCESSING & DSP',
    icon: '🧮',
    color: '#7C3AED',
    type: 'edge',
    protocol: 'FFT / TinyML',
    description: 'On-device signal processing, feature extraction, noise filtering and lightweight ML inference at the edge.',
    technologies: ['Signal Processing', 'FFT', 'Feature Extraction', 'TinyML', 'Quantization'],
    projectIds: [1, 8],
  },
  {
    id: 'api',
    label: 'FASTAPI BACKEND',
    icon: '⚙️',
    color: '#F59E0B',
    type: 'backend',
    protocol: 'REST / WebSocket',
    description: 'High-performance Python API layer handling data ingestion, ML model serving, and business logic.',
    technologies: ['FastAPI', 'Python', 'Pydantic', 'SQLAlchemy', 'Async', 'REST'],
    projectIds: [2, 5, 6, 7, 9],
  },
  {
    id: 'firebase',
    label: 'FIREBASE / CLOUD',
    icon: '☁️',
    color: '#3B82F6',
    type: 'cloud',
    protocol: 'MQTT / WSS Sync',
    description: 'Real-time database, authentication, cloud functions and persistent storage for live data synchronization.',
    technologies: ['Firebase RTDB', 'Firestore', 'Auth', 'Cloud Functions', 'PostgreSQL'],
    projectIds: [1, 2, 3, 5, 9, 10],
  },
  {
    id: 'dashboard',
    label: 'REACT DASHBOARD',
    icon: '📊',
    color: '#EC4899',
    type: 'frontend',
    protocol: 'UI 60 FPS Stream',
    description: 'Modern React frontend with real-time data visualization, interactive charts, and responsive UI.',
    technologies: ['React', 'TypeScript', 'Recharts', 'Tailwind CSS', 'Framer Motion', 'WebSockets'],
    projectIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  },
];

const iotStatus = [
  { status: 'online' as const, label: 'ESP32', sublabel: 'MICROCONTROLLER' },
  { status: 'online' as const, label: 'Accelerometer', sublabel: 'STREAMING' },
  { status: 'ready' as const, label: 'ML MODEL', sublabel: 'INFERENCE READY' },
  { status: 'online' as const, label: 'Firebase', sublabel: 'CONNECTED' },
  { status: 'processing' as const, label: 'Data Pipeline', sublabel: 'PROCESSING' },
  { status: 'ready' as const, label: 'Dashboard', sublabel: 'LIVE VIEW' },
];

const nodeTypeColors: Record<string, { bg: string; text: string; border: string; hex: string }> = {
  sensor: { bg: 'rgba(16, 185, 129, 0.1)', text: '#10B981', border: 'rgba(16, 185, 129, 0.3)', hex: '#10B981' },
  hardware: { bg: 'rgba(0, 212, 255, 0.1)', text: '#00D4FF', border: 'rgba(0, 212, 255, 0.3)', hex: '#00D4FF' },
  edge: { bg: 'rgba(124, 58, 237, 0.1)', text: '#A78BFA', border: 'rgba(124, 58, 237, 0.3)', hex: '#7C3AED' },
  ai: { bg: 'rgba(245, 158, 11, 0.1)', text: '#F59E0B', border: 'rgba(245, 158, 11, 0.3)', hex: '#F59E0B' },
  backend: { bg: 'rgba(239, 68, 68, 0.1)', text: '#EF4444', border: 'rgba(239, 68, 68, 0.3)', hex: '#EF4444' },
  network: { bg: 'rgba(59, 130, 246, 0.1)', text: '#60A5FA', border: 'rgba(59, 130, 246, 0.3)', hex: '#3B82F6' },
  cloud: { bg: 'rgba(14, 165, 233, 0.1)', text: '#38BDF8', border: 'rgba(14, 165, 233, 0.3)', hex: '#0EA5E9' },
  frontend: { bg: 'rgba(236, 72, 153, 0.1)', text: '#F472B6', border: 'rgba(236, 72, 153, 0.3)', hex: '#EC4899' },
};

interface LogEntry {
  id: string;
  time: string;
  stage: string;
  message: string;
  color: string;
}

export default function EngineeringLabSection() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.05 });
  const reduced = useReducedMotion();

  // View state: null for general pipeline, or project id for project architecture
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [activePipelineNode, setActivePipelineNode] = useState<string | null>('sensor');
  const [selectedStageIndex, setSelectedStageIndex] = useState<number>(0);
  const [dataRate, setDataRate] = useState(48);

  // Live simulation states
  const [isStreaming, setIsStreaming] = useState(true);
  const [activeSimulationStage, setActiveSimulationStage] = useState<number | null>(null);
  const [isSimulatingPacket, setIsSimulatingPacket] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([
    { id: '1', time: '09:05:01', stage: 'SENSOR', message: 'I2C Bus sample #1042: ax=+0.04g ay=+0.98g az=-0.11g', color: '#10B981' },
    { id: '2', time: '09:05:02', stage: 'ESP32', message: 'DMA buffer synchronized -> FreeRTOS queue dispatch', color: '#00D4FF' },
    { id: '3', time: '09:05:02', stage: 'EDGE/DSP', message: 'Butterworth low-pass 20Hz filtered -> SNR +28.4dB', color: '#7C3AED' },
    { id: '4', time: '09:05:03', stage: 'TINYML', message: 'Inference classification: NORMAL_MOTION (99.1% conf, 12ms)', color: '#F59E0B' },
    { id: '5', time: '09:05:03', stage: 'CLOUD', message: 'MQTT telemetry packet published -> Firebase RTDB synchronized', color: '#3B82F6' },
  ]);

  const stageRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const pipelineNodeRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    if (isVisible && selectedProjectId === null) {
      setTimeout(() => {
        animatePipeline('#pipeline-container', reduced);
      }, 50);
    }
  }, [isVisible, selectedProjectId, reduced]);

  // Live data rate fluctuations
  useEffect(() => {
    if (isVisible && isStreaming && !reduced) {
      const interval = setInterval(() => {
        setDataRate(Math.floor(Math.random() * 24 + 40));
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isVisible, isStreaming, reduced]);

  // When project changes, reset stage index to 0
  useEffect(() => {
    setSelectedStageIndex(0);
    setActiveSimulationStage(null);
  }, [selectedProjectId]);

  const selectedProject = projects.find((p) => p.id === selectedProjectId);
  const activePipeline = pipelineNodes.find((n) => n.id === activePipelineNode);

  const handleSelectProject = (id: number | null) => {
    setSelectedProjectId(id);
    if (id !== null) {
      const el = document.getElementById('architecture-viewport');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  // ─── Interactive Test Packet Simulation ────────────────────────────────────
  const sendTestPacket = () => {
    if (isSimulatingPacket || reduced) return;
    setIsSimulatingPacket(true);

    const stagesCount = selectedProject
      ? selectedProject.architectureDetails?.length ?? 5
      : pipelineNodes.length;

    let current = 0;
    setActiveSimulationStage(0);

    // Add initial dispatch log
    const now = new Date().toTimeString().split(' ')[0];
    const initialName = selectedProject
      ? selectedProject.architectureDetails?.[0]?.name ?? 'STAGE 1'
      : pipelineNodes[0].label;

    setLogs((prev) => [
      {
        id: Math.random().toString(),
        time: now,
        stage: initialName.toUpperCase(),
        message: `⚡ [TEST PACKET DISPATCHED] ID #PKT-${Math.floor(Math.random() * 9000 + 1000)} initiated`,
        color: '#00D4FF',
      },
      ...prev.slice(0, 14),
    ]);

    const stepInterval = setInterval(() => {
      current += 1;
      if (current < stagesCount) {
        setActiveSimulationStage(current);

        // Anime.js pulse effect on node
        if (selectedProject) {
          setSelectedStageIndex(current);
          const nodeEl = stageRefs.current[current];
          if (nodeEl) {
            const node = selectedProject.architectureDetails?.[current];
            const hex = (node && nodeTypeColors[node.type]?.hex) || '#00D4FF';
            animateNodePulse(nodeEl, hex);
          }
        } else {
          const node = pipelineNodes[current];
          setActivePipelineNode(node.id);
          const nodeEl = pipelineNodeRefs.current[node.id];
          if (nodeEl) {
            animateNodePulse(nodeEl, node.color);
          }
        }

        // Log entry
        const stageName = selectedProject
          ? selectedProject.architectureDetails?.[current]?.name ?? `Stage ${current + 1}`
          : pipelineNodes[current].label;
        const stageColor = selectedProject
          ? (nodeTypeColors[selectedProject.architectureDetails?.[current]?.type ?? 'sensor']?.hex || '#00D4FF')
          : pipelineNodes[current].color;

        const timeStr = new Date().toTimeString().split(' ')[0];
        setLogs((prev) => [
          {
            id: Math.random().toString(),
            time: timeStr,
            stage: stageName.toUpperCase(),
            message: `Packet arrived -> Processed in ${(1.2 + Math.random() * 3).toFixed(1)}ms. Forwarded to bus.`,
            color: stageColor,
          },
          ...prev.slice(0, 14),
        ]);
      } else {
        clearInterval(stepInterval);
        setIsSimulatingPacket(false);
        setActiveSimulationStage(null);

        const timeStr = new Date().toTimeString().split(' ')[0];
        setLogs((prev) => [
          {
            id: Math.random().toString(),
            time: timeStr,
            stage: 'PIPELINE',
            message: '✔ [END-TO-END FLOW COMPLETE] Telemetry rendered on dashboard with 0 dropped frames',
            color: '#10B981',
          },
          ...prev.slice(0, 14),
        ]);
      }
    }, 600);
  };

  const handleNodeClick = (nodeId: string, hexColor: string) => {
    setActivePipelineNode(activePipelineNode === nodeId ? null : nodeId);
    const el = pipelineNodeRefs.current[nodeId];
    if (el && !reduced) {
      animateNodePulse(el, hexColor);
    }
  };

  const handleStageClick = (idx: number, hexColor: string) => {
    setSelectedStageIndex(idx);
    const el = stageRefs.current[idx];
    if (el && !reduced) {
      animateNodePulse(el, hexColor);
    }
  };

  return (
    <section
      id="lab"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-28 relative overflow-hidden scroll-mt-16"
      aria-labelledby="lab-heading"
    >
      <div id="engineering-lab" className="absolute -top-20" aria-hidden="true" />

      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div
          className="absolute top-0 right-0 w-1/2 h-full opacity-5"
          style={{
            background: 'radial-gradient(ellipse at right, rgba(0,212,255,0.3) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <SectionLightSweep actLabel="ACT 04" actTitle="INTELLIGENCE LAB" isVisible={isVisible} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <span className="section-label flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
              ENGINEERING LAB & LIVE PIPELINE
            </span>
            <h2 id="lab-heading" className="section-title mt-2">
              Engineering <span className="text-gradient-primary">Lab</span>
            </h2>
            <p className="section-subtitle mt-3">
              From physical analog signals to intelligent software. Click any project to inspect its live system architecture flow.
            </p>
          </div>

          {/* Interactive Simulation Controls Header */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Live Stream Toggle */}
            <button
              onClick={() => setIsStreaming(!isStreaming)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono border transition-all duration-200 ${
                isStreaming
                  ? 'border-accent-green/40 bg-accent-green/10 text-accent-green shadow-[0_0_12px_rgba(16,185,129,0.15)]'
                  : 'border-border-subtle bg-bg-secondary text-text-muted hover:text-text-primary'
              }`}
              title="Toggle live telemetry streaming animation"
            >
              {isStreaming ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-accent-green shadow-[0_0_8px_#10B981] animate-pulse" />
                  <span>STREAMING ACTIVE</span>
                </>
              ) : (
                <>
                  <Pause size={12} />
                  <span>STREAM PAUSED</span>
                </>
              )}
            </button>

            {/* Test Packet Trigger */}
            <button
              onClick={sendTestPacket}
              disabled={isSimulatingPacket}
              className={`btn-primary text-xs py-2 px-4 flex items-center gap-2 ${
                isSimulatingPacket ? 'opacity-80 cursor-wait' : ''
              }`}
            >
              <Zap size={13} className={isSimulatingPacket ? 'animate-bounce text-bg-primary' : ''} />
              <span>{isSimulatingPacket ? 'Simulating Transit...' : '⚡ Send Test Packet'}</span>
            </button>

            {/* Mode Switcher */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-bg-secondary border border-border-subtle">
              <button
                onClick={() => handleSelectProject(null)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 ${
                  selectedProjectId === null
                    ? 'bg-primary text-bg-primary font-semibold shadow-glow-sm'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <Layers size={13} />
                Global Pipeline
              </button>
              <button
                onClick={() => handleSelectProject(selectedProjectId ?? 1)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 ${
                  selectedProjectId !== null
                    ? 'bg-primary text-bg-primary font-semibold shadow-glow-sm'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <Cpu size={13} />
                Project Architecture
              </button>
            </div>
          </div>
        </div>

        {/* Project Selector Bar */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-3">
            <p className="font-mono text-xs text-text-muted tracking-widest uppercase flex items-center gap-2">
              <Sparkles size={13} className="text-primary" />
              Select a Project to Inspect System Architecture Flow
            </p>
            {selectedProjectId !== null && (
              <button
                onClick={() => handleSelectProject(null)}
                className="font-mono text-[11px] text-primary hover:underline flex items-center gap-1"
              >
                <RotateCcw size={11} />
                Reset to Global Pipeline
              </button>
            )}
          </div>

          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2" role="tablist">
            {projects.map((proj) => {
              const isSelected = selectedProjectId === proj.id;
              return (
                <button
                  key={proj.id}
                  onClick={() => handleSelectProject(proj.id)}
                  role="tab"
                  aria-selected={isSelected}
                  className={`flex items-center gap-2.5 px-4 py-2 rounded-xl text-xs font-mono transition-all duration-200 border whitespace-nowrap ${
                    isSelected
                      ? 'border-primary bg-primary/10 text-primary font-semibold shadow-glow-sm scale-[1.02]'
                      : 'border-border-subtle bg-bg-secondary/60 text-text-secondary hover:text-text-primary hover:border-border-DEFAULT hover:bg-bg-secondary'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isSelected ? 'bg-primary shadow-[0_0_8px_#00D4FF]' : 'bg-text-muted'
                    }`}
                  />
                  <span>{proj.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Interactive Viewport */}
        <div id="architecture-viewport">
          <AnimatePresence mode="wait">
            {selectedProject ? (
              /* ─── PROJECT SPECIFIC SYSTEM ARCHITECTURE VIEW ─── */
              <motion.div
                key={`project-${selectedProject.id}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid lg:grid-cols-12 gap-8 items-start"
              >
                {/* Left: Project Architecture Flow */}
                <div className="lg:col-span-7 glass-card p-6 md:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-border-subtle">
                    <div>
                      <span className="font-mono text-[10px] tracking-widest text-primary uppercase flex items-center gap-1.5">
                        <Radio size={11} className="text-accent-green animate-pulse" />
                        {selectedProject.category}
                      </span>
                      <h3 className="text-xl font-bold text-text-bright mt-0.5">
                        {selectedProject.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs px-3 py-1 rounded-full border border-primary/30 text-primary bg-primary/5">
                        Live Flow Diagram
                      </span>
                    </div>
                  </div>

                  <p className="text-text-secondary text-sm leading-relaxed mb-6">
                    {selectedProject.description}
                  </p>

                  {/* Architecture Diagram Nodes */}
                  <div className="flex flex-col">
                    <p className="font-mono text-xs text-text-muted uppercase tracking-widest mb-3 flex items-center gap-1.5">
                      <Terminal size={12} className="text-primary" />
                      Live Dataflow Stages — Click any stage to inspect:
                    </p>

                    {(selectedProject.architectureDetails ?? []).map((node: ArchitectureNode, idx: number) => {
                      const isSelected = selectedStageIndex === idx;
                      const isSimActive = activeSimulationStage === idx;
                      const colors = nodeTypeColors[node.type] ?? nodeTypeColors.hardware;

                      return (
                        <div key={node.name} className="flex flex-col">
                          <button
                            ref={(el) => {
                              stageRefs.current[idx] = el;
                            }}
                            onClick={() => handleStageClick(idx, colors.hex)}
                            className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center justify-between group relative overflow-hidden ${
                              isSelected || isSimActive
                                ? 'border-primary bg-primary/10 shadow-[0_0_20px_rgba(0,212,255,0.15)] scale-[1.01]'
                                : 'border-border-subtle bg-bg-primary/80 hover:border-primary/40 hover:bg-bg-secondary'
                            }`}
                          >
                            {/* Animated scanline bar during packet simulation */}
                            {isSimActive && (
                              <motion.div
                                className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-primary/20 to-transparent"
                                animate={{ x: ['-100%', '100%'] }}
                                transition={{ duration: 0.6, repeat: Infinity, ease: 'linear' }}
                              />
                            )}

                            <div className="flex items-center gap-4 min-w-0 z-10">
                              <div className="relative">
                                <span
                                  className="w-9 h-9 rounded-lg flex items-center justify-center font-mono text-xs font-bold flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
                                  style={{
                                    backgroundColor: colors.bg,
                                    color: colors.text,
                                    border: `1px solid ${colors.border}`,
                                  }}
                                >
                                  {String(idx + 1).padStart(2, '0')}
                                </span>
                                {isSimActive && (
                                  <span
                                    className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-primary animate-ping"
                                    aria-hidden="true"
                                  />
                                )}
                              </div>

                              <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="font-mono text-sm font-semibold text-text-bright group-hover:text-primary transition-colors">
                                    {node.name}
                                  </span>
                                  <span
                                    className="font-mono text-[10px] px-2 py-0.5 rounded uppercase font-medium"
                                    style={{ backgroundColor: colors.bg, color: colors.text }}
                                  >
                                    {node.role}
                                  </span>
                                </div>
                                <p className="font-mono text-xs text-text-muted mt-1 truncate">
                                  {node.tech}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 z-10">
                              {isSimActive && (
                                <span className="font-mono text-[10px] text-primary bg-primary/20 px-2 py-0.5 rounded animate-pulse">
                                  PROCESSING
                                </span>
                              )}
                              <ChevronRight
                                size={16}
                                className={`text-text-muted transition-transform duration-200 flex-shrink-0 ${
                                  isSelected ? 'rotate-90 text-primary' : 'group-hover:text-text-secondary'
                                }`}
                              />
                            </div>
                          </button>

                          {/* Animated SVG Stream Connector */}
                          {idx < (selectedProject.architectureDetails?.length ?? 0) - 1 && (
                            <ArchitectureFlowConnector
                              label={node.tech.split('/')[0] || 'bus'}
                              color={colors.hex}
                              isActive={isSelected || isSimActive}
                              isStreaming={isStreaming}
                              packetInTransit={isSimActive}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right: Stage Inspector & Project Summary */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                  {/* Selected Stage Detail Card */}
                  {selectedProject.architectureDetails?.[selectedStageIndex] && (
                    <motion.div
                      key={`stage-${selectedStageIndex}`}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                      className="glass-card p-6 border-primary/30"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-mono text-xs text-primary tracking-widest uppercase flex items-center gap-1.5">
                          <Sliders size={13} />
                          STAGE {selectedStageIndex + 1} OF {selectedProject.architectureDetails.length}
                        </span>
                        <CheckCircle2 size={16} className="text-accent-green" />
                      </div>

                      <h4 className="text-lg font-bold text-text-bright mb-1">
                        {selectedProject.architectureDetails[selectedStageIndex].name}
                      </h4>
                      <p className="font-mono text-xs text-primary mb-4">
                        Role: {selectedProject.architectureDetails[selectedStageIndex].role}
                      </p>

                      {/* Live Waveform Oscilloscope tailored to selected stage */}
                      <div className="mb-4">
                        <LiveSignalWaveform
                          nodeType={selectedProject.architectureDetails[selectedStageIndex].type}
                          nodeName={selectedProject.architectureDetails[selectedStageIndex].name}
                          color={
                            nodeTypeColors[
                              selectedProject.architectureDetails[selectedStageIndex].type
                            ]?.hex || '#00D4FF'
                          }
                          isStreaming={isStreaming}
                        />
                      </div>

                      <div className="p-4 rounded-xl bg-bg-primary border border-border-subtle mb-4">
                        <p className="font-mono text-[10px] text-text-muted uppercase tracking-widest mb-1.5">
                          Technical Operation
                        </p>
                        <p className="text-text-primary text-sm leading-relaxed">
                          {selectedProject.architectureDetails[selectedStageIndex].description}
                        </p>
                      </div>

                      <div>
                        <p className="font-mono text-[10px] text-text-muted uppercase tracking-widest mb-2">
                          Component Tech Stack
                        </p>
                        <span className="tech-badge text-primary border-primary/30 bg-primary/5">
                          {selectedProject.architectureDetails[selectedStageIndex].tech}
                        </span>
                      </div>
                    </motion.div>
                  )}

                  {/* Complete Project Summary Card */}
                  <div className="glass-card p-6">
                    <h4 className="font-mono text-xs font-semibold text-text-bright uppercase tracking-widest mb-3">
                      Complete Project Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {selectedProject.technologies.map((t) => (
                        <span key={t} className="tech-badge">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-border-subtle flex items-center justify-between">
                      <span className="font-mono text-xs text-text-muted">
                        Status: <span className="text-primary font-semibold">{selectedProject.status}</span>
                      </span>
                      <button
                        onClick={() => handleSelectProject(null)}
                        className="btn-ghost text-xs py-1.5"
                      >
                        ← Back to Global Pipeline
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* ─── GLOBAL SYSTEM PIPELINE VIEW (DEFAULT) ─── */
              <motion.div
                key="global-pipeline"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid lg:grid-cols-12 gap-8 items-start"
              >
                {/* Pipeline Nodes Flow (Left 7 Cols) */}
                <div id="pipeline-container" className="lg:col-span-7" aria-label="System architecture pipeline">
                  <div className="flex items-center justify-between mb-4">
                    <p className="font-mono text-xs text-text-muted tracking-widest flex items-center gap-2">
                      <Activity size={14} className="text-primary" />
                      CORE HARDWARE-TO-AI PIPELINE — Click node to inspect
                    </p>
                    <span className="font-mono text-[11px] text-accent-green flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
                      6 Active Layers
                    </span>
                  </div>

                  <div className="flex flex-col" role="list">
                    {pipelineNodes.map((node, i) => {
                      const isActive = activePipelineNode === node.id;
                      const isSimActive = activeSimulationStage === i;

                      return (
                        <div key={node.id} role="listitem">
                          <button
                            ref={(el) => {
                              pipelineNodeRefs.current[node.id] = el;
                            }}
                            className={`pipeline-node w-full text-left flex items-center gap-4 group relative overflow-hidden transition-all duration-300 ${
                              isActive || isSimActive
                                ? 'active-node border-primary bg-primary/10 shadow-[0_0_20px_rgba(0,212,255,0.15)] scale-[1.01]'
                                : 'border-border-subtle bg-bg-secondary/80 hover:border-primary/40'
                            }`}
                            onClick={() => handleNodeClick(node.id, node.color)}
                            aria-expanded={isActive}
                          >
                            {/* Animated scanline bar during packet simulation */}
                            {isSimActive && (
                              <motion.div
                                className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-primary/20 to-transparent"
                                animate={{ x: ['-100%', '100%'] }}
                                transition={{ duration: 0.6, repeat: Infinity, ease: 'linear' }}
                              />
                            )}

                            {/* Icon with Glowing Aura */}
                            <div
                              className="w-11 h-11 rounded-lg flex items-center justify-center text-lg flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
                              style={{
                                backgroundColor: node.color + '20',
                                border: `1px solid ${node.color}50`,
                                boxShadow: isActive ? `0 0 14px ${node.color}40` : 'none',
                              }}
                            >
                              {node.icon}
                            </div>

                            {/* Label */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <p className="font-mono text-xs font-semibold text-text-bright">{node.label}</p>
                                <span
                                  className="font-mono text-[9px] px-1.5 py-0.2 rounded uppercase"
                                  style={{ backgroundColor: node.color + '15', color: node.color }}
                                >
                                  {node.protocol}
                                </span>
                              </div>
                              <p className="font-mono text-[10px] text-text-muted mt-0.5 truncate">
                                {node.technologies.slice(0, 4).join(' · ')}
                              </p>
                            </div>

                            {/* Arrow / Active Indicator */}
                            <div className="flex items-center gap-2">
                              {isSimActive && (
                                <span className="font-mono text-[9px] text-primary bg-primary/20 px-2 py-0.5 rounded animate-pulse">
                                  ACTIVE
                                </span>
                              )}
                              <ChevronRight
                                size={15}
                                className={`text-text-muted transition-transform duration-200 flex-shrink-0 ${
                                  isActive ? 'rotate-90 text-primary' : 'group-hover:text-text-secondary'
                                }`}
                              />
                            </div>
                          </button>

                          {/* Dynamic SVG Stream Connector */}
                          {i < pipelineNodes.length - 1 && (
                            <ArchitectureFlowConnector
                              label={node.protocol}
                              color={node.color}
                              isActive={isActive || isSimActive}
                              isStreaming={isStreaming}
                              packetInTransit={isSimActive}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right panel: Live Telemetry Deck & Waveform (Right 5 Cols) */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                  {/* Realtime Waveform Oscilloscope */}
                  {activePipeline && (
                    <div className="glass-card p-5 border-primary/30">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-base">{activePipeline.icon}</span>
                          <span className="font-mono text-xs font-bold text-text-bright">
                            {activePipeline.label}
                          </span>
                        </div>
                        <span
                          className="font-mono text-[10px] px-2 py-0.5 rounded font-semibold"
                          style={{
                            backgroundColor: activePipeline.color + '20',
                            color: activePipeline.color,
                          }}
                        >
                          {activePipeline.protocol}
                        </span>
                      </div>

                      {/* Live Waveform Canvas */}
                      <LiveSignalWaveform
                        nodeType={activePipeline.type}
                        nodeName={activePipeline.label}
                        color={activePipeline.color}
                        isStreaming={isStreaming}
                      />

                      <p className="text-text-secondary text-xs leading-relaxed mt-3 mb-3">
                        {activePipeline.description}
                      </p>

                      <div>
                        <p className="font-mono text-[10px] text-text-muted uppercase tracking-widest mb-1.5">
                          Layer Tech Stack
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {activePipeline.technologies.map((t) => (
                            <span
                              key={t}
                              className="tech-badge"
                              style={{
                                borderColor: activePipeline.color + '30',
                                color: activePipeline.color + 'DD',
                              }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Projects Using this Stage */}
                      <div className="mt-4 pt-3 border-t border-border-subtle">
                        <p className="font-mono text-[10px] text-text-muted uppercase tracking-widest mb-2 flex items-center gap-1">
                          <span>Used in Projects (Click to inspect full architecture):</span>
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {activePipeline.projectIds.map((pid) => {
                            const proj = projects.find((p) => p.id === pid);
                            if (!proj) return null;
                            return (
                              <button
                                key={proj.id}
                                onClick={() => handleSelectProject(proj.id)}
                                className="font-mono text-[11px] px-2.5 py-1 rounded-lg border border-primary/30 bg-primary/5 text-primary hover:bg-primary/15 hover:border-primary transition-all duration-200 flex items-center gap-1.5 group"
                                title={`Click to view ${proj.title} architecture`}
                              >
                                <span>{proj.title}</span>
                                <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Live Packet Stream Console (Terminal Ticker) */}
                  <div className="glass-card p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Terminal size={14} className="text-primary" />
                        <span className="font-mono text-xs font-semibold text-text-bright">
                          LIVE PACKET STREAM CONSOLE
                        </span>
                      </div>
                      <button
                        onClick={() =>
                          setLogs([
                            {
                              id: 'init',
                              time: new Date().toTimeString().split(' ')[0],
                              stage: 'CONSOLE',
                              message: 'Log buffer cleared. Listening for incoming telemetry packets...',
                              color: '#00D4FF',
                            },
                          ])
                        }
                        className="font-mono text-[10px] text-text-muted hover:text-primary transition-colors"
                      >
                        Clear
                      </button>
                    </div>

                    <div className="bg-[#03070C] rounded-lg p-3 border border-border-subtle/80 font-mono text-[11px] h-36 overflow-y-auto no-scrollbar flex flex-col gap-1.5">
                      {logs.map((log) => (
                        <div key={log.id} className="flex items-start gap-2 leading-snug">
                          <span className="text-text-muted flex-shrink-0 text-[10px]">[{log.time}]</span>
                          <span
                            className="font-bold flex-shrink-0 text-[10px] px-1 rounded"
                            style={{ backgroundColor: log.color + '20', color: log.color }}
                          >
                            {log.stage}
                          </span>
                          <span className="text-text-primary text-[10px] break-all">{log.message}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* IoT System Status Deck */}
                  <div className="glass-card p-5">
                    <div className="flex items-center justify-between mb-3">
                      <p className="font-mono text-xs font-semibold text-text-bright">SYSTEM TELEMETRY</p>
                      <div className="flex items-center gap-2">
                        <span className="status-online" aria-hidden="true" />
                        <span className="font-mono text-[10px] text-accent-green">OPERATIONAL</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
                      {iotStatus.map((s) => (
                        <StatusIndicator
                          key={s.label}
                          status={s.status}
                          label={s.label}
                          sublabel={s.sublabel}
                        />
                      ))}
                    </div>

                    {/* Data rate meter */}
                    <div className="p-3 rounded-lg bg-bg-primary border border-border-subtle">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-[10px] text-text-muted">SYSTEM THROUGHPUT</span>
                        <span className="font-mono text-xs text-primary font-semibold">{dataRate} packets/s</span>
                      </div>
                      <div className="w-full h-1.5 bg-bg-secondary rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-primary rounded-full"
                          animate={{ width: `${(dataRate / 70) * 100}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
