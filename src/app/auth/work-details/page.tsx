'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AuthFormField from '@/components/AuthFormField';
import Button from '@/components/button';

export default function WorkDetailsPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    jobRole: '',
    company: '',
    workingCity: '',
    workingState: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [signupData, setSignupData] = useState<any>(null);

  useEffect(() => {
    const data = sessionStorage.getItem('signupData');
    if (data) setSignupData(JSON.parse(data));
    else router.push('/auth/create-account');
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const payload = { ...signupData, ...form };
    const res = await fetch('/api/create-account', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    setLoading(false);
    if (res.ok) {
      sessionStorage.removeItem('signupData');
      router.push('/');
    } else {
      setError(data.error || 'Account creation failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 w-full flex flex-col items-center">
      <div className="w-full">
        <label htmlFor="jobRole" className="block text-sm font-medium text-gray-700 mb-1">
          Job Role
        </label>
        <select
          id="jobRole"
          value={form.jobRole}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Select your job role</option>
          <option value="Software Engineer">Software Engineer</option>
          <option value="Product Manager">Product Manager</option>
          <option value="Designer">Designer</option>
          <option value="Student">Student</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="w-full">
        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
          Company
        </label>
        <select
          id="company"
          value={form.company}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Select your company</option>
          <option value="Google">Google</option>
          <option value="Microsoft">Microsoft</option>
          <option value="Amazon">Amazon</option>
          <option value="Startup">Startup</option>
          <option value="Student">Student</option>
          <option value="Other">Other</option>
        </select>
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
      {error && <p className="text-red-500 text-xs w-full text-left mb-2">{error}</p>}
      <Button type="submit" className="w-full hover:bg-green-200 text-green-700" disabled={loading}>
        {loading ? 'Creating Account...' : 'Create Account'}
      </Button>
    </form>
  );
}