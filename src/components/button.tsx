import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    variant?: "primary" | "secondary" | "imglogo" | "red";
    children: React.ReactNode;
    as?: "button" | "a";
    href?: string;
  };

export default function Button({
  variant = "primary",
  className = "",
  children,
  as = "button",
  href,
  ...props
}: ButtonProps) {
  const variants = {
    primary: "btn btn-primary",
    secondary: "btn btn-secondary",
    imglogo: "btn-imglogo",
    red: "btn btn-red",
  };

  if (as === "a" && href) {
    return (
      <a href={href} className={`${variants[variant]} ${className}`} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={`${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
