import HeroSection from "@/components/HeroSection";
import NewsCard from "@/components/NewsCard";

interface Article {
  _id: string;
  title: string;
  date: string;
  category: string;
  imageUrl: string;
  content: string;
}

async function getArticles(): Promise<Article[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/news`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return [];

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
}

export default async function HomePage() {
  const articles = await getArticles();

  return (
    <main className="bg-white text-black">
      <HeroSection />
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6 border-b-4 border-red-500 inline-block pb-2">
          Latest News
        </h2>

        {/* Loading state or fallback message */}
        {articles.length === 0 ? (
          <div className="text-center text-lg font-medium text-gray-500">
            <p>
              No news articles available at the moment. Please check back later.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <NewsCard
                key={article._id}
                title={article.title}
                date={article.date}
                category={article.category}
                imageUrl={article.imageUrl}
                content={article.content}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
