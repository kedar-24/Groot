import "@flaticon/flaticon-uicons/css/all/all.css";
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* The Navbar will float over the content */}
      <Navbar />

      {/* The main content area now starts at the top of the viewport */}
      <main className="flex-1 flex flex-col w-full">{children}</main>
    </div>
  );
}
