"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import React from "react";
import Button from "./button";
import NavLink from "./NavLink";
import UniversalDropdown from "./UniversalDropdown";
import Image from "next/image";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  // { href: "/about", label: "About" },
  { href: "/achievers", label: "Achievers" },
  // { href: "/innovationhub", label: "Innovation Hub" },
  // { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  // { href: "/contact", label: "Contact" },
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

    return () => clearInterval(intervalId);
  }, [newsItems.length]);

  return (
    <div className="w-full flex items-center py-2 justify-between px-4 bg-gray-200">
      <span className="inline-flex items-center justify-center rounded-lg font-semibold transition-colors duration-200 focus:outline-none px-3 py-2 text-base bg-green-700 text-white hover:bg-green-800 focus:ring-2 focus:ring-green-400">
        Highlights:
      </span>
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

  const handleDropdownOpen = () => {
    if (dropdownTimer.current) clearTimeout(dropdownTimer.current);
    setIsDropdownOpen(true);
  };

  const handleDropdownClose = () => {
    dropdownTimer.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 200);
  };

  return (
    <nav className="bg-white shadow sticky top-0 z-50 w-full">
      <div className="px-4 py-3 flex justify-between items-center max-w-8xl mx-auto">
        <Link
          href="/"
          className="text-2xl font-bold text-green-800 hover:text-green-900 transition"
        >
          G-ROOT
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-x-4 text-base font-medium text-gray-700">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.href} href={link.href}>
              {link.label}
            </NavLink>
          ))}
          <UniversalDropdown
            label={
              <Link
                href="/cds"
                className="flex items-center px-3 py-1 rounded hover:text-green-700 focus:text-green-700 focus:bg-gray-100 transition"
                tabIndex={-1}
              >
                CDS
              </Link>
            }
            menuOptions={CDS_DROPDOWN}
            isOpen={isDropdownOpen}
            onOpen={handleDropdownOpen}
            onClose={handleDropdownClose}
          />
          <NavLink href="/login" className="flex items-center ml-2">
            <span className="w-10 h-10 rounded-full bg-[#0b8c0799] flex items-center justify-center mr-2">
              <Image
                src="/images/user-logo.png"
                alt="User Logo"
                width={32}
                height={32}
                className="rounded-full"
              />
            </span>
            Login
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <span className="flex items-center space-x-3">
            <Link href="/login" className="flex items-center">
              <span className="w-8 h-8 rounded-full bg-[#0b8c0799] flex items-center justify-center mr-2">
                <Image
                  src="/images/user-logo.png"
                  alt="User Logo"
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              </span>
              Login
            </Link>
            <button
              onClick={() => setIsOpen((v) => !v)}
              className="text-black hover:text-green-600 transition"
              aria-expanded={isOpen ? "true" : "false"}
              aria-controls="mobile-menu"
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
          </span>
        </div>
      </div>

      {/* Mobile Navigation with transition */}
      <div
        id="mobile-menu"
        className={`md:hidden px-4 pb-4 flex flex-col items-start bg-white transition-all duration-300 ease-in-out ${
          isOpen
            ? "max-h-[400px] opacity-100 pointer-events-auto"
            : "max-h-0 opacity-0 pointer-events-none"
        } overflow-hidden space-y-2 text-base font-medium text-gray-700`}
      >
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="block w-full text-center py-2"
          >
            {link.label}
          </Link>
        ))}
        <Link href="/cds" className="block w-full text-center py-2">
          CDS
        </Link>
      </div>

      {/* News Ticker */}
      <NewsTicker />
    </nav>
  );
};

export default Navbar;
