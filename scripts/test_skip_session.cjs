const { spawn } = require('child_process');
const http = require('http');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9228;
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

async function testSkipAndSession() {
  console.log('--- TEST SKIP & SESSION GATING ---');
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

  // Navigate to site
  await send('Page.navigate', { url: TARGET_URL });
  await sleep(200);

  // Check overlay is present
  const check1 = await send('Runtime.evaluate', {
    expression: `!!document.getElementById('boot-overlay')`,
    returnByValue: true
  });
  console.log('1. Boot overlay present at 200ms:', check1.result.result.value);

  // Press Escape
  await send('Input.dispatchKeyEvent', { type: 'rawKeyDown', windowsVirtualKeyCode: 27, key: 'Escape' });
  await send('Input.dispatchKeyEvent', { type: 'keyUp', windowsVirtualKeyCode: 27, key: 'Escape' });
  await sleep(350);

  // Verify overlay removed
  const check2 = await send('Runtime.evaluate', {
    expression: `({
      overlayPresent: !!document.getElementById('boot-overlay'),
      sessionSeen: sessionStorage.getItem('vinesh_boot_seq_seen')
    })`,
    returnByValue: true
  });
  console.log('2. After pressing Escape:', check2.result.result.value);

  // Reload page within same session (sessionStorage preserved)
  await send('Page.reload');
  await sleep(200);

  // Verify overlay does NOT appear on second visit
  const check3 = await send('Runtime.evaluate', {
    expression: `({
      overlayPresent: !!document.getElementById('boot-overlay'),
      skipBootClass: document.documentElement.classList.contains('skip-boot')
    })`,
    returnByValue: true
  });
  console.log('3. On reload within same session:', check3.result.result.value);

  ws.close();
  chromeProc.kill();
  console.log('--- TEST COMPLETE ---');
}

testSkipAndSession().catch((err) => {
  console.error(err);
  process.exit(1);
});
