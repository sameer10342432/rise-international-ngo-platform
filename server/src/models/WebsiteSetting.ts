import mongoose, { Schema, Document } from 'mongoose';

export interface IWebsiteSetting extends Document {
  organisationName: string;
  tagline: string;
  email: string;
  phone: string;
  socialLinks: { name: string; href: string; icon: string }[];
  logo: string;
  favicon: string;
  defaultSeoTitle: string;
  defaultSeoDescription: string;
  defaultOgImage: string;
  homepageConfig: {
    heroTitle: string;
    heroSubtitle: string;
    heroDescription: string;
    heroImage: string;
    heroCtaPrimary: string;
    heroCtaSecondary: string;
    showDonationCalculator: boolean;
    showNewsletter: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

const WebsiteSettingSchema = new Schema<IWebsiteSetting>(
  {
    organisationName: { type: String, default: 'RISE International (Research Initiatives and Skill Enlightenment)' },
    tagline: { type: String, default: 'Translating Thoughts Into Actions' },
    email: { type: String, default: 'info@riseintl.org' },
    phone: { type: String, default: '+92-302-4044714' },
    socialLinks: [
      {
        name: { type: String },
        href: { type: String },
        icon: { type: String },
      },
    ],
    logo: { type: String, default: '/images/logo/rise-logo.png' },
    favicon: { type: String, default: '/favicon.png' },
    defaultSeoTitle: {
      type: String,
      default: 'RISE International | Translating Thoughts Into Actions',
    },
    defaultSeoDescription: {
      type: String,
      default:
        'Research Initiatives and Skill Enlightenment (RISE International) — Empowering communities through education, St. Louis IT Institute, vocational skills, interfaith harmony, and sustainable grassroots development.',
    },
    defaultOgImage: { type: String, default: '/images/logo/rise-logo.png' },
    homepageConfig: {
      heroTitle: { type: String, default: 'Empowering Communities.' },
      heroSubtitle: { type: String, default: 'Transforming Lives.' },
      heroDescription: {
        type: String,
        default:
          'RISE International is a global nonprofit organisation working to uplift vulnerable communities through education, humanitarian aid, and sustainable development initiatives.',
      },
      heroImage: { type: String, default: '/images/classroom-children-education.png' },
      heroCtaPrimary: { type: String, default: 'DONATE NOW' },
      heroCtaSecondary: { type: String, default: 'BECOME A VOLUNTEER' },
      showDonationCalculator: { type: Boolean, default: true },
      showNewsletter: { type: Boolean, default: true },
    },
  },
  { timestamps: true }
);

export const WebsiteSetting = mongoose.model<IWebsiteSetting>(
  'WebsiteSetting',
  WebsiteSettingSchema
);
