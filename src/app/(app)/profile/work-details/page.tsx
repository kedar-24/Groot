"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import AuthFormField from "@/components/AuthFormField";
import Button from "@/components/button";
import FormContainer from "@/components/FormContainer";
import Card from "@/components/Card";
import Select from "@/components/Select";

export default function WorkDetailsPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [form, setForm] = useState({
    jobRole: "",
    company: "",
    workingCity: "",
    workingState: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") router.replace("/auth/login");
  }, [status, router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    // Only send work details
    const payload = { ...form };
    const res = await fetch("/api/profile/work-details", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    setLoading(false);
    if (res.ok) {
      setSuccess(true);
      setTimeout(() => router.push("/"), 1200); // or wherever you want to redirect after success
    } else {
      setError(data.error || "Failed to save work details.");
    }
  };

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gradient-to-br from-green-50 to-green-100 py-10">
      <FormContainer className="shadow-2xl">
        <Card className="mb-6 bg-gradient-to-r from-green-700 to-green-500 text-white p-6 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold mb-2">Work Details</h2>
          <p className="text-base opacity-90">
            Tell us about your current work or study status. This helps us
            personalize your experience!
          </p>
        </Card>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 w-full flex flex-col items-center"
        >
          <div className="w-full flex flex-col md:flex-row gap-4">
            <div className="w-full">
              <label
                htmlFor="jobRole"
                className="block text-sm font-medium text-green-900 mb-1"
              >
                Job Role
              </label>
              <Select
                id="jobRole"
                value={form.jobRole}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full"
              >
                <option value="">Select your job role</option>
                <option value="Software Engineer">Software Engineer</option>
                <option value="Product Manager">Product Manager</option>
                <option value="Designer">Designer</option>
                <option value="Student">Student</option>
                <option value="Other">Other</option>
              </Select>
            </div>
            <div className="w-full">
              <label
                htmlFor="company"
                className="block text-sm font-medium text-green-900 mb-1"
              >
                Company
              </label>
              <Select
                id="company"
                value={form.company}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full"
              >
                <option value="">Select your company</option>
                <option value="Google">Google</option>
                <option value="Microsoft">Microsoft</option>
                <option value="Amazon">Amazon</option>
                <option value="Startup">Startup</option>
                <option value="Student">Student</option>
                <option value="Other">Other</option>
              </Select>
            </div>
          </div>
          <AuthFormField
            id="workingCity"
            label="Working City"
            type="text"
            value={form.workingCity}
            onChange={handleChange}
            placeholder="City"
            required
            className="w-full"
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
            className="w-full"
            disabled={loading}
          />
          {error && (
            <p className="text-red-500 text-xs w-full text-left mb-2">
              {error}
            </p>
          )}
          {success && (
            <p className="text-green-700 text-xs w-full text-left mb-2">
              Work details saved! Redirecting...
            </p>
          )}
          <Button
            type="submit"
            className="w-full hover:bg-green-200 text-green-700 font-bold"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-green-700"></span>
                Saving...
              </span>
            ) : (
              "Save Work Details"
            )}
          </Button>
        </form>
      </FormContainer>
    </div>
  );
}
