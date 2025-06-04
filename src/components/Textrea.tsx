import React from "react";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>((props, ref) => (
  <textarea
    ref={ref}
    className={`input-base text-green-800 border-green-300 focus:ring-green-500 focus:border-green-500 bg-white ${
      props.className || ""
    }`}
    {...props}
  />
));

Textarea.displayName = "Textarea";
export default Textarea;
