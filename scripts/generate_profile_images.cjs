const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateProfileImages() {
  const imagesDir = path.resolve(__dirname, '../public/images');
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  let originalPath = path.resolve(__dirname, '../assets-src/profile-original.png');
  if (!fs.existsSync(originalPath)) {
    originalPath = path.join(imagesDir, 'profile-original.png');
  }
  if (!fs.existsSync(originalPath)) {
    throw new Error('profile-original.png not found at assets-src/ or public/images/');
  }

  const meta = await sharp(originalPath).metadata();
  // 1. ABOUT CROP (Wider bust crop, keeps hand + wristband + bracelet)
  // Re-crop square so face is horizontally centered (x=580 at 1024px / x=710 at 1254px)
  // with >15% lateral margins (~33.5%), headroom above hair (top=155 at 1024px / top=190 at 1254px),
  // and raised hand/chin fully visible (bottom=675 at 1024px / bottom=827 at 1254px).
  const scale = meta.width / 1024;
  const aboutCrop = {
    left: Math.round(320 * scale),
    top: Math.round(155 * scale),
    width: Math.round(520 * scale),
    height: Math.round(520 * scale)
  };

  // 2. HERO CROP (Tighter head-and-shoulders crop)
  // Face (hair top to chin) fills roughly 55-60% of frame height (here 57.5%),
  // horizontally centered on x=710 in 1254px (x=580 in 1024px),
  // small headroom above hair (top=164 in 1024px / top=200 in 1254px),
  // hand on chin partially visible (bottom=512 in 1024px / bottom=626 in 1254px).
  const heroCrop = {
    left: Math.round(406 * scale),
    top: Math.round(164 * scale),
    width: Math.round(348 * scale),
    height: Math.round(348 * scale)
  };

  console.log(`Source image: ${meta.width}x${meta.height}`);
  console.log(`About crop (wide): left=${aboutCrop.left}, top=${aboutCrop.top}, width=${aboutCrop.width}, height=${aboutCrop.height}`);
  console.log(`Hero crop (tight): left=${heroCrop.left}, top=${heroCrop.top}, width=${heroCrop.width}, height=${heroCrop.height} (Face fill: 57.5%)`);

  const aboutBase = sharp(originalPath).extract(aboutCrop);
  const heroBase = sharp(originalPath).extract(heroCrop);

  console.log('Generating optimized profile images...');

  // --- ABOUT IMAGES ---
  // 1. profile-800.webp
  await aboutBase.clone()
    .resize(800, 800)
    .webp({ quality: 80 })
    .toFile(path.join(imagesDir, 'profile-800.webp'));

  // 2. profile-400.webp
  await aboutBase.clone()
    .resize(400, 400)
    .webp({ quality: 80 })
    .toFile(path.join(imagesDir, 'profile-400.webp'));

  // 3. profile-800.jpg
  await aboutBase.clone()
    .resize(800, 800)
    .jpeg({ quality: 80, progressive: true })
    .toFile(path.join(imagesDir, 'profile-800.jpg'));

  // 4. profile-400.jpg
  await aboutBase.clone()
    .resize(400, 400)
    .jpeg({ quality: 80, progressive: true })
    .toFile(path.join(imagesDir, 'profile-400.jpg'));

  // --- HERO IMAGES ---
  // 5. profile-hero-800.webp
  await heroBase.clone()
    .resize(800, 800)
    .webp({ quality: 80 })
    .toFile(path.join(imagesDir, 'profile-hero-800.webp'));

  // 6. profile-hero-400.webp
  await heroBase.clone()
    .resize(400, 400)
    .webp({ quality: 80 })
    .toFile(path.join(imagesDir, 'profile-hero-400.webp'));

  // 7. profile-hero-800.jpg
  await heroBase.clone()
    .resize(800, 800)
    .jpeg({ quality: 80, progressive: true })
    .toFile(path.join(imagesDir, 'profile-hero-800.jpg'));

  // 8. profile-hero-400.jpg
  await heroBase.clone()
    .resize(400, 400)
    .jpeg({ quality: 80, progressive: true })
    .toFile(path.join(imagesDir, 'profile-hero-400.jpg'));

  // 9. Apple Touch Icon (180x180 PNG)
  const appleTouchPath = path.join(imagesDir, 'apple-touch-icon.png');
  await heroBase.clone()
    .resize(180, 180)
    .png()
    .toFile(appleTouchPath);

  fs.copyFileSync(appleTouchPath, path.resolve(__dirname, '../public/apple-touch-icon.png'));

  const files = [
    'profile-800.webp',
    'profile-400.webp',
    'profile-800.jpg',
    'profile-400.jpg',
    'profile-hero-800.webp',
    'profile-hero-400.webp',
    'profile-hero-800.jpg',
    'profile-hero-400.jpg',
    'apple-touch-icon.png'
  ];

  files.forEach((file) => {
    const filePath = path.join(imagesDir, file);
    const stats = fs.statSync(filePath);
    console.log(`  ✓ ${file}: ${(stats.size / 1024).toFixed(1)} KB`);
  });

  console.log('✅ Profile image optimization complete.');
}

generateProfileImages().catch((err) => {
  console.error('Failed to generate profile images:', err);
  process.exit(1);
});
