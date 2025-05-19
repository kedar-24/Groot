export default function CDSPage() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-green-900 text-white py-16 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Centre for Development Studies (CDS)
        </h1>
        <p className="text-lg mb-6">
          Learn about our MIHU and Recruitment initiatives below.
        </p>
        <a
          href="#initiatives"
          className="bg-green-700 text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-green-600 transition duration-300"
        >
          Explore Initiatives
        </a>
      </section>

      {/* MIHU and Recruitment Sections */}
      <section id="initiatives" className="max-w-screen-xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {/* MIHU Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
            <h3 className="text-2xl font-semibold text-green-800 mb-4">
              MIHU - May I Help You
            </h3>
            <p className="text-lg text-gray-700 mb-4">
              MIHU (May I Help You) is an initiative designed to provide
              assistance, support, and resources to individuals in need. Our
              goal is to offer guidance and solutions for various challenges
              faced by individuals and communities. Whether it&apos;s helping
              with information, resources, or services, MIHU aims to make a
              positive impact in people&apos;s lives.
            </p>
            <a
              href="/cds/mihu"
              className="text-green-700 font-semibold hover:text-green-600 transition duration-200"
            >
              Learn More about MIHU
            </a>
          </div>

          {/* Recruitment Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
            <h3 className="text-2xl font-semibold text-green-800 mb-4">
              Recruitment
            </h3>
            <p className="text-lg text-gray-700 mb-4">
              Our recruitment initiatives provide opportunities to contribute to
              impactful projects. We are always looking for passionate
              individuals to join our team and make a difference.
            </p>
            <a
              href="/cds/recruitment"
              className="text-green-700 font-semibold hover:text-green-600 transition duration-200"
            >
              Explore Recruitment Opportunities
            </a>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-white py-12 px-4">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-green-800 mb-6">
            Join Us in Making a Difference
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Whether you&apos;re looking to contribute to MIHU, join our
            recruitment program, or get involved in other initiatives,
            there&apos;s a place for you here.
          </p>
          <a
            href="/cds/mihu/join"
            className="bg-green-700 text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-green-600 transition duration-300"
          >
            Get Involved
          </a>
        </div>
      </section>
    </div>
  );
}
