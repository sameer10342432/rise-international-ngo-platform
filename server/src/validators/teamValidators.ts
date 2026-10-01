import { z } from 'zod';

export const createTeamSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  position: z.string().min(2, 'Position is required'),
  department: z.string().min(2, 'Department is required'),
  bio: z.string().min(10, 'Bio is required'),
  photo: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  socialLinks: z
    .object({
      linkedin: z.string().optional(),
      twitter: z.string().optional(),
    })
    .optional(),
  sortOrder: z.number().int().default(0),
  isVisible: z.boolean().default(true),
});

export const updateTeamSchema = createTeamSchema.partial();
