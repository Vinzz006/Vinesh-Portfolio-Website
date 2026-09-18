import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Radio, Activity, Eye, Zap, TrendingUp, Sliders, Sparkles, Database, Check } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { animateSectionEntrance } from '../animations/anime-utils';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { researchTopics } from '../data/research';
import SectionLightSweep from '../components/SectionLightSweep';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  cpu: Cpu,
  radio: Radio,
  activity: Activity,
  eye: Eye,
  zap: Zap,
  'trending-up': TrendingUp,
};

export default function ResearchSection() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });
  const reduced = useReducedMotion();

  // Interactive Quantization & Explainability Simulator State
  const [quantMode, setQuantMode] = useState<'fp32' | 'int8' | 'int4'>('int8');
  const [sampleHz, setSampleHz] = useState<number>(100);

  useEffect(() => {
    if (isVisible) {
      animateSectionEntrance('#research-content', reduced);
    }
  }, [isVisible, reduced]);

  // Compute live TinyML Model Metrics based on quantization level & sampling rate
  const getModelMetrics = () => {
    let sizeKb = 148;
    let latencyMs = 28;
    let accuracy = 98.4;
    let ramKb = 42;

    if (quantMode === 'int8') {
      sizeKb = 38;
      latencyMs = 7.4;
      accuracy = 97.9;
      ramKb = 14;
    } else if (quantMode === 'int4') {
      sizeKb = 19;
      latencyMs = 4.1;
      accuracy = 95.8;
      ramKb = 8;
    }

    // Scale slightly with sampling frequency
    const adjustedLatency = (latencyMs * (sampleHz / 100)).toFixed(1);

    return { sizeKb, latencyMs: adjustedLatency, accuracy, ramKb };
  };

  const metrics = getModelMetrics();

  return (
    <section
      id="research"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 relative overflow-hidden"
      aria-labelledby="research-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <SectionLightSweep actLabel="ACT 05" actTitle="RESEARCH NODES" isVisible={isVisible} />
      </div>

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 grid-bg opacity-15" />
        <div
          className="absolute bottom-0 left-0 w-2/3 h-2/3 opacity-5"
          style={{
            background: 'radial-gradient(ellipse at left bottom, rgba(124,58,237,0.4) 0%, transparent 70%)',
          }}
        />
      </div>

      <div
        id="research-content"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{ opacity: 0 }}
      >
        {/* Header */}
        <div className="mb-12">
          <span className="section-label">RESEARCH & INNOVATION</span>
          <h2 id="research-heading" className="section-title mt-2">
            Research{' '}
            <span className="text-gradient-primary">Nodes</span>
          </h2>
          <p className="section-subtitle mt-3 max-w-2xl">
            Areas I actively explore, experiment with, and build towards — combining hardware intelligence with modern AI.
          </p>
        </div>

        {/* Research topics grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12" role="list">
          {researchTopics.map((topic, i) => {
            const Icon = iconMap[topic.icon] ?? Cpu;
            return (
              <motion.article
                key={topic.id}
                role="listitem"
                initial={reduced ? {} : { opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass-card p-6 group hover:border-secondary/40 hover:shadow-glow-violet transition-all duration-300 cursor-default"
                aria-label={`Research area: ${topic.title}`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center flex-shrink-0 group-hover:border-secondary/50 group-hover:bg-secondary/20 transition-all duration-300">
                    <Icon size={18} className="text-secondary" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-text-bright group-hover:text-primary transition-colors leading-snug">
                      {topic.title}
                    </h3>
                  </div>
                </div>
                <p className="text-text-secondary text-sm leading-relaxed mb-4">
                  {topic.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {topic.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] px-2 py-0.5 rounded border border-secondary/20 text-secondary/80 bg-secondary/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Interactive TinyML Model Compression & Explainability Simulator */}
        <div className="glass-card p-6 md:p-8 border-secondary/30 shadow-2xl mb-12 rounded-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-border-subtle">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-secondary/10 border border-secondary/30 text-secondary font-mono text-[11px] font-bold mb-2">
                <Sliders size={14} />
                INTERACTIVE SIMULATOR
              </div>
              <h3 className="text-xl font-bold text-text-bright">
                TinyML Edge Model Quantization & Explainability
              </h3>
              <p className="text-text-secondary text-xs mt-1">
                Simulate how post-training integer quantization optimizes neural networks for ESP32 microcontrollers.
              </p>
            </div>

            {/* Quantization Mode Selector */}
            <div className="flex items-center gap-2 bg-bg-primary p-1.5 rounded-xl border border-border-subtle">
              {(['fp32', 'int8', 'int4'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setQuantMode(mode)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                    quantMode === mode
                      ? 'bg-primary text-bg-primary shadow-glow-cyan'
                      : 'text-text-muted hover:text-text-primary'
                  }`}
                >
                  {mode.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Left Controls & Metrics */}
            <div className="lg:col-span-5 space-y-5">
              <div>
                <div className="flex justify-between font-mono text-xs text-text-secondary mb-2">
                  <span>SENSOR SAMPLING FREQUENCY</span>
                  <span className="text-primary font-bold">{sampleHz} Hz</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="250"
                  step="10"
                  value={sampleHz}
                  onChange={(e) => setSampleHz(Number(e.target.value))}
                  className="w-full accent-primary cursor-pointer"
                />
              </div>

              {/* Live Metric Cards */}
              <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                <div className="p-3 rounded-xl bg-bg-primary border border-border-subtle">
                  <span className="text-text-muted text-[10px] uppercase block mb-1">FLASH SIZE</span>
                  <span className="text-lg font-bold text-accent-green">{metrics.sizeKb} KB</span>
                </div>
                <div className="p-3 rounded-xl bg-bg-primary border border-border-subtle">
                  <span className="text-text-muted text-[10px] uppercase block mb-1">RAM FOOTPRINT</span>
                  <span className="text-lg font-bold text-primary">{metrics.ramKb} KB</span>
                </div>
                <div className="p-3 rounded-xl bg-bg-primary border border-border-subtle">
                  <span className="text-text-muted text-[10px] uppercase block mb-1">LATENCY / INFER</span>
                  <span className="text-lg font-bold text-accent-amber">{metrics.latencyMs} ms</span>
                </div>
                <div className="p-3 rounded-xl bg-bg-primary border border-border-subtle">
                  <span className="text-text-muted text-[10px] uppercase block mb-1">ACCURACY</span>
                  <span className="text-lg font-bold text-secondary">{metrics.accuracy}%</span>
                </div>
              </div>
            </div>

            {/* Right Interactive SHAP Feature Importance Bars */}
            <div className="lg:col-span-7 p-5 rounded-xl bg-bg-primary border border-border-subtle">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs font-bold text-text-bright uppercase flex items-center gap-2">
                  <Sparkles size={14} className="text-secondary" />
                  SHAP Model Feature Attribution
                </span>
                <span className="font-mono text-[10px] text-accent-green">TARGET: ESP32 DEPLOYED</span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                {[
                  { name: 'Accelerometer Z (Gravity delta)', weight: quantMode === 'fp32' ? 0.42 : 0.41, color: '#00D4FF' },
                  { name: 'Signal Energy (RMS)', weight: quantMode === 'fp32' ? 0.28 : 0.29, color: '#7C3AED' },
                  { name: 'Spectral Centroid (FFT)', weight: 0.18, color: '#10B981' },
                  { name: 'Peak-to-Peak Amplitude', weight: 0.12, color: '#F59E0B' },
                ].map((feat) => (
                  <div key={feat.name} className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-text-secondary truncate">{feat.name}</span>
                      <span className="text-text-bright font-bold">{(feat.weight * 100).toFixed(0)}%</span>
                    </div>
                    <div className="h-2 w-full bg-bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${feat.weight * 100}%`,
                          backgroundColor: feat.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Research approach */}
        <div className="glass-card p-8 border-secondary/20 shadow-card">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { label: 'Approach', value: 'Build → Measure → Iterate', sub: 'Real hardware, real data' },
              { label: 'Focus', value: 'Cross-Domain Systems', sub: 'Hardware + AI + Software' },
              { label: 'Goal', value: 'Intelligent Embedded Systems', sub: 'Edge intelligence at scale' },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center">
                <p className="font-mono text-[10px] text-text-muted uppercase tracking-widest mb-2">{item.label}</p>
                <p className="text-text-bright font-semibold text-sm mb-1">{item.value}</p>
                <p className="text-text-muted text-xs">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
