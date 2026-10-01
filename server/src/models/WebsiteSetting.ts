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
    organisationName: { type: String, default: 'RISE International' },
    tagline: { type: String, default: 'Empowering Communities. Transforming Lives.' },
    email: { type: String, default: 'info@riseintl.org' },
    phone: { type: String, default: '+49 1520-6777889' },
    socialLinks: [
      {
        name: { type: String },
        href: { type: String },
        icon: { type: String },
      },
    ],
    logo: { type: String, default: '/images/rise-logo.svg' },
    favicon: { type: String, default: '/favicon.svg' },
    defaultSeoTitle: {
      type: String,
      default: 'RISE International | Empowering Communities. Transforming Lives.',
    },
    defaultSeoDescription: {
      type: String,
      default:
        'RISE International is a global nonprofit organisation working to uplift vulnerable communities through education, humanitarian aid, and sustainable development initiatives.',
    },
    defaultOgImage: { type: String, default: '/images/classroom-children-education.png' },
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
