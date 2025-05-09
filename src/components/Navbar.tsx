"use client";

import { useState } from "react";
import Link from "next/link";

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
          {/* <Link href="/cds">CDS</Link> */}
          <div className="relative group">
            <Link href="/cds" className="flex items-center">
              CDS <span className="ml-2"></span>
            </Link>
            <div className="absolute left-0 hidden mt-2 space-y-2 bg-white shadow-lg group-hover:block">
              <Link
                href="/cds/mihu"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                MIHU
              </Link>
              <Link
                href="/cds/recruitment"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
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
        <div className="md:hidden px-4 pb-4 space-y-2 text-sm">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/achievers">Alumni</Link>
          <Link href="/events">Events</Link>
          <Link href="/cds">CDS</Link>
          <Link href="/gallery">Gallery</Link>
          <Link href="/contact">Contact</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
