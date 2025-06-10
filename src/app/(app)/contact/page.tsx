"use client";
import { useState } from "react";
import Input from "@/components/Input";
import Textarea from "@/components/Textrea";
import Button from "@/components/button";
import FormContainer from "@/components/FormContainer";

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
    setSubmissionStatus(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmissionStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setFormErrors({});
    } catch {
      setSubmissionStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormContainer className="Center w-full max-w-md mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center">Contact Us</h2>
      <form onSubmit={handleSubmit} className="space-y-6 w-full">
        {/* Name Field */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Name
          </label>
          <Input
            name="name"
            id="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {formErrors.name && (
            <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <Input
            name="email"
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {formErrors.email && (
            <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
          )}
        </div>

        {/* Message Field */}
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Message
          </label>
          <Textarea
            name="message"
            id="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            required
          />
          {formErrors.message && (
            <p className="text-red-500 text-xs mt-1">{formErrors.message}</p>
          )}
        </div>

        {/* Status Messages */}
        {submissionStatus === "success" && (
          <p className="text-green-600 text-sm mt-2 text-center">
            Message sent successfully!
          </p>
        )}
        {submissionStatus === "error" && (
          <p className="text-red-600 text-sm mt-2 text-center">
            There was an error sending your message. Please try again.
          </p>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="inline-block w-5 h-5 border-2 border-t-2 border-green-700 border-t-transparent rounded-full animate-spin align-middle"></span>
          ) : (
            "Send Message"
          )}
        </Button>
      </form>
    </FormContainer>
  );
}
