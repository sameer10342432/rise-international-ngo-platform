import mongoose, { Schema, Document } from 'mongoose';
import { ProgrammeCategory, PublicationStatus } from '../types/index.js';

export interface IProgramme extends Document {
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  image: string;
  icon: string;
  category: ProgrammeCategory;
  status: PublicationStatus;
  sortOrder: number;
  mission?: string;
  whatWeDo: string[];
  impactPoints: string[];
  stats: { label: string; value: string }[];
  seoTitle?: string;
  seoDescription?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProgrammeSchema = new Schema<IProgramme>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    shortDescription: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    icon: { type: String, default: 'public' },
    category: {
      type: String,
      enum: ['education', 'community-development', 'humanitarian-aid', 'economic-empowerment'],
      required: true,
      index: true,
    },
    status: { type: String, enum: ['draft', 'published'], default: 'published', index: true },
    sortOrder: { type: Number, default: 0 },
    mission: { type: String },
    whatWeDo: [{ type: String }],
    impactPoints: [{ type: String }],
    stats: [
      {
        label: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
    seoTitle: { type: String },
    seoDescription: { type: String },
  },
  { timestamps: true }
);

export const Programme = mongoose.model<IProgramme>('Programme', ProgrammeSchema);
