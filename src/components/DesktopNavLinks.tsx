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
  // Insert the CDS dropdown after the second link (index 1)
  const linksWithCDS = [
    ...navLinks.slice(0, 3),
    <UniversalDropdown
      key="cds-dropdown"
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
    />,
    ...navLinks.slice(2),
  ];

  return (
    <div className="hidden md:flex items-center gap-x-4 text-base font-medium text-gray-700 font-sans">
      {linksWithCDS.map((link, idx) =>
        typeof link === "object" && "props" in link ? (
          link // UniversalDropdown
        ) : (
          <NavLink key={navLinks[idx]?.href || idx} href={link.href}>
            {link.label}
          </NavLink>
        )
      )}
      {accountDropdown}
    </div>
  );
}
