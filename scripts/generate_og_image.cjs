const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function generateOGImage() {
  const width = 1200;
  const height = 630;

  // Authentic Hardware Debug Console & Workbench Graphic (1200x630)
  // Palette: Base #060806, Panel #0B0E0B, Border #1A231A, Accent #39FF88, Amber #FFB000, Text #EAF2EA / #CCDACC / #8B9E8B
  const svgOverlay = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Subtle PCB Graticule Grid Pattern -->
      <pattern id="graticule" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#121A12" stroke-width="1" />
        <circle cx="40" cy="40" r="1" fill="#1C281C" />
      </pattern>
      <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#39FF88" stop-opacity="0.9" />
        <stop offset="60%" stop-color="#39FF88" stop-opacity="0.9" />
        <stop offset="100%" stop-color="#FFB000" stop-opacity="0.9" />
      </linearGradient>
    </defs>

    <!-- Background Base -->
    <rect width="${width}" height="${height}" fill="#060806" />
    <rect width="${width}" height="${height}" fill="url(#graticule)" />

    <!-- Outer 1px Console Border with Crosshair Registration Marks -->
    <rect x="28" y="28" width="${width - 56}" height="${height - 56}" fill="none" stroke="#1A231A" stroke-width="1.5" />
    
    <!-- Corner Crosshairs -->
    <path d="M 20 28 L 36 28 M 28 20 L 28 36" stroke="#39FF88" stroke-width="1.5" />
    <path d="M ${width - 36} 28 L ${width - 20} 28 M ${width - 28} 20 L ${width - 28} 36" stroke="#39FF88" stroke-width="1.5" />
    <path d="M 20 ${height - 28} L 36 ${height - 28} M 28 ${height - 36} L 28 ${height - 20}" stroke="#39FF88" stroke-width="1.5" />
    <path d="M ${width - 36} ${height - 28} L ${width - 20} ${height - 28} M ${width - 28} ${height - 36} L ${width - 28} ${height - 20}" stroke="#39FF88" stroke-width="1.5" />

    <!-- Top Telemetry Header -->
    <g transform="translate(60, 68)">
      <rect x="0" y="0" width="360" height="32" fill="#0B0E0B" stroke="#1A231A" stroke-width="1" />
      <circle cx="16" cy="16" r="4.5" fill="#39FF88" />
      <text x="32" y="20.5" fill="#39FF88" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="bold" letter-spacing="1.5">
        // HARDWARE_BENCH_SYS · ONLINE
      </text>
      <text x="400" y="20.5" fill="#6D7D6D" font-family="'JetBrains Mono', monospace" font-size="12" letter-spacing="1">
        PORT: /dev/ttyUSB0 · BAUD: 115200 · CLK: 240MHz
      </text>
    </g>

    <!-- Left Content Column -->
    <g transform="translate(60, 150)">
      <!-- System Tag -->
      <text x="0" y="25" fill="#39FF88" font-family="'JetBrains Mono', monospace" font-size="14" font-weight="bold" letter-spacing="2">
        [01] // PRINCIPAL_ENGINEER_DOSSIER
      </text>

      <!-- Name Title -->
      <text x="0" y="95" fill="#EAF2EA" font-family="'JetBrains Mono', monospace" font-size="58" font-weight="900" letter-spacing="-1">
        VINESH SHANMUGAM
      </text>

      <!-- Role / Specialty with Blinking Cursor -->
      <text x="0" y="150" fill="#39FF88" font-family="'JetBrains Mono', monospace" font-size="28" font-weight="700">
        &gt; ECE Student · Embedded AI &amp; IoT
      </text>

      <!-- Subtitle & Engineering Scope -->
      <text x="0" y="200" fill="#CCDACC" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="400">
        Physical Transducers → ESP32 Edge ML → Real-Time Web Dashboards
      </text>

      <!-- Hardware Registers Panel -->
      <g transform="translate(0, 245)">
        <!-- Register 1: Location -->
        <rect x="0" y="0" width="220" height="60" fill="#0B0E0B" stroke="#1A231A" stroke-width="1" />
        <text x="14" y="22" fill="#6D7D6D" font-family="'JetBrains Mono', monospace" font-size="10" letter-spacing="1">LOCATION:</text>
        <text x="14" y="44" fill="#EAF2EA" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="bold">Tiruchirappalli, IN</text>

        <!-- Register 2: Status -->
        <rect x="235" y="0" width="210" height="60" fill="#0B0E0B" stroke="#1A231A" stroke-width="1" />
        <text x="249" y="22" fill="#6D7D6D" font-family="'JetBrains Mono', monospace" font-size="10" letter-spacing="1">STATUS:</text>
        <text x="249" y="44" fill="#39FF88" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="bold">Open to Internships</text>

        <!-- Register 3: Stack -->
        <rect x="460" y="0" width="220" height="60" fill="#0B0E0B" stroke="#1A231A" stroke-width="1" />
        <text x="474" y="22" fill="#6D7D6D" font-family="'JetBrains Mono', monospace" font-size="10" letter-spacing="1">CORE_STACK:</text>
        <text x="474" y="44" fill="#FFB000" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="bold">ESP32 / TinyML / React</text>
      </g>
    </g>

    <!-- Right Side: Microcontroller Chip Pinout & Oscilloscope Logic Analyzer Graphic -->
    <g transform="translate(800, 135)">
      <!-- Oscilloscope Box Frame -->
      <rect x="0" y="0" width="340" height="395" fill="#080C08" stroke="#1A231A" stroke-width="1.5" />
      <rect x="0" y="0" width="340" height="28" fill="#0B0E0B" stroke="#1A231A" stroke-width="1" />
      <text x="14" y="18" fill="#39FF88" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="bold" letter-spacing="1">
        CH1: LOGIC_ANALYZER · 200kHz
      </text>
      <text x="280" y="18" fill="#FFB000" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="bold">
        RUN
      </text>

      <!-- Graticule grid inside scope -->
      <path d="M 0 85 L 340 85 M 0 145 L 340 145 M 0 205 L 340 205 M 0 265 L 340 265 M 0 325 L 340 325" stroke="#141F14" stroke-width="1" stroke-dasharray="2 3" />
      <path d="M 85 28 L 85 395 M 170 28 L 170 395 M 255 28 L 255 395" stroke="#141F14" stroke-width="1" stroke-dasharray="2 3" />

      <!-- Channel 1: Pulse Waveform (I2C Clock / Data) -->
      <path d="
        M 10 95
        L 35 95 L 35 65 L 75 65 L 75 95
        L 105 95 L 105 65 L 135 65 L 135 95
        L 180 95 L 180 65 L 210 65 L 210 95
        L 255 95 L 255 65 L 295 65 L 295 95
        L 330 95
      " fill="none" stroke="#39FF88" stroke-width="2.5" />
      <text x="12" y="60" fill="#39FF88" font-family="'JetBrains Mono', monospace" font-size="10">D0: I2C_SCL</text>

      <!-- Channel 2: PWM / Signal Waveform -->
      <path d="
        M 10 155
        L 50 155 L 50 125 L 70 125 L 70 155
        L 120 155 L 120 125 L 160 125 L 160 155
        L 200 155 L 200 125 L 240 125 L 240 155
        L 280 155 L 280 125 L 320 125 L 320 155
      " fill="none" stroke="#FFB000" stroke-width="2" />
      <text x="12" y="120" fill="#FFB000" font-family="'JetBrains Mono', monospace" font-size="10">D1: I2C_SDA</text>

      <!-- Channel 3: Sine Wave (Sensor Transducer Analog ADC) -->
      <path d="
        M 10 215
        Q 30 185, 50 215 T 90 215 T 130 215 T 170 215 T 210 215 T 250 215 T 290 215 T 330 215
      " fill="none" stroke="#39FF88" stroke-width="2" opacity="0.8" />
      <text x="12" y="180" fill="#39FF88" font-family="'JetBrains Mono', monospace" font-size="10">A0: SENSOR_ADC (MPU6050)</text>

      <!-- Microcontroller Chip Diagram inside bench frame -->
      <g transform="translate(35, 250)">
        <rect x="0" y="0" width="270" height="115" fill="#040504" stroke="#293629" stroke-width="1.5" />
        <rect x="15" y="15" width="240" height="85" fill="#0B0E0B" stroke="#1A231A" stroke-width="1" />
        
        <!-- Pins Left -->
        <rect x="-8" y="25" width="8" height="6" fill="#39FF88" />
        <rect x="-8" y="45" width="8" height="6" fill="#39FF88" />
        <rect x="-8" y="65" width="8" height="6" fill="#39FF88" />
        <rect x="-8" y="85" width="8" height="6" fill="#39FF88" />

        <!-- Pins Right -->
        <rect x="270" y="25" width="8" height="6" fill="#FFB000" />
        <rect x="270" y="45" width="8" height="6" fill="#FFB000" />
        <rect x="270" y="65" width="8" height="6" fill="#FFB000" />
        <rect x="270" y="85" width="8" height="6" fill="#FFB000" />

        <text x="135" y="52" fill="#EAF2EA" font-family="'JetBrains Mono', monospace" font-size="15" font-weight="bold" text-anchor="middle">
          ESP32-WROOM-32D
        </text>
        <text x="135" y="74" fill="#39FF88" font-family="'JetBrains Mono', monospace" font-size="11" text-anchor="middle">
          DUAL-CORE XTENSA · 240MHz
        </text>
      </g>
    </g>

    <!-- Bottom Telemetry Status Line -->
    <g transform="translate(60, 565)">
      <line x1="0" y1="0" x2="${width - 120}" y2="0" stroke="#1A231A" stroke-width="1" />
      <text x="0" y="26" fill="#6D7D6D" font-family="'JetBrains Mono', monospace" font-size="12">
        VCS: github.com/Vinzz006
      </text>
      <text x="320" y="26" fill="#6D7D6D" font-family="'JetBrains Mono', monospace" font-size="12">
        ACADEMIC: B.E. ECE (2024–2028)
      </text>
      <text x="680" y="26" fill="#39FF88" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="bold">
        vinesh-portfolio-website.vercel.app
      </text>
    </g>
  </svg>
  `;

  const publicDir = path.join(__dirname, '..', 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const outPath = path.join(publicDir, 'og-image.png');
  await sharp(Buffer.from(svgOverlay))
    .png()
    .toFile(outPath);

  console.log(`Successfully generated og-image.png at ${outPath} (${width}x${height})`);
}

generateOGImage().catch((err) => {
  console.error('Error generating OG image:', err);
  process.exit(1);
});
