const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const inputDir = path.join(ROOT, 'emirates hero');
const outputDir = path.join(ROOT, 'public', 'emirates-hero');

// Ensure output directory exists (though it should already)
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function run() {
  const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.jpg'));
  let totalInput = 0;
  let totalOutput = 0;

  console.log(`Processing ${files.length} frames at 60% quality...`);

  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    // ezgif-frame-001.jpg -> ezgif-frame-001.webp
    const outputPath = path.join(outputDir, file.replace(/\.jpg$/, '.webp'));

    const inputBuffer = fs.readFileSync(inputPath);
    totalInput += inputBuffer.length;

    // Convert to 60% quality
    const outputBuffer = await sharp(inputBuffer)
      .webp({ quality: 60, effort: 4 })
      .toBuffer();
    
    fs.writeFileSync(outputPath, outputBuffer);
    totalOutput += outputBuffer.length;
  }

  console.log(`Done!`);
  console.log(`Original JPGs: ${(totalInput / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`New WebPs: ${(totalOutput / (1024 * 1024)).toFixed(2)} MB`);
}

run().catch(console.error);
