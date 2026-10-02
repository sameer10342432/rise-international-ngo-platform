export interface Programme {
  id: string;
  slug: string;
  title: string;
  category: string;
  tag: string;
  description: string;
  fullDescription: string;
  mission: string;
  whatWeDo: string[];
  impactPoints: string[];
  image: string;
  altText: string;
  icon: string;
  colour: string;
  link: string;
  stats: {
    label: string;
    value: string;
  }[];
}

export interface ImpactStat {
  id: string;
  value: string;
  numericValue: number;
  suffix?: string;
  prefix?: string;
  label: string;
  description?: string;
  icon: string;
}

export interface Story {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  category: string;
  image: string;
  altText: string;
  publishedAt: string;
  location: string;
  beneficiary: string;
  author: string;
  quote?: string;
  metrics?: string;
  isDraft?: boolean;
  draftNotice?: string;
}

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  category: string;
  image: string;
  altText: string;
  publishedAt: string;
  author: string;
  readTime: string;
  isDraftDemo?: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  bio: string;
  image: string;
}

export interface Partner {
  id: string;
  name: string;
  category: string;
  icon: string;
}

export type DonationFrequency = 'once' | 'monthly';

export interface DonationPayload {
  amount: number;
  frequency: DonationFrequency;
  purpose: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  paymentMethod?: string;
}

export interface DonationResponse {
  success: boolean;
  transactionId: string;
  message: string;
  amount: number;
  frequency: DonationFrequency;
  purpose: string;
}

export interface VolunteerApplication {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  areaOfInterest: string;
  availability: string;
  message: string;
}

export interface ContactMessage {
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface NewsletterSubscription {
  firstName: string;
  email: string;
}

export type SubmissionStatus = 'idle' | 'loading' | 'success' | 'error';
