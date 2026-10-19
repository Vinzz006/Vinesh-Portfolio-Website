const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const TARGET_URL = 'http://localhost:4178/';
const RUNS = 3;

function runLighthouse(index) {
  const outputPath = path.join(__dirname, `../lh-report-${index}.json`);
  console.log(`\n⏳ Running Mobile Lighthouse Run #${index + 1}...`);
  
  const cmd = `npx lighthouse ${TARGET_URL} --output=json --output-path="${outputPath}" --only-categories=performance,accessibility,best-practices,seo --form-factor=mobile --screenEmulation.mobile=true --screenEmulation.width=390 --screenEmulation.height=844 --screenEmulation.deviceScaleFactor=2 --throttlingMethod=simulate --chrome-flags="--headless=new --disable-gpu" --quiet`;

  execSync(cmd, { stdio: 'inherit', timeout: 120000 });

  const jsonStr = fs.readFileSync(outputPath, 'utf8');
  const report = JSON.parse(jsonStr);

  const perf = Math.round((report.categories.performance?.score || 0) * 100);
  const a11y = Math.round((report.categories.accessibility?.score || 0) * 100);
  const bp = Math.round((report.categories['best-practices']?.score || 0) * 100);
  const seo = Math.round((report.categories.seo?.score || 0) * 100);

  const fcp = report.audits['first-contentful-paint']?.numericValue || 0;
  const lcp = report.audits['largest-contentful-paint']?.numericValue || 0;
  const tbt = report.audits['total-blocking-time']?.numericValue || 0;
  const cls = report.audits['cumulative-layout-shift']?.numericValue || 0;

  console.log(`Run #${index + 1} Results:`);
  console.log(`  Performance: ${perf} | Accessibility: ${a11y} | Best Practices: ${bp} | SEO: ${seo}`);
  console.log(`  FCP: ${(fcp / 1000).toFixed(2)}s | LCP: ${(lcp / 1000).toFixed(2)}s | TBT: ${Math.round(tbt)}ms | CLS: ${cls.toFixed(4)}`);

  return { perf, a11y, bp, seo, fcp, lcp, tbt, cls };
}

function median(arr) {
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

async function main() {
  console.log('============================================================');
  console.log('Mobile Lighthouse 3-Run Audit on Production Preview (Port 4178)');
  console.log('============================================================');

  const results = [];
  for (let i = 0; i < RUNS; i++) {
    results.push(runLighthouse(i));
  }

  const medianScores = {
    performance: median(results.map((r) => r.perf)),
    accessibility: median(results.map((r) => r.a11y)),
    bestPractices: median(results.map((r) => r.bp)),
    seo: median(results.map((r) => r.seo)),
    fcp: median(results.map((r) => r.fcp)),
    lcp: median(results.map((r) => r.lcp)),
    tbt: median(results.map((r) => r.tbt)),
    cls: median(results.map((r) => r.cls)),
  };

  console.log('\n============================================================');
  console.log('FINAL MEDIAN-OF-3 MOBILE LIGHTHOUSE SCORES');
  console.log('============================================================');
  console.log(`Performance:    ${medianScores.performance}`);
  console.log(`Accessibility:  ${medianScores.accessibility}`);
  console.log(`Best Practices: ${medianScores.bestPractices}`);
  console.log(`SEO:            ${medianScores.seo}`);
  console.log('------------------------------------------------------------');
  console.log(`FCP:  ${(medianScores.fcp / 1000).toFixed(2)}s`);
  console.log(`LCP:  ${(medianScores.lcp / 1000).toFixed(2)}s`);
  console.log(`TBT:  ${Math.round(medianScores.tbt)}ms`);
  console.log(`CLS:  ${medianScores.cls.toFixed(4)}`);
  console.log('============================================================');

  // Clean up report files
  for (let i = 0; i < RUNS; i++) {
    try {
      fs.unlinkSync(path.join(__dirname, `../lh-report-${i}.json`));
    } catch {}
  }
}

main().catch(console.error);
