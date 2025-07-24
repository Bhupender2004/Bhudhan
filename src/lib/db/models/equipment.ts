import mongoose, { Schema, Document } from 'mongoose';

export interface IEquipment extends Document {
  name: string;
  description: string;
  price: number;
  category: 'tractor' | 'harvester' | 'plough' | 'sprayer' | 'other';
  images: string[];
  seller: {
    name: string;
    contact: string;
    address: string;
  };
  specifications: {
    [key: string]: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const EquipmentSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { 
      type: String, 
      required: true, 
      enum: ['tractor', 'harvester', 'plough', 'sprayer', 'other']
    },
    images: [{ type: String }],
    seller: {
      name: { type: String, required: true },
      contact: { type: String, required: true },
      address: { type: String, required: true }
    },
    specifications: {
      type: Map,
      of: String
    }
  },
  { timestamps: true }
);

export default mongoose.models.Equipment || mongoose.model<IEquipment>('Equipment', EquipmentSchema);
