import { Router } from 'express';
import { authController } from '../controllers/authController.js';
import { requireAuth } from '../middleware/auth.js';
import { validateBody } from '../middleware/validation.js';
import { loginLimiter } from '../middleware/rateLimiter.js';
import { loginSchema, changePasswordSchema } from '../validators/authValidators.js';

const router = Router();

router.post('/login', loginLimiter, validateBody(loginSchema), authController.login);
router.post('/logout', authController.logout);
router.get('/me', requireAuth, authController.getMe);
router.post('/change-password', requireAuth, validateBody(changePasswordSchema), authController.changePassword);

export default router;
