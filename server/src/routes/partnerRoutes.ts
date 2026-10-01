import { Router } from 'express';
import { partnerController } from '../controllers/partnerController.js';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { validateBody } from '../middleware/validation.js';
import { createPartnerSchema, updatePartnerSchema } from '../validators/partnerValidators.js';

const router = Router();

// Public
router.get('/', partnerController.getPublicPartners);

// Admin
router.get('/admin/all', requireAuth, partnerController.getAllPartners);
router.post('/admin', requireAuth, validateBody(createPartnerSchema), partnerController.createPartner);
router.put('/admin/:id', requireAuth, validateBody(updatePartnerSchema), partnerController.updatePartner);
router.delete('/admin/:id', requireAuth, requireRole('super_admin', 'admin'), partnerController.deletePartner);

export default router;
