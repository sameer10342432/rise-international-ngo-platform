import { Request, Response } from 'express';
import { VolunteerApplication } from '../models/VolunteerApplication.js';
import { AuthenticatedRequest } from '../middleware/auth.js';
import { emailService } from '../services/email/emailService.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';
import { logAdminAction } from '../services/auditService.js';

export const volunteerController = {
  // Public: Submit volunteer application
  async submitApplication(req: Request, res: Response) {
    const newApplication = await VolunteerApplication.create(req.body);

    // Send email alert to admin team
    emailService.sendVolunteerAlert(
      newApplication.fullName,
      newApplication.email,
      newApplication.country,
      newApplication.areaOfInterest,
      newApplication.message
    ).catch(console.error);

    return sendSuccess(res, 'Volunteer application submitted successfully.', {
      id: newApplication._id,
      fullName: newApplication.fullName,
      createdAt: newApplication.createdAt,
    }, 201);
  },

  // Admin: List applications
  async getAllApplications(req: AuthenticatedRequest, res: Response) {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 20;
    const search = (req.query.search as string) || '';
    const status = (req.query.status as string) || '';
    const area = (req.query.areaOfInterest as string) || '';

    const query: Record<string, unknown> = {};
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { country: { $regex: search, $options: 'i' } },
      ];
    }
    if (status) query.status = status;
    if (area) query.areaOfInterest = area;

    const skip = (page - 1) * limit;
    const [applications, total] = await Promise.all([
      VolunteerApplication.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      VolunteerApplication.countDocuments(query),
    ]);

    return sendSuccess(res, 'Volunteer applications retrieved.', applications, 200, {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    });
  },

  // Admin: Get by ID
  async getApplicationById(req: AuthenticatedRequest, res: Response) {
    const { id } = req.params;
    const application = await VolunteerApplication.findById(id);

    if (!application) {
      return sendError(res, 'Application not found.', [], 404);
    }

    return sendSuccess(res, 'Application retrieved.', application);
  },

  // Admin: Update status & notes
  async updateStatus(req: AuthenticatedRequest, res: Response) {
    const { id } = req.params;
    const { status, adminNotes } = req.body;

    const updated = await VolunteerApplication.findByIdAndUpdate(
      id,
      { status, ...(adminNotes !== undefined ? { adminNotes } : {}) },
      { new: true }
    );

    if (!updated) {
      return sendError(res, 'Application not found.', [], 404);
    }

    await logAdminAction(req.admin!, 'UPDATE_VOLUNTEER_STATUS', 'VolunteerApplication', id, { status }, req.ip);

    return sendSuccess(res, 'Volunteer application status updated.', updated);
  },

  // Admin: Delete application
  async deleteApplication(req: AuthenticatedRequest, res: Response) {
    const { id } = req.params;
    const deleted = await VolunteerApplication.findByIdAndDelete(id);

    if (!deleted) {
      return sendError(res, 'Application not found.', [], 404);
    }

    await logAdminAction(req.admin!, 'DELETE_VOLUNTEER', 'VolunteerApplication', id, { name: deleted.fullName }, req.ip);

    return sendSuccess(res, 'Volunteer application deleted.');
  },
};
