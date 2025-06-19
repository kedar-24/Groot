import Link from "next/link";

interface MobileNavbarProps {
  isOpen: boolean;
  mobileLinks: { href: string; label: string }[];
}

export default function MobileNavbar({
  isOpen,
  mobileLinks,
}: MobileNavbarProps) {
  return (
    <div
      id="mobile-menu"
      className={`md:hidden px-4 pb-4 flex flex-col items-start bg-white transition-all duration-300 ease-in-out ${
        isOpen
          ? "max-h-[400px] opacity-100 pointer-events-auto"
          : "max-h-0 opacity-0 pointer-events-none"
      } overflow-hidden space-y-2 text-base font-medium text-gray-700 font-sans`}
    >
      {mobileLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="block w-full text-center py-2"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}
