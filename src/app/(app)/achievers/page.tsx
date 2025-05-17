import Image from "next/image";

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
  // You can add more achievers to this array
];

function AchieverCard({
  name,
  title,
  description,
  imageUrl,
}: (typeof achievers)[0]) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">
      <div className="relative w-full h-52">
        <Image
          src={imageUrl}
          alt={name}
          layout="fill"
          objectFit="cover"
          className="rounded-t-2xl"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-green-800">{name}</h3>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="mt-3 text-gray-700 text-sm">{description}</p>
      </div>
    </div>
  );
}

export default function AchieversPage() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-green-900 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 tracking-tight">
            Our Achievers
          </h1>
          <p className="text-lg sm:text-xl mb-6 max-w-2xl mx-auto">
            Celebrating excellence and impact by our alumni and contributors.
          </p>
          <a
            href="#nominate"
            className="inline-block bg-white text-green-800 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition"
          >
            Nominate an Achiever
          </a>
        </div>
      </section>

      {/* Achievers List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {achievers.map((achiever, index) => (
            <AchieverCard key={index} {...achiever} />
          ))}
        </div>
      </section>

      {/* Nomination Section */}
      <section
        id="nominate"
        className="bg-white border-t border-gray-200 py-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-green-800 mb-4">
            Nominate an Achiever
          </h2>
          <p className="text-lg text-gray-700 mb-6 max-w-xl mx-auto">
            Know someone who deserves recognition for their outstanding
            contributions? Submit a nomination and help us highlight their
            impact.
          </p>
          <a
            href="/achievers/nominate"
            className="inline-block bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-md hover:bg-green-600 transition"
          >
            Nominate Now
          </a>
        </div>
      </section>
    </div>
  );
}
