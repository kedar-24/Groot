import Card from "@/components/Card";
import SectionContainer from "@/components/SectionContainer";

const HighlightsSection = () => (
  <section
    aria-labelledby="latest-news-heading"
    className="w-full py-16 sm:py-20 md:py-24 bg-[var(--color-black)]"
  >
    <SectionContainer>
      {/* Heading */}
      <div className="mb-10">
        <h2
          id="latest-news-heading"
          className="text-left text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-white"
        >
          Alumni{" "}
          <span className="text-transparent bg-clip-text bg-[var(--color-secondary)]">
            Highlights
          </span>
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-300 mt-4 max-w-2xl">
          Discover the latest achievements, inspiring stories, and upcoming
          events from our vibrant alumni community.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <Card className="scroll-appear-left hover:scale-[1.02] transition duration-300" />
        <Card className="scroll-appear-up hover:scale-[1.02] transition duration-300" />
        <Card className="scroll-appear-right hover:scale-[1.02] transition duration-300" />
      </div>
    </SectionContainer>
  </section>
);

export default HighlightsSection;
