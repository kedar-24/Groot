"use client";
import { useState } from "react";
import Link from "next/link";
import FormContainer from "@/components/FormContainer";
import AuthFormField from "@/components/AuthFormField";
import Button from "@/components/button";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true); // Disable button immediately

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.status === 429) {
        setError(
          data.error || "Too many reset requests. Please try again later."
        );
        setSubmitted(false);
      } else {
        setSubmitted(true);
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
      setSubmitted(false);
    }
    setLoading(false); // Re-enable if needed
  };

  return (
    <div className="w-full max-w-md mx-auto z-40 relative flex items-center justify-center min-h-[80vh]">
      <FormContainer className="flex-1 flex-col items-center justify-center w-full">
        <h1 className="text-4xl font-bold text-[var(--color-primary)] mb-4 text-center w-full">
          Forgot Password
        </h1>
        <p className="text-[var(--color-primary)] mb-3 text-center w-full">
          Enter your email address and we&apos;ll send you a link to reset your
          password.
        </p>
        {error && (
          <div className="text-red-700  text-lg mb-8 text-center w-full">
            {error}
          </div>
        )}
        {submitted && !error ? (
          <div className="text-green-700 text-lg mb-8 text-center w-full">
            If an account with that email exists, a reset link has been sent.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-3 w-full flex flex-col items-center"
          >
            <AuthFormField
              id="email"
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@example.com"
              required
              disabled={false}
              className="w-full"
            />
            <Button
              type="submit"
              variant="primary"
              className="w-full hover:bg-green-200 text-green-700"
              disabled={loading || submitted}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>
        )}
        <div className="mt-4 text-center w-full text-[var(--color-primary)]">
          <Link
            href="/auth/login"
            className="text-[var(--color-primary)] font-semibold hover:underline"
          >
            Back to Login
          </Link>
        </div>
      </FormContainer>
    </div>
  );
}
