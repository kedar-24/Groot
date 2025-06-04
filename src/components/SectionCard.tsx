import React from "react";

interface SectionCardProps {
  children: React.ReactNode;
  className?: string;
  bgImage?: string;
}

export default function SectionCard({
  children,
  className = "",
  bgImage,
}: SectionCardProps) {
  return (
    <div
      className={`card group relative w-full h-full flex items-center justify-center overflow-hidden ${className}`}
    >
      {bgImage && (
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center z-0 transition-transform duration-300 scale-100 group-hover:scale-105"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          {/* Optional: dark overlay for better text contrast */}
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />
        </div>
      )}
      <div className="relative z-10 w-full h-full flex items-end">
        {children}
      </div>
    </div>
  );
}
