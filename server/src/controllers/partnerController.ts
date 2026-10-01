import { Request, Response } from 'express';
import { Partner } from '../models/Partner.js';
import { AuthenticatedRequest } from '../middleware/auth.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';
import { logAdminAction } from '../services/auditService.js';

export const partnerController = {
  // Public: List visible partners
  async getPublicPartners(_req: Request, res: Response) {
    const partners = await Partner.find({ isVisible: true }).sort({ sortOrder: 1, createdAt: 1 });
    return sendSuccess(res, 'Partners retrieved.', partners);
  },

  // Admin: List all partners
  async getAllPartners(_req: AuthenticatedRequest, res: Response) {
    const partners = await Partner.find().sort({ sortOrder: 1, createdAt: 1 });
    return sendSuccess(res, 'All partners retrieved.', partners);
  },

  // Admin: Create partner
  async createPartner(req: AuthenticatedRequest, res: Response) {
    const newPartner = await Partner.create(req.body);
    await logAdminAction(req.admin!, 'CREATE_PARTNER', 'Partner', newPartner._id.toString(), { name: newPartner.name }, req.ip);
    return sendSuccess(res, 'Partner added.', newPartner, 201);
  },

  // Admin: Update partner
  async updatePartner(req: AuthenticatedRequest, res: Response) {
    const { id } = req.params;
    const updated = await Partner.findByIdAndUpdate(id, req.body, { new: true });

    if (!updated) {
      return sendError(res, 'Partner not found.', [], 404);
    }

    await logAdminAction(req.admin!, 'UPDATE_PARTNER', 'Partner', id, { name: updated.name }, req.ip);
    return sendSuccess(res, 'Partner updated.', updated);
  },

  // Admin: Delete partner
  async deletePartner(req: AuthenticatedRequest, res: Response) {
    const { id } = req.params;
    const deleted = await Partner.findByIdAndDelete(id);

    if (!deleted) {
      return sendError(res, 'Partner not found.', [], 404);
    }

    await logAdminAction(req.admin!, 'DELETE_PARTNER', 'Partner', id, { name: deleted.name }, req.ip);
    return sendSuccess(res, 'Partner deleted.');
  },
};
