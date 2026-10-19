import { useEffect, useRef, useState, useMemo, useCallback } from 'react';

interface PinSpec {
  id: string;
  pinNum: string;
  name: string;
  func: string;
  type: 'analog' | 'i2c' | 'spi' | 'uart' | 'power' | 'gpio';
  voltage: string;
  frequency: string;
  description: string;
  waveformType: 'analog-sine' | 'i2c-packets' | 'square-pwm' | 'uart-stream' | 'dc-flat';
}

const PINS_LEFT: PinSpec[] = [
  {
    id: 'p3v3',
    pinNum: '01',
    name: '3V3',
    func: 'VCC_REG',
    type: 'power',
    voltage: '3.30 V',
    frequency: 'DC',
    description: 'Regulated system power rail, low ripple LDO output.',
    waveformType: 'dc-flat',
  },
  {
    id: 'p04',
    pinNum: '04',
    name: 'GPIO_04',
    func: 'ADC1_CH3',
    type: 'analog',
    voltage: '1.65 V',
    frequency: '50.0 Hz',
    description: 'Analog IMU accelerometer channel (Ax motion data).',
    waveformType: 'analog-sine',
  },
  {
    id: 'p18',
    pinNum: '18',
    name: 'GPIO_18',
    func: 'SPI_SCK',
    type: 'spi',
    voltage: '3.28 V',
    frequency: '20.0 MHz',
    description: 'High-speed SPI master clock for display & external flash.',
    waveformType: 'square-pwm',
  },
  {
    id: 'p21',
    pinNum: '21',
    name: 'GPIO_21',
    func: 'I2C_SDA',
    type: 'i2c',
    voltage: '3.25 V',
    frequency: '400 kHz',
    description: 'I2C Fast Mode serial data bus connected to MPU6050 sensor.',
    waveformType: 'i2c-packets',
  },
  {
    id: 'p22',
    pinNum: '22',
    name: 'GPIO_22',
    func: 'I2C_SCL',
    type: 'i2c',
    voltage: '3.26 V',
    frequency: '400 kHz',
    description: 'I2C Fast Mode serial clock line.',
    waveformType: 'square-pwm',
  },
];

const PINS_RIGHT: PinSpec[] = [
  {
    id: 'pgnd',
    pinNum: '00',
    name: 'GND',
    func: 'COMMON_GND',
    type: 'power',
    voltage: '0.00 V',
    frequency: '0 Hz',
    description: 'Common system ground plane reference.',
    waveformType: 'dc-flat',
  },
  {
    id: 'p43',
    pinNum: '43',
    name: 'GPIO_43',
    func: 'UART0_TX',
    type: 'uart',
    voltage: '3.24 V',
    frequency: '115.2 kBaud',
    description: 'Debug serial console telemetry stream to workstation.',
    waveformType: 'uart-stream',
  },
  {
    id: 'p44',
    pinNum: '44',
    name: 'GPIO_44',
    func: 'UART0_RX',
    type: 'uart',
    voltage: '3.22 V',
    frequency: '115.2 kBaud',
    description: 'Debug console bidirectional commands input receiver.',
    waveformType: 'uart-stream',
  },
  {
    id: 'p25',
    pinNum: '25',
    name: 'GPIO_25',
    func: 'DAC_CH1',
    type: 'analog',
    voltage: '2.14 V',
    frequency: '1.20 kHz',
    description: 'Analog output channel for synthetic biological test signals.',
    waveformType: 'analog-sine',
  },
  {
    id: 'p33',
    pinNum: '33',
    name: 'GPIO_33',
    func: 'IMU_INT1',
    type: 'gpio',
    voltage: '3.30 V',
    frequency: 'EDGE_TRIG',
    description: 'Hardware fall detection sudden-impact interrupt line.',
    waveformType: 'i2c-packets',
  },
];

