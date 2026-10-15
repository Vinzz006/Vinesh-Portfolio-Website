const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function generateOGImage() {
  const width = 1200;
  const height = 630;

  // Modern cybernetic SVG template with dark palette (#050505, #00D4FF, #7C3AED, #10B981)
  const svgOverlay = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#050505" />
        <stop offset="50%" stop-color="#080C14" />
        <stop offset="100%" stop-color="#050505" />
      </linearGradient>

      <radialGradient id="cyanGlow" cx="15%" cy="20%" r="50%">
        <stop offset="0%" stop-color="#00D4FF" stop-opacity="0.18" />
        <stop offset="100%" stop-color="#00D4FF" stop-opacity="0" />
      </radialGradient>

      <radialGradient id="purpleGlow" cx="85%" cy="80%" r="50%">
        <stop offset="0%" stop-color="#7C3AED" stop-opacity="0.16" />
        <stop offset="100%" stop-color="#7C3AED" stop-opacity="0" />
      </radialGradient>

      <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#00D4FF" />
        <stop offset="100%" stop-color="#7C3AED" />
      </linearGradient>
    </defs>

    <!-- Background Base -->
    <rect width="${width}" height="${height}" fill="url(#bgGrad)" />
    <rect width="${width}" height="${height}" fill="url(#cyanGlow)" />
    <rect width="${width}" height="${height}" fill="url(#purpleGlow)" />

    <!-- Outer Border with subtle glow -->
    <rect x="24" y="24" width="${width - 48}" height="${height - 48}" rx="20" fill="none" stroke="rgba(255, 255, 255, 0.12)" stroke-width="2" />
    <rect x="24" y="24" width="${width - 48}" height="${height - 48}" rx="20" fill="none" stroke="#00D4FF" stroke-opacity="0.2" stroke-width="1" />

    <!-- Top Status Badge -->
    <g transform="translate(80, 85)">
      <rect width="280" height="40" rx="20" fill="#0C121E" stroke="rgba(0, 212, 255, 0.3)" stroke-width="1.5" />
      <circle cx="22" cy="20" r="5" fill="#10B981" />
      <text x="38" y="25" fill="#00D4FF" font-family="monospace" font-size="13" font-weight="bold" letter-spacing="2">SYSTEM PORTFOLIO // 2026</text>
    </g>

    <!-- Name Heading -->
    <text x="80" y="235" fill="#FFFFFF" font-family="system-ui, -apple-system, sans-serif" font-size="68" font-weight="900" letter-spacing="-1">
      Vinesh Shanmugam
    </text>

    <!-- Primary Title -->
    <text x="80" y="315" fill="#00D4FF" font-family="system-ui, -apple-system, sans-serif" font-size="36" font-weight="700">
      ECE Student · Embedded AI &amp; IoT
    </text>

    <!-- Subtitle / Positioning -->
    <text x="80" y="375" fill="#AAB4BE" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="500">
      Also builds full-stack dashboards
    </text>

    <!-- Tech Stack Pill Group -->
    <g transform="translate(80, 440)">
      <!-- Pill 1 -->
      <rect x="0" y="0" width="165" height="42" rx="8" fill="#141923" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />
      <text x="18" y="26" fill="#F5F7FA" font-family="monospace" font-size="14">ESP32 &amp; Sensors</text>

      <!-- Pill 2 -->
      <rect x="180" y="0" width="160" height="42" rx="8" fill="#141923" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />
      <text x="198" y="26" fill="#F5F7FA" font-family="monospace" font-size="14">TinyML &amp; Edge AI</text>

      <!-- Pill 3 -->
      <rect x="355" y="0" width="175" height="42" rx="8" fill="#141923" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />
      <text x="373" y="26" fill="#F5F7FA" font-family="monospace" font-size="14">FastAPI &amp; React 19</text>

      <!-- Pill 4 -->
      <rect x="545" y="0" width="155" height="42" rx="8" fill="#141923" stroke="rgba(255, 255, 255, 0.1)" stroke-width="1" />
      <text x="563" y="26" fill="#F5F7FA" font-family="monospace" font-size="14">MQTT Telemetry</text>
    </g>

    <!-- Footer URL -->
    <g transform="translate(80, 545)">
      <text x="0" y="0" fill="#66717D" font-family="monospace" font-size="16">
        github.com/Vinzz006 · Chennai, India
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
