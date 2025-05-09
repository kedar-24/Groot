import HeroSection from "@/components/HeroSection";
import NewsCard from "@/components/NewsCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
      <Navbar />
      <HeroSection />
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6 border-b-2 border-red-500 inline-block">
          Latest News
        </h2>
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
      </section>
      <Footer />
    </main>
  );
}
