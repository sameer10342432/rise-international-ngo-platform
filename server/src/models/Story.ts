import mongoose, { Schema, Document } from 'mongoose';
import { PublicationStatus } from '../types/index.js';

export interface IStory extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string[];
  featuredImage: string;
  category: string;
  author: string;
  publishedAt: Date;
  location?: string;
  beneficiary?: string;
  quote?: string;
  metrics?: string;
  status: PublicationStatus;
  featured: boolean;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: Date;
  updatedAt: Date;
}

const StorySchema = new Schema<IStory>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    excerpt: { type: String, required: true, trim: true },
    content: [{ type: String, required: true }],
    featuredImage: { type: String, required: true },
    category: { type: String, required: true, index: true },
    author: { type: String, default: 'RISE Field Directorate' },
    publishedAt: { type: Date, default: Date.now, index: true },
    location: { type: String },
    beneficiary: { type: String },
    quote: { type: String },
    metrics: { type: String },
    status: { type: String, enum: ['draft', 'published'], default: 'published', index: true },
    featured: { type: Boolean, default: false, index: true },
    seoTitle: { type: String },
    seoDescription: { type: String },
  },
  { timestamps: true }
);

export const Story = mongoose.model<IStory>('Story', StorySchema);
