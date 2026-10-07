import fs from 'fs';
import path from 'path';

const logoDir = path.resolve('../public/images/logo');
if (!fs.existsSync(logoDir)) {
  fs.mkdirSync(logoDir, { recursive: true });
}

// Source files
const origLogo = path.resolve('../public_html/wp-content/uploads/2024/11/Untitled-design-32.png');
const origIcon = path.resolve('../public_html/wp-content/uploads/2024/11/cropped-Untitled-design-32.png');

if (fs.existsSync(origLogo)) {
  fs.copyFileSync(origLogo, path.join(logoDir, 'rise-logo.png'));
  console.log('Copied original logo to /public/images/logo/rise-logo.png');
}

if (fs.existsSync(origIcon)) {
  fs.copyFileSync(origIcon, path.join(logoDir, 'rise-icon.png'));
  fs.copyFileSync(origIcon, path.resolve('../public/favicon.png'));
  console.log('Copied original icon to /public/images/logo/rise-icon.png and /public/favicon.png');
}
