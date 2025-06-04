// import Image from "next/image";

// import Button from "./button";
import Button from "@/components/button";

const HeroSection = () => {
  return (
    <section className="w-full bg-gradient-to-r from-green-950 to-green-800 text-white py-16 px-4 sm:py-24 sm:px-8 lg:px-24 transition-all">
      <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16">
        {/* Text Content */}
        <div className="max-w-xl mx-auto md:mx-0 space-y-6 md:space-y-8 text-center md:text-left">
          <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight tracking-tight drop-shadow-lg">
            G-Root Daily News
          </h1>

          <p className="text-green-100 text-base sm:text-lg leading-relaxed">
            Stay ahead with expertly curated market insights and breaking news,
            delivered daily to keep you informed and empowered.
          </p>

          <div className="flex justify-center md:justify-start">
            <Button variant="red">Get the Latest Updates</Button>
          </div>

          <p className="text-green-300 italic text-xs sm:text-sm max-w-xs tracking-wide mx-auto md:mx-0">
            Trusted market insights to empower your decisions every day.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
