import React from "react";
import clsx from "clsx";
import { IoHome } from "react-icons/io5";

type ButtonProps = {
  variant?: "solid" | "outline" | "icon" | "secondary" | "home";
  as?: "button" | "a";
  href?: string;
  children?: React.ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;

export default function Button({
  variant = "solid",
  as,
  href,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
    solid:
      "inline-flex items-center justify-center rounded-lg font-semibold transition-colors duration-200 focus:outline-none px-3 py-2 text-base bg-[var(--color-primary-light)] text-white hover:bg-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-lighter)]",
    outline:
      "inline-flex items-center justify-center rounded-lg font-semibold transition-colors duration-200 focus:outline-none px-3 py-2 text-base bg-white text-[var(--color-primary-light)] border border-[var(--color-primary-lighter)] hover:bg-[var(--color-primary-lightest)] hover:text-black focus:ring-2 focus:ring-[var(--color-primary-lightest)]",
    icon: "w-12 h-12 flex items-center justify-center bg-white border border-gray-300 shadow-sm hover:shadow-lg hover:bg-[var(--color-primary-lightest)] hover:scale-110 hover:border-[var(--color-primary-lighter)] transition-all duration-300 mx-1 rounded-full",
    secondary:
      "inline-block bg-[var(--color-secondary-light)] text-white px-10 py-4 rounded-xl font-bold text-lg shadow-xl hover:scale-105 active:scale-100 focus-visible:ring-4 focus-visible:ring-[var(--color-secondary-light)]/40 transition-all duration-200 border-none",
    home: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 hover:bg-white border border-[var(--color-primary-light)]/30 shadow-lg hover:shadow-xl font-montserrat font-bold text-base text-[var(--color-primary-dark)] hover:text-[var(--color-primary)] transition-all duration-200 backdrop-blur-sm hover:scale-105 active:scale-95",
  };

  const Element: React.ElementType = as || (href ? "a" : "button");

  const commonClass = clsx(variantClasses[variant], className);

  // Default content for home variant
  const getHomeContent = () => (
    <>
      <IoHome
        size={18}
        className="transition-transform group-hover:scale-110"
      />
      <span>Home</span>
    </>
  );

  return (
    <Element
      className={commonClass}
      href={Element === "a" ? href || "/" : undefined}
      {...props}
    >
      {variant === "home" && !children ? getHomeContent() : children}
    </Element>
  );
}
