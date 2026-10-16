// WCAG 2.1 Color Contrast Verification Tool
// Computes relative luminance and contrast ratios for all theme token pairs

function getLuminance(hex) {
  const rgb = hex
    .replace('#', '')
    .match(/.{2}/g)
    .map((c) => parseInt(c, 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)));

  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
}

function getContrast(hex1, hex2) {
  const l1 = getLuminance(hex1);
  const l2 = getLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

const tokens = {
  light: {
    bg: '#FFFFFF',
    surface: '#F6F7F9',
    text: '#111827',
    textMuted: '#4B5563',
    accent: '#1D4ED8',
    border: '#E5E7EB',
  },
  dark: {
    bg: '#0B0F14',
    surface: '#121820',
    text: '#F3F4F6',
    textMuted: '#9CA3AF',
    accent: '#60A5FA',
    border: '#222D3D',
  },
};

console.log('=== WCAG 2.1 Contrast Ratio Verification ===\n');

let allPassed = true;

function check(label, fg, bg, minRatio, level) {
  const ratio = getContrast(fg, bg);
  const passed = ratio >= minRatio;
  if (!passed) allPassed = false;
  const status = passed ? 'PASS' : 'FAIL';
  console.log(`[${status}] ${label}: ${ratio.toFixed(2)}:1 (Required: ${minRatio}:1 for ${level})`);
}

console.log('--- Light Mode ---');
check('Body Text on Background', tokens.light.text, tokens.light.bg, 4.5, 'WCAG AA (Normal Text)');
check('Body Text on Surface', tokens.light.text, tokens.light.surface, 4.5, 'WCAG AA (Normal Text)');
check('Muted Text on Background', tokens.light.textMuted, tokens.light.bg, 4.5, 'WCAG AA (Normal Text)');
check('Muted Text on Surface', tokens.light.textMuted, tokens.light.surface, 4.5, 'WCAG AA (Normal Text)');
check('Accent Blue on Background', tokens.light.accent, tokens.light.bg, 4.5, 'WCAG AA (Links/Focus)');
check('Accent Blue on Surface', tokens.light.accent, tokens.light.surface, 4.5, 'WCAG AA (Links/Focus)');
check('White on Accent Blue Button', '#FFFFFF', tokens.light.accent, 4.5, 'WCAG AA');

console.log('\n--- Dark Mode ---');
check('Body Text on Dark Background', tokens.dark.text, tokens.dark.bg, 4.5, 'WCAG AA (Normal Text)');
check('Body Text on Dark Surface', tokens.dark.text, tokens.dark.surface, 4.5, 'WCAG AA (Normal Text)');
check('Muted Text on Dark Background', tokens.dark.textMuted, tokens.dark.bg, 4.5, 'WCAG AA (Normal Text)');
check('Muted Text on Dark Surface', tokens.dark.textMuted, tokens.dark.surface, 4.5, 'WCAG AA (Normal Text)');
check('Accent Blue on Dark Background', tokens.dark.accent, tokens.dark.bg, 4.5, 'WCAG AA (Links/Focus)');
check('Accent Blue on Dark Surface', tokens.dark.accent, tokens.dark.surface, 4.5, 'WCAG AA (Links/Focus)');

console.log('\nResult: ' + (allPassed ? 'ALL CONTRAST CHECKS PASSED ✅' : 'FAILURES DETECTED ❌'));
if (!allPassed) process.exit(1);
