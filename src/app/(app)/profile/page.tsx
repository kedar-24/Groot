"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AuthFormField from "@/components/AuthFormField";
import Button from "@/components/button";

export default function ProfilePage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    image: "",
    jobRole: "",
    businessDetails: "",
    workingCity: "",
    workingState: "",
    fieldsOfExpertise: "",
    graduationYear: "",
    degree: "",
    linkedin: "",
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/auth/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user) {
      setForm({
        username: session.user.name || "",
        email: session.user.email || "",
        image: session.user.image || "",
        jobRole: session.user.jobRole || "",
        businessDetails: session.user.businessDetails || "",
        workingCity: session.user.workingCity || "",
        workingState: session.user.workingState || "",
        fieldsOfExpertise: (session.user.fieldsOfExpertise || []).map(String).join(", "),
        graduationYear: session.user.graduationYear ? String(session.user.graduationYear) : "",
        degree: session.user.degree || "",
        linkedin: session.user.linkedin || "",
      });
    }
  }, [session]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    const res = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        ...form,
        fieldsOfExpertise: form.fieldsOfExpertise
          .split(",")
          .map((f) => f.trim())
          .filter(Boolean),
      }),
    });
    const data = await res.json();
    setLoading(false);
    if (res.ok) {
      setMsg("Profile updated!");
      setEditMode(false);
      update(); // Refresh session data
    } else {
      setMsg(data.error || "Update failed.");
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Alumni Profile</h1>
      {msg && <p className="mb-2 text-green-600">{msg}</p>}
      <form onSubmit={handleSave} className="space-y-3">
        <AuthFormField
          id="username"
          label="Full Name"
          type="text"
          value={form.username}
          onChange={handleChange}
          disabled={!editMode}
          required
        />
        <AuthFormField
          id="email"
          label="Email"
          type="email"
          value={form.email}
          onChange={handleChange}
          disabled
          required
        />
        <AuthFormField
          id="image"
          label="Profile Image URL"
          type="text"
          value={form.image}
          onChange={handleChange}
          disabled={!editMode}
        />
        <AuthFormField
          id="jobRole"
          label="Job Role"
          type="text"
          value={form.jobRole}
          onChange={handleChange}
          disabled={!editMode}
        />
        <AuthFormField
          id="businessDetails"
          label="Business Details"
          type="text"
          value={form.businessDetails}
          onChange={handleChange}
          disabled={!editMode}
        />
        <div className="flex gap-2">
          <AuthFormField
            id="workingCity"
            label="Working City"
            type="text"
            value={form.workingCity}
            onChange={handleChange}
            disabled={!editMode}
          />
          <AuthFormField
            id="workingState"
            label="Working State"
            type="text"
            value={form.workingState}
            onChange={handleChange}
            disabled={!editMode}
          />
        </div>
        <AuthFormField
          id="fieldsOfExpertise"
          label="Fields of Expertise (comma separated)"
          type="text"
          value={form.fieldsOfExpertise}
          onChange={handleChange}
          disabled={!editMode}
        />
        <AuthFormField
          id="graduationYear"
          label="Graduation Year"
          type="number"
          value={form.graduationYear}
          onChange={handleChange}
          disabled={!editMode}
        />
        <AuthFormField
          id="degree"
          label="Degree"
          type="text"
          value={form.degree}
          onChange={handleChange}
          disabled={!editMode}
        />
        <AuthFormField
          id="linkedin"
          label="LinkedIn URL"
          type="text"
          value={form.linkedin}
          onChange={handleChange}
          disabled={!editMode}
        />
        <div className="flex gap-2 mt-4">
          {editMode ? (
            <>
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setEditMode(false)}
                disabled={loading}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button type="button" onClick={() => setEditMode(true)}>
              Edit Profile
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}