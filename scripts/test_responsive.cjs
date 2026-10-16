const { chromium } = require('playwright');
const path = require('path');
const http = require('http');
const fs = require('fs');

// Minimal static preview server for dist/
function startServer(port = 4173) {
  const distDir = path.join(__dirname, '..', 'dist');

  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.webp': 'image/webp',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.xml': 'application/xml',
    '.txt': 'text/plain',
  };

  const server = http.createServer((req, res) => {
    let cleanUrl = req.url.split('?')[0];
    let filePath = path.join(distDir, cleanUrl);

    // If directory or no extension, look for index.html
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    } else if (!fs.existsSync(filePath) && !path.extname(cleanUrl)) {
      filePath = path.join(distDir, cleanUrl, 'index.html');
      if (!fs.existsSync(filePath)) {
        filePath = path.join(distDir, 'index.html');
      }
    }

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const ext = path.extname(filePath);
      res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
      fs.createReadStream(filePath).pipe(res);
    } else {
      res.writeHead(404);
      res.end('Not Found');
    }
  });

  return new Promise((resolve) => {
    server.listen(port, () => resolve(server));
  });
}

async function runTests() {
  const port = 4173;
  const server = await startServer(port);
  console.log(`Server running at http://localhost:${port}`);

  const browser = await chromium.launch();
  const page = await browser.newPage();

  const viewports = [
    { name: 'Mobile', width: 375, height: 667 },
    { name: 'Tablet', width: 768, height: 1024 },
    { name: 'Desktop', width: 1440, height: 900 },
  ];

  const testRoutes = [
    '/',
    '/projects',
    '/projects/pancreasense-ai',
    '/about',
    '/experience',
    '/contact',
  ];

  let passed = true;

  for (const vp of viewports) {
    console.log(`\n--- Testing at ${vp.name} (${vp.width}x${vp.height}) ---`);
    await page.setViewportSize({ width: vp.width, height: vp.height });

    for (const route of testRoutes) {
      const url = `http://localhost:${port}${route}`;
      await page.goto(url, { waitUntil: 'networkidle' });

      // Check horizontal scroll
      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });

      if (hasHorizontalScroll) {
        console.error(`❌ [FAIL] Horizontal scroll detected on ${route} at ${vp.width}px!`);
        passed = false;
      } else {
        console.log(`✅ [PASS] No horizontal scroll on ${route} at ${vp.width}px`);
      }

      // Check tap targets on mobile
      if (vp.width <= 768) {
        const smallTargets = await page.evaluate(() => {
          const interactive = Array.from(document.querySelectorAll('button, a.btn-primary, a.btn-secondary, #mobile-nav a'));
          return interactive
            .filter((el) => {
              const rect = el.getBoundingClientRect();
              return rect.width > 0 && rect.height > 0 && (rect.height < 40 || rect.width < 40);
            })
            .map((el) => ({ tag: el.tagName, text: el.textContent.trim().slice(0, 20) }));
        });

        if (smallTargets.length > 0) {
          console.warn(`⚠️ Warning: ${smallTargets.length} interactive elements under 40px height on ${route}`);
        }
      }
    }
  }

  await browser.close();
  server.close();

  if (passed) {
    console.log('\n🎉 ALL RESPONSIVE AND VIEWPORT TESTS PASSED SUCCESSFULLY!');
  } else {
    console.error('\n❌ Responsive test failures detected.');
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error('Test error:', err);
  process.exit(1);
});
