import { Router } from 'express';
import { mediaController } from '../controllers/mediaController.js';
import { requireAuth } from '../middleware/auth.js';
import { uploadMiddleware } from '../middleware/upload.js';

const router = Router();

// Public / Admin browse
router.get('/', mediaController.getMedia);
router.get('/usage/:id', mediaController.getMediaUsage);

// Admin-only management
router.post('/sync-manifest', requireAuth, mediaController.syncManifest);
router.post('/upload', requireAuth, uploadMiddleware.single('image'), mediaController.uploadMedia);
router.patch('/:id', requireAuth, mediaController.updateMedia);
router.delete('/:id', requireAuth, mediaController.deleteMedia);

export default router;
