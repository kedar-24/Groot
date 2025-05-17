export default function MentorshipPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-green-800 mb-4">Mentorship</h1>
        <p className="text-lg text-gray-700 mb-8">
          MIHU connects you with experienced mentors who can support your
          personal, academic, and professional growth.
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-green-700 mb-2">
            Find a Mentor
          </h3>
          <p className="text-gray-600">
            Get paired with a senior student or alumni mentor based on your
            goals, field of interest, or background.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-green-700 mb-2">
            Become a Mentor
          </h3>
          <p className="text-gray-600">
            Share your experiences and help others grow. Join our mentorship
            team and make a difference.
          </p>
        </div>
      </div>
    </div>
  );
}
