import sharp from 'sharp';
import path from 'path';

async function processLogo() {
  const inputLogo = path.resolve('../public/images/logo/rise-logo.png');
  const outputTrimmed = path.resolve('../public/images/logo/rise-logo-trimmed.png');
  const outputHeader = path.resolve('../public/images/logo/rise-logo-header.png');
  
  // Trim white borders and keep transparent
  await sharp(inputLogo)
    .trim()
    .toFile(outputTrimmed);
  
  console.log('Created trimmed logo:', outputTrimmed);
  
  const metadata = await sharp(outputTrimmed).metadata();
  console.log('Trimmed dimensions:', metadata.width, 'x', metadata.height);
}

processLogo().catch(console.error);
