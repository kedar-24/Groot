// models/User.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  username: string;
  email?: string;
  mobile?: string;
  password?: string;
  image?: string;
  emailVerified?: Date;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      unique: true,
      sparse: true, // allows multiple documents with undefined email
      trim: true,
      lowercase: true,
    },
    mobile: {
      type: String,
      unique: true,
      sparse: true, // allows multiple documents with undefined mobile
      match: [/^\d{10}$/, "Invalid mobile number"],
    },
    password: {
      type: String,
    },
    image: {
      type: String,
    },
    emailVerified: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