export default function MicrocontrollerWorkbench() {
  const [activePinId, setActivePinId] = useState<string>('p21');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const phaseRef = useRef<number>(0);

  const allPins = useMemo(() => [...PINS_LEFT, ...PINS_RIGHT], []);
  const activePin = useMemo(
    () => allPins.find((p) => p.id === activePinId) || PINS_LEFT[3],
    [allPins, activePinId]
  );

  // High-performance 60fps 2D Canvas Oscilloscope
  const drawWaveform = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const midY = height / 2;

    // Clear with dark graticule background
    ctx.fillStyle = '#040504';
    ctx.fillRect(0, 0, width, height);

    // Draw Graticule Grid (horizontal & vertical dotted lines)
    ctx.strokeStyle = 'rgba(57, 255, 136, 0.08)';
    ctx.lineWidth = 1;
    ctx.setLineDash([2, 4]);

    const cols = 8;
    const rows = 4;
    for (let c = 1; c < cols; c++) {
      const x = (width / cols) * c;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let r = 1; r < rows; r++) {
      const y = (height / rows) * r;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    ctx.setLineDash([]);

    // Center baseline
    ctx.strokeStyle = 'rgba(57, 255, 136, 0.15)';
    ctx.beginPath();
    ctx.moveTo(0, midY);
    ctx.lineTo(width, midY);
    ctx.stroke();

    phaseRef.current += 0.045;
    const phase = phaseRef.current;

    // Draw Oscilloscope Trace Line
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#39FF88';
    ctx.shadowColor = '#39FF88';
    ctx.shadowBlur = 6;
    ctx.beginPath();

    const waveType = activePin.waveformType;

    for (let x = 0; x < width; x += 2) {
      const t = (x / width) * 4 * Math.PI + phase;
      let y = midY;

      if (waveType === 'analog-sine') {
        const primary = Math.sin(t * 1.5) * (height * 0.32);
        const harmonic = Math.sin(t * 4.2) * (height * 0.06);
        const noise = (Math.random() - 0.5) * 1.5;
        y = midY + primary + harmonic + noise;
      } else if (waveType === 'i2c-packets') {
        const cycle = (t * 2) % (2 * Math.PI);
        const bit = Math.sin(t * 6) > 0 ? 1 : 0;
        const packetEnvelope = Math.sin(t * 0.5) > 0 ? 1 : 0.2;
        const square = bit * packetEnvelope;
        y = midY - square * (height * 0.34) + (height * 0.17);
      } else if (waveType === 'square-pwm') {
        const sq = Math.sin(t * 4) > 0 ? 1 : -1;
        y = midY + sq * (height * 0.3);
      } else if (waveType === 'uart-stream') {
        const bitStream = Math.sin(t * 8 + Math.cos(t * 2)) > 0.1 ? 1 : -1;
        y = midY + bitStream * (height * 0.28) + (Math.random() - 0.5) * 1;
      } else if (waveType === 'dc-flat') {
        y = activePin.id === 'pgnd' ? height - 12 : 18;
      }

      if (x === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();
    ctx.shadowBlur = 0; // reset shadow

    animFrameRef.current = requestAnimationFrame(drawWaveform);
  }, [activePin]);

  useEffect(() => {
    animFrameRef.current = requestAnimationFrame(drawWaveform);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [drawWaveform]);

  // Adjust canvas resolution to parent size
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.floor(rect.width * window.devicePixelRatio || 400);
    canvas.height = Math.floor(rect.height * window.devicePixelRatio || 120);
  }, []);

  return (
    <div className="w-full font-mono text-xs select-none">
      {/* Chassis Perimeter Frame */}
      <div className="console-panel border border-console-border p-4 relative bg-[#080B08]">
        {/* Corner Brackets */}
        <span className="absolute -top-[1px] -left-[1px] text-phosphor/60 font-bold leading-none">┌</span>
        <span className="absolute -top-[1px] -right-[1px] text-phosphor/60 font-bold leading-none">┐</span>
        <span className="absolute -bottom-[1px] -left-[1px] text-phosphor/60 font-bold leading-none">└</span>
        <span className="absolute -bottom-[1px] -right-[1px] text-phosphor/60 font-bold leading-none">┘</span>

        {/* Panel Header */}
        <div className="border-b border-console-border pb-2.5 mb-3.5 flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-2">
            <span className="led-phosphor animate-pulse" />
            <span className="font-bold text-phosphor tracking-wider uppercase">
              HARDWARE BENCH // LOGIC PROBE
            </span>
          </div>
          <span className="text-term-muted text-[10px]">
            CHIP: ESP32-S3-WROOM-1 · 240MHz
          </span>
        </div>

        {/* Microcontroller Package Layout */}
        <div className="grid grid-cols-12 gap-2 items-center my-2">
          {/* Left Pin Header Column */}
          <div className="col-span-4 space-y-1.5">
            {PINS_LEFT.map((pin) => {
              const isActive = pin.id === activePinId;
              return (
                <button
                  key={pin.id}
                  onClick={() => setActivePinId(pin.id)}
                  onMouseEnter={() => setActivePinId(pin.id)}
                  className={`w-full text-left px-2 py-1 flex items-center justify-between border transition-all text-[10px] ${
                    isActive
                      ? 'border-phosphor bg-phosphor/15 text-phosphor font-bold shadow-[0_0_10px_rgba(57,255,136,0.25)]'
                      : 'border-console-border/70 bg-[#040504] text-term-muted hover:border-phosphor/40 hover:text-term-bright'
                  }`}
                >
                  <span className="truncate">{pin.name}</span>
                  <span className="text-[9px] opacity-75 font-mono">[{pin.pinNum}]</span>
                </button>
              );
            })}
          </div>

          {/* Central Silicon IC Core */}
          <div className="col-span-4 bg-[#050705] border-2 border-console-border/90 p-3 text-center relative overflow-hidden flex flex-col justify-center items-center h-[160px]">
            <div className="w-2.5 h-2.5 rounded-full border border-phosphor/40 absolute top-2 left-2 bg-[#080B08]" title="Pin 1 Index Notch" />
            <span className="text-[9px] text-term-muted tracking-widest uppercase">ESPRESSIF</span>
            <span className="text-xs font-black text-term-bright tracking-tight mt-0.5">ESP32-S3</span>
            <span className="text-[8px] text-phosphor/80 font-mono tracking-wider mt-1 px-1.5 py-0.5 border border-phosphor/30 bg-phosphor/5">
              TINYML EDGE AI
            </span>
            <span className="text-[8px] text-term-dim mt-2 tracking-widest">XTENSA LX7 32-BIT</span>
          </div>

          {/* Right Pin Header Column */}
          <div className="col-span-4 space-y-1.5">
            {PINS_RIGHT.map((pin) => {
              const isActive = pin.id === activePinId;
              return (
                <button
                  key={pin.id}
                  onClick={() => setActivePinId(pin.id)}
                  onMouseEnter={() => setActivePinId(pin.id)}
                  className={`w-full text-left px-2 py-1 flex items-center justify-between border transition-all text-[10px] ${
                    isActive
                      ? 'border-phosphor bg-phosphor/15 text-phosphor font-bold shadow-[0_0_10px_rgba(57,255,136,0.25)]'
                      : 'border-console-border/70 bg-[#040504] text-term-muted hover:border-phosphor/40 hover:text-term-bright'
                  }`}
                >
                  <span className="text-[9px] opacity-75 font-mono">[{pin.pinNum}]</span>
                  <span className="truncate">{pin.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Probed Channel Specification Block */}
        <div className="mt-3 pt-3 border-t border-console-border grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px]">
          <div className="p-1.5 border border-console-border bg-[#040504]">
            <span className="text-term-dim block">CHANNEL:</span>
            <span className="text-phosphor font-bold">{activePin.name}</span>
          </div>
          <div className="p-1.5 border border-console-border bg-[#040504]">
            <span className="text-term-dim block">FUNCTION:</span>
            <span className="text-term-bright font-semibold">{activePin.func}</span>
          </div>
          <div className="p-1.5 border border-console-border bg-[#040504]">
            <span className="text-term-dim block">LEVEL:</span>
            <span className="text-term-bright font-semibold">{activePin.voltage}</span>
          </div>
          <div className="p-1.5 border border-console-border bg-[#040504]">
            <span className="text-term-dim block">FREQUENCY:</span>
            <span className="text-amber font-semibold">{activePin.frequency}</span>
          </div>
        </div>

        {/* Description line */}
        <div className="mt-2 text-[10px] text-term-muted border-l-2 border-phosphor/50 pl-2 py-0.5 truncate">
          &gt; {activePin.description}
        </div>

        {/* 60fps Signal Oscilloscope Viewport */}
        <div className="mt-3 relative border border-console-border bg-[#040504]">
          <div className="absolute top-1.5 left-2 z-10 flex items-center gap-2 text-[9px] text-term-dim">
            <span className="text-phosphor">CH_A // 500mV/DIV</span>
            <span>TIME: 2.5ms/DIV</span>
            <span>TRIGGER: AUTO</span>
          </div>
          <canvas
            ref={canvasRef}
            className="w-full h-[95px] block"
            aria-label="Oscilloscope real-time waveform display"
          />
        </div>
      </div>
    </div>
  );
}
