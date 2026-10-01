import { Router } from 'express';
import { impactController } from '../controllers/impactController.js';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { validateBody } from '../middleware/validation.js';
import { createImpactStatSchema, updateImpactStatSchema } from '../validators/impactValidators.js';

const router = Router();

// Public
router.get('/stats', impactController.getPublicStats);
router.get('/', impactController.getPublicStats);

// Admin
router.get('/admin/all', requireAuth, impactController.getAllStats);
router.post('/admin', requireAuth, validateBody(createImpactStatSchema), impactController.createStat);
router.put('/admin/:id', requireAuth, validateBody(updateImpactStatSchema), impactController.updateStat);
router.delete('/admin/:id', requireAuth, requireRole('super_admin', 'admin'), impactController.deleteStat);
router.post('/admin/reorder', requireAuth, impactController.reorderStats);

export default router;
