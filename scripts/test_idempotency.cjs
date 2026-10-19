const crypto = require('crypto');
const fs = require('fs');
const { execSync } = require('child_process');

function getHash(filePath) {
  const content = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(content).digest('hex');
}

console.log('--- TESTING BUILD IDEMPOTENCY ---');
const distIndex = 'dist/index.html';

const hashBefore = getHash(distIndex);
console.log('SHA256 before second build:', hashBefore);

console.log('Running npm run build...');
execSync('npm run build', { stdio: 'inherit' });

const hashAfter = getHash(distIndex);
console.log('SHA256 after second build: ', hashAfter);

if (hashBefore === hashAfter) {
  console.log('✅ IDEMPOTENCY TEST PASSED: dist/index.html is byte-identical across builds!');
} else {
  console.error('❌ IDEMPOTENCY TEST FAILED: dist/index.html differs!');
  process.exit(1);
}
