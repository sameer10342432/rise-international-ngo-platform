import { Router } from 'express';
import authRoutes from './authRoutes.js';
import adminRoutes from './adminRoutes.js';
import programmeRoutes from './programmeRoutes.js';
import impactRoutes from './impactRoutes.js';
import storyRoutes from './storyRoutes.js';
import newsRoutes from './newsRoutes.js';
import teamRoutes from './teamRoutes.js';
import partnerRoutes from './partnerRoutes.js';
import donationRoutes from './donationRoutes.js';
import volunteerRoutes from './volunteerRoutes.js';
import contactRoutes from './contactRoutes.js';
import newsletterRoutes from './newsletterRoutes.js';
import settingsRoutes from './settingsRoutes.js';
import pageRoutes from './pageRoutes.js';
import uploadRoutes from './uploadRoutes.js';
import aiRoutes from './aiRoutes.js';

const apiRouter = Router();

apiRouter.use('/auth', authRoutes);
apiRouter.use('/admin', adminRoutes);
apiRouter.use('/admin/ai', aiRoutes);
apiRouter.use('/programmes', programmeRoutes);
apiRouter.use('/impact', impactRoutes);
apiRouter.use('/stories', storyRoutes);
apiRouter.use('/news', newsRoutes);
apiRouter.use('/team', teamRoutes);
apiRouter.use('/partners', partnerRoutes);
apiRouter.use('/donations', donationRoutes);
apiRouter.use('/volunteer', volunteerRoutes);
apiRouter.use('/contact', contactRoutes);
apiRouter.use('/newsletter', newsletterRoutes);
apiRouter.use('/settings', settingsRoutes);
apiRouter.use('/pages', pageRoutes);
apiRouter.use('/admin/uploads', uploadRoutes);

export default apiRouter;
