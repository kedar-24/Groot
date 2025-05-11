export default function AchieversPage() {
  const achievers = [
    {
      name: "John Doe",
      title: "Innovator",
      description:
        "A pioneer in the tech industry with groundbreaking innovations in AI.",
      imageUrl: "/images/achiever1.jpg",
    },
    {
      name: "Jane Smith",
      title: "Changemaker",
      description:
        "Leading social impact initiatives that have transformed communities.",
      imageUrl: "/images/achiever2.jpg",
    },
    {
      name: "Alice Johnson",
      title: "Top Contributor",
      description:
        "Contributed over 100 hours to community service and volunteer work.",
      imageUrl: "/images/achiever3.jpg",
    },
    // Add more achievers here
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-green-900 text-white py-16 px-4">
        <div className="max-w-screen-xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Our Achievers</h1>
          <p className="text-lg mb-6">
            Celebrating the excellence of our top contributors, innovators, and
            changemakers!
          </p>
          <a
            href="#nominate"
            className="bg-green-700 text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-green-600 transition duration-300"
          >
            Nominate an Achiever
          </a>
        </div>
      </section>

      {/* Achievers List */}
      <section className="max-w-screen-xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievers.map((achiever, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
            >
              <img
                src={achiever.imageUrl}
                alt={achiever.name}
                className="w-full h-48 object-cover rounded-t-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-green-800">
                {achiever.name}
              </h3>
              <p className="text-sm text-gray-500">{achiever.title}</p>
              <p className="text-gray-700 mt-2">{achiever.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Nominations Section */}
      <section id="nominate" className="bg-white py-12 px-4">
        <div className="max-w-screen-xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-green-800 mb-6">
            Nominate an Achiever
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Know someone who deserves to be recognized? Nominate them now!
          </p>
          <a
            href="/nominate"
            className="bg-green-700 text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-green-600 transition duration-300"
          >
            Nominate Now
          </a>
        </div>
      </section>
    </div>
  );
}
