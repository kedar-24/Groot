"use client";
import "@flaticon/flaticon-uicons/css/all/all.css";
import "@/styles/globals.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

/**
 * RootLayout - Full-width, no background, content stretches edge-to-edge.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col w-full">{children}</main>

      {/* Footer */}
      <footer className="w-full">
        <Footer />
      </footer>
    </div>
  );
}
