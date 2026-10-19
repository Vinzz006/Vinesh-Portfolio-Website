import { execFileSync } from 'child_process';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

function testUrl(uaName, userAgent) {
  const args = [
    '--headless=new',
    '--dump-dom',
    '--disable-gpu',
    '--run-all-compositor-stages-before-draw',
  ];
  if (userAgent) {
    args.push(`--user-agent=${userAgent}`);
  }
  args.push('http://localhost:4178/');

  const html = execFileSync(chromePath, args, {
    encoding: 'utf8',
    maxBuffer: 50 * 1024 * 1024,
    timeout: 25000,
  });

  const sections = [
    { id: 'home', tag: 'section id="home"', text: 'VINESH SHANMUGAM' },
    { id: 'about', tag: 'section id="about"', text: 'Meenakshi' },
    { id: 'projects', tag: 'section id="projects"', text: 'TinyML' },
    { id: 'lab', tag: 'section id="lab"', text: 'SIMULATOR' },
    { id: 'skills', tag: 'section id="skills"', text: 'PIN CONFIGURATION' },
    { id: 'research', tag: 'section id="research"', text: 'RESEARCH' },
    { id: 'experience', tag: 'section id="experience"', text: 'TIMELINE' },
    { id: 'github', tag: 'section id="github"', text: 'TELEMETRY' },
    { id: 'contact', tag: 'section id="contact"', text: 'TRANSMIT SIGNAL' },
    { id: 'footer', tag: 'footer', text: 'SYSTEM TELEMETRY SUMMARY' },
  ];

  console.log(`\n============================================================`);
  console.log(`Headless DOM Inspection: ${uaName}`);
  console.log(`============================================================`);
  for (const s of sections) {
    const hasTag = html.includes(`id="${s.id}"`) || html.includes(`<${s.id}`);
    const hasText = html.includes(s.text);
    const isPlaceholder = html.includes(`data-placeholder-for="${s.id}"`);
    console.log(`- #${s.id.padEnd(11)}: DOM Element: [${hasTag ? 'PRESENT' : 'ABSENT'}], Real Content Loaded: [${hasText ? 'YES' : 'NO'}] ${isPlaceholder ? '(Lazy Placeholder active)' : ''}`);
  }
}

// 1. Regular Human Visitor on Desktop/Mobile WITHOUT scrolling (IntersectionObserver active)
testUrl('Regular Browser Visitor (Zero scroll, mobile/desktop viewport)', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

// 2. Search Engine Crawler / Bot (e.g. Googlebot)
testUrl('Search Engine Bot / Crawler (Googlebot user-agent)', 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)');

// 3. No-JS Visitor (JavaScript disabled in browser)
function testNoJs() {
  const args = [
    '--headless=new',
    '--dump-dom',
    '--disable-gpu',
    '--disable-javascript',
    'http://localhost:4178/'
  ];
  const html = execFileSync(chromePath, args, {
    encoding: 'utf8',
    maxBuffer: 50 * 1024 * 1024,
    timeout: 25000,
  });
  console.log(`\n============================================================`);
  console.log(`Headless DOM Inspection: No-JS Visitor (--disable-javascript)`);
  console.log(`============================================================`);
  const sections = [
    { id: 'home', tag: 'section id="home"', text: 'VINESH SHANMUGAM' },
    { id: 'about', tag: 'section id="about"', text: 'Meenakshi' },
    { id: 'projects', tag: 'section id="projects"', text: 'TinyML' },
    { id: 'skills', tag: 'section id="skills"', text: 'ESP32' },
    { id: 'experience', tag: 'section id="experience"', text: 'Chennai' },
    { id: 'footer', tag: 'footer', text: 'Hardware Debug Console' },
  ];
  for (const s of sections) {
    const hasTag = html.includes(`id="${s.id}"`) || html.includes(`<${s.id}`);
    const hasText = html.includes(s.text);
    console.log(`- #${s.id.padEnd(11)}: DOM Element: [${hasTag ? 'PRESENT' : 'ABSENT'}], Static Content Loaded: [${hasText ? 'YES' : 'NO'}]`);
  }
}
testNoJs();
