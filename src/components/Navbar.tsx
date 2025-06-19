"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Button from "./button";
import MobileNavbar from "./MobileNavbar";
import { getAccountMenuOptions } from "./AccountMenu";
import UniversalDropdown from "./UniversalDropdown";
import useCurrentUser from "@/hooks/useCurrentUser";
import DesktopNavLinks from "./DesktopNavLinks";
import MobileNavIcons from "./MobileNavIcons";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/achievers", label: "Achievers" },
  { href: "/gallery", label: "Gallery" },
  { href: "/groups", label: "Groups" },
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
    <div className="w-full flex items-center py-2 justify-between px-4 bg-[#182618]">
      <span className="inline-flex items-center justify-center rounded-lg font-semibold transition-colors duration-200 focus:outline-none px-3 py-2 text-base bg-green-700 text-white hover:bg-green-800 focus:ring-2 focus:ring-green-400">
        Highlights:
      </span>
      <div className="text-xl font-semibold text-gray-100 max-w-xs overflow-hidden">
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
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const dropdownTimer = useRef<NodeJS.Timeout | null>(null);
  const { data: user } = useCurrentUser();
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY <= 0) {
        setShowNavbar(true);
      } else if (currentScrollY > lastScrollY) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleDropdownOpen = () => {
    if (dropdownTimer.current) clearTimeout(dropdownTimer.current);
    setIsDropdownOpen(true);
  };

  const handleDropdownClose = () => {
    dropdownTimer.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 200);
  };

  // Account dropdown handlers
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const accountDropdownTimer = useRef<NodeJS.Timeout | null>(null);

  const handleAccountDropdownOpen = () => {
    if (accountDropdownTimer.current)
      clearTimeout(accountDropdownTimer.current);
    setIsAccountDropdownOpen(true);
  };
  const handleAccountDropdownClose = () => {
    accountDropdownTimer.current = setTimeout(() => {
      setIsAccountDropdownOpen(false);
    }, 200);
  };

  // DRY: Account dropdown menu options
  const accountMenuOptions = getAccountMenuOptions(user,() =>
    setIsAccountDropdownOpen(false)
  );

  // Account dropdown for desktop and mobile
  const accountDropdown = user ? (
    <UniversalDropdown
      label={
        <button
          className="flex items-center ml-2 font-sans focus:outline-none"
          tabIndex={0}
          type="button"
        >
          <span className="w-10 h-10 rounded-full bg-[#758c07] flex items-center justify-center mr-2">
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
          <span className="text-base">{user.name || "Account"}</span>
        </button>
      }
      menuOptions={accountMenuOptions}
      isOpen={isAccountDropdownOpen}
      onOpen={handleAccountDropdownOpen}
      onClose={handleAccountDropdownClose}
      align="right"
    />
  ) : null;

  // Mobile menu links (excluding Login)
  const mobileLinks = [...NAV_LINKS, { href: "/cds", label: "CDS" }];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 bg-white shadow transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
      style={{
        willChange: "transform",
      }}
    >
      <div>
        {/* Main navbar content */}
        <div className="px-4 py-3 flex justify-between items-center max-w-8xl mx-auto font-sans">
          <Link
            href="/"
            className="text-2xl font-bold text-green-800 hover:text-green-900 transition font-sans"
          >
            G-ROOT
          </Link>
          <DesktopNavLinks
            navLinks={NAV_LINKS}
            cdsDropdown={CDS_DROPDOWN}
            isDropdownOpen={isDropdownOpen}
            onDropdownOpen={handleDropdownOpen}
            onDropdownClose={handleDropdownClose}
            accountDropdown={accountDropdown}
          />
           {status === "unauthenticated" && (
          <Link
            href="/auth/login"
            className="px-4 py-2 text-sm font-semibold text-white bg-green-700 rounded-md shadow hover:bg-green-800 transition-colors duration-200"
          >
            Login
          </Link>
        )}
          <MobileNavIcons
            user={user}
            accountDropdown={accountDropdown}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        </div>
      </div>
      <NewsTicker />
      <MobileNavbar isOpen={isOpen} mobileLinks={mobileLinks} />
      {/* Login button - always visible */}
    
    </nav>
  );
};

export default Navbar;
