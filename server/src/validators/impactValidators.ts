import { z } from 'zod';

export const createImpactStatSchema = z.object({
  label: z.string().min(2, 'Label is required'),
  value: z.string().min(1, 'Value is required'),
  numericValue: z.number().int(),
  suffix: z.string().default('+'),
  prefix: z.string().default(''),
  description: z.string().optional(),
  icon: z.string().default('public'),
  colour: z.string().default('#16B866'),
  sortOrder: z.number().int().default(0),
  isVisible: z.boolean().default(true),
});

export const updateImpactStatSchema = createImpactStatSchema.partial();
