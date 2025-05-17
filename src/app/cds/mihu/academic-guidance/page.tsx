export default function AcademicGuidancePage() {
  return (
    <div className="bg-gray-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-green-800 mb-4">
          Academic Guidance
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Get help with coursework, exam stress, and long-term academic
          planning. MIHU provides personalized guidance to help you thrive.
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-green-700 mb-2">
            Study Help
          </h3>
          <p className="text-gray-600">
            Peer-led tutoring and academic workshops tailored to your learning
            style and pace.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-green-700 mb-2">
            Exam Strategy
          </h3>
          <p className="text-gray-600">
            Learn how to manage exam pressure and build effective revision
            routines.
          </p>
        </div>
      </div>
    </div>
  );
}
