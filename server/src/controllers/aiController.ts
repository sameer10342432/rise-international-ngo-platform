import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth.js';
import { aiService } from '../services/aiService.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';
import { logAdminAction } from '../services/auditService.js';

export const aiController = {
  /**
   * POST /api/admin/ai/content
   */
  async generateContent(req: AuthenticatedRequest, res: Response) {
    try {
      const { pageType, pageTitle, context, currentContent } = req.body;
      if (!pageTitle) {
        return sendError(res, 'pageTitle is required.', [], 400);
      }

      const result = await aiService.generatePageContent({
        pageType: pageType || 'general',
        pageTitle,
        context,
        currentContent,
      });

      if (req.admin) {
        await logAdminAction(
          req.admin,
          'AI_GENERATE_CONTENT',
          'AIAssistant',
          pageTitle,
          { pageType, pageTitle },
          req.ip
        );
      }

      return sendSuccess(res, 'AI content draft generated successfully.', result);
    } catch (err: any) {
      return sendError(res, err.message || 'Failed to generate AI content.', [], 500);
    }
  },

  /**
   * POST /api/admin/ai/seo
   */
  async generateSeo(req: AuthenticatedRequest, res: Response) {
    try {
      const { pageTitle, pageContent, targetTopic, pageType } = req.body;
      if (!pageTitle) {
        return sendError(res, 'pageTitle is required.', [], 400);
      }

      const result = await aiService.generateSeoMetadata({
        pageTitle,
        pageContent,
        targetTopic,
        pageType,
      });

      if (req.admin) {
        await logAdminAction(
          req.admin,
          'AI_GENERATE_SEO',
          'AIAssistant',
          pageTitle,
          { pageTitle, targetTopic },
          req.ip
        );
      }

      return sendSuccess(res, 'AI SEO metadata draft generated successfully.', result);
    } catch (err: any) {
      return sendError(res, err.message || 'Failed to generate SEO metadata.', [], 500);
    }
  },

  /**
   * POST /api/admin/ai/article
   */
  async generateArticle(req: AuthenticatedRequest, res: Response) {
    try {
      const { topic, category, targetAudience, keyPoints } = req.body;
      if (!topic) {
        return sendError(res, 'topic is required.', [], 400);
      }

      const result = await aiService.generateArticle({
        topic,
        category: category || 'General News',
        targetAudience,
        keyPoints,
      });

      if (req.admin) {
        await logAdminAction(
          req.admin,
          'AI_GENERATE_ARTICLE',
          'AIAssistant',
          topic,
          { topic, category },
          req.ip
        );
      }

      return sendSuccess(res, 'AI article draft generated successfully.', result);
    } catch (err: any) {
      return sendError(res, err.message || 'Failed to generate article draft.', [], 500);
    }
  },

  /**
   * POST /api/admin/ai/programme
   */
  async generateProgramme(req: AuthenticatedRequest, res: Response) {
    try {
      const { programmeName, focusArea, communityContext } = req.body;
      if (!programmeName) {
        return sendError(res, 'programmeName is required.', [], 400);
      }

      const result = await aiService.generateProgrammeDescription({
        programmeName,
        focusArea: focusArea || programmeName,
        communityContext,
      });

      if (req.admin) {
        await logAdminAction(
          req.admin,
          'AI_GENERATE_PROGRAMME',
          'AIAssistant',
          programmeName,
          { programmeName, focusArea },
          req.ip
        );
      }

      return sendSuccess(res, 'AI programme draft generated successfully.', result);
    } catch (err: any) {
      return sendError(res, err.message || 'Failed to generate programme draft.', [], 500);
    }
  },

  /**
   * POST /api/admin/ai/faq
   */
  async generateFaq(req: AuthenticatedRequest, res: Response) {
    try {
      const { topic, pageType, count } = req.body;
      if (!topic) {
        return sendError(res, 'topic is required.', [], 400);
      }

      const result = await aiService.generateFaq({
        topic,
        pageType,
        count: count ? parseInt(count) : 4,
      });

      if (req.admin) {
        await logAdminAction(
          req.admin,
          'AI_GENERATE_FAQ',
          'AIAssistant',
          topic,
          { topic, count },
          req.ip
        );
      }

      return sendSuccess(res, 'AI FAQ draft generated successfully.', result);
    } catch (err: any) {
      return sendError(res, err.message || 'Failed to generate FAQs.', [], 500);
    }
  },

  /**
   * POST /api/admin/ai/image-prompt
   */
  async generateImagePrompt(req: AuthenticatedRequest, res: Response) {
    try {
      const { pageTitle, topic, aspectRatio } = req.body;
      if (!pageTitle || !topic) {
        return sendError(res, 'pageTitle and topic are required.', [], 400);
      }

      const result = await aiService.generateImagePrompt({
        pageTitle,
        topic,
        aspectRatio,
      });

      return sendSuccess(res, 'AI image prompt generated successfully.', result);
    } catch (err: any) {
      return sendError(res, err.message || 'Failed to generate image prompt.', [], 500);
    }
  },

  /**
   * POST /api/admin/ai/generate-image
   */
  async generateImage(req: AuthenticatedRequest, res: Response) {
    try {
      const { prompt, aspectRatio } = req.body;
      if (!prompt) {
        return sendError(res, 'prompt is required.', [], 400);
      }

      const result = await aiService.generateImageWithGemini(prompt, aspectRatio);

      if (req.admin) {
        await logAdminAction(
          req.admin,
          'AI_GENERATE_IMAGE',
          'AIAssistant',
          prompt.slice(0, 50),
          { prompt, aspectRatio },
          req.ip
        );
      }

      return sendSuccess(res, 'AI image generation result retrieved.', result);
    } catch (err: any) {
      return sendError(res, err.message || 'Failed to generate image.', [], 500);
    }
  },
};
