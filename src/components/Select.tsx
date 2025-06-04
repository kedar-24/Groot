import React from "react";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export default function Select({ className = "", children, ...props }: SelectProps) {
  return (
    <select
      className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}