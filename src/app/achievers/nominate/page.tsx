"use client";

import { useState } from "react";

export default function NominatePage() {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    description: "",
    imageUrl: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // You can handle submission here (e.g., call an API or store it)
    console.log("Submitted nomination:", formData);
    setSubmitted(true);
    setFormData({
      name: "",
      title: "",
      description: "",
      imageUrl: "",
    });
  };

  return (
    <section className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">
          Nominate an Achiever
        </h1>

        {submitted ? (
          <div className="text-center text-green-700 font-semibold text-lg">
            🎉 Thank you! Your nomination has been submitted.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Nominee&apos;s Full Name
              </label>
              <input
                required
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-600 focus:border-green-600"
              />
            </div>

            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title or Role
              </label>
              <input
                required
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-600 focus:border-green-600"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Achievements Description
              </label>
              <textarea
                required
                name="description"
                id="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-600 focus:border-green-600"
              />
            </div>

            <div>
              <label
                htmlFor="imageUrl"
                className="block text-sm font-medium text-gray-700"
              >
                Image URL (optional)
              </label>
              <input
                type="url"
                name="imageUrl"
                id="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-600 focus:border-green-600"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-700 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-md shadow-md transition"
            >
              Submit Nomination
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
