'use client';

import { SetStateAction, useState } from 'react';
import { useSession } from 'next-auth/react';
import { CldImage } from 'next-cloudinary';
import Button from '@/components/button';
import CloudinaryUploadButton from '@/components/CloudinaryUploadButton';

// Utility component for consistent input styling
const InputField = ({ label, id, type = 'text', placeholder, value, onChange, required = false, ...props }: any) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 shadow-sm transition-colors duration-200"
      value={value}
      onChange={onChange}
      required={required}
      {...props}
    />
  </div>
);

// Utility component for consistent textarea styling
const TextAreaField = ({ label, id, placeholder, value, onChange, required = false, rows = 4 }: any) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <textarea
      id={id}
      placeholder={placeholder}
      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 shadow-sm transition-colors duration-200"
      rows={rows}
      value={value}
      onChange={onChange}
      required={required}
    />
  </div>
);

export default function CreateEventPage() {
  const { data: session } = useSession();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [tags, setTags] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [imagePublicId, setImagePublicId] = useState('');
  const [attachments, setAttachments] = useState<{ publicId: string; url: string; fileName: string }[]>([]);
  const [creating, setCreating] = useState(false);
  const [formError, setFormError] = useState(''); // New state for form-wide error messages

  const handleCreate = async () => {
    setFormError(''); // Clear previous errors

    if (!title || !date || !description || !location || !imagePublicId) {
      setFormError('Please fill all required fields and upload a banner image.');
      return;
    }

    try {
      setCreating(true);

      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          date,
          time,
          description,
          location,
          image: imagePublicId,
          isPublic,
          tags: tags.split(',').map(t => t.trim()).filter(t => t !== ''), // Filter out empty tags
          attachments: attachments.map(att => att.publicId), // Send public IDs to backend
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to create event');
      }

      alert('✅ Event created successfully!');

      // Reset form
      setTitle('');
      setDate('');
      setTime('');
      setDescription('');
      setLocation('');
      setTags('');
      setIsPublic(true);
      setImagePublicId('');
      setAttachments([]);
    } catch (err: any) {
      setFormError(err.message || 'An unexpected error occurred.');
    } finally {
      setCreating(false);
    }
  };

  if (!session) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-xl text-gray-700 p-8 bg-white rounded-lg shadow-md">
          Please sign in to create events.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl border border-gray-100">
        <h1 className="text-3xl font-extrabold mb-8 text-center text-emerald-700">
          Create a New Event
        </h1>

        {formError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline ml-2">{formError}</span>
          </div>
        )}

        <form onSubmit={(e) => { e.preventDefault(); handleCreate(); }} className="space-y-6">
          <InputField
            label="Event Title"
            id="eventTitle"
            placeholder="e.g., Annual Alumni Meet"
            value={title}
            onChange={(e: { target: { value: SetStateAction<string>; }; }) => setTitle(e.target.value)}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              label="Date"
              id="eventDate"
              type="date"
              value={date}
              onChange={(e: { target: { value: SetStateAction<string>; }; }) => setDate(e.target.value)}
              required
            />
            <InputField
              label="Time (Optional)"
              id="eventTime"
              type="time"
              value={time}
              onChange={(e: { target: { value: SetStateAction<string>; }; }) => setTime(e.target.value)}
            />
          </div>

          <TextAreaField
            label="Description"
            id="eventDescription"
            placeholder="Provide a detailed description of the event..."
            value={description}
            onChange={(e: { target: { value: SetStateAction<string>; }; }) => setDescription(e.target.value)}
            required
          />

          <InputField
            label="Location"
            id="eventLocation"
            placeholder="e.g., University Auditorium, Virtual (Zoom)"
            value={location}
            onChange={(e: { target: { value: SetStateAction<string>; }; }) => setLocation(e.target.value)}
            required
          />

          <InputField
            label="Tags (comma separated)"
            id="eventTags"
            placeholder="e.g., networking, workshop, seminar"
            value={tags}
            onChange={(e: { target: { value: SetStateAction<string>; }; }) => setTags(e.target.value)}
          />

          {/* Image Upload Section */}
          <div className="border border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Banner Image <span className="text-red-500">*</span>
            </label>
            <CloudinaryUploadButton
              onUploadSuccess={(publicId, url) => setImagePublicId(publicId)}
              buttonText="📤 Upload Banner Image"
              folder="alumni-portal/images"
            />
            {imagePublicId && (
              <div className="mt-4 relative group">
                <CldImage
                  src={imagePublicId}
                  width="600"
                  height="300"
                  crop="fill"
                  alt="Banner Preview"
                  className="rounded-md w-full object-cover border border-gray-200 shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setImagePublicId('')}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  aria-label="Remove banner image"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
              </div>
            )}
            {!imagePublicId && (
                <p className="text-xs text-gray-400 mt-2">Required: Upload a banner image for your event.</p>
            )}
          </div>

          {/* Attachments Upload Section */}
          <div className="border border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Attachments (Optional)
            </label>
            <CloudinaryUploadButton
              onUploadSuccess={(publicId: any, url: any, info: { original_filename: string; format: any; }) => {
                const originalFileName = info?.original_filename || `Attachment ${attachments.length + 1}`;
                const fileExtension = info?.format ? `.${info.format}` : '';
                setAttachments(prev => [...prev, { publicId, url, fileName: originalFileName + fileExtension }]);
              }}
              buttonText="📎 Add Attachment"
              folder="alumni-portal/attachments"
              resourceType="raw"
            />
            {attachments.length > 0 && (
              <ul className="mt-4 space-y-2 text-sm">
                {attachments.map((attachment, index) => (
                  <li key={attachment.publicId || index} className="flex items-center justify-between p-2 bg-white border border-gray-200 rounded-md shadow-sm">
                    <a
                      href={attachment.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 flex items-center gap-2 font-medium truncate"
                    >
                      <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.485L20.5 13.5"></path></svg>
                      <span className="truncate">{attachment.fileName}</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => setAttachments((prev) => prev.filter((item) => item.publicId !== attachment.publicId))}
                      className="text-red-500 hover:text-red-700 ml-4 p-1 rounded-full hover:bg-red-50 transition-colors duration-200"
                      aria-label={`Remove ${attachment.fileName}`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {attachments.length === 0 && (
                <p className="text-xs text-gray-400 mt-2">You can upload documents, presentations, or other relevant files.</p>
            )}
          </div>


          <div className="flex items-center">
            <input
              type="checkbox"
              id="isPublic"
              className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
              checked={isPublic}
              onChange={e => setIsPublic(e.target.checked)}
            />
            <label htmlFor="isPublic" className="ml-2 block text-sm text-gray-900">
              Make this a public event
            </label>
          </div>

          <Button
            type="submit" // Change to type="submit" for form submission
            className="w-full py-3 text-lg font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            onClick={handleCreate}
            disabled={creating}
          >
            {creating ? 'Creating Event...' : 'Create Event'}
          </Button>
        </form>
      </div>
    </div>
  );
}