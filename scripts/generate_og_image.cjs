const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function generateOGImage() {
  const width = 1200;
  const height = 630;

  const publicDir = path.join(__dirname, '..', 'public');
  const profileImgPath = path.join(publicDir, 'images', 'profile-400.jpg');

  // Prepare cropped operator photo with phosphor border & corner reticles for OG card
  const photoSize = 160;
  let photoBuffer = null;
  if (fs.existsSync(profileImgPath)) {
    const rawPhoto = await sharp(profileImgPath)
      .resize(photoSize, photoSize)
      .toBuffer();

    // Composite 1px phosphor frame & corner brackets
    const frameSvg = Buffer.from(`
      <svg width="${photoSize}" height="${photoSize}" viewBox="0 0 ${photoSize} ${photoSize}" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.5" y="0.5" width="${photoSize - 1}" height="${photoSize - 1}" fill="none" stroke="#39FF88" stroke-width="1" stroke-opacity="0.6"/>
        <path d="M 0 10 L 0 0 L 10 0" fill="none" stroke="#39FF88" stroke-width="2"/>
        <path d="M ${photoSize} 10 L ${photoSize} 0 L ${photoSize - 10} 0" fill="none" stroke="#39FF88" stroke-width="2"/>
        <path d="M 0 ${photoSize - 10} L 0 ${photoSize} L 10 ${photoSize}" fill="none" stroke="#39FF88" stroke-width="2"/>
        <path d="M ${photoSize} ${photoSize - 10} L ${photoSize} ${photoSize} L ${photoSize - 10} ${photoSize}" fill="none" stroke="#39FF88" stroke-width="2"/>
      </svg>
    `);

    photoBuffer = await sharp(rawPhoto)
      .composite([{ input: frameSvg, blend: 'over' }])
      .png()
      .toBuffer();
  }

  // Dynamically read location & operatorId from profile.ts SSOT
  let locationStr = 'Chennai, IN';
  let operatorIdStr = 'ID: VS-001 // OP';
  try {
    const profileSrc = fs.readFileSync(path.join(__dirname, '../src/data/profile.ts'), 'utf-8');
    const locMatch = profileSrc.match(/location:\s*['"]([^'"]+)['"]/);
    if (locMatch) locationStr = locMatch[1];
    const opMatch = profileSrc.match(/operatorId:\s*['"]([^'"]+)['"]/);
    if (opMatch) operatorIdStr = opMatch[1];
  } catch {}

  // Base SVG Overlay (1200x630)
  const svgOverlay = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Subtle PCB Graticule Grid Pattern -->
      <pattern id="graticule" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#121A12" stroke-width="1" />
        <circle cx="40" cy="40" r="1" fill="#1C281C" />
      </pattern>
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
      <rect x="0" y="0" width="340" height="32" fill="#0B0E0B" stroke="#1A231A" stroke-width="1" />
      <circle cx="16" cy="16" r="4.5" fill="#39FF88" />
      <text x="32" y="20.5" fill="#39FF88" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="bold" letter-spacing="1.5">
        // HARDWARE_BENCH_SYS · ONLINE
      </text>
      <text x="380" y="20.5" fill="#6D7D6D" font-family="'JetBrains Mono', monospace" font-size="12" letter-spacing="1">
        PORT: /dev/ttyUSB0 · BAUD: 115200 · CLK: 240MHz
      </text>
    </g>

    <!-- Left Content Column -->
    <g transform="translate(60, 140)">
      <!-- System Tag -->
      <text x="0" y="20" fill="#39FF88" font-family="'JetBrains Mono', monospace" font-size="13" font-weight="bold" letter-spacing="2">
        [01] // OPERATOR_DOSSIER · ID: VS-001
      </text>

      <!-- Name Title -->
      <text x="0" y="72" fill="#EAF2EA" font-family="'JetBrains Mono', monospace" font-size="44" font-weight="900" letter-spacing="-0.5">
        VINESH SHANMUGAM
      </text>

      <!-- Role / Specialty with Cursor -->
      <text x="0" y="112" fill="#39FF88" font-family="'JetBrains Mono', monospace" font-size="22" font-weight="700">
        &gt; ECE Student · Embedded AI &amp; IoT
      </text>

      <!-- Subtitle & Scope -->
      <text x="0" y="148" fill="#CCDACC" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="400">
        Physical Sensors → Microcontrollers → Edge TinyML → Dashboards
      </text>

      <!-- Hardware Registers Panel -->
      <g transform="translate(0, 190)">
        <!-- Register 1: Location -->
        <rect x="0" y="0" width="165" height="58" fill="#0B0E0B" stroke="#1A231A" stroke-width="1" />
        <text x="12" y="20" fill="#6D7D6D" font-family="'JetBrains Mono', monospace" font-size="10" letter-spacing="1">LOCATION:</text>
        <text x="12" y="42" fill="#EAF2EA" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="bold">${locationStr}</text>

        <!-- Register 2: Status -->
        <rect x="175" y="0" width="180" height="58" fill="#0B0E0B" stroke="#1A231A" stroke-width="1" />
        <text x="12" y="20" transform="translate(175,0)" fill="#6D7D6D" font-family="'JetBrains Mono', monospace" font-size="10" letter-spacing="1">STATUS:</text>
        <text x="12" y="42" transform="translate(175,0)" fill="#39FF88" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="bold">Open to Internships</text>

        <!-- Register 3: Stack -->
        <rect x="365" y="0" width="185" height="58" fill="#0B0E0B" stroke="#1A231A" stroke-width="1" />
        <text x="12" y="20" transform="translate(365,0)" fill="#6D7D6D" font-family="'JetBrains Mono', monospace" font-size="10" letter-spacing="1">CORE_STACK:</text>
        <text x="12" y="42" transform="translate(365,0)" fill="#FFB000" font-family="'JetBrains Mono', monospace" font-size="12" font-weight="bold">ESP32 / TinyML / React</text>
      </g>
    </g>

    <!-- Photo Container Frame and Caption in Center Right (x=635, y=140) -->
    <g transform="translate(635, 140)">
      <!-- Placeholder Box for composite -->
      <rect x="0" y="0" width="160" height="160" fill="#0B0E0B" stroke="#1A231A" stroke-width="1" />
      
      <!-- Caption Plate below Photo -->
      <rect x="0" y="160" width="160" height="34" fill="#090C09" stroke="#1A231A" stroke-width="1" />
      <circle cx="12" cy="173" r="3" fill="#39FF88" />
      <text x="22" y="176" fill="#EAF2EA" font-family="'JetBrains Mono', monospace" font-size="9" font-weight="bold">${operatorIdStr}</text>
      <text x="22" y="188" fill="#39FF88" font-family="'JetBrains Mono', monospace" font-size="8">STATUS: ONLINE</text>
    </g>

    <!-- Right Side: Microcontroller Chip Pinout & Oscilloscope Logic Analyzer Graphic -->
    <g transform="translate(825, 135)">
      <!-- Oscilloscope Box Frame -->
      <rect x="0" y="0" width="315" height="395" fill="#080C08" stroke="#1A231A" stroke-width="1.5" />
      <rect x="0" y="0" width="315" height="28" fill="#0B0E0B" stroke="#1A231A" stroke-width="1" />
      <text x="14" y="18" fill="#39FF88" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="bold" letter-spacing="1">
        CH1: LOGIC_ANALYZER · 200kHz
      </text>
      <text x="260" y="18" fill="#FFB000" font-family="'JetBrains Mono', monospace" font-size="10" font-weight="bold">
        RUN
      </text>

      <!-- Graticule grid inside scope -->
      <path d="M 0 85 L 315 85 M 0 145 L 315 145 M 0 205 L 315 205 M 0 265 L 315 265 M 0 325 L 315 325" stroke="#141F14" stroke-width="1" stroke-dasharray="2 3" />
      <path d="M 78 28 L 78 395 M 157 28 L 157 395 M 236 28 L 236 395" stroke="#141F14" stroke-width="1" stroke-dasharray="2 3" />

      <!-- Channel 1: Pulse Waveform (I2C Clock / Data) -->
      <path d="
        M 10 95
        L 35 95 L 35 65 L 75 65 L 75 95
        L 105 95 L 105 65 L 135 65 L 135 95
        L 175 95 L 175 65 L 205 65 L 205 95
        L 245 95 L 245 65 L 280 65 L 280 95
        L 305 95
      " fill="none" stroke="#39FF88" stroke-width="2.5" />
      <text x="12" y="60" fill="#39FF88" font-family="'JetBrains Mono', monospace" font-size="10">D0: I2C_SCL</text>

      <!-- Channel 2: PWM / Signal Waveform -->
      <path d="
        M 10 155
        L 50 155 L 50 125 L 70 125 L 70 155
        L 115 155 L 115 125 L 155 125 L 155 155
        L 195 155 L 195 125 L 230 125 L 230 155
        L 270 155 L 270 125 L 300 125 L 300 155
      " fill="none" stroke="#FFB000" stroke-width="2" />
      <text x="12" y="120" fill="#FFB000" font-family="'JetBrains Mono', monospace" font-size="10">D1: I2C_SDA</text>

      <!-- Channel 3: Sine Wave (Sensor Transducer Analog ADC) -->
      <path d="
        M 10 215
        Q 28 185, 46 215 T 82 215 T 118 215 T 154 215 T 190 215 T 226 215 T 262 215 T 298 215
      " fill="none" stroke="#39FF88" stroke-width="2" opacity="0.8" />
      <text x="12" y="180" fill="#39FF88" font-family="'JetBrains Mono', monospace" font-size="10">A0: SENSOR_ADC (MPU6050)</text>

      <!-- Microcontroller Chip Diagram inside bench frame -->
      <g transform="translate(25, 250)">
        <rect x="0" y="0" width="265" height="115" fill="#040504" stroke="#293629" stroke-width="1.5" />
        <rect x="15" y="15" width="235" height="85" fill="#0B0E0B" stroke="#1A231A" stroke-width="1" />
        
        <!-- Pins Left -->
        <rect x="-8" y="25" width="8" height="6" fill="#39FF88" />
        <rect x="-8" y="45" width="8" height="6" fill="#39FF88" />
        <rect x="-8" y="65" width="8" height="6" fill="#39FF88" />
        <rect x="-8" y="85" width="8" height="6" fill="#39FF88" />

        <!-- Pins Right -->
        <rect x="265" y="25" width="8" height="6" fill="#FFB000" />
        <rect x="265" y="45" width="8" height="6" fill="#FFB000" />
        <rect x="265" y="65" width="8" height="6" fill="#FFB000" />
        <rect x="265" y="85" width="8" height="6" fill="#FFB000" />

        <text x="132" y="52" fill="#EAF2EA" font-family="'JetBrains Mono', monospace" font-size="15" font-weight="bold" text-anchor="middle">
          ESP32-WROOM-32D
        </text>
        <text x="132" y="74" fill="#39FF88" font-family="'JetBrains Mono', monospace" font-size="11" text-anchor="middle">
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

  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const outPath = path.join(publicDir, 'og-image.png');
  const composites = [];
  if (photoBuffer) {
    composites.push({
      input: photoBuffer,
      top: 140,
      left: 635,
    });
  }

  await sharp(Buffer.from(svgOverlay))
    .composite(composites)
    .png()
    .toFile(outPath);

  console.log(`✅ Successfully generated og-image.png with profile photo at ${outPath} (${width}x${height})`);
}

generateOGImage().catch((err) => {
  console.error('Error generating OG image:', err);
  process.exit(1);
});
