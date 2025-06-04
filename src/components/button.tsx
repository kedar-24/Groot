import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "social";
  children: React.ReactNode;
};

export default function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  let base =
    "w-full py-1.5 px-6 rounded-lg font-semibold transition duration-300";
  let variants = {
    primary:
      "bg-green-500 text-gray-900 hover:bg-green-700 hover:text-white hover:scale-105",
    secondary:
      "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700",
    social:
      "flex items-center justify-center bg-white py-2 px-4 border border-gray-400 hover:bg-gray-100",
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}