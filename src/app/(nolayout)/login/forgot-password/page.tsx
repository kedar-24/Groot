"use client";
import { useState } from "react";
import Link from "next/link";
import AuthLayout from "@/components/AuthLayout";
import FormContainer from "@/components/FormContainer";
import Input from "@/components/Input";
import Button from "@/components/button";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send a request to your API to handle password reset
    setSubmitted(true);
  };

  return (
    <AuthLayout imageSrc="/images/login.jpg" imageAlt="Forgot Password">
      <FormContainer>
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          Forgot Password
        </h1>
        <p className="mb-6 text-gray-600">
          Enter your email address and we&apos;ll send you a link to reset your
          password.
        </p>
        {submitted ? (
          <div className="text-green-600 mb-4">
            If an account with that email exists, a reset link has been sent.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email Address
              </label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@example.com"
                required
                className="w-full"
              />
            </div>
            <Button type="submit" variant="primary" className="w-full">
              Send Reset Link
            </Button>
          </form>
        )}
        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="text-green-700 font-semibold hover:underline"
          >
            Back to Login
          </Link>
        </div>
      </FormContainer>
    </AuthLayout>
  );
}
