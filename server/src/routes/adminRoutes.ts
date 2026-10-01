import { Router } from 'express';
import { adminController } from '../controllers/adminController.js';
import { authController } from '../controllers/authController.js';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { validateBody } from '../middleware/validation.js';
import { createAdminSchema, updateAdminSchema } from '../validators/authValidators.js';

const router = Router();

// All admin routes require authentication
router.use(requireAuth);

// Dashboard metrics
router.get('/dashboard', adminController.getDashboardStats);

// Audit logs
router.get('/audit-logs', requireRole('super_admin', 'admin'), adminController.getAuditLogs);

// Admin User Management (Super Admin only)
router.get('/users', requireRole('super_admin'), authController.listAdmins);
router.post('/users', requireRole('super_admin'), validateBody(createAdminSchema), authController.createAdmin);
router.put('/users/:id', requireRole('super_admin'), validateBody(updateAdminSchema), authController.updateAdmin);
router.delete('/users/:id', requireRole('super_admin'), authController.deleteAdmin);

export default router;
