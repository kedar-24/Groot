
'use client';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add authentication logic
    alert(`Logging in with ${email}`);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-20 space-y-4 p-4 border rounded">
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="p-2 w-full border rounded" required />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="p-2 w-full border rounded" required />
      <button type="submit" className="bg-black text-white p-2 w-full rounded">Login</button>
    </form>
  );
}
