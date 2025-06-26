import Link from "next/link";
import React from "react";

interface MobileNavbarProps {
  user: { id: string; name?: string; email?: string } | null;
  accountDropdown?: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  mobileLinks: { href: string; label: string }[];
}

export default function MobileNavbar({
  user,
  accountDropdown,
  isOpen,
  setIsOpen,
  mobileLinks,
}: MobileNavbarProps) {
  return (
    <div className="md:hidden">
      {/* Top bar with icons */}
      <div className="flex items-center space-x-3 py-2 px-4 bg-white border-b border-gray-100">
        {/* Account dropdown if logged in */}
        {user && accountDropdown}
        {/* Login icon if not logged in */}
        {!user && (
          <Link
            href="/auth/login"
            className="flex items-center"
            aria-label="Login"
          >
            <span className="w-10 h-10 rounded-full bg-[var(--color-primary)] flex items-center justify-center mr-1">
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="8" r="4" fill="#f5efe0" />
                <path
                  d="M4 20c0-2.21 3.58-4 8-4s8 1.79 8 4"
                  stroke="#f5efe0"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </Link>
        )}
        {/* Hamburger menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-black hover:text-[var(--color-primary)] transition"
          aria-expanded={isOpen ? "true" : "false"}
          aria-controls="mobile-menu"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <rect y="4" width="20" height="2" rx="1" />
            <rect y="9" width="20" height="2" rx="1" />
            <rect y="14" width="20" height="2" rx="1" />
          </svg>
        </button>
      </div>
      {/* Dropdown menu */}
      <div
        id="mobile-menu"
        className={`px-4 pb-4 flex flex-col items-start bg-white transition-all duration-300 ease-in-out ${
          isOpen
            ? "max-h-[400px] opacity-100 pointer-events-auto"
            : "max-h-0 opacity-0 pointer-events-none"
        } overflow-hidden space-y-2 text-base font-medium text-gray-700 font-sans`}
      >
        {mobileLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="block w-full text-center py-2 hover:text-[var(--color-primary)] transition"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
