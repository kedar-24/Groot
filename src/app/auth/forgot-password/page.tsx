"use client";
import { useState } from "react";
import Link from "next/link";
import FormContainer from "@/components/FormContainer";
import Input from "@/components/Input";
import Button from "@/components/button";
import Image from "next/image";

// Color constants (matching login page)
const BG_COLOR = "bg-[beige]";
const TEXT_PRIMARY = "text-white";
const TEXT_LINK = "text-blue-400";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className={`min-h-screen flex ${BG_COLOR}`}>
      {/* Left: Forgot Password content */}
      <div
        className={`flex-1 flex flex-col justify-center items-center ${BG_COLOR} p-4`}
      >
        <div className="w-full max-w-md mx-auto">
          <FormContainer>
            <h1 className={`text-4xl font-bold ${TEXT_PRIMARY} mb-6`}>
              Forgot Password
            </h1>
            <p className={`${TEXT_PRIMARY} mb-4`}>
              Enter your email address and we&apos;ll send you a link to reset
              your password.
            </p>
            {submitted ? (
              <div className="text-green-200 text-lg mb-8">
                If an account with that email exists, a reset link has been sent.
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-4 w-full max-w-md mx-auto"
              >
                <div>
                  <label
                    htmlFor="email"
                    className={`block text-sm font-medium ${TEXT_PRIMARY} mb-1`}
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
                    className="input-base"
                  />
                </div>
                <Button
                  type="submit"
                  variant="secondary"
                  className="w-full bg-green-700 hover:bg-green-100 text-green-700"
                >
                  Send Reset Link
                </Button>
              </form>
            )}
            <div className="mt-6 text-center">
              <Link
                href="/auth/login"
                className={`${TEXT_LINK} font-semibold hover:underline`}
              >
                Back to Login
              </Link>
            </div>
          </FormContainer>
        </div>
      </div>
      {/* Divider */}
      <div className="w-px bg-gray-200"></div>
      {/* Right: Image */}
      <div className="w-1/2 hidden md:block relative">
        <Image
          src="/images/login.jpg"
          alt="Forgot Password"
          fill
          className="object-cover"
          priority
          sizes="50vw"
        />
      </div>
    </div>
  );
}
