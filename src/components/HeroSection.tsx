import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="bg-green-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-5xl font-bold leading-tight mb-4">
            G-Root Daily News
          </h1>
          <p className="text-lg mb-6">
            Everything You Need to Know About Markets.
          </p>
          <a
            href="#"
            className="bg-red-500 text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-red-600 transition duration-300 ease-in-out"
          >
            Get the Latest Updates
          </a>
        </div>
        <div className="relative hidden md:block">
          <Image
            src="/images/hero.webp"
            alt="Hero Image"
            width={600}
            height={400}
            className="rounded-lg object-cover shadow-xl transition-transform transform hover:scale-105 duration-500"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
