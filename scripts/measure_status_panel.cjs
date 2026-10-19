const { spawn } = require('child_process');
const http = require('http');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9229;
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

async function measureStatusPanel() {
  const chromeProc = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=' + PORT,
    '--disable-gpu',
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
  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true,
  });

  await send('Page.navigate', { url: TARGET_URL });
  await sleep(400); // During boot animation

  const duringBoot = await send('Runtime.evaluate', {
    expression: `(function() {
      const panel = document.querySelector('.console-panel');
      const inner = panel ? panel.children[1] : null;
      return {
        panelHeight: panel ? panel.getBoundingClientRect().height : 0,
        innerHeight: inner ? inner.getBoundingClientRect().height : 0
      };
    })()`,
    returnByValue: true
  });
  console.log('During boot animation (t=400ms):', duringBoot.result.result.value);

  await sleep(1500); // After boot animation finishes

  const afterBoot = await send('Runtime.evaluate', {
    expression: `(function() {
      const panel = document.querySelector('.console-panel');
      const inner = panel ? panel.children[1] : null;
      return {
        panelHeight: panel ? panel.getBoundingClientRect().height : 0,
        innerHeight: inner ? inner.getBoundingClientRect().height : 0
      };
    })()`,
    returnByValue: true
  });
  console.log('After boot animation finishes (t=1900ms):', afterBoot.result.result.value);

  ws.close();
  chromeProc.kill();
}

measureStatusPanel().catch(console.error);
