import { Request, Response } from 'express';
import { ImpactStat } from '../models/ImpactStat.js';
import { AuthenticatedRequest } from '../middleware/auth.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';
import { logAdminAction } from '../services/auditService.js';

export const impactController = {
  // Public: List visible impact statistics
  async getPublicStats(_req: Request, res: Response) {
    const stats = await ImpactStat.find({ isVisible: true }).sort({ sortOrder: 1, createdAt: 1 });
    return sendSuccess(res, 'Impact statistics retrieved.', stats);
  },

  // Admin: List all stats
  async getAllStats(_req: AuthenticatedRequest, res: Response) {
    const stats = await ImpactStat.find().sort({ sortOrder: 1, createdAt: 1 });
    return sendSuccess(res, 'All impact statistics retrieved.', stats);
  },

  // Admin: Create stat
  async createStat(req: AuthenticatedRequest, res: Response) {
    const newStat = await ImpactStat.create(req.body);
    await logAdminAction(req.admin!, 'CREATE_IMPACT_STAT', 'ImpactStat', newStat._id.toString(), { label: newStat.label }, req.ip);
    return sendSuccess(res, 'Impact stat created.', newStat, 201);
  },

  // Admin: Update stat
  async updateStat(req: AuthenticatedRequest, res: Response) {
    const { id } = req.params;
    const updated = await ImpactStat.findByIdAndUpdate(id, req.body, { new: true });

    if (!updated) {
      return sendError(res, 'Impact stat not found.', [], 404);
    }

    await logAdminAction(req.admin!, 'UPDATE_IMPACT_STAT', 'ImpactStat', id, { label: updated.label }, req.ip);
    return sendSuccess(res, 'Impact stat updated.', updated);
  },

  // Admin: Delete stat
  async deleteStat(req: AuthenticatedRequest, res: Response) {
    const { id } = req.params;
    const deleted = await ImpactStat.findByIdAndDelete(id);

    if (!deleted) {
      return sendError(res, 'Impact stat not found.', [], 404);
    }

    await logAdminAction(req.admin!, 'DELETE_IMPACT_STAT', 'ImpactStat', id, { label: deleted.label }, req.ip);
    return sendSuccess(res, 'Impact stat deleted.');
  },

  // Admin: Reorder stats
  async reorderStats(req: AuthenticatedRequest, res: Response) {
    const { order } = req.body; // Array of { id: string, sortOrder: number }

    if (!Array.isArray(order)) {
      return sendError(res, 'Order must be an array of objects with id and sortOrder.', [], 400);
    }

    const bulkOps = order.map((item) => ({
      updateOne: {
        filter: { _id: item.id },
        update: { sortOrder: item.sortOrder },
      },
    }));

    await ImpactStat.bulkWrite(bulkOps);
    await logAdminAction(req.admin!, 'REORDER_IMPACT_STATS', 'ImpactStat', undefined, { count: order.length }, req.ip);

    return sendSuccess(res, 'Impact stats order updated successfully.');
  },
};
