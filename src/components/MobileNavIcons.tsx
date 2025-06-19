import Link from "next/link";

interface MobileNavIconsProps {
  user: any;
  accountDropdown?: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
}

export default function MobileNavIcons({
  user,
  accountDropdown,
  isOpen,
  setIsOpen,
}: MobileNavIconsProps) {
  return (
    <div className="md:hidden flex items-center space-x-3">
      {/* Show account dropdown only if user is logged in */}
      {user && accountDropdown}
      {/* Show login icon if not logged in */}
      {!user && (
        <Link
          href="/auth/login"
          className="flex items-center"
          aria-label="Login"
        >
          <span className="w-10 h-10 rounded-full bg-[#758c07] flex items-center justify-center mr-1">
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
        </Link>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-black hover:text-green-600 transition"
        aria-expanded={isOpen ? "true" : "false"}
        aria-controls="mobile-menu"
        type="button"
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
    </div>
  );
}
