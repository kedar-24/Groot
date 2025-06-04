import React from "react";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function Textarea({ className = "", ...props }: TextareaProps) {
  return (
    <textarea
      className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white resize-none ${className}`}
      {...props}
    />
  );
}