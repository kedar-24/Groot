'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { CldUploadWidget } from 'next-cloudinary';
import Button from '@/components/button'; // Your existing button
import  Input  from '@/components/Input'; // Assuming Tailwind & shadcn
import Textarea  from '@/components/Textrea';

export default function CreatePostForm() {
  const { data: session } = useSession();
  const [content, setContent] = useState('');
  const [mediaUrls, setMediaUrls] = useState<string[]>([]);
  const [postType, setPostType] = useState('text');
  const [visibility, setVisibility] = useState('public');
  const [linkedEntityType, setLinkedEntityType] = useState('');
  const [linkedEntityRef, setLinkedEntityRef] = useState('');

  const handleUpload = (result: any) => {
    if (result?.info?.secure_url) {
      setMediaUrls((prev) => [...prev, result.info.secure_url]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content,
        mediaUrls,
        postType,
        visibility,
        linkedEntity: linkedEntityType && linkedEntityRef
          ? { type: linkedEntityType, ref: linkedEntityRef }
          : undefined,
      }),
    });

    if (res.ok) {
      alert('Post created!');
      setContent('');
      setMediaUrls([]);
      setPostType('text');
      setVisibility('public');
      setLinkedEntityType('');
      setLinkedEntityRef('');
    } else {
      alert('Failed to create post');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-xl mx-auto bg-white rounded shadow space-y-4">
      <Textarea
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={4}
        required
      />

      <CldUploadWidget
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET!}
        onUpload={handleUpload}
        options={{ resourceType: 'auto', multiple: true }}
      >
        {({ open }) => (
          <Button type="button" onClick={() => open()}>
            Upload Media
          </Button>
        )}
      </CldUploadWidget>

      <div className="flex flex-wrap gap-2">
        {mediaUrls.map((url, index) => (
          <div key={index} className="w-24 h-24 overflow-hidden rounded border">
            {url.includes('/video/') ? (
              <video src={url} controls className="w-full h-full object-cover" />
            ) : (
              <img src={url} alt="media" className="w-full h-full object-cover" />
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <select
          value={postType}
          onChange={(e) => setPostType(e.target.value)}
          className="border rounded p-2"
        >
          <option value="text">Text</option>
          <option value="job">Job</option>
          <option value="event">Event</option>
          <option value="share">Share</option>
        </select>

        <select
          value={visibility}
          onChange={(e) => setVisibility(e.target.value)}
          className="border rounded p-2"
        >
          <option value="public">Public</option>
          <option value="alumni">Alumni Only</option>
          <option value="connections">Connections Only</option>
          <option value="private">Private</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Input
          placeholder="Linked entity type (e.g., job, user, event)"
          value={linkedEntityType}
          onChange={(e) => setLinkedEntityType(e.target.value)}
        />
        <Input
          placeholder="Linked entity ID or URL"
          value={linkedEntityRef}
          onChange={(e) => setLinkedEntityRef(e.target.value)}
        />
      </div>

      <Button type="submit" disabled={!session}>
        {session ? 'Post' : 'Login to Post'}
      </Button>
    </form>
  );
}
