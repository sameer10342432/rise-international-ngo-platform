import multer from 'multer';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';
import { Request, Response, NextFunction } from 'express';
import { ENV } from '../config/env.js';

// Ensure upload directory exists
if (!fs.existsSync(ENV.UPLOAD_DIR)) {
  fs.mkdirSync(ENV.UPLOAD_DIR, { recursive: true });
}

// Memory storage so we can process and optimize with Sharp before writing to disk
const storage = multer.memoryStorage();

const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];

export const uploadMiddleware = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB max
  },
  fileFilter: (_req, file, cb) => {
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, and WebP images are allowed.'));
    }
  },
});

export async function processAndSaveImage(
  buffer: Buffer,
  originalName: string,
  maxWidth: number = 1920
): Promise<{ filename: string; url: string; width: number; height: number; size: number }> {
  const timestamp = Date.now();
  const randomSuffix = Math.floor(Math.random() * 100000);
  const cleanExt = '.webp'; // Standardize to modern WebP format
  const filename = `img_${timestamp}_${randomSuffix}${cleanExt}`;
  const filepath = path.join(ENV.UPLOAD_DIR, filename);

  const image = sharp(buffer);
  const metadata = await image.metadata();

  let transform = image.rotate(); // auto-rotate based on EXIF

  if (metadata.width && metadata.width > maxWidth) {
    transform = transform.resize({ width: maxWidth, withoutEnlargement: true });
  }

  // Convert to high-quality WebP
  const processedBuffer = await transform.webp({ quality: 85 }).toBuffer();
  await fs.promises.writeFile(filepath, processedBuffer);

  const processedMeta = await sharp(processedBuffer).metadata();

  return {
    filename,
    url: `/uploads/${filename}`,
    width: processedMeta.width || 0,
    height: processedMeta.height || 0,
    size: processedBuffer.length,
  };
}
