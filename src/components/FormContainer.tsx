import React from "react";

export default function FormContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-1/2 flex flex-col justify-center items-center bg-white p-8">
      <div className="max-w-md w-full">{children}</div>
    </div>
  );
}