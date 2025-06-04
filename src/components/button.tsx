import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "imglogo" | "red";
  children: React.ReactNode;
};

export default function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const variants = {
    primary: "btn btn-primary",
    secondary: "btn btn-secondary",
    imglogo:
      "w-12 h-12 flex items-center justify-center bg-white border border-gray-300 shadow-sm hover:shadow-lg hover:bg-blue-50 hover:scale-110 hover:border-blue-400 transition-all duration-300 mx-1",
    red: "btn btn-red",
  };

  return (
    <button className={`${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
