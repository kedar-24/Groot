import Link from "next/link";
import React from "react";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const NavLink = ({ href, children, className = "" }: NavLinkProps) => (
  <Link
    href={href}
    className={`px-3 py-2 rounded transition-colors duration-200 hover:text-green-700 focus:text-green-700 focus:bg-gray-100 ${className}`}
  >
    {children}
  </Link>
);

export default NavLink;
