import React from "react";

const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className = "", ...props }, ref) => (
  <select
    ref={ref}
    className={`w-full rounded-lg px-3 py-2 text-base border border-gray-300 transition focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-green-800 ${className}`}
    {...props}
  />
));

Select.displayName = "Select";
export default Select;
