import { Router } from 'express';
import { storyController } from '../controllers/storyController.js';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { validateBody } from '../middleware/validation.js';
import { createStorySchema, updateStorySchema } from '../validators/storyValidators.js';

const router = Router();

// Public
router.get('/', storyController.getPublicStories);
router.get('/slug/:slug', storyController.getStoryBySlug);

// Admin
router.get('/admin/all', requireAuth, storyController.getAllStories);
router.post('/admin', requireAuth, validateBody(createStorySchema), storyController.createStory);
router.put('/admin/:id', requireAuth, validateBody(updateStorySchema), storyController.updateStory);
router.delete('/admin/:id', requireAuth, requireRole('super_admin', 'admin'), storyController.deleteStory);

export default router;
