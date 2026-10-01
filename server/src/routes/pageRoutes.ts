import { Router } from 'express';
import { pageController } from '../controllers/pageController.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

// Public
router.get('/slug/:slug', pageController.getPageBySlug);

// Admin
router.get('/admin/all', requireAuth, pageController.getAdminPages);
router.get('/admin/:id', requireAuth, pageController.getPageById);
router.post('/admin', requireAuth, pageController.createPage);
router.put('/admin/:id', requireAuth, pageController.updatePage);
router.delete('/admin/:id', requireAuth, requireRole('super_admin', 'admin'), pageController.deletePage);

export default router;
