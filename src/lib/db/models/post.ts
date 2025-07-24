import mongoose, { Schema, Document } from 'mongoose';

export interface IPost extends Document {
  user: mongoose.Types.ObjectId;
  title: string;
  content: string;
  images?: string[];
  category: 'question' | 'discussion' | 'success_story' | 'news' | 'other';
  likes: mongoose.Types.ObjectId[];
  comments: {
    user: mongoose.Types.ObjectId;
    text: string;
    createdAt: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema: Schema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    title: { type: String, required: true },
    content: { type: String, required: true },
    images: [{ type: String }],
    category: { 
      type: String, 
      required: true, 
      enum: ['question', 'discussion', 'success_story', 'news', 'other']
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        },
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema);
