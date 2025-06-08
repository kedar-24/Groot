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

export default function SignupPage() {
  const [form, setForm] = useState({
    emailOrMobile: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add your signup logic here (API call)
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left: Signup content */}
      <div
        className={`flex-1 flex flex-col justify-center items-center ${BG_COLOR} p-4`}
      >
        <div className="w-full max-w-md mx-auto">
          <FormContainer>
            <h1 className={`text-4xl font-bold ${TEXT_PRIMARY} mb-6`}>Sign Up</h1>
            <p className={`${CARD_BG === "bg-white" ? "text-black" : ""} mb-4`}>
              Create your account
            </p>
            {submitted ? (
              <div className="text-green-700 text-lg mb-8">
                Account created! Please check your email to verify your account.
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-4 w-full max-w-md mx-auto"
              >
                {/* Email or Mobile */}
                <div>
                  <label
                    htmlFor="emailOrMobile"
                    className={`block text-sm font-medium ${TEXT_PRIMARY} mb-1`}
                  >
                    Email or Mobile Number
                  </label>
                  <Input
                    type="text"
                    id="emailOrMobile"
                    value={form.emailOrMobile}
                    onChange={handleChange}
                    placeholder="you@example.com or 1234567890"
                    required
                    className="input-base"
                  />
                </div>
                {/* Username */}
                <div>
                  <label
                    htmlFor="username"
                    className={`block text-sm font-medium ${TEXT_PRIMARY} mb-1`}
                  >
                    Username
                  </label>
                  <Input
                    type="text"
                    id="username"
                    value={form.username}
                    onChange={handleChange}
                    placeholder="Choose a username"
                    required
                    className="input-base"
                  />
                </div>
                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className={`block text-sm font-medium ${TEXT_PRIMARY} mb-1`}
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
                  <div className="flex items-center mt-1">
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
                </div>
                {/* Confirm Password */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className={`block text-sm font-medium ${TEXT_PRIMARY} mb-1`}
                  >
                    Confirm Password
                  </label>
                  <Input
                    type={showConfirm ? "text" : "password"}
                    id="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Repeat your password"
                    required
                    className="input-base"
                  />
                  <div className="flex items-center mt-1">
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
                </div>
                <Button
                  variant="primary"
                  type="submit"
                  className="w-full bg-green-700 hover:bg-green-800 text-white"
                >
                  Sign Up
                </Button>
              </form>
            )}
            <div className="my-6 flex items-center">
              <hr className="flex-1 border-gray-300" />
              <span className="mx-3 text-gray-400 text-sm">or</span>
              <hr className="flex-1 border-gray-300" />
            </div>
            {/* Social Signup */}
            <div className="flex justify-center items-center gap-4">
              <Button
                variant="imglogo"
                type="button"
                aria-label="Sign up with Facebook"
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
                aria-label="Sign up with Google"
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
              <Button
                variant="imglogo"
                type="button"
                aria-label="Sign up with Apple"
              >
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
                Already have an account?{" "}
                <Link
                  href="/login"
                  className={`${TEXT_LINK} font-semibold hover:underline`}
                >
                  Login
                </Link>
              </p>
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
          alt="Signup Image"
          fill
          className="object-cover"
          priority
          sizes="50vw"
        />
      </div>
    </div>
  );
}
