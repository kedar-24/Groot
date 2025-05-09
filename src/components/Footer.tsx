export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h4 className="font-semibold mb-2">Site</h4>
          <ul className="space-y-1 text-sm text-gray-300">
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
            <li>Accessibility</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Policies</h4>
          <ul className="space-y-1 text-sm text-gray-300">
            <li>Terms</li>
            <li>Privacy</li>
            <li>Shipping</li>
            <li>Refund</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Explore</h4>
          <ul className="space-y-1 text-sm text-gray-300">
            <li>Innovation</li>
            <li>Gadgets</li>
            <li>App Reviews</li>
            <li>Advertise</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Subscribe</h4>
          <form className="space-y-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 rounded text-black bg-gray-200"
            />
            <button className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
}
