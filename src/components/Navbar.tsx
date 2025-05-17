"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";

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
      <div className="bg-green-700 text-white py-1 px-4 shadow-md rounded">
        <span className="font-semibold">Highlights:</span>
      </div>
      <div className="text-xl font-semibold text-gray-800 max-w-xs overflow-hidden">
        <p className="whitespace-nowrap">{newsItems[currentNewsIndex]}</p>
      </div>
      <button 
          onClick={() =>
          setCurrentNewsIndex((prevIndex) => (prevIndex + 1) % newsItems.length)
        }
        className="bg-green-700 text-white py-1 px-3 rounded hover:bg-green-600 transition duration-200 ease-in-out"
      >
        Next
      </button>
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownTimer = useRef<NodeJS.Timeout | null>(null);

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
    <nav className="bg-white shadow-max-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-green-800">
          G-ROOT
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-wrap gap-x-15 gap-y-2 text-sm font-medium text-gray-700 min-w-0">
          <Link
            href="/"
            className="hover:text-green-600 transition duration-200"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="hover:text-green-600 transition duration-200"
          >
            About
          </Link>
          <Link
            href="/achievers"
            className="hover:text-green-600 transition duration-200"
          >
            Alumni
          </Link>
          <Link
            href="/innovationhub"
            className="hover:text-green-600 transition duration-200"
          >
            Innovation Hub
          </Link>
          <Link
            href="/events"
            className="hover:text-green-600 transition duration-200"
          >
            Events
          </Link>

          {/* Multi-level Dropdown for CDS */}
          <div
            className="relative group"
            onMouseEnter={handleDropdownOpen}
            onMouseLeave={handleDropdownClose}
            onFocus={handleDropdownOpen}
            onBlur={handleDropdownClose}
          >
            <Link
              href="/cds"
              className="flex items-center group hover:text-green-600 transition-all duration-200"
              aria-haspopup="true"
              aria-expanded={isDropdownOpen ? "true" : "false"} // Accessibility
            >
              CDS
            </Link>

            {/* Submenu Dropdown */}
            <div
              className={`absolute left-0 mt-2 space-y-2 bg-white shadow-lg rounded-lg group-hover:block group-focus:block transition-all duration-300 ease-in-out ${
                isDropdownOpen ? "block" : "hidden"
              }`}
              aria-labelledby="cds-dropdown" // Link this dropdown to the parent
            >
              <Link
                href="/cds/mihu"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                MIHU
              </Link>
              <div className="relative group">
                <Link
                  href="/cds/recruitment"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Recruitment
                </Link>
              </div>
            </div>
          </div>

          <Link
            href="/gallery"
            className="hover:text-green-600 transition duration-200"
          >
            Gallery
          </Link>
          <Link
            href="/contact"
            className="hover:text-green-600 transition duration-200"
          >
            Contact
          </Link>
          <Link
            href="/login"
            className="flex items-center hover:text-green-600 transition duration-200"
          >
            <FontAwesomeIcon icon={faSignInAlt} className="mr-2 text-lg" />
            Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <span className="flex space-x-5 items-center justify-center">
            <Link
              href="/login"
              className="flex items-center hover:text-green-600 transition duration-200"
            >
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
          className="max-md:hidden px-4 pb-4 space-y-2 text-sm font-medium text-gray-700 flex flex-col items-start"
        >
          <Link
            href="/"
            className="block w-full text-center hover:text-green-600 transition duration-200 px-4 py-2"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="block w-full text-center hover:text-green-600 transition duration-200 px-4 py-2"
          >
            About
          </Link>
          <Link
            href="/achievers"
            className="block w-full text-center hover:text-green-600 transition duration-200 px-4 py-2"
          >
            Alumni
          </Link>
          <Link
            href="/events"
            className="block w-full text-center hover:text-green-600 transition duration-200 px-4 py-2"
          >
            Events
          </Link>
          <Link
            href="/cds"
            className="block w-full text-center hover:text-green-600 transition duration-200 px-4 py-2"
          >
            CDS
          </Link>
          <Link
            href="/gallery"
            className="block w-full text-center hover:text-green-600 transition duration-200 px-4 py-2"
          >
            Gallery
          </Link>
          <Link
            href="/contact"
            className="block w-full text-center hover:text-green-600 transition duration-200 px-4 py-2"
          >
            Contact
          </Link>
        </div>
      )}

      {/* News Ticker */}
      <NewsTicker />
    </nav>
  );
};

export default Navbar;
