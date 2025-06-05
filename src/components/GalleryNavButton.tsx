import React from "react";

interface GalleryNavButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const GalleryNavButton = ({
  children,
  className = "",
  ...props
}: GalleryNavButtonProps) => (
  <button
    type="button"
    className={`bg-white/90 text-green-800 flex items-center justify-center rounded-full shadow-lg transition focus:outline-none hover:bg-green-700 hover:text-white ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default GalleryNavButton;
