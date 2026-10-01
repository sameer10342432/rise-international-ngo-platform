import mongoose, { Schema, Document } from 'mongoose';

export interface IImpactStat extends Document {
  label: string;
  value: string;
  numericValue: number;
  suffix?: string;
  prefix?: string;
  description?: string;
  icon: string;
  colour?: string;
  sortOrder: number;
  isVisible: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ImpactStatSchema = new Schema<IImpactStat>(
  {
    label: { type: String, required: true, trim: true },
    value: { type: String, required: true, trim: true },
    numericValue: { type: Number, required: true },
    suffix: { type: String, default: '+' },
    prefix: { type: String, default: '' },
    description: { type: String },
    icon: { type: String, default: 'public' },
    colour: { type: String, default: '#16B866' },
    sortOrder: { type: Number, default: 0, index: true },
    isVisible: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

export const ImpactStat = mongoose.model<IImpactStat>('ImpactStat', ImpactStatSchema);
