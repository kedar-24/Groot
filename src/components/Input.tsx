import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      className={`
        w-full rounded-lg px-3 py-2 text-base
        border border-[var(--color-primary)]
        transition
        focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-light)] focus:border-[var(--color-primary-lighter)]
        bg-white text-black
        placeholder:text-[var(--color-silver-chalice)]
        ${className}
      `}
      {...props}
    />
  );
}
