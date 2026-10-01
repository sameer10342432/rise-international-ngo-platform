import { z } from 'zod';

export const subscribeNewsletterSchema = z.object({
  firstName: z.string().optional(),
  email: z.string().email('Please enter a valid email address'),
});
