'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Button from '@/components/button';

export default function CreateEventPage() {
  const { data: session } = useSession();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [tags, setTags] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [creating, setCreating] = useState(false);

  const uploadFiles = async (files: File[]) => {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));
    const res = await fetch('/api/events/upload', {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) throw new Error('File upload failed');
    const data = await res.json();
    return data.files;
  };

  const handleCreate = async () => {
    if (!title || !date || !description || !location) {
      alert('Please fill all required fields.');
      return;
    }

    try {
      setCreating(true);
      let imageUrl = '';
      let attachmentUrls: string[] = [];

      if (imageFile) {
        const [url] = await uploadFiles([imageFile]);
        imageUrl = url;
      }

      if (attachments.length > 0) {
        attachmentUrls = await uploadFiles(attachments);
      }

      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          date,
          time,
          description,
          location,
          image: imageUrl,
          isPublic,
          tags: tags.split(',').map(t => t.trim()),
          attachments: attachmentUrls,
        }),
      });

      if (!res.ok) throw new Error('Failed to create event');
      alert('Event created successfully');
      setTitle('');
      setDate('');
      setTime('');
      setDescription('');
      setLocation('');
      setTags('');
      setIsPublic(true);
      setImageFile(null);
      setAttachments([]);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setCreating(false);
    }
  };

  if (!session) return <p className="text-center mt-12">Sign in to create events.</p>;

  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-800">Create an Event</h1>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          className="w-full p-3 border border-gray-300 rounded-md"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <div className="flex gap-4">
          <input
            type="date"
            className="w-1/2 p-3 border border-gray-300 rounded-md"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
          <input
            type="time"
            className="w-1/2 p-3 border border-gray-300 rounded-md"
            value={time}
            onChange={e => setTime(e.target.value)}
          />
        </div>
        <textarea
          placeholder="Description"
          className="w-full p-3 border border-gray-300 rounded-md"
          rows={4}
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          className="w-full p-3 border border-gray-300 rounded-md"
          value={location}
          onChange={e => setLocation(e.target.value)}
        />
        <input
          type="text"
          placeholder="Tags (comma separated)"
          className="w-full p-3 border border-gray-300 rounded-md"
          value={tags}
          onChange={e => setTags(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={e => setImageFile(e.target.files?.[0] || null)}
        />
        <input
          type="file"
          multiple
          onChange={e => setAttachments(Array.from(e.target.files || []))}
        />
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isPublic}
            onChange={e => setIsPublic(e.target.checked)}
          />
          <span>Make this a public event</span>
        </label>
        <Button
          className="w-full bg-green-700 hover:bg-green-800 text-white py-2 px-4 rounded-md"
          onClick={handleCreate}
          disabled={creating}
        >
          {creating ? 'Creating...' : 'Create Event'}
        </Button>
      </div>
    </div>
  );
}