"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import FormContainer from "@/components/FormContainer";
import AuthFormField from "@/components/AuthFormField";
import Button from "@/components/button";

const TEXT_PRIMARY = "text-green-900";

export default function CreateAccountClient({ email }: { email: string }) {
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match.");
    }

    setLoading(true);
    const username = `${form.firstName} ${form.lastName}`.trim();

    const res = await fetch("/api/create-account", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        email,
        username,
        password: form.password,
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      router.push("/profile/further-details");
    } else {
      setError(data.error || "Account creation failed.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto z-40 relative flex items-center justify-center min-h-[80vh]">
      <FormContainer className="flex-1 flex-col items-center justify-center w-full">
        <h1
          className={`text-3xl font-bold ${TEXT_PRIMARY} mb-4 text-center w-full`}
        >
          Create Account
        </h1>
        {error && (
          <p className="text-red-600 text-sm mb-3 text-center">{error}</p>
        )}
        <form
          onSubmit={handleSubmit}
          className="space-y-3 w-full flex flex-col items-center"
        >
          <AuthFormField
            id="firstName"
            label="First Name"
            type="text"
            value={form.firstName}
            onChange={handleChange}
            placeholder="John"
            required
            className="w-full"
            disabled={loading}
          />
          <AuthFormField
            id="lastName"
            label="Last Name"
            type="text"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Doe"
            required
            className="w-full"
            disabled={loading}
          />
          <AuthFormField
            id="password"
            label="Password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Choose a password"
            required
            className="w-full"
            disabled={loading}
          />
          <AuthFormField
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Re-enter your password"
            required
            className="w-full"
            disabled={loading}
          />
          {form.password !== form.confirmPassword && (
            <p className="text-red-500 text-xs w-full text-left mb-2">
              Passwords do not match.
            </p>
          )}
          <Button
            type="submit"
            variant="primary"
            className="w-full hover:bg-green-200 text-green-700"
            disabled={loading}
          >
            {loading ? "Loading..." : "Continue"}
          </Button>
        </form>
      </FormContainer>
    </div>
  );
}
