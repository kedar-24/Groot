import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="w-full bg-gradient-to-r from-green-900 to-green-800 text-white py-16 px-4 sm:py-24 sm:px-8 lg:px-24 transition-all">
      <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16">
        {/* Text Content */}
        <div className="max-w-xl mx-auto md:mx-0 space-y-6 md:space-y-8 text-center md:text-left">
          <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight tracking-tight drop-shadow-lg">
            G-Root Daily News
          </h1>

          <p className="text-green-300 text-base sm:text-lg leading-relaxed">
            Stay ahead with expertly curated market insights and breaking news,
            delivered daily to keep you informed and empowered.
          </p>

          <a
            href="#"
            className="inline-block bg-red-600 hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400
              transition rounded-lg px-6 py-3 sm:px-8 sm:py-4 font-semibold text-base sm:text-lg shadow-lg shadow-red-700/50 hover:shadow-xl
              transform hover:scale-105 will-change-transform"
            aria-label="Get the Latest Updates"
          >
            Get the Latest Updates
          </a>

          <p className="text-green-400 italic text-xs sm:text-sm max-w-xs tracking-wide mx-auto md:mx-0">
            Trusted market insights to empower your decisions every day.
          </p>
        </div>

        {/* Image Container */}
        {/* <div className="mx-auto md:mx-0 w-full max-w-xs sm:max-w-md rounded-3xl overflow-hidden shadow-2xl shadow-black/60 duration-500 hover:shadow-black/80 hover:scale-105 transition-all">
          <Image
            src="/images/hero.webp"
            alt="Market news illustration"
            width={600}
            height={400}
            className="object-cover w-full h-full"
            priority
          />
        </div> */}
      </div>
    </section>
  );
};

export default HeroSection;
