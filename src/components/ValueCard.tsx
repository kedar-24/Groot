import React from "react";

interface ValueCardProps {
  title: string;
  children: React.ReactNode;
}

const ValueCard = ({ title, children }: ValueCardProps) => (
  <div className="p-6 bg-gray-100 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
    <h3 className="text-2xl font-semibold text-green-700 mb-2">{title}</h3>
    <div className="text-gray-600">{children}</div>
  </div>
);

export default ValueCard;
