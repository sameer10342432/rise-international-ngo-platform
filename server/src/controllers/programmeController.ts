import { Request, Response } from 'express';
import { Programme } from '../models/Programme.js';
import { AuthenticatedRequest } from '../middleware/auth.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';
import { generateSlug } from '../utils/slugify.js';
import { logAdminAction } from '../services/auditService.js';

export const programmeController = {
  // Public: List published programmes
  async getPublicProgrammes(_req: Request, res: Response) {
    const programmes = await Programme.find({ status: 'published' }).sort({ sortOrder: 1, createdAt: 1 });
    return sendSuccess(res, 'Programmes retrieved.', programmes);
  },

  // Public: Get programme by slug
  async getProgrammeBySlug(req: Request, res: Response) {
    const { slug } = req.params;
    const programme = await Programme.findOne({ slug: slug.toLowerCase() });

    if (!programme) {
      return sendError(res, 'Programme not found.', [], 404);
    }

    return sendSuccess(res, 'Programme details retrieved.', programme);
  },

  // Admin: List all programmes with search & pagination
  async getAllProgrammes(req: AuthenticatedRequest, res: Response) {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 20;
    const search = (req.query.search as string) || '';
    const category = (req.query.category as string) || '';
    const status = (req.query.status as string) || '';

    const query: Record<string, unknown> = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { shortDescription: { $regex: search, $options: 'i' } },
      ];
    }
    if (category) query.category = category;
    if (status) query.status = status;

    const skip = (page - 1) * limit;
    const [programmes, total] = await Promise.all([
      Programme.find(query).sort({ sortOrder: 1, createdAt: -1 }).skip(skip).limit(limit),
      Programme.countDocuments(query),
    ]);

    return sendSuccess(res, 'All programmes retrieved.', programmes, 200, {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    });
  },

  // Admin: Get programme by ID
  async getProgrammeById(req: AuthenticatedRequest, res: Response) {
    const { id } = req.params;
    const programme = await Programme.findById(id);

    if (!programme) {
      return sendError(res, 'Programme not found.', [], 404);
    }

    return sendSuccess(res, 'Programme retrieved.', programme);
  },

  // Admin: Create programme
  async createProgramme(req: AuthenticatedRequest, res: Response) {
    const body = req.body;
    let slug = body.slug ? generateSlug(body.slug) : generateSlug(body.title);

    // Verify slug uniqueness
    let counter = 1;
    let uniqueSlug = slug;
    while (await Programme.findOne({ slug: uniqueSlug })) {
      uniqueSlug = `${slug}-${counter}`;
      counter++;
    }

    const newProgramme = await Programme.create({
      ...body,
      slug: uniqueSlug,
    });

    await logAdminAction(req.admin!, 'CREATE_PROGRAMME', 'Programme', newProgramme._id.toString(), { title: newProgramme.title }, req.ip);

    return sendSuccess(res, 'Programme created successfully.', newProgramme, 201);
  },

  // Admin: Update programme
  async updateProgramme(req: AuthenticatedRequest, res: Response) {
    const { id } = req.params;
    const body = req.body;

    const programme = await Programme.findById(id);
    if (!programme) {
      return sendError(res, 'Programme not found.', [], 404);
    }

    // Check slug collision if slug is changed
    if (body.slug && body.slug !== programme.slug) {
      const existingSlug = await Programme.findOne({
        slug: generateSlug(body.slug),
        _id: { $ne: id },
      });
      if (existingSlug) {
        return sendError(res, 'A programme with this slug already exists.', [], 409);
      }
      body.slug = generateSlug(body.slug);
    }

    const updated = await Programme.findByIdAndUpdate(id, body, { new: true });

    await logAdminAction(req.admin!, 'UPDATE_PROGRAMME', 'Programme', id, { title: updated?.title }, req.ip);

    return sendSuccess(res, 'Programme updated successfully.', updated);
  },

  // Admin: Delete programme
  async deleteProgramme(req: AuthenticatedRequest, res: Response) {
    const { id } = req.params;
    const programme = await Programme.findById(id);

    if (!programme) {
      return sendError(res, 'Programme not found.', [], 404);
    }

    await Programme.findByIdAndDelete(id);

    await logAdminAction(req.admin!, 'DELETE_PROGRAMME', 'Programme', id, { title: programme.title }, req.ip);

    return sendSuccess(res, 'Programme deleted successfully.');
  },

  // Admin: Quick status toggle (draft / published)
  async patchProgrammeStatus(req: AuthenticatedRequest, res: Response) {
    const { id } = req.params;
    const { status } = req.body;

    if (!['draft', 'published'].includes(status)) {
      return sendError(res, 'Status must be draft or published.', [], 400);
    }

    const updated = await Programme.findByIdAndUpdate(id, { status }, { new: true });
    if (!updated) {
      return sendError(res, 'Programme not found.', [], 404);
    }

    await logAdminAction(req.admin!, 'PATCH_STATUS', 'Programme', id, { status }, req.ip);

    return sendSuccess(res, `Programme status changed to ${status}.`, updated);
  },
};
