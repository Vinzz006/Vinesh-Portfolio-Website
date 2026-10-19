const { spawn } = require('child_process');
const http = require('http');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9226;
const TARGET_URL = 'http://localhost:4178/';

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

async function testSafariSimulation() {
  console.log('--- SAFARI SIMULATION TEST ---');
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
    await sleep(400);
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
  await send('Runtime.enable');

  // Delete requestIdleCallback and cancelIdleCallback to simulate Safari / iOS WebKit
  await send('Page.addScriptToEvaluateOnNewDocument', {
    source: `
      delete window.requestIdleCallback;
      delete window.cancelIdleCallback;
      window.__safariSimulated = true;
      console.log('[Safari Simulation] Deleted window.requestIdleCallback and cancelIdleCallback');
    `,
  });

  await send('Page.navigate', { url: TARGET_URL });

  // Wait 2.5s for initial mount and idle timeout fallback (200ms) to trigger
  await sleep(2500);

  // 1. Verify window.requestIdleCallback is undefined
  const idleCheck = await send('Runtime.evaluate', {
    expression: `({
      hasRequestIdleCallback: 'requestIdleCallback' in window,
      typeOfRIC: typeof window.requestIdleCallback,
      safariSimulated: window.__safariSimulated
    })`,
    returnByValue: true,
  });
  console.log('1. Safari environment verification:', idleCheck.result.result.value);

  // 2. Verify oscilloscope animation
  const canvasCheck = await send('Runtime.evaluate', {
    expression: `(function() {
      const canvas = document.querySelector('canvas[aria-label="Oscilloscope real-time waveform display"]');
      if (!canvas) return { found: false };
      const ctx = canvas.getContext('2d');
      const img1 = canvas.toDataURL();
      return {
        found: true,
        width: canvas.width,
        height: canvas.height,
        dataUrlLen: img1.length
      };
    })()`,
    returnByValue: true,
  });
  console.log('2. Oscilloscope canvas initial check:', canvasCheck.result.result.value);

  // Wait 400ms and check if frame changed (animation running)
  await sleep(400);

  const canvasAnimCheck = await send('Runtime.evaluate', {
    expression: `(function() {
      const canvas = document.querySelector('canvas[aria-label="Oscilloscope real-time waveform display"]');
      if (!canvas) return { animating: false, reason: 'no canvas' };
      const ctx = canvas.getContext('2d');
      const pixelData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let nonZero = 0;
      for (let i = 0; i < pixelData.length; i += 4) {
        if (pixelData[i] > 0 || pixelData[i + 1] > 0 || pixelData[i + 2] > 0) nonZero++;
      }
      return {
        animating: true,
        drawnPixelsCount: nonZero,
        canvasWidth: canvas.width,
        canvasHeight: canvas.height
      };
    })()`,
    returnByValue: true,
  });
  console.log('2b. Oscilloscope waveform active pixels check:', canvasAnimCheck.result.result.value);

  // 3. Verify GitHub section loads
  // Trigger github section load
  await send('Runtime.evaluate', {
    expression: `window.dispatchEvent(new CustomEvent('load-lazy-section', { detail: 'github' }));`,
  });
  await sleep(1500);

  const githubCheck = await send('Runtime.evaluate', {
    expression: `(function() {
      const ghSection = document.getElementById('github');
      if (!ghSection) return { found: false };
      const cards = ghSection.querySelectorAll('.console-panel');
      const text = ghSection.innerText;
      return {
        found: true,
        panelCount: cards.length,
        hasContent: text.length > 50,
        preview: text.substring(0, 120).replace(/\\n/g, ' ')
      };
    })()`,
    returnByValue: true,
  });
  console.log('3. GitHub section load verification:', githubCheck.result.result.value);

  ws.close();
  chromeProc.kill();
  console.log('--- SAFARI SIMULATION TEST COMPLETE ---');
}

testSafariSimulation().catch((err) => {
  console.error(err);
  process.exit(1);
});
