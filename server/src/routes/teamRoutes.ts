import { Router } from 'express';
import { teamController } from '../controllers/teamController.js';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { validateBody } from '../middleware/validation.js';
import { createTeamSchema, updateTeamSchema } from '../validators/teamValidators.js';

const router = Router();

// Public
router.get('/', teamController.getPublicTeam);

// Admin
router.get('/admin/all', requireAuth, teamController.getAllTeam);
router.post('/admin', requireAuth, validateBody(createTeamSchema), teamController.createMember);
router.put('/admin/:id', requireAuth, validateBody(updateTeamSchema), teamController.updateMember);

router.delete('/admin/:id', requireAuth, requireRole('super_admin', 'admin'), teamController.deleteMember);

export default router;
