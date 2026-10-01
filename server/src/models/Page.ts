import mongoose, { Schema, Document } from 'mongoose';
import { PublicationStatus } from '../types/index.js';

export interface IPage extends Document {
  title: string;
  slug: string;
  content: string;
  featuredImage?: string;
  status: PublicationStatus;
  seoTitle?: string;
  seoDescription?: string;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const PageSchema = new Schema<IPage>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    content: { type: String, required: true },
    featuredImage: { type: String },
    status: { type: String, enum: ['draft', 'published'], default: 'published', index: true },
    seoTitle: { type: String },
    seoDescription: { type: String },
    publishedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Page = mongoose.model<IPage>('Page', PageSchema);
