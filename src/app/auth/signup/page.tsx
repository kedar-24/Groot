"use client";
import React, { useState } from "react";
import Link from "next/link";
import FormContainer from "@/components/FormContainer";
import Button from "@/components/button";
import AuthFormField from "@/components/AuthFormField";
import SocialAuthButtons from "@/components/SocialAuthButtons";
import { useRouter } from "next/navigation";

const RESEND_OTP_SECONDS = 30;

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"email" | "otp">("email");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const router = useRouter();

  // Timer for resend OTP
  React.useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setMessage("");

    // Check if user exists
    const checkRes = await fetch("/api/check-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const checkData = await checkRes.json();

    if (checkData.exists) {
      setLoading(false);
      setMessage("User already exists. Redirecting to login...");
      setTimeout(() => router.push("/auth/login"), 2000);
      return;
    }

    // Continue with OTP sending if user does not exist
    const res = await fetch("/api/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      setStep("otp");
      setMessage("OTP sent to your email.");
      setResendTimer(RESEND_OTP_SECONDS);
    } else {
      setMessage(data.error || "Failed to send OTP.");
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const res = await fetch("/api/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      sessionStorage.setItem("verified_email", email);
      router.push("/auth/create-account");
    } else {
      setMessage(data.error || "Invalid OTP.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto z-40 relative flex items-center justify-center min-h-[80vh]">
      <FormContainer className="flex-1 flex-col items-center justify-center w-full">
        <h1 className="text-3xl font-bold text-[var(--color-primary)] mb-4 text-center w-full">
          Sign Up
        </h1>
        <p className="text-[var(--color-primary)] mb-3 text-base text-center w-full">
          {step === "email"
            ? "Enter your email to get started"
            : "Enter the OTP sent to your email"}
        </p>

        {message && (
          <p className="text-sm text-center text-[var(--color-secondary)] mb-4">
            {message}
          </p>
        )}

        {step === "email" ? (
          <form
            onSubmit={handleSendOtp}
            className="space-y-3 w-full flex flex-col items-center"
          >
            <AuthFormField
              id="email"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              disabled={loading}
              className="w-full"
            />
            <Button
              variant="solid"
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </Button>
          </form>
        ) : (
          <form
            onSubmit={handleVerifyOtp}
            className="space-y-3 w-full flex flex-col items-center"
          >
            <AuthFormField
              id="otp"
              label="OTP"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 6-digit code"
              required
              disabled={loading}
              className="w-full"
            />
            <div className="flex w-full gap-3">
              <Button
                variant="solid"
                type="submit"
                className="flex-1"
                disabled={loading}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                disabled={resendTimer > 0 || loading}
                onClick={() => handleSendOtp()}
              >
                {resendTimer > 0
                  ? `Resend OTP in ${resendTimer}s`
                  : "Resend OTP"}
              </Button>
            </div>
          </form>
        )}

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
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-[var(--color-primary)] font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </FormContainer>
    </div>
  );
}
