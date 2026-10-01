import { z } from 'zod';

export const createVolunteerApplicationSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().optional(),
  country: z.string().min(2, 'Country is required'),
  areaOfInterest: z.string().min(2, 'Area of interest is required'),
  availability: z.string().min(2, 'Availability is required'),
  message: z.string().min(20, 'Message must be at least 20 characters long'),
});

export const updateVolunteerStatusSchema = z.object({
  status: z.enum(['new', 'reviewing', 'accepted', 'rejected', 'contacted']),
  adminNotes: z.string().optional(),
});
