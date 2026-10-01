import { Request, Response } from 'express';
import { NewsletterSubscriber } from '../models/NewsletterSubscriber.js';
import { AuthenticatedRequest } from '../middleware/auth.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';
import { logAdminAction } from '../services/auditService.js';

export const newsletterController = {
  // Public: Subscribe
  async subscribe(req: Request, res: Response) {
    const { email, firstName } = req.body;
    const cleanEmail = email.toLowerCase().trim();

    const existing = await NewsletterSubscriber.findOne({ email: cleanEmail });

    if (existing) {
      if (existing.status === 'unsubscribed') {
        existing.status = 'active';
        existing.subscribedAt = new Date();
        if (firstName) existing.firstName = firstName;
        await existing.save();
        return sendSuccess(res, 'Welcome back! Your subscription has been reactivated.');
      }
      return sendSuccess(res, 'You are already subscribed to RISE International field updates.');
    }

    await NewsletterSubscriber.create({
      firstName,
      email: cleanEmail,
      status: 'active',
      subscribedAt: new Date(),
    });

    return sendSuccess(res, 'Thank you for subscribing to RISE International field dispatches.', {}, 201);
  },

  // Admin: List subscribers with pagination
  async getAllSubscribers(req: AuthenticatedRequest, res: Response) {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 20;
    const search = (req.query.search as string) || '';
    const status = (req.query.status as string) || '';

    const query: Record<string, unknown> = {};
    if (search) {
      query.$or = [
        { email: { $regex: search, $options: 'i' } },
        { firstName: { $regex: search, $options: 'i' } },
      ];
    }
    if (status) query.status = status;

    const skip = (page - 1) * limit;
    const [subscribers, total] = await Promise.all([
      NewsletterSubscriber.find(query).sort({ subscribedAt: -1 }).skip(skip).limit(limit),
      NewsletterSubscriber.countDocuments(query),
    ]);

    return sendSuccess(res, 'Newsletter subscribers retrieved.', subscribers, 200, {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    });
  },

  // Admin: Delete subscriber
  async deleteSubscriber(req: AuthenticatedRequest, res: Response) {
    const { id } = req.params;
    const deleted = await NewsletterSubscriber.findByIdAndDelete(id);

    if (!deleted) {
      return sendError(res, 'Subscriber not found.', [], 404);
    }

    await logAdminAction(req.admin!, 'DELETE_SUBSCRIBER', 'NewsletterSubscriber', id, { email: deleted.email }, req.ip);
    return sendSuccess(res, 'Subscriber removed successfully.');
  },
};
