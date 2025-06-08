import React from "react";

type Strip = {
  left: string;
  top: string;
  width: string;
  height: string;
  background: string;
  borderRadius: string;
  boxShadow: string;
  transform: string;
  transitionDelay: string;
  zIndex?: number;
};

type StripsBackgroundProps = {
  bgAndStripsIn: boolean;
  strips?: Strip[];
};

export default function StripsBackground({ bgAndStripsIn, strips = [] }: StripsBackgroundProps) {
  return (
    <>
      {/* Diagonal Green BG */}
      <div
        className={`absolute inset-0 z-0 transition-all duration-700 ease-[cubic-bezier(.77,0,.18,1.01)] will-change-transform
          ${bgAndStripsIn
            ? "translate-x-0 translate-y-0 scale-100 opacity-100"
            : "translate-x-[-45%] translate-y-[-45%] scale-75 opacity-0"
          }`}
        style={{
          transitionDelay: "0ms",
          background: "#166534",
          clipPath: "polygon(0 0, 70% 0, 0 70%)",
          boxShadow: "0 12px 48px 0 rgba(34,197,94,0.13)",
        }}
      />
      {/* Strips */}
      {strips.map((strip, i) => (
        <div
          key={i}
          className={`absolute z-20 transition-all duration-700 ease-[cubic-bezier(.77,0,.18,1.01)] will-change-transform
            ${bgAndStripsIn ? "opacity-90 translate-y-0 scale-100" : "opacity-0 scale-75"}
          `}
          style={strip}
        />
      ))}
    </>
  );
}