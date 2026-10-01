import mongoose, { Schema, Document } from 'mongoose';

export interface IPartner extends Document {
  name: string;
  logo?: string;
  website?: string;
  description?: string;
  category?: string;
  icon?: string;
  sortOrder: number;
  isVisible: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PartnerSchema = new Schema<IPartner>(
  {
    name: { type: String, required: true, trim: true },
    logo: { type: String },
    website: { type: String, trim: true },
    description: { type: String, trim: true },
    category: { type: String, default: 'Strategic Alliance' },
    icon: { type: String, default: 'handshake' },
    sortOrder: { type: Number, default: 0, index: true },
    isVisible: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

export const Partner = mongoose.model<IPartner>('Partner', PartnerSchema);
