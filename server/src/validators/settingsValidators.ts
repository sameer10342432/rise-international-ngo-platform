import { z } from 'zod';

export const updateWebsiteSettingsSchema = z.object({
  organisationName: z.string().optional(),
  tagline: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  socialLinks: z
    .array(
      z.object({
        name: z.string(),
        href: z.string(),
        icon: z.string(),
      })
    )
    .optional(),
  logo: z.string().optional(),
  favicon: z.string().optional(),
  defaultSeoTitle: z.string().optional(),
  defaultSeoDescription: z.string().optional(),
  defaultOgImage: z.string().optional(),
  homepageConfig: z
    .object({
      heroTitle: z.string().optional(),
      heroSubtitle: z.string().optional(),
      heroDescription: z.string().optional(),
      heroImage: z.string().optional(),
      heroCtaPrimary: z.string().optional(),
      heroCtaSecondary: z.string().optional(),
      showDonationCalculator: z.boolean().optional(),
      showNewsletter: z.boolean().optional(),
    })
    .optional(),
});
