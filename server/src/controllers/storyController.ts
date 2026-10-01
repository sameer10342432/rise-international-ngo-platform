import { Request, Response } from 'express';
import { Story } from '../models/Story.js';
import { AuthenticatedRequest } from '../middleware/auth.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';
import { generateSlug } from '../utils/slugify.js';
import { logAdminAction } from '../services/auditService.js';

export const storyController = {
  // Public: List stories
  async getPublicStories(req: Request, res: Response) {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 12;
    const category = (req.query.category as string) || '';
    const featured = req.query.featured === 'true';

    const query: Record<string, unknown> = { status: 'published' };
    if (category && category !== 'All') query.category = category;
    if (featured) query.featured = true;

    const skip = (page - 1) * limit;
    const [stories, total] = await Promise.all([
      Story.find(query).sort({ publishedAt: -1 }).skip(skip).limit(limit),
      Story.countDocuments(query),
    ]);

    return sendSuccess(res, 'Stories retrieved.', stories, 200, {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    });
  },

  // Public: Get story by slug
  async getStoryBySlug(req: Request, res: Response) {
    const { slug } = req.params;
    const story = await Story.findOne({ slug: slug.toLowerCase() });

    if (!story) {
      return sendError(res, 'Story not found.', [], 404);
    }

    return sendSuccess(res, 'Story retrieved.', story);
  },

  // Admin: List all stories with search
  async getAllStories(req: AuthenticatedRequest, res: Response) {
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
    const [stories, total] = await Promise.all([
      Story.find(query).sort({ publishedAt: -1 }).skip(skip).limit(limit),
      Story.countDocuments(query),
    ]);

    return sendSuccess(res, 'All stories retrieved.', stories, 200, {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    });
  },

  // Admin: Create story
  async createStory(req: AuthenticatedRequest, res: Response) {
    const body = req.body;
    let slug = body.slug ? generateSlug(body.slug) : generateSlug(body.title);

    let counter = 1;
    let uniqueSlug = slug;
    while (await Story.findOne({ slug: uniqueSlug })) {
      uniqueSlug = `${slug}-${counter}`;
      counter++;
    }

    const newStory = await Story.create({ ...body, slug: uniqueSlug });
    await logAdminAction(req.admin!, 'CREATE_STORY', 'Story', newStory._id.toString(), { title: newStory.title }, req.ip);

    return sendSuccess(res, 'Story created successfully.', newStory, 201);
  },

  // Admin: Update story
  async updateStory(req: AuthenticatedRequest, res: Response) {
    const { id } = req.params;
    const body = req.body;

    const story = await Story.findById(id);
    if (!story) {
      return sendError(res, 'Story not found.', [], 404);
    }

    if (body.slug && body.slug !== story.slug) {
      const existing = await Story.findOne({ slug: generateSlug(body.slug), _id: { $ne: id } });
      if (existing) {
        return sendError(res, 'A story with this slug already exists.', [], 409);
      }
      body.slug = generateSlug(body.slug);
    }

    const updated = await Story.findByIdAndUpdate(id, body, { new: true });
    await logAdminAction(req.admin!, 'UPDATE_STORY', 'Story', id, { title: updated?.title }, req.ip);

    return sendSuccess(res, 'Story updated successfully.', updated);
  },

  // Admin: Delete story
  async deleteStory(req: AuthenticatedRequest, res: Response) {
    const { id } = req.params;
    const deleted = await Story.findByIdAndDelete(id);

    if (!deleted) {
      return sendError(res, 'Story not found.', [], 404);
    }

    await logAdminAction(req.admin!, 'DELETE_STORY', 'Story', id, { title: deleted.title }, req.ip);
    return sendSuccess(res, 'Story deleted successfully.');
  },
};
