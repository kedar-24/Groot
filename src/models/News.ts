import mongoose, { Schema, Document, models, model } from "mongoose";

export interface INews extends Document {
  title: string;
  content: string;
  author: mongoose.Types.ObjectId | string;
  authorName?: string;
  image?: string;
  tags?: string[];
  published: boolean;
  publishedAt?: Date;
  views: number;
  summary?: string;
  createdAt: Date;
  updatedAt: Date;
}

const NewsSchema = new Schema<INews>(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    summary: { type: String, trim: true, maxlength: 400 },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    authorName: { type: String },
    image: { type: String },
    tags: [{ type: String, trim: true, lowercase: true }],
    published: { type: Boolean, default: false },
    publishedAt: { type: Date },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Prevent model overwrite in dev
export default models.News || model<INews>("News", NewsSchema);
