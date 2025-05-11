"use client";
import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send a request to your API to handle password reset
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white p-8 rounded-b-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Forgot Password</h1>
        <p className="mb-6 text-gray-600">
          Enter your email address and we'll send you a link to reset your password.
        </p>
        {submitted ? (
          <div className="text-green-600 mb-4">
            If an account with that email exists, a reset link has been sent.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@example.com"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Send Reset Link
            </button>
          </form>
        )}
        <div className="mt-6 text-center">
          <Link href="/login" className="text-blue-500 hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}