const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9225;
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

async function runCapture() {
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

  if (!targets) {
    console.error('Failed to connect to Chrome');
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
      callbacks.get(msg.id)(msg);
      callbacks.delete(msg.id);
    }
  };

  function send(method, params = {}) {
    return new Promise((resolve) => {
      const id = msgId++;
      callbacks.set(id, resolve);
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  await new Promise((r) => (ws.onopen = r));

  await send('Page.enable');
  await send('DOM.enable');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true,
  });

  // Inject CLS observer into the page before navigation
  await send('Page.addScriptToEvaluateOnNewDocument', {
    source: `
      window.__clsEntries = [];
      const po = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            const sources = (entry.sources || []).map(s => ({
              nodeName: s.node ? s.node.nodeName : 'unknown',
              className: s.node ? s.node.className : '',
              id: s.node ? s.node.id : '',
              previousRect: s.previousRect,
              currentRect: s.currentRect
            }));
            window.__clsEntries.push({
              value: entry.value,
              startTime: entry.startTime,
              sources: sources
            });
          }
        }
      });
      po.observe({ type: 'layout-shift', buffered: true });
    `
  });

  // Navigate without clearing sessionStorage so we observe FIRST VISIT behavior (boot intro triggered)
  await send('Page.navigate', { url: TARGET_URL });

  // Capture frame-by-frame at intervals (100ms, 250ms, 500ms, 800ms, 1200ms, 1800ms)
  const capturePoints = [100, 250, 500, 800, 1200, 1800];
  let lastTime = 0;

  for (const t of capturePoints) {
    await sleep(t - lastTime);
    lastTime = t;

    const shot = await send('Page.captureScreenshot', { format: 'png' });
    const filePath = path.join(ARTIFACTS_DIR, `boot_flash_frame_${t}ms.png`);
    fs.writeFileSync(filePath, Buffer.from(shot.result.data, 'base64'));
    console.log(`Saved screenshot at ${t}ms: boot_flash_frame_${t}ms.png`);
  }

  // Retrieve CLS entries
  const clsData = await send('Runtime.evaluate', {
    expression: 'JSON.stringify(window.__clsEntries, null, 2)',
    returnByValue: true
  });

  console.log('\n=== CLS SHIFT ENTRIES ===');
  console.log(clsData.result.result.value);

  ws.close();
  chromeProc.kill();
}

runCapture().catch((err) => {
  console.error(err);
  process.exit(1);
});
