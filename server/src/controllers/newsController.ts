import { Request, Response } from 'express';
import { NewsArticle } from '../models/NewsArticle.js';
import { AuthenticatedRequest } from '../middleware/auth.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';
import { generateSlug } from '../utils/slugify.js';
import { logAdminAction } from '../services/auditService.js';

export const newsController = {
  // Public: List news articles
  async getPublicNews(req: Request, res: Response) {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 12;
    const category = (req.query.category as string) || '';
    const featured = req.query.featured === 'true';

    const query: Record<string, unknown> = { status: 'published' };
    if (category && category !== 'All') query.category = category;
    if (featured) query.featured = true;

    const skip = (page - 1) * limit;
    const [articles, total] = await Promise.all([
      NewsArticle.find(query).sort({ publishedAt: -1 }).skip(skip).limit(limit),
      NewsArticle.countDocuments(query),
    ]);

    return sendSuccess(res, 'News articles retrieved.', articles, 200, {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    });
  },

  // Public: Get news by slug
  async getNewsBySlug(req: Request, res: Response) {
    const { slug } = req.params;
    const article = await NewsArticle.findOne({ slug: slug.toLowerCase() });

    if (!article) {
      return sendError(res, 'News article not found.', [], 404);
    }

    return sendSuccess(res, 'News article retrieved.', article);
  },

  // Admin: List all news with search & pagination
  async getAllNews(req: AuthenticatedRequest, res: Response) {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 20;
    const search = (req.query.search as string) || '';
    const category = (req.query.category as string) || '';
    const status = (req.query.status as string) || '';

    const query: Record<string, unknown> = {};
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
      ];
    }
    if (category && category !== 'All') query.category = category;
    if (status) query.status = status;

    const skip = (page - 1) * limit;
    const [articles, total] = await Promise.all([
      NewsArticle.find(query).sort({ publishedAt: -1 }).skip(skip).limit(limit),
      NewsArticle.countDocuments(query),
    ]);

    return sendSuccess(res, 'All news articles retrieved.', articles, 200, {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    });
  },

  // Admin: Create news
  async createNews(req: AuthenticatedRequest, res: Response) {
    const body = req.body;
    let slug = body.slug ? generateSlug(body.slug) : generateSlug(body.title);

    let counter = 1;
    let uniqueSlug = slug;
    while (await NewsArticle.findOne({ slug: uniqueSlug })) {
      uniqueSlug = `${slug}-${counter}`;
      counter++;
    }

    const newArticle = await NewsArticle.create({ ...body, slug: uniqueSlug });
    await logAdminAction(req.admin!, 'CREATE_NEWS', 'NewsArticle', newArticle._id.toString(), { title: newArticle.title }, req.ip);

    return sendSuccess(res, 'News article created successfully.', newArticle, 201);
  },

  // Admin: Update news
  async updateNews(req: AuthenticatedRequest, res: Response) {
    const { id } = req.params;
    const body = req.body;

    const article = await NewsArticle.findById(id);
    if (!article) {
      return sendError(res, 'News article not found.', [], 404);
    }

    if (body.slug && body.slug !== article.slug) {
      const existing = await NewsArticle.findOne({ slug: generateSlug(body.slug), _id: { $ne: id } });
      if (existing) {
        return sendError(res, 'A news article with this slug already exists.', [], 409);
      }
      body.slug = generateSlug(body.slug);
    }

    const updated = await NewsArticle.findByIdAndUpdate(id, body, { new: true });
    await logAdminAction(req.admin!, 'UPDATE_NEWS', 'NewsArticle', id, { title: updated?.title }, req.ip);

    return sendSuccess(res, 'News article updated successfully.', updated);
  },

  // Admin: Delete news
  async deleteNews(req: AuthenticatedRequest, res: Response) {
    const { id } = req.params;
    const deleted = await NewsArticle.findByIdAndDelete(id);

    if (!deleted) {
      return sendError(res, 'News article not found.', [], 404);
    }

    await logAdminAction(req.admin!, 'DELETE_NEWS', 'NewsArticle', id, { title: deleted.title }, req.ip);
    return sendSuccess(res, 'News article deleted successfully.');
  },
};
