import React from "react";

const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>((props, ref) => (
  <select
    ref={ref}
    className={`input-base text-green-800 border-green-300 focus:ring-green-500 focus:border-green-500 bg-white ${
      props.className || ""
    }`}
    {...props}
  />
));

Select.displayName = "Select";
export default Select;
