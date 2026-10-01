import mongoose, { Schema, Document } from 'mongoose';
import {
  DonationFrequencyType,
  DonationPurposeType,
  DonationStatusType,
} from '../types/index.js';

export interface IDonation extends Document {
  donorName: string;
  email: string;
  amount: number;
  currency: string;
  frequency: DonationFrequencyType;
  purpose: DonationPurposeType;
  status: DonationStatusType;
  paymentProvider: string;
  transactionId: string;
  anonymous: boolean;
  donorNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const DonationSchema = new Schema<IDonation>(
  {
    donorName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true, index: true },
    amount: { type: Number, required: true, min: 1 },
    currency: { type: String, default: 'USD', uppercase: true },
    frequency: {
      type: String,
      enum: ['one_time', 'monthly'],
      default: 'one_time',
      index: true,
    },
    purpose: {
      type: String,
      enum: [
        'where_needed',
        'education',
        'humanitarian_aid',
        'community_development',
        'economic_empowerment',
      ],
      default: 'where_needed',
      index: true,
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'cancelled', 'refunded'],
      default: 'pending',
      index: true,
    },
    paymentProvider: { type: String, default: 'mock' },
    transactionId: { type: String, required: true, unique: true, index: true },
    anonymous: { type: Boolean, default: false },
    donorNotes: { type: String },
  },
  { timestamps: true }
);

export const Donation = mongoose.model<IDonation>('Donation', DonationSchema);
