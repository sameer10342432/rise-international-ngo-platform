import { Router } from 'express';
import { newsletterController } from '../controllers/newsletterController.js';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { validateBody } from '../middleware/validation.js';
import { newsletterLimiter } from '../middleware/rateLimiter.js';
import { subscribeNewsletterSchema } from '../validators/newsletterValidators.js';

const router = Router();

// Public
router.post('/subscribe', newsletterLimiter, validateBody(subscribeNewsletterSchema), newsletterController.subscribe);

// Admin
router.get('/admin/all', requireAuth, newsletterController.getAllSubscribers);
router.delete('/admin/:id', requireAuth, requireRole('super_admin', 'admin'), newsletterController.deleteSubscriber);

export default router;
