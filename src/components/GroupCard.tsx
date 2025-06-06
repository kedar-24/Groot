import React from "react";
import Button from "./button";

export default function GroupCard({
  title,
  description,
  onJoin,
  joined,
}: {
  title: string;
  description: string;
  onJoin?: () => void;
  joined?: boolean;
}) {
  return (
    <div className="border border-gray-200 rounded-2xl bg-white shadow-sm p-6 mb-5 transition hover:shadow-md">
      <div className="flex justify-between items-center mb-2">
        <h3
          className="text-xl font-bold text-green-900 font-sans truncate"
          title={title}
        >
          {title}
        </h3>
        <Button
          variant={joined ? "secondary" : "primary"}
          className={`px-5 py-1.5 text-sm rounded-lg min-w-[90px] ${
            joined
              ? "bg-gray-200 text-gray-500 cursor-not-allowed border border-gray-300"
              : "bg-green-800 text-white hover:bg-green-900"
          }`}
          onClick={onJoin}
          disabled={joined}
        >
          {joined ? "Joined" : "Join"}
        </Button>
      </div>
      <p className="text-gray-700 text-base font-sans leading-relaxed">
        {description}
      </p>
    </div>
  );
}
