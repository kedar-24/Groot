export default function InnovationHubPage() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-green-900 text-white py-16 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Innovation Hub</h1>
        <p className="text-lg mb-6">
          Where creativity meets purpose. Explore our latest projects and ideas.
        </p>
        <a
          href="#projects"
          className="bg-green-700 text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-green-600 transition duration-300"
        >
          Explore Projects
        </a>
      </section>

      {/* Innovation Projects Section */}
      <section id="projects" className="max-w-screen-xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-semibold text-green-800 mb-6 text-center">
          Our Latest Projects
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Example Project Cards */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
            <h3 className="text-2xl font-semibold text-green-800 mb-4">
              Project Title
            </h3>
            <p className="text-lg text-gray-700 mb-4">
              A brief description of the project goes here. It&apos;s designed
              to showcase the purpose, technology used, and the impact.
            </p>
            <a
              href="#"
              className="text-green-700 font-semibold hover:text-green-600 transition duration-200"
            >
              Learn More
            </a>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
            <h3 className="text-2xl font-semibold text-green-800 mb-4">
              Project Title
            </h3>
            <p className="text-lg text-gray-700 mb-4">
              A brief description of the project goes here. It&apos;s designed
              to showcase the purpose, technology used, and the impact.
            </p>
            <a
              href="#"
              className="text-green-700 font-semibold hover:text-green-600 transition duration-200"
            >
              Learn More
            </a>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
            <h3 className="text-2xl font-semibold text-green-800 mb-4">
              Project Title
            </h3>
            <p className="text-lg text-gray-700 mb-4">
              A brief description of the project goes here. It&apos;s designed
              to showcase the purpose, technology used, and the impact.
            </p>
            <a
              href="#"
              className="text-green-700 font-semibold hover:text-green-600 transition duration-200"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Get Involved Section */}
      <section className="bg-white py-12 px-4 text-center">
        <h2 className="text-3xl font-semibold text-green-800 mb-6">
          Get Involved in Innovation
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          Join us in making a difference through innovative ideas and creative
          solutions. Whether you want to collaborate or contribute, we have
          opportunities for you.
        </p>
        <a
          href="/join"
          className="bg-green-700 text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-green-600 transition duration-300"
        >
          Join the Innovation Hub
        </a>
      </section>
    </div>
  );
}
