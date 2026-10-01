import mongoose, { Schema, Document } from 'mongoose';
import { PublicationStatus } from '../types/index.js';

export interface INewsArticle extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string[];
  featuredImage: string;
  category: string;
  author: string;
  publishedAt: Date;
  status: PublicationStatus;
  featured: boolean;
  tags: string[];
  readTime: string;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: Date;
  updatedAt: Date;
}

const NewsArticleSchema = new Schema<INewsArticle>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    excerpt: { type: String, required: true, trim: true },
    content: [{ type: String, required: true }],
    featuredImage: { type: String, required: true },
    category: { type: String, required: true, index: true },
    author: { type: String, default: 'RISE Communications' },
    publishedAt: { type: Date, default: Date.now, index: true },
    status: { type: String, enum: ['draft', 'published'], default: 'published', index: true },
    featured: { type: Boolean, default: false, index: true },
    tags: [{ type: String, trim: true }],
    readTime: { type: String, default: '4 min read' },
    seoTitle: { type: String },
    seoDescription: { type: String },
  },
  { timestamps: true }
);

export const NewsArticle = mongoose.model<INewsArticle>('NewsArticle', NewsArticleSchema);
