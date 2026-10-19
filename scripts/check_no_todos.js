import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

function scanHtmlFiles(dir) {
  let htmlFiles = [];
  if (!fs.existsSync(dir)) return htmlFiles;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      htmlFiles = htmlFiles.concat(scanHtmlFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      htmlFiles.push(fullPath);
    }
  }
  return htmlFiles;
}

const htmlFiles = scanHtmlFiles(distDir);
if (htmlFiles.length === 0) {
  console.error('❌ Postbuild check failed: No HTML files found in dist/');
  process.exit(1);
}

let hasError = false;
for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf-8');
  if (content.includes('TODO')) {
    console.error(`❌ Postbuild check failed: Found forbidden "TODO" string in ${path.relative(process.cwd(), file)}`);
    // Print the lines containing TODO
    const lines = content.split('\n');
    lines.forEach((line, idx) => {
      if (line.includes('TODO')) {
        console.error(`   Line ${idx + 1}: ${line.trim().slice(0, 120)}`);
      }
    });
    hasError = true;
  }
}

if (hasError) {
  console.error('\nBuild aborted: HTML output in dist/ contains unpopulated TODO fields.');
  process.exit(1);
} else {
  console.log(`✅ Postbuild check passed: Scanned ${htmlFiles.length} HTML file(s) in dist/ — zero "TODO" strings found.`);
}
