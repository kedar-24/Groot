//User.ts
import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId;
  userId: string;
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
  providers: ("google" | "credentials")[];
}

const userSchema = new Schema<IUser>(
  {
    userId: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true, trim: true, minlength: 3 },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String },
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
   providers: {
  type: [String],
  enum: ["google", "credentials"],
  default: [],
  validate: {
    validator: function (arr: string[]) {
      return new Set(arr).size === arr.length;
    },
    message: "Duplicate provider entries not allowed.",
  },
},
  },
  { timestamps: true }
);

export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);
