import { Request, Response } from 'express';
import { Donation } from '../models/Donation.js';
import { AuthenticatedRequest } from '../middleware/auth.js';
import { activePaymentProvider } from '../services/payment/stripeProvider.js';
import { emailService } from '../services/email/emailService.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';
import { logAdminAction } from '../services/auditService.js';

export const donationController = {
  // Public: Initiate donation intent / payment session
  async createDonationSession(req: Request, res: Response) {
    const { amount, currency, frequency, purpose, donorName, email, anonymous, donorNotes } = req.body;

    // Strict server-side verification
    if (!amount || amount < 1) {
      return sendError(res, 'Donation amount must be at least $1.', [], 400);
    }

    const sessionResult = await activePaymentProvider.createPaymentSession({
      amount,
      currency: currency || 'USD',
      donorName,
      email,
      frequency: frequency || 'one_time',
      purpose: purpose || 'where_needed',
    });

    const newDonation = await Donation.create({
      donorName: anonymous ? 'Anonymous Donor' : donorName,
      email,
      amount,
      currency: currency || 'USD',
      frequency: frequency || 'one_time',
      purpose: purpose || 'where_needed',
      status: 'completed', // In sandbox / simulated mode, mark completed and dispatch email
      paymentProvider: 'stripe-simulated',
      transactionId: sessionResult.transactionId,
      anonymous: Boolean(anonymous),
      donorNotes,
    });

    // Send confirmation tax-receipt email in background
    emailService.sendDonationReceipt(
      email,
      newDonation.donorName,
      amount,
      frequency || 'one_time',
      purpose || 'Where Needed Most',
      newDonation.transactionId
    ).catch(console.error);

    return sendSuccess(res, 'Donation session created.', {
      transactionId: newDonation.transactionId,
      checkoutUrl: sessionResult.checkoutUrl,
      amount: newDonation.amount,
      currency: newDonation.currency,
      status: newDonation.status,
    }, 201);
  },

  // Public: Webhook handler
  async handleWebhook(req: Request, res: Response) {
    const signature = (req.headers['stripe-signature'] as string) || '';

    if (!activePaymentProvider.verifyWebhookSignature(req.body, signature)) {
      return sendError(res, 'Invalid webhook signature.', [], 400);
    }

    const event = activePaymentProvider.parseWebhookEvent(req.body);

    if (event.status === 'completed') {
      const donation = await Donation.findOneAndUpdate(
        { transactionId: event.transactionId },
        { status: 'completed' },
        { new: true }
      );

      if (donation) {
        emailService.sendDonationReceipt(
          donation.email,
          donation.donorName,
          donation.amount,
          donation.frequency,
          donation.purpose,
          donation.transactionId
        ).catch(console.error);
      }
    }

    return res.status(200).json({ received: true });
  },

  // Public: Query status by transaction ID
  async getStatusByTx(req: Request, res: Response) {
    const { txId } = req.params;
    const donation = await Donation.findOne({ transactionId: txId }).select(
      'transactionId amount currency frequency purpose status createdAt'
    );

    if (!donation) {
      return sendError(res, 'Donation record not found.', [], 404);
    }

    return sendSuccess(res, 'Donation status retrieved.', donation);
  },

  // Admin: List donations with filters & pagination
  async getAllDonations(req: AuthenticatedRequest, res: Response) {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 20;
    const search = (req.query.search as string) || '';
    const status = (req.query.status as string) || '';
    const purpose = (req.query.purpose as string) || '';
    const frequency = (req.query.frequency as string) || '';

    const query: Record<string, unknown> = {};
    if (search) {
      query.$or = [
        { donorName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { transactionId: { $regex: search, $options: 'i' } },
      ];
    }
    if (status) query.status = status;
    if (purpose) query.purpose = purpose;
    if (frequency) query.frequency = frequency;

    const skip = (page - 1) * limit;
    const [donations, total] = await Promise.all([
      Donation.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Donation.countDocuments(query),
    ]);

    return sendSuccess(res, 'Donations retrieved.', donations, 200, {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    });
  },

  // Admin: Get donation by ID
  async getDonationById(req: AuthenticatedRequest, res: Response) {
    const { id } = req.params;
    const donation = await Donation.findById(id);

    if (!donation) {
      return sendError(res, 'Donation not found.', [], 404);
    }

    return sendSuccess(res, 'Donation retrieved.', donation);
  },

  // Admin: Update donation status
  async updateDonationStatus(req: AuthenticatedRequest, res: Response) {
    const { id } = req.params;
    const { status } = req.body;

    const donation = await Donation.findByIdAndUpdate(id, { status }, { new: true });
    if (!donation) {
      return sendError(res, 'Donation not found.', [], 404);
    }

    await logAdminAction(req.admin!, 'UPDATE_DONATION_STATUS', 'Donation', id, { status, tx: donation.transactionId }, req.ip);

    return sendSuccess(res, `Donation status updated to ${status}.`, donation);
  },
};
