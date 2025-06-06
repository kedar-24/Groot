"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewGroupPostPage() {
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would send the post to your backend or state management
    // For now, just redirect back to groups page
    router.push("/groups");
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center font-sans">
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-gray-200 rounded-2xl shadow-md p-8 w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-green-900 mb-6">
          Create New Post
        </h1>
        <label className="block mb-3 text-sm font-medium text-gray-700">
          Your Name
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </label>
        <label className="block mb-4 text-sm font-medium text-gray-700">
          Post Content
          <textarea
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-700"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
            required
          />
        </label>
        <button
          type="submit"
          className="w-full bg-green-800 text-white py-2 rounded font-semibold hover:bg-green-900 transition"
        >
          Post
        </button>
      </form>
    </div>
  );
}
