import { z } from 'zod';

export const createNewsSchema = z.object({
  title: z.string().min(3, 'Title is required'),
  slug: z.string().optional(),
  excerpt: z.string().min(10, 'Excerpt is required'),
  content: z.array(z.string()).min(1, 'Content paragraphs are required'),
  featuredImage: z.string().min(1, 'Featured image is required'),
  category: z.string().min(1, 'Category is required'),
  author: z.string().default('RISE Communications'),
  publishedAt: z.string().or(z.date()).optional(),
  status: z.enum(['draft', 'published']).default('published'),
  featured: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
  readTime: z.string().default('4 min read'),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

export const updateNewsSchema = createNewsSchema.partial();
