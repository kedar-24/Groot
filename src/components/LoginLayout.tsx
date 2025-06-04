import React from "react";
import Image from "next/image";

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
      {/* Left: Auth content */}
      <div className="flex-1 flex flex-col justify-center items-center bg-white">
        <div className="w-full max-w-md mx-auto">{children}</div>
      </div>
      {/* Divider */}
      <div className="w-px bg-gray-200"></div>
      {/* Right: Image */}
      <div className="w-1/2 hidden md:block relative">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          priority
          sizes="50vw"
        />
      </div>
    </div>
  );
}
