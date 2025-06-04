import React from "react";

type AuthLayoutProps = {
  children: React.ReactNode;
  imageSrc: string;
  imageAlt?: string;
};

export default function AuthLayout({
  children,
  imageSrc,
  imageAlt = "Auth Image",
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex">
      {children}
      <div className="w-px bg-gray-300"></div>
      <div className="w-1/2">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-full object-cover items-center flex mx-auto"
        />
      </div>
    </div>
  );
}