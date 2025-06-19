import NavLink from "./NavLink";
import UniversalDropdown from "./UniversalDropdown";
import Link from "next/link";

interface DesktopNavLinksProps {
  navLinks: { href: string; label: string }[];
  cdsDropdown: { href: string; label: string }[];
  isDropdownOpen: boolean;
  onDropdownOpen: () => void;
  onDropdownClose: () => void;
  accountDropdown: React.ReactNode;
}

export default function DesktopNavLinks({
  navLinks,
  cdsDropdown,
  isDropdownOpen,
  onDropdownOpen,
  onDropdownClose,
  accountDropdown,
}: DesktopNavLinksProps) {
  return (
    <div className="hidden md:flex items-center gap-x-4 text-base font-medium text-gray-700 font-sans">
      {navLinks.map((link) => (
        <NavLink key={link.href} href={link.href}>
          {link.label}
        </NavLink>
      ))}
      <UniversalDropdown
        label={
          <Link
            href="/cds"
            className="flex items-center px-3 py-1 rounded hover:text-green-700 focus:text-green-700 focus:bg-gray-100 transition font-sans"
            tabIndex={-1}
          >
            CDS
          </Link>
        }
        menuOptions={cdsDropdown}
        isOpen={isDropdownOpen}
        onOpen={onDropdownOpen}
        onClose={onDropdownClose}
      />
      {accountDropdown}
    </div>
  );
}
