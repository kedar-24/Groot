import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="bg-green-900 text-white py-12 px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl font-bold mb-4">G-Root Daily News</h1>
          <p className="text-lg mb-6">
            Everything You Need to Know About Markets.
          </p>
          <button className="bg-white text-green-900 px-5 py-2 rounded font-semibold hover:bg-gray-100 transition">
            Read More
          </button>
        </div>
        <div className="hidden md:block">
          <Image
            src="/assets/hero-news.jpg"
            alt="Hero"
            width={600}
            height={400}
            className="rounded"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
