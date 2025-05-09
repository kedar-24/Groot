export default function MIHUPage() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-green-900 text-white py-16 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">
          MIHU - Mental and Innovation Health Unit
        </h1>
        <p className="text-lg mb-6">
          A safe space for mental well-being, innovation support, and peer
          engagement.
        </p>
        <a
          href="#learn-more"
          className="bg-green-700 text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-green-600 transition duration-300"
        >
          Learn More
        </a>
      </section>

      {/* Purpose and Goals Section */}
      <section id="learn-more" className="max-w-screen-xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-semibold text-green-800 mb-6 text-center">
          Our Purpose
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          MIHU (Mental and Innovation Health Unit) is dedicated to providing a
          safe space for individuals to address their mental health needs,
          foster innovation, and engage with like-minded peers. We aim to create
          a supportive community where individuals can freely explore, innovate,
          and find resources for mental well-being.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Mental Health Support */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
            <h3 className="text-2xl font-semibold text-green-800 mb-4">
              Mental Health Support
            </h3>
            <p className="text-lg text-gray-700 mb-4">
              We offer emotional support, counseling, and resources for mental
              well-being. Whether you&apos;re looking for professional help or
              just need someone to talk to, MIHU is here to support you.
            </p>
            <a
              href="/mihu/support"
              className="text-green-700 font-semibold hover:text-green-600 transition duration-200"
            >
              Learn More
            </a>
          </div>

          {/* Innovation Support */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
            <h3 className="text-2xl font-semibold text-green-800 mb-4">
              Innovation Support
            </h3>
            <p className="text-lg text-gray-700 mb-4">
              MIHU encourages creative thinking and problem-solving. We offer
              resources, mentorship, and workshops to help you bring your
              innovative ideas to life and make an impact.
            </p>
            <a
              href="/mihu/innovation"
              className="text-green-700 font-semibold hover:text-green-600 transition duration-200"
            >
              Get Involved
            </a>
          </div>

          {/* Peer Engagement */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
            <h3 className="text-2xl font-semibold text-green-800 mb-4">
              Peer Engagement
            </h3>
            <p className="text-lg text-gray-700 mb-4">
              Join a community of peers who support each other. Through group
              activities, events, and discussions, MIHU fosters a sense of
              belonging and engagement.
            </p>
            <a
              href="/mihu/peer-engagement"
              className="text-green-700 font-semibold hover:text-green-600 transition duration-200"
            >
              Join Our Community
            </a>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-white py-12 px-4 text-center">
        <h2 className="text-3xl font-semibold text-green-800 mb-6">
          Get Involved in MIHU
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          Whether you are looking for support or want to contribute to the MIHU
          community, there are many ways to get involved and make a difference.
        </p>
        <a
          href="/join"
          className="bg-green-700 text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-green-600 transition duration-300"
        >
          Join MIHU Today
        </a>
      </section>
    </div>
  );
}
