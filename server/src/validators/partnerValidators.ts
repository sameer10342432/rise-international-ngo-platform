import { z } from 'zod';

export const createPartnerSchema = z.object({
  name: z.string().min(2, 'Partner name is required'),
  logo: z.string().optional(),
  website: z.string().url().optional().or(z.literal('')),
  description: z.string().optional(),
  category: z.string().default('Strategic Alliance'),
  icon: z.string().default('handshake'),
  sortOrder: z.number().int().default(0),
  isVisible: z.boolean().default(true),
});

export const updatePartnerSchema = createPartnerSchema.partial();
