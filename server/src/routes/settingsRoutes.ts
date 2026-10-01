import { Router } from 'express';
import { settingsController } from '../controllers/settingsController.js';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { validateBody } from '../middleware/validation.js';
import { updateWebsiteSettingsSchema } from '../validators/settingsValidators.js';

const router = Router();

// Public
router.get('/public', settingsController.getPublicSettings);

// Admin
router.get('/admin', requireAuth, settingsController.getAdminSettings);
router.put('/admin', requireAuth, requireRole('super_admin', 'admin'), validateBody(updateWebsiteSettingsSchema), settingsController.updateSettings);

export default router;
