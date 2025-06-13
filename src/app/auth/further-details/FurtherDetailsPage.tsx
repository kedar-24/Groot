"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import FormContainer from "@/components/FormContainer";
import AuthFormField from "@/components/AuthFormField";
import Button from "@/components/button";

const TEXT_PRIMARY = "text-green-900";

export default function FurtherDetailsPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [form, setForm] = useState({
    jobRole: "",
    businessDetails: "",
    workingCity: "",
    workingState: "",
    fieldsOfExpertise: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Client-side session check
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const fieldsArray = form.fieldsOfExpertise
      .split(",")
      .map((f) => f.trim())
      .filter(Boolean);

    try {
      const res = await fetch("/api/further-details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          jobRole: form.jobRole,
          businessDetails: form.businessDetails,
          workingCity: form.workingCity,
          workingState: form.workingState,
          fieldsOfExpertise: fieldsArray,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        router.push("/");
      } else {
        setError(data.error || "Failed to save details.");
      }
    } catch (err) {
      setLoading(false);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto z-40 relative flex items-center justify-center min-h-[80vh]">
      <FormContainer className="flex-1 flex-col items-center justify-center w-full">
        <h1 className={`text-3xl font-bold ${TEXT_PRIMARY} mb-4 text-center w-full`}>
          Further Details
        </h1>
        {error && <p className="text-red-600 text-sm mb-3 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-3 w-full flex flex-col items-center">
          <AuthFormField
            id="jobRole"
            label="Job Role"
            type="text"
            value={form.jobRole}
            onChange={handleChange}
            placeholder="e.g. Software Engineer"
            required
            className="w-full"
            disabled={loading}
          />
          <AuthFormField
            id="businessDetails"
            label="Business Details (optional)"
            type="text"
            value={form.businessDetails}
            onChange={handleChange}
            placeholder="e.g. Company Name or Business Type"
            required={false}
            className="w-full"
            disabled={loading}
          />
          <div className="w-full flex gap-2">
            <AuthFormField
              id="workingCity"
              label="Working City"
              type="text"
              value={form.workingCity}
              onChange={handleChange}
              placeholder="City"
              required
              className="w-1/2"
              disabled={loading}
            />
            <AuthFormField
              id="workingState"
              label="Working State"
              type="text"
              value={form.workingState}
              onChange={handleChange}
              placeholder="State"
              required
              className="w-1/2"
              disabled={loading}
            />
          </div>
          <AuthFormField
            id="fieldsOfExpertise"
            label="Fields of Expertise (comma separated)"
            type="text"
            value={form.fieldsOfExpertise}
            onChange={handleChange}
            placeholder="e.g. React, Node.js, Marketing"
            required
            className="w-full"
            disabled={loading}
          />
          <Button
            type="submit"
            variant="primary"
            className="w-full hover:bg-green-200 text-green-700"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Details"}
          </Button>
        </form>
      </FormContainer>
    </div>
  );
}
