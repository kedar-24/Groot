
'use client';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    alert('Message sent (mock)');
    // TODO: Post to /api/contact
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-12 space-y-4 p-4 border rounded">
      <input name="name" placeholder="Name" onChange={handleChange} required className="p-2 w-full border rounded" />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} required className="p-2 w-full border rounded" />
      <textarea name="message" rows={4} placeholder="Message" onChange={handleChange} required className="p-2 w-full border rounded" />
      <button className="bg-black text-white p-2 w-full rounded">Send Message</button>
    </form>
  );
}
