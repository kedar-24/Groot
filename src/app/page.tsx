import HeroSection from "@/components/HeroSection";
import NewsCard from "@/components/NewsCard";
import type { Article } from "@/models/Article";

async function getArticles(): Promise<Article[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/news`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return [];

    const data = await res.json();

    if (Array.isArray(data)) {
      return data.slice(0, 6);
    }

    return [];
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
}

export default async function HomePage() {
  const articles = await getArticles();

  return (
    <main className="bg-white text-gray-900 min-h-screen">
      <HeroSection />

      <section
        aria-labelledby="latest-news-heading"
        className="max-w-7xl mx-auto px-6 py-16 sm:px-12"
      >
        <h2
          id="latest-news-heading"
          className="text-4xl font-extrabold tracking-tight mb-8 border-b-4 border-red-600 inline-block pb-3"
        >
          Latest News
        </h2>

        {articles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-lg text-gray-500 font-semibold mb-4">
              No news articles available at the moment.
            </p>
            <p className="text-sm text-gray-400 max-w-sm text-center">
              Please check back later or refresh the page for the latest
              updates.
            </p>
          </div>
        ) : (
          <ul
            role="list"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {articles.map((article) => (
              <li
                key={article._id}
                className="transform transition duration-300 hover:scale-[1.03] focus-within:scale-[1.03] will-change-transform"
              >
                <NewsCard
                  title={article.title}
                  date={article.date}
                  category={article.category}
                  imageUrl={article.imageUrl}
                  content={article.content}
                  url={article.url}
                />
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
