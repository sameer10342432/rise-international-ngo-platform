import { Router } from 'express';
import { contactController } from '../controllers/contactController.js';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { validateBody } from '../middleware/validation.js';
import { contactLimiter } from '../middleware/rateLimiter.js';
import { createContactMessageSchema, updateContactStatusSchema } from '../validators/contactValidators.js';

const router = Router();

// Public
router.post('/', contactLimiter, validateBody(createContactMessageSchema), contactController.submitMessage);

// Admin
router.get('/admin/all', requireAuth, contactController.getAllMessages);
router.get('/admin/:id', requireAuth, contactController.getMessageById);
router.patch('/admin/:id/status', requireAuth, validateBody(updateContactStatusSchema), contactController.updateStatus);
router.delete('/admin/:id', requireAuth, requireRole('super_admin', 'admin'), contactController.deleteMessage);

export default router;
