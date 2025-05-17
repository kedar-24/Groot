"use client";
import { useState } from "react";
import Link from "next/link";

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
    <div className="min-h-screen flex">
      {/* Left Half: Login Form */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-white p-8">
        <div className="max-w-md w-full">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            Welcome Back!
          </h1>
          <p className="text-gray-600 mb-4">Login to your profile</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@example.com"
                className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${email ? "text-blue-700" : "text-gray-900"}`}
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
              <input
                type={showPassword ? "text" : "password"} // Toggle input type
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <div className="flex justify-end mt-1">
                <Link href="/login/forgot-password" className="text-blue-500 hover:underline text-sm">
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
            <button
              type="submit"
              className="w-full text-center bg-green-500 text-gray-900 py-1.5 px-6 rounded-lg hover:bg-green-700 hover:text-white hover:scale-105 transition-scale duration-300"
            >
              Login
            </button>
          </form>
          <p className="text-center text-gray-500 mt-4">or</p>
          <hr className="my-4 border-gray-300" /> {/* Added horizontal line */}
          {/* Login Options */}
          <div className="flex justify-center items-center space-x-4 mt-6">
            {/* Facebook Login */}
            <button className="flex items-center justify-center bg-white py-2 px-4 rounded-lg border border-gray-400 hover:bg-gray-100 transition">
              <img
                src="/images/facebook-logo.svg"
                alt="Facebook"
                className="w-6 h-6"
              />
            </button>

            {/* Google Login */}
            <button className="flex items-center justify-center bg-white py-2 px-4 rounded-lg border border-gray-400 hover:bg-gray-100 transition">
              <img
                src="/images/google-logo.svg"
                alt="Google"
                className="w-6 h-6"
              />
            </button>

            {/* Apple Login */}
            <button className="flex items-center justify-center bg-white py-2 px-4 rounded-lg border border-gray-400 hover:bg-gray-400 transition">
              <img
                src="/images/apple-logo.svg"
                alt="Apple"
                className="w-6 h-6"
              />
            </button>
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
        </div>
      </div>

      {/* Vertical Line Separator */}
      <div className="w-px bg-gray-300"></div>

      {/* Right Half: Custom Image */}
      <div className="w-1/2">
        <img
          src="/images/login.jpg"
          alt="Login"
          className="w-full h-full object-cover items-center flex mx-auto"
        />
      </div>
    </div>
  );
}
