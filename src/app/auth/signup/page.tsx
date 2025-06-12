"use client";
import { useState } from "react";
import Link from "next/link";
import FormContainer from "@/components/FormContainer";
import Button from "@/components/button";
import AuthFormField from "@/components/AuthFormField";
import SocialAuthButtons from "@/components/SocialAuthButtons";

const TEXT_PRIMARY = "text-green-900";
const TEXT_LINK = "text-blue-500";
const INPUT_ACCENT = "accent-green-700";

export default function SignupPage() {
  const [form, setForm] = useState({
    emailOrMobile: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");


  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("Signup successful! Please login.");
      setForm({
    emailOrMobile: "",
    username: "",
    password: "",
    confirmPassword: "",
  }); // Clear form on success
    } else {
      setMessage(data.error || "Signup failed");
    }
    console.log("Signup message:", message);
  };

  return (
    <div className="w-full max-w-md mx-auto z-40 relative flex items-center justify-center min-h-[80vh]">
      <FormContainer className="flex-1 flex-col items-center justify-center w-full">
        <h1
          className={`text-3xl font-bold ${TEXT_PRIMARY} mb-4 text-center w-full`}
        >
          Sign Up
        </h1>
        <p className={`${TEXT_PRIMARY} mb-3 text-base text-center w-full`}>
          Create your account
        </p>
        {submitted ? (
          <div className="text-green-700 text-lg mb-8 text-center w-full">
            Account created! Please check your email to verify your account.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-3 w-full flex flex-col items-center"
          >
            <AuthFormField
              id="emailOrMobile"
              label="Email or Mobile Number"
              type="text"
              value={form.emailOrMobile}
              onChange={handleChange}
              placeholder="you@example.com or 1234567890"
              required
              disabled={false}
              className="w-full"
            />
            <AuthFormField
              id="username"
              label="Username"
              type="text"
              value={form.username}
              onChange={handleChange}
              placeholder="Choose a username"
              required
              disabled={false}
              className="w-full"
            />
            <AuthFormField
              id="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              disabled={false}
              className="w-full"
            >
              <div className="flex items-center mt-1 w-full">
                <input
                  type="checkbox"
                  id="showPassword"
                  checked={showPassword}
                  onChange={() => setShowPassword((v) => !v)}
                  className={`mr-2 ${INPUT_ACCENT}`}
                />
                <label
                  htmlFor="showPassword"
                  className={`${TEXT_PRIMARY} text-sm`}
                >
                  Show Password
                </label>
              </div>
            </AuthFormField>
            <AuthFormField
              id="confirmPassword"
              label="Confirm Password"
              type={showConfirm ? "text" : "password"}
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Repeat your password"
              required
              disabled={false}
              className="w-full"
            >
              <div className="flex items-center mt-1 w-full">
                <input
                  type="checkbox"
                  id="showConfirm"
                  checked={showConfirm}
                  onChange={() => setShowConfirm((v) => !v)}
                  className={`mr-2 ${INPUT_ACCENT}`}
                />
                <label
                  htmlFor="showConfirm"
                  className={`${TEXT_PRIMARY} text-sm`}
                >
                  Show Password
                </label>
              </div>
            </AuthFormField>
            <Button
              variant="primary"
              type="submit"
              className="w-full hover:bg-green-200 text-green-700"
            >
              Sign Up
            </Button>
          </form>
        )}
        <div className="my-4 flex items-center w-full">
          <hr className="flex-1 border-gray-300" />
          <span className="mx-2 text-gray-400 text-sm">or</span>
          <hr className="flex-1 border-gray-300" />
        </div>
        <div className="w-full flex flex-col items-center">
          <SocialAuthButtons />
        </div>
        <div className={`mt-4 text-center w-full ${TEXT_PRIMARY}`}>
          <p>
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className={`${TEXT_LINK} font-semibold hover:underline`}
            >
              Login
            </Link>
          </p>
        </div>
      </FormContainer>
    </div>
  );
}
