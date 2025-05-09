export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-20">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Site Section */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Site</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a
                  href="/"
                  className="hover:text-green-500 transition duration-200"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="hover:text-green-500 transition duration-200"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-green-500 transition duration-200"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="/accessibility"
                  className="hover:text-green-500 transition duration-200"
                >
                  Accessibility
                </a>
              </li>
            </ul>
          </div>

          {/* Policies Section */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Policies</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a
                  href="/terms"
                  className="hover:text-green-500 transition duration-200"
                >
                  Terms
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="hover:text-green-500 transition duration-200"
                >
                  Privacy
                </a>
              </li>
              <li>
                <a
                  href="/shipping"
                  className="hover:text-green-500 transition duration-200"
                >
                  Shipping
                </a>
              </li>
              <li>
                <a
                  href="/refund"
                  className="hover:text-green-500 transition duration-200"
                >
                  Refund
                </a>
              </li>
            </ul>
          </div>

          {/* Explore Section */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Explore</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a
                  href="/innovation"
                  className="hover:text-green-500 transition duration-200"
                >
                  Innovation
                </a>
              </li>
              <li>
                <a
                  href="/gadgets"
                  className="hover:text-green-500 transition duration-200"
                >
                  Gadgets
                </a>
              </li>
              <li>
                <a
                  href="/app-reviews"
                  className="hover:text-green-500 transition duration-200"
                >
                  App Reviews
                </a>
              </li>
              <li>
                <a
                  href="/advertise"
                  className="hover:text-green-500 transition duration-200"
                >
                  Advertise
                </a>
              </li>
            </ul>
          </div>

          {/* Subscribe Section */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Subscribe</h4>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 rounded-lg text-black bg-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
              <button
                type="submit"
                className="w-full p-3 bg-green-800 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Your Company. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
