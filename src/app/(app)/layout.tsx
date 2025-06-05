"use client";

import { useEffect, useState } from "react";
import "@/styles/globals.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen w-full">
        {/* Navbar */}
        <header
          className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ease-in-out ${
            scrolled ? "shadow-lg" : "shadow-md"
          }`}
        >
          <Navbar />
        </header>

        {/* Main content */}
        <main className="flex-grow flex flex-col pb-12 mx-auto w-full pt-[136px]">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-2 w-full">
          <div className="px-4 md:px-8 w-full">
            <Footer />
          </div>
        </footer>
      </body>
    </html>
  );
}
