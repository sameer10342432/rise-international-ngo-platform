import mongoose, { Schema, Document } from 'mongoose';

export interface ITeamMember extends Document {
  name: string;
  position: string;
  department: string;
  bio: string;
  photo?: string;
  email?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
  };
  sortOrder: number;
  isVisible: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TeamMemberSchema = new Schema<ITeamMember>(
  {
    name: { type: String, required: true, trim: true },
    position: { type: String, required: true, trim: true },
    department: { type: String, required: true, trim: true },
    bio: { type: String, required: true, trim: true },
    photo: { type: String },
    email: { type: String, trim: true, lowercase: true },
    socialLinks: {
      linkedin: { type: String },
      twitter: { type: String },
    },
    sortOrder: { type: Number, default: 0, index: true },
    isVisible: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

export const TeamMember = mongoose.model<ITeamMember>('TeamMember', TeamMemberSchema);
