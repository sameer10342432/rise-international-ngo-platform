import { Router } from 'express';
import { aiController } from '../controllers/aiController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// Strictly protect all AI assistant routes - authenticated administrators only
router.use(requireAuth);

router.post('/content', aiController.generateContent);
router.post('/seo', aiController.generateSeo);
router.post('/article', aiController.generateArticle);
router.post('/programme', aiController.generateProgramme);
router.post('/faq', aiController.generateFaq);
router.post('/image-prompt', aiController.generateImagePrompt);
router.post('/generate-image', aiController.generateImage);

export default router;
