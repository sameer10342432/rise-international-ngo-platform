import { Request, Response } from 'express';
import { ContactMessage } from '../models/ContactMessage.js';
import { AuthenticatedRequest } from '../middleware/auth.js';
import { emailService } from '../services/email/emailService.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';
import { logAdminAction } from '../services/auditService.js';

export const contactController = {
  // Public: Submit contact enquiry
  async submitMessage(req: Request, res: Response) {
    const newMessage = await ContactMessage.create(req.body);

    emailService.sendContactAlert(
      newMessage.name,
      newMessage.email,
      newMessage.subject,
      newMessage.message
    ).catch(console.error);

    return sendSuccess(res, 'Contact enquiry submitted successfully.', {
      id: newMessage._id,
      name: newMessage.name,
      createdAt: newMessage.createdAt,
    }, 201);
  },

  // Admin: List all contact messages
  async getAllMessages(req: AuthenticatedRequest, res: Response) {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 20;
    const search = (req.query.search as string) || '';
    const status = (req.query.status as string) || '';
    const category = (req.query.category as string) || '';

    const query: Record<string, unknown> = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
      ];
    }
    if (status) query.status = status;
    if (category) query.category = category;

    const skip = (page - 1) * limit;
    const [messages, total] = await Promise.all([
      ContactMessage.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      ContactMessage.countDocuments(query),
    ]);

    return sendSuccess(res, 'Messages retrieved.', messages, 200, {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    });
  },

  // Admin: Get message by ID
  async getMessageById(req: AuthenticatedRequest, res: Response) {
    const { id } = req.params;
    const message = await ContactMessage.findById(id);

    if (!message) {
      return sendError(res, 'Message not found.', [], 404);
    }

    return sendSuccess(res, 'Message retrieved.', message);
  },

  // Admin: Update status & notes
  async updateStatus(req: AuthenticatedRequest, res: Response) {
    const { id } = req.params;
    const { status, adminNotes } = req.body;

    const updated = await ContactMessage.findByIdAndUpdate(
      id,
      { status, ...(adminNotes !== undefined ? { adminNotes } : {}) },
      { new: true }
    );

    if (!updated) {
      return sendError(res, 'Message not found.', [], 404);
    }

    await logAdminAction(req.admin!, 'UPDATE_CONTACT_STATUS', 'ContactMessage', id, { status }, req.ip);

    return sendSuccess(res, 'Message status updated.', updated);
  },

  // Admin: Delete message
  async deleteMessage(req: AuthenticatedRequest, res: Response) {
    const { id } = req.params;
    const deleted = await ContactMessage.findByIdAndDelete(id);

    if (!deleted) {
      return sendError(res, 'Message not found.', [], 404);
    }

    await logAdminAction(req.admin!, 'DELETE_CONTACT_MESSAGE', 'ContactMessage', id, { subject: deleted.subject }, req.ip);

    return sendSuccess(res, 'Message deleted.');
  },
};
