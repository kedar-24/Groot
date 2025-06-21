//profile/page.tsx

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
    password: "********", // Placeholder, not actual password
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  // showPasswordCard
  const [showChangePasswordCard, setShowChangePasswordCard] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);

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
        password: "********", // Always show dots, never actual password
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

      // Fetch latest profile data from backend
      const profileRes = await fetch("/api/profile", { credentials: "include" });
      if (profileRes.ok) {
        const latest = await profileRes.json();
        setForm({
          username: latest.username || "",
          email: latest.email || "",
          image: latest.image || "",
          jobRole: latest.jobRole || "",
          businessDetails: latest.businessDetails || "",
          workingCity: latest.workingCity || "",
          workingState: latest.workingState || "",
          fieldsOfExpertise: (latest.fieldsOfExpertise || []).join(", "),
          graduationYear: latest.graduationYear ? String(latest.graduationYear) : "",
          degree: latest.degree || "",
          linkedin: latest.linkedin || "",
          password: "********",
        });
      }
    } else {
      setMsg(data.error || "Update failed.");
    }
  };

  // Handler for image upload (you can implement actual upload logic later)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setForm((prev) => ({ ...prev, image: url }));
      // You should upload the file to your server/cloud and save the URL in DB on save
    }
  };

  const hasCredentials = Array.isArray(session?.user?.providers) && session.user.providers.includes("credentials");

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Alumni Profile</h1>
      {/* Profile Image with Edit Button */}
      <div className="flex justify-center mb-4 relative">
        {form.image ? (
          <img
            src={form.image}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border border-gray-300"
          />
        ) : (
          <div className="w-28 h-28 rounded-full bg-green-200 flex items-center justify-center text-4xl font-bold text-green-800 border border-gray-300 select-none">
            {form.username?.trim()?.charAt(0)?.toUpperCase() || "U"}
          </div>
        )}
        {/* Edit Profile Image Button */}
        {editMode && (
          <label className="absolute top-2 right-2 bg-white rounded-full shadow p-1 cursor-pointer border border-gray-300 hover:bg-gray-100 transition">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13l6-6m2 2a2.828 2.828 0 11-4-4 2.828 2.828 0 014 4z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7v6a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2z" />
            </svg>
          </label>
        )}
      </div>
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
          id="jobRole"
          label="Job Role"
          type="text"
          value={form.jobRole}
          onChange={handleChange}
          disabled={!editMode}
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

        {editMode && (
          <div className="flex gap-2 mt-4">
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
          </div>
        )}
      </form>

      {!editMode && (
        <div className="flex gap-2 mt-4">
          <Button type="button" onClick={() => setEditMode(true)}>
            Edit Profile
          </Button>
        </div>
      )}

      {/* Password Card - shows current password field and Change Password button */}
      <div className="mt-8 p-4 bg-gray-50 rounded shadow flex items-center justify-between">
        <div className="flex-1">
          <AuthFormField
            id="password"
            label="Password"
            type="password"
            value={form.password}
            onChange={() => {}}
            disabled
            className="w-full"
          />
        </div>
        <Button
          type="button"
          variant="secondary"
          className="ml-4"
          onClick={() => setShowChangePasswordCard(true)}
        >
          {hasCredentials ? "Change Password" : "Set Password"}
        </Button>
      </div>

      {/* Change Password Card/Modal */}
      {showChangePasswordCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
            {/* Close button for the modal */}
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl"
              onClick={() => setShowChangePasswordCard(false)}
              aria-label="Close"
              type="button"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-green-900">
              {form.password === "********" ? "Set Password" : "Change Password"}
            </h2>
            {/* Show error or info messages */}
            {passwordMsg && (
              <div className="mb-2 text-center text-red-600">{passwordMsg}</div>
            )}
            {/* Change Password Form */}
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setPasswordMsg("");
                setPasswordLoading(true);

                if (newPassword !== confirmPassword) {
                  setPasswordMsg("New passwords do not match.");
                  setPasswordLoading(false);
                  return;
                }

                const body = hasCredentials
                  ? { oldPassword, newPassword }
                  : { newPassword };

                const res = await fetch("/api/auth/change-password", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(body),
                });
                const result = await res.json();
                if (res.ok) {
                  setPasswordMsg("Password set successfully!");
                  setShowChangePasswordCard(false);
                  setOldPassword("");
                  setNewPassword("");
                  setConfirmPassword("");
                } else {
                  setPasswordMsg(result.error || "Failed to set password.");
                }
                setPasswordLoading(false);
              }}
              className="space-y-4"
            >
              {hasCredentials && (
                <AuthFormField
                  id="oldPassword"
                  label="Old Password"
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                />
              )}
              <AuthFormField
                id="newPassword"
                label="New Password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <AuthFormField
                id="confirmPassword"
                label="Repeat New Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <div className="flex items-center justify-between">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={passwordLoading}
                >
                  {passwordLoading ? "Saving..." : "Save"}
                </Button>
                <a
                  href="/auth/forgot-password"
                  className="text-blue-600 hover:underline text-sm"
                >
                  Forgot password?
                </a>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}