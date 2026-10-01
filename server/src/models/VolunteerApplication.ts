import mongoose, { Schema, Document } from 'mongoose';
import { VolunteerStatusType } from '../types/index.js';

export interface IVolunteerApplication extends Document {
  fullName: string;
  email: string;
  phone?: string;
  country: string;
  areaOfInterest: string;
  availability: string;
  message: string;
  status: VolunteerStatusType;
  adminNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const VolunteerApplicationSchema = new Schema<IVolunteerApplication>(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true, index: true },
    phone: { type: String, trim: true },
    country: { type: String, required: true, trim: true },
    areaOfInterest: { type: String, required: true, index: true },
    availability: { type: String, required: true },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ['new', 'reviewing', 'accepted', 'rejected', 'contacted'],
      default: 'new',
      index: true,
    },
    adminNotes: { type: String },
  },
  { timestamps: true }
);

export const VolunteerApplication = mongoose.model<IVolunteerApplication>(
  'VolunteerApplication',
  VolunteerApplicationSchema
);
