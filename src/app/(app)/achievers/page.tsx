import Image from "next/image";
import Card from "@/components/Card";
import Button from "@/components/button";

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
  // Add more achievers as needed
];

function AchieverCard({
  name,
  title,
  description,
  imageUrl,
}: (typeof achievers)[0]) {
  return (
    <Card variant="value" title={name} className="h-full">
      <div className="flex flex-col items-center">
        <div className="relative w-28 h-28 mb-3 rounded-full overflow-hidden border-4 border-green-100 shadow">
          <Image src={imageUrl} alt={name} fill className="object-cover" />
        </div>
        <p className="text-green-700 font-semibold">{title}</p>
        <p className="mt-2 text-gray-700 text-sm text-center">{description}</p>
      </div>
    </Card>
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
          <Button
            as="a"
            href="#nominate"
            variant="secondary"
            className="bg-white text-green-800 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-100 transition"
          >
            Nominate an Achiever
          </Button>
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
          <Button
            as="a"
            href="/achievers/nominate"
            variant="primary"
            className="bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-md hover:bg-green-600 transition"
          >
            Nominate Now
          </Button>
        </div>
      </section>
    </div>
  );
}
