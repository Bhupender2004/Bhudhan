import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  phone: string;
  role: 'farmer' | 'shopkeeper' | 'expert' | 'admin';
  address?: {
    street?: string;
    city?: string;
    state?: string;
    pincode?: string;
  };
  preferredLanguage: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    role: { 
      type: String, 
      required: true, 
      enum: ['farmer', 'shopkeeper', 'expert', 'admin'],
      default: 'farmer'
    },
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      pincode: { type: String }
    },
    preferredLanguage: { 
      type: String, 
      default: 'en',
      enum: ['en', 'hi', 'bn', 'te', 'mr', 'ta', 'gu', 'kn', 'ml', 'pa', 'or', 'as']
    }
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
