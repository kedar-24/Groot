import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  image?: string;
  emailVerified?: Date;
  jobRole?: string;
  businessDetails?: string;
  workingCity?: string;
  workingState?: string;
  fieldsOfExpertise?: string[];
  graduationYear?: number;
  degree?: string;
  linkedin?: string;
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true, trim: true, minlength: 3 },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true },
    image: { type: String },
    emailVerified: { type: Date },
    jobRole: { type: String },
    businessDetails: { type: String, required: false },
    workingCity: { type: String },
    workingState: { type: String },
    fieldsOfExpertise: [{ type: String }],
    graduationYear: { type: Number },
    degree: { type: String },
    linkedin: { type: String },
  },
  { timestamps: true }
);

export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);
