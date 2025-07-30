import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  clerkId: string;
  email: string;
  name: string;
  phone?: string;
  profileImage?: string;
  role: 'farmer' | 'shopkeeper' | 'expert' | 'admin';
  address?: {
    street?: string;
    city?: string;
    state?: string;
    pincode?: string;
  };
  farmDetails?: {
    farmSize?: number; // in acres
    cropTypes?: string[];
    soilType?: string;
    irrigationType?: string;
  };
  preferredLanguage: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    clerkId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    phone: { type: String },
    profileImage: { type: String },
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
    farmDetails: {
      farmSize: { type: Number },
      cropTypes: [{ type: String }],
      soilType: { type: String },
      irrigationType: { type: String }
    },
    preferredLanguage: {
      type: String,
      default: 'en',
      enum: ['en', 'hi', 'bn', 'te', 'mr', 'ta', 'gu', 'kn', 'ml', 'pa', 'or', 'as']
    },
    isVerified: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
