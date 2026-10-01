import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth.js';
import { Programme } from '../models/Programme.js';
import { ImpactStat } from '../models/ImpactStat.js';
import { Story } from '../models/Story.js';
import { NewsArticle } from '../models/NewsArticle.js';
import { VolunteerApplication } from '../models/VolunteerApplication.js';
import { Donation } from '../models/Donation.js';
import { ContactMessage } from '../models/ContactMessage.js';
import { NewsletterSubscriber } from '../models/NewsletterSubscriber.js';
import { AuditLog } from '../models/AuditLog.js';
import { sendSuccess } from '../utils/apiResponse.js';

export const adminController = {
  async getDashboardStats(_req: AuthenticatedRequest, res: Response) {
    const [
      totalProgrammes,
      totalImpactStats,
      totalStories,
      totalNews,
      totalVolunteers,
      totalMessages,
      totalSubscribers,
      donationMetrics,
      recentDonations,
      recentVolunteers,
      recentMessages,
      recentSubscribers,
      recentAuditLogs,
    ] = await Promise.all([
      Programme.countDocuments(),
      ImpactStat.countDocuments(),
      Story.countDocuments(),
      NewsArticle.countDocuments(),
      VolunteerApplication.countDocuments(),
      ContactMessage.countDocuments(),
      NewsletterSubscriber.countDocuments({ status: 'active' }),
      Donation.aggregate([
        {
          $group: {
            _id: '$status',
            totalAmount: { $sum: '$amount' },
            count: { $sum: 1 },
          },
        },
      ]),
      Donation.find().sort({ createdAt: -1 }).limit(5),
      VolunteerApplication.find().sort({ createdAt: -1 }).limit(5),
      ContactMessage.find().sort({ createdAt: -1 }).limit(5),
      NewsletterSubscriber.find().sort({ subscribedAt: -1 }).limit(5),
      AuditLog.find().sort({ createdAt: -1 }).limit(6),
    ]);

    // Parse donation totals
    let totalDonationAmount = 0;
    let completedDonationCount = 0;
    let pendingDonationCount = 0;

    donationMetrics.forEach((metric) => {
      if (metric._id === 'completed') {
        totalDonationAmount += metric.totalAmount;
        completedDonationCount = metric.count;
      } else if (metric._id === 'pending') {
        pendingDonationCount = metric.count;
      }
    });

    return sendSuccess(res, 'Dashboard metrics retrieved.', {
      counts: {
        programmes: totalProgrammes,
        impactStats: totalImpactStats,
        stories: totalStories,
        news: totalNews,
        volunteers: totalVolunteers,
        messages: totalMessages,
        subscribers: totalSubscribers,
        totalDonationAmount,
        completedDonationCount,
        pendingDonationCount,
      },
      recent: {
        donations: recentDonations,
        volunteers: recentVolunteers,
        messages: recentMessages,
        subscribers: recentSubscribers,
        auditLogs: recentAuditLogs,
      },
    });
  },

  async getAuditLogs(req: AuthenticatedRequest, res: Response) {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.max(1, Math.min(100, parseInt(req.query.limit as string) || 20));

    const [items, total] = await Promise.all([
      AuditLog.find()
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      AuditLog.countDocuments(),
    ]);

    return sendSuccess(res, 'Audit logs retrieved.', items, 200, {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    });
  },
};

