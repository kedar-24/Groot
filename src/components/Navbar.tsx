"use client";

import { useState } from "react";
import Link from "next/link";

import React, { useEffect } from "react";

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
    <div className="w-full flex items-center py-2 flex items-center justify-between px-4 bg-gray-200">
      <div className="bg-green-700 text-white py-1 px-4 shadow-md">
        <span className="font-semibold">Highlights:</span>
      </div>
      <div className="text-xl font-semibold text-gray-800/60 max-w-xs">
        {newsItems[currentNewsIndex]}
      </div>
      <button
        onClick={() =>
          setCurrentNewsIndex((prevIndex) => (prevIndex + 1) % newsItems.length)
        }
        className="bg-green-700 text-white py-1 px-3 hover:bg-green-600 transition duration-200 ease-in-out"
      >
        Next
      </button>
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-2xl font-bold text-green-800">G-ROOT</div>
        <div className="hidden md:flex space-x-6 text-sm font-medium text-gray-700">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/achievers">Alumni</Link>
          <Link href="/events">Events</Link>
          <div className="relative group">
            <Link href="/cds" className=" rounded flex items-center">
              CDS <span className="rounded ml-2"></span>
            </Link>
            <div className="absolute left-0 hidden mt-2 space-y-2 bg-white shadow-lg group-hover:block  group-focus:block transition-all duration-200 ease-in-ou">
              <Link
                href="/cds/mihu"
                className="block rounded px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                MIHU
              </Link>
              <Link
                href="/cds/recruitment"
                className="block rounded px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Recruitment
              </Link>
            </div>
          </div>
          <Link href="/gallery">Gallery</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>☰</button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 text-sm font-medium text-gray-700 flex flex-col items-start">
          <Link href="/" className="block">
            Home
          </Link>
          <Link href="/about" className="block">
            About
          </Link>
          <Link href="/achievers" className="block">
            Alumni
          </Link>
          <Link href="/events" className="block">
            Events
          </Link>
          <Link href="/cds" className="block">
            CDS
          </Link>
          <Link href="/gallery" className="block">
            Gallery
          </Link>
          <Link href="/contact" className="block">
            Contact
          </Link>
        </div>
      )}
      <div>
        <NewsTicker />
      </div>
    </nav>
  );
};

export default Navbar;
