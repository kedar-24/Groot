"use client";
import { useState, useRef, useEffect } from "react";
import { RiArrowDropDownLine, RiMenu3Line, RiCloseLine } from "react-icons/ri";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";
import useCurrentUser from "@/hooks/useCurrentUser";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export type NavbarVariant = "default" | "glass";

// Define your link sets
const LANDING_LINKS = [
  { href: "/", label: "Home" },
  { href: "/achievers", label: "Achievers" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/groups", label: "Groups" },
];
const HOME_LINKS = [
  { href: "/home", label: "Feed" },
  { href: "/events", label: "Events" },
  { href: "/groups", label: "Groups" },
  { href: "/gallery", label: "Gallery" },
];

const Navbar = ({ variant = "default" }: { variant?: NavbarVariant }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const { data: user, status } = useCurrentUser();
  const pathname = usePathname();

  // Choose links based on route
  const NAV_LINKS =
    pathname === "/"
      ? LANDING_LINKS
      : pathname.startsWith("/home")
      ? HOME_LINKS
      : LANDING_LINKS;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Hide navbar only when scrolling down and past a certain point
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      // Update the last scroll position
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // Empty dependency array for performance

  useEffect(() => {
    if (!showMenu) return;
    const handler = (e: MouseEvent) =>
      menuRef.current &&
      !menuRef.current.contains(e.target as Node) &&
      setShowMenu(false);
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showMenu]);

  const logout = () => {
    setIsOpen(false);
    signOut({ callbackUrl: "/" });
  };

  const navVariants = {
    hidden: { y: "-120%", opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: "-120%", opacity: 0 },
  };

  const AuthLinks = () => (
    <>
      <Link
        href="/auth/login"
        className="text-sm font-semibold text-black hover:text-[var(--color-primary)] transition-colors"
      >
        Log in
      </Link>
      <Link
        href="/auth/signup"
        className="rounded-full font-serif px-6 py-2 bg-[var(--color-primary)] text-white font-semibold text-sm hover:scale-105 transition-transform shadow-md"
      >
        Sign up
      </Link>
    </>
  );

  const ProfileMenu = () => (
    <div className="relative flex items-center gap-4" ref={menuRef}>
      {user?.image ? (
        <Image
          src={user.image}
          alt={user.name || "Profile"}
          width={36}
          height={36}
          className="w-9 h-9 rounded-full object-cover border border-gray-200"
        />
      ) : (
        <span className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-600 border border-gray-200">
          {user?.name?.[0]?.toUpperCase() || "U"}
        </span>
      )}
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="font-serif flex items-center rounded px-4 h-10 bg-[var(--color-primary)] text-[var(--color-secondary-light)] font-semibold text-sm shadow-md"
      >
        {user?.name || user?.email}
        <RiArrowDropDownLine size={24} className="ml-1" />
      </button>
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 top-full mt-2 w-44 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50 font-semibold"
          >
            <Link
              href="/profile"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Profile
            </Link>
            <button
              onClick={logout}
              className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
            >
              Sign out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div className="w-full flex justify-center pointer-events-none">
      <AnimatePresence>
        {showNavbar && (
          <motion.nav
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={navVariants}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={`fixed left-1/2 -translate-x-1/2 z-50 w-[95vw] max-w-7xl h-20 sm:h-24 flex items-center justify-between px-4 sm:px-8 lg:px-12 rounded-b pointer-events-auto ${
              variant === "glass"
                ? "backdrop-blur-lg bg-[var(--color-secondary-light)]/80 border border-white/30 shadow-xl"
                : "bg-[var(--color-secondary-light)] shadow-lg border-gray-100"
            }`}
          >
            <Link
              href="/"
              className="text-2xl sm:text-3xl font-extrabold font-serif text-black pointer-events-auto"
            >
              GROOT
            </Link>

            <div className="hidden md:flex items-center gap-6 lg:gap-12 flex-1 ml-8">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm sm:text-base font-medium text-black hover:text-[var(--color-primary)] transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-6 ml-auto">
              {status !== "authenticated" ? (
                <AuthLinks />
              ) : (
                user && <ProfileMenu />
              )}
            </div>

            <div className="md:hidden flex items-center ml-auto">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-black hover:text-[var(--color-primary)]"
              >
                {isOpen ? <RiCloseLine size={28} /> : <RiMenu3Line size={28} />}
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden fixed top-24 left-0 right-0 bg-white shadow-xl z-40 px-6 py-4 overflow-hidden"
          >
            <div className="space-y-4">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className="block text-black font-medium text-lg hover:text-[var(--color-primary)]"
                >
                  {label}
                </Link>
              ))}
              {status !== "authenticated" ? (
                <div className="flex flex-col gap-3 mt-4">
                  <AuthLinks />
                </div>
              ) : (
                <div className="flex flex-col gap-3 mt-4">
                  <Link
                    href="/profile"
                    onClick={() => setIsOpen(false)}
                    className="text-sm font-semibold text-black hover:text-[var(--color-primary)]"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={logout}
                    className="text-sm font-semibold text-red-600 text-left"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
