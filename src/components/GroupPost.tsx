import React from "react";

export default function GroupPost({
  author,
  date,
  content,
  isSuggested,
}: {
  author: string;
  date: string;
  content: string;
  isSuggested?: boolean;
}) {
  return (
    <div className="border border-gray-200 rounded-xl bg-white shadow p-5 mb-6">
      <div className="flex items-center mb-2">
        {isSuggested && (
          <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded mr-2 font-semibold">
            Suggested
          </span>
        )}
        <span className="font-semibold text-green-900">{author}</span>
        <span className="mx-2 text-gray-400">•</span>
        <span className="text-xs text-gray-500">{date}</span>
      </div>
      <div className="text-gray-800 text-base mb-3">{content}</div>
      <div className="flex gap-6 text-sm text-gray-500 font-medium">
        <button className="hover:text-green-800 transition">Like</button>
        <button className="hover:text-green-800 transition">Comment</button>
        <button className="hover:text-green-800 transition">Share</button>
      </div>
    </div>
  );
}
