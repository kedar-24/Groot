"use client";
import { useState } from "react";
import Link from "next/link";
import FormContainer from "@/components/FormContainer";
import Button from "@/components/button";
import AuthFormField from "@/components/AuthFormField";
import SocialAuthButtons from "@/components/SocialAuthButtons";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = ({
    target: { id, value },
  }: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [id]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
    });
    setLoading(false);

    if (res?.error) {
      setError(res.error || "Invalid credentials. Please try again.");
    } else {
      // Login success, redirect or show success message
      alert("Login successful!");
      router.push("/");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto z-40 relative flex items-center justify-center min-h-[80vh]">
      <FormContainer className="flex-1 items-center justify-center px-6">
        <h1 className="text-4xl font-bold text-[var(--color-primary)] mb-3 text-left w-full">
          Welcome Back!
        </h1>
        <p className="text-[var(--color-primary)] mb-3 text-left w-full">
          Login to your profile
        </p>

        {error && (
          <p className="text-[var(--color-secondary)] text-sm m-2 text-left w-full">
            {error}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-3 w-full flex flex-col items-center"
        >
          <AuthFormField
            id="email"
            label="Email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="example@example.com"
            required
            disabled={loading}
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
            autoComplete="current-password"
            disabled={loading}
            className="w-full"
          >
            <div className="flex justify-between items-center mt-1 w-full">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="showPassword"
                  checked={showPassword}
                  onChange={() => setShowPassword((prev) => !prev)}
                  className="mr-2 accent-[var(--color-primary)]"
                  disabled={loading}
                />
                <label
                  htmlFor="showPassword"
                  className="text-[var(--color-primary)] text-sm"
                >
                  Show Password
                </label>
              </div>
              <Link
                href="/auth/forgot-password"
                className="text-[var(--color-primary)] hover:underline text-sm"
              >
                Forgot password?
              </Link>
            </div>
          </AuthFormField>

          <Button
            variant="solid"
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <div className="my-4 flex items-center w-full">
          <hr className="flex-1 border-gray-300" />
          <span className="mx-2 text-gray-400 text-sm">or</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        <div className="w-full flex flex-col items-center">
          <SocialAuthButtons disabled={loading} />
        </div>

        <div className="mt-4 text-center w-full text-[var(--color-primary)]">
          <p>
            Don't have an account?{" "}
            <Link
              href="/auth/signup"
              className="text-[var(--color-primary)] font-semibold hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </FormContainer>
    </div>
  );
}
