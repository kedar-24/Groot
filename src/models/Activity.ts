import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IActivity extends Document {
  userId?: mongoose.Types.ObjectId | string;
  userName?: string;
  type: string; // e.g. "USER_REGISTERED", "EVENT_CREATED", etc.
  description: string;
  action?: string; // optional, for legacy support
  meta?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const ActivitySchema = new Schema<IActivity>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    userName: { type: String },
    type: { type: String, required: true }, // e.g. "USER_REGISTERED"
    description: { type: String, required: true }, // e.g. "John Doe registered for 'Tech Conference'"
    action: { type: String }, // optional, for legacy
    meta: { type: Schema.Types.Mixed }, // for any extra info
  },
  { timestamps: true }
);

export default models.Activity || model<IActivity>("Activity", ActivitySchema);
