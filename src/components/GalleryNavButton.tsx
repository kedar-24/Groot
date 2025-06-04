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
  <button type="button" className={`gallery-modal-btn ${className}`} {...props}>
    {children}
  </button>
);

export default GalleryNavButton;
