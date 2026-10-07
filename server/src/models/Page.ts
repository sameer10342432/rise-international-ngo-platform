import mongoose, { Schema, Document } from 'mongoose';
import { PublicationStatus } from '../types/index.js';

export interface IPageSection {
  id: string;
  type: string;
  heading?: string;
  subheading?: string;
  content?: string;
  image?: string;
  buttonText?: string;
  buttonLink?: string;
  isVisible: boolean;
  sortOrder: number;
  items?: any[];
}

export interface IPage extends Document {
  title: string;
  slug: string;
  content: string;
  featuredImage?: string;
  status: PublicationStatus;
  sections?: IPageSection[];
  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  noindex?: boolean;
  menuVisibility?: boolean;
  sortOrder?: number;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const PageSectionSchema = new Schema(
  {
    id: { type: String, required: true },
    type: { type: String, required: true },
    heading: { type: String, default: '' },
    subheading: { type: String, default: '' },
    content: { type: String, default: '' },
    image: { type: String, default: '' },
    buttonText: { type: String, default: '' },
    buttonLink: { type: String, default: '' },
    isVisible: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
    items: { type: Schema.Types.Mixed, default: [] },
  },
  { _id: false }
);

const PageSchema = new Schema<IPage>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    content: { type: String, required: true },
    featuredImage: { type: String },
    status: { type: String, enum: ['draft', 'published'], default: 'published', index: true },
    sections: [PageSectionSchema],
    seoTitle: { type: String },
    seoDescription: { type: String },
    canonicalUrl: { type: String },
    ogTitle: { type: String },
    ogDescription: { type: String },
    ogImage: { type: String },
    noindex: { type: Boolean, default: false },
    menuVisibility: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
    publishedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Page = mongoose.model<IPage>('Page', PageSchema);
