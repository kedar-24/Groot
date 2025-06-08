"use client";
import { useState } from "react";
import Link from "next/link";
import FormContainer from "@/components/FormContainer";
import Button from "@/components/button";
import Input from "@/components/Input";
import Image from "next/image";

// Color constants
const BG_COLOR = "bg-green-700";
const TEXT_PRIMARY = "text-green-800";
const TEXT_LINK = "text-green-700";
const CARD_BG = "bg-white";
const INPUT_ACCENT = "accent-green-600";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        alert("Login successful!");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex relative">
      {/* Left: Auth content with background image */}
      <div className="flex-1 flex flex-col justify-center items-center bg-green-700 p-4 relative">
        {/* Background Image for left half */}
        <div className="absolute inset-0 w-full h-full z-0">
          <Image
            src="/images/login.jpg"
            alt="Login Image"
            fill
            className="object-cover opacity-60"
            priority
            sizes="50vw"
          />
        </div>
        {/* Form content above image */}
        <div className="w-full max-w-md mx-auto relative z-10">
          <FormContainer>
            <h1 className="text-4xl font-bold text-green-800 mb-6">
              Welcome Back!
            </h1>
            <p className="text-black mb-4">Login to your profile</p>
            <form
              onSubmit={handleSubmit}
              className="space-y-4 w-full max-w-md mx-auto"
            >
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-green-800 mb-1"
                >
                  Email
                </label>
                <Input
                  type="email"
                  id="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="example@example.com"
                  required
                  className="input-base"
                />
              </div>
              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-green-800 mb-1"
                >
                  Password
                </label>
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  className="input-base"
                />
                <div className="flex justify-between items-center mt-1">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="showPassword"
                      checked={showPassword}
                      onChange={() => setShowPassword((v) => !v)}
                      className="mr-2 accent-green-600"
                    />
                    <label
                      htmlFor="showPassword"
                      className="text-green-800 text-sm"
                    >
                      Show Password
                    </label>
                  </div>
                  <Link
                    href="/login/forgot-password"
                    className="text-green-700 hover:underline text-sm"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              {/* Login Button */}
              <Button variant="primary" type="submit" className="w-full">
                Login
              </Button>
            </form>
            <div className="my-6 flex items-center">
              <hr className="flex-1 border-gray-300" />
              <span className="mx-3 text-gray-400 text-sm">or</span>
              <hr className="flex-1 border-gray-300" />
            </div>
            {/* Social Login */}
            <div className="flex justify-center items-center space-x-4">
              <Button
                variant="imglogo"
                type="button"
                aria-label="Login with Facebook"
              >
                <Image
                  src="/images/facebook-logo.svg"
                  alt=""
                  width={24}
                  height={24}
                  aria-hidden="true"
                  priority={false}
                />
              </Button>
              <Button
                variant="imglogo"
                type="button"
                aria-label="Login with Google"
              >
                <Image
                  src="/images/google-logo.svg"
                  alt=""
                  width={24}
                  height={24}
                  aria-hidden="true"
                  priority={false}
                />
              </Button>
              <Button variant="imglogo" type="button" aria-label="Login with Apple">
                <Image
                  src="/images/apple-logo.svg"
                  alt=""
                  width={24}
                  height={24}
                  aria-hidden="true"
                  priority={false}
                />
              </Button>
            </div>
            <div className="mt-6 text-center text-gray-700">
              <p>
                Don&apos;t have an account?{" "}
                <Link
                  href="/login/signup"
                  className="text-green-700 font-semibold hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </FormContainer>
        </div>
      </div>
      {/* Divider */}
      <div className="w-px bg-gray-200 relative z-20"></div>
      {/* Right: Empty */}
      <div className="w-1/2 hidden md:block relative z-20"></div>
    </div>
  );
}
