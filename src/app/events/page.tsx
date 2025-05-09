"use client";

export default function EventsPage() {
  const events = [
    {
      title: "Green Hackathon",
      date: "June 2025",
      description:
        "A hackathon focused on building solutions for a greener planet.",
      location: "Online",
    },
    {
      title: "GROOT Summit",
      date: "July 2025",
      description:
        "An exclusive summit for thought leaders and innovators in tech.",
      location: "San Francisco, CA",
    },
    {
      title: "Art for Earth",
      date: "August 2025",
      description:
        "An art exhibition to raise awareness for environmental conservation.",
      location: "New York, NY",
    },
  ];

  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-green-900 mb-4">
          Upcoming Events
        </h1>
        <p className="text-lg text-gray-700">
          Join us for inspiring events that drive change, innovation, and
          community action!
        </p>
      </section>

      {/* Events List */}
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
          >
            <h3 className="text-2xl font-semibold text-green-800 mb-2">
              {event.title}
            </h3>
            <p className="text-sm text-gray-500 mb-4">{event.date}</p>
            <p className="text-gray-700 mb-4">{event.description}</p>
            <p className="text-sm text-gray-600">Location: {event.location}</p>
            <button
              className="mt-4 w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300"
              onClick={() => alert(`Register for ${event.title}`)} // Placeholder for registration action
            >
              Register Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
