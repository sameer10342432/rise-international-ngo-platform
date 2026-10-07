import mongoose, { Schema, Document } from 'mongoose';

export interface IMediaAsset extends Document {
  filename: string;
  originalName: string;
  url: string;
  mimeType: string;
  fileSize: number;
  width?: number;
  height?: number;
  altText: string;
  caption: string;
  title: string;
  source: 'wordpress' | 'upload' | 'ai';
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

const MediaAssetSchema = new Schema<IMediaAsset>(
  {
    filename: { type: String, required: true, unique: true, trim: true, index: true },
    originalName: { type: String, required: true, trim: true },
    url: { type: String, required: true, unique: true, trim: true, index: true },
    mimeType: { type: String, required: true },
    fileSize: { type: Number, required: true },
    width: { type: Number },
    height: { type: Number },
    altText: { type: String, default: '' },
    caption: { type: String, default: '' },
    title: { type: String, default: '' },
    source: {
      type: String,
      enum: ['wordpress', 'upload', 'ai'],
      default: 'wordpress',
      index: true,
    },
    category: {
      type: String,
      default: 'general',
      index: true,
    },
  },
  { timestamps: true }
);

MediaAssetSchema.index({ title: 'text', originalName: 'text', altText: 'text' });

export const MediaAsset = mongoose.model<IMediaAsset>('MediaAsset', MediaAssetSchema);
