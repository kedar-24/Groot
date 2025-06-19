import React from "react";
import Link from "next/link";

type MenuOption = { href: string; label: React.ReactNode; };
type SelectOption = { value: string; label: string };

interface UniversalDropdownProps {
  label: React.ReactNode; // was string
  menuOptions?: MenuOption[];
  selectOptions?: SelectOption[];
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  error?: string;
  selectProps?: React.SelectHTMLAttributes<HTMLSelectElement>;
}

const UniversalDropdown: React.FC<UniversalDropdownProps> = ({
  label,
  menuOptions,
  selectOptions,
  isOpen,
  onOpen,
  onClose,
  error,
  selectProps = {},
}) => {
  if (menuOptions) {
    // Render as dropdown menu
    return (
      <div
        className="relative group"
        onMouseEnter={onOpen}
        onMouseLeave={onClose}
        onFocus={onOpen}
        onBlur={onClose}
      >
        <button
          className="flex items-center text-base px-4 py-2 rounded transition-colors duration-200 hover:text-green-700 focus:text-green-700 focus:bg-gray-100"
          aria-haspopup="true"
          aria-expanded={isOpen ? "true" : "false"}
          tabIndex={0}
          type="button"
        >
          {label}
          <svg
            className="ml-1 w-4 h-4 onhover:rotate-180 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div
          className={`absolute left-0 mt-2 min-w-[180px] shadow-lg rounded-lg bg-white py-2 z-20 transition-all duration-300 ease-in-out ${
            isOpen ? "block" : "hidden"
          }`}
          aria-labelledby={
            typeof label === "string"
              ? `${label.toLowerCase()}-dropdown`
              : "dropdown-menu"
          }
        >
          {menuOptions.map((opt) => (
            <Link
              key={opt.href}
              href={opt.href}
              className="text-base px-4 py-2 block text-gray-700 hover:bg-green-50 hover:text-green-700 transition rounded"
            >
              {opt.label}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  if (selectOptions) {
    // Render as select dropdown
    return (
      <div className="flex flex-col">
        <label className="mb-1 text-sm font-medium text-gray-700">
          {label}
        </label>
        <select
          className="w-full rounded-lg px-3 py-2 text-base border border-gray-300 transition focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white min-w-[160px]"
          {...selectProps}
        >
          {selectOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
      </div>
    );
  }

  return null;
};

export default UniversalDropdown;
