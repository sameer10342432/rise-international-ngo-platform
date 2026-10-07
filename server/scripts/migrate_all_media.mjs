import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const targetDir = path.resolve('../public/images/wordpress');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

function walk(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else {
      results.push({ fullPath, relPath: path.relative('../public_html', fullPath).replace(/\\/g, '/'), size: stat.size, file });
    }
  });
  return results;
}

async function migrateMedia() {
  const uploads = walk('../public_html/wp-content/uploads');
  const originals = uploads.filter(u => {
    if (!/\.(jpg|jpeg|png|webp|gif|mp4|mp3|zip|pdf|docx?)$/i.test(u.file)) return false;
    if (u.file.startsWith('woocommerce-placeholder')) return false;
    if (/-\d+x\d+\.(jpg|jpeg|png|webp|gif)$/i.test(u.file)) return false;
    return true;
  });

  console.log(`Found ${originals.length} unique original media assets.`);

  const mediaManifest = [];

  for (const item of originals) {
    const destPath = path.join(targetDir, item.file);
    fs.copyFileSync(item.fullPath, destPath);

    let dimensions = { width: null, height: null };
    const ext = path.extname(item.file).toLowerCase();

    if (['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext)) {
      try {
        const meta = await sharp(item.fullPath).metadata();
        dimensions.width = meta.width;
        dimensions.height = meta.height;
      } catch (err) {
        // Not a standard raster image or corrupt header
      }
    }

    mediaManifest.push({
      filename: item.file,
      originalRelPath: item.relPath,
      publicUrl: `/images/wordpress/${item.file}`,
      sizeBytes: item.size,
      width: dimensions.width,
      height: dimensions.height,
      extension: ext,
      source: 'WordPress Original'
    });
  }

  const manifestPath = path.resolve('../src/data/wordpressMediaManifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(mediaManifest, null, 2));
  console.log(`Saved ${mediaManifest.length} media records to ${manifestPath}`);
}

migrateMedia().catch(console.error);
