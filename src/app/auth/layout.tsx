"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import StripsBackground from "@/components/StripsBackground";
import { loginStrips } from "@/components/stripsPresets";
import Button from "@/components/button";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [showStrips, setShowStrips] = useState(false);
  const hasAnimated = useRef(false);

  // Set mounted to true after component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  // Animation handling for strips
  useEffect(() => {
    if (!mounted) return;
    if (!hasAnimated.current) {
      setShowStrips(false);
      const timeout = setTimeout(() => {
        setShowStrips(true);
        hasAnimated.current = true;
      }, 120);
      return () => clearTimeout(timeout);
    } else {
      setShowStrips(true);
    }
  }, [pathname, mounted]);

  // Prevent scrolling on this page
  useEffect(() => {
    // Disable scroll
    document.body.style.overflow = "hidden";

    // Cleanup: Re-enable scroll when component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="h-screen w-full flex flex-col relative overflow-hidden bg-[url(/images/BG.svg)] bg-contain bg-center bg-repeat">
      {/* Top Navigation Bar */}
      <header className="relative z-30 p-6 flex-shrink-0">
        <nav className="flex items-center justify-between max-w-7xl mx-auto">
          <Button variant="home" as="a" href="/" />
          <div className="text-sm font-montserrat text-black/70">
            Secure Authentication
          </div>
        </nav>
      </header>

      {/* Animated Strips Background */}
      {mounted && (
        <div
          className={`absolute inset-0 z-0 pointer-events-none overflow-hidden transition-all duration-800 ease-[cubic-bezier(.77,0,.18,1.01)] ${
            showStrips
              ? "opacity-100 translate-x-0 blur-0 scale-100"
              : "opacity-0 -translate-x-12 blur-sm scale-105"
          }`}
          style={{
            willChange: "opacity, transform, filter",
            height: "100%",
            width: "100%",
          }}
        >
          <StripsBackground bgAndStrips={showStrips} strips={loginStrips} />
        </div>
      )}

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-2 overflow-y-auto">
        {children}
      </main>

      {/* Bottom Footer */}
      <footer className="relative z-10 p-4 flex-shrink-0">
        <div className="text-center">
          <p className="text-xs font-montserrat text-[var(--color-primary-dark)]/50">
            © 2024 GROOT Alumni Network - Secure & Trusted
          </p>
        </div>
      </footer>
    </div>
  );
}
