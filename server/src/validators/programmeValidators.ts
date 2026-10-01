import { z } from 'zod';

export const createProgrammeSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  slug: z.string().optional(),
  shortDescription: z.string().min(10, 'Short description is required'),
  description: z.string().min(20, 'Full description is required'),
  image: z.string().min(1, 'Image path or URL is required'),
  icon: z.string().default('public'),
  category: z.enum([
    'education',
    'community-development',
    'humanitarian-aid',
    'economic-empowerment',
  ]),
  status: z.enum(['draft', 'published']).default('published'),
  sortOrder: z.number().int().default(0),
  mission: z.string().optional(),
  whatWeDo: z.array(z.string()).default([]),
  impactPoints: z.array(z.string()).default([]),
  stats: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
      })
    )
    .default([]),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

export const updateProgrammeSchema = createProgrammeSchema.partial();
