import Card from "@/components/Card";
import Button from "@/components/button";

export default function MIHUPage() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-green-900 text-white py-20 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">MIHU - May I Help You</h1>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          A student-led support system offering guidance, emotional help, and
          mentorship through peer-to-peer interactions.
        </p>
        {/* Mentor/Mentee Highlight Buttons */}
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-10">
          <Button
            as="a"
            href="/cds/mihu/mentee"
            variant="secondary"
            className="bg-white text-green-900 border border-green-700 hover:bg-green-50 hover:border-green-800 transition-all duration-200 text-xl px-10 py-5 rounded-lg tracking-wide shadow-sm"
          >
            Become a Mentee
          </Button>
          <Button
            as="a"
            href="/cds/mihu/mentor"
            variant="primary"
            className="bg-green-700 hover:bg-green-800 text-white text-xl px-10 py-5 rounded-lg tracking-wide shadow-sm"
          >
            Become a Mentor
          </Button>
        </div>
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
        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto mt-10">
          <Card variant="value" title="Emotional Support">
            <p className="text-lg text-gray-700 mb-4">
              Feeling low, stressed, or overwhelmed? Connect with trained peers
              who listen without judgment and guide you toward helpful
              resources.
            </p>
          </Card>
          <Card variant="value" title="Academic Guidance">
            <p className="text-lg text-gray-700 mb-4">
              Need help navigating courses, exams, or time management? MIHU can
              connect you with experienced peers who&apos;ve been there.
            </p>
          </Card>
          <Card variant="value" title="Peer Mentorship">
            <p className="text-lg text-gray-700 mb-4">
              Join our mentorship network where senior students help juniors
              with academics, college life, and more — building a culture of
              care.
            </p>
          </Card>
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
