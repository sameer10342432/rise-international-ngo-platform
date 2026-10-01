import { Router } from 'express';
import { volunteerController } from '../controllers/volunteerController.js';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { validateBody } from '../middleware/validation.js';
import { volunteerLimiter } from '../middleware/rateLimiter.js';
import { createVolunteerApplicationSchema, updateVolunteerStatusSchema } from '../validators/volunteerValidators.js';

const router = Router();

// Public
router.post('/', volunteerLimiter, validateBody(createVolunteerApplicationSchema), volunteerController.submitApplication);

// Admin
router.get('/admin/all', requireAuth, volunteerController.getAllApplications);
router.get('/admin/:id', requireAuth, volunteerController.getApplicationById);
router.patch('/admin/:id/status', requireAuth, validateBody(updateVolunteerStatusSchema), volunteerController.updateStatus);
router.delete('/admin/:id', requireAuth, requireRole('super_admin', 'admin'), volunteerController.deleteApplication);

export default router;
