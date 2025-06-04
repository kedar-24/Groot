"use client";
import { useState } from "react";
import Link from "next/link";
import AuthLayout from "@/components/LoginLayout";
import FormContainer from "@/components/FormContainer";
import Button from "@/components/button";
import Input from "@/components/Input";
import Select from "@/components/Select";
import Textarea from "@/components/Textrea";

export default function SignupPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    phone: "",
    dob: "",
    address: "",
    gender: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add your signup logic here (API call)
    setSubmitted(true);
  };

  return (
    <AuthLayout imageSrc="/images/login.jpg" imageAlt="Signup Image">
      <FormContainer>
        <h1 className="text-4xl font-bold text-green-800 mb-2 tracking-tight">
          Sign Up
        </h1>
        <p className="text-gray-700 mb-6 text-lg">
          Create your account to join our community of learners and educators.
        </p>
        {submitted ? (
          <div className="text-green-700 text-lg mb-8">
            Account created! Please check your email to verify your account.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-green-800 mb-1"
                >
                  Full Name
                </label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="w-full"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-green-800 mb-1"
                >
                  Email Address
                </label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@school.edu"
                  required
                  className="w-full"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-green-800 mb-1"
                >
                  Phone Number
                </label>
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="123-456-7890"
                  required
                  className="w-full"
                />
              </div>
              <div>
                <label
                  htmlFor="dob"
                  className="block text-sm font-medium text-green-800 mb-1"
                >
                  Date of Birth
                </label>
                <Input
                  type="date"
                  id="dob"
                  name="dob"
                  value={form.dob}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>
              <div>
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium text-green-800 mb-1"
                >
                  Gender
                </label>
                <Select
                  id="gender"
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  required
                  className="input-base text-green-800 border-gray-300 focus:ring-green-500 focus:border-green-500 bg-white"
                >
                  <option value="" disabled>
                    Select Gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Select>
              </div>
              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-green-800 mb-1"
                >
                  Role
                </label>
                <Select
                  id="role"
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  required
                  className="input-base text-green-800 border-gray-300 focus:ring-green-500 focus:border-green-500 bg-white"
                >
                  <option value="" disabled>
                    Select Role
                  </option>
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="admin">Admin</option>
                </Select>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-green-800 mb-1"
                >
                  Password
                </label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                  className="w-full"
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-green-800 mb-1"
                >
                  Confirm Password
                </label>
                <Input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repeat Password"
                  required
                  className="w-full"
                />
              </div>
              <div className="md:col-span-2">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-green-800 mb-1"
                >
                  Address
                </label>
                <Textarea
                  id="address"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Your Address"
                  rows={2}
                  required
                  className="input-base text-green-800 border-gray-300 focus:ring-green-500 focus:border-green-500 bg-white"
                />
              </div>
            </div>
            <Button
              type="submit"
              variant="primary"
              className="w-full bg-green-700 hover:bg-green-800 text-white"
            >
              Sign Up
            </Button>
          </form>
        )}
        <div className="mt-8 text-center">
          <span className="text-gray-700">Already have an account? </span>
          <Link
            href="/login"
            className="text-green-700 font-semibold hover:underline"
          >
            Login
          </Link>
        </div>
      </FormContainer>
    </AuthLayout>
  );
}
