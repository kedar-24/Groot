'use client';

import { useRef, useState } from 'react';

type Props = {
  onUploadSuccess: (publicId: string, url: string, info?: any) => void;
  folder?: string;
  buttonText?: string;
  className?: string;
  maxSizeMB?: number; // Compression threshold
};

export default function DirectUploadButton({
  onUploadSuccess,
  folder = 'nextjs-uploads',
  buttonText = 'Upload Image',
  className = '',
  maxSizeMB = 1, // Compress if > 1MB
}: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const compressImage = (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        if (!e.target?.result) return reject('Invalid image');

        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 1280;
          const scaleFactor = MAX_WIDTH / img.width;
          canvas.width = Math.min(img.width, MAX_WIDTH);
          canvas.height = img.height * scaleFactor;

          const ctx = canvas.getContext('2d');
          if (!ctx) return reject('Canvas not supported');
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          // Adjust quality (0.6 = ~60%)
          canvas.toBlob(
            (blob) => {
              if (blob) resolve(blob);
              else reject('Compression failed');
            },
            'image/jpeg',
            0.6
          );
        };

        img.onerror = reject;
        img.src = e.target.result as string;
      };

      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    try {
      let uploadBlob: Blob | File = file;

      // Compress if file is too large
      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > maxSizeMB) {
        console.log(`Compressing ${file.name} (${fileSizeMB.toFixed(2)} MB)`);
        uploadBlob = await compressImage(file);
      }

      const formData = new FormData();
      formData.append('file', uploadBlob);
      formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);
      formData.append('folder', folder);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error?.message || 'Upload failed');

      setPreviewUrl(data.secure_url);
      onUploadSuccess(data.public_id, data.secure_url, data);
    } catch (err) {
      console.error('Upload error:', err);
      alert('❌ Upload failed. Check console.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      <button
        onClick={handleClick}
        disabled={uploading}
        className={`px-6 py-3 rounded-lg text-white font-semibold transition-all duration-200 ease-in-out shadow-md
        ${uploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'}`}
      >
        {uploading ? 'Uploading...' : buttonText}
      </button>

      {previewUrl && (
        <div className="border rounded-lg p-3 bg-gray-50 max-w-sm space-y-2">
          <p className="text-sm font-medium text-gray-700">Image Preview:</p>
          <img
            src={previewUrl}
            alt="Uploaded"
            className="w-full h-auto object-contain rounded-md border border-gray-200 shadow-sm"
            style={{ maxHeight: '200px' }}
          />
        </div>
      )}
    </div>
  );
}
