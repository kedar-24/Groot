"use client";
import { useState, useEffect, useRef } from "react";
import "@/styles/globals.css";
import Link from "next/link";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import Button from "./button";
import NavLink from "./NavLink";
import { useRouter } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/achievers", label: "Alumni" },
  { href: "/innovationhub", label: "Innovation Hub" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

const CDS_DROPDOWN = [
  { href: "/cds/mihu", label: "MIHU" },
  { href: "/cds/recruitment", label: "Recruitment" },
];

const NewsTicker = () => {
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  const newsItems = [
    "Job market NEWS",
    "Latest tech updates",
    "Local event highlights",
    "Upcoming educational workshops",
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentNewsIndex((prevIndex) => (prevIndex + 1) % newsItems.length);
    }, 5000);

    return () => clearInterval(intervalId); // Clear the interval on component unmount
  }, []);

  return (
    <div className="w-full flex items-center py-2 justify-between px-4 bg-gray-200">
      <span className="btn btn-primary font-semibold">Highlights:</span>
      <div className="text-xl font-semibold text-gray-800 max-w-xs overflow-hidden">
        <p className="whitespace-nowrap">{newsItems[currentNewsIndex]}</p>
      </div>
      <Button
        variant="primary"
        onClick={() =>
          setCurrentNewsIndex((prevIndex) => (prevIndex + 1) % newsItems.length)
        }
      >
        Next
      </Button>
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownTimer = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  const handleDropdownOpen = () => {
    if (dropdownTimer.current) clearTimeout(dropdownTimer.current);
    setIsDropdownOpen(true);
  };

  const handleDropdownClose = () => {
    dropdownTimer.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 200); // 200ms delay
  };

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold text-green-800 px-0 py-0 hover:text-green-800 focus:text-green-800"
        >
          G-ROOT
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-x-6 text-base font-medium text-gray-700 min-w-0">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.href} href={link.href}>
              {link.label}
            </NavLink>
          ))}

          {/* CDS Dropdown */}
          <div
            className="relative"
            onMouseEnter={handleDropdownOpen}
            onMouseLeave={handleDropdownClose}
          >
            <Link
              href="/cds"
              className={`nav-link flex items-center px-4 py-2 rounded transition-colors duration-200 ${
                isDropdownOpen ? "bg-green-50 text-green-700" : ""
              }`}
              tabIndex={0}
              aria-haspopup="true"
              aria-expanded={isDropdownOpen ? "true" : "false"}
              onClick={() => {
                setIsDropdownOpen(false); // Optional: close dropdown on click
                router.push("/cds"); // Ensures navigation
              }}
            >
              CDS
              <svg
                className={`ml-1 w-4 h-4 transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
            <div
              className={`navbar-dropdown absolute left-0 mt-2 min-w-[180px] bg-white shadow-lg rounded-lg z-20 py-2 transition-all duration-200 ${
                isDropdownOpen ? "block" : "hidden"
              }`}
            >
              {CDS_DROPDOWN.map((opt) => (
                <Link
                  key={opt.href}
                  href={opt.href}
                  className="navbar-dropdown-link"
                >
                  {opt.label}
                </Link>
              ))}
            </div>
          </div>

          <NavLink href="/login" className="flex items-center ml-2">
            <FontAwesomeIcon icon={faSignInAlt} className="mr-2 text-lg" />
            Login
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <span className="flex space-x-5 items-center justify-center">
            <Link href="/login" className="flex items-center">
              <FontAwesomeIcon icon={faSignInAlt} className="mr-2 text-lg" />
              Login
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-green-800 hover:text-green-600 transition duration-200"
              aria-expanded={isOpen ? "true" : "false"} // Dynamic state change
              aria-controls="mobile-menu" // Optional: Link to the mobile menu element for better context
            >
              ☰
            </button>
          </span>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="md:hidden px-4 pb-4 space-y-2 text-base font-medium text-gray-700 flex flex-col items-start"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block w-full text-center"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/cds" className="block w-full text-center">
            CDS
          </Link>
        </div>
      )}

      {/* News Ticker */}
      <NewsTicker />
    </nav>
  );
};

export default Navbar;
