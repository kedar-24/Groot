export default function JoinMIHUPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-green-800 mb-4">Join MIHU</h1>
        <p className="text-lg text-gray-700 mb-8">
          Become a part of MIHU and help us build a stronger, more supportive
          community. Whether you want to volunteer, seek guidance, or simply
          connect — we welcome you.
        </p>
      </div>

      <form className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md grid gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Role
          </label>
          <select
            name="role"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            required
          >
            <option value="">Select a role</option>
            <option value="volunteer">Volunteer</option>
            <option value="participant">Participant</option>
            <option value="mentor">Mentor</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Message (optional)
          </label>
          <textarea
            name="message"
            rows={4}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>

        <button
          type="submit"
          className="bg-green-700 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-600 transition duration-300"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
}
