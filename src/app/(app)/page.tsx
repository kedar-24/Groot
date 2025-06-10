"use server";
import HeroSection from "@/components/HeroSection";
import Card from "@/components/Card";
import type { Article } from "@/models/Article";

async function getArticles(): Promise<Article[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/news`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return [];

    const data = await res.json();

    if (Array.isArray(data)) {
      return data.slice(0, 6).map((item) => {
        const obj = item as Partial<Article> & { id?: string; image?: string };
        return {
          _id: obj._id || obj.id || "",
          title: obj.title || "",
          date: obj.date || "",
          category: obj.category || "",
          imageUrl: obj.imageUrl || obj.image || "",
          content: obj.content || "",
          url: obj.url || "#",
        };
      });
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
    <main className="flex flex-col bg-white text-gray-900 min-h-screen">
      {/* Improved HeroSection: left hero + right stacked sections */}
      <section className="flex flex-col md:flex-row items-stretch w-full h-[600px]">
        {/* Left: Main Hero */}
        <div className="flex-1 flex h-full">
          <HeroSection />
        </div>
        {/* Right: Top and Bottom Sections */}
        <div className="flex flex-col flex-1 h-full bg-green-800 p-0 m-0">
          {/* Top: full width, half height */}
          <section className="h-1/2 flex items-center justify-center p-0 m-0">
            <div className="group relative w-full h-full flex items-center justify-center overflow-hidden shadow-lg bg-gray-900 rounded-none">
              <div
                className="absolute inset-0 w-full h-full bg-cover bg-center z-0 transition-transform duration-300 scale-105 group-hover:scale-110"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1496449903678-68ddcb189a24?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cmFuZG9tfGVufDB8fDB8fHww')",
                }}
              >
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />
              </div>
              <span className="absolute bottom-4 left-4 text-white text-2xl font-extrabold drop-shadow-lg z-10 tracking-wide">
                Inspiring Growth
              </span>
            </div>
          </section>

          {/* Bottom: two half-width sections */}
          <div className="flex flex-row h-1/2 p-0 m-0">
            <section className="w-1/2 h-full flex items-center justify-center p-0 m-0">
              <div className="group relative w-full h-full flex items-center justify-center overflow-hidden shadow-lg bg-gray-900 rounded-none">
                <div
                  className="absolute inset-0 w-full h-full bg-cover bg-center z-0 transition-transform duration-300 scale-105 group-hover:scale-110"
                  style={{
                    backgroundImage: "url('/images/image1.webp')",
                  }}
                >
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />
                </div>
                <span className="absolute bottom-4 left-4 text-white text-xl font-bold drop-shadow z-10">
                  Daily Insights
                </span>
              </div>
            </section>
            <section className="w-1/2 h-full flex items-center justify-center p-0 m-0">
              <div className="group relative w-full h-full flex items-center justify-center overflow-hidden shadow-lg bg-gray-900 rounded-none">
                <div
                  className="absolute inset-0 w-full h-full bg-cover bg-center z-0 transition-transform duration-300 scale-105 group-hover:scale-110"
                  style={{
                    backgroundImage: "url('/images/image2.webp')",
                  }}
                >
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />
                </div>
                <span className="absolute bottom-4 left-4 text-white text-xl font-bold drop-shadow z-10">
                  Market Trends
                </span>
              </div>
            </section>
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section
        aria-labelledby="latest-news-heading"
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16"
      >
        <h2
          id="latest-news-heading"
          className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-6 sm:mb-8 border-b-4 border-red-600 inline-block pb-2 sm:pb-3"
        >
          Latest News
        </h2>

        {articles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 sm:py-20">
            <p className="text-base sm:text-lg text-gray-500 font-semibold mb-2 sm:mb-4">
              No news articles available at the moment.
            </p>
            <p className="text-xs sm:text-sm text-gray-400 max-w-xs sm:max-w-sm text-center">
              Please check back later or refresh the page for the latest
              updates.
            </p>
          </div>
        ) : (
          <ul
            role="list"
            className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
          >
            {articles.map((article) => (
              <li
                key={article._id}
                className="transition duration-300 hover:scale-[1.03] focus-within:scale-[1.03] will-change-transform"
              >
                <Card
                  variant="news"
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
