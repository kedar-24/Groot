import "@/app/globals.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Groot Alumini Page" />
        <meta name="author" content="Your Name" />
        <meta property="og:title" content="G-Root Website" />
        <meta property="og:description" content="Groot Alumini Page" />
        <meta property="og:image" content="/path-to-image.jpg" />
        <title>G-Root Website</title>
      </head>
      <body className="bg-gray-50 text-gray-900 font-sans antialiased">
        {/* Sticky Navbar */}
        <div className="sticky top-0 z-50 bg-white shadow-md transition-all duration-300 ease-in-out">
          <Navbar />
        </div>

        {/* Main Content Section */}
        <main className="min-h-screen pt-16 pb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-screen-xl mx-auto">{children}</div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-8 mt-12">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <Footer />
          </div>
        </footer>
      </body>
    </html>
  );
}
