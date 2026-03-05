const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const inputDir = path.join(ROOT, 'emirates hero');
const outputDir = path.join(ROOT, 'public', 'emirates-hero');

async function run() {
  const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.jpg'));
  let totalInput = 0;
  let totalOutput = 0;

  console.log(`Aggressively compressing 80 frames...`);

  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file.replace(/\.jpg$/, '.webp'));

    const inputBuffer = fs.readFileSync(inputPath);
    totalInput += inputBuffer.length;

    // Resize to max 1200px width AND drop quality to 42%
    const outputBuffer = await sharp(inputBuffer)
      .resize({ width: 1200, withoutEnlargement: true }) // Scale down to 1200px wide (sharper)
      .webp({ quality: 60, effort: 6 }) // Increased quality to 60%
      .toBuffer();
    
    fs.writeFileSync(outputPath, outputBuffer);
    totalOutput += outputBuffer.length;
  }

  console.log(`\n✅ Aggressive Compression Complete!`);
  console.log(`Original JPGs: ${(totalInput / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`New WebPs:     ${(totalOutput / (1024 * 1024)).toFixed(2)} MB`);
  
  const saved = (totalInput - totalOutput) / (1024 * 1024);
  const percent = ((totalInput - totalOutput) / totalInput) * 100;
  console.log(`Saved:         ${saved.toFixed(2)} MB (${percent.toFixed(1)}%)`);
}

run().catch(console.error);
