import Link from "next/link";
import Image from "next/image";
import Input from "./Input";
import Button from "./button";
import { useState } from "react";

// Reusable FooterLinks component
const FooterLinks = ({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) => (
  <div>
    <h4 className="font-semibold text-lg mb-4">{title}</h4>
    <ul className="space-y-2 text-sm text-gray-300">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className="hover:text-green-500 transition duration-200"
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const siteLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/accessibility", label: "Accessibility" },
];

const policyLinks = [
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/shipping", label: "Shipping Policy" },
  { href: "/refund", label: "Refund Policy" },
];

const exploreLinks = [
  { href: "/gadgets", label: "Gadgets" },
  { href: "/innovation", label: "Innovation" },
  { href: "/app-reviews", label: "App Reviews" },
  { href: "/advertise", label: "Advertise" },
];

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-gray-900 text-white pt-2 pb-4 mt-12 w-full">
      <div className="px-4 sm:px-8 w-full">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12 w-full">
          {/* Left: Logo, About, App */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left gap-4">
            <div className="flex items-center justify-center lg:justify-start mb-2">
              <Image
                src="/images/logo.png"
                alt="G-Root Logo"
                width={56}
                height={56}
                className="mr-4"
              />
              <div>
                <span className="text-3xl font-extrabold tracking-wide font-serif">
                  G-Root
                </span>
                <div className="text-base text-gray-300 font-serif">
                  News Online
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-2">About Us</h4>
              <p className="text-sm text-gray-400 mb-2 max-w-xs lg:max-w-sm">
                G-Root delivers curated news, insights, and stories to keep you
                informed and inspired. Join our community and stay ahead with
                the latest updates.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-base mb-2 mt-2">
                Download Our Mobile App
              </h4>
              <div className="flex flex-col items-center lg:flex-row lg:items-center gap-2">
                <Image
                  src="/images/qr-code.png"
                  alt="QR Code"
                  width={80}
                  height={80}
                  className="bg-white rounded p-1"
                />
                <div className="flex flex-row gap-2">
                  <a
                    href="https://play.google.com/store"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src="/images/google-play-badge.png"
                      alt="Get it on Google Play"
                      width={120}
                      height={36}
                      className="object-contain"
                    />
                  </a>
                  <a
                    href="https://www.apple.com/app-store/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src="/images/app-store-badge.svg"
                      alt="Download on the App Store"
                      width={120}
                      height={36}
                      className="object-contain"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Center: Links */}
          <div className="flex-[1.5] flex flex-col justify-start items-center lg:items-start">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-center lg:text-left">
              <FooterLinks title="Site" links={siteLinks} />
              <FooterLinks title="Policies" links={policyLinks} />
              <FooterLinks title="Explore" links={exploreLinks} />
            </div>
          </div>

          {/* Right: Subscribe */}
          <div className="flex-1 flex flex-col items-center lg:items-end justify-start">
            <div className="w-full max-w-xs">
              <h3 className="text-xl font-bold mb-3 text-center lg:text-right whitespace-nowrap">
                Subscribe to Our News
              </h3>
              <form
                className="w-full flex flex-col gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  setEmail("");
                }}
              >
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full rounded-lg text-black bg-gray-100 focus:outline-none"
                />
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full rounded-lg"
                >
                  Subscribe
                </Button>
              </form>
              <p className="text-xs text-gray-500 mt-1 text-center lg:text-right max-w-xs">
                Get the latest news and updates delivered straight to your
                inbox.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-400 w-full">
          <p>&copy; {new Date().getFullYear()} G-Root. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
