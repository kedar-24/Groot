import { connectToDatabase } from "@/lib/mongodb";
import Article from "@/models/Article";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  await connectToDatabase();
  const articles = await Article.find();
  return articles.map((a: { title: string }) => ({
    slug: a.title.toLowerCase().replace(/\s+/g, "-"),
  }));
}

export default async function BlogDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  await connectToDatabase();
  const article = await Article.findOne({
    title: new RegExp(params.slug.replace(/-/g, " "), "i"),
  });

  if (!article) return notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <p className="text-sm text-gray-500 mb-4">
        {article.date} | {article.category}
      </p>
      <img
        src={article.imageUrl}
        alt={article.title}
        className="rounded mb-6"
      />
      <p className="text-lg text-gray-800">{article.content}</p>
    </div>
  );
}
