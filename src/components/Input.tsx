import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white ${className}`}
      {...props}
    />
  );
}