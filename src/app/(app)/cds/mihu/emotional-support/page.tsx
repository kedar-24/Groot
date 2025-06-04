export default function EmotionalSupportPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-green-800 mb-4">
          Emotional Support
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          MIHU offers a safe, confidential space to talk, share, and heal.
          Whether you&apos;re dealing with stress, anxiety, or just need someone
          to listen — we&apos;re here for you.
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-green-700 mb-2">
            One-on-One Sessions
          </h3>
          <p className="text-gray-600">
            Schedule private sessions with trained volunteers who can lend a
            listening ear and guide you to professional resources if needed.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-green-700 mb-2">
            Confidentiality First
          </h3>
          <p className="text-gray-600">
            Every conversation remains private and judgment-free. Your mental
            well-being is our top priority.
          </p>
        </div>
      </div>
    </div>
  );
}
