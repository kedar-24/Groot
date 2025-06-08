"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import FormContainer from "@/components/FormContainer";
import Button from "@/components/button";
import Input from "@/components/Input";
import Image from "next/image";
import StripsBackground from "@/components/StripsBackground";
import { loginStrips } from "@/components/stripsPresets";

// Color constants for high contrast and consistency
const BG_GRADIENT = "bg-gradient-to-br from-green-600 via-green-700 to-green-800";
const TEXT_PRIMARY = "text-green-900";
const TEXT_LINK = "text-blue-500";
const INPUT_ACCENT = "accent-green-700";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [animStage, setAnimStage] = useState<"init" | "show">("init");
  const [bgAndStripsIn, setBgAndStripsIn] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTimeout(() => setAnimStage("show"), 100); // form and image pop
    setTimeout(() => setBgAndStripsIn(true), 300); // bg/strips animate in after 200ms
  }, []);

  const formAndImageIn = animStage === "show";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        alert("Login successful!");
        setError("");
      } else {
        setError("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* left: Login content on white background */}
      <div className="flex-1 flex flex-col justify-center items-center p-4 relative overflow-hidden bg-white">
        {/* FormContainer - animates in with image */}
        <div
          className={`w-full max-w-md mx-auto z-40 relative transition-all duration-500 ease-[cubic-bezier(.77,0,.18,1.01)] 
            ${formAndImageIn
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-75 translate-y-20 pointer-events-none"
            }`}
          style={{
            transitionDelay: formAndImageIn ? "0ms" : "0ms",
            filter: formAndImageIn ? "drop-shadow(0 8px 32px rgba(34,197,94,0.10))" : "none",
          }}
        >
          <FormContainer>
            <h1 className={`text-4xl font-bold ${TEXT_PRIMARY} mb-6`}>
              Welcome Back!
            </h1>
            <p className="text-green-800 mb-4">
              Login to your profile
            </p>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <form
              onSubmit={handleSubmit}
              className="space-y-4 w-full max-w-md mx-auto"
            >
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  id="emailLabel"
                  className={`block text-sm font-medium ${TEXT_PRIMARY} mb-1`}
                >
                  Email
                </label>
                <Input
                  ref={emailRef}
                  type="email"
                  id="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="example@example.com"
                  required
                  className="input-base"
                  aria-labelledby="emailLabel"
                  disabled={loading}
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
                  autoComplete="current-password"
                  className="input-base"
                  aria-label="Password"
                  disabled={loading}
                />
                <div className="flex justify-between items-center mt-1">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="showPassword"
                      checked={showPassword}
                      onChange={() => setShowPassword((v) => !v)}
                      className={`mr-2 ${INPUT_ACCENT}`}
                      disabled={loading}
                    />
                    <label
                      htmlFor="showPassword"
                      className={`${TEXT_PRIMARY} text-sm`}
                    >
                      Show Password
                    </label>
                  </div>
                  <Link
                    href="/auth/forgot-password"
                    className={`${TEXT_LINK} hover:underline text-sm`}
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              {/* Login Button */}
              <Button
                variant="primary"
                type="submit"
                className="w-full hover:bg-green-200 text-green-700"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>
            <div className="my-6 flex items-center">
              <hr className="flex-1 border-gray-300" />
              <span className="mx-3 text-gray-400 text-sm">or</span>
              <hr className="flex-1 border-gray-300" />
            </div>
            {/* Social Login */}
            <div className="flex justify-center items-center gap-4">
              <Button
                variant="imglogo"
                type="button"
                aria-label="Login with Facebook"
                disabled={loading}
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
                disabled={loading}
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
                aria-label="Login with Apple"
                disabled={loading}
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
            <div className={`mt-6 text-center ${TEXT_PRIMARY}`}>
              <p>
                Don&apos;t have an account?{" "}
                <Link
                  href="/auth/signup"
                  className={`${TEXT_LINK} font-semibold hover:underline`}
                >
                  Sign up
                </Link>
              </p>
            </div>
          </FormContainer>
        </div>
        <StripsBackground bgAndStripsIn={bgAndStripsIn} strips={loginStrips} />
      </div>
      {/* right: Login image on larger screens */}
       <div className="w-3/5 hidden md:block relative bg-white overflow-hidden">
        <Image
          src="/images/login.jpg"
          alt="Login Image"
          fill
          className="object-cover relative z-0"
          priority
          sizes="50vw"
        />
      </div>
    </div>
  );
}
