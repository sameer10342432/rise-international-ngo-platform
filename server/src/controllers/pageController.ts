import { Request, Response } from 'express';
import { Page } from '../models/Page.js';
import { AuthenticatedRequest } from '../middleware/auth.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';
import { generateSlug } from '../utils/slugify.js';
import { logAdminAction } from '../services/auditService.js';

export const pageController = {
  // Public: Get published page by slug
  async getPageBySlug(req: Request, res: Response) {
    const { slug } = req.params;
    const page = await Page.findOne({ slug: slug.toLowerCase(), status: 'published' }).lean();

    if (!page) {
      return sendError(res, 'Page not found.', [], 404);
    }

    return sendSuccess(res, 'Page content retrieved.', page);
  },

  // Admin: List pages with pagination & search
  async getAdminPages(req: AuthenticatedRequest, res: Response) {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.max(1, Math.min(100, parseInt(req.query.limit as string) || 20));
    const search = req.query.search as string;

    const query: Record<string, any> = {};
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    const [items, total] = await Promise.all([
      Page.find(query)
        .sort({ updatedAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Page.countDocuments(query),
    ]);

    return sendSuccess(res, 'Pages retrieved.', items, 200, {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    });
  },

  // Admin: Get page by id
  async getPageById(req: AuthenticatedRequest, res: Response) {
    const page = await Page.findById(req.params.id);
    if (!page) {
      return sendError(res, 'Page not found.', [], 404);
    }
    return sendSuccess(res, 'Page retrieved.', page);
  },

  // Admin: Create page
  async createPage(req: AuthenticatedRequest, res: Response) {
    const { title, content, featuredImage, status, seoTitle, seoDescription } = req.body;

    let slug = generateSlug(title);
    let count = 1;
    while (await Page.findOne({ slug })) {
      slug = `${generateSlug(title)}-${count++}`;
    }

    const newPage = await Page.create({
      title,
      slug,
      content,
      featuredImage,
      status: status || 'published',
      seoTitle,
      seoDescription,
      publishedAt: status === 'published' ? new Date() : undefined,
    });

    if (req.admin) {
      await logAdminAction(req.admin, 'CREATE_PAGE', 'Page', newPage._id.toString(), { title, slug }, req.ip);
    }

    return sendSuccess(res, 'Page created successfully.', newPage, 201);
  },

  // Admin: Update page
  async updatePage(req: AuthenticatedRequest, res: Response) {
    const { id } = req.params;
    const targetPage = await Page.findById(id);
    if (!targetPage) {
      return sendError(res, 'Page not found.', [], 404);
    }

    const { title, content, featuredImage, status, seoTitle, seoDescription, slug } = req.body;

    if (title && title !== targetPage.title && !slug) {
      let newSlug = generateSlug(title);
      let count = 1;
      while (await Page.findOne({ slug: newSlug, _id: { $ne: id } })) {
        newSlug = `${generateSlug(title)}-${count++}`;
      }
      targetPage.slug = newSlug;
      targetPage.title = title;
    } else if (title) {
      targetPage.title = title;
    }

    if (slug) targetPage.slug = slug.toLowerCase();
    if (content !== undefined) targetPage.content = content;
    if (featuredImage !== undefined) targetPage.featuredImage = featuredImage;
    if (status !== undefined) {
      targetPage.status = status;
      if (status === 'published' && !targetPage.publishedAt) {
        targetPage.publishedAt = new Date();
      }
    }
    if (seoTitle !== undefined) targetPage.seoTitle = seoTitle;
    if (seoDescription !== undefined) targetPage.seoDescription = seoDescription;

    await targetPage.save();

    if (req.admin) {
      await logAdminAction(req.admin, 'UPDATE_PAGE', 'Page', targetPage._id.toString(), { title: targetPage.title }, req.ip);
    }

    return sendSuccess(res, 'Page updated successfully.', targetPage);
  },

  // Admin: Delete page
  async deletePage(req: AuthenticatedRequest, res: Response) {
    const { id } = req.params;
    const targetPage = await Page.findByIdAndDelete(id);
    if (!targetPage) {
      return sendError(res, 'Page not found.', [], 404);
    }

    if (req.admin) {
      await logAdminAction(req.admin, 'DELETE_PAGE', 'Page', id, { title: targetPage.title }, req.ip);
    }

    return sendSuccess(res, 'Page deleted successfully.');
  },
};
