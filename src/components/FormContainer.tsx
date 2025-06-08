import React from "react";

export default function FormContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-xl mx-auto flex flex-col justify-center items-center bg-white p-8 rounded-2xl shadow-md hover:scale-105 transition-500 duration-300">
      <div className="w-full">{children}</div>
    </div>
  );
}
