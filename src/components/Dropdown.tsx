import React from "react";

interface DropdownProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
  error?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  error,
  className = "",
  ...props
}) => (
  <div className="flex flex-col">
    {label && (
      <label className="mb-1 text-sm font-medium text-gray-700">{label}</label>
    )}
    <select
      className={`input-base w-auto min-w-[160px] ${className}`}
      {...props}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
    {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
  </div>
);

export default Dropdown;
