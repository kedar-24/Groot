import Link from "next/link";
import Input from "./Input";
import Button from "./button";

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
                <Link
                  href="/"
                  className="hover:text-green-500 transition duration-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-green-500 transition duration-200"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-green-500 transition duration-200"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/accessibility"
                  className="hover:text-green-500 transition duration-200"
                >
                  Accessibility
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies Section */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Policies</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link
                  href="/terms"
                  className="hover:text-green-500 transition duration-200"
                >
                  Terms
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-green-500 transition duration-200"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="hover:text-green-500 transition duration-200"
                >
                  Shipping
                </Link>
              </li>
              <li>
                <Link
                  href="/refund"
                  className="hover:text-green-500 transition duration-200"
                >
                  Refund
                </Link>
              </li>
            </ul>
          </div>

          {/* Explore Section */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Explore</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link
                  href="/innovation"
                  className="hover:text-green-500 transition duration-200"
                >
                  Innovation
                </Link>
              </li>
              <li>
                <Link
                  href="/gadgets"
                  className="hover:text-green-500 transition duration-200"
                >
                  Gadgets
                </Link>
              </li>
              <li>
                <Link
                  href="/app-reviews"
                  className="hover:text-green-500 transition duration-200"
                >
                  App Reviews
                </Link>
              </li>
              <li>
                <Link
                  href="/advertise"
                  className="hover:text-green-500 transition duration-200"
                >
                  Advertise
                </Link>
              </li>
            </ul>
          </div>

          {/* Subscribe Section */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Subscribe</h4>
            <form className="space-y-4">
              <Input
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 rounded-lg text-black bg-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
              <Button
                type="submit"
                variant="primary"
                className="w-full p-3 bg-green-800 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
              >
                Subscribe
              </Button>
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
