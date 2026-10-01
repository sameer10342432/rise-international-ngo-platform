import { Router } from 'express';
import { newsController } from '../controllers/newsController.js';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { validateBody } from '../middleware/validation.js';
import { createNewsSchema, updateNewsSchema } from '../validators/newsValidators.js';


const router = Router();

// Public
router.get('/', newsController.getPublicNews);
router.get('/slug/:slug', newsController.getNewsBySlug);

// Admin
router.get('/admin/all', requireAuth, newsController.getAllNews);
router.post('/admin', requireAuth, validateBody(createNewsSchema), newsController.createNews);
router.put('/admin/:id', requireAuth, validateBody(updateNewsSchema), newsController.updateNews);

router.delete('/admin/:id', requireAuth, requireRole('super_admin', 'admin'), newsController.deleteNews);

export default router;
