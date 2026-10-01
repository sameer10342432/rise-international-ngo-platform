import { Router } from 'express';
import { programmeController } from '../controllers/programmeController.js';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { validateBody } from '../middleware/validation.js';
import { createProgrammeSchema, updateProgrammeSchema } from '../validators/programmeValidators.js';

const router = Router();

// Public
router.get('/', programmeController.getPublicProgrammes);
router.get('/slug/:slug', programmeController.getProgrammeBySlug);

// Admin
router.get('/admin/all', requireAuth, programmeController.getAllProgrammes);
router.get('/admin/:id', requireAuth, programmeController.getProgrammeById);
router.post('/admin', requireAuth, validateBody(createProgrammeSchema), programmeController.createProgramme);
router.put('/admin/:id', requireAuth, validateBody(updateProgrammeSchema), programmeController.updateProgramme);
router.delete('/admin/:id', requireAuth, requireRole('super_admin', 'admin'), programmeController.deleteProgramme);
router.patch('/admin/:id/status', requireAuth, programmeController.patchProgrammeStatus);

export default router;
