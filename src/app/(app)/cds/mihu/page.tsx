import ValueCard from "@/components/ValueCard";
import Button from "@/components/button";

export default function MIHUPage() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-green-900 text-white py-20 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">MIHU - May I Help You</h1>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          A student-led support system offering guidance, emotional help, and
          mentorship through peer-to-peer interactions.
        </p>
        <Button
          as="a"
          href="#learn-more"
          variant="primary"
          className="bg-green-700 text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-green-600 transition duration-300"
        >
          Learn More
        </Button>
      </section>

      {/* Purpose and Goals Section */}
      <section
        id="learn-more"
        className="max-w-screen-xl mx-auto py-16 px-4 sm:px-6 lg:px-8"
      >
        <h2 className="text-3xl font-semibold text-green-800 mb-6 text-center">
          What is MIHU?
        </h2>
        <p className="text-lg text-gray-700 mb-10 max-w-3xl mx-auto text-center">
          MIHU (May I Help You) is a student-driven initiative aimed at
          supporting peers in times of need — emotionally, academically, or
          socially. Whether you&apos;re struggling or simply need someone to
          listen, MIHU volunteers are here to help with empathy and
          confidentiality.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <ValueCard title="Emotional Support">
            <p className="text-lg text-gray-700 mb-4">
              Feeling low, stressed, or overwhelmed? Connect with trained peers
              who listen without judgment and guide you toward helpful
              resources.
            </p>
            <Button
              as="a"
              href="/cds/mihu/emotional-support"
              variant="primary"
              className="text-green-700 bg-transparent hover:text-green-600 px-0 py-0 shadow-none"
            >
              Talk to Someone
            </Button>
          </ValueCard>

          <ValueCard title="Academic Guidance">
            <p className="text-lg text-gray-700 mb-4">
              Need help navigating courses, exams, or time management? MIHU can
              connect you with experienced peers who’ve been there.
            </p>
            <Button
              as="a"
              href="/cds/mihu/academic-guidance"
              variant="primary"
              className="text-green-700 bg-transparent hover:text-green-600 px-0 py-0 shadow-none"
            >
              Get Support
            </Button>
          </ValueCard>

          <ValueCard title="Peer Mentorship">
            <p className="text-lg text-gray-700 mb-4">
              Join our mentorship network where senior students help juniors
              with academics, college life, and more — building a culture of
              care.
            </p>
            <Button
              as="a"
              href="/cds/mihu/mentorship"
              variant="primary"
              className="text-green-700 bg-transparent hover:text-green-600 px-0 py-0 shadow-none"
            >
              Become a Mentor
            </Button>
          </ValueCard>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-white py-16 px-4 text-center border-t border-gray-200">
        <h2 className="text-3xl font-semibold text-green-800 mb-6">
          Be a Part of MIHU
        </h2>
        <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
          Whether you&apos;re seeking help or want to support others, MIHU
          welcomes you. Your empathy, experience, or need is what makes our
          community strong.
        </p>
        <Button
          as="a"
          href="/cds/mihu/join"
          variant="primary"
          className="bg-green-700 text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-green-600 transition duration-300"
        >
          Join MIHU Today
        </Button>
      </section>
    </div>
  );
}
