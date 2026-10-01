import { Router } from 'express';
import { uploadController } from '../controllers/uploadController.js';
import { requireAuth } from '../middleware/auth.js';
import { uploadMiddleware } from '../middleware/upload.js';

const router = Router();

// Admin image upload
router.post('/image', requireAuth, uploadMiddleware.single('image'), uploadController.uploadImage);

export default router;
