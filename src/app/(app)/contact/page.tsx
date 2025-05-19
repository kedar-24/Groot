"use client";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<
    "success" | "error" | null
  >(null);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    if (!formData.name) errors.name = "Name is required.";
    if (!formData.email) errors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Please enter a valid email.";
    if (!formData.message) errors.message = "Message is required.";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmissionStatus(null); // Reset status

    try {
      // Mock API call to simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay
      setSubmissionStatus("success");
      setFormData({ name: "", email: "", message: "" }); // Reset form
    } catch (error) {
      setSubmissionStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="max-w-lg mx-auto mt-12 p-6 bg-white border rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Contact Us</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            name="name"
            id="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {formErrors.name && (
            <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            name="email"
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {formErrors.email && (
            <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
          )}
        </div>

        {/* Message Field */}
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700"
          >
            Message
          </label>
          <textarea
            name="message"
            id="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {formErrors.message && (
            <p className="text-red-500 text-sm mt-1">{formErrors.message}</p>
          )}
        </div>

        {/* Display Status Messages */}
        {submissionStatus === "success" && (
          <p className="text-green-600 text-sm mt-2">
            Message sent successfully!
          </p>
        )}
        {submissionStatus === "error" && (
          <p className="text-red-600 text-sm mt-2">
            There was an error sending your message. Please try again.
          </p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full p-3 rounded-md ${
            isSubmitting
              ? "bg-gray-400"
              : "bg-black text-white hover:bg-green-700 transition"
          }`}
        >
          {isSubmitting ? (
            <span className="animate-spin inline-block w-6 h-6 border-4 border-t-4 border-green-700 rounded-full"></span>
          ) : (
            "Send Message"
          )}
        </button>
      </form>
    </section>
  );
}
