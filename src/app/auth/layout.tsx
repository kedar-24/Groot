"use client";
import { usePathname } from "next/navigation";
import Card from "@/components/Card";
import StripsBackground from "@/components/StripsBackground";
import { loginStrips } from "@/components/stripsPresets";
import { useEffect, useState, useRef } from "react";

// Helper to get cards in a consistent structure
const CARD_CONFIG = {
  "/auth/login": {
    strips: loginStrips,
    topCards: [
      {
        variant: "auth" as const,
        title: "Secure",
        description: "Your data is protected with industry standards.",
        bgImage: "/images/login.jpg",
        overlayClass:
          "bg-gradient-to-t from-green-700/30 via-green-100/10 to-transparent",
      },
      {
        variant: "auth" as const,
        title: "Fast Access",
        description: "Quick login and easy navigation.",
        bgImage: "/images/login.jpg",
        overlayClass:
          "bg-gradient-to-t from-green-700/30 via-green-100/10 to-transparent",
      },
    ],
    bottomCard: {
      variant: "auth" as const,
      title: "Welcome to G-Root",
      description:
        "Stay connected, join groups, and get the latest updates from your community.",
      bgImage: "/images/login.jpg",
      overlayClass:
        "bg-gradient-to-t from-green-700/30 via-green-100/10 to-transparent",
    },
  },
  "/auth/signup": {
    strips: loginStrips,
    topCards: [
      {
        variant: "auth" as const,
        title: "Verified Members",
        description: "All users are verified for a safe experience.",
        bgImage: "/images/signup.svg",
        overlayClass:
          "bg-gradient-to-t from-green-700/40 via-green-100/10 to-transparent",
      },
      {
        variant: "auth" as const,
        title: "Easy Setup",
        description: "Sign up in seconds and start connecting.",
        bgImage: "/images/signup.svg",
        overlayClass:
          "bg-gradient-to-t from-green-700/40 via-green-100/10 to-transparent",
      },
    ],
    bottomCard: {
      variant: "auth" as const,
      title: "Join the Community",
      description: "Connect with alumni, join groups, and grow your network.",
      bgImage: "/images/signup.svg",
      overlayClass:
        "bg-gradient-to-t from-green-700/50 via-green-100/10 to-transparent",
    },
  },
  "/auth/forgot-password": {
    strips: loginStrips,
    topCards: [
      {
        variant: "auth" as const,
        title: "Reset Access",
        description: "Easily reset your password securely.",
        bgImage: "/images/forgot.jpg",
        overlayClass:
          "bg-gradient-to-t from-green-700/30 via-green-100/10 to-transparent",
      },
      {
        variant: "auth" as const,
        title: "Support",
        description: "We're here to help you recover your account.",
        bgImage: "/images/forgot.jpg",
        overlayClass:
          "bg-gradient-to-t from-green-700/30 via-green-100/10 to-transparent",
      },
    ],
    bottomCard: {
      variant: "auth" as const,
      title: "Forgot Password?",
      description: "Enter your email and we'll send you a reset link.",
      bgImage: "/images/forgot.jpg",
      overlayClass:
        "bg-gradient-to-t from-green-700/40 via-green-100/10 to-transparent",
    },
  },
};

function getAuthConfig(pathname: string) {
  return (
    CARD_CONFIG[pathname as keyof typeof CARD_CONFIG] ||
    CARD_CONFIG["/auth/login"]
  );
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const config = getAuthConfig(pathname);

  // Track if component is mounted on client
  const [mounted, setMounted] = useState(false);
  const [showStrips, setShowStrips] = useState(false);
  const hasAnimated = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  return (
    <div className="min-h-screen w-full flex items-stretch font-sans relative bg-gradient-to-br from-green-50 via-white to-green-100">
      {/* Animated Strips */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {mounted && (
          <div
            className={`transition-all duration-800 ease-[cubic-bezier(.77,0,.18,1.01)] ${
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
            <StripsBackground
              bgAndStripsIn={showStrips}
              strips={config.strips}
            />
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-1">
        {/* Left: Form Area */}
        <div className="flex-1 flex flex-col justify-center items-center px-6 py-10">
          <div className="w-full flex flex-col items-center">{children}</div>
        </div>

        {/* Right: Cards */}
        <div className="w-3/5 hidden md:flex flex-col justify-between items-stretch px-6 py-10 z-10">
          {/* Top: Two Cards */}
          <div className="flex gap-2 w-full" style={{ flex: "0 0 30%" }}>
            {config.topCards.map((card) => (
              <Card
                key={card.title}
                {...card}
                className="flex-2 h-full min-h-[200px] max-h-[240px]"
              />
            ))}
          </div>
          {/* Bottom: One Big Card */}
          <div className="flex-1 flex items-end w-full mt-2">
            <Card
              {...config.bottomCard}
              className="w-full h-full min-h-[220px] md:min-h-[280px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
