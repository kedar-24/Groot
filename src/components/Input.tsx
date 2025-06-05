import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      className={`w-full rounded-lg px-3 py-2 text-base border border-gray-300 transition focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white ${className}`}
      {...props}
    />
  );
}
