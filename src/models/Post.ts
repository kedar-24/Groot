import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPost extends Document {
  author: mongoose.Types.ObjectId;
  authorName: string;
  authorTitle?: string;
  authorImage?: string;
  content: string;
  createdAt: Date;
  likes: number;
  comments: number;
}

const postSchema = new Schema<IPost>(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    authorName: { type: String, required: true },
    authorTitle: { type: String },
    authorImage: { type: String },
    content: { type: String, required: true, trim: true, maxlength: 2000 },
    likes: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Post: Model<IPost> =
  mongoose.models.Post || mongoose.model<IPost>("Post", postSchema);
