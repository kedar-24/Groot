import mongoose, { Schema } from "mongoose";

const ArticleSchema = new Schema({
  title: String,
  date: String,
  category: String,
  imageUrl: String,
  content: String,
});

export default mongoose.models.Article ||
  mongoose.model("Article", ArticleSchema);
