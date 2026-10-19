import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9223;
const TARGET_URL = 'http://localhost:4178/';
const ARTIFACTS_DIR = 'C:\\Users\\shanm\\.gemini\\antigravity-ide\\brain\\ca9cf381-9926-4b51-811a-b1078d166992';

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function getJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

async function testLayout() {
  console.log('🚀 Launching Headless Chrome for Multi-Viewport Layout Verification...');
  const chromeProc = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=' + PORT,
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    'about:blank',
  ]);

  let targets = null;
  for (let i = 0; i < 20; i++) {
    await sleep(500);
    try {
      targets = await getJson(`http://127.0.0.1:${PORT}/json`);
      if (targets && targets.length > 0) break;
    } catch {}
  }

  if (!targets || !targets[0]) {
    console.error('❌ Could not connect to Chrome debugging port.');
    chromeProc.kill();
    process.exit(1);
  }

  const page = targets.find((t) => t.type === 'page') || targets[0];
  const ws = new WebSocket(page.webSocketDebuggerUrl);

  let msgId = 1;
  const callbacks = new Map();

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && callbacks.has(msg.id)) {
      const cb = callbacks.get(msg.id);
      callbacks.delete(msg.id);
      cb(msg);
    }
  };

  const send = (method, params = {}) =>
    new Promise((resolve) => {
      const id = msgId++;
      callbacks.set(id, resolve);
      ws.send(JSON.stringify({ id, method, params }));
    });

  await new Promise((resolve) => {
    if (ws.readyState === WebSocket.OPEN) resolve();
    else ws.onopen = resolve;
  });

  await send('Page.enable');
  await send('DOM.enable');
  await send('Page.addScriptToEvaluateOnNewDocument', {
    source: "sessionStorage.setItem('vinesh_boot_seq_seen', 'true');",
  });

  const viewports = [
    { name: 'mobile_360', width: 360, height: 740 },
    { name: 'tablet_768', width: 768, height: 1024 },
    { name: 'desktop_1440', width: 1440, height: 900 },
  ];

  const results = {};

  for (const vp of viewports) {
    console.log(`\n--- Testing ${vp.name} (${vp.width}x${vp.height}) ---`);
    await send('Emulation.setDeviceMetricsOverride', {
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: 2,
      mobile: vp.width < 1000,
    });

    await send('Page.navigate', { url: TARGET_URL });
    await sleep(1500);

    // Skip boot intro cleanly via sessionStorage and ensure top scroll
    await send('Runtime.evaluate', {
      expression: `
        sessionStorage.setItem('vinesh_boot_seq_seen', 'true');
        const boot = document.getElementById('boot-sequence-intro');
        if (boot) boot.remove();
        window.scrollTo(0, 0);
      `,
    });
    await sleep(500);

    // Evaluate layout properties, overflow, and image aspect ratio
    const evalRes = await send('Runtime.evaluate', {
      returnByValue: true,
      expression: `
        (() => {
          const docWidth = document.documentElement.scrollWidth;
          const winWidth = window.innerWidth;
          const hasOverflow = docWidth > winWidth;

          // Find all profile photo images
          const imgs = Array.from(document.querySelectorAll('img[alt*="Portrait of Vinesh Shanmugam"]'));
          const imgData = imgs.map((img, i) => {
            const rect = img.getBoundingClientRect();
            const parent = img.closest('[role="region"]') || img.closest('.group');
            const parentRect = parent ? parent.getBoundingClientRect() : null;
            const aspectRatio = rect.width > 0 ? (rect.width / rect.height) : 0;
            const isSquare = Math.abs(aspectRatio - 1.0) < 0.05;
            return {
              index: i,
              src: img.currentSrc || img.src,
              renderedWidth: Math.round(rect.width),
              renderedHeight: Math.round(rect.height),
              naturalWidth: img.naturalWidth,
              naturalHeight: img.naturalHeight,
              aspectRatio: aspectRatio.toFixed(3),
              isSquare,
              complete: img.complete,
              parentWidth: parentRect ? Math.round(parentRect.width) : null,
              parentHeight: parentRect ? Math.round(parentRect.height) : null,
            };
          });

          return {
            viewportWidth: winWidth,
            docWidth,
            hasOverflow,
            overflowAmount: Math.max(0, docWidth - winWidth),
            imagesFound: imgs.length,
            imgData,
          };
        })()
      `,
    });

    const res = evalRes.result?.result?.value || evalRes.result?.value;
    if (!res) {
      console.log('evalRes raw:', JSON.stringify(evalRes));
      continue;
    }
    results[vp.name] = res;
    console.log(`  Viewport Width: ${res.viewportWidth}px | Document ScrollWidth: ${res.docWidth}px`);
    console.log(`  Horizontal Overflow: ${res.hasOverflow ? `❌ ${res.overflowAmount}px` : '✅ None (0px)'}`);
    console.log(`  Profile Images Found in DOM: ${res.imagesFound}`);
    res.imgData.forEach((img, idx) => {
      console.log(`    Image [${idx}]: Rendered ${img.renderedWidth}x${img.renderedHeight}px (Natural ${img.naturalWidth}x${img.naturalHeight}px)`);
      console.log(`      Aspect Ratio: ${img.aspectRatio} | Square / Not Stretched: ${img.isSquare ? '✅ Yes' : '❌ Stretched'}`);
      console.log(`      Loaded CurrentSrc: ${img.src}`);
    });

    // Capture screenshot of hero
    const heroShot = await send('Page.captureScreenshot', { format: 'png' });
    const heroPath = path.join(ARTIFACTS_DIR, `verify_photo_${vp.name}.png`);
    fs.writeFileSync(heroPath, Buffer.from(heroShot.result.data, 'base64'));
    console.log(`  📸 Saved screenshot: ${heroPath}`);
  }

  // Scroll to About section to test About image
  console.log('\n--- Testing About Section Photo (Desktop 1440px) ---');
  await send('Runtime.evaluate', {
    expression: `
      window.dispatchEvent(new CustomEvent('load-lazy-section', { detail: 'about' }));
      document.getElementById('about')?.scrollIntoView({ behavior: 'instant' });
    `,
  });
  await sleep(1500);

  const aboutEval = await send('Runtime.evaluate', {
    returnByValue: true,
    expression: `
      (() => {
        const aboutSec = document.getElementById('about');
        const img = aboutSec ? aboutSec.querySelector('img[alt*="Portrait of Vinesh Shanmugam"]') : null;
        if (!img) return { found: false };
        const rect = img.getBoundingClientRect();
        return {
          found: true,
          src: img.currentSrc || img.src,
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          isSquare: Math.abs(rect.width / rect.height - 1.0) < 0.05,
          complete: img.complete,
        };
      })()
    `,
  });
  console.log('About Photo Verification:', aboutEval.result?.result?.value || aboutEval.result?.value);

  const aboutShot = await send('Page.captureScreenshot', { format: 'png' });
  const aboutPath = path.join(ARTIFACTS_DIR, `verify_photo_about_1440.png`);
  fs.writeFileSync(aboutPath, Buffer.from(aboutShot.result.data, 'base64'));
  console.log(`  📸 Saved screenshot: ${aboutPath}`);

  chromeProc.kill();
  console.log('\n✅ Multi-viewport verification complete.');
}

testLayout().catch((e) => {
  console.error(e);
  process.exit(1);
});
