import React from "react";
import clsx from "clsx";

type FormContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export default function FormContainer({
  children,
  className = "",
}: FormContainerProps) {
  return (
    <div
      className={clsx(
        "relative bg-white text-black shadow-xl rounded-3xl overflow-hidden flex flex-col items-center justify-center p-10 max-w-xl w-full transform transition-all duration-300 ease-in-out",
        "hover:scale-105 hover:shadow-2xl hover:bg-opacity-90", // Hover Effects
        className
      )}
    >
      <div className="relative z-20 flex flex-col items-center w-full">
        {children}
      </div>
    </div>
  );
}
