import { Request, Response } from 'express';
import { TeamMember } from '../models/TeamMember.js';
import { AuthenticatedRequest } from '../middleware/auth.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';
import { logAdminAction } from '../services/auditService.js';

export const teamController = {
  // Public: List visible team members
  async getPublicTeam(_req: Request, res: Response) {
    const team = await TeamMember.find({ isVisible: true }).sort({ sortOrder: 1, createdAt: 1 });
    return sendSuccess(res, 'Team members retrieved.', team);
  },

  // Admin: List all team members
  async getAllTeam(_req: AuthenticatedRequest, res: Response) {
    const team = await TeamMember.find().sort({ sortOrder: 1, createdAt: 1 });
    return sendSuccess(res, 'All team members retrieved.', team);
  },

  // Admin: Create member
  async createMember(req: AuthenticatedRequest, res: Response) {
    const newMember = await TeamMember.create(req.body);
    await logAdminAction(req.admin!, 'CREATE_TEAM_MEMBER', 'TeamMember', newMember._id.toString(), { name: newMember.name }, req.ip);
    return sendSuccess(res, 'Team member added.', newMember, 201);
  },

  // Admin: Update member
  async updateMember(req: AuthenticatedRequest, res: Response) {
    const { id } = req.params;
    const updated = await TeamMember.findByIdAndUpdate(id, req.body, { new: true });

    if (!updated) {
      return sendError(res, 'Team member not found.', [], 404);
    }

    await logAdminAction(req.admin!, 'UPDATE_TEAM_MEMBER', 'TeamMember', id, { name: updated.name }, req.ip);
    return sendSuccess(res, 'Team member updated.', updated);
  },

  // Admin: Delete member
  async deleteMember(req: AuthenticatedRequest, res: Response) {
    const { id } = req.params;
    const deleted = await TeamMember.findByIdAndDelete(id);

    if (!deleted) {
      return sendError(res, 'Team member not found.', [], 404);
    }

    await logAdminAction(req.admin!, 'DELETE_TEAM_MEMBER', 'TeamMember', id, { name: deleted.name }, req.ip);
    return sendSuccess(res, 'Team member deleted.');
  },
};
