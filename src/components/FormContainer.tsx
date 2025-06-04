import React from "react";

export default function FormContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-xl mx-auto flex flex-col justify-center items-center bg-white p-8 rounded shadow-md">
      <div className="w-full">{children}</div>
    </div>
  );
}
