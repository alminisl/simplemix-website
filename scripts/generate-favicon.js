const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sourceIcon = path.join(__dirname, '../../simplemix/assets/icons/512x512.png');
const outputDir = path.join(__dirname, '../assets');

// Web favicon sizes
const sizes = {
  'favicon-16x16.png': 16,
  'favicon-32x32.png': 32,
  'favicon.png': 32,
  'apple-touch-icon.png': 180,
  'android-chrome-192x192.png': 192,
  'android-chrome-512x512.png': 512,
};

async function generateFavicons() {
  for (const [filename, size] of Object.entries(sizes)) {
    await sharp(sourceIcon)
      .resize(size, size)
      .png()
      .toFile(path.join(outputDir, filename));
    console.log(`Generated: ${filename} (${size}x${size})`);
  }

  // Create favicon.ico with multiple sizes embedded
  // For simplicity, we'll just copy the 32x32 as ico
  // (proper .ico would need a special tool)
  const ico32 = await sharp(sourceIcon)
    .resize(32, 32)
    .png()
    .toBuffer();

  // For now, copy as a basic favicon.ico (browsers accept PNG with .ico extension)
  fs.writeFileSync(path.join(outputDir, 'favicon.ico'), ico32);
  console.log('Generated: favicon.ico');

  console.log('\nDone! Favicons generated in assets/');
  console.log('\nAdd these to your HTML <head>:');
  console.log(`
<link rel="icon" type="image/png" sizes="32x32" href="assets/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="assets/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="assets/apple-touch-icon.png">
<link rel="icon" href="assets/favicon.ico">
  `);
}

generateFavicons().catch(console.error);
