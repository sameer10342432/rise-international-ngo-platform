import { z } from 'zod';

export const createDonationSessionSchema = z.object({
  amount: z.number().min(1, 'Donation amount must be at least $1'),
  currency: z.string().default('USD'),
  frequency: z.enum(['one_time', 'monthly']).default('one_time'),
  purpose: z
    .enum([
      'where_needed',
      'education',
      'humanitarian_aid',
      'community_development',
      'economic_empowerment',
    ])
    .default('where_needed'),
  donorName: z.string().min(2, 'Donor name is required'),
  email: z.string().email('Valid email is required for tax deduction receipt'),
  anonymous: z.boolean().default(false),
  donorNotes: z.string().optional(),
});

export const updateDonationStatusSchema = z.object({
  status: z.enum(['pending', 'completed', 'failed', 'cancelled', 'refunded']),
});
