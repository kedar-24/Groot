export default function AboutPage() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-green-900 text-white py-16 px-4">
        <div className="max-w-screen-xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">About GROOT</h1>
          <p className="text-xl mb-6">
            We are the Orukal Guild – promoting growth, innovation, and
            community impact.
          </p>
          <a
            href="/join"
            className="bg-green-700 text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-green-600 hover:scale-200 transition duration-300 "
          >
            Join Us
          </a>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="max-w-screen-xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-semibold text-green-800 mb-4">
              Our Mission
            </h2>
            <p className="text-lg text-gray-700">
              Our mission is to foster a vibrant community focused on growth,
              learning, and innovation. We aim to empower individuals, provide
              educational resources, and create opportunities for everyone to
              succeed.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-semibold text-green-800 mb-4">
              Our Vision
            </h2>
            <p className="text-lg text-gray-700">
              We envision a world where knowledge, innovation, and collaboration
              come together to create a positive impact on society. Through our
              platform, we strive to inspire the next generation of leaders and
              thinkers.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-white py-12 px-4">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-green-800 mb-6">
            Core Values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="p-6 bg-gray-100 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-green-700 mb-2">
                Innovation
              </h3>
              <p className="text-gray-600">
                We value creativity and forward-thinking, continuously striving
                to innovate and push boundaries.
              </p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-green-700 mb-2">
                Community
              </h3>
              <p className="text-gray-600">
                Collaboration and community-building are at the core of what we
                do. We believe in working together for a common purpose.
              </p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-green-700 mb-2">
                Growth
              </h3>
              <p className="text-gray-600">
                We are committed to continuous personal and professional growth,
                creating opportunities for learning and development.
              </p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-green-700 mb-2">
                Impact
              </h3>
              <p className="text-gray-600">
                We strive to make a meaningful impact on society by encouraging
                responsible actions and sustainable practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-green-900 text-white py-16 px-4">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6">Get Involved</h2>
          <p className="text-lg mb-6">
            Whether you&apos;re looking to contribute your skills or join a
            community of like-minded individuals, there&apos;s a place for you
            here.
          </p>
          <a
            href="/join"
            className="bg-green-700 text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-green-600 transition duration-300"
          >
            Become a Member
          </a>
        </div>
      </section>
    </div>
  );
}
