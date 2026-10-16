const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function generateOGImage() {
  const width = 1200;
  const height = 630;

  // Clean, professional light template matching design system
  // Background: #FFFFFF, Surface: #F6F7F9, Text: #111827, Muted: #4B5563, Accent: #1D4ED8, Border: #E5E7EB
  const svgOverlay = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <!-- Background -->
    <rect width="${width}" height="${height}" fill="#FFFFFF" />
    <rect x="24" y="24" width="${width - 48}" height="${height - 48}" rx="8" fill="#F6F7F9" stroke="#E5E7EB" stroke-width="2" />

    <!-- Name Heading -->
    <text x="80" y="220" fill="#111827" font-family="system-ui, -apple-system, sans-serif" font-size="64" font-weight="600" letter-spacing="-1">
      Vinesh Shanmugam
    </text>

    <!-- Primary Title / Role -->
    <text x="80" y="290" fill="#1D4ED8" font-family="system-ui, -apple-system, sans-serif" font-size="34" font-weight="600">
      ECE Student · Embedded AI &amp; IoT
    </text>

    <!-- Subtitle / Positioning -->
    <text x="80" y="348" fill="#4B5563" font-family="system-ui, -apple-system, sans-serif" font-size="24" font-weight="400">
      Also builds full-stack dashboards
    </text>

    <!-- Clean Tech Tags -->
    <g transform="translate(80, 410)">
      <rect x="0" y="0" width="160" height="42" rx="6" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="1.5" />
      <text x="80" y="26" text-anchor="middle" fill="#4B5563" font-family="monospace" font-size="14" font-weight="500">ESP32 &amp; Sensors</text>

      <rect x="176" y="0" width="160" height="42" rx="6" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="1.5" />
      <text x="256" y="26" text-anchor="middle" fill="#4B5563" font-family="monospace" font-size="14" font-weight="500">TinyML &amp; Edge AI</text>

      <rect x="352" y="0" width="160" height="42" rx="6" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="1.5" />
      <text x="432" y="26" text-anchor="middle" fill="#4B5563" font-family="monospace" font-size="14" font-weight="500">FastAPI &amp; React</text>

      <rect x="528" y="0" width="160" height="42" rx="6" fill="#FFFFFF" stroke="#E5E7EB" stroke-width="1.5" />
      <text x="608" y="26" text-anchor="middle" fill="#4B5563" font-family="monospace" font-size="14" font-weight="500">IoT Telemetry</text>
    </g>

    <!-- Clean Footer URL -->
    <g transform="translate(80, 525)">
      <text x="0" y="0" fill="#4B5563" font-family="system-ui, -apple-system, sans-serif" font-size="18">
        https://vinesh-portfolio-website.vercel.app · github.com/Vinzz006
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

  console.log(`Successfully generated clean og-image.png at ${outPath} (${width}x${height})`);
}

generateOGImage().catch((err) => {
  console.error('Error generating OG image:', err);
  process.exit(1);
});
