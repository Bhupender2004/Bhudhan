import mongoose, { Schema, Document } from 'mongoose';

export interface IScheme extends Document {
  title: string;
  description: string;
  eligibility: string;
  benefits: string;
  applicationProcess: string;
  documents: string[];
  lastDate?: Date;
  link: string;
  category: 'subsidy' | 'loan' | 'insurance' | 'training' | 'other';
  createdAt: Date;
  updatedAt: Date;
}

const SchemeSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    eligibility: { type: String, required: true },
    benefits: { type: String, required: true },
    applicationProcess: { type: String, required: true },
    documents: [{ type: String }],
    lastDate: { type: Date },
    link: { type: String, required: true },
    category: { 
      type: String, 
      required: true, 
      enum: ['subsidy', 'loan', 'insurance', 'training', 'other']
    }
  },
  { timestamps: true }
);

export default mongoose.models.Scheme || mongoose.model<IScheme>('Scheme', SchemeSchema);
