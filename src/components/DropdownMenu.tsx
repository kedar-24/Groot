import React from "react";
import Link from "next/link";

interface DropdownMenuProps {
  label: string;
  options: { href: string; label: string }[];
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  label,
  options,
  isOpen,
  onOpen,
  onClose,
}) => (
  <div
    className="relative group"
    onMouseEnter={onOpen}
    onMouseLeave={onClose}
    onFocus={onOpen}
    onBlur={onClose}
  >
    <button
      className="flex items-center nav-link"
      aria-haspopup="true"
      aria-expanded={isOpen ? "true" : "false"}
      tabIndex={0}
      type="button"
    >
      {label}
      <svg
        className="ml-1 w-4 h-4"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    <div
      className={`navbar-dropdown transition-all duration-300 ease-in-out min-w-[180px] shadow-lg rounded-lg bg-white py-2 ${
        isOpen ? "block" : "hidden"
      }`}
      aria-labelledby={`${label.toLowerCase()}-dropdown`}
    >
      {options.map((opt) => (
        <Link
          key={opt.href}
          href={opt.href}
          className="navbar-dropdown-link px-4 py-2 block hover:bg-green-50 hover:text-green-700 transition rounded"
        >
          {opt.label}
        </Link>
      ))}
    </div>
  </div>
);

export default DropdownMenu;
