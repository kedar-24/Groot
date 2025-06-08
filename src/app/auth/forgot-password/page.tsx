"use client";
import { useState } from "react";
import Link from "next/link";
import FormContainer from "@/components/FormContainer";
import Input from "@/components/Input";
import Button from "@/components/button";
import Image from "next/image";

// Color constants
const BG_COLOR = "bg-green-700";
const TEXT_PRIMARY = "text-green-800";
const TEXT_LINK = "text-green-700";
const CARD_BG = "bg-white";
const INPUT_ACCENT = "accent-green-600";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left: Forgot Password content */}
      <div
        className={`flex-1 flex flex-col justify-center items-center ${BG_COLOR} p-4`}
      >
        <div className="w-full max-w-md mx-auto">
          <FormContainer>
            <h1 className={`text-4xl font-bold ${TEXT_PRIMARY} mb-6`}>
              Forgot Password
            </h1>
            <p className={`${CARD_BG === "bg-white" ? "text-black" : ""} mb-4`}>
              Enter your email address and we&apos;ll send you a link to reset
              your password.
            </p>
            {submitted ? (
              <div className="text-green-700 text-lg mb-8">
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
                <Button type="submit" variant="primary" className="w-full">
                  Send Reset Link
                </Button>
              </form>
            )}
            <div className="mt-6 text-center text-gray-700">
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
