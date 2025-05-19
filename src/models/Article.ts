import mongoose, { Schema } from "mongoose";

const ArticleSchema = new Schema({
  title: { type: String, required: true, unique: true },
  date: String,
  category: String,
  imageUrl: String,
  content: String,
  author: String,
  source: {
    id: String,
    name: String,
  },
  url: { type: String, required: true, unique: true },
  description: String,
});

export default mongoose.models.Article ||
  mongoose.model("Article", ArticleSchema);
