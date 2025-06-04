"use client";
import { useState } from "react";
import Link from "next/link";
import AuthLayout from "@/components/LoginLayout";
import FormContainer from "@/components/FormContainer";
import Button from "@/components/button";
import Input from "@/components/Input";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        alert("Login successful!");
        // Redirect to a dashboard or home page
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <AuthLayout imageSrc="/images/login.jpg" imageAlt="Login Image">
      <FormContainer>
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Welcome Back!</h1>
        <p className="text-gray-600 mb-4">Login to your profile</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@example.com"
              required
            />
          </div>
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <Input
              type={showPassword ? "text" : "password"} // Toggle input type
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
            <div className="flex justify-end mt-1">
              <Link
                href="/login/forgot-password"
                className="text-blue-500 hover:underline text-sm"
              >
                Forgot password?
              </Link>
            </div>
          </div>
          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              className="mr-2"
            />
            <label htmlFor="showPassword" className="text-gray-700">
              Show Password
            </label>
          </div>
          <div className="flex justify-center">
            <Button variant="primary" type="submit" className="w-full max-w-xs">
              Login
            </Button>
          </div>
        </form>
        <p className="text-center text-gray-500 mt-4">or</p>
        <hr className="my-4 border-gray-300" />
        <div className="flex justify-center items-center space-x-4 mt-6">
          <Button variant="imglogo" type="button">
            <img
              src="/images/facebook-logo.svg"
              alt="Facebook"
              className="w-6 h-6"
            />
          </Button>
          <Button variant="imglogo" type="button">
            <img
              src="/images/google-logo.svg"
              alt="Google"
              className="w-6 h-6"
            />
          </Button>
          <Button variant="imglogo" type="button">
            <img src="/images/apple-logo.svg" alt="Apple" className="w-6 h-6" />
          </Button>
        </div>
        <div className="mt-6 text-center text-gray-600">
          <p>
            Dont have an account?{" "}
            <Link
              href="/login/signup"
              className="text-blue-500 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </FormContainer>
    </AuthLayout>
  );
}
