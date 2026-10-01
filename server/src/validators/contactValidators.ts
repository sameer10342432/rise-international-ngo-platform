import { z } from 'zod';

export const createContactMessageSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Please provide a valid email'),
  phone: z.string().optional(),
  subject: z.string().min(2, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters long'),
  category: z.string().default('General Enquiry'),
});

export const updateContactStatusSchema = z.object({
  status: z.enum(['new', 'in_progress', 'resolved', 'spam']),
  adminNotes: z.string().optional(),
});
