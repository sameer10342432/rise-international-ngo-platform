import { z } from 'zod';

export const createStorySchema = z.object({
  title: z.string().min(3, 'Title is required'),
  slug: z.string().optional(),
  excerpt: z.string().min(10, 'Excerpt is required'),
  content: z.array(z.string()).min(1, 'Content paragraphs are required'),
  featuredImage: z.string().min(1, 'Featured image is required'),
  category: z.string().min(1, 'Category is required'),
  author: z.string().default('RISE Field Directorate'),
  publishedAt: z.string().or(z.date()).optional(),
  location: z.string().optional(),
  beneficiary: z.string().optional(),
  quote: z.string().optional(),
  metrics: z.string().optional(),
  status: z.enum(['draft', 'published']).default('published'),
  featured: z.boolean().default(false),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

export const updateStorySchema = createStorySchema.partial();
