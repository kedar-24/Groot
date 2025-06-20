"use client"; // if you're using the app router
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import FormContainer from "@/components/FormContainer";
import AuthFormField from "@/components/AuthFormField";
import Button from "@/components/button";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const [form, setForm] = useState({ password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      setError("Invalid or missing token.");
    }
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!form.password || !form.confirmPassword) {
      return setError("All fields are required.");
    }

    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match.");
    }

    setLoading(true);
    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password: form.password }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      setMessage("Password reset successful. Redirecting to login...");
      setTimeout(() => router.push("/auth/login"), 3000);
    } else {
      setError(data.error || "Something went wrong.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto flex items-center justify-center min-h-[80vh]">
      <FormContainer className="w-full">
        <h1 className="text-3xl font-bold text-green-900 mb-4 text-center">
          Reset Password
        </h1>
        {error && <p className="text-red-600 mb-3 text-center">{error}</p>}
        {message && <p className="text-green-700 mb-3 text-center">{message}</p>}

        {!message && (
          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            <AuthFormField
              id="password"
              label="New Password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              disabled={loading}
              placeholder="Enter new password"
              className="w-full"
            />
            <AuthFormField
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              disabled={loading}
              placeholder="Re-enter password"
              className="w-full"
            />
            <Button
              type="submit"
              className="w-full text-green-800"
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </Button>
          </form>
        )}
      </FormContainer>
    </div>
  );
}
