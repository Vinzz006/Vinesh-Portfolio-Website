import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, Radio, Zap } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface LiveSignalWaveformProps {
  nodeType?: string;
  nodeName?: string;
  color?: string;
  isStreaming?: boolean;
}

export const LiveSignalWaveform: React.FC<LiveSignalWaveformProps> = ({
  nodeType = 'sensor',
  nodeName = 'Telemetry Signal',
  color = '#00D4FF',
  isStreaming = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduced = useReducedMotion();
  const [isLive, setIsLive] = useState(isStreaming);
  const [metricValue, setMetricValue] = useState('0.00');
  const [secondaryMetric, setSecondaryMetric] = useState('50.0 Hz');
  const [noiseLevel, setNoiseLevel] = useState(1);

  // Sync external streaming state
  useEffect(() => {
    setIsLive(isStreaming);
  }, [isStreaming]);

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let phase = 0;
    let packetPulse = 0;

    // Buffer for history
    const sampleHistory: number[] = new Array(120).fill(0);

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;

      // Clear canvas with subtle trail
      ctx.fillStyle = 'rgba(5, 10, 15, 0.35)';
      ctx.fillRect(0, 0, width, height);

      // Grid background
      ctx.strokeStyle = 'rgba(26, 40, 64, 0.3)';
      ctx.lineWidth = 1;

      // Horizontal grid lines
      for (let y = 15; y < height; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Vertical grid lines
      for (let x = 20; x < width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Center baseline
      ctx.strokeStyle = 'rgba(0, 212, 255, 0.15)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.stroke();
      ctx.setLineDash([]);

      if (isLive) {
        phase += 0.08;
        if (Math.random() < 0.05) {
          packetPulse = 1.0;
        }
        if (packetPulse > 0) {
          packetPulse -= 0.05;
        }
      }

      // Compute current signal value based on node type
      let currentSample = 0;
      const jitter = (Math.random() - 0.5) * 4 * noiseLevel;

      switch (nodeType) {
        case 'sensor': {
          // IMU multi-harmonic acceleration wave
          const wave1 = Math.sin(phase) * (height * 0.22);
          const wave2 = Math.cos(phase * 2.3) * (height * 0.12);
          const pulse = packetPulse * (height * 0.25);
          currentSample = wave1 + wave2 + jitter + pulse;
          break;
        }
        case 'hardware': {
          // ESP32 digital bitstream / clock PWM
          const square = Math.sin(phase * 1.5) > 0 ? height * 0.28 : -height * 0.28;
          currentSample = square + (Math.random() - 0.5) * 2;
          break;
        }
        case 'edge': {
          // DSP Filtered smooth response wave with attenuated noise
          const fundamental = Math.sin(phase * 0.9) * (height * 0.3);
          const harmonic = Math.sin(phase * 2.7) * (height * 0.08);
          currentSample = fundamental + harmonic + (Math.random() - 0.5) * 1.5;
          break;
        }
        case 'ai': {
          // Neural activation probability curve / spike
          const activation = Math.sin(phase * 0.5);
          const burst = Math.exp(-Math.pow((phase % Math.PI) - 1.5, 2) * 4) * (height * 0.35);
          currentSample = activation * 5 + burst - (height * 0.1) + jitter * 0.5;
          break;
        }
        case 'backend': {
          // REST / API throughput packets
          const burst = Math.sin(phase * 3) > 0.6 ? height * 0.32 : Math.sin(phase * 0.4) * 8;
          currentSample = burst + jitter * 0.8;
          break;
        }
        case 'cloud': {
          // MQTT sync pulses / heartbeats
          const ping = (Math.floor(phase * 2) % 6 === 0) ? -height * 0.35 : Math.sin(phase * 0.3) * 4;
          currentSample = ping + jitter * 0.3;
          break;
        }
        case 'frontend': {
          // 60fps frame tick waveform
          const tick = Math.sin(phase * 4) * (height * 0.18) + Math.cos(phase * 0.5) * 6;
          currentSample = tick + (Math.random() - 0.5) * 1.2;
          break;
        }
        default: {
          currentSample = Math.sin(phase) * (height * 0.25) + jitter;
        }
      }

      if (isLive) {
        sampleHistory.shift();
        sampleHistory.push(currentSample);
      }

      // Draw primary glowing waveform
      ctx.lineWidth = 2;
      ctx.strokeStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = 10;
      ctx.beginPath();

      const step = width / (sampleHistory.length - 1);

      for (let i = 0; i < sampleHistory.length; i++) {
        const x = i * step;
        const y = centerY + sampleHistory[i];
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          // Smooth bezier curve
          const prevX = (i - 1) * step;
          const prevY = centerY + sampleHistory[i - 1];
          const midX = (prevX + x) / 2;
          ctx.quadraticCurveTo(prevX, prevY, midX, (prevY + y) / 2);
        }
      }
      ctx.stroke();

      // Reset shadow for performance
      ctx.shadowBlur = 0;

      // Draw leading packet cursor dot
      const lastX = width - 4;
      const lastY = centerY + sampleHistory[sampleHistory.length - 1];
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(lastX, lastY, 3.5, 0, Math.PI * 2);
      ctx.fill();

      // Draw pulse aura on leading dot
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(lastX, lastY, 6 + Math.sin(phase * 4) * 2, 0, Math.PI * 2);
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [nodeType, color, isLive, noiseLevel, reduced]);

  // Update dynamic metric readout periodically
  useEffect(() => {
    if (!isLive || reduced) return;
    const interval = setInterval(() => {
      switch (nodeType) {
        case 'sensor':
          setMetricValue((1.02 + (Math.random() - 0.5) * 0.12).toFixed(3) + ' g');
          setSecondaryMetric((50 + (Math.random() - 0.5) * 1.5).toFixed(1) + ' Hz');
          break;
        case 'hardware':
          setMetricValue((3.29 + (Math.random() - 0.5) * 0.03).toFixed(2) + ' V');
          setSecondaryMetric('240 MHz Dual-Core');
          break;
        case 'edge':
          setMetricValue('+' + (28.4 + (Math.random() - 0.5) * 2).toFixed(1) + ' dB SNR');
          setSecondaryMetric('FFT 256-pt');
          break;
        case 'ai':
          setMetricValue((98.9 + Math.random() * 0.9).toFixed(1) + '% Conf');
          setSecondaryMetric((11.8 + Math.random() * 3).toFixed(1) + ' ms Latency');
          break;
        case 'backend':
          setMetricValue((124 + Math.floor(Math.random() * 40)).toString() + ' req/s');
          setSecondaryMetric((6.2 + Math.random() * 2).toFixed(1) + ' ms avg');
          break;
        case 'cloud':
          setMetricValue((18 + Math.floor(Math.random() * 12)).toString() + ' ms RTT');
          setSecondaryMetric('WSS Connected');
          break;
        case 'frontend':
          setMetricValue((59.8 + Math.random() * 0.4).toFixed(1) + ' FPS');
          setSecondaryMetric('16.6 ms frame');
          break;
        default:
          setMetricValue('Active');
          setSecondaryMetric('OK');
      }
    }, 1200);

    return () => clearInterval(interval);
  }, [nodeType, isLive, reduced]);

  return (
    <div className="rounded-xl bg-bg-primary/95 border border-border-subtle p-3.5 flex flex-col gap-2.5 shadow-inner">
      {/* Header with Title & Live Telemetry Controls */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span
            className={`w-2 h-2 rounded-full flex-shrink-0 ${
              isLive ? 'bg-accent-green shadow-[0_0_8px_#10B981]' : 'bg-text-muted'
            }`}
          />
          <span className="font-mono text-[11px] font-semibold text-text-bright truncate">
            {nodeName} OSCILLOSCOPE
          </span>
        </div>

        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button
            onClick={() => setNoiseLevel((prev) => (prev === 1 ? 0.3 : prev === 0.3 ? 2 : 1))}
            className="p-1 rounded bg-bg-secondary hover:bg-bg-primary text-text-muted hover:text-primary transition-colors text-[10px] font-mono flex items-center gap-1 px-1.5 border border-border-subtle"
            title="Adjust noise simulation level"
          >
            <Radio size={10} />
            <span>{noiseLevel === 2 ? 'High' : noiseLevel === 0.3 ? 'Clean' : 'Std'}</span>
          </button>
          <button
            onClick={() => setIsLive(!isLive)}
            className={`p-1 rounded transition-colors ${
              isLive
                ? 'bg-primary/10 text-primary hover:bg-primary/20'
                : 'bg-bg-secondary text-text-muted hover:text-text-primary'
            }`}
            title={isLive ? 'Pause oscilloscope stream' : 'Resume oscilloscope stream'}
          >
            {isLive ? <Pause size={12} /> : <Play size={12} />}
          </button>
        </div>
      </div>

      {/* Canvas Display */}
      <div className="relative w-full h-24 rounded-lg overflow-hidden bg-[#03070C] border border-border-subtle/80 flex items-center justify-center">
        <canvas
          ref={canvasRef}
          width={320}
          height={96}
          className="w-full h-full block"
        />

        {/* Live Overlay Ticker */}
        <div className="absolute top-1.5 right-2 font-mono text-[9px] text-primary/80 bg-bg-primary/70 px-1.5 py-0.5 rounded border border-primary/20 pointer-events-none">
          {metricValue}
        </div>
        <div className="absolute bottom-1.5 left-2 font-mono text-[9px] text-text-muted/80 bg-bg-primary/70 px-1.5 py-0.5 rounded border border-border-subtle pointer-events-none">
          {secondaryMetric}
        </div>
      </div>

      {/* Diagnostics footer line */}
      <div className="flex items-center justify-between text-[10px] font-mono text-text-muted px-0.5">
        <span className="flex items-center gap-1">
          <Zap size={10} className="text-primary" />
          <span>REALTIME TELEMETRY</span>
        </span>
        <span className="text-primary font-medium">{secondaryMetric}</span>
      </div>
    </div>
  );
};

export default LiveSignalWaveform;
