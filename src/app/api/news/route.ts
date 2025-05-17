import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Article from "@/models/Article";

const MONGODB_URI = process.env.MONGODB_URI || "your-mongo-uri-here";

async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGODB_URI);
  }
}

export async function GET() {
  try {
    await connectDB();

    const res = await fetch(
      "https://newsapi.org/v2/everything?q=apple&from=2025-05-14&to=2025-05-14&sortBy=popularity&apiKey=a09a7938a0c64d65a4b0496cd8506169"
    );

    const data = await res.json();

    if (data.status !== "ok" || !data.articles) {
      return NextResponse.json(
        { error: "Invalid API response" },
        { status: 500 }
      );
    }

    interface ApiArticle {
      title: string;
      publishedAt: string;
      source?: {
        id?: string;
        name?: string;
      };
      urlToImage?: string;
      content?: string;
      author?: string;
      url: string;
      description?: string;
    }

    // Deduplicate by title
    const seenTitles = new Set<string>();
    const uniqueArticles = data.articles.filter((article: ApiArticle) => {
      if (seenTitles.has(article.title)) return false;
      seenTitles.add(article.title);
      return true;
    });

    const formattedArticles = uniqueArticles.map((article: ApiArticle) => ({
      title: article.title,
      date: article.publishedAt,
      category: article.source?.name || "Uncategorized",
      imageUrl: article.urlToImage,
      content: article.content,
      author: article.author,
      source: {
        id: article.source?.id || "",
        name: article.source?.name || "",
      },
      url: article.url,
      description: article.description,
    }));

    // Optional: Use bulkWrite to avoid duplicates (if unique index on title or URL)
    const operations = formattedArticles.map((article) => ({
      updateOne: {
        filter: { title: article.title },
        update: { $setOnInsert: article },
        upsert: true,
      },
    }));

    await Article.bulkWrite(operations);

    // ✅ Return only 10 most recent unique articles
    const allArticles = await Article.find().sort({ date: -1 }).limit(10);

    return NextResponse.json(allArticles);
  } catch (error) {
    console.error("Error in GET /api/news:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
