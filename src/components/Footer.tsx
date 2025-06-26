"use client";
import Link from "next/link";
import Image from "next/image";
import Input from "./Input";
import Button from "./button";
import { useState } from "react";

// DRY: Footer link sections
const footerSections = [
  {
    title: "Alumni",
    links: [
      { href: "/alumni", label: "Alumni" },
      { href: "/events", label: "Events" },
      { href: "/gallery", label: "Gallery" },
      { href: "/groups", label: "Groups" },
    ],
  },
  {
    title: "Info",
    links: [
      { href: "/about", label: "About School" },
      { href: "/contact", label: "Contact" },
      { href: "/history", label: "Our History" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "Policies",
    links: [
      { href: "/terms", label: "Terms" },
      { href: "/privacy", label: "Privacy" },
    ],
  },
];

// DRY: Footer link group component
function FooterLinks({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h4 className="font-montserrat font-semibold text-base mb-3 text-black">
        {title}
      </h4>
      <ul className="space-y-2 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="hover:text-[var(--color-primary)] text-black transition-colors duration-200 font-medium"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="w-full bg-gradient-to-br from-[var(--color-primary-lightest)] to-[var(--color-secondary-lightest)]">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 py-12">
        <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-12 w-full">
          {/* Left: Logo & About */}
          <div className="flex-1 flex flex-col items-center xl:items-start text-center xl:text-left gap-6 min-w-[280px]">
            <div className="flex items-center justify-center xl:justify-start mb-4">
              <Image
                src="/images/logo.png"
                alt="School Logo"
                width={60}
                height={60}
                className="mr-4 rounded-full shadow-lg"
              />
              <div>
                <span className="text-3xl font-montserrat font-black tracking-wide text-black">
                  GROOT
                </span>
                <div className="text-sm font-montserrat text-black font-medium">
                  Alumni Network
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-montserrat font-semibold text-lg mb-3 text-black">
                About the Alumni Network
              </h4>
              <p className="text-sm text-black mb-4 max-w-xs xl:max-w-sm leading-relaxed">
                Our alumni network brings together generations of students,
                fostering lifelong friendships and opportunities. Join us to
                stay in touch and celebrate our shared legacy.
              </p>
            </div>
          </div>

          {/* Center: Links */}
          <div className="flex-[1.5] flex flex-col justify-start items-center xl:items-start">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full text-center xl:text-left">
              {footerSections.map((section) => (
                <FooterLinks key={section.title} {...section} />
              ))}
            </div>
          </div>

          {/* Right: App Download & Subscribe */}
          <div className="flex-1 flex flex-col items-center xl:items-end justify-start min-w-[280px] gap-8">
            {/* QR Code & App Download */}
            <div className="w-full max-w-md">
              <h3 className="font-montserrat text-lg font-bold mb-6 text-[var(--color-primary)] text-center xl:text-right">
                Download Our App
              </h3>
              <div className="flex items-center justify-center xl:justify-end gap-6">
                {/* QR Code */}
                <div className="bg-white p-4 rounded-2xl shadow-lg">
                  <Image
                    src="/images/qr-code.png"
                    alt="QR Code"
                    width={120}
                    height={120}
                    className="object-contain"
                  />
                </div>

                {/* App Store badges - vertically aligned */}
                <div className="flex flex-col gap-3 items-center">
                  <Link
                    href="#"
                    className="transition-transform hover:scale-105 active:scale-95"
                  >
                    <Image
                      src="/images/app-store-badge.svg"
                      alt="Download on App Store"
                      width={150}
                      height={45}
                      className="object-contain"
                    />
                  </Link>
                  <Link
                    href="#"
                    className="transition-transform hover:scale-105 active:scale-95"
                  >
                    <Image
                      src="/images/google-play-badge.png"
                      alt="Get it on Google Play"
                      width={150}
                      height={45}
                      className="object-contain"
                    />
                  </Link>
                </div>
              </div>
            </div>

            {/* Newsletter Subscribe */}
            <div className="w-full max-w-xs">
              <h3 className="font-montserrat text-lg font-bold mb-3 text-[var(--color-primary)] text-center xl:text-right">
                Stay in Touch
              </h3>
              <form
                className="w-full flex flex-col gap-3"
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
                  className="w-full rounded-lg text-black bg-white focus:outline-none border border-[var(--color-primary)] shadow-sm"
                />
                <Button
                  type="submit"
                  variant="solid"
                  className="w-full rounded-lg font-montserrat font-semibold"
                >
                  Subscribe
                </Button>
              </form>
              <p className="text-xs text-[var(--color-black)]/60 mt-2 text-center xl:text-right max-w-xs leading-relaxed">
                Get alumni news, events, and updates in your inbox.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom: Copyright */}
        <div className="mt-12 border-t border-[var(--color-primary)] pt-6 text-center text-sm text-[var(--color-black)]/70 w-full">
          <p className="font-montserrat">
            &copy; {new Date().getFullYear()} GROOT Alumni Network. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
