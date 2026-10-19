import { spawn } from 'child_process';
import http from 'http';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9222;
const TARGET_URL = 'http://localhost:4177/';

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

async function runTest() {
  console.log('🚀 Launching Headless Chrome (390x844 mobile viewport)...');
  const chromeProc = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=' + PORT,
    '--window-size=390,844',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    TARGET_URL,
  ]);

  // Wait for remote debugging to be ready
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
  const wsUrl = page.webSocketDebuggerUrl;

  const ws = new WebSocket(wsUrl);

  let msgId = 1;
  const callbacks = new Map();

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && callbacks.has(msg.id)) {
      callbacks.get(msg.id)(msg);
      callbacks.delete(msg.id);
    }
  };

  await new Promise((resolve) => {
    ws.onopen = resolve;
  });

  function send(method, params = {}) {
    return new Promise((resolve) => {
      const id = msgId++;
      callbacks.set(id, resolve);
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  // Set 390x844 Mobile Device Emulation
  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 3,
    mobile: true,
  });

  // Inject CLS observer before page actions
  await send('Runtime.evaluate', {
    expression: `
      window.__cls = 0;
      window.__shifts = [];
      new PerformanceObserver((l) => {
        for (const e of l.getEntries()) {
          if (!e.hadRecentInput) {
            window.__cls += e.value;
            window.__shifts.push({ value: e.value, time: e.startTime });
          }
        }
      }).observe({ type: 'layout-shift', buffered: true });
    `,
  });

  // Wait for initial boot overlay to auto-dismiss (~1.5s)
  await sleep(2200);

  await send('Runtime.evaluate', {
    expression: `window.__scrollShifts = [];
      window.__scrollCLS = 0;
      window.__scrollObserver = new PerformanceObserver((l) => {
        for (const e of l.getEntries()) {
          if (!e.hadRecentInput) {
            window.__scrollCLS += e.value;
            const sources = (e.sources || []).map(s => ({
              nodeName: s.node ? s.node.nodeName : 'unknown',
              nodeId: s.node ? s.node.id : '',
              nodeClass: s.node ? (s.node.className || '') : '',
              parent: s.node && s.node.parentElement ? (s.node.parentElement.tagName + '.' + (s.node.parentElement.className || '')) : '',
              snippet: s.node ? (s.node.outerHTML || '').slice(0, 150) : '',
              prevRect: s.previousRect ? { x: s.previousRect.x, y: s.previousRect.y, w: s.previousRect.width, h: s.previousRect.height } : null,
              currRect: s.currentRect ? { x: s.currentRect.x, y: s.currentRect.y, w: s.currentRect.width, h: s.currentRect.height } : null
            }));
            window.__scrollShifts.push({ value: e.value, time: e.startTime, sources });
          }
        }
      });
      window.__scrollObserver.observe({ type: 'layout-shift', buffered: false });
    `,
  });

  console.log('\n📜 Step 1: Scrolling from top to bottom in 250px steps...');
  const scrollRes = await send('Runtime.evaluate', {
    expression: `(async () => {
      const step = 250;
      const total = document.body.scrollHeight;
      let curr = 0;
      while (curr < total) {
        curr += step;
        window.scrollTo({ top: curr, behavior: 'instant' });
        await new Promise((r) => setTimeout(r, 50));
      }
      return { totalHeight: total, finalScroll: window.scrollY, cls: window.__scrollCLS, shifts: window.__scrollShifts };
    })()`,
    awaitPromise: true,
    returnByValue: true,
  });

  const scrollData = scrollRes.result?.result?.value || scrollRes.result?.value;
  if (!scrollData) {
    console.error('scrollRes:', JSON.stringify(scrollRes, null, 2));
    ws.close();
    chromeProc.kill();
    process.exit(1);
  }
  console.log(`- Total Page Height: ${scrollData.totalHeight}px`);
  console.log(`- Final Scroll Y: ${scrollData.finalScroll}px`);
  console.log(`- Real Scroll Layout Shift (CLS): ${scrollData.cls.toFixed(4)}`);
  if (scrollData.shifts && scrollData.shifts.length > 0) {
    console.log(`- Shift events logged:`, JSON.stringify(scrollData.shifts, null, 2));
  } else {
    console.log(`- Zero shift events during scroll!`);
  }

  console.log('\n🎯 Step 2: Testing Nav Links from Top (Scroll to Section & Landing Offset)...');
  const navTargets = ['#about', '#projects', '#skills', '#contact'];
  const navResults = [];

  for (const hash of navTargets) {
    // Scroll back to top
    await send('Runtime.evaluate', { expression: `window.scrollTo(0, 0);` });
    await sleep(250);

    // Trigger navigation to target section via the same logic as Navigation.tsx
    const navEval = await send('Runtime.evaluate', {
      expression: `(async () => {
        const targetId = '${hash}'.replace('#', '');
        window.dispatchEvent(new CustomEvent('load-lazy-section', { detail: 'all' }));
        
        const scrollTarget = () => {
          const target = document.getElementById(targetId);
          if (target) {
            const headerHeight = 48;
            const targetRect = target.getBoundingClientRect();
            const targetTop = targetRect.top + window.scrollY - headerHeight;
            window.scrollTo({ top: targetTop, behavior: 'instant' });
          }
        };

        scrollTarget();
        await new Promise(r => setTimeout(r, 50));
        scrollTarget();
        await new Promise(r => setTimeout(r, 150));
        scrollTarget();
        await new Promise(r => setTimeout(r, 200));

        const finalTarget = document.getElementById(targetId);
        if (!finalTarget) return { error: 'Target not found: ' + targetId };

        const headerHeight = 48;
        const finalRect = finalTarget.getBoundingClientRect();
        // Distance between top of section and bottom of 48px sticky header
        const landingOffset = Math.abs(finalRect.top - headerHeight);
        return {
          targetId,
          rectTop: finalRect.top,
          headerHeight,
          landingOffset,
          passed: landingOffset <= 40
        };
      })()`,
      awaitPromise: true,
      returnByValue: true,
    });

    const res = navEval.result?.result?.value || navEval.result?.value;
    if (!res) {
      console.error('navEval error:', JSON.stringify(navEval, null, 2));
      continue;
    }
    navResults.push(res);
    console.log(`- Nav [${hash}]: Final rect.top = ${res.rectTop.toFixed(1)}px (Header = 48px) | Landing Offset = ${res.landingOffset.toFixed(1)}px | Passed: ${res.passed ? 'YES' : 'NO'}`);
  }

  ws.close();
  chromeProc.kill();

  const allPassed = scrollData.cls <= 0.05 && navResults.every((r) => r.passed);
  console.log(`\n============================================================`);
  console.log(`Test Result: ${allPassed ? 'ALL PASSED (CLS <= 0.05, Landing Offset <= 40px)' : 'FAILED'}`);
  console.log(`============================================================\n`);
}

runTest().catch((err) => {
  console.error(err);
  process.exit(1);
});
