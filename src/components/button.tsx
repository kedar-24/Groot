import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    variant?: "primary" | "secondary" | "imglogo" | "red";
    as?: "button" | "a";
    href?: string;
    children: React.ReactNode;
    className?: string;
  };

export default function Button({
  variant = "primary",
  as,
  href,
  className = "",
  children,
  ...props
}: ButtonProps) {
  let variantClass = "";

  if (variant === "primary")
    variantClass =
      "inline-flex items-center justify-center rounded-lg font-semibold transition-colors duration-200 focus:outline-none px-3 py-2 text-base bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] focus:ring-2 focus:ring-[var(--color-primary-light)]";
  else if (variant === "secondary")
    variantClass =
      "inline-flex items-center justify-center rounded-lg font-semibold transition-colors duration-200 focus:outline-none px-3 py-2 text-base bg-white text-[var(--color-primary)] border border-[var(--color-primary)] hover:bg-[var(--color-primary-light)] hover:text-[var(--color-primary-dark)] focus:ring-2 focus:ring-[var(--color-primary-light)]";
  else if (variant === "imglogo")
    variantClass =
      "w-12 h-12 flex items-center justify-center bg-white border border-gray-300 shadow-sm hover:shadow-lg hover:bg-[var(--color-primary-light)] hover:scale-110 hover:border-[var(--color-primary-light)] transition-all duration-300 mx-1 rounded-full";
  else if (variant === "red")
    variantClass =
      "inline-block bg-[#8b1f2f] text-white px-10 py-4 rounded-xl font-bold text-lg shadow-xl hover:bg-[#a83242] hover:scale-105 active:scale-100 focus-visible:ring-4 focus-visible:ring-[#b94a5a]/40 transition-all duration-200 border-none";

  // Auto-detect if it should be a link or button
  const Element = as || (href ? "a" : "button");

  return (
    <Element
      className={`${variantClass} ${className}`}
      href={Element === "a" ? href : undefined}
      {...props}
    >
      {children}
    </Element>
  );
}