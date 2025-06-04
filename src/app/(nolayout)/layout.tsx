import "@/styles/globals.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="fixed top-4 left-4 z-50 group">
          <Link
            href="/"
            className="bg-white border border-green-200 rounded-full p-3 shadow hover:bg-green-100 transition-colors flex items-center justify-center"
            title="Go back to Home"
            aria-label="Go back to Home"
          >
            <FontAwesomeIcon icon={faHome} className="text-green-700 w-6 h-6" />
            <span className="sr-only">Go back to Home</span>
          </Link>
          {/* Tooltip appears only on hover */}
          <div className="absolute left-14 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 bg-white border border-green-200 text-green-800 font-semibold text-sm rounded-lg px-4 py-2 shadow transition-opacity pointer-events-none whitespace-nowrap flex items-center gap-2">
            <span>Go back to Home</span>
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
