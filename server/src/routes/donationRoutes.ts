import { Router } from 'express';
import { donationController } from '../controllers/donationController.js';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { validateBody } from '../middleware/validation.js';
import { donationLimiter } from '../middleware/rateLimiter.js';
import { createDonationSessionSchema, updateDonationStatusSchema } from '../validators/donationValidators.js';

const router = Router();

// Public
router.post('/create-session', donationLimiter, validateBody(createDonationSessionSchema), donationController.createDonationSession);
router.post('/webhook', donationController.handleWebhook);
router.get('/:txId/status', donationController.getStatusByTx);

// Admin
router.get('/admin/all', requireAuth, donationController.getAllDonations);
router.get('/admin/:id', requireAuth, donationController.getDonationById);
router.patch('/admin/:id/status', requireAuth, requireRole('super_admin', 'admin'), validateBody(updateDonationStatusSchema), donationController.updateDonationStatus);

export default router;
