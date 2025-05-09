"use client";

import { useState } from "react";

export default function AdminPage() {
  const [form, setForm] = useState({
    title: "",
    date: "",
    category: "",
    imageUrl: "",
    content: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/news", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("Article uploaded!");
      setForm({ title: "", date: "", category: "", imageUrl: "", content: "" });
    } else {
      alert("Failed to upload");
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-6">Upload New Article</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          required
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="text"
          name="date"
          value={form.date}
          onChange={handleChange}
          placeholder="Date (e.g. 10/05/25)"
          required
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="text"
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          required
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="text"
          name="imageUrl"
          value={form.imageUrl}
          onChange={handleChange}
          placeholder="Image URL"
          required
          className="w-full border px-4 py-2 rounded"
        />
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="Content"
          required
          className="w-full border px-4 py-2 rounded h-32"
        />
        <button
          type="submit"
          className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800"
        >
          Upload
        </button>
      </form>
    </div>
  );
}
